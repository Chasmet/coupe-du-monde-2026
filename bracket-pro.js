function wcStatus(status){
  var value = String(status || '').toLowerCase();
  if(value.indexOf('confirm') !== -1) return 'OK';
  if(value.indexOf('attente') !== -1) return '?';
  return 'P';
}
function wcFirst(label){ return String(label || '').split(' / ')[0]; }
function wcShort(name){
  var map = {'Afrique du Sud':'Afrique S.','Corée du Sud':'Corée S.','Côte d’Ivoire':'Côte Iv.','États-Unis':'USA','Bosnie':'Bosnie','Bosnie-Herzégovine':'Bosnie','Cap Vert':'Cap-Vert'};
  if(map[name]) return map[name];
  return name && name.length > 11 ? name.slice(0,10) + '.' : name;
}
function wcTeam(label){ var team = wcFirst(label); return {name:wcShort(team), flag:flag(team)}; }
function wcMatchSvg(match,x,y,side){
  var a=wcTeam(match.a), b=wcTeam(match.b);
  var anchor=side==='right'?'end':'start';
  var tx=side==='right'?x+140:x+14;
  var cls=match.senegal?' senegal':'';
  return '<g class="match'+cls+'"><rect x="'+x+'" y="'+y+'" width="150" height="58" rx="11"/><text class="mnum" x="'+tx+'" y="'+(y+18)+'" text-anchor="'+anchor+'">M'+match.num+' '+wcStatus(match.status)+'</text><text class="team" x="'+tx+'" y="'+(y+38)+'" text-anchor="'+anchor+'">'+a.flag+' '+a.name+'</text><text class="team" x="'+tx+'" y="'+(y+54)+'" text-anchor="'+anchor+'">'+b.flag+' '+b.name+'</text></g>';
}
function wcSlot(x,y,label){ return '<g class="slot"><rect x="'+x+'" y="'+y+'" width="48" height="38" rx="10"/><text x="'+(x+24)+'" y="'+(y+25)+'" text-anchor="middle">'+label+'</text></g>'; }
function wcLine(x1,y1,x2,y2){ return '<line class="line" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"/>'; }
function renderProjectedBracket(){
  var left=PROJECTED_R32.slice(0,8), right=PROJECTED_R32.slice(8), y=[88,166,244,322,400,478,556,634];
  var style='<style>.bg{fill:#06101d;stroke:#d9b45a;stroke-width:2}.title{fill:#ffe8a3;font-size:26px;font-weight:900}.sub{fill:#fff0d0;font-size:15px;font-weight:900}.match rect{fill:#071a33;stroke:#d9b45a;stroke-width:2}.match.senegal rect{stroke:#22c55e;stroke-width:3}.mnum{fill:#ffe8a3;font-size:13px;font-weight:900}.team{fill:white;font-size:13px;font-weight:800}.slot rect{fill:#111827;stroke:#687386;stroke-width:2}.slot text{fill:#ffe8a3;font-size:14px;font-weight:900}.line{stroke:#d9b45a;stroke-width:2}.cup{font-size:54px}.finalBox{fill:#d9b45a}.finalText{fill:#170303;font-size:16px;font-weight:900}</style>';
  var svg='<svg style="display:block;width:100%;height:auto;border-radius:18px;background:#06101d" viewBox="0 0 700 735" aria-label="Tableau provisoire Coupe du Monde 2026">'+style+'<rect class="bg" x="0" y="0" width="700" height="735" rx="18"/><text class="title" x="350" y="35" text-anchor="middle">COUPE DU MONDE 2026</text><text class="sub" x="350" y="62" text-anchor="middle">16ES - TABLEAU PROVISOIRE</text>';
  for(var i=0;i<8;i++){ svg+=wcMatchSvg(left[i],18,y[i],'left')+wcMatchSvg(right[i],532,y[i],'right'); }
  var ly=[108,264,420,576], qy=[186,498];
  for(var j=0;j<4;j++){ svg+=wcSlot(198,ly[j],'8E')+wcSlot(454,ly[j],'8E')+wcLine(168,ly[j]+19,198,ly[j]+19)+wcLine(502,ly[j]+19,532,ly[j]+19); }
  for(var k=0;k<2;k++){ svg+=wcSlot(268,qy[k],'1/4')+wcSlot(384,qy[k],'1/4')+wcLine(246,qy[k]+19,268,qy[k]+19)+wcLine(432,qy[k]+19,454,qy[k]+19); }
  svg+=wcSlot(298,332,'1/2')+wcSlot(354,332,'1/2')+'<text class="cup" x="350" y="430" text-anchor="middle">🏆</text><rect class="finalBox" x="312" y="448" width="76" height="34" rx="12"/><text class="finalText" x="350" y="471" text-anchor="middle">FINALE</text></svg>';
  var watch=WATCH_MATCHES.map(function(item){return '<span>'+item+'</span>';}).join('');
  setTimeout(initWcTableSize,0);
  return '<article class="card wide-card"><h2 class="section-title">Tableau Coupe du Monde</h2><p class="subtitle">Tableau compact adapté mobile. La taille est réglable sans toucher aux groupes.</p><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:12px 0"><button class="btn primary" type="button" data-wc-small>Petit</button><button class="btn primary" type="button" data-wc-normal>Normal</button><button class="btn primary" type="button" data-wc-big>Grand</button></div><div data-wc-holder style="width:88%;margin:12px auto;transition:.18s">'+svg+'</div><h3 class="mini-title">Sénégal</h3><div class="watch-list"><span>Sénégal qualifié probable</span><span>Angleterre vs Sénégal</span><span>Match 80</span></div><h3 class="mini-title">Matchs à surveiller</h3><div class="watch-list">'+watch+'</div></article>';
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
setTimeout(function(){ if(typeof renderKnockout==='function') renderKnockout(); },80);