const origin=process.env.TEST_STAFF_ORIGIN??'http://127.0.0.1:5142';
const target=new URL(origin);
if(!['127.0.0.1','localhost','[::1]'].includes(target.hostname)||target.pathname!=='/'||target.search||target.hash||target.username||target.password)throw Error('Only a loopback origin is permitted');
const id=process.argv[2];if(!/^[1-9]\d{0,8}$/.test(id??''))throw Error('Use: node scripts/test-staff-lookup.mjs <request number>');
const token=process.env.TEST_STAFF_TOKEN;if(!/^[a-f0-9]{64}$/.test(token??''))throw Error('Set a synthetic TEST_STAFF_TOKEN for this local fixture');
const response=await fetch(`${target.origin}/api/test-staff/requests/${id}`,{headers:{Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(5000)});
if(!response.ok){console.error('Test staff lookup denied: HTTP '+response.status);process.exitCode=1;}else console.log(JSON.stringify(await response.json(),null,2));
