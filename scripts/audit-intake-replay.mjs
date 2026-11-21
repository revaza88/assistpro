// Replays an already saved fictional inquiry; never creates the initial record.
// Refuses non-loopback origins. Do not use with actual personal data.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const [address,file,output]=process.argv.slice(2);
const base=new URL(address);
assert.ok(['127.0.0.1','localhost','[::1]'].includes(base.hostname),'Only isolated loopback intake may be tested');
assert.equal(base.pathname,'/');assert.equal(base.search,'');assert.equal(base.hash,'');
assert.ok(!base.username&&!base.password);
const html=await (await fetch(base)).text();
assert.match(html,/name="intake-mode" content="local"/);assert.match(html,/noindex,follow/);
const before=await readFile(file),data=JSON.parse(before);
assert.equal(data.contacts.length,1,'Expect one existing fictional browser submission');
const {id,createdAt,idempotencyKey,payloadFingerprint,demoEstimate,...payload}=data.contacts[0];
assert.match(payload.email,/@example\.invalid$/,'Use a clearly fictional email');
assert.ok(idempotencyKey);assert.equal(payload.privacy,true);assert.equal(payload.services.length,2);
assert.ok(payload.services.includes('bookkeeping'));assert.equal(demoEstimate.isDemo,true);
const send=body=>fetch(new URL('/api/contacts',base),{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':idempotencyKey},body:JSON.stringify(body)});
const replays=await Promise.all([send(payload),send(payload)]),receipts=[];
for(const response of replays){assert.equal(response.status,201);const receipt=await response.json();assert.equal(receipt.id,id);assert.equal(receipt.intake,'local');assert.equal(receipt.delivery,'not_configured');receipts.push(receipt);}
assert.equal((await send({...payload,privacy:false})).status,400);
assert.equal((await send({...payload,message:payload.message+' conflict'})).status,409);
const after=await readFile(file);assert.deepEqual(after,before,'Replays and rejections must not change the saved file');
const report={checkedAt:new Date().toISOString(),origin:base.origin,recordCount:1,id,industry:payload.industry,services:payload.services,consent:true,demoEstimate,receipts,fileUnchanged:true,fileSha256:createHash('sha256').update(after).digest('hex'),missingConsentStatus:400,changedPayloadStatus:409,employeeReceipt:'not_confirmed',outboundMessages:0};
if(output)await writeFile(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
