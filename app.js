const tools=[
{name:'EMI Calculator',icon:'₹',cat:'Finance',desc:'Monthly loan EMI, total payment and interest.',keys:['loan','emi']},{name:'GST Calculator',icon:'🧾',cat:'Finance',desc:'GST amount and final price.',keys:['gst','tax']},{name:'SIP Calculator',icon:'📈',cat:'Finance',desc:'Estimate SIP future value.',keys:['sip','investment']},{name:'Discount Calculator',icon:'🏷️',cat:'Finance',desc:'Find final price after discount.',keys:['discount','sale']},{name:'CTC to Monthly Salary',icon:'💼',cat:'Finance',desc:'Quick monthly salary estimate from annual CTC.',keys:['salary','ctc','lpa']},
{name:'Image Compressor',icon:'🖼️',cat:'Images',desc:'Compress JPG/PNG/WebP locally.',keys:['compress image','photo compress','kb']},{name:'Image Resizer',icon:'↔️',cat:'Images',desc:'Resize an image to custom dimensions.',keys:['resize image','photo resize']},{name:'Image Converter',icon:'🔄',cat:'Images',desc:'Convert an image to JPG, PNG or WebP.',keys:['jpg','png','webp','convert image']},{name:'Image to PDF',icon:'📄',cat:'Images',desc:'Turn a JPG/PNG image into a PDF.',keys:['image pdf','photo pdf']},
{name:'PDF Merger',icon:'📚',cat:'PDF',desc:'Merge multiple PDFs into one.',keys:['merge pdf','combine pdf']},{name:'PDF Splitter',icon:'✂️',cat:'PDF',desc:'Extract selected pages into a new PDF.',keys:['split pdf','extract pdf']},
{name:'Resume Keyword Checker',icon:'📋',cat:'Jobs',desc:'Compare resume text with a job description.',keys:['resume','ats','job description']},{name:'Cover Letter Builder',icon:'✉️',cat:'Jobs',desc:'Generate a clean cover-letter draft.',keys:['cover letter','job application']},{name:'Interview Question Builder',icon:'🎤',cat:'Jobs',desc:'Generate role-based practice questions.',keys:['interview','questions']},
{name:'CGPA to Percentage',icon:'🎓',cat:'Students',desc:'Convert CGPA using a common multiplier.',keys:['cgpa','percentage']},{name:'Attendance Calculator',icon:'🏫',cat:'Students',desc:'Calculate attendance percentage.',keys:['attendance','classes']},{name:'Marks Percentage',icon:'🧮',cat:'Students',desc:'Calculate percentage from marks.',keys:['marks','exam']},{name:'Study Timer',icon:'⏳',cat:'Students',desc:'Simple focus countdown timer.',keys:['study','timer','focus']},
{name:'Word Counter',icon:'T≡',cat:'Text',desc:'Count words, characters and lines.',keys:['word count','characters']},{name:'Case Converter',icon:'Aa',cat:'Text',desc:'Uppercase, lowercase and title case.',keys:['uppercase','lowercase']},{name:'Text Cleaner',icon:'🧹',cat:'Text',desc:'Remove extra spaces and blank lines.',keys:['clean text','spaces']},
{name:'JSON Formatter',icon:'{}',cat:'Developer',desc:'Pretty-print or validate JSON.',keys:['json','format']},{name:'Base64 Tool',icon:'</>',cat:'Developer',desc:'Encode or decode Base64 text.',keys:['base64','encode','decode']},{name:'UUID Generator',icon:'ID',cat:'Developer',desc:'Generate UUID values.',keys:['uuid','guid']},{name:'Unix Timestamp',icon:'⏱',cat:'Developer',desc:'Current Unix timestamp and date conversion.',keys:['unix','timestamp','epoch']},
{name:'Caption Builder',icon:'📱',cat:'Social',desc:'Create short captions from topic and tone.',keys:['caption','instagram','social']},{name:'Hashtag Builder',icon:'#',cat:'Social',desc:'Generate hashtags from keywords.',keys:['hashtag','instagram','youtube']},
{name:'Password Generator',icon:'🔐',cat:'Utility',desc:'Generate strong random passwords.',keys:['password','secure']},{name:'QR Code Generator',icon:'▦',cat:'Utility',desc:'Generate a QR code for text or URL.',keys:['qr','qr code']},{name:'Age Calculator',icon:'🎂',cat:'Utility',desc:'Calculate age from date of birth.',keys:['age','birthday','dob']},{name:'Days Between Dates',icon:'📅',cat:'Utility',desc:'Find days between two dates.',keys:['days','date difference']}
];
const $=s=>document.querySelector(s),grid=$('#toolGrid'),bar=$('#categoryBar');$('#toolCount').textContent=tools.length;let active='All';const cats=['All',...new Set(tools.map(t=>t.cat))];
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function renderCats(){bar.innerHTML=cats.map(c=>`<button class="${c===active?'active':''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}
function renderTools(q=''){q=q.toLowerCase().trim();const a=tools.filter(t=>(active==='All'||t.cat===active)&&(!q||`${t.name} ${t.desc} ${t.keys.join(' ')}`.toLowerCase().includes(q)));grid.innerHTML=a.map(t=>`<article class="tool"><div class="toolIcon">${t.icon}</div><h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p><div class="toolFooter"><small>${esc(t.cat)}</small><button data-open="${esc(t.name)}">Use Tool</button></div></article>`).join('')||'<div class="result">No matching tools found.</div>'}
renderCats();renderTools();bar.onclick=e=>{if(e.target.dataset.cat){active=e.target.dataset.cat;renderCats();renderTools($('#toolSearch').value)}};$('#toolSearch').oninput=e=>renderTools(e.target.value);$('#themeBtn').onclick=()=>document.body.classList.toggle('dark');
function smartFind(text){const q=text.toLowerCase();return tools.map(t=>({t,score:t.keys.reduce((s,k)=>s+(q.includes(k)?5:0),q.includes(t.name.toLowerCase())?10:0)})).sort((a,b)=>b.score-a.score)[0]}
function runCommand(v){const x=smartFind(v);if(x&&x.score>0){$('#commandResult').textContent='Best match: '+x.t.name;setTimeout(()=>openTool(x.t.name),120)}else $('#commandResult').textContent='Try keywords like image, PDF, EMI, resume, CGPA, JSON, password or QR.'}
$('#commandBtn').onclick=()=>runCommand($('#commandInput').value);$('#commandInput').onkeydown=e=>{if(e.key==='Enter')runCommand(e.target.value)};document.querySelector('.quick').onclick=e=>{if(e.target.dataset.command){$('#commandInput').value=e.target.dataset.command;runCommand(e.target.dataset.command)}};
let recent=JSON.parse(localStorage.getItem('onebox_recent')||'[]');function showRecent(){$('#recentList').innerHTML=recent.length?recent.map(x=>'• '+esc(x)).join('<br>'):'No tools used yet.'}showRecent();function remember(n){recent=[n,...recent.filter(x=>x!==n)].slice(0,6);localStorage.setItem('onebox_recent',JSON.stringify(recent));showRecent()}
document.addEventListener('click',e=>{if(e.target.dataset.open)openTool(e.target.dataset.open)});$('#closeModal').onclick=()=>$('#modal').classList.add('hidden');$('#modal').onclick=e=>{if(e.target.id==='modal')$('#modal').classList.add('hidden')};
const input=(id,l,t='number',v='')=>`<div class="field"><label>${l}</label><input id="${id}" type="${t}" value="${v}"></div>`,area=(id,l,p='')=>`<div class="field"><label>${l}</label><textarea id="${id}" placeholder="${p}"></textarea></div>`,btn=(t='Run')=>`<button class="primary" id="runTool">${t}</button>`,res=()=>'<div id="result" class="result">Result will appear here.</div>';function setR(v){$('#result').textContent=v}function money(n){return new Intl.NumberFormat('en-IN',{maximumFractionDigits:2}).format(n)}function dl(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1200)}function openTool(n){const t=tools.find(x=>x.name===n);if(!t)return;remember(n);$('#modalIcon').textContent=t.icon;$('#modalTitle').textContent=t.name;$('#modalDesc').textContent=t.desc;$('#modal').classList.remove('hidden');build(n)}
function build(n){const b=$('#toolBody');let run=null;
if(n==='EMI Calculator'){b.innerHTML=input('a','Loan amount ₹','number','500000')+input('r','Annual interest %','number','10')+input('m','Tenure months','number','60')+btn('Calculate EMI')+res();run=()=>{let P=+$('#a').value,R=+$('#r').value/1200,N=+$('#m').value;if(P<0||R<0||N<1)return setR('Enter valid values.');let e=R?P*R*(1+R)**N/((1+R)**N-1):P/N,t=e*N;setR(`Monthly EMI: ₹${money(e)}\nTotal payment: ₹${money(t)}\nTotal interest: ₹${money(t-P)}`)}}
else if(n==='GST Calculator'){b.innerHTML=input('a','Base amount ₹','number','1000')+input('r','GST rate %','number','18')+btn('Calculate GST')+res();run=()=>{let a=+$('#a').value,g=a*+$('#r').value/100;setR(`GST: ₹${money(g)}\nTotal: ₹${money(a+g)}`)}}
else if(n==='SIP Calculator'){b.innerHTML=input('a','Monthly investment ₹','number','5000')+input('r','Annual return %','number','12')+input('y','Years','number','10')+btn('Calculate')+res();run=()=>{let p=+$('#a').value,i=+$('#r').value/1200,N=+$('#y').value*12,v=i?p*((1+i)**N-1)/i*(1+i):p*N;setR(`Estimated value: ₹${money(v)}\nInvested: ₹${money(p*N)}\nEstimated gain: ₹${money(v-p*N)}`)}}
else if(n==='Discount Calculator'){b.innerHTML=input('a','Original price ₹','number','1000')+input('r','Discount %','number','20')+btn('Calculate')+res();run=()=>{let a=+$('#a').value,s=a*+$('#r').value/100;setR(`You save: ₹${money(s)}\nFinal price: ₹${money(a-s)}`)}}
else if(n==='CTC to Monthly Salary'){b.innerHTML=input('a','Annual CTC ₹','number','600000')+input('d','Estimated deductions %','number','12')+btn('Estimate')+res();run=()=>{let g=+$('#a').value/12;setR(`Monthly gross estimate: ₹${money(g)}\nAfter estimated deductions: ₹${money(g*(1-+$('#d').value/100))}\nActual in-hand depends on salary structure, PF, tax and benefits.`)}}
else if(['Image Compressor','Image Resizer','Image Converter'].includes(n)){let extra=n==='Image Resizer'?`<div class="two">${input('w','Width px','number','800')}${input('h','Height px','number','800')}</div>`:n==='Image Converter'?'<div class="field"><label>Output format</label><select id="fmt"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></div>':input('q','Quality 0.1–1','number','0.75');b.innerHTML=`<label class="fileLabel">Choose image<input id="file" type="file" accept="image/*"></label>${extra}${btn('Process Image')}<img id="preview" class="preview hidden">${res()}<div class="note">Processed locally in your browser.</div>`;run=()=>{const f=$('#file').files[0];if(!f)return setR('Choose an image first.');const im=new Image();im.onload=()=>{let w=im.width,h=im.height;if(n==='Image Resizer'){w=Math.max(1,+$('#w').value||w);h=Math.max(1,+$('#h').value||h)}const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(im,0,0,w,h);const type=n==='Image Converter'?$('#fmt').value:(f.type==='image/png'?'image/webp':'image/jpeg'),q=n==='Image Compressor'?Math.max(.1,Math.min(1,+$('#q').value||.75)):.92;c.toBlob(blob=>{const p=$('#preview');p.src=URL.createObjectURL(blob);p.classList.remove('hidden');setR(`Original: ${(f.size/1024).toFixed(1)} KB\nOutput: ${(blob.size/1024).toFixed(1)} KB\nDimensions: ${w} × ${h}`);const d=document.createElement('button');d.className='downloadBtn';d.textContent='Download Result';d.onclick=()=>dl(blob,'onebox-image.'+(type.includes('png')?'png':type.includes('webp')?'webp':'jpg'));$('#result').after(d)},type,q)};im.src=URL.createObjectURL(f)}}
else if(n==='Image to PDF'){b.innerHTML='<label class="fileLabel">Choose JPG/PNG<input id="file" type="file" accept="image/png,image/jpeg"></label>'+btn('Create PDF')+res();run=async()=>{const f=$('#file').files[0];if(!f)return setR('Choose an image.');if(!window.PDFLib)return setR('PDF library not loaded. Connect to internet and reload.');const bytes=await f.arrayBuffer(),pdf=await PDFLib.PDFDocument.create(),img=f.type==='image/png'?await pdf.embedPng(bytes):await pdf.embedJpg(bytes),p=pdf.addPage([img.width,img.height]);p.drawImage(img,{x:0,y:0,width:img.width,height:img.height});dl(new Blob([await pdf.save()],{type:'application/pdf'}),'onebox-image.pdf');setR('PDF created and downloaded.')}}
else if(n==='PDF Merger'){b.innerHTML='<label class="fileLabel">Choose 2+ PDFs<input id="files" type="file" accept="application/pdf" multiple></label>'+btn('Merge PDFs')+res();run=async()=>{const fs=[...$('#files').files];if(fs.length<2)return setR('Choose at least 2 PDFs.');if(!window.PDFLib)return setR('PDF library not loaded.');const out=await PDFLib.PDFDocument.create();for(const f of fs){const src=await PDFLib.PDFDocument.load(await f.arrayBuffer()),ps=await out.copyPages(src,src.getPageIndices());ps.forEach(p=>out.addPage(p))}dl(new Blob([await out.save()],{type:'application/pdf'}),'onebox-merged.pdf');setR(`Merged ${fs.length} PDFs.`)}}
else if(n==='PDF Splitter'){b.innerHTML='<label class="fileLabel">Choose PDF<input id="file" type="file" accept="application/pdf"></label>'+input('pages','Pages e.g. 1,3,5-7','text','1')+btn('Extract Pages')+res();run=async()=>{const f=$('#file').files[0];if(!f)return setR('Choose a PDF.');if(!window.PDFLib)return setR('PDF library not loaded.');const src=await PDFLib.PDFDocument.load(await f.arrayBuffer()),max=src.getPageCount(),set=new Set();$('#pages').value.split(',').forEach(part=>{let m=part.trim().match(/^(\d+)(?:-(\d+))?$/);if(!m)return;for(let i=Math.min(+m[1],+(m[2]||m[1]));i<=Math.max(+m[1],+(m[2]||m[1]));i++)if(i>=1&&i<=max)set.add(i-1)});const ids=[...set].sort((a,b)=>a-b);if(!ids.length)return setR('Enter valid pages.');const out=await PDFLib.PDFDocument.create(),ps=await out.copyPages(src,ids);ps.forEach(p=>out.addPage(p));dl(new Blob([await out.save()],{type:'application/pdf'}),'onebox-split.pdf');setR(`Extracted ${ids.length} page(s).`)}}
else if(n==='Resume Keyword Checker'){b.innerHTML=area('resume','Resume text')+area('jd','Job description')+btn('Check Match')+res();run=()=>{const stop=new Set('the and for with from your you are this that will have has our job role work into using use'.split(' ')),words=s=>[...new Set(s.toLowerCase().match(/[a-z][a-z0-9+#.-]{2,}/g)||[])].filter(w=>!stop.has(w)),rw=new Set(words($('#resume').value)),jw=words($('#jd').value),hit=jw.filter(w=>rw.has(w)),miss=jw.filter(w=>!rw.has(w)),score=jw.length?Math.round(hit.length/jw.length*100):0;setR(`Keyword match: ${score}%\n\nMatched: ${hit.slice(0,20).join(', ')||'None'}\n\nMissing / add only if truthful: ${miss.slice(0,20).join(', ')||'None'}`)}}
else if(n==='Cover Letter Builder'){b.innerHTML=input('name','Your name','text','')+input('role','Role','text','Data Analyst')+input('company','Company','text','')+area('skills','Top skills / experience')+btn('Build Draft')+res();run=()=>setR(`Dear Hiring Manager,\n\nI am applying for the ${$('#role').value||'open'} role at ${$('#company').value||'your company'}. My background includes ${$('#skills').value||'relevant skills and project experience'}, and I am interested in contributing these strengths to your team.\n\nI would welcome the opportunity to discuss how my skills align with the role.\n\nSincerely,\n${$('#name').value||'Your Name'}`)}
else if(n==='Interview Question Builder'){b.innerHTML=input('role','Role','text','Data Analyst')+input('level','Experience level','text','Fresher')+btn('Generate')+res();run=()=>setR(`Practice questions for ${$('#role').value}:\n1. Tell me about yourself.\n2. Why do you want this role?\n3. Which tools do you use most?\n4. Describe a project you are proud of.\n5. How do you validate your work?\n6. Explain a difficult concept simply.\n7. Tell me about a mistake and how you fixed it.\n8. What would you do in your first 30 days?`)}
else if(n==='CGPA to Percentage'){b.innerHTML=input('a','CGPA','number','7')+btn('Convert')+res();run=()=>setR(`Approx. percentage: ${(+$('#a').value*9.5).toFixed(2)}%`)}
else if(n==='Attendance Calculator'){b.innerHTML=input('a','Classes attended','number','80')+input('t','Total classes','number','100')+btn('Calculate')+res();run=()=>{let t=+$('#t').value;setR(t>0?`Attendance: ${(+$('#a').value/t*100).toFixed(2)}%`:'Enter valid total classes.')}}
else if(n==='Marks Percentage'){b.innerHTML=input('a','Marks obtained','number','420')+input('t','Total marks','number','500')+btn('Calculate')+res();run=()=>{let t=+$('#t').value;setR(t>0?`Percentage: ${(+$('#a').value/t*100).toFixed(2)}%`:'Enter valid total marks.')}}
else if(n==='Study Timer'){b.innerHTML=input('mins','Minutes','number','25')+btn('Start Timer')+res();let timer;run=()=>{clearInterval(timer);let s=Math.max(1,Math.min(180,+$('#mins').value||25))*60;const tick=()=>setR(`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`);tick();timer=setInterval(()=>{s--;tick();if(s<=0){clearInterval(timer);setR('Time complete ✅')}},1000)}}
else if(['Word Counter','Case Converter','Text Cleaner'].includes(n)){b.innerHTML=area('txt','Text')+(n==='Case Converter'?'<div class="field"><label>Mode</label><select id="mode"><option value="upper">UPPERCASE</option><option value="lower">lowercase</option><option value="title">Title Case</option></select></div>':'')+btn('Process')+res();run=()=>{let v=$('#txt').value;if(n==='Word Counter'){setR(`Words: ${v.trim()?v.trim().split(/\s+/).length:0}\nCharacters: ${v.length}\nLines: ${v?v.split(/\n/).length:0}`)}else if(n==='Text Cleaner')setR(v.replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim());else{const m=$('#mode').value;setR(m==='upper'?v.toUpperCase():m==='lower'?v.toLowerCase():v.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()))}}}
else if(n==='JSON Formatter'){b.innerHTML=area('txt','JSON','{"hello":"world"}')+btn('Format')+res();run=()=>{try{setR(JSON.stringify(JSON.parse($('#txt').value),null,2))}catch(e){setR('Invalid JSON: '+e.message)}}}
else if(n==='Base64 Tool'){b.innerHTML=area('txt','Text')+'<div class="two"><button class="primary" id="enc">Encode</button><button class="primary" id="dec">Decode</button></div>'+res();$('#enc').onclick=()=>{try{setR(btoa(unescape(encodeURIComponent($('#txt').value))))}catch{setR('Could not encode.')}};$('#dec').onclick=()=>{try{setR(decodeURIComponent(escape(atob($('#txt').value))))}catch{setR('Invalid Base64.')}};return}
else if(n==='UUID Generator'){b.innerHTML=input('count','How many?','number','5')+btn('Generate')+res();run=()=>{let c=Math.max(1,Math.min(50,+$('#count').value||1)),a=[];for(let i=0;i<c;i++)a.push(crypto.randomUUID());setR(a.join('\n'))}}
else if(n==='Unix Timestamp'){b.innerHTML=input('date','Optional date/time','datetime-local','')+btn('Convert')+res();run=()=>{let ms=$('#date').value?new Date($('#date').value).getTime():Date.now();setR(`Unix seconds: ${Math.floor(ms/1000)}\nMilliseconds: ${ms}\nISO: ${new Date(ms).toISOString()}`)}}
else if(n==='Caption Builder'){b.innerHTML=input('topic','Topic','text','Sunday mini vlog')+'<div class="field"><label>Tone</label><select id="tone"><option>Casual</option><option>Professional</option><option>Energetic</option><option>Minimal</option></select></div>'+btn('Build Caption')+res();run=()=>{let t=$('#topic').value||'today',tone=$('#tone').value,lead=tone==='Energetic'?'Let’s go 🔥':tone==='Professional'?'A quick update:':tone==='Minimal'?'Simple moments.':'Just sharing a little moment ✨';setR(`${lead}\n\n${t} — small moments, good energy, and something worth remembering.`)}}
else if(n==='Hashtag Builder'){b.innerHTML=input('topic','Keywords, comma separated','text','data analyst, mumbai, jobs')+btn('Generate')+res();run=()=>{let a=[];$('#topic').value.split(',').map(x=>x.trim()).filter(Boolean).forEach(x=>{let s=x.replace(/[^a-z0-9]/gi,'');if(s)a.push('#'+s,'#'+s+'Tips','#'+s+'India')});setR([...new Set(a)].slice(0,15).join(' '))}}
else if(n==='Password Generator'){b.innerHTML=input('len','Length','number','16')+btn('Generate')+res();run=()=>{let l=Math.max(8,Math.min(64,+$('#len').value||16)),chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*?',arr=new Uint32Array(l);crypto.getRandomValues(arr);setR([...arr].map(x=>chars[x%chars.length]).join(''))}}
else if(n==='QR Code Generator'){b.innerHTML=input('txt','Text or URL','text','https://example.com')+btn('Generate QR')+res();run=()=>{const v=$('#txt').value.trim();if(!v)return setR('Enter text or URL.');$('#result').innerHTML=`<img class="preview" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(v)}"><div class="note">This tool uses an external QR image service.</div>`}}
else if(n==='Age Calculator'){b.innerHTML=input('dob','Date of birth','date','')+btn('Calculate')+res();run=()=>{let d=new Date($('#dob').value+'T00:00:00'),now=new Date();if(isNaN(d)||d>now)return setR('Choose a valid past date.');let y=now.getFullYear()-d.getFullYear(),m=now.getMonth()-d.getMonth(),day=now.getDate()-d.getDate();if(day<0){m--;day+=new Date(now.getFullYear(),now.getMonth(),0).getDate()}if(m<0){y--;m+=12}setR(`${y} years, ${m} months, ${day} days`)}}
else if(n==='Days Between Dates'){b.innerHTML='<div class="two">'+input('a','Start date','date','')+input('z','End date','date','')+'</div>'+btn('Calculate')+res();run=()=>{let a=new Date($('#a').value+'T00:00:00'),z=new Date($('#z').value+'T00:00:00');setR(isNaN(a)||isNaN(z)?'Choose both dates.':`${Math.abs(Math.round((z-a)/86400000))} day(s)`)}}
const r=$('#runTool');if(r&&run)r.onclick=run}


const I18N = {
  en:{
    navTools:"Tools",navWhy:"Why ONEBOX",heroKicker:"ALL-IN-ONE DIGITAL TOOLBOX",
    heroTitle1:"One website.",heroTitle2:"Do almost anything.",
    heroDesc:"Finance, images, PDFs, jobs, students, text, developer utilities, social media helpers and everyday tools — all in one clean place.",
    tryNatural:"Try natural language",findTool:"Find Tool",
    commandHint:"Type what you want to do. ONEBOX will open the best matching tool.",
    workingTools:"Working tools",loginRequired:"Login required",runsBrowser:"Runs in browser",filesLocal:"Files stay local*",
    toolLibrary:"TOOL LIBRARY",everythingOne:"Everything in one place",
    stopHunting:"Stop hunting for separate websites.",
    workflowDesc:"Use one command to jump directly to the right utility. Your recent tools are remembered on this device for faster access.",
    recentlyUsed:"Recently used",whyOnebox:"Why ONEBOX",fast:"Fast",private:"Private",mobileFirst:"Mobile-first",expandable:"Expandable",
    searchTools:"Search tools...",commandPlaceholder:"Example: compress image, calculate EMI, merge PDFs, check resume..."
  },
  hi:{
    navTools:"टूल्स",navWhy:"ONEBOX क्यों",heroKicker:"ऑल-इन-वन डिजिटल टूलबॉक्स",
    heroTitle1:"एक वेबसाइट.",heroTitle2:"लगभग हर काम.",
    heroDesc:"फाइनेंस, इमेज, PDF, जॉब, स्टूडेंट, टेक्स्ट, डेवलपर, सोशल मीडिया और रोज़मर्रा के टूल — सब एक ही जगह.",
    tryNatural:"अपनी भाषा में लिखें",findTool:"टूल खोजें",
    commandHint:"आप क्या करना चाहते हैं लिखें। ONEBOX सही टूल खोलेगा।",
    workingTools:"वर्किंग टूल्स",loginRequired:"लॉगिन जरूरी",runsBrowser:"ब्राउज़र में चलता है",filesLocal:"फाइलें लोकल रहती हैं*",
    toolLibrary:"टूल लाइब्रेरी",everythingOne:"सब कुछ एक जगह",
    stopHunting:"अलग-अलग वेबसाइट ढूँढना बंद करें.",
    workflowDesc:"एक कमांड से सही टूल खोलें। हाल के टूल इस डिवाइस पर याद रखे जाते हैं।",
    recentlyUsed:"हाल में उपयोग",whyOnebox:"ONEBOX क्यों",fast:"तेज़",private:"प्राइवेट",mobileFirst:"मोबाइल-फर्स्ट",expandable:"बढ़ाया जा सकता है",
    searchTools:"टूल खोजें...",commandPlaceholder:"उदाहरण: इमेज कंप्रेस करो, EMI निकालो, PDF मर्ज करो..."
  },
  mr:{
    navTools:"टूल्स",navWhy:"ONEBOX का",heroKicker:"ऑल-इन-वन डिजिटल टूलबॉक्स",
    heroTitle1:"एक वेबसाइट.",heroTitle2:"जवळजवळ सर्व कामे.",
    heroDesc:"फायनान्स, इमेज, PDF, जॉब, विद्यार्थी, टेक्स्ट, डेव्हलपर, सोशल मीडिया आणि दैनंदिन टूल्स — सर्व एकाच ठिकाणी.",
    tryNatural:"आपल्या भाषेत लिहा",findTool:"टूल शोधा",commandHint:"तुम्हाला काय करायचे आहे ते लिहा. ONEBOX योग्य टूल उघडेल.",
    workingTools:"कार्यरत टूल्स",loginRequired:"लॉगिन आवश्यक",runsBrowser:"ब्राउझरमध्ये चालते",filesLocal:"फाइल्स लोकल राहतात*",
    toolLibrary:"टूल लायब्ररी",everythingOne:"सगळे एका ठिकाणी",stopHunting:"वेगवेगळ्या वेबसाइट शोधणे थांबवा.",
    workflowDesc:"एका कमांडने योग्य टूल उघडा. अलीकडील टूल्स या डिव्हाइसवर लक्षात ठेवले जातात.",
    recentlyUsed:"अलीकडे वापरलेले",whyOnebox:"ONEBOX का",fast:"जलद",private:"खाजगी",mobileFirst:"मोबाइल-फर्स्ट",expandable:"वाढवता येणारे",
    searchTools:"टूल शोधा...",commandPlaceholder:"उदा: इमेज कंप्रेस करा, EMI काढा, PDF मर्ज करा..."
  },
  gu:{
    navTools:"ટૂલ્સ",navWhy:"ONEBOX કેમ",heroKicker:"ઓલ-ઇન-વન ડિજિટલ ટૂલબોક્સ",heroTitle1:"એક વેબસાઇટ.",heroTitle2:"લગભગ બધું કરો.",
    heroDesc:"ફાઇનાન્સ, ઇમેજ, PDF, જોબ, વિદ્યાર્થી, ટેક્સ્ટ, ડેવલપર, સોશિયલ મીડિયા અને રોજિંદા ટૂલ્સ — બધું એક જગ્યાએ.",
    tryNatural:"તમારી ભાષામાં લખો",findTool:"ટૂલ શોધો",commandHint:"તમે શું કરવા માંગો છો તે લખો. ONEBOX યોગ્ય ટૂલ ખોલશે.",
    workingTools:"કાર્યરત ટૂલ્સ",loginRequired:"લોગિન જરૂરી",runsBrowser:"બ્રાઉઝરમાં ચાલે છે",filesLocal:"ફાઇલો લોકલ રહે છે*",
    toolLibrary:"ટૂલ લાઇબ્રેરી",everythingOne:"બધું એક જગ્યાએ",stopHunting:"અલગ વેબસાઇટ શોધવાનું બંધ કરો.",
    workflowDesc:"એક કમાન્ડથી યોગ્ય ટૂલ ખોલો. તાજેતરના ટૂલ્સ આ ડિવાઇસ પર યાદ રહે છે.",
    recentlyUsed:"તાજેતરમાં વપરાયેલ",whyOnebox:"ONEBOX કેમ",fast:"ઝડપી",private:"ખાનગી",mobileFirst:"મોબાઇલ-ફર્સ્ટ",expandable:"વિસ્તારી શકાય",
    searchTools:"ટૂલ શોધો...",commandPlaceholder:"ઉદાહરણ: ઇમેજ ક compress કરો, EMI ગણો, PDF મર્જ કરો..."
  },
  bn:{
    navTools:"টুলস",navWhy:"কেন ONEBOX",heroKicker:"অল-ইন-ওয়ান ডিজিটাল টুলবক্স",heroTitle1:"একটি ওয়েবসাইট.",heroTitle2:"প্রায় সব কাজ করুন.",
    heroDesc:"ফাইন্যান্স, ইমেজ, PDF, চাকরি, স্টুডেন্ট, টেক্সট, ডেভেলপার, সোশ্যাল মিডিয়া ও দৈনন্দিন টুল — সব এক জায়গায়.",
    tryNatural:"নিজের ভাষায় লিখুন",findTool:"টুল খুঁজুন",commandHint:"আপনি কী করতে চান লিখুন। ONEBOX সঠিক টুল খুলবে.",
    workingTools:"কার্যকর টুল",loginRequired:"লগইন প্রয়োজন",runsBrowser:"ব্রাউজারে চলে",filesLocal:"ফাইল লোকাল থাকে*",
    toolLibrary:"টুল লাইব্রেরি",everythingOne:"সব এক জায়গায়",stopHunting:"আলাদা আলাদা ওয়েবসাইট খোঁজা বন্ধ করুন.",
    workflowDesc:"একটি কমান্ডে সঠিক টুল খুলুন। সাম্প্রতিক টুল এই ডিভাইসে মনে রাখা হয়.",
    recentlyUsed:"সাম্প্রতিক ব্যবহার",whyOnebox:"কেন ONEBOX",fast:"দ্রুত",private:"ব্যক্তিগত",mobileFirst:"মোবাইল-ফার্স্ট",expandable:"বিস্তৃত করা যায়",
    searchTools:"টুল খুঁজুন...",commandPlaceholder:"উদাহরণ: ইমেজ কমপ্রেস, EMI হিসাব, PDF মার্জ..."
  },
  ta:{
    navTools:"கருவிகள்",navWhy:"ஏன் ONEBOX",heroKicker:"ஆல்-இன்-ஒன் டிஜிட்டல் டூல்பாக்ஸ்",heroTitle1:"ஒரே இணையதளம்.",heroTitle2:"கிட்டத்தட்ட எல்லாம் செய்யுங்கள்.",
    heroDesc:"நிதி, படங்கள், PDF, வேலை, மாணவர்கள், உரை, டெவலப்பர், சமூக ஊடகம் மற்றும் தினசரி கருவிகள் — அனைத்தும் ஒரே இடத்தில்.",
    tryNatural:"உங்கள் மொழியில் எழுதுங்கள்",findTool:"கருவி தேடு",commandHint:"நீங்கள் செய்ய வேண்டியது என்ன என்று எழுதுங்கள். ONEBOX சரியான கருவியைத் திறக்கும்.",
    workingTools:"செயல்படும் கருவிகள்",loginRequired:"உள்நுழைவு தேவை",runsBrowser:"உலாவியில் இயங்கும்",filesLocal:"கோப்புகள் உள்ளூரில் இருக்கும்*",
    toolLibrary:"கருவி நூலகம்",everythingOne:"அனைத்தும் ஒரே இடத்தில்",stopHunting:"வேறு இணையதளங்களைத் தேட வேண்டாம்.",
    workflowDesc:"ஒரே கட்டளையில் சரியான கருவியைத் திறக்கலாம். சமீபத்திய கருவிகள் இந்த சாதனத்தில் நினைவில் வைக்கப்படும்.",
    recentlyUsed:"சமீபத்தில் பயன்படுத்தியது",whyOnebox:"ஏன் ONEBOX",fast:"வேகம்",private:"தனியுரிமை",mobileFirst:"மொபைல்-முதல்",expandable:"விரிவாக்கக்கூடியது",
    searchTools:"கருவிகளைத் தேடுங்கள்...",commandPlaceholder:"உதாரணம்: படத்தை கம்ப்ரஸ் செய், EMI கணக்கு, PDF இணை..."
  },
  te:{
    navTools:"టూల్స్",navWhy:"ఎందుకు ONEBOX",heroKicker:"ఆల్-ఇన్-వన్ డిజిటల్ టూల్‌బాక్స్",heroTitle1:"ఒకే వెబ్‌సైట్.",heroTitle2:"దాదాపు అన్నీ చేయండి.",
    heroDesc:"ఫైనాన్స్, ఇమేజ్, PDF, జాబ్స్, స్టూడెంట్స్, టెక్స్ట్, డెవలపర్, సోషల్ మీడియా మరియు రోజువారీ టూల్స్ — అన్నీ ఒకే చోట.",
    tryNatural:"మీ భాషలో టైప్ చేయండి",findTool:"టూల్ కనుగొను",commandHint:"మీరు ఏం చేయాలనుకుంటున్నారో టైప్ చేయండి. ONEBOX సరైన టూల్ తెరుస్తుంది.",
    workingTools:"పని చేసే టూల్స్",loginRequired:"లాగిన్ అవసరం",runsBrowser:"బ్రౌజర్‌లో నడుస్తుంది",filesLocal:"ఫైళ్లు లోకల్‌గా ఉంటాయి*",
    toolLibrary:"టూల్ లైబ్రరీ",everythingOne:"అన్నీ ఒకే చోట",stopHunting:"వేర్వేరు వెబ్‌సైట్ల కోసం వెతకడం ఆపండి.",
    workflowDesc:"ఒక కమాండ్‌తో సరైన టూల్ తెరవండి. ఇటీవలి టూల్స్ ఈ డివైస్‌లో గుర్తుంచబడతాయి.",
    recentlyUsed:"ఇటీవల ఉపయోగించినవి",whyOnebox:"ఎందుకు ONEBOX",fast:"వేగం",private:"ప్రైవేట్",mobileFirst:"మొబైల్-ఫస్ట్",expandable:"విస్తరించవచ్చు",
    searchTools:"టూల్స్ వెతకండి...",commandPlaceholder:"ఉదాహరణ: ఇమేజ్ కాంప్రెస్, EMI లెక్కించు, PDF మర్జ్..."
  },
  kn:{
    navTools:"ಟೂಲ್‌ಗಳು",navWhy:"ಏಕೆ ONEBOX",heroKicker:"ಆಲ್-ಇನ್-ಒನ್ ಡಿಜಿಟಲ್ ಟೂಲ್‌ಬಾಕ್ಸ್",heroTitle1:"ಒಂದು ವೆಬ್‌ಸೈಟ್.",heroTitle2:"ಬಹುತೇಕ ಎಲ್ಲವೂ ಮಾಡಿ.",
    heroDesc:"ಫೈನಾನ್ಸ್, ಇಮೇಜ್, PDF, ಉದ್ಯೋಗ, ವಿದ್ಯಾರ್ಥಿ, ಟೆಕ್ಸ್ಟ್, ಡೆವಲಪರ್, ಸೋಶಿಯಲ್ ಮೀಡಿಯಾ ಮತ್ತು ದಿನನಿತ್ಯದ ಟೂಲ್‌ಗಳು — ಎಲ್ಲವೂ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ.",
    tryNatural:"ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಬರೆಯಿರಿ",findTool:"ಟೂಲ್ ಹುಡುಕಿ",commandHint:"ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ ಎಂದು ಬರೆಯಿರಿ. ONEBOX ಸರಿಯಾದ ಟೂಲ್ ತೆರೆಯುತ್ತದೆ.",
    workingTools:"ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಟೂಲ್‌ಗಳು",loginRequired:"ಲಾಗಿನ್ ಅಗತ್ಯ",runsBrowser:"ಬ್ರೌಸರ್‌ನಲ್ಲಿ ನಡೆಯುತ್ತದೆ",filesLocal:"ಫೈಲ್‌ಗಳು ಲೋಕಲ್ ಆಗಿರುತ್ತವೆ*",
    toolLibrary:"ಟೂಲ್ ಲೈಬ್ರರಿ",everythingOne:"ಎಲ್ಲವೂ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ",stopHunting:"ಬೇರೆ ಬೇರೆ ವೆಬ್‌ಸೈಟ್ ಹುಡುಕುವುದನ್ನು ನಿಲ್ಲಿಸಿ.",
    workflowDesc:"ಒಂದು ಕಮಾಂಡ್‌ನಿಂದ ಸರಿಯಾದ ಟೂಲ್ ತೆರೆಯಿರಿ. ಇತ್ತೀಚಿನ ಟೂಲ್‌ಗಳು ಈ ಸಾಧನದಲ್ಲಿ ನೆನಪಿಡಲಾಗುತ್ತವೆ.",
    recentlyUsed:"ಇತ್ತೀಚೆಗೆ ಬಳಸಿದ",whyOnebox:"ಏಕೆ ONEBOX",fast:"ವೇಗ",private:"ಖಾಸಗಿ",mobileFirst:"ಮೊಬೈಲ್-ಫಸ್ಟ್",expandable:"ವಿಸ್ತರಿಸಬಹುದಾದ",
    searchTools:"ಟೂಲ್ ಹುಡುಕಿ...",commandPlaceholder:"ಉದಾಹರಣೆ: ಇಮೇಜ್ ಕಂಪ್ರೆಸ್, EMI ಲೆಕ್ಕ, PDF ಮರ್ಜ್..."
  },
  pa:{
    navTools:"ਟੂਲ",navWhy:"ONEBOX ਕਿਉਂ",heroKicker:"ਆਲ-ਇਨ-ਵਨ ਡਿਜ਼ਿਟਲ ਟੂਲਬਾਕਸ",heroTitle1:"ਇੱਕ ਵੈਬਸਾਈਟ.",heroTitle2:"ਲਗਭਗ ਸਭ ਕੁਝ ਕਰੋ.",
    heroDesc:"ਫਾਇਨੈਂਸ, ਇਮੇਜ, PDF, ਨੌਕਰੀ, ਵਿਦਿਆਰਥੀ, ਟੈਕਸਟ, ਡਿਵੈਲਪਰ, ਸੋਸ਼ਲ ਮੀਡੀਆ ਅਤੇ ਰੋਜ਼ਾਨਾ ਟੂਲ — ਸਭ ਇਕ ਥਾਂ.",
    tryNatural:"ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਲਿਖੋ",findTool:"ਟੂਲ ਲੱਭੋ",commandHint:"ਤੁਸੀਂ ਕੀ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ ਲਿਖੋ। ONEBOX ਸਹੀ ਟੂਲ ਖੋਲ੍ਹੇਗਾ.",
    workingTools:"ਕੰਮ ਕਰਨ ਵਾਲੇ ਟੂਲ",loginRequired:"ਲਾਗਇਨ ਲੋੜੀਂਦਾ",runsBrowser:"ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਚੱਲਦਾ ਹੈ",filesLocal:"ਫਾਇਲਾਂ ਲੋਕਲ ਰਹਿੰਦੀਆਂ ਹਨ*",
    toolLibrary:"ਟੂਲ ਲਾਇਬ੍ਰੇਰੀ",everythingOne:"ਸਭ ਕੁਝ ਇਕ ਥਾਂ",stopHunting:"ਵੱਖ-ਵੱਖ ਵੈਬਸਾਈਟਾਂ ਲੱਭਣੀਆਂ ਬੰਦ ਕਰੋ.",
    workflowDesc:"ਇੱਕ ਕਮਾਂਡ ਨਾਲ ਸਹੀ ਟੂਲ ਖੋਲ੍ਹੋ। ਹਾਲੀਆ ਟੂਲ ਇਸ ਡਿਵਾਈਸ 'ਤੇ ਯਾਦ ਰਹਿੰਦੇ ਹਨ.",
    recentlyUsed:"ਹਾਲ ਹੀ ਵਿੱਚ ਵਰਤੇ",whyOnebox:"ONEBOX ਕਿਉਂ",fast:"ਤੇਜ਼",private:"ਪ੍ਰਾਈਵੇਟ",mobileFirst:"ਮੋਬਾਈਲ-ਫਰਸਟ",expandable:"ਵਧਾਇਆ ਜਾ ਸਕਦਾ",
    searchTools:"ਟੂਲ ਲੱਭੋ...",commandPlaceholder:"ਉਦਾਹਰਨ: ਇਮੇਜ ਕੰਪ੍ਰੈਸ, EMI ਕੱਢੋ, PDF ਮਰਜ..."
  }
};

function applyLanguage(lang){
  const t=I18N[lang]||I18N.en;
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k=el.dataset.i18n;
    if(t[k]) el.textContent=t[k];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    const k=el.dataset.i18nPlaceholder;
    if(t[k]) el.placeholder=t[k];
  });
  localStorage.setItem("onebox_lang",lang);
}
const langSelect=document.querySelector("#languageSelect");
if(langSelect){
  const saved=localStorage.getItem("onebox_lang")||"en";
  langSelect.value=saved;
  applyLanguage(saved);
  langSelect.addEventListener("change",e=>applyLanguage(e.target.value));
}

const topSearch = document.querySelector("#toolSearch");
if(topSearch){
  topSearch.addEventListener("focus",()=>{});
  topSearch.addEventListener("keydown",e=>{
    if(e.key==="Enter"){
      document.querySelector("#tools")?.scrollIntoView({behavior:"smooth",block:"start"});
    }
  });
}
