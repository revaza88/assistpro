import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearch, Link } from 'wouter';
import type { ChatContext, ChatReply, ChatLanguage, ChatTask } from '@shared/chat';
import { chatEmail } from '@shared/chat';
import { parseSelection, selectionHref, emptySelection, industryIds, serviceIds, type IndustryId } from '@shared/selection';
import { calculatorForSelection, calculatorHref, parseCalculatorQuery } from '@shared/calculator-context';
import { requestCopy } from '@/lib/request-copy';
import { chatCopy } from '@/lib/chat-copy';
import { useInquiryDraft } from '@/contexts/inquiry-draft';
import './assist-chat.css';

export default function AssistChat() {
 const {i18n}=useTranslation();const lang=(i18n.language.startsWith('en')?'en':i18n.language.startsWith('ru')?'ru':'ka') as ChatLanguage;
 const c=chatCopy(lang), labels=requestCopy(lang), search=useSearch();
 const {update:updateInquiry}=useInquiryDraft();
 const handoff = {ka:{button:'გადატანა სატესტო მოთხოვნაში',notice:'მხოლოდ იზოლირებული ტესტი: მონახაზი შეგიძლიათ არსებულ ფორმაში გადაიტანოთ. საკონტაქტო მონაცემებს ფორმაში ამატებთ; AI მათ არ იღებს.'},en:{button:'Continue to test inquiry',notice:'Isolated test only: transfer the reviewed draft to the existing form. Add contact details there; they are not sent to AI.'},ru:{button:'Перейти к тестовому запросу',notice:'Только изолированный тест: перенесите проверенный черновик в существующую форму. Контакты вводятся там и не передаются AI.'}}[lang];
 const initial=():ChatContext=>({selection:parseSelection(search)??structuredClone(emptySelection),industryKnown:new URLSearchParams(search).has('sector')});
 const [context,setContext]=useState<ChatContext>(initial), [reply,setReply]=useState<ChatReply|null>(null), [question,setQuestion]=useState(''),[enabled,setEnabled]=useState(false),[ready,setReady]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(''),[draft,setDraft]=useState<string|null>(null);
 const dialog=useRef<HTMLDialogElement>(null), request=useRef<AbortController|null>(null), inFlight=useRef(false);
 const revision=useRef(0), configuration=useRef<AbortController|null>(null);
 function cancelAnswer(){revision.current++;request.current?.abort();request.current=null;inFlight.current=false;setBusy(false);}
 function close(){cancelAnswer();configuration.current?.abort();}
 const [testIntake,setTestIntake]=useState(false);
 // In memory only. Preserve the latest site selection on calculator/contact navigation.
 useEffect(()=>{cancelAnswer();const value=parseSelection(search);if(value&&new URLSearchParams(search).has('sector')){setContext({selection:value,industryKnown:true});setReply(null);setDraft(null);}},[search]);
 useEffect(()=>{cancelAnswer();setReply(null);setError('');setDraft(null);},[lang]);
 useEffect(()=>()=>{revision.current++;request.current?.abort();configuration.current?.abort();},[]);
 async function open(){
  dialog.current?.showModal();configuration.current?.abort();const controller=new AbortController();configuration.current=controller;setReady(false);setError('');
  const timeout=setTimeout(()=>controller.abort(),3000);
  try{const r=await fetch('/api/chat/config',{cache:'no-store',signal:controller.signal});const data=await r.json();if(configuration.current!==controller||!dialog.current?.open)return;setEnabled(r.ok&&data.enabled===true&&data.mode==='simulation');setTestIntake(r.ok&&data.testIntakeEnabled===true);}
  catch{if(configuration.current===controller){setEnabled(false);setTestIntake(false);}}
  finally{clearTimeout(timeout);if(configuration.current===controller)setReady(true);}
 }
 async function ask(event?:FormEvent, next=context, message=question){
  event?.preventDefault();if(inFlight.current||!message.trim()||!enabled)return;
  inFlight.current=true;setBusy(true);setError('');setDraft(null);setReply(null);
  const version=++revision.current;
  const controller=new AbortController();request.current=controller;const timeout=setTimeout(()=>controller.abort(),5000);
  try{const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language:lang,message,context:next}),signal:controller.signal});const data=await r.json();if(version!==revision.current||!dialog.current?.open)return;if(!r.ok){setError(data.code==='SENSITIVE_DATA'?c.sensitive:c.error);return;}setReply(data);setContext(data.context);setQuestion('');}
  catch{if(version===revision.current)setError(c.error);}finally{clearTimeout(timeout);if(version===revision.current){setBusy(false);inFlight.current=false;request.current=null;}}
 }
 useEffect(()=>{const listener=()=>{void open();};window.addEventListener('assist-chat-open',listener);return()=>window.removeEventListener('assist-chat-open',listener);});
 function review(){setDraft([c.summary,`${c.industry}: ${labels.industryLabels[industryIds.indexOf(context.selection.industry)]}`,`${c.selected}: ${context.selection.services.map(s=>labels.serviceLabels[serviceIds.indexOf(s)]).join(', ')}`,context.task?`${c.task}: ${c[context.task]}`:'',c.demo].filter(Boolean).join('\n'));}
 const calc=calculatorHref('/calculator',parseCalculatorQuery(search)??calculatorForSelection(context.selection),context.selection);
 const calculation=parseCalculatorQuery(search);
 const contactHref=calculation?calculatorHref('/contact',calculation,context.selection):selectionHref('/contact',context.selection);
 return <>
  <dialog ref={dialog} className="assist-chat" aria-labelledby="assist-chat-title" aria-describedby="assist-chat-intro" onClose={close}>
   <header className="assist-chat-head"><h2 id="assist-chat-title">{c.title}</h2><button type="button" className="site-button site-button-outline" onClick={()=>dialog.current?.close()} autoFocus>{c.close}</button></header>
   <div className="assist-chat-body">
   <p className="assist-chat-badge">{c.badge}</p><p id="assist-chat-intro">{c.intro}</p><p>{testIntake?handoff.notice:labels.unavailable}</p><p id="assist-chat-caution">{c.caution}</p>
   {!ready?<p role="status">{c.busy}</p>:!enabled?<p role="status">{c.disabled}</p>:<>
    <form onSubmit={ask}><label htmlFor="assist-chat-question">{c.question}</label><textarea id="assist-chat-question" aria-describedby="assist-chat-caution" maxLength={500} rows={3} value={question} onChange={e=>setQuestion(e.target.value)} required/><button type="submit" className="site-button" disabled={busy||!question.trim()}>{busy?c.busy:c.send}</button></form>
    <p role="status" aria-live="polite" aria-atomic="true">{busy?c.busy:reply?reply.text:''}</p>
    {error&&<p role="alert" className="assist-chat-error">{error}</p>}
    {reply&&<div className="assist-chat-result">
     <ul>{reply.sources.map(s=><li key={s.id}><Link href={s.href} onClick={()=>dialog.current?.close()}>{c.source}: {s.title}</Link></li>)}</ul>
     {reply.need==='industry'&&<fieldset><legend>{c.industry}</legend>{(['retail','service','other'] as const).map(id=><button key={id} type="button" className="site-button site-button-outline" disabled={busy} onClick={()=>{const next={...context,industryKnown:true,selection:{...context.selection,industry:id as IndustryId}};setContext(next);void ask(undefined,next,c[id]);}}>{c[id]}</button>)}</fieldset>}
     {reply.need==='task'&&<fieldset><legend>{c.task}</legend>{(['monthly','cleanup','payroll'] as const).map(task=><button key={task} type="button" className="site-button site-button-outline" disabled={busy} onClick={()=>{const next={...context,task:task as ChatTask};setContext(next);void ask(undefined,next,c[task]);}}>{c[task]}</button>)}</fieldset>}
    </div>}
    {!reply?.need&&context.selection.services.length>0&&<><p>{c.follow}</p><p>{c.demo}</p><Link className="site-button site-button-outline" href={calc} onClick={()=>dialog.current?.close()}>{c.calculator}</Link><button type="button" className="site-button" onClick={review}>{c.preview}</button></>}
    {draft!==null&&<section><h3>{c.draft}</h3><label htmlFor="assist-chat-draft">{c.edit}</label><textarea id="assist-chat-draft" rows={7} maxLength={1200} value={draft} onChange={e=>setDraft(e.target.value)}/><p>{c.mailNotice}</p><a className="site-button" href={`mailto:${chatEmail}?subject=${encodeURIComponent(c.subject)}&body=${encodeURIComponent(draft)}`}>{c.openMail}</a>{testIntake&&<Link className="site-button site-button-outline" href={contactHref} onClick={()=>{updateInquiry({message:draft,privacy:false});dialog.current?.close();}}>{handoff.button}</Link>}</section>}
    <button type="button" className="site-button site-button-outline" onClick={()=>{cancelAnswer();setContext(initial());setQuestion('');setReply(null);setDraft(null);setError('');}}>{c.clear}</button>
   </>}
   <nav className="assist-chat-links" aria-label={c.follow}><Link href="/faq" onClick={()=>dialog.current?.close()}>{c.faq}</Link><a href={`mailto:${chatEmail}`}>{chatEmail}</a></nav>
   </div>
  </dialog>
 </>;
}
