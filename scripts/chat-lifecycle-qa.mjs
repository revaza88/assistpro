import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { once } from 'node:events';
import { spawn } from 'node:child_process';
import path from 'node:path';
const {chromium}=createRequire(import.meta.url)('playwright');
await mkdir('.artifacts/pr7-review',{recursive:true});const out=await mkdtemp(path.resolve('.artifacts/pr7-review/lifecycle-'));
const socket=createServer().listen(0,'127.0.0.1');await once(socket,'listening');const port=socket.address().port;await new Promise(resolve=>socket.close(resolve));const origin='http://127.0.0.1:'+port;
const child=spawn(process.execPath,['dist/index.js'],{env:{...process.env,NODE_ENV:'production',HOST:'127.0.0.1',PORT:String(port),CORS_ORIGIN:origin,DATA_FILE:path.join(out,'submissions.json'),INTAKE_MODE:'disabled',INDEXING_ENABLED:'false',CHAT_MODE:'simulation',TEST_STAFF_MODE:'disabled',LOG_TO_FILE:'false'},stdio:'ignore'});
const result={checkedAt:new Date().toISOString(),mode:'production build; controlled synthetic HTTP responses for lifecycle regression',externalRequests:0,intakePosts:0,checks:[]};let browser;
try{
 let ready=false;for(let i=0;i<100;i++){try{ready=(await fetch(origin+'/health')).ok;}catch{}if(ready)break;await new Promise(resolve=>setTimeout(resolve,75));}assert.ok(ready);
 result.release=await(await fetch(origin+'/release.json')).json();browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});result.browser=await browser.version();
 const context=await browser.newContext({viewport:{width:390,height:844}});await context.route('**/*',async route=>{if(new URL(route.request().url()).origin!==origin){result.externalRequests++;await route.abort();}else await route.continue();});const page=await context.newPage();page.on('request',r=>{if(r.method()==='POST'&&r.url().endsWith('/api/contacts'))result.intakePosts++;});
 let enabled=true,holdConfig=false,configSeen,releaseConfig;const configStarted=new Promise(resolve=>configSeen=resolve),configReleased=new Promise(resolve=>releaseConfig=resolve);await page.route('**/api/chat/config',async route=>{if(holdConfig){configSeen();await configReleased;}await route.fulfill({json:{enabled,mode:enabled?'simulation':'disabled',testIntakeEnabled:false}});});
 let seen,release;const firstSeen=new Promise(resolve=>seen=resolve),releaseFirst=new Promise(resolve=>release=resolve);let calls=0;
 const reply=(input,text)=>({mode:'simulation',text,context:input.context,sources:[{id:'accounting',title:'Synthetic approved-path fixture',href:'/services/accounting',owner:'QA synthetic fixture',reviewed:'2026-11-21'}]});
 await page.route('**/api/chat',async route=>{const input=route.request().postDataJSON();if(calls++===0){seen();await releaseFirst;try{await route.fulfill({json:reply(input,'STALE_RESPONSE')});}catch{/* Expected when the obsolete request is aborted. */}}else await route.fulfill({json:reply(input,'CURRENT_RESPONSE')});});
 await page.goto(origin);await page.waitForLoadState('networkidle');await page.getByRole('button',{name:'ჰკითხე ასისტს',exact:true}).click();const d=page.getByRole('dialog');await d.getByLabel('თქვენი კითხვა',{exact:true}).fill('ბუღალტერია');await d.getByRole('button',{name:'კითხვის დასმა',exact:true}).click();await firstSeen;
 // Emulate a client-side history selection change while the first answer is in flight.
 await page.evaluate(()=>{history.pushState({},'', '/?sector=medical&services=payroll');window.dispatchEvent(new PopStateEvent('popstate'));});
 await d.getByLabel('თქვენი კითხვა',{exact:true}).fill('ბუღალტერია');await d.getByRole('button',{name:'კითხვის დასმა',exact:true}).click();await d.getByText('CURRENT_RESPONSE',{exact:true}).waitFor();release();await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 assert.equal(await d.getByText('STALE_RESPONSE',{exact:true}).count(),0);await d.getByRole('button',{name:'მონახაზის ნახვა და შესწორება',exact:true}).click();const draft=await d.getByLabel('შეასწორეთ მხოლოდ საჭირო დეტალები',{exact:true}).inputValue();assert.match(draft,/მედიცინა|სამედიცინო/);assert.match(draft,/ხელფას/);result.checks.push('Delayed response cannot overwrite the new medical/payroll selection');
 await page.keyboard.press('Escape');holdConfig=true;await page.getByRole('button',{name:'ჰკითხე ასისტს',exact:true}).click();await configStarted;await page.evaluate(()=>document.querySelector('dialog').dispatchEvent(new Event('close')));releaseConfig();await d.getByLabel('თქვენი კითხვა',{exact:true}).waitFor();result.checks.push('Queued close event from a previous opening cannot abort the reopened dialog');
 await page.keyboard.press('Escape');holdConfig=false;enabled=false;await page.getByRole('button',{name:'ჰკითხე ასისტს',exact:true}).click();await d.getByText(/ჩატი გამორთულია/).waitFor();assert.equal(await d.locator('textarea').count(),0);result.checks.push('Reopening refreshes disabled mode instead of using cached enabled config');
 assert.equal(result.externalRequests,0);assert.equal(result.intakePosts,0);await page.screenshot({path:path.join(out,'disabled-after-refresh.png')});result.passed=true;
}catch(error){result.error=error.stack;result.passed=false;process.exitCode=1;}
finally{await browser?.close();if(child.exitCode===null){const done=once(child,'close');child.kill();await done;}await writeFile(path.join(out,'result.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({...result,evidence:out},null,2));}
