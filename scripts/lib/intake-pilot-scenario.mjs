import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {randomUUID,createHash} from 'node:crypto';
import {dropFirstSavedReply} from '../../server/fixtures/drop-saved-reply.mjs';

export const pilotPayload={firstName:'Pilot QA',email:'pilot-qa@example.invalid',industry:'education',
  services:['bookkeeping','payroll'],privacy:true,message:'Synthetic pilot inquiry; no employee delivery requested.',
  calculator:{industry:'service',documents:100,employees:5,vat:false,type:'monthly'}};
export const readPilotStore=async file=>JSON.parse(await readFile(file,'utf8'));
export const pilotHash=async file=>createHash('sha256').update(await readFile(file)).digest('hex');
export async function sendPilot(base,key,payload=pilotPayload){
  const url=new URL(base);assert.equal(url.protocol,'http:');assert.equal(url.hostname,'127.0.0.1');
  const response=await fetch(new URL('/api/contacts',url),{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':key},body:JSON.stringify(payload),signal:AbortSignal.timeout(10000)});
  return {status:response.status,body:await response.json()};
}
export async function lostReplyAndNewIntent(base,file){
  const firstKey=randomUUID(),secondKey=randomUUID();
  const proxy=await dropFirstSavedReply(base,async id=>{
    const saved=await readPilotStore(file);
    assert.equal(saved.contacts.length,1);assert.equal(saved.contacts[0].id,id);
    assert.deepEqual(saved.contacts[0].services,pilotPayload.services);
    return {id,count:saved.contacts.length,createdAt:saved.contacts[0].createdAt};
  });
  try {
    let connectionFailure=null;
    try{await sendPilot(proxy.origin,firstKey);}catch(error){connectionFailure=error.message;}
    assert.ok(connectionFailure,'Client must actually lose the successful first response');
    const dropped=await proxy.firstDrop;
    assert.equal(dropped.receipt.delivery,'not_configured');
    const savedHash=await pilotHash(file);
    const retry=await sendPilot(base,firstKey);
    assert.equal(retry.status,201);assert.equal(retry.body.id,dropped.receipt.id);
    assert.equal(await pilotHash(file),savedHash,'Replay must not rewrite or duplicate the first record');
    const afterRetry=(await readPilotStore(file)).contacts.length;assert.equal(afterRetry,1);
    const intentionalSecond=await sendPilot(base,secondKey); // exact same contact and payload; distinct intent
    assert.equal(intentionalSecond.status,201);assert.notEqual(intentionalSecond.body.id,retry.body.id);
    const records=(await readPilotStore(file)).contacts;assert.equal(records.length,2);
    assert.equal(records[0].email,records[1].email);assert.equal(records[0].firstName,records[1].firstName);
    return {firstKey,secondKey,report:{first:{id:dropped.receipt.id,upstreamStatus:dropped.upstreamStatus,
      responseReachedClient:false,connectionFailure,storedBeforeDisconnect:dropped.storedBeforeDisconnect},
      retry:{status:retry.status,id:retry.body.id,count:afterRetry,fileUnchanged:true,delivery:retry.body.delivery},
      intentionalSecond:{status:intentionalSecond.status,id:intentionalSecond.body.id,sameContact:true,samePayload:true,newKey:true,totalCount:records.length}}};
  }finally{await proxy.close();}
}
