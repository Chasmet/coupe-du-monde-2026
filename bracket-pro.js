function applyJune28Update(){
  const finals = [
    ['J','Jordanie',0,4,'Argentine'],
    ['J','Algérie',1,1,'Autriche'],
    ['K','Colombie',1,1,'Portugal'],
    ['K','RD Congo',2,0,'Ouzbékistan'],
    ['L','Panama',0,2,'Angleterre'],
    ['L','Croatie',1,1,'Ghana']
  ];
  function setScore(groupName, teamA, scoreA, scoreB, teamB){
    if(typeof state === 'undefined' || !state.groups) return;
    const group = state.groups.find(g => g.name === groupName);
    if(!group) return;
    const match = group.matches.find(m => (m.teamA === teamA && m.teamB === teamB) || (m.teamA === teamB && m.teamB === teamA));
    if(!match) return;
    if(match.teamA === teamA){ match.scoreA = scoreA; match.scoreB = scoreB; }
    else { match.scoreA = scoreB; match.scoreB = scoreA; }
  }
  finals.forEach(r => setScore(...r));
  if(typeof PROJECTED_R32 !== 'undefined'){
    PROJECTED_R32.splice(0, PROJECTED_R32.length,
      {num:73,a:'Afrique du Sud',b:'Canada',status:'Confirmé',date:'28/06',time:'21h00'},
      {num:74,a:'Allemagne',b:'Paraguay',status:'Confirmé',date:'29/06',time:'18h00'},
      {num:75,a:'Pays-Bas',b:'Maroc',status:'Confirmé',date:'29/06',time:'21h00'},
      {num:76,a:'Brésil',b:'Japon',status:'Confirmé',date:'30/06',time:'18h00'},
      {num:77,a:'France',b:'Suède',status:'Confirmé',date:'30/06',time:'21h00'},
      {num:78,a:'Côte d’Ivoire',b:'Norvège',status:'Confirmé',date:'01/07',time:'18h00'},
      {num:79,a:'Mexique',b:'Équateur',status:'Confirmé',date:'01/07',time:'21h00'},
      {num:80,a:'Angleterre',b:'RD Congo',status:'Confirmé',date:'02/07',time:'18h00'},
      {num:81,a:'États-Unis',b:'Bosnie',status:'Confirmé',date:'02/07',time:'21h00'},
      {num:82,a:'Belgique',b:'Sénégal',status:'Confirmé',date:'03/07',time:'18h00',senegal:true},
      {num:84,a:'Espagne',b:'Autriche',status:'Confirmé',date:'03/07',time:'21h00'},
      {num:83,a:'Portugal',b:'Croatie',status:'Confirmé',date:'04/07',time:'18h00'},
      {num:85,a:'Suisse',b:'Algérie',status:'Confirmé',date:'04/07',time:'21h00'},
      {num:88,a:'Australie',b:'Égypte',status:'Confirmé',date:'05/07',time:'18h00'},
      {num:86,a:'Argentine',b:'Cap Vert',status:'Confirmé',date:'05/07',time:'21h00'},
      {num:87,a:'Colombie',b:'Ghana',status:'Confirmé',date:'06/07',time:'18h00'}
    );
  }
  if(typeof state !== 'undefined') state.dataLabel = 'MAJ 28 juin • 72 matchs terminés • Tableau complet';
  try{ if(typeof save === 'function') save(); }catch(e){}
}

function wcFirst(label){ return String(label || '').split(' / ')[0]; }
function wcShort(name){
  var map = {'Afrique du Sud':'Afrique S.','Corée du Sud':'Corée S.','Côte d’Ivoire':'Côte Iv.','États-Unis':'USA','Bosnie':'Bosnie','Bosnie-Herzégovine':'Bosnie','RD Congo':'RD Congo','Cap Vert':'Cap-Vert'};
  if(map[name]) return map[name];
  return name && name.length > 11 ? name.slice(0,10) + '.' : name;
}
function wcTeam(label){ var team = wcFirst(label); return {name:wcShort(team), flag:flag(team)}; }
function wcMatchSvg(match,x,y,side){
  var a=wcTeam(match.a), b=wcTeam(match.b);
  var anchor=side==='right'?'end':'start';
  var tx=side==='right'?x+142:x+12;
  var cls=match.senegal?' senegal':'';
  var meta = match.date ? ('M'+match.num+' • '+match.date) : ('M'+match.num);
  var time = match.time || '';
  return '<g class="match'+cls+'"><rect x="'+x+'" y="'+y+'" width="152" height="62" rx="11"/><text class="mnum" x="'+tx+'" y="'+(y+16)+'" text-anchor="'+anchor+'">'+meta+'</text><text class="mtime" x="'+tx+'" y="'+(y+30)+'" text-anchor="'+anchor+'">'+time+'</text><text class="team" x="'+tx+'" y="'+(y+46)+'" text-anchor="'+anchor+'">'+a.flag+' '+a.name+'</text><text class="team" x="'+tx+'" y="'+(y+60)+'" text-anchor="'+anchor+'">'+b.flag+' '+b.name+'</text></g>';
}
function wcSlot(x,y,label){ return '<g class="slot"><rect x="'+x+'" y="'+y+'" width="52" height="40" rx="10"/><text x="'+(x+26)+'" y="'+(y+25)+'" text-anchor="middle">'+label+'</text></g>'; }
function wcLine(x1,y1,x2,y2){ return '<line class="line" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"/>'; }
function renderProjectedBracket(){
  var left=PROJECTED_R32.slice(0,8), right=PROJECTED_R32.slice(8), y=[88,166,244,322,400,478,556,634];
  var style='<style>.bg{fill:#06101d;stroke:#d9b45a;stroke-width:2}.title{fill:#ffe8a3;font-size:25px;font-weight:900}.sub{fill:#fff0d0;font-size:14px;font-weight:900}.match rect{fill:#071a33;stroke:#d9b45a;stroke-width:2}.match.senegal rect{stroke:#22c55e;stroke-width:3}.mnum{fill:#ffe8a3;font-size:11px;font-weight:900}.mtime{fill:#fff0d0;font-size:10px;font-weight:800}.team{fill:white;font-size:12px;font-weight:800}.slot rect{fill:#111827;stroke:#687386;stroke-width:2}.slot text{fill:#ffe8a3;font-size:13px;font-weight:900}.line{stroke:#d9b45a;stroke-width:2}.cup{font-size:54px}.finalBox{fill:#d9b45a}.finalText{fill:#170303;font-size:15px;font-weight:900}</style>';
  var svg='<svg style="display:block;width:100%;height:auto;border-radius:18px;background:#06101d" viewBox="0 0 700 735" aria-label="Tableau complet Coupe du Monde 2026">'+style+'<rect class="bg" x="0" y="0" width="700" height="735" rx="18"/><text class="title" x="350" y="35" text-anchor="middle">COUPE DU MONDE 2026</text><text class="sub" x="350" y="62" text-anchor="middle">16ES - TABLEAU COMPLET</text>';
  for(var i=0;i<8;i++){ svg+=wcMatchSvg(left[i],16,y[i],'left')+wcMatchSvg(right[i],532,y[i],'right'); }
  var ly=[108,264,420,576], qy=[186,498];
  for(var j=0;j<4;j++){ svg+=wcSlot(198,ly[j],'8E')+wcSlot(454,ly[j],'8E')+wcLine(168,ly[j]+20,198,ly[j]+20)+wcLine(506,ly[j]+20,532,ly[j]+20); }
  for(var k=0;k<2;k++){ svg+=wcSlot(268,qy[k],'1/4')+wcSlot(384,qy[k],'1/4')+wcLine(250,qy[k]+20,268,qy[k]+20)+wcLine(436,qy[k]+20,454,qy[k]+20); }
  svg+=wcSlot(298,332,'1/2')+wcSlot(354,332,'1/2')+'<text class="cup" x="350" y="430" text-anchor="middle">🏆</text><rect class="finalBox" x="308" y="448" width="84" height="34" rx="12"/><text class="finalText" x="350" y="471" text-anchor="middle">FINALE</text></svg>';
  setTimeout(initWcTableSize,0);
  return '<article class="card wide-card"><h2 class="section-title">Tableau Coupe du Monde</h2><p class="subtitle">MAJ 28 juin : phase finale complète. Taille réglable sans toucher aux groupes.</p><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:12px 0"><button class="btn primary" type="button" data-wc-small>Petit</button><button class="btn primary" type="button" data-wc-normal>Normal</button><button class="btn primary" type="button" data-wc-big>Grand</button></div><div data-wc-holder style="width:88%;margin:12px auto;transition:.18s">'+svg+'</div><h3 class="mini-title">Sénégal</h3><div class="watch-list"><span>Sénégal qualifié</span><span>Belgique vs Sénégal</span><span>03/07 • 18h00</span></div><h3 class="mini-title">Dates clés</h3><div class="watch-list"><span>16es : 28 juin - 6 juillet</span><span>8es : 6 - 10 juillet</span><span>Finale : 19 juillet</span></div></article>';
}
function initWcTableSize(){
  var root=document.getElementById('knockoutView'); if(!root) return;
  var holder=root.querySelector('[data-wc-holder]'); if(!holder) return;
  function setSize(w){ holder.style.width=w; localStorage.setItem('wcTableWidth',w); }
  setSize(localStorage.getItem('wcTableWidth') || '88%');
  var small=root.querySelector('[data-wc-small]'), normal=root.querySelector('[data-wc-normal]'), big=root.querySelector('[data-wc-big]');
  if(small) small.onclick=function(){setSize('72%')};
  if(normal) normal.onclick=function(){setSize('88%')};
  if(big) big.onclick=function(){setSize('100%')};
}
setTimeout(function(){
  applyJune28Update();
  if(typeof render === 'function') render();
  if(typeof updateDashboard === 'function') updateDashboard();
},120);