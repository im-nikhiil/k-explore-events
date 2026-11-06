const IMG = s => `https://picsum.photos/seed/${s}/640/380`;
const EVENTS = [
  {id:1,name:"CodeSprint Hackathon",cat:"Tech",date:"2026-12-12T09:00",venue:"KIIT Campus, Bhubaneswar",img:IMG("hack"),desc:"24 hours to build, break and ship. Teams of up to four compete for prizes and mentorship."},
  {id:2,name:"Odissi Dance Evening",cat:"Music & Arts",date:"2026-12-05T18:30",venue:"Rabindra Mandap",img:IMG("dance"),desc:"A live classical performance by leading Odissi artists, followed by a Q&A with the troupe."},
  {id:3,name:"Startup Pitch Night",cat:"Business",date:"2026-12-19T17:00",venue:"Startup Odisha Hub",img:IMG("pitch"),desc:"Ten early-stage founders pitch to a panel of investors. Networking dinner included."},
  {id:4,name:"Web Design Workshop",cat:"Workshop",date:"2026-11-28T10:00",venue:"Infocity Training Room",img:IMG("design"),desc:"A hands-on day covering responsive layouts, accessibility and design systems."},
  {id:5,name:"City Marathon 10K",cat:"Sports",date:"2027-01-10T06:00",venue:"Janpath Road",img:IMG("run"),desc:"A scenic 10K run through the city. Open to all levels, with timing chips and finisher medals."},
  {id:6,name:"Indie Music Fest",cat:"Music & Arts",date:"2027-01-24T16:00",venue:"Kalinga Stadium Grounds",img:IMG("music"),desc:"Twelve independent bands, food stalls and an open-air stage under the stars."},
  {id:7,name:"AI & Data Summit",cat:"Tech",date:"2027-02-06T09:30",venue:"Convention Centre",img:IMG("ai"),desc:"Talks and live demos on machine learning in healthcare, agriculture and education."},
  {id:8,name:"Photography Walk",cat:"Workshop",date:"2027-02-14T07:00",venue:"Ekamra Kanan",img:IMG("photo"),desc:"A guided morning walk with a professional photographer. Bring any camera, phones welcome."}
];
const $ = s => document.querySelector(s);
const KEY = "kexplore_regs";
let cat = "All", current = null;
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const save = r => localStorage.setItem(KEY, JSON.stringify(r));
const fmt = d => new Date(d).toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"});
const esc = s => s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function countdown(date){
  let t = new Date(date) - Date.now();
  if (t <= 0) return "<b>Started</b>";
  const p = (n,l) => `<div><b>${n}</b><span>${l}</span></div>`;
  return p(Math.floor(t/864e5),"days")+p(Math.floor(t/36e5)%24,"hrs")+p(Math.floor(t/6e4)%60,"min")+p(Math.floor(t/1e3)%60,"sec");
}
const upcoming = () => EVENTS.filter(e=>new Date(e.date)>Date.now()).sort((a,b)=>new Date(a.date)-new Date(b.date));

function renderChips(){
  const cats = ["All",...new Set(EVENTS.map(e=>e.cat))];
  $("#chips").innerHTML = cats.map(c=>`<button class="chip ${c===cat?"on":""}" data-c="${c}" aria-pressed="${c===cat}">${c}</button>`).join("");
}
function renderGrid(){
  const q = $("#search").value.trim().toLowerCase();
  const list = EVENTS.filter(e=>(cat==="All"||e.cat===cat)&&(e.name+e.venue+e.desc+e.cat).toLowerCase().includes(q));
  $("#grid").innerHTML = list.map((e,i)=>`<article class="card" style="animation-delay:${i*60}ms">
    <img src="${e.img}" alt="${esc(e.name)}" loading="lazy">
    <div class="card-body"><span class="tag">${e.cat}</span><h3>${e.name}</h3>
    <p class="meta">📅 ${fmt(e.date)}<br>📍 ${e.venue}</p><p class="d">${e.desc.slice(0,80)}…</p>
    <button class="btn" data-id="${e.id}">View details</button></div></article>`).join("");
  $("#empty").hidden = list.length > 0;
}
function renderMine(){
  const r = load();
  $("#regCount").textContent = r.length;
  $("#mineEmpty").hidden = r.length > 0;
  $("#mineList").innerHTML = r.map((x,i)=>`<li><span><b>${esc(x.event)}</b><br><small>${esc(x.name)} · ${esc(x.email)}</small></span><button data-del="${i}">Cancel</button></li>`).join("");
}
function openModal(id){
  current = EVENTS.find(e=>e.id==id);
  $("#mImg").src = current.img; $("#mImg").alt = current.name;
  $("#mTitle").textContent = current.name;
  $("#mMeta").textContent = `${fmt(current.date)} · ${current.venue}`;
  $("#mDesc").textContent = current.desc;
  $("#eventSel").innerHTML = EVENTS.map(e=>`<option value="${e.id}" ${e.id==id?"selected":""}>${e.name}</option>`).join("");
  $("#form").hidden = false; $("#done").hidden = true; $("#form").reset(); $("#eventSel").value = id;
  clearErrors(); $("#modal").hidden = false; document.body.style.overflow = "hidden"; $("#close").focus();
}
function closeModal(){ $("#modal").hidden = true; document.body.style.overflow = ""; }
function clearErrors(){ document.querySelectorAll("#form .err").forEach(e=>e.textContent=""); document.querySelectorAll("#form .bad").forEach(e=>e.classList.remove("bad")); }
function setErr(el,msg){ el.classList.add("bad"); el.parentElement.querySelector(".err").textContent = msg; }

function validate(){
  clearErrors(); let ok = true;
  const name=$("#name"), email=$("#email"), phone=$("#phone");
  if (!/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(name.value.trim())) { setErr(name,"Enter your full name (letters only, at least 2)."); ok=false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setErr(email,"Enter a valid email, like name@example.com."); ok=false; }
  if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(phone.value.trim())) { setErr(phone,"Enter a valid 10-digit mobile number."); ok=false; }
  if (!$("#eventSel").value) { setErr($("#eventSel"),"Select an event."); ok=false; }
  return ok;
}
$("#form").addEventListener("submit", ev=>{
  ev.preventDefault();
  if (!validate()) return;
  const ev2 = EVENTS.find(e=>e.id==$("#eventSel").value), r = load();
  if (r.some(x=>x.email===$("#email").value.trim().toLowerCase() && x.eventId===ev2.id)) { setErr($("#email"),"This email is already registered for this event."); return; }
  r.push({eventId:ev2.id,event:ev2.name,name:$("#name").value.trim(),email:$("#email").value.trim().toLowerCase(),phone:$("#phone").value.trim()});
  save(r); renderMine();
  $("#doneMsg").textContent = `Thanks, ${$("#name").value.trim()}. A confirmation for ${ev2.name} will be sent to ${$("#email").value.trim()}.`;
  $("#form").hidden = true; $("#done").hidden = false;
});
["name","email","phone"].forEach(id=>$("#"+id).addEventListener("input",e=>{e.target.classList.remove("bad");e.target.parentElement.querySelector(".err").textContent="";}));

$("#chips").addEventListener("click",e=>{ const c=e.target.dataset.c; if(c){cat=c;renderChips();renderGrid();} });
$("#search").addEventListener("input",renderGrid);
$("#grid").addEventListener("click",e=>{ const id=e.target.dataset.id; if(id) openModal(id); });
$("#mineList").addEventListener("click",e=>{ const i=e.target.dataset.del; if(i!==undefined){ const r=load(); r.splice(i,1); save(r); renderMine(); } });
$("#close").onclick = $("#doneBtn").onclick = closeModal;
$("#modal").addEventListener("click",e=>{ if(e.target.id==="modal") closeModal(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeModal(); });

function setTheme(t){ document.documentElement.dataset.theme=t; $("#themeBtn").textContent = t==="dark"?"☀️":"🌙"; localStorage.setItem("kexplore_theme",t); }
$("#themeBtn").onclick = () => setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");
setTheme(localStorage.getItem("kexplore_theme") || (matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"));

function tick(){
  const n = upcoming()[0];
  if (n) { $("#heroCount").innerHTML = countdown(n.date); $("#heroName").textContent = n.name; }
  if (current && !$("#modal").hidden) $("#mCount").innerHTML = countdown(current.date);
}
renderChips(); renderGrid(); renderMine(); tick(); setInterval(tick,1000);
