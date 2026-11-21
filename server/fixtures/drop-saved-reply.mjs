// Isolated QA transport only. This is not a recipient, queue or delivery adapter.
import {createServer,request} from 'node:http';
import {once} from 'node:events';
import assert from 'node:assert/strict';

export async function dropFirstSavedReply(address, verifySaved) {
  const upstream=new URL(address);
  assert.equal(upstream.protocol,'http:');
  assert.equal(upstream.hostname,'127.0.0.1','Fault injection must stay on loopback');
  let suppressed=false,resolveDrop,rejectDrop;
  const firstDrop=new Promise((resolve,reject)=>{resolveDrop=resolve;rejectDrop=reject;});
  const server=createServer((incoming,outgoing)=>{
    if(incoming.method!=='POST'||incoming.url!=='/api/contacts'){outgoing.writeHead(404).end();return;}
    const forwarded=request(new URL('/api/contacts',upstream),{method:'POST',headers:{
      'Content-Type':'application/json','Idempotency-Key':incoming.headers['idempotency-key']??'',
    }},async response=>{
      try {
        const chunks=[];for await(const chunk of response)chunks.push(chunk);
        const bytes=Buffer.concat(chunks),body=JSON.parse(bytes.toString());
        if(!suppressed&&response.statusCode===201&&body.success===true){
          suppressed=true;
          // Verify durable storage after the upstream201, before breaking the reply.
          const stored=await verifySaved(body.id);
          resolveDrop({upstreamStatus:201,receipt:body,storedBeforeDisconnect:stored});
          outgoing.destroy();return;
        }
        outgoing.writeHead(response.statusCode??502,{'Content-Type':'application/json'}).end(bytes);
      }catch(error){rejectDrop(error);outgoing.destroy();}
    });
    forwarded.on('error',error=>{rejectDrop(error);outgoing.destroy();});
    incoming.pipe(forwarded);
  });
  server.listen(0,'127.0.0.1');await once(server,'listening');
  return {origin:'http://127.0.0.1:'+server.address().port,firstDrop,close:async()=>{
    const closed=once(server,'close');server.close();server.closeAllConnections();await closed;
  }};
}
