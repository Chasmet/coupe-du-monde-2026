function applyKnockoutUpdate(){
  if(typeof state!=='undefined') state.dataLabel='MAJ 12 juillet • quarts terminés • demi-finales connues';
  try{if(typeof save==='function')save()}catch(e){}
}

const R16=[
  ['Allemagne','Paraguay','1-1','tab 3-4','Paraguay'],['France','Suède','3-0','','France'],['Afrique du Sud','Canada','0-1','','Canada'],['Pays-Bas','Maroc','1-1','tab 2-3','Maroc'],
  ['Portugal','Croatie','2-1','','Portugal'],['Espagne','Autriche','3-0','','Espagne'],['États-Unis','Bosnie','2-0','','États-Unis'],['Belgique','Sénégal','3-2','ap','Belgique'],
  ['Brésil','Japon','2-1','','Brésil'],['Côte d’Ivoire','Norvège','1-2','','Norvège'],['Mexique','Équateur','2-0','','Mexique'],['Angleterre','RD Congo','2-1','','Angleterre'],
  ['Argentine','Cap-Vert','3-2','','Argentine'],['Australie','Égypte','1-1','tab 2-4','Égypte'],['Suisse','Algérie','2-0','','Suisse'],['Colombie','Ghana','1-0','','Colombie']
];

const R8=[
  ['Paraguay','France','0','1','France',''],['Canada','Maroc','0','3','Maroc',''],['Portugal','Espagne','0','1','Espagne',''],['États-Unis','Belgique','1','4','Belgique',''],
  ['Brésil','Norvège','1','2','Norvège',''],['Mexique','Angleterre','2','3','Angleterre',''],['Argentine','Égypte','3','2','Argentine',''],['Suisse','Colombie','0','0','Suisse','tab 4-3']
];

const QF=[
  ['France','Maroc','2','0','France','9 juillet',''],['Espagne','Belgique','2','1','Espagne','10 juillet',''],
  ['Angleterre','Norvège','2','1','Angleterre','11 juillet','ap'],['Argentine','Suisse','3','1','Argentine','11 juillet','ap']
];

const SF=[
  ['France','Espagne','14 juillet','21h00','Dallas Stadium'],
  ['Angleterre','Argentine','15 juillet','21h00','Atlanta Stadium']
];

function fl(t){return typeof flag==='function'?flag(t):''}
function sh(t){return ({'Afrique du Sud':'Afrique S.','Côte d’Ivoire':'Côte Iv.','États-Unis':'USA','RD Congo':'RDC','Bosnie':'Bosnie-H.'}[t]||t)}
function teamLine(name,score,win){return '<div class="br-team '+(win?'win':'')+'"><span>'+fl(name)+' '+sh(name)+'</span><b>'+score+'</b></div>'}
function card16(m,i){return '<div class="br-card small"><em>'+(i+1)+'</em>'+teamLine(m[0],m[2].split('-')[0],m[4]===m[0])+teamLine(m[1],m[2].split('-')[1]||'',m[4]===m[1])+(m[3]?'<small>'+m[3]+'</small>':'')+'</div>'}
function card8(m,i){return '<div class="br-card mid"><em>8e '+(i+1)+'</em>'+teamLine(m[0],m[2],m[4]===m[0])+teamLine(m[1],m[3],m[4]===m[1])+'<small>Qualifié : '+sh(m[4])+(m[5]?' • '+m[5]:'')+'</small></div>'}
function cardQ(q,i){return '<div class="br-card qf"><em>Quart '+(i+1)+' • '+q[5]+'</em>'+teamLine(q[0],q[2],q[4]===q[0])+teamLine(q[1],q[3],q[4]===q[1])+'<small>Qualifié : '+sh(q[4])+(q[6]?' • '+q[6]:'')+'</small></div>'}
function cardSemi(s,i){return '<div class="br-card semi"><em>Demi-finale '+(i+1)+'</em><div class="br-vs"><span>'+fl(s[0])+' '+s[0]+'</span><strong>VS</strong><span>'+fl(s[1])+' '+s[1]+'</span></div><small>'+s[2]+' • '+s[3]+'<br>'+s[4]+'</small></div>'}

function side(title,r16s,r8s,qfs,start){
  return '<section class="br-side"><h3>'+title+'</h3><div class="br-cols"><div class="br-col r16col"><h4>16es</h4>'+r16s.map((m,i)=>card16(m,start+i)).join('')+'</div><div class="br-col r8col"><h4>8es</h4>'+r8s.map((m,i)=>card8(m,start/2+i)).join('')+'</div><div class="br-col qfcol"><h4>Quarts</h4>'+qfs.map((q,i)=>cardQ(q,start/4+i)).join('')+'</div></div></section>'
}

function renderFullTree(){
  return '<div class="blue-board full-tree"><div class="bb-head"><strong>COUPE DU MONDE 2026</strong><span>Phase finale • quarts terminés</span></div>'+side('Partie gauche du tableau',R16.slice(0,8),R8.slice(0,4),QF.slice(0,2),0)+'<div class="bb-center"><div class="semi-stack">'+cardSemi(SF[0],0)+cardSemi(SF[1],1)+'</div><div class="bb-final"><div class="bb-cup">🏆</div><strong>FINALE</strong><span>Vainqueur France-Espagne<br>vs<br>Vainqueur Angleterre-Argentine</span><small>19 juillet • 21h00</small></div></div>'+side('Partie droite du tableau',R16.slice(8),R8.slice(4),QF.slice(2),8)+'</div>'
}

function renderCurrentTree(){
  return '<div class="current-board"><div class="bb-head"><strong>DERNIER CARRÉ</strong><span>4 demi-finalistes</span></div><div class="current-grid"><div class="current-side">'+cardQ(QF[0],0)+cardQ(QF[1],1)+'</div><div class="current-middle">'+cardSemi(SF[0],0)+'<div class="current-cup">🏆</div><div class="final-slot"><b>FINALE</b><span>19 juillet • 21h00</span></div>'+cardSemi(SF[1],1)+'</div><div class="current-side">'+cardQ(QF[2],2)+cardQ(QF[3],3)+'</div></div><div class="third-place"><b>Match pour la 3e place</b><span>18 juillet • 23h00</span></div></div>'
}

function row16(m){let cls=m[0]==='Sénégal'||m[1]==='Sénégal'?'ko-result senegal-out':'ko-result';return '<div class="'+cls+'"><strong>'+m[0]+' - '+m[1]+'</strong><b>'+m[2]+'</b><em>Qualifié : '+m[4]+(m[3]?' • '+m[3]:'')+'</em></div>'}
function row8(m){return '<div class="ko-result"><strong>'+m[0]+' - '+m[1]+'</strong><b>'+m[2]+'-'+m[3]+'</b><em>Qualifié : '+m[4]+(m[5]?' • '+m[5]:'')+'</em></div>'}
function rowQ(q){return '<div class="ko-result"><strong>'+q[0]+' - '+q[1]+'</strong><b>'+q[2]+'-'+q[3]+'</b><em>Qualifié : '+q[4]+(q[6]?' • '+q[6]:'')+'</em></div>'}

function initBracketControls(){
  const root=document.getElementById('knockoutView');
  if(!root)return;
  const full=root.querySelector('[data-bracket="full"]');
  const current=root.querySelector('[data-bracket="current"]');
  const fullBtn=root.querySelector('[data-show="full"]');
  const currentBtn=root.querySelector('[data-show="current"]');
  if(!full||!current||!fullBtn||!currentBtn)return;
  function show(mode){
    full.hidden=mode!=='full';
    current.hidden=mode!=='current';
    fullBtn.classList.toggle('active',mode==='full');
    currentBtn.classList.toggle('active',mode==='current');
    localStorage.setItem('wcBracketMode',mode);
  }
  fullBtn.onclick=()=>show('full');
  currentBtn.onclick=()=>show('current');
  show(localStorage.getItem('wcBracketMode')||'current');
}

function renderProjectedBracket(){
  setTimeout(initBracketControls,0);
  return '<article class="card wide-card ko-card blue-phase"><h2 class="section-title">Phase finale</h2><p class="subtitle">Quarts terminés. Demi-finales : France-Espagne et Angleterre-Argentine. Les poules restent conservées.</p><div class="ko-alert"><strong>Dernier résultat</strong><span>Argentine 3-1 Suisse après prolongation.</span></div><div class="bracket-switch"><button type="button" data-show="current">Vue actuelle</button><button type="button" data-show="full">Tableau complet</button></div><div data-bracket="current">'+renderCurrentTree()+'</div><div data-bracket="full" hidden>'+renderFullTree()+'</div><details class="ko-details" open><summary>Résultats des quarts</summary><div class="ko-results">'+QF.map(rowQ).join('')+'</div></details><details class="ko-details"><summary>Résultats des 8es</summary><div class="ko-results">'+R8.map(row8).join('')+'</div></details><details class="ko-details"><summary>Résultats des 16es</summary><div class="ko-results">'+R16.map(row16).join('')+'</div></details></article>'
}

setTimeout(function(){applyKnockoutUpdate();if(typeof render==='function')render();if(typeof updateDashboard==='function')updateDashboard()},120);