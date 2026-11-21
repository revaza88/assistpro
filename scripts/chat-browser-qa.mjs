import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright');
const origin=process.env.CHAT_QA_ORIGIN??'http://127.0.0.1:5140';
assert.ok(['127.0.0.1','localhost'].includes(new URL(origin).hostname),'Run only on loopback');
const out=path.resolve('.artifacts/chat/browser');await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
const release=await(await fetch(origin+'/release.json')).json();
const result={checked_at:new Date().toISOString(),browser:await browser.version(),release,mode:'production; CHAT_MODE=simulation; INTAKE_MODE=disabled; INDEXING_ENABLED=false',checks:[],external_requests:0,intake_posts:0,mail_actions:0,physical_phone:false,screen_reader:false};
const labels={ka:{open:'ჰკითხე ასისტს',question:'თქვენი კითხვა',ask:'კითხვის დასმა',retail:'ვაჭრობა / მაღაზია',monthly:'მიმდინარე აღრიცხვა',review:'მონახაზის ნახვა და შესწორება',edit:'შეასწორეთ მხოლოდ საჭირო დეტალები',mail:'გახსენით საფოსტო პროგრამა',calc:'დემო კალკულატორი',query:'მცირე ბიზნესი მაქვს და ბუღალტერიაში დახმარება მჭირდება'},en:{open:'Ask ASSIST',question:'Your question',ask:'Ask',retail:'Trade / shop',monthly:'Ongoing bookkeeping',review:'Review and edit draft',edit:'Correct only the necessary details',mail:'Open your email app',calc:'Demo calculator',query:'I have a small business and need accounting help'},ru:{open:'Спросить ASSIST',question:'Ваш вопрос',ask:'Спросить',retail:'Торговля / магазин',monthly:'Текущий учёт',review:'Проверить и исправить черновик',edit:'Исправьте только необходимые детали',mail:'Открыть почтовую программу',calc:'Демо-калькулятор',query:'У меня малый бизнес, нужен бухгалтерский учёт'}};
async function context(width){const ctx=await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'});await ctx.route('**/*',async route=>{const url=new URL(route.request().url());if(url.origin!==origin){result.external_requests++;await route.abort();return;}if(route.request().method()==='POST'&&/\/api\/(contacts|job-applications)/.test(url.pathname))result.intake_posts++;await route.continue();});return ctx;}
async function overflow(page){assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'Document overflow');assert.ok(await page.locator('dialog').evaluate(el=>el.scrollWidth<=el.clientWidth+1),'Dialog overflow');}
try{
 for(const language of ['ka','en','ru']){
  const c=labels[language],ctx=await context(language==='ru'?320:390),page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+(language==='ka'?'/':'/'+language+'/'));await page.waitForLoadState('networkidle');assert.equal(await page.locator('dialog').evaluate(el=>el.open),false);
  await page.getByRole('button',{name:c.open,exact:true}).click();const d=page.getByRole('dialog');await d.getByLabel(c.question,{exact:true}).fill(c.query);await d.getByRole('button',{name:c.ask,exact:true}).click();
  await d.getByRole('button',{name:c.retail,exact:true}).click();await d.getByRole('button',{name:c.monthly,exact:true}).click();await d.getByRole('button',{name:c.review,exact:true}).waitFor();
  assert.match(await d.locator('a[href*="/services/accounting"]').getAttribute('href'),/\/services\/accounting$/);await overflow(page);
  if(language==='ka'){
   await page.screenshot({path:out+'/ka-390-answer.png'});
   await d.getByRole('link',{name:c.calc,exact:true}).click();await page.waitForURL(/\/calculator\?/);assert.equal(new URL(page.url()).searchParams.get('sector'),'retail');assert.equal(new URL(page.url()).searchParams.get('services'),'bookkeeping');
   await page.locator('a[href*="/contact?source=calculator"]').first().click();await page.waitForURL(/\/contact\?/);await page.locator('fieldset[disabled]').waitFor();
   await page.getByRole('button',{name:c.open,exact:true}).click();await d.getByRole('button',{name:c.review,exact:true}).waitFor();assert.equal(await d.getByRole('button',{name:c.retail,exact:true}).count(),0,'Do not ask known context again');
  }
  await d.getByRole('button',{name:c.review,exact:true}).click();const edit=d.getByLabel(c.edit,{exact:true});const original=await edit.inputValue();assert.ok(!original.includes(c.query),'No transcript in draft');
  const revised=original+'\nSYNTHETIC: corrected work detail';await edit.fill(revised);const href=await d.getByRole('link',{name:c.mail,exact:true}).getAttribute('href');assert.ok(href.startsWith('mailto:info@assist.ge?'));assert.equal(new URL(href).searchParams.get('body'),revised);
  await edit.scrollIntoViewIfNeeded();await overflow(page);await page.screenshot({path:out+'/'+language+'-draft.png'});
  await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement?.id),'assist-chat-launcher');
  await page.keyboard.press('Enter');await d.waitFor();assert.equal(await d.locator('[role="status"][aria-live="polite"]').getAttribute('aria-atomic'),'true');for(const key of ['Tab','Shift+Tab'])for(let i=0;i<20;i++){await page.keyboard.press(key);assert.ok(await page.evaluate(()=>!document.hasFocus() || document.querySelector('dialog')?.contains(document.activeElement)), JSON.stringify(await page.evaluate(()=>({tag:document.activeElement?.tagName,id:document.activeElement?.id,focused:document.hasFocus(),open:document.querySelector('dialog')?.open})))+' '+language+' '+key+' '+i);}
  if(language==='ka'){
   await page.setViewportSize({width:320,height:844});await page.addStyleTag({content:'html{font-size:200% !important}'});await overflow(page);await edit.scrollIntoViewIfNeeded();await page.screenshot({path:out+'/ka-320-200percent.png'});
   const input=d.getByLabel(c.question,{exact:true});await input.fill('სატესტო');await input.press('Enter');assert.match(await input.inputValue(),/\n/);await input.fill('');
   result.checks.push({case:'KA full path through calculator and disabled contact; corrected draft; Escape return; Tab/Shift+Tab; 320px + 200% text; keyboard newline',pass:true});
  }
  assert.deepEqual(errors,[]);result.checks.push({case:language+' source, two clarifications, editable mailto, focus, overflow',width:language==='ru'?320:390,pass:true});await ctx.close();
 }
 const wide=await context(1440),desktop=await wide.newPage();await desktop.goto(origin+'/?sector=retail&services=bookkeeping%2Ctax-advice');await desktop.waitForLoadState('networkidle');await desktop.getByRole('button',{name:labels.ka.open,exact:true}).click();const modal=desktop.getByRole('dialog');await modal.getByLabel(labels.ka.question,{exact:true}).fill(labels.ka.query);await modal.getByRole('button',{name:labels.ka.ask,exact:true}).click();assert.equal(await modal.getByRole('button',{name:labels.ka.monthly,exact:true}).count(),0,'Known bookkeeping task must not be asked again');await modal.getByRole('button',{name:labels.ka.review,exact:true}).click();assert.match(await modal.getByLabel(labels.ka.edit,{exact:true}).inputValue(),/საგადასახადო/);await overflow(desktop);await desktop.screenshot({path:out+'/desktop-1440.png'});await wide.close();result.checks.push({case:'1440px desktop: existing industry not reasked; both selected services in draft',pass:true});
 const paths=['/services/accounting','/services/tax','/services/audit','/services/legal','/services/business','/services/hr','/faq','/contact'];for(const prefix of ['','/en','/ru'])for(const pathname of paths)assert.equal((await fetch(origin+prefix+pathname)).status,200);result.checks.push({case:'24 localized approved source routes return 200',pass:true});
 const disabledOrigin=process.env.CHAT_QA_DISABLED_ORIGIN??'http://127.0.0.1:5141';assert.ok(['127.0.0.1','localhost'].includes(new URL(disabledOrigin).hostname));
 const ctx=await browser.newContext({viewport:{width:320,height:844}}),page=await ctx.newPage();await page.goto(disabledOrigin);await page.waitForLoadState('networkidle');await page.getByRole('button',{name:labels.ka.open,exact:true}).click();const d=page.getByRole('dialog');await d.getByText(/ჩატი გამორთულია/).waitFor();assert.equal(await d.locator('textarea').count(),0);assert.equal(await d.locator('a[href="mailto:info@assist.ge"]').count(),1);await page.screenshot({path:out+'/disabled-320.png'});await ctx.close();
 result.checks.push({case:'Disabled mode: no input, FAQ/email available',pass:true});assert.equal(result.external_requests,0);assert.equal(result.intake_posts,0);
}catch(error){result.error=error.stack;process.exitCode=1;}finally{await writeFile(out+'/result.json',JSON.stringify(result,null,2)+'\n');await browser.close();console.log(JSON.stringify({...result,release:release.commit},null,2));}
