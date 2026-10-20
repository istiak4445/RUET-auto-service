import { inject } from '@vercel/analytics';
import * as THREE from 'three';
inject({ mode: import.meta.env.PROD ? 'production' : 'development' });
const $=s=>document.querySelector(s);
const renderer=new THREE.WebGLRenderer({canvas:$('#game'),antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<650?1.5:2));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;
const scene=new THREE.Scene();scene.background=new THREE.Color('#c5d5d0');scene.fog=new THREE.Fog('#c5d5d0',38,115);
const camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.1,180);camera.position.set(-10,8,15);camera.lookAt(0,1,-7);
scene.add(new THREE.HemisphereLight(0xe5f3cb,0x52674e,2.1));const sun=new THREE.DirectionalLight(0xffe1a6,2.5);sun.position.set(-15,28,12);sun.castShadow=true;sun.shadow.mapSize.set(innerWidth<650?1024:2048,innerWidth<650?1024:2048);Object.assign(sun.shadow.camera,{left:-30,right:30,top:40,bottom:-40});sun.shadow.bias=-.001;scene.add(sun);
const mats={};function mat(c){return mats[c]??=new THREE.MeshStandardMaterial({color:c,roughness:.8})}function box(w,h,d,c,x=0,y=0,z=0,parent=scene){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}function cyl(r1,r2,h,c,x,y,z,parent=scene,n=12){let o=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,n),mat(c));o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o}
box(240,.3,240,'#6b8656',0,-.25,-55);box(10,.16,240,'#404b4b',0,-.04,-55);for(let s of [-1,1]){box(.22,.06,240,'#e9ddac',s*4.65,.07,-55);box(1.5,.22,240,'#acac8e',s*5.9,.02,-55)}
const moving=[];for(let z=12;z>-130;z-=7){for(let x of [-1.65,1.65]){let o=box(.1,.025,2.4,'#e2dcb5',x,.06,z);moving.push(o)}}
function textSprite(text,bg='#f0e2a8',fg='#183b2c',w=5,h=1){let c=document.createElement('canvas');c.width=1024;c.height=256;let ctx=c.getContext('2d');ctx.fillStyle=bg;ctx.fillRect(0,0,1024,256);ctx.fillStyle=fg;ctx.font='bold 105px Hind Siliguri, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,512,132,980);let tex=new THREE.CanvasTexture(c);let mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide}));return mesh}
const scenery=[];function tree(x,z){let g=new THREE.Group();cyl(.18,.3,3,'#68553d',0,1.5,0,g);for(let i=0;i<3;i++){let o=new THREE.Mesh(new THREE.IcosahedronGeometry(1.7-i*.22,1),mat(i===1?'#426a41':'#527b45'));o.position.set(i===1?.55:-.25,3+i*.65,0);o.castShadow=true;g.add(o)}g.position.set(x,0,z);scene.add(g);scenery.push(g)}
for(let i=0;i<24;i++){let z=12-i*6;tree(-8-Math.random()*3,z);tree(8+Math.random()*4,z);if(i%3===0){for(let side of [-1,1]){let g=new THREE.Group();let h=5+Math.random()*6;box(7,h,6,i%2?'#d8c6a0':'#bcc4a0',0,h/2,0,g);for(let y=1.5;y<h;y+=2)for(let x=-2.3;x<3;x+=1.5)box(.8,1,.08,'#496b60',x,y,3.05,g);box(7.4,.3,6.5,'#62765c',0,h,0,g);g.position.set(side*17,0,z);scene.add(g);scenery.push(g)}}}
const gate=new THREE.Group();for(let x of [-5.8,5.8])box(.7,5,.7,'#c8ba91',x,2.5,0,gate);box(12.5,1.15,.8,'#254c3b',0,5,0,gate);const sign=textSprite('RUET • রুয়েট অটো সার্ভিস','#254c3b','#eff0c0',11,1);sign.position.set(0,5,.43);gate.add(sign);gate.position.z=-35;scene.add(gate);scenery.push(gate);
// Bangladesh local battery auto: open sides, bench seating, green steel body, yellow vinyl roof.
const auto=new THREE.Group();scene.add(auto);auto.position.set(0,0,3);const wheels=[];
box(2.05,.28,3.25,'#166c47',0,.65,0,auto);box(1.95,.55,1.3,'#1e8656',0,1.03,.6,auto);box(1.7,.22,1,'#442e25',0,1.42,.55,auto);box(1.75,.65,.18,'#4b3228',0,1.65,1.1,auto);box(1.75,.18,.5,'#4b3228',0,1.1,-.7,auto);
for(let x of [-.94,.94])for(let z of [-1.25,1.3])cyl(.045,.045,1.8,'#b8c5a6',x,1.75,z,auto,8);
box(2.2,.17,3.15,'#e5bd3c',0,2.7,0,auto);box(2.24,.16,.16,'#f1d45c',0,2.56,1.55,auto);box(2,.6,.18,'#178454',0,1.05,1.55,auto);box(1.1,.7,.45,'#168658',0,1.12,-1.4,auto);
const windshield=new THREE.Mesh(new THREE.PlaneGeometry(1.72,.85),new THREE.MeshPhysicalMaterial({color:'#b0e3cd',transparent:true,opacity:.22,side:THREE.DoubleSide,roughness:.1}));windshield.position.set(0,2.08,-1.28);auto.add(windshield);
for(let x of [-.77,.77])box(.25,.23,.08,'#ffe5a0',x,1.08,-1.67,auto);for(let x of [-.8,.8])box(.22,.16,.07,'#e65d38',x,1.1,1.67,auto);box(.7,.25,.06,'#e8ddab',0,.87,1.67,auto);let plate=textSprite('অটো','#e8ddab','#16422c',.65,.22);plate.position.set(0,.87,1.71);auto.add(plate);
for(let [x,z] of [[-1.02,.95],[1.02,.95],[0,-1.32]]){let w=cyl(.39,.39,.23,'#202d28',x,.43,z,auto,20);w.rotation.z=Math.PI/2;wheels.push(w);let hub=cyl(.19,.19,.245,'#b3bb9a',x,.43,z,auto,12);hub.rotation.z=Math.PI/2}
const passengers=[];for(let i=0;i<5;i++){let g=new THREE.Group();box(.4,.54,.35,['#e7d8ac','#e67b4a','#627da0','#efb44e','#c1cf99'][i],0,1.75,0,g);cyl(.19,.18,.34,'#b98058',0,2.17,0,g);g.position.set((i%3-1)*.5,0,i<3?.65:-.65);auto.add(g);passengers.push(g)}
let state='intro',lane=0,dist=0,health=5,shield=0,cooldown=0,spawn=0,invuln=0,lastDay=1,soundOn=true,audio,engine,engineGain,beat=0;const obstacles=[];const lanes=[-3.25,0,3.25];const clock=new THREE.Clock();let toastTimer,captionTimer;
function initAudio(){if(audio)return;audio=new(window.AudioContext||window.webkitAudioContext)();engine=audio.createOscillator();engine.type='sawtooth';engineGain=audio.createGain();engineGain.gain.value=0;let f=audio.createBiquadFilter();f.type='lowpass';f.frequency.value=160;engine.connect(f).connect(engineGain).connect(audio.destination);engine.start()}
function tone(freq,duration=.15,type='sine',vol=.07){if(!soundOn||!audio)return;let o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(vol,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+duration)}
function toast(t){$('#toast').textContent=t;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').textContent='',2400)}function caption(t){$('#caption').textContent=t;$('#caption').style.opacity=1;clearTimeout(captionTimer);captionTimer=setTimeout(()=>$('#caption').style.opacity=0,2800)}
const phases=['প্রস্তাব উঠল','কে কে একমত?','একটু ভেবে দেখো','আবার আলোচনা','ফাইনাল পোল'];
let consensus=35,nextMeeting=400;
function hud(){let day=Math.min(5,Math.floor(dist/400)+1);$('#day').innerHTML=`DAY ${String(day).padStart(2,'0')} <i>/ 05</i>`;$('#hearts').textContent='● '.repeat(health)+'○ '.repeat(5-health);$('#distance').textContent=`${phases[day-1]}`;$('#compactDay').textContent=`দিন ${day}/৫`;$('#compactCrew').textContent=`ঐক্য ${health}/৫`;$('#progress').style.width=`${dist/2000*100}%`;$('#dayProgress').textContent=`আলোচনা শেষ ${Math.min(100,Math.floor(dist/2000*100))}%`;$('#supportFill').style.width=consensus+'%';$('#supportNumber').textContent=consensus+'%';$('#supportNeed').textContent=consensus>=70?'৭০% লক্ষ্য পূরণ · পঞ্চম দিন পর্যন্ত ধরে রাখো':`আর ${70-consensus}% সমর্থন দরকার`;$('#supportFill').classList.toggle('ready',consensus>=70);$('#daySteps').innerHTML=[1,2,3,4,5].map(n=>`<span class="${n===day?'current':n<day?'done':''}">${n}</span>`).join('');passengers.forEach((p,i)=>p.visible=i<health);if(day!==lastDay){lastDay=day;toast(`দিন ${day} — ${phases[day-1]}`);tone(660,.3)}}function best(){return 0}
function person(parent,x,z,color='#e3d2b0',pose='talk'){
 const g=new THREE.Group();g.position.set(x,0,z);parent.add(g);
 for(let leg of [-.16,.16]){box(.19,.7,.24,'#283b3c',leg,.4,0,g);box(.23,.12,.4,'#27302d',leg,.08,.08,g)}
 cyl(.29,.24,.8,color,0,1.1,0,g);cyl(.19,.18,.36,'#b7815b',0,1.72,0,g,16);cyl(.2,.19,.12,'#29332b',0,1.92,0,g,16);
 for(let side of [-1,1]){let arm=box(.14,.65,.16,color,side*.34,1.12,0,g);arm.rotation.z=side*(pose==='stop'?.95:.35)}
 if(pose==='phone'){box(.14,.25,.045,'#182623',.36,1.65,.14,g);box(.1,.17,.05,'#9ac7ab',.36,1.65,.17,g)}
 return g;
}
const encounters={
 tea:{role:'চায়ের আড্ডা',icon:'☕',quote:'বস ভাই, সবাই মিলে কথা বলি।',action:'এই লেনে যাও · ঐক্য +১, সমর্থন +৪%',color:'#d7f47d',benefit:true},
 crowd:{role:'দ্বিধায় থাকা সহপাঠী',icon:'?',quote:'সবাই থাকলে আমিও আছি…',action:'এই লেনে গিয়ে «কথা বলো» · সমর্থন +৬%',color:'#f4ce79',benefit:false},
 desk:{role:'সিআর ঘোস্ট করছে',icon:'CR',quote:'Seen 2h ago · কোনো রিপ্লাই নেই।',action:'কাছে গিয়ে «কথা» চাপো · কনফার্ম লিস্ট পাঠাও +৫%',color:'#94d4e4',benefit:false},
 phone:{role:'চাপের ফোন',icon:'☎',quote:'পরের ব্যাপারটাও ভেবে রেখো…',action:'লেন বদলাও · ধরলে সমর্থন −৫%',color:'#f3a48c',benefit:false},
 gate:{role:'উপস্থিতির খাতা',icon:'▤',quote:'কালকের উপস্থিতিটা মনে আছে তো?',action:'লেন বদলাও · পড়লে ঐক্য −১, সমর্থন −৪%',color:'#f3a48c',benefit:false}
};
let encounterCount=0;const projected=new THREE.Vector3();
function updateEncounterUI(){
 let nearest=null;
 for(const o of obstacles){
 const e=encounters[o.type];projected.set(o.g.position.x,2.9,o.g.position.z).project(camera);
 const visible=state==='playing'&&o.g.position.z>-52&&o.g.position.z<1&&projected.z<1;
 o.tag.style.display='none';if(visible){o.tag.style.left=`${(projected.x*.5+.5)*innerWidth}px`;o.tag.style.top=`${(-projected.y*.5+.5)*innerHeight}px`;o.tag.style.opacity=o.g.position.z< -35?'.65':'1'}
 if(o.g.position.z<1&&o.g.position.z>-(innerWidth<900?23:38)&&(!nearest||o.g.position.z>nearest.g.position.z))nearest=o;
 }
 const panel=$('#encounter');panel.classList.toggle('hidden',!nearest||state!=='playing');
 if(nearest&&state==='playing'){
 nearest.tag.style.display='none';
 projected.set(nearest.g.position.x,2.45,nearest.g.position.z).project(camera);
 const anchorX=(projected.x*.5+.5)*innerWidth,anchorY=(-projected.y*.5+.5)*innerHeight;
 const bubbleWidth=Math.min(286,innerWidth-32),bubbleHeight=panel.offsetHeight||118;
 const left=THREE.MathUtils.clamp(anchorX-bubbleWidth/2,14,innerWidth-bubbleWidth-14);
 const top=Math.max(12,anchorY-bubbleHeight-20);
 panel.style.left=left+'px';panel.style.top=Math.max(190,top)+'px';panel.style.setProperty('--pointer-x',THREE.MathUtils.clamp(anchorX-left,16,bubbleWidth-16)+'px');
 const e=encounters[nearest.type];panel.style.setProperty('--event-color',e.color);$('#eventRole').textContent=e.icon+'  '+e.role;$('#eventQuote').textContent='“'+e.quote+'”';$('#eventAction').textContent=e.action;$('#eventLane').textContent=['বাঁ লেন','মাঝের লেন','ডান লেন'][nearest.l];}
}
function resolveEncounter(o){
 const talking=shield>0;
 if(o.type==='tea'){health=Math.min(5,health+1);consensus=Math.min(100,consensus+4);toast('আড্ডায় জট খুলল · ঐক্য +১ · সমর্থন +৪%');tone(880,.18)}
 else if(o.type==='crowd'||o.type==='desk'){
 if(talking){let gain=o.type==='crowd'?6:5;consensus=Math.min(100,consensus+gain);toast(o.type==='crowd'?'“আচ্ছা, আমিও আছি!” · সমর্থন +৬%':'লিস্ট পাঠানোর পর সিআর রিপ্লাই দিল · +৫%');tone(660,.2)}
 else{consensus=Math.max(0,consensus-2);if(o.type==='desk'){health=Math.max(0,health-1);toast('সিআর সিন করে চুপ · স্টুডেন্টরা ক্ষুব্ধ · ঐক্য −১');if(health===0)end(false)}else toast('কথা না হওয়ায় দ্বিধা রয়ে গেল · −২%');tone(220,.15)}
 }else if(talking){toast('শান্ত থেকে চাপ সামলে নিলে · ক্ষতি নেই');tone(550,.15)}
 else if(invuln<=0){health--;consensus=Math.max(0,consensus-(o.type==='phone'?5:4));invuln=1.8;toast(o.type==='phone'?'ফোনের পর গ্রুপে সংশয় · ঐক্য −১ · সমর্থন −৫%':'উপস্থিতি নিয়ে দুশ্চিন্তা · ঐক্য −১ · সমর্থন −৪%');tone(130,.3);if(health<=0)end(false)}
}
function addObstacle(){let g=new THREE.Group(),r=Math.random(),type=r<.28?'tea':['crowd','desk','phone','gate'][Math.floor(Math.random()*4)];let l=encounterCount===0?1:Math.floor(Math.random()*3);type=['tea','crowd','desk','phone','gate'][encounterCount%5];encounterCount++;
 if(type==='tea'){
 // A campus tea table: collect the conversation rather than a floating cup.
 box(1.4,.12,.85,'#93633c',0,.85,0,g);for(let x of [-.55,.55])for(let z of [-.3,.3])box(.09,.85,.09,'#493e2d',x,.42,z,g);
 for(let x of [-.4,0,.4]){cyl(.1,.075,.22,'#ddbc80',x,1.02,0,g);cyl(.075,.075,.02,'#6d3923',x,1.14,0,g)}
 person(g,-.9,-.1,'#d9c477');person(g,.9,-.1,'#6d9895');
 }else if(type==='crowd'){person(g,-.65,0,'#d8c3a1');person(g,.55,.25,'#668c8e');person(g,0,-.6,'#b88361')}
 else if(type==='desk'){box(1.9,.12,.85,'#8e613e',0,.9,0,g);for(let x of [-.8,.8])for(let z of [-.3,.3])box(.09,.9,.09,'#454b3e',x,.45,z,g);box(.45,.03,.32,'#ede5c7',.3,.99,.1,g);person(g,0,-.6,'#b6c3aa','stop');box(.4,.05,.3,'#34493d',-.5,1,0,g)}
 else if(type==='phone'){person(g,0,0,'#778f9e','phone');const wave=new THREE.Mesh(new THREE.TorusGeometry(.28,.035,6,16,Math.PI*1.5),mat('#efa387'));wave.position.set(.6,1.8,0);g.add(wave)}
 else {for(let x of [-1,1]){cyl(.09,.09,1.6,'#c6c4aa',x,.8,0,g);cyl(.23,.23,.12,'#575e50',x,.06,0,g)}let bar=box(2.2,.12,.12,'#bd5741',0,1.15,0,g);person(g,.55,-.55,'#aeb69b','stop');box(.5,.08,.42,'#593e2c',.5,1.35,-.2,g);box(.43,.025,.36,'#efe4c6',.5,1.4,-.2,g)}
 const e=encounters[type];const circle=new THREE.Mesh(new THREE.RingGeometry(.8,1.02,32),new THREE.MeshBasicMaterial({color:e.color,transparent:true,opacity:.7,side:THREE.DoubleSide}));circle.rotation.x=-Math.PI/2;circle.position.y=.075;g.add(circle);
 const tag=document.createElement('div');tag.className='actor-tag';tag.style.setProperty('--event-color',e.color);tag.innerHTML='<b>'+e.icon+' '+e.role+'</b><span>'+(type==='tea'?'যোগ দাও +৪%':type==='crowd'||type==='desk'?'কথা বলো → সমর্থন বাড়াও':'সাবধান · লেন বদলাও')+'</span>';$('#actorLabels').append(tag);
 g.position.set(lanes[l],0,-85);scene.add(g);obstacles.push({g,l,type,hit:false,warned:false,tag});
}
const meetings=[
 {who:'ব্যাচ গ্রুপ · প্রথম দিনের রাত',title:'অটো নেবে কারা? কাউন্ট পাওয়া যাচ্ছে না।',text:'গ্রুপে তিন দিনের অটোর প্রস্তাব এসেছে। কয়েকজন “আছি” বলেছে, বাকিরা শুধু সিন দিয়েছে। কে রাজি আর কে রাজি না—এখনো পরিষ্কার না।',a:'হ্যাঁ / না দিয়ে একটা পোল দিই',b:'যারা সিন দিয়েছে, তাদেরও রাজি ধরি',gain:16,loss:8,good:'পোলে যারা চুপ ছিল তারাও মত দিল। সমর্থনের হিসাব পরিষ্কার হলো।',bad:'সিন দেওয়া কয়েকজন বলল, “আমি তো হ্যাঁ বলিনি!”'},
 {who:'ব্যাচ গ্রুপ · দ্বিতীয় দিনের রাত',title:'সিআর ঘোস্ট করছে।',text:'“ভাই, অটোর ব্যাপারে কী হলো?” মেসেজটা দুই ঘণ্টা আগে সিন হয়েছে। সিআর অনলাইনে আসছে, কিন্তু উত্তর দিচ্ছে না। স্টুডেন্টরা রেগে লিখছে: “ডিসিশন তো সিআর দেবে। সিন করে বসে থাকলে হবে?”',a:'ব্যাচের মত জানিয়ে সিআরকে সিদ্ধান্ত দিতে বলি',b:'সিআর চুপ থাক, সবাইকে আরও অপেক্ষা করাই',gain:15,loss:10,good:'কনফার্ম লিস্ট পেয়ে সিআর উত্তর দিল: “আচ্ছা, ব্যাচের সিদ্ধান্তটা বুঝলাম।”',bad:'স্টুডেন্টরা রেগে গেল: “এতক্ষণেও একটা সিদ্ধান্ত দিতে পারল না!” কয়েকজন ক্লাসে যাওয়ার কথা বলল।'},
 {who:'ক্লাসের খবর · তৃতীয় দিনের রাত',title:'“ভাই, আমার অ্যাটেনডেন্স এমনিতেই কম।”',text:'সব ক্লাসেই অ্যাটেনডেন্স নেওয়া হয়। তিন দিন অটো নিলে কয়েকজনের অ্যাটেনডেন্স আরও কমে যাবে। তারা বলছে: “তোমরা অটো নিলে নাও, আমার আর ক্লাস মিস দেওয়ার অবস্থা নাই।”',a:'তাদের কথা শুনে অটোর তারিখ নিয়ে আবার ভোট নিই',b:'আগের তারিখই রাখি, ওদের ছাড়াই এগোই',gain:15,loss:12,good:'অ্যাটেনডেন্স নিয়ে যারা চিন্তায় ছিল, তাদের মতও ভোটে ধরা হলো।',bad:'কয়েকজন আলাদা করে ক্লাসে যাওয়ার সিদ্ধান্ত নিল।'},
 {who:'ফাইনাল পোল · চতুর্থ দিনের রাত',title:'সিআর আজ ফাইনাল সিদ্ধান্ত দেবে।',text:'চার দিন ধরে কথা চলছে। কেউ তিন দিন, কেউ দুই দিন অটো চায়। আগের “আছি” মেসেজ ধরে ঘোষণা দিলে আবার মত বদলাতে পারে। সিআর আজকের সমর্থন দেখে অটো নেওয়ার ফাইনাল সিদ্ধান্ত দেবে।',a:'তারিখসহ শেষ পোল দিই, আজকের ভোট গুনি',b:'পুরোনো “আছি” মেসেজ গুনে ফাইনাল করি',gain:19,loss:10,good:'তারিখ দেখে সবাই আবার ভোট দিল। ফাইনাল সিদ্ধান্তের জন্য নতুন হিসাব পাওয়া গেল।',bad:'পুরোনো ভোট গোনায় আপত্তি উঠল। আলোচনা আবার পিছিয়ে গেল।'}
];
function meeting(){state='meeting';let m=meetings[Math.min(3,Math.round(nextMeeting/400)-1)];$('#meeting').classList.remove('hidden');$('#departmentMeme').classList.toggle('hidden',Math.round(nextMeeting/400)!==2);$('.discussion').scrollTop=0;$('#meetingWho').textContent=m.who;$('#meetingTitle').textContent=m.title;$('#meetingText').textContent=m.text;$('#choiceA').textContent=m.a+' · সমর্থন +'+m.gain+'%';$('#choiceB').textContent=m.b+' · সমর্থন −'+m.loss+'%, ঐক্য −১';$('#meetingStatus').textContent=`এখন সমর্থন ${consensus}% · পঞ্চম দিন শেষে অন্তত ৭০% চাই`;$('#meetingSupport').style.width=consensus+'%';const choose=good=>{consensus=THREE.MathUtils.clamp(consensus+(good?m.gain:-m.loss),0,100);if(!good)health=Math.max(1,health-1);$('#meeting').classList.add('hidden');nextMeeting+=400;state='playing';invuln=2;clear();spawn=1;caption(good?m.good:m.bad);toast((good?'সমর্থন +'+m.gain:'সমর্থন −'+m.loss)+'% · এখন '+consensus+'%');hud()};$('#choiceA').onclick=()=>choose(true);$('#choiceB').onclick=()=>choose(false)}
function clear(){obstacles.forEach(o=>{scene.remove(o.g);o.tag.remove()});obstacles.length=0}function begin(){clear();dist=0;encounterCount=0;consensus=35;nextMeeting=400;health=5;lane=1;shield=0;cooldown=0;spawn=.5;invuln=0;lastDay=1;state='playing';$('#winMeme').classList.add('hidden');$('#intro').classList.add('hidden');$('#sceneLabel').classList.add('hidden');$('#modal').classList.add('hidden');$('#hud').classList.remove('hidden');$('#mobile').classList.remove('hidden');document.body.classList.add('playing');initAudio();audio.resume();hud();caption('“আগে ঠিক করি—আমরা অটো নিচ্ছি তো?”')}
function modal(tag,title,text,canResume){$('#winMeme').classList.add('hidden');$('#modal').classList.remove('hidden');$('#resultTag').textContent=tag;$('#resultTitle').textContent=title;$('#resultText').textContent=text;$('#resume').textContent=canResume?'চলো আবার ↗':'আবার অটো ছাড়ো ↗';$('#resume').onclick=canResume?resume:begin}function end(win){state='over';modal(win?'CR HAS ANNOUNCED THE DECISION':'DISCUSSION STILL IN PROGRESS',win?'সিআর ঘোষণা দিল: অটো!':'সিআরের সিদ্ধান্ত আটকে গেল।',win?`পাঁচ দিনের আলোচনা শেষে ${consensus}% একমত। সিআরের ফাইনাল মেসেজ: “ব্যাচের মত পেলাম। কাল থেকে অটো।”`:`একমত ${consensus}%। আলোচনা আবার জমাতে হবে—এখনো ফাইনাল ঘোষণা আসেনি।`,false);$('#winMeme').classList.toggle('hidden',!win);tone(win?880:130,.6)}function pause(){if(state!=='playing')return;state='paused';modal('TEA BREAK · NOT AN OFFICIAL HOLIDAY','একটু চা-বিরতি।',`${consensus}% একমত। আলোচনা এখান থেকেই চলবে।`,true)}function resume(){state='playing';$('#modal').classList.add('hidden');clock.getDelta()}function move(d){if(state==='playing'){lane=THREE.MathUtils.clamp(lane+d,0,2);tone(260,.04,'triangle',.025)}}
lane=1;$('#start').onclick=()=>{begin();lane=1};$('#restart').onclick=()=>{begin();lane=1};$('#pause').onclick=()=>state==='paused'?resume():pause();$('#left').onclick=()=>move(-1);$('#right').onclick=()=>move(1);
function horn(){if(state!=='playing'||cooldown>0)return;shield=2.3;cooldown=9;tone(330,.4,'square',.045);setTimeout(()=>tone(440,.3,'square',.035),100);toast('কথা বলার সময় · ২.৩ সেকেন্ড সক্রিয়')};$('#horn').onclick=horn;
$('#sound').onclick=()=>{initAudio();audio.resume();soundOn=!soundOn;$('#sound').textContent=soundOn?'SOUND ON':'SOUND OFF';syncBgm()};addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight',' ','ArrowUp'].includes(e.key))e.preventDefault();if(e.key==='ArrowLeft'||e.key==='a')move(-1);if(e.key==='ArrowRight'||e.key==='d')move(1);if(e.key===' ')horn();if(e.key==='Escape'||e.key==='p')state==='paused'?resume():pause()});let touchX=0;addEventListener('touchstart',e=>touchX=e.changedTouches[0].clientX,{passive:true});addEventListener('touchend',e=>{let delta=e.changedTouches[0].clientX-touchX;if(Math.abs(delta)>35)move(delta>0?1:-1)},{passive:true});document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});
function animate(){requestAnimationFrame(animate);let dt=Math.min(clock.getDelta(),.04),time=clock.elapsedTime;let play=state==='playing';if(play){let speed=13+dist/280;dist+=speed*dt;spawn-=dt;shield=Math.max(0,shield-dt);cooldown=Math.max(0,cooldown-dt);invuln=Math.max(0,invuln-dt);if(spawn<=0){addObstacle();spawn=2.5+Math.random()*.5}auto.position.x=THREE.MathUtils.lerp(auto.position.x,lanes[lane],1-Math.exp(-11*dt));auto.rotation.z=THREE.MathUtils.lerp(auto.rotation.z,(lanes[lane]-auto.position.x)*-.09,.12);auto.position.y=Math.sin(time*22)*.025;auto.visible=true;for(let o of moving){o.position.z+=speed*dt;if(o.position.z>17)o.position.z-=147}for(let o of scenery){o.position.z+=speed*dt;if(o.position.z>25)o.position.z-=155}for(let i=obstacles.length-1;i>=0;i--){let o=obstacles[i];o.g.position.z+=speed*dt;if(!o.hit&&o.g.position.z>-.6&&Math.abs(o.g.position.x-auto.position.x)<1.35){o.hit=true;resolveEncounter(o);scene.remove(o.g);o.tag.remove();obstacles.splice(i,1)}else if(o.g.position.z>6){if(!o.hit&&(o.type==='phone'||o.type==='gate')){toast(o.type==='phone'?'ফোন এড়িয়ে আলোচনা চলল':'উপস্থিতির দুশ্চিন্তা আপাতত পাশ কাটালে')}scene.remove(o.g);o.tag.remove();obstacles.splice(i,1)}}hud();if(state==='playing'&&dist>=2000)end(consensus>=70);else if(state==='playing'&&dist>=nextMeeting&&nextMeeting<2000)meeting();$('#horn').textContent=cooldown>0?Math.ceil(cooldown)+'s':'কথা';}
if(state==='intro'){auto.position.x=1.8;auto.rotation.y=-.25;auto.position.y=Math.sin(time*2)*.025;camera.position.lerp(new THREE.Vector3(-9,6.5,15),.04);camera.lookAt(-.5,1.2,-4)}else{auto.rotation.y=THREE.MathUtils.lerp(auto.rotation.y,0,.08);camera.position.lerp(new THREE.Vector3(auto.position.x*.28,innerWidth<650?8:5.7,innerWidth<650?20:13.8),.05);camera.lookAt(auto.position.x*.18,1,-14)}if(engineGain){engineGain.gain.setTargetAtTime(soundOn&&play?.027:0,audio.currentTime,.15);engine.frequency.setTargetAtTime(44+(play?dist/150:0),audio.currentTime,.15)}updateEncounterUI();renderer.render(scene,camera)}animate();addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});

setTimeout(()=>{$("#splashName").classList.add("hidden");$("#credit").classList.remove("hidden")},1800);$("#enter").onclick=()=>{$("#splash").classList.add("hidden");initAudio();audio.resume();syncBgm()};

// User-supplied soundtrack, bundled locally for Vercel deployment.
const bgm=new Audio('/audio/subway-surfers.mp3');bgm.loop=true;bgm.volume=.85;bgm.preload='auto';
let bgmPending=false,bgmTimer;
function syncBgm(){
 const shouldPlay=soundOn&&['playing','meeting','intro'].includes(state)&&!document.hidden;
 if(!shouldPlay){if(!bgm.paused)bgm.pause();return}
 if(bgm.paused&&!bgmPending){bgmPending=true;bgm.play().catch(()=>{}).finally(()=>bgmPending=false)}
}
const previousInitAudio=initAudio;initAudio=function(){previousInitAudio();if(!bgmTimer)bgmTimer=setInterval(syncBgm,120)};
bgm.addEventListener('error',()=>{if(soundOn)toast('BGM লোড হয়নি—সাউন্ড বন্ধ করে আবার চালাও।')});
