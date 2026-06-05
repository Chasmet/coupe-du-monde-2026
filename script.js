const STORAGE_KEY = 'cdm2026-v2';

const FLAGS = {
  'Mexique':'🇲🇽','Afrique du Sud':'🇿🇦','Corée du Sud':'🇰🇷','Tchéquie':'🇨🇿','Canada':'🇨🇦','Bosnie':'🇧🇦','Qatar':'🇶🇦','Suisse':'🇨🇭','Brésil':'🇧🇷','Maroc':'🇲🇦','Haïti':'🇭🇹','Écosse':'🏴','États-Unis':'🇺🇸','Paraguay':'🇵🇾','Australie':'🇦🇺','Turquie':'🇹🇷','Allemagne':'🇩🇪','Curaçao':'🇨🇼','Côte d’Ivoire':'🇨🇮','Équateur':'🇪🇨','Pays-Bas':'🇳🇱','Japon':'🇯🇵','Suède':'🇸🇪','Tunisie':'🇹🇳','Belgique':'🇧🇪','Égypte':'🇪🇬','Iran':'🇮🇷','Nouvelle-Zélande':'🇳🇿','Espagne':'🇪🇸','Cap Vert':'🇨🇻','Arabie Saoudite':'🇸🇦','Uruguay':'🇺🇾','France':'🇫🇷','Sénégal':'🇸🇳','Irak':'🇮🇶','Norvège':'🇳🇴','Argentine':'🇦🇷','Algérie':'🇩🇿','Autriche':'🇦🇹','Jordanie':'🇯🇴','Portugal':'🇵🇹','RD Congo':'🇨🇩','Ouzbékistan':'🇺🇿','Colombie':'🇨🇴','Angleterre':'🏴','Croatie':'🇭🇷','Ghana':'🇬🇭','Panama':'🇵🇦'
};

const GROUPS = [
  {name:'A',teams:['Mexique','Afrique du Sud','Corée du Sud','Tchéquie']},
  {name:'B',teams:['Canada','Bosnie','Qatar','Suisse']},
  {name:'C',teams:['Brésil','Maroc','Haïti','Écosse']},
  {name:'D',teams:['États-Unis','Paraguay','Australie','Turquie']},
  {name:'E',teams:['Allemagne','Curaçao','Côte d’Ivoire','Équateur']},
  {name:'F',teams:['Pays-Bas','Japon','Suède','Tunisie']},
  {name:'G',teams:['Belgique','Égypte','Iran','Nouvelle-Zélande']},
  {name:'H',teams:['Espagne','Cap Vert','Arabie Saoudite','Uruguay']},
  {name:'I',teams:['France','Sénégal','Irak','Norvège']},
  {name:'J',teams:['Argentine','Algérie','Autriche','Jordanie']},
  {name:'K',teams:['Portugal','RD Congo','Ouzbékistan','Colombie']},
  {name:'L',teams:['Angleterre','Croatie','Ghana','Panama']}
];

const roundLabels = {R32:'Seizièmes de finale',R16:'Huitièmes de finale',QF:'Quarts de finale',SF:'Demi-finales',FINAL:'Finale',THIRD:'3e place'};
let activeTab = 'groups';
let activeGroup = 'A';
let state = loadState() || freshState();

function flag(team){return FLAGS[team] || '🏳️'}
function teamHtml(team){return `<span class="team"><span class="flag">${flag(team)}</span><span>${team}</span></span>`}
function n(v){if(v === '' || v === null || typeof v === 'undefined') return null; const x = parseInt(v,10); return Number.isFinite(x) && x >= 0 ? x : null;}

function makeMatches(teams){
  const matches = [];
  let id = 0;
  for(let i=0;i<teams.length;i++){
    for(let j=i+1;j<teams.length;j++){
      matches.push({id:`m${id++}`,teamA:teams[i],teamB:teams[j],scoreA:null,scoreB:null});
    }
  }
  return matches;
}
function freshState(){
  return {groups: GROUPS.map(g => ({name:g.name,teams:[...g.teams],matches:makeMatches(g.teams)})), knockout: [], currentRound:null, champion:null, third:null};
}
function save(){localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); updateDashboard();}
function loadState(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY));}catch{return null;}}
function reset(){localStorage.removeItem(STORAGE_KEY); state = freshState(); activeTab='groups'; activeGroup='A'; render();}

function standings(group){
  const stats = Object.fromEntries(group.teams.map(t => [t,{team:t,j:0,g:0,d:0,p:0,bp:0,bc:0,diff:0,pts:0}]));
  group.matches.forEach(m => {
    if(m.scoreA === null || m.scoreB === null) return;
    const A = stats[m.teamA], B = stats[m.teamB];
    A.j++; B.j++; A.bp+=m.scoreA; A.bc+=m.scoreB; B.bp+=m.scoreB; B.bc+=m.scoreA;
    if(m.scoreA > m.scoreB){A.g++; B.p++; A.pts += 3;}
    else if(m.scoreB > m.scoreA){B.g++; A.p++; B.pts += 3;}
    else {A.d++; B.d++; A.pts++; B.pts++;}
  });
  return Object.values(stats).map(s => ({...s,diff:s.bp-s.bc})).sort((a,b)=>b.pts-a.pts||b.diff-a.diff||b.bp-a.bp||a.team.localeCompare(b.team,'fr'));
}
function allStandings(){
  const rows=[], thirds=[];
  state.groups.forEach(g => standings(g).forEach((s,i)=>{rows.push({group:g.name,pos:i+1,...s}); if(i===2) thirds.push({group:g.name,pos:3,...s});}));
  thirds.sort((a,b)=>b.pts-a.pts||b.diff-a.diff||b.bp-a.bp||a.team.localeCompare(b.team,'fr'));
  return {rows, bestThirds: thirds.slice(0,8)};
}
function qualified(){
  const {rows,bestThirds}=allStandings();
  return [...rows.filter(r=>r.pos<=2), ...bestThirds].map(x=>x.team);
}
function allGroupsDone(){return state.groups.every(g=>g.matches.every(m=>m.scoreA!==null && m.scoreB!==null));}

function updateDashboard(){
  const total = state.groups.reduce((s,g)=>s+g.matches.length,0);
  const played = state.groups.reduce((s,g)=>s+g.matches.filter(m=>m.scoreA!==null && m.scoreB!==null).length,0);
  const done = state.groups.filter(g=>g.matches.every(m=>m.scoreA!==null && m.scoreB!==null)).length;
  const pct = total ? Math.round(played/total*100) : 0;
  document.getElementById('progressText').textContent = pct + '%';
  document.getElementById('matchesText').textContent = `${played}/${total}`;
  document.getElementById('groupsText').textContent = `${done}/12`;
  document.getElementById('progressBar').style.width = pct + '%';
}

function renderGroups(){
  const group = state.groups.find(g => g.name === activeGroup) || state.groups[0];
  const groupTabs = `<div class="group-switch">${state.groups.map(g=>`<button class="group-pill ${g.name===group.name?'active':''}" data-group-tab="${g.name}">${g.name}</button>`).join('')}</div>`;
  const table = standings(group).map((s,i)=>`<tr class="${i<2?'qual-row':''}"><td>${teamHtml(s.team)}</td><td>${s.j}</td><td>${s.g}</td><td>${s.d}</td><td class="hide-mobile">${s.p}</td><td class="hide-mobile">${s.bp}</td><td class="hide-mobile">${s.bc}</td><td>${s.diff}</td><td><strong>${s.pts}</strong></td></tr>`).join('');
  const done = group.matches.every(m=>m.scoreA!==null && m.scoreB!==null);
  const matches = group.matches.map((m,i)=>`<div class="match"><div class="match-top"><span>Match ${i+1}</span><span>${m.scoreA!==null&&m.scoreB!==null?'OK':'À saisir'}</span></div><div class="match-compact"><div class="team-line">${teamHtml(m.teamA)}</div><div class="scores"><input class="score" type="number" min="0" value="${m.scoreA ?? ''}" data-group="${group.name}" data-match="${m.id}" data-field="scoreA"><span class="dash">-</span><input class="score" type="number" min="0" value="${m.scoreB ?? ''}" data-group="${group.name}" data-match="${m.id}" data-field="scoreB"></div><div class="team-line right">${teamHtml(m.teamB)}</div></div></div>`).join('');
  document.getElementById('groupsView').innerHTML = `${groupTabs}<article class="card"><div class="card-head"><div class="card-title">Groupe ${group.name}</div><span class="badge ${done?'':'warn'}">${done?'Terminé':'En cours'}</span></div><div class="card-body"><div class="table-wrap"><table><thead><tr><th>Équipe</th><th>J</th><th>G</th><th>N</th><th class="hide-mobile">P</th><th class="hide-mobile">BP</th><th class="hide-mobile">BC</th><th>Diff</th><th>Pts</th></tr></thead><tbody>${table}</tbody></table></div><div class="matches">${matches}</div></div></article>`;
  document.querySelectorAll('[data-group-tab]').forEach(btn=>btn.addEventListener('click', e=>{activeGroup=e.currentTarget.dataset.groupTab; renderGroups();}));
  document.querySelectorAll('.score[data-group]').forEach(input=>input.addEventListener('input', e=>{
    const g = state.groups.find(x=>x.name===e.target.dataset.group);
    const m = g.matches.find(x=>x.id===e.target.dataset.match);
    m[e.target.dataset.field] = n(e.target.value);
    save(); renderGroups(); renderQualified();
  }));
}

function renderQualified(){
  const {rows,bestThirds}=allStandings();
  const q = [...rows.filter(r=>r.pos<=2), ...bestThirds];
  document.getElementById('qualifiedView').innerHTML = `<article class="card wide-card"><h2 class="section-title">Qualifiés ${q.length}/32</h2><p class="subtitle">Les 2 premiers de chaque groupe + les 8 meilleurs troisièmes.</p><div class="list">${q.map((x,i)=>`<div class="item"><span>${i+1}. ${teamHtml(x.team)}</span><small>Groupe ${x.group} • ${x.pos}e</small></div>`).join('')}</div><button class="btn primary" style="width:100%;margin-top:14px" id="generateBtn" ${allGroupsDone()?'':'disabled'}>${allGroupsDone()?'Générer la phase finale':'Termine tous les matchs'}</button></article>`;
  const btn = document.getElementById('generateBtn'); if(btn) btn.addEventListener('click', generateKnockout);
}

function generateKnockout(){
  const q = qualified();
  state.knockout = [];
  for(let i=0;i<16;i++) state.knockout.push({id:`r32-${i}`,round:'R32',teamA:q[i],teamB:q[31-i],scoreA:null,scoreB:null,etA:null,etB:null,pens:null});
  state.currentRound = 'R32'; state.champion = null; state.third = null; activeTab='knockout'; save(); render();
}
function winner(m){
  if(!m.teamA || !m.teamB || m.scoreA===null || m.scoreB===null) return null;
  if(m.scoreA>m.scoreB) return m.teamA; if(m.scoreB>m.scoreA) return m.teamB;
  if(m.etA!==null && m.etB!==null){if(m.etA>m.etB) return m.teamA; if(m.etB>m.etA) return m.teamB;}
  if(m.pens==='A') return m.teamA; if(m.pens==='B') return m.teamB; return null;
}
function currentMatches(){return state.knockout.filter(m=>m.round===state.currentRound);}
function nextRound(r){return r==='R32'?'R16':r==='R16'?'QF':r==='QF'?'SF':null;}
function advance(){
  const cur = currentMatches(); if(!cur.every(winner)) return;
  if(state.currentRound === 'SF'){
    const wins = cur.map(winner); const losers = cur.map(m=>winner(m)===m.teamA?m.teamB:m.teamA);
    state.knockout.push({id:'final',round:'FINAL',teamA:wins[0],teamB:wins[1],scoreA:null,scoreB:null,etA:null,etB:null,pens:null});
    state.knockout.push({id:'third',round:'THIRD',teamA:losers[0],teamB:losers[1],scoreA:null,scoreB:null,etA:null,etB:null,pens:null});
    state.currentRound = 'FINAL'; save(); renderKnockout(); return;
  }
  if(state.currentRound === 'FINAL') return;
  const wins = cur.map(winner); const nr = nextRound(state.currentRound); const count = nr==='R16'?8:nr==='QF'?4:2;
  for(let i=0;i<count;i++) state.knockout.push({id:`${nr}-${i}`,round:nr,teamA:wins[i*2],teamB:wins[i*2+1],scoreA:null,scoreB:null,etA:null,etB:null,pens:null});
  state.currentRound = nr; save(); renderKnockout();
}
function renderKnockout(){
  if(!state.currentRound){document.getElementById('knockoutView').innerHTML = `<article class="card wide-card"><h2 class="section-title">Phase finale</h2><p class="subtitle">Termine les groupes puis génère la phase finale.</p></article>`; return;}
  const cur = currentMatches();
  document.getElementById('knockoutView').innerHTML = `<article class="card wide-card"><h2 class="section-title">${roundLabels[state.currentRound]}</h2><div class="matches">${cur.map((m,i)=>{
    const w = winner(m); const draw = m.scoreA!==null && m.scoreB!==null && m.scoreA===m.scoreB; const needPens = draw && m.etA!==null && m.etB!==null && m.etA===m.etB;
    return `<div class="match"><div class="match-top"><span>Match ${i+1}</span><span>${w?'Qualifié':'En jeu'}</span></div><div class="match-compact"><div class="team-line">${teamHtml(m.teamA)}</div><div class="scores"><input class="score" type="number" min="0" value="${m.scoreA ?? ''}" data-k="${m.id}" data-field="scoreA"><span class="dash">-</span><input class="score" type="number" min="0" value="${m.scoreB ?? ''}" data-k="${m.id}" data-field="scoreB"></div><div class="team-line right">${teamHtml(m.teamB)}</div></div>${draw?`<div class="match-top" style="margin-top:12px"><span>Prolongation</span></div><div class="scores"><input class="score" type="number" min="0" value="${m.etA ?? ''}" data-k="${m.id}" data-field="etA"><span class="dash">-</span><input class="score" type="number" min="0" value="${m.etB ?? ''}" data-k="${m.id}" data-field="etB"></div>`:''}${needPens?`<div class="scores" style="margin-top:12px"><button class="btn ghost" data-pens="A" data-k="${m.id}">${m.teamA}</button><button class="btn ghost" data-pens="B" data-k="${m.id}">${m.teamB}</button></div>`:''}${w?`<div class="winner">Vainqueur : ${teamHtml(w)}</div>`:''}</div>`}).join('')}</div><button class="btn primary" style="width:100%;margin-top:14px" id="advanceBtn" ${cur.every(winner)?'':'disabled'}>Tour suivant</button></article>`;
  document.querySelectorAll('[data-k][data-field]').forEach(input=>input.addEventListener('input', e=>{const m=state.knockout.find(x=>x.id===e.target.dataset.k); m[e.target.dataset.field]=n(e.target.value); if((e.target.dataset.field==='scoreA'||e.target.dataset.field==='scoreB') && m.scoreA!==m.scoreB){m.etA=null;m.etB=null;m.pens=null;} save(); renderKnockout(); renderChampion();}));
  document.querySelectorAll('[data-pens]').forEach(btn=>btn.addEventListener('click', e=>{const m=state.knockout.find(x=>x.id===e.target.dataset.k); m.pens=e.target.dataset.pens; save(); renderKnockout(); renderChampion();}));
  const adv = document.getElementById('advanceBtn'); if(adv) adv.addEventListener('click', advance);
}
function renderChampion(){
  const final = state.knockout.find(m=>m.round==='FINAL'); const thirdMatch = state.knockout.find(m=>m.round==='THIRD');
  const champ = final ? winner(final) : null; const third = thirdMatch ? winner(thirdMatch) : null;
  state.champion = champ; state.third = third;
  document.getElementById('championView').innerHTML = `<article class="card champion-box">${champ?`<div class="trophy">🏆</div><p class="eyebrow">Champion du Monde 2026</p><div class="champion-name">${teamHtml(champ)}</div>${third?`<p class="subtitle">3e place : ${teamHtml(third)}</p>`:''}`:`<h2 class="section-title">Champion</h2><p class="subtitle">La finale n’est pas encore jouée.</p>`}</article>`;
}
function render(){
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t.dataset.tab===activeTab));
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));
  document.getElementById(activeTab+'View').classList.add('active-view');
  renderGroups(); renderQualified(); renderKnockout(); renderChampion(); updateDashboard();
}
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{activeTab=t.dataset.tab; render();}));
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('newTournamentBtn').addEventListener('click', reset);
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}
render();
