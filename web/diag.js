const http=require('http');const CDP='http://127.0.0.1:9223';
http.get(CDP+'/json/list',r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>{
const tab=JSON.parse(d).find(t=>t.type==='page');
const ws=new WebSocket(tab.webSocketDebuggerUrl);
const expr = `(() => {
  const info = document.getElementById('info').innerText;
  const g = window.__dbg;
  let bones = 'no dbg';
  if (g && g.bones) {
    const out = {};
    ['Head','Neck','Hips','Spine','LeftFoot','LeftUpLeg','LeftShoulder'].forEach(k => {
      const b = g.bones[k];
      if (b) { const v = new g.THREE.Vector3(); b.getWorldPosition(v); out[k] = [v.x.toFixed(2), v.y.toFixed(2), v.z.toFixed(2)]; }
    });
    bones = JSON.stringify(out);
  }
  return info + ' || BONES: ' + bones;
})()`;
ws.addEventListener('open',()=>{ws.send(JSON.stringify({id:1,method:'Runtime.evaluate',params:{expression:expr,returnByValue:true}}));});
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.result&&m.result.result){console.log(m.result.result.value);ws.close();}});
});});
