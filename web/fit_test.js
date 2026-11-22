const fs=require('fs'),http=require('http');const CDP='http://127.0.0.1:9223';
function get(p){return new Promise((res,rej)=>http.get(CDP+p,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)))}).on('error',rej));}
async function main(){
  const tabs=await get('/json/list');const tab=tabs.find(t=>t.type==='page');
  const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r));
  let id=0;const pending=new Map();ws.addEventListener('message',ev=>{const m=JSON.parse(ev.data);if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id);}});
  function send(method,params={}){return new Promise(r=>{const i=++id;pending.set(i,r);ws.send(JSON.stringify({id:i,method,params}));});}
  async function ev(expr){const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});return r.result.result?.value;}
  await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
  await send('Page.navigate',{url:'http://127.0.0.1:8099/?fit='+Date.now()});await new Promise(r=>setTimeout(r,2000));
  await ev(`window.__atelier.applyProfile({height:170,weight:56,bust:90,waist:70,hip:96,shoulder:40,arm:58,inseam:78,neck:36})`);
  await new Promise(r=>setTimeout(r,2000));
  await ev(`document.querySelectorAll('#garment-list .garment-card')[0].click()`);
  await new Promise(r=>setTimeout(r,500));

  for(const size of ['IT 34','IT 40','IT 46']){
    await ev(`document.querySelector('#size-buttons [data-size="${size}"]').click()`);
    await new Promise(r=>setTimeout(r,400));
    const r=await ev(`JSON.stringify({size:document.querySelector('#size-buttons .active')?.dataset.size,verdict:document.getElementById('fit-verdict')?.textContent,score:document.querySelector('.fit-score')?.textContent,parts:[...document.querySelectorAll('.fit-part-status')].map(x=>x.textContent),rec:document.querySelector('.fit-recommend')?.innerText})`);
    console.log(size+':',r);
  }
  // 截 IT34 偏小状态
  await ev(`document.querySelector('#size-buttons [data-size="IT 34"]').click()`);
  await new Promise(r=>setTimeout(r,500));
  const shot=await send('Page.captureScreenshot',{format:'png'});
  fs.writeFileSync('fit_small.png',Buffer.from(shot.result.data,'base64'));
  console.log('SHOT saved');ws.close();
}
main().catch(e=>{console.error(e);process.exit(1);});
