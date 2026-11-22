const fs=require('fs'), http=require('http');
const CDP='http://127.0.0.1:9223';
function get(p){return new Promise((res,rej)=>http.get(CDP+p,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)))}).on('error',rej));}
async function main(){
  const url=process.argv[2]||'http://127.0.0.1:8099/realbody_test.html';
  const out=process.argv[3]||'realbody_shot.png';
  const action=process.argv[4]||'';
  const tabs=await get('/json/list'); const tab=tabs.find(t=>t.type==='page');
  const ws=new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r=>ws.addEventListener('open',r));
  let id=0;const pending=new Map();const errs=[];
  ws.addEventListener('message',ev=>{const m=JSON.parse(ev.data);if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id);}if(m.method==='Runtime.exceptionThrown')errs.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);});
  function send(method,params={}){return new Promise(r=>{const i=++id;pending.set(i,r);ws.send(JSON.stringify({id:i,method,params}));});}
  async function ev(expr){const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});return r.result.result?.value;}
  await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
  await send('Page.navigate',{url:url+'?t='+Date.now()});
  // 等待模型加载
  for(let i=0;i<30;i++){await new Promise(r=>setTimeout(r,400));const ready=await ev('window.__ready===true');if(ready)break;}
  if(action) await ev(action);
  await new Promise(r=>setTimeout(r,600));
  const info=await ev(`document.getElementById('info')?.innerText||document.body.innerText.slice(0,200)`);
  console.log('INFO:',info);
  const shot=await send('Page.captureScreenshot',{format:'png'});
  fs.writeFileSync(out,Buffer.from(shot.result.data,'base64'));
  console.log('SHOT:',out,'ERRORS:',errs.length?errs.join(' | '):'none');
  ws.close();
}
main().catch(e=>{console.error(e);process.exit(1);});
