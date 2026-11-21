// Runs the existing production build on loopback only. No staff system is added.
import assert from 'node:assert/strict';
import {spawn,execFileSync} from 'node:child_process';
import {createServer} from 'node:net';
import {once} from 'node:events';
import {access,mkdir,mkdtemp,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {FileStorage} from '../server/file-storage';
import {lostReplyAndNewIntent,pilotHash,readPilotStore,sendPilot} from './lib/intake-pilot-scenario.mjs';
import {auditRelease} from './audit-release.mjs';

await access('dist/index.js');
await mkdir('.artifacts',{recursive:true});
const directory=await mkdtemp(path.resolve('.artifacts/intake-pilot-'));
const file=path.join(directory,'submissions.json');
async function start(mode:'local'|'disabled') {
  const socket=createServer().listen(0,'127.0.0.1');await once(socket,'listening');
  const port=(socket.address() as {port:number}).port;
  await new Promise<void>(resolve=>socket.close(()=>resolve()));
  const origin='http://127.0.0.1:'+port;
  const child=spawn(process.execPath,['dist/index.js'],{env:{...process.env,NODE_ENV:'production',HOST:'127.0.0.1',PORT:String(port),
    DATA_FILE:file,INTAKE_MODE:mode,INDEXING_ENABLED:'false',SITE_URL:'https://assist.example',CORS_ORIGIN:origin,LOG_TO_FILE:'false'},stdio:['ignore','pipe','pipe']});
  let logs='';child.stdout.on('data',chunk=>{logs+=chunk;});child.stderr.on('data',chunk=>{logs+=chunk;});
  const stop=async()=>{if(child.exitCode!==null)return;const closed=once(child,'close');child.kill();await closed;};
  try {
    let ready=false;
    for(let attempt=0;attempt<100;attempt++){
      try{ready=(await fetch(origin+'/health',{signal:AbortSignal.timeout(1000)})).ok;}catch{}
      if(ready)break;await new Promise(resolve=>setTimeout(resolve,50));
    }
    assert.ok(ready,logs);return {origin,stop};
  }catch(error){await stop();throw error;}
}
let running:Awaited<ReturnType<typeof start>>|undefined;
try {
  running=await start('local');
  const sourceCommit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
  // Keep the existing release check strict: rebuild from the committed checkout.
  const localRelease=await auditRelease(running.origin,sourceCommit);
  const scenario=await lostReplyAndNewIntent(running.origin,file);
  const beforeDisable=await pilotHash(file);
  await running.stop();running=undefined;

  running=await start('disabled');
  const disabledHtml=await (await fetch(running.origin+'/contact')).text();
  assert.match(disabledHtml,/name="intake-mode" content="disabled"/);
  assert.match(disabledHtml,/noindex,follow/);
  assert.match(disabledHtml,/ონლაინ ფორმით მოთხოვნების მიღება ჯერ ჩართული არ არის/);
  assert.match(disabledHtml,/mailto:info@assist\.ge/);assert.match(disabledHtml,/<fieldset disabled/);
  const disabledAttempt=await sendPilot(running.origin,randomUUID());
  assert.equal(disabledAttempt.status,503);assert.equal(disabledAttempt.body.code,'INTAKE_DISABLED');
  assert.equal(await pilotHash(file),beforeDisable);
  await running.stop();running=undefined;

  running=await start('local');
  const restored=await sendPilot(running.origin,scenario.firstKey);
  assert.equal(restored.status,201);assert.equal(restored.body.id,scenario.report.first.id);
  assert.equal(restored.body.delivery,'not_configured');
  assert.equal(await pilotHash(file),beforeDisable);
  // This is a demo read through the existing local store, NOT employee receipt.
  const records=await new FileStorage(file).getAllContacts();
  assert.equal(records.length,2);
  const first=records.find(record=>record.id===restored.body.id)!;
  assert.ok(first);assert.deepEqual(first.services,['bookkeeping','payroll']);
  assert.equal(first.createdAt.toISOString(),scenario.report.first.storedBeforeDisconnect.createdAt);
  const persisted=await readPilotStore(file);
  assert.equal(persisted.contacts.filter((record:{id:number})=>record.id===first.id).length,1);
  const report={checkedAt:new Date().toISOString(),sourceCommit,localRelease,
    sourceStatus:execFileSync('git',['status','--porcelain'],{encoding:'utf8'}).trim(),environment:'Existing production build; isolated loopback HTTP processes; INTAKE_MODE local/disabled/local; INDEXING_ENABLED=false',
    fixture:path.relative(process.cwd(),directory),applicationChanges:false,scenario:scenario.report,
    disabled:{status:disabledAttempt.status,code:disabledAttempt.body.code,emailAlternative:'info@assist.ge',htmlExplainsDisabled:true,formDisabled:true,storeUnchanged:true,count:2},
    restoredIntake:{id:restored.body.id,count:records.length,sameOriginalCreatedAt:true,fileUnchanged:true,delivery:restored.body.delivery},
    employeeDemo:{kind:'Local JSON read via existing FileStorage, not a recipient/work queue',id:first.id,services:first.services,industry:first.industry,
      receivedAtLocalStorage:first.createdAt.toISOString(),responsible:null,employeeReceiptConfirmed:false,delivery:'not_configured',
      newToInProgress:'გადაუმოწმებელია — პროექტში თანამშრომლის სამუშაო რიგი/სტატუსები არ არსებობს',
      transferFailureAndRecovery:'გადაუმოწმებელია — ნებადართული სატესტო მიმღები და გადაცემის მექანიზმი არ არსებობს',
      requiredStatement:'შენახვა დადასტურდა; თანამშრომელთან მიღება არ დადასტურდა'},
    totalRecords:records.length,recordsForFirstIntent:1,externalNotifications:0,publicRequests:0,
    decision:'შიდა პილოტი დაბლოკილია',reason:'No authorised employee recipient, owner or workflow exists. Storage/retry/disable checks pass; actual handoff is unverified.'};
  const output=path.join(directory,'result.json');await writeFile(output,JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));console.log('Evidence: '+output);
}finally{await running?.stop();}
