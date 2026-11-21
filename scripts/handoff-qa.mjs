import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn, spawnSync, execFileSync } from 'node:child_process';
import { createServer } from 'node:net';
import { once } from 'node:events';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { randomBytes, randomUUID } from 'node:crypto';
import path from 'node:path';
import { auditRelease } from './audit-release.mjs';
const require=createRequire(import.meta.url),{chromium}=require('playwright');
const sourceCommit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
assert.equal(execFileSync('git',['status','--porcelain'],{encoding:'utf8'}).trim(),'','Commit the test source before release verification');
await mkdir('.artifacts/handoff-runs',{recursive:true});
const dir=await mkdtemp(path.resolve('.artifacts/handoff-runs/run-')),file=path.join(dir,'submissions.json');
const token=randomBytes(32).toString('hex'),other=randomBytes(32).toString('hex');
const result={checkedAt:new Date().toISOString(),sourceCommit,fixture:dir,model:'simulation; no real model',storage:'single-process isolated FileStorage; not production',checks:[],externalRequests:0,mailActions:0,realEmployee:false,actualNotificationDelivery:false,physicalPhone:false};
let logs='',running,browser;
async function start(mode='local',notification='fail',reusePort){
 let port=reusePort;
 if(!port){const socket=createServer().listen(0,'127.0.0.1');await once(socket,'listening');port=socket.address().port;await new Promise(resolve=>socket.close(resolve));}
 const origin='http://127.0.0.1:'+port;
 const env={...process.env,NODE_ENV:'production',HOST:'127.0.0.1',PORT:String(port),DATA_FILE:file,INTAKE_MODE:mode,INDEXING_ENABLED:'false',CHAT_MODE:'simulation',TEST_STAFF_MODE:mode==='local'?'local':'disabled',TEST_STAFF_TOKEN:token,TEST_OTHER_STAFF_TOKEN:other,TEST_NOTIFICATION_RESULT:notification,CORS_ORIGIN:origin,LOG_TO_FILE:'false'};
 const child=spawn(process.execPath,['dist/index.js'],{env,stdio:['ignore','pipe','pipe']});child.stdout.on('data',chunk=>logs+=chunk);child.stderr.on('data',chunk=>logs+=chunk);
 const stop=async()=>{if(child.exitCode!==null)return;const closed=once(child,'close');child.kill();await closed;};
 try{let ready=false;for(let i=0;i<100;i++){try{ready=(await fetch(origin+'/health',{signal:AbortSignal.timeout(500)})).ok;}catch{}if(ready)break;await new Promise(resolve=>setTimeout(resolve,75));}assert.ok(ready,'Local preview did not start');return{origin,port,env,stop};}catch(error){await stop();throw error;}
}
const count=async()=>JSON.parse(await readFile(file,'utf8')).contacts.length;
const post=(origin,payload,key)=>fetch(origin+'/api/contacts',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':key},body:JSON.stringify(payload)});
const staff=(origin,id,credential=token)=>fetch(origin+'/api/test-staff/requests/'+id,{headers:credential?{Authorization:'Bearer '+credential}:{}});
const notify=(origin,id)=>fetch(origin+'/api/test-staff/requests/'+id+'/notification-attempt',{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:'{}'});
try{
 running=await start();result.release=await auditRelease(running.origin,sourceCommit);
 browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});result.browser=await browser.version();
 const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await ctx.route('**/*',async route=>{if(new URL(route.request().url()).origin!==running.origin){result.externalRequests++;await route.abort();}else await route.continue();});
 const page=await ctx.newPage(),chatInputs=[],posts=[],errors=[];page.on('pageerror',error=>errors.push(error.message));
 page.on('request',request=>{if(request.url().endsWith('/api/chat')&&request.method()==='POST')chatInputs.push(request.postDataJSON());if(request.url().endsWith('/api/contacts')&&request.method()==='POST')posts.push({payload:request.postDataJSON(),key:request.headers()['idempotency-key']});});
 await page.goto(running.origin);await page.waitForLoadState('networkidle');await page.getByRole('button',{name:'ჰკითხე ასისტს',exact:true}).click();
 const d=page.getByRole('dialog'),question='მცირე ბიზნესი მაქვს და ბუღალტერიაში დახმარება მჭირდება';
 await d.getByLabel('თქვენი კითხვა',{exact:true}).fill(question);await d.getByRole('button',{name:'კითხვის დასმა',exact:true}).click();await d.getByRole('button',{name:'ვაჭრობა / მაღაზია',exact:true}).click();await d.getByRole('button',{name:'მიმდინარე აღრიცხვა',exact:true}).click();
 await d.locator('a[href="/services/accounting"]').click();await page.waitForURL(/\/services\/accounting$/);await page.getByRole('button',{name:'ჰკითხე ასისტს',exact:true}).click();
 await d.getByRole('button',{name:'მონახაზის ნახვა და შესწორება',exact:true}).click();const draft=d.getByLabel('შეასწორეთ მხოლოდ საჭირო დეტალები',{exact:true});
 const reviewed=(await draft.inputValue())+'\nსატესტო შესწორება: საჭიროა მიმდინარე აღრიცხვის განხილვა.';await draft.fill(reviewed);assert.ok(!reviewed.includes(question));
 assert.ok((await d.getByRole('link',{name:'გახსენით საფოსტო პროგრამა',exact:true}).getAttribute('href')).startsWith('mailto:info@assist.ge?'));
 await d.getByRole('link',{name:'გადატანა სატესტო მოთხოვნაში',exact:true}).click();await page.waitForURL(/\/contact\?/);await page.locator('#message').waitFor();assert.equal(await page.locator('#message').inputValue(),reviewed);
 await page.locator('#name').fill('სატესტო ვიზიტორი');await page.locator('#contact').fill('handoff-fixture@example.invalid');
 await page.getByRole('button',{name:'ჰკითხე ასისტს',exact:true}).click();await d.getByLabel('თქვენი კითხვა',{exact:true}).fill('კალკულატორის ფასი საბოლოოა?');await d.getByRole('button',{name:'კითხვის დასმა',exact:true}).click();await d.getByRole('status').filter({hasText:'დემოა'}).waitFor();await d.getByRole('button',{name:'დახურვა',exact:true}).click();
 assert.ok(chatInputs.every(input=>!JSON.stringify(input).includes('handoff-fixture@example.invalid')&&!JSON.stringify(input).includes('სატესტო ვიზიტორი')));
 await page.getByRole('button',{name:'მოთხოვნის გაგზავნა',exact:true}).click();await page.locator('#privacy-error').waitFor();assert.equal(posts.length,0);result.checks.push('No POST without consent; separate contact form receives only reviewed summary and selection; subsequent chat request excludes contact fields');
 let dropped;
 await page.route('**/api/contacts',async route=>{const response=await route.fetch();assert.equal(response.status(),201);dropped=await response.json();await route.abort('failed');},{times:1});
 await page.locator('#privacy').check();await page.getByRole('button',{name:'მოთხოვნის გაგზავნა',exact:true}).click();await page.locator('.form-status--error').waitFor();assert.equal(await count(),1);assert.equal(await page.locator('.form-status--success').count(),0);assert.equal(await page.locator('#contact').inputValue(),'handoff-fixture@example.invalid');
 await page.getByRole('button',{name:'მოთხოვნის გაგზავნა',exact:true}).dblclick();await page.locator('.form-status--success').waitFor();assert.match(await page.locator('.form-status--success').innerText(),new RegExp('#'+dropped.id+'\\b'));assert.equal(await count(),1);assert.ok(posts.length>=2);assert.ok(posts.every(p=>p.key===posts[0].key));
 const {id}=dropped,{payload,key}=posts[0];result.requestId=id;result.countAfterLostReplyAndRetry=await count();result.reviewedSummary=reviewed;assert.ok(chatInputs.every(input=>!JSON.stringify(input).includes('handoff-fixture@example.invalid')));assert.deepEqual(errors,[]);
 await page.locator('.form-status--success').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(dir,'mobile-receipt.png')});await ctx.close();
 result.checks.push('KA 390px: actual service link → reviewed editable draft → existing form → lost successful response → retry/double-click returns one receipt');
 for(const [credential,status] of [[null,401],[randomBytes(32).toString('hex'),401],[other,403]]){const response=await staff(running.origin,id,credential);assert.equal(response.status,status);assert.doesNotMatch(await response.text(),/handoff-fixture|სატესტო ვიზიტორი/);}
 const visible=await(await staff(running.origin,id)).json();assert.equal(visible.id,id);assert.equal(visible.message,reviewed);assert.deepEqual(visible.services,['bookkeeping']);assert.equal(visible.testHandoff.assignee,'qa-responsible');assert.ok(visible.createdAt);result.authorizedRead=visible;
 const cli=spawnSync(process.execPath,['scripts/test-staff-lookup.mjs',String(id)],{env:{...running.env,TEST_STAFF_ORIGIN:running.origin},encoding:'utf8'});assert.equal(cli.status,0,cli.stderr);assert.equal(JSON.parse(cli.stdout).id,id);result.staffCliVerified=true;
 const failure=await notify(running.origin,id);assert.equal(failure.status,502);result.notificationFailure=await failure.json();assert.equal(await count(),1);assert.equal((await(await staff(running.origin,id)).json()).testHandoff.notification,'failed');
 const createdAt=visible.createdAt,port=running.port;await running.stop();running=undefined;running=await start('local','success',port);
 const replay=await post(running.origin,payload,key);assert.equal(replay.status,201);assert.equal((await replay.json()).id,id);assert.equal(await count(),1);assert.equal((await(await staff(running.origin,id)).json()).createdAt,createdAt);
 const conflict=await post(running.origin,{...payload,message:'შეცვლილი შინაარსი'},key);assert.equal(conflict.status,409);assert.equal((await(await staff(running.origin,id)).json()).message,reviewed);result.conflictStatus=conflict.status;
 const restored=await notify(running.origin,id);assert.equal(restored.status,200);result.notificationRetry=await restored.json();assert.equal(result.notificationRetry.actualDelivery,false);assert.equal(result.notificationRetry.attempts,2);await notify(running.origin,id);assert.equal(await count(),1);
 result.countAfterRestartAndNotificationRetry=await count();result.checks.push('Same ID and creation time after real process restart; changed payload 409; simulated notification failure/retry does not create another request');
 const second=await post(running.origin,payload,randomUUID());assert.equal(second.status,201);result.newIntentId=(await second.json()).id;assert.notEqual(result.newIntentId,id);assert.equal(await count(),2);result.finalCount=await count();
 await running.stop();running=undefined;const before=await readFile(file,'utf8');running=await start('disabled');const disabled=await post(running.origin,payload,randomUUID());assert.equal(disabled.status,503);assert.equal((await staff(running.origin,id)).status,404);assert.equal(await readFile(file,'utf8'),before);result.disabledStatus=disabled.status;
 const fallback=await browser.newPage({viewport:{width:390,height:844}});await fallback.goto(running.origin+'/contact');await fallback.waitForLoadState('networkidle');await fallback.locator('fieldset[disabled]').waitFor();assert.ok(await fallback.locator('a[href="mailto:info@assist.ge"]').count());await fallback.screenshot({path:path.join(dir,'disabled-contact.png')});await fallback.close();
 assert.ok(!logs.includes('handoff-fixture@example.invalid')&&!logs.includes(reviewed)&&!logs.includes(token));assert.equal(result.externalRequests,0);result.checks.push('New deliberate intent gets a distinct ID; disabled API writes nothing and staff route is absent; email fallback remains; no contact/transcript in logs');
 result.passed=true;
}catch(error){result.error=error.stack;result.passed=false;process.exitCode=1;}
finally{await running?.stop();await browser?.close();await writeFile(path.join(dir,'result.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));}
