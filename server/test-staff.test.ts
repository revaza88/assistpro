import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes, randomUUID } from 'node:crypto';
import { mkdir, mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import { once } from 'node:events';
import { request as httpRequest } from 'node:http';
import express from 'express';
import { FileStorage, ContactReplayConflict } from './file-storage';
import { registerTestStaff, testStaffConfig } from './test-staff';
import { insertContactSchema } from '../src/shared/schemas';

const fields=()=>insertContactSchema.parse({firstName:'სატესტო',email:'synthetic@example.invalid',privacy:true,message:'მხოლოდ შემოწმებული მოკლე აღწერა',industry:'retail',services:['bookkeeping','tax-advice']});
test('test staff fails closed outside isolated loopback and needs distinct synthetic credentials',()=>{
 assert.equal(testStaffConfig({}),null);
 const env={TEST_STAFF_MODE:'local',INTAKE_MODE:'local',HOST:'127.0.0.1',DATA_FILE:path.resolve('.artifacts/guard/data.json'),TEST_STAFF_TOKEN:randomBytes(32).toString('hex'),TEST_OTHER_STAFF_TOKEN:randomBytes(32).toString('hex')};
 assert.ok(testStaffConfig(env));
 for(const patch of [{HOST:'0.0.0.0'},{INTAKE_MODE:'disabled'},{DATA_FILE:path.resolve('data/submissions.json')},{TEST_STAFF_TOKEN:''},{TEST_OTHER_STAFF_TOKEN:env.TEST_STAFF_TOKEN}])assert.throws(()=>testStaffConfig({...env,...patch}));
});
test('stored identity survives reopen, conflicts do not overwrite, a new intent gets a new number',async()=>{
 const base=path.resolve('.artifacts');await mkdir(base,{recursive:true});const dir=await mkdtemp(path.join(base,'staff-storage-'));
 try{
  const file=path.join(dir,'submissions.json'),key=randomUUID(),store=new FileStorage(file),payload=fields();
  const [a,b]=await Promise.all([store.createContact(payload,key,'qa-responsible'),store.createContact(payload,key,'qa-responsible')]);assert.equal(a.id,b.id);assert.equal((await store.getAllContacts()).length,1);
  const reopened=new FileStorage(file),retry=await reopened.createContact(payload,key,'qa-responsible');assert.equal(retry.id,a.id);assert.equal(retry.createdAt.toISOString(),a.createdAt.toISOString());
  await assert.rejects(reopened.createContact({...payload,message:'სხვა შინაარსი'},key,'qa-responsible'),ContactReplayConflict);assert.equal((await reopened.getAllContacts())[0].message,payload.message);
  const second=await reopened.createContact(payload,randomUUID(),'qa-responsible');assert.notEqual(second.id,a.id);assert.equal((await reopened.getAllContacts()).length,2);
  assert.equal(await reopened.getTestContact(a.id,'qa-other'),undefined);
 }finally{assert.equal(path.dirname(dir),base);await rm(dir,{recursive:true,force:true});}
});
test('only assigned test staff can read a numbered record; notification failure and retry preserve it',async()=>{
 const base=path.resolve('.artifacts');await mkdir(base,{recursive:true});const dir=await mkdtemp(path.join(base,'staff-http-'));
 const envKeys=['TEST_STAFF_MODE','INTAKE_MODE','HOST','DATA_FILE','TEST_STAFF_TOKEN','TEST_OTHER_STAFF_TOKEN','TEST_NOTIFICATION_RESULT'] as const;
 const previous=Object.fromEntries(envKeys.map(k=>[k,process.env[k]]));
 const token=randomBytes(32).toString('hex'),other=randomBytes(32).toString('hex');
 Object.assign(process.env,{TEST_STAFF_MODE:'local',INTAKE_MODE:'local',HOST:'127.0.0.1',DATA_FILE:path.join(dir,'submissions.json'),TEST_STAFF_TOKEN:token,TEST_OTHER_STAFF_TOKEN:other,TEST_NOTIFICATION_RESULT:'fail'});
 const app=express();app.use(express.json());const store=new FileStorage(process.env.DATA_FILE);registerTestStaff(app,store);const record=await store.createContact(fields(),randomUUID(),'qa-responsible');
 const server=app.listen(0,'127.0.0.1');await once(server,'listening');const origin='http://127.0.0.1:'+(server.address() as {port:number}).port;
 const address=origin+'/api/test-staff/requests/'+record.id;
 try{
  assert.equal((await fetch(address)).status,401);
  assert.equal((await fetch(address,{headers:{Authorization:'Bearer '+other}})).status,403);
  for(const headers of [{Host:'assist.ge'},{'X-Forwarded-For':'198.51.100.1'},{Forwarded:'for=198.51.100.1'}]){
    const status=await new Promise<number|undefined>((resolve,reject)=>{const req=httpRequest(address,{headers:{Authorization:'Bearer '+token,...headers}},res=>{res.resume();res.on('end',()=>resolve(res.statusCode));});req.on('error',reject);req.end();});
    assert.equal(status,403);
  }
  const read=await fetch(address,{headers:{Authorization:'Bearer '+token}});assert.equal(read.status,200);const visible=await read.json();assert.equal(visible.id,record.id);assert.deepEqual(visible.services,['bookkeeping','tax-advice']);assert.equal(visible.testHandoff.assignee,'qa-responsible');assert.ok(!('idempotencyKey' in visible));
  const notify=()=>fetch(address+'/notification-attempt',{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:'{}'});
  const failure=await notify();assert.equal(failure.status,502);assert.equal((await failure.json()).actualDelivery,false);assert.equal((await new FileStorage(process.env.DATA_FILE).getTestContact(record.id,'qa-responsible'))?.testHandoff?.notification,'failed');
  process.env.TEST_NOTIFICATION_RESULT='success';const success=await notify();assert.equal(success.status,200);assert.equal((await success.json()).notification,'simulated');await notify();assert.equal((await store.getAllContacts()).length,1);assert.equal((await store.getTestContact(record.id,'qa-responsible'))?.testHandoff?.attempts,2);
  const lookup=store.getTestContact.bind(store);store.getTestContact=async()=>{throw Error('SYNTHETIC_PRIVATE_STORAGE_FAILURE');};
  const unavailable=await fetch(address,{headers:{Authorization:'Bearer '+token}});assert.equal(unavailable.status,503);assert.doesNotMatch(await unavailable.text(),/SYNTHETIC_PRIVATE/);const notificationUnavailable=await notify();assert.equal(notificationUnavailable.status,503);assert.equal((await notificationUnavailable.json()).stored,false);store.getTestContact=lookup;assert.equal((await fetch(address,{headers:{Authorization:'Bearer '+token}})).status,200);
 }finally{server.closeAllConnections();await new Promise<void>(resolve=>server.close(()=>resolve()));for(const key of envKeys){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key];}assert.equal(path.dirname(dir),base);await rm(dir,{recursive:true,force:true});}
});
