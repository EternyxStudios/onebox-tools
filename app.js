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
renderCats();renderTools();bar.onclick=e=>{if(e.target.dataset.cat){active=e.target.dataset.cat;renderCats();renderTools($('#toolSearch').value)}};$('#toolSearch').oninput=e=>renderTools(e.target.value);/* theme is initialized below */
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


// ===== ONEBOX UI language + theme fix =====
const EXTRA_I18N = {
  en:{home:'Home',smartbox:'SmartBox',allTools:'All Tools',categories:'Categories',favorites:'Favorites',history:'History',heroTitle:'All Tools You Need.<br>In One Box.',heroDescCurrent:"The world's most useful collection of everyday online tools — simple, fast and built for mobile.",freeTools:'🌿 Free tools',noSignup:'⊘ No Sign Up',smartFinder:'Smart Finder',commandCurrent:'Type what you want to do and ONEBOX will find the right tool.',popularTools:'Popular Tools',viewAll:'View all',totalTools:'Total Tools',accounts:'Accounts',noneNeeded:'0 Needed',processing:'Processing',languages:'Languages',browseCategory:'Browse Tools By Category',viewCategories:'View all categories →',featuredTools:'Featured Tools',viewTools:'View all tools →',toolFinder:'Tool Finder',smartBottomDesc:'Type what you want to do and ONEBOX will find the best matching tool.',allWorkingTools:'All Working Tools',searchHint:'Search from the top bar or choose a category.',useTool:'Use Tool',noMatch:'No matching tools found.'},
  hi:{home:'होम',smartbox:'स्मार्टबॉक्स',allTools:'सभी टूल्स',categories:'कैटेगरी',favorites:'पसंदीदा',history:'हिस्ट्री',heroTitle:'आपके सभी जरूरी टूल्स.<br>एक ही बॉक्स में.',heroDescCurrent:'रोज़मर्रा के उपयोगी ऑनलाइन टूल्स का संग्रह — आसान, तेज़ और मोबाइल के लिए बनाया गया।',freeTools:'🌿 फ्री टूल्स',noSignup:'⊘ साइन अप की जरूरत नहीं',smartFinder:'स्मार्ट फाइंडर',commandCurrent:'आप क्या करना चाहते हैं लिखें, ONEBOX सही टूल खोज देगा।',popularTools:'लोकप्रिय टूल्स',viewAll:'सभी देखें',totalTools:'कुल टूल्स',accounts:'अकाउंट',noneNeeded:'जरूरत नहीं',processing:'प्रोसेसिंग',languages:'भाषाएँ',browseCategory:'कैटेगरी के अनुसार टूल्स',viewCategories:'सभी कैटेगरी देखें →',featuredTools:'फीचर्ड टूल्स',viewTools:'सभी टूल्स देखें →',toolFinder:'टूल फाइंडर',smartBottomDesc:'आप क्या करना चाहते हैं लिखें और ONEBOX सही टूल ढूँढेगा।',allWorkingTools:'सभी काम करने वाले टूल्स',searchHint:'ऊपर सर्च करें या कैटेगरी चुनें।',useTool:'टूल खोलें',noMatch:'कोई मिलता-जुलता टूल नहीं मिला।'},
  mr:{home:'मुख्यपृष्ठ',smartbox:'स्मार्टबॉक्स',allTools:'सर्व टूल्स',categories:'श्रेणी',favorites:'आवडीचे',history:'इतिहास',heroTitle:'तुम्हाला लागणारी सर्व टूल्स.<br>एका बॉक्समध्ये.',heroDescCurrent:'दैनंदिन उपयोगाची ऑनलाइन टूल्स — सोपी, जलद आणि मोबाइलसाठी तयार.',freeTools:'🌿 मोफत टूल्स',noSignup:'⊘ साइन अप नको',smartFinder:'स्मार्ट फाइंडर',commandCurrent:'तुम्हाला काय करायचे आहे ते लिहा, ONEBOX योग्य टूल शोधेल.',popularTools:'लोकप्रिय टूल्स',viewAll:'सर्व पहा',totalTools:'एकूण टूल्स',accounts:'खाते',noneNeeded:'गरज नाही',processing:'प्रक्रिया',languages:'भाषा',browseCategory:'श्रेणीनुसार टूल्स',viewCategories:'सर्व श्रेणी पहा →',featuredTools:'निवडक टूल्स',viewTools:'सर्व टूल्स पहा →',toolFinder:'टूल फाइंडर',smartBottomDesc:'तुम्हाला काय करायचे आहे ते लिहा आणि ONEBOX योग्य टूल शोधेल.',allWorkingTools:'सर्व कार्यरत टूल्स',searchHint:'वर शोधा किंवा श्रेणी निवडा.',useTool:'टूल वापरा',noMatch:'जुळणारे टूल सापडले नाही.'},
  gu:{home:'હોમ',smartbox:'સ્માર્ટબોક્સ',allTools:'બધા ટૂલ્સ',categories:'કેટેગરી',favorites:'પસંદગી',history:'ઇતિહાસ',heroTitle:'તમને જરૂરી બધા ટૂલ્સ.<br>એક જ બોક્સમાં.',heroDescCurrent:'રોજિંદા ઉપયોગી ઑનલાઇન ટૂલ્સ — સરળ, ઝડપી અને મોબાઇલ માટે બનાવેલા.',freeTools:'🌿 મફત ટૂલ્સ',noSignup:'⊘ સાઇન અપ જરૂરી નથી',smartFinder:'સ્માર્ટ ફાઇન્ડર',commandCurrent:'તમે શું કરવા માંગો છો લખો, ONEBOX યોગ્ય ટૂલ શોધશે.',popularTools:'લોકપ્રિય ટૂલ્સ',viewAll:'બધું જુઓ',totalTools:'કુલ ટૂલ્સ',accounts:'એકાઉન્ટ',noneNeeded:'જરૂર નથી',processing:'પ્રોસેસિંગ',languages:'ભાષાઓ',browseCategory:'કેટેગરી પ્રમાણે ટૂલ્સ',viewCategories:'બધી કેટેગરી જુઓ →',featuredTools:'ફીચર્ડ ટૂલ્સ',viewTools:'બધા ટૂલ્સ જુઓ →',toolFinder:'ટૂલ ફાઇન્ડર',smartBottomDesc:'તમે શું કરવા માંગો છો લખો અને ONEBOX યોગ્ય ટૂલ શોધશે.',allWorkingTools:'બધા કાર્યરત ટૂલ્સ',searchHint:'ઉપર શોધો અથવા કેટેગરી પસંદ કરો.',useTool:'ટૂલ વાપરો',noMatch:'મેચિંગ ટૂલ મળ્યું નથી.'},
  bn:{home:'হোম',smartbox:'স্মার্টবক্স',allTools:'সব টুল',categories:'ক্যাটাগরি',favorites:'পছন্দ',history:'ইতিহাস',heroTitle:'আপনার দরকারি সব টুল.<br>এক বক্সে.',heroDescCurrent:'প্রতিদিনের দরকারি অনলাইন টুল — সহজ, দ্রুত এবং মোবাইলের জন্য তৈরি।',freeTools:'🌿 ফ্রি টুল',noSignup:'⊘ সাইন আপ লাগবে না',smartFinder:'স্মার্ট ফাইন্ডার',commandCurrent:'আপনি কী করতে চান লিখুন, ONEBOX সঠিক টুল খুঁজে দেবে।',popularTools:'জনপ্রিয় টুল',viewAll:'সব দেখুন',totalTools:'মোট টুল',accounts:'অ্যাকাউন্ট',noneNeeded:'প্রয়োজন নেই',processing:'প্রসেসিং',languages:'ভাষা',browseCategory:'ক্যাটাগরি অনুযায়ী টুল',viewCategories:'সব ক্যাটাগরি দেখুন →',featuredTools:'ফিচার্ড টুল',viewTools:'সব টুল দেখুন →',toolFinder:'টুল ফাইন্ডার',smartBottomDesc:'আপনি কী করতে চান লিখুন এবং ONEBOX সেরা টুল খুঁজে দেবে।',allWorkingTools:'সব কার্যকর টুল',searchHint:'উপরে সার্চ করুন বা ক্যাটাগরি বাছুন।',useTool:'টুল ব্যবহার',noMatch:'মিলে এমন টুল পাওয়া যায়নি।'},
  ta:{home:'முகப்பு',smartbox:'ஸ்மார்ட்பாக்ஸ்',allTools:'அனைத்து கருவிகள்',categories:'வகைகள்',favorites:'பிடித்தவை',history:'வரலாறு',heroTitle:'உங்களுக்கு தேவையான அனைத்து கருவிகளும்.<br>ஒரே பெட்டியில்.',heroDescCurrent:'தினசரி பயன்பாட்டு ஆன்லைன் கருவிகள் — எளிமை, வேகம், மொபைலுக்கு ஏற்றது.',freeTools:'🌿 இலவச கருவிகள்',noSignup:'⊘ பதிவு தேவையில்லை',smartFinder:'ஸ்மார்ட் ஃபைண்டர்',commandCurrent:'நீங்கள் செய்ய விரும்புவது என்ன என்று எழுதுங்கள், ONEBOX சரியான கருவியை கண்டுபிடிக்கும்.',popularTools:'பிரபல கருவிகள்',viewAll:'அனைத்தையும் காண்க',totalTools:'மொத்த கருவிகள்',accounts:'கணக்கு',noneNeeded:'தேவையில்லை',processing:'செயலாக்கம்',languages:'மொழிகள்',browseCategory:'வகைப்படி கருவிகள்',viewCategories:'அனைத்து வகைகளும் →',featuredTools:'சிறப்பு கருவிகள்',viewTools:'அனைத்து கருவிகள் →',toolFinder:'கருவி தேடுபவர்',smartBottomDesc:'நீங்கள் செய்ய வேண்டியது என்ன என்று எழுதுங்கள்; ONEBOX சரியான கருவியை தேடும்.',allWorkingTools:'அனைத்து செயல்படும் கருவிகள்',searchHint:'மேலே தேடுங்கள் அல்லது ஒரு வகையை தேர்ந்தெடுக்கவும்.',useTool:'கருவி பயன்படுத்து',noMatch:'பொருத்தமான கருவி கிடைக்கவில்லை.'},
  te:{home:'హోమ్',smartbox:'స్మార్ట్‌బాక్స్',allTools:'అన్ని టూల్స్',categories:'కేటగిరీలు',favorites:'ఇష్టమైనవి',history:'హిస్టరీ',heroTitle:'మీకు కావాల్సిన అన్ని టూల్స్.<br>ఒకే బాక్స్‌లో.',heroDescCurrent:'రోజువారీ ఉపయోగకరమైన ఆన్‌లైన్ టూల్స్ — సులభం, వేగం, మొబైల్‌కు సరిపోయేలా.',freeTools:'🌿 ఉచిత టూల్స్',noSignup:'⊘ సైన్ అప్ అవసరం లేదు',smartFinder:'స్మార్ట్ ఫైండర్',commandCurrent:'మీరు ఏం చేయాలనుకుంటున్నారో టైప్ చేయండి, ONEBOX సరైన టూల్ కనుగొంటుంది.',popularTools:'ప్రసిద్ధ టూల్స్',viewAll:'అన్నీ చూడండి',totalTools:'మొత్తం టూల్స్',accounts:'అకౌంట్',noneNeeded:'అవసరం లేదు',processing:'ప్రాసెసింగ్',languages:'భాషలు',browseCategory:'కేటగిరీ ప్రకారం టూల్స్',viewCategories:'అన్ని కేటగిరీలు →',featuredTools:'ఫీచర్డ్ టూల్స్',viewTools:'అన్ని టూల్స్ →',toolFinder:'టూల్ ఫైండర్',smartBottomDesc:'మీరు ఏం చేయాలనుకుంటున్నారో టైప్ చేయండి; ONEBOX సరైన టూల్ కనుగొంటుంది.',allWorkingTools:'అన్ని పనిచేసే టూల్స్',searchHint:'పై భాగంలో సెర్చ్ చేయండి లేదా కేటగిరీ ఎంచుకోండి.',useTool:'టూల్ వాడండి',noMatch:'సరిపోలే టూల్ దొరకలేదు.'},
  kn:{home:'ಮುಖಪುಟ',smartbox:'ಸ್ಮಾರ್ಟ್‌ಬಾಕ್ಸ್',allTools:'ಎಲ್ಲಾ ಟೂಲ್‌ಗಳು',categories:'ವರ್ಗಗಳು',favorites:'ಮೆಚ್ಚಿನವು',history:'ಇತಿಹಾಸ',heroTitle:'ನಿಮಗೆ ಬೇಕಾದ ಎಲ್ಲಾ ಟೂಲ್‌ಗಳು.<br>ಒಂದೇ ಬಾಕ್ಸ್‌ನಲ್ಲಿ.',heroDescCurrent:'ದೈನಂದಿನ ಉಪಯೋಗದ ಆನ್‌ಲೈನ್ ಟೂಲ್‌ಗಳು — ಸರಳ, ವೇಗ ಮತ್ತು ಮೊಬೈಲ್‌ಗೆ ಹೊಂದುವಂತೆ.',freeTools:'🌿 ಉಚಿತ ಟೂಲ್‌ಗಳು',noSignup:'⊘ ಸೈನ್ ಅಪ್ ಬೇಡ',smartFinder:'ಸ್ಮಾರ್ಟ್ ಫೈಂಡರ್',commandCurrent:'ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ ಎಂದು ಬರೆಯಿರಿ, ONEBOX ಸರಿಯಾದ ಟೂಲ್ ಹುಡುಕುತ್ತದೆ.',popularTools:'ಜನಪ್ರಿಯ ಟೂಲ್‌ಗಳು',viewAll:'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',totalTools:'ಒಟ್ಟು ಟೂಲ್‌ಗಳು',accounts:'ಖಾತೆ',noneNeeded:'ಅಗತ್ಯವಿಲ್ಲ',processing:'ಪ್ರೊಸೆಸಿಂಗ್',languages:'ಭಾಷೆಗಳು',browseCategory:'ವರ್ಗದ ಪ್ರಕಾರ ಟೂಲ್‌ಗಳು',viewCategories:'ಎಲ್ಲಾ ವರ್ಗಗಳು →',featuredTools:'ವಿಶೇಷ ಟೂಲ್‌ಗಳು',viewTools:'ಎಲ್ಲಾ ಟೂಲ್‌ಗಳು →',toolFinder:'ಟೂಲ್ ಫೈಂಡರ್',smartBottomDesc:'ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ ಎಂದು ಬರೆಯಿರಿ; ONEBOX ಸರಿಯಾದ ಟೂಲ್ ಹುಡುಕುತ್ತದೆ.',allWorkingTools:'ಎಲ್ಲಾ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಟೂಲ್‌ಗಳು',searchHint:'ಮೇಲೆ ಹುಡುಕಿ ಅಥವಾ ವರ್ಗ ಆಯ್ಕೆಮಾಡಿ.',useTool:'ಟೂಲ್ ಬಳಸಿ',noMatch:'ಹೊಂದುವ ಟೂಲ್ ಸಿಗಲಿಲ್ಲ.'},
  pa:{home:'ਹੋਮ',smartbox:'ਸਮਾਰਟਬਾਕਸ',allTools:'ਸਾਰੇ ਟੂਲ',categories:'ਕੈਟੇਗਰੀਆਂ',favorites:'ਪਸੰਦੀਦਾ',history:'ਇਤਿਹਾਸ',heroTitle:'ਤੁਹਾਡੇ ਲੋੜੀਂਦੇ ਸਾਰੇ ਟੂਲ.<br>ਇੱਕੋ ਬਾਕਸ ਵਿੱਚ.',heroDescCurrent:'ਰੋਜ਼ਾਨਾ ਵਰਤੋਂ ਦੇ ਆਨਲਾਈਨ ਟੂਲ — ਸੌਖੇ, ਤੇਜ਼ ਅਤੇ ਮੋਬਾਈਲ ਲਈ ਬਣੇ।',freeTools:'🌿 ਮੁਫ਼ਤ ਟੂਲ',noSignup:'⊘ ਸਾਈਨ ਅਪ ਦੀ ਲੋੜ ਨਹੀਂ',smartFinder:'ਸਮਾਰਟ ਫਾਈਂਡਰ',commandCurrent:'ਤੁਸੀਂ ਕੀ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ ਲਿਖੋ, ONEBOX ਸਹੀ ਟੂਲ ਲੱਭੇਗਾ।',popularTools:'ਲੋਕਪ੍ਰਿਯ ਟੂਲ',viewAll:'ਸਾਰੇ ਵੇਖੋ',totalTools:'ਕੁੱਲ ਟੂਲ',accounts:'ਅਕਾਊਂਟ',noneNeeded:'ਲੋੜ ਨਹੀਂ',processing:'ਪ੍ਰੋਸੈਸਿੰਗ',languages:'ਭਾਸ਼ਾਵਾਂ',browseCategory:'ਕੈਟੇਗਰੀ ਅਨੁਸਾਰ ਟੂਲ',viewCategories:'ਸਾਰੀਆਂ ਕੈਟੇਗਰੀਆਂ →',featuredTools:'ਫੀਚਰਡ ਟੂਲ',viewTools:'ਸਾਰੇ ਟੂਲ →',toolFinder:'ਟੂਲ ਫਾਈਂਡਰ',smartBottomDesc:'ਤੁਸੀਂ ਕੀ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ ਲਿਖੋ ਅਤੇ ONEBOX ਸਹੀ ਟੂਲ ਲੱਭੇਗਾ।',allWorkingTools:'ਸਾਰੇ ਚੱਲਣ ਵਾਲੇ ਟੂਲ',searchHint:'ਉੱਪਰ ਖੋਜੋ ਜਾਂ ਕੈਟੇਗਰੀ ਚੁਣੋ।',useTool:'ਟੂਲ ਵਰਤੋ',noMatch:'ਮਿਲਦਾ ਟੂਲ ਨਹੀਂ ਮਿਲਿਆ।'}
};

Object.keys(EXTRA_I18N).forEach(lang => Object.assign(I18N[lang] || (I18N[lang]={}), EXTRA_I18N[lang]));

// Extend the existing language function so the current dashboard really changes language.
const baseApplyLanguage = applyLanguage;
applyLanguage = function(lang){
  baseApplyLanguage(lang);
  const t=I18N[lang]||I18N.en;
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{const k=el.dataset.i18nHtml;if(t[k]) el.innerHTML=t[k];});
  renderCats();
  renderTools(document.querySelector('#toolSearch')?.value || '');
};

// Re-bind language selector because applyLanguage was extended after initial setup.
if(langSelect){
  langSelect.onchange=e=>applyLanguage(e.target.value);
  applyLanguage(langSelect.value || localStorage.getItem('onebox_lang') || 'en');
}

// Translate category names and common dynamic button labels.
const CAT_LABELS={
 en:{All:'All',Finance:'Finance',Images:'Images',PDF:'PDF',Jobs:'Jobs',Students:'Students',Text:'Text',Developer:'Developer',Social:'Social',Utility:'Utility'},
 hi:{All:'सभी',Finance:'फाइनेंस',Images:'इमेज',PDF:'PDF',Jobs:'जॉब',Students:'स्टूडेंट',Text:'टेक्स्ट',Developer:'डेवलपर',Social:'सोशल',Utility:'यूटिलिटी'},
 mr:{All:'सर्व',Finance:'फायनान्स',Images:'इमेज',PDF:'PDF',Jobs:'जॉब',Students:'विद्यार्थी',Text:'टेक्स्ट',Developer:'डेव्हलपर',Social:'सोशल',Utility:'युटिलिटी'},
 gu:{All:'બધા',Finance:'ફાઇનાન્સ',Images:'ઇમેજ',PDF:'PDF',Jobs:'જોબ',Students:'વિદ્યાર્થી',Text:'ટેક્સ્ટ',Developer:'ડેવલપર',Social:'સોશિયલ',Utility:'યુટિલિટી'},
 bn:{All:'সব',Finance:'ফাইন্যান্স',Images:'ইমেজ',PDF:'PDF',Jobs:'চাকরি',Students:'স্টুডেন্ট',Text:'টেক্সট',Developer:'ডেভেলপার',Social:'সোশ্যাল',Utility:'ইউটিলিটি'},
 ta:{All:'அனைத்தும்',Finance:'நிதி',Images:'படங்கள்',PDF:'PDF',Jobs:'வேலை',Students:'மாணவர்கள்',Text:'உரை',Developer:'டெவலப்பர்',Social:'சமூக',Utility:'பயன்பாடு'},
 te:{All:'అన్నీ',Finance:'ఫైనాన్స్',Images:'ఇమేజెస్',PDF:'PDF',Jobs:'జాబ్స్',Students:'స్టూడెంట్స్',Text:'టెక్స్ట్',Developer:'డెవలపర్',Social:'సోషల్',Utility:'యుటిలిటీ'},
 kn:{All:'ಎಲ್ಲಾ',Finance:'ಫೈನಾನ್ಸ್',Images:'ಚಿತ್ರಗಳು',PDF:'PDF',Jobs:'ಉದ್ಯೋಗ',Students:'ವಿದ್ಯಾರ್ಥಿಗಳು',Text:'ಟೆಕ್ಸ್ಟ್',Developer:'ಡೆವಲಪರ್',Social:'ಸೋಶಿಯಲ್',Utility:'ಯುಟಿಲಿಟಿ'},
 pa:{All:'ਸਾਰੇ',Finance:'ਫਾਇਨੈਂਸ',Images:'ਇਮੇਜ',PDF:'PDF',Jobs:'ਨੌਕਰੀ',Students:'ਵਿਦਿਆਰਥੀ',Text:'ਟੈਕਸਟ',Developer:'ਡਿਵੈਲਪਰ',Social:'ਸੋਸ਼ਲ',Utility:'ਯੂਟਿਲਿਟੀ'}
};
const originalRenderCats=renderCats;
renderCats=function(){
  const lang=localStorage.getItem('onebox_lang')||'en', labels=CAT_LABELS[lang]||CAT_LABELS.en;
  bar.innerHTML=cats.map(c=>`<button class="${c===active?'active':''}" data-cat="${esc(c)}">${esc(labels[c]||c)}</button>`).join('');
};
const originalRenderTools=renderTools;
renderTools=function(q=''){
  q=q.toLowerCase().trim();
  const a=tools.filter(t=>(active==='All'||t.cat===active)&&(!q||`${t.name} ${t.desc} ${t.keys.join(' ')}`.toLowerCase().includes(q)));
  const lang=localStorage.getItem('onebox_lang')||'en', t=I18N[lang]||I18N.en, labels=CAT_LABELS[lang]||CAT_LABELS.en;
  grid.innerHTML=a.map(x=>`<article class="tool"><div class="toolIcon">${x.icon}</div><h3>${esc(x.name)}</h3><p>${esc(x.desc)}</p><div class="toolFooter"><small>${esc(labels[x.cat]||x.cat)}</small><button data-open="${esc(x.name)}">${esc(t.useTool||'Use Tool')}</button></div></article>`).join('')||`<div class="result">${esc(t.noMatch||'No matching tools found.')}</div>`;
};
renderCats();renderTools(document.querySelector('#toolSearch')?.value||'');

// Real theme switching: dark is default, light is optional and remembered.
const themeBtnFixed=document.querySelector('#themeBtn');
function applyTheme(theme){
  const isLight=theme==='light';
  document.body.classList.toggle('light',isLight);
  localStorage.setItem('onebox_theme',isLight?'light':'dark');
  if(themeBtnFixed){themeBtnFixed.textContent=isLight?'☀':'☾';themeBtnFixed.title=isLight?'Switch to dark theme':'Switch to light theme';}
}
applyTheme(localStorage.getItem('onebox_theme')||'dark');
if(themeBtnFixed){themeBtnFixed.onclick=()=>applyTheme(document.body.classList.contains('light')?'dark':'light');}
