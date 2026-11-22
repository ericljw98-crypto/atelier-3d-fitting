const fs=require('fs'),http=require('http');
const CDP='http://127.0.0.1:9223';
function get(p){return new Promise((res,rej)=>http.get(CDP+p,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)))}).on('error',rej));}
async function main(){
  const tabs=await get('/json/list');const tab=tabs.find(t=>t.type==='page');
  const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r));
  let id=0;const pending=new Map();const errs=[];
  ws.addEventListener('message',ev=>{const m=JSON.parse(ev.data);if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id);}if(m.method==='Runtime.exceptionThrown')errs.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')errs.push('console:'+m.params.args.map(a=>a.value||a.description).join(' '));});
  function send(method,params={}){return new Promise(r=>{const i=++id;pending.set(i,r);ws.send(JSON.stringify({id:i,method,params}));});}
  async function ev(expr){const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});return r.result.result?.value;}

  await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
  await send('Page.navigate',{url:'http://127.0.0.1:8099/?e2e='+Date.now()});
  await new Promise(r=>setTimeout(r,2000));
  // 用默认档案（首次会自动建档并弹侧边面板）
  await ev(`window.__atelier.applyProfile({height:170,weight:56,bust:90,waist:70,hip:96,shoulder:40,arm:58,inseam:78,neck:36})`);
  await new Promise(r=>setTimeout(r,2500)); // 等模特加载

  const state1=await ev(`JSON.stringify({hasReal:!!window.__atelier.state,canvas:document.querySelectorAll('canvas').length})`);
  console.log('STATE:',state1);

  // 试穿第一件连衣裙
  const clicked=await ev(`(()=>{const cards=document.querySelectorAll('#garment-list .garment-card');if(!cards.length)return 'no cards('+document.querySelectorAll('#garment-list *').length+')';cards[0].click();return cards[0].textContent.slice(0,30);})()`);
  console.log('CLICK:',clicked);
  await new Promise(r=>setTimeout(r,800));

  const fit=await ev(`JSON.stringify({
    verdict:document.getElementById('fit-verdict')?.textContent,
    score:document.querySelector('.fit-score')?.textContent,
    parts:document.querySelectorAll('.fit-part').length,
    report:document.getElementById('fit-report')?.innerText.slice(0,300),
    outfit:document.getElementById('outfit-summary')?.innerText.slice(0,100)
  })`);
  console.log('FIT:',fit);

  const shot=await send('Page.captureScreenshot',{format:'png'});
  fs.writeFileSync('e2e_result.png',Buffer.from(shot.result.data,'base64'));
  console.log('SHOT saved');
  console.log('ERRORS:',errs.length?errs.slice(0,5).join(' | '):'none');
  ws.close();
}
main().catch(e=>{console.error('FAIL',e);process.exit(1);});
