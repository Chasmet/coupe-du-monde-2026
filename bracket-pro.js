function wcStatus(status){
  var value = String(status || '').toLowerCase();
  if(value.indexOf('confirm') !== -1) return 'OK';
  if(value.indexOf('attente') !== -1) return '?';
  return 'P';
}

function wcFirst(label){
  return String(label || '').split(' / ')[0];
}

function wcShort(name){
  var map = {
    'Afrique du Sud':'Afrique S.',
    'Corée du Sud':'Corée S.',
    'Côte d’Ivoire':'Côte Iv.',
    'États-Unis':'USA',
    'Bosnie':'Bosnie',
    'Bosnie-Herzégovine':'Bosnie',
    'Cap Vert':'Cap-Vert',
    'Autriche':'Autriche',
    'Angleterre':'Angleterre'
  };
  if(map[name]) return map[name];
  return name && name.length > 11 ? name.slice(0,10) + '.' : name;
}

function wcTeam(label){
  var team = wcFirst(label);
  return { name: wcShort(team), flag: flag(team) };
}

function wcMatchSvg(match, x, y, side){
  var a = wcTeam(match.a);
  var b = wcTeam(match.b);
  var anchor = side === 'right' ? 'end' : 'start';
  var tx = side === 'right' ? x + 140 : x + 14;
  var cls = match.senegal ? ' senegal' : '';
  return '<g class="wcsvg-match' + cls + '">' +
    '<rect x="' + x + '" y="' + y + '" width="150" height="58" rx="11" />' +
    '<text class="mnum" x="' + tx + '" y="' + (y+18) + '" text-anchor="' + anchor + '">M' + match.num + ' ' + wcStatus(match.status) + '</text>' +
    '<text class="team" x="' + tx + '" y="' + (y+38) + '" text-anchor="' + anchor + '">' + a.flag + ' ' + a.name + '</text>' +
    '<text class="team" x="' + tx + '" y="' + (y+54) + '" text-anchor="' + anchor + '">' + b.flag + ' ' + b.name + '</text>' +
  '</g>';
}

function wcSlot(x, y, label){
  return '<g class="wcsvg-slot"><rect x="' + x + '" y="' + y + '" width="48" height="38" rx="10"/><text x="' + (x+24) + '" y="' + (y+25) + '" text-anchor="middle">' + label + '</text></g>';
}

function wcLine(x1,y1,x2,y2){
  return '<line class="wcsvg-line" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" />';
}

function renderProjectedBracket(){
  var left = PROJECTED_R32.slice(0,8);
  var right = PROJECTED_R32.slice(8);
  var y = [88,166,244,322,400,478,556,634];
  var svg = '<svg class="wc-bracket-svg" viewBox="0 0 700 735" aria-label="Tableau provisoire Coupe du Monde 2026">' +
    '<rect class="wcsvg-bg" x="0" y="0" width="700" height="735" rx="18"/>' +
    '<text class="wcsvg-title" x="350" y="35" text-anchor="middle">COUPE DU MONDE 2026</text>' +
    '<text class="wcsvg-sub" x="350" y="62" text-anchor="middle">16ES - TABLEAU PROVISOIRE</text>';
  for(var i=0;i<8;i++){
    svg += wcMatchSvg(left[i], 18, y[i], 'left');
    svg += wcMatchSvg(right[i], 532, y[i], 'right');
  }
  var ly = [108,264,420,576];
  var qy = [186,498];
  for(var j=0;j<4;j++){
    svg += wcSlot(198, ly[j], '8E') + wcSlot(454, ly[j], '8E');
    svg += wcLine(168, ly[j]+19, 198, ly[j]+19) + wcLine(502, ly[j]+19, 532, ly[j]+19);
  }
  for(var k=0;k<2;k++){
    svg += wcSlot(268, qy[k], '1/4') + wcSlot(384, qy[k], '1/4');
    svg += wcLine(246, qy[k]+19, 268, qy[k]+19) + wcLine(432, qy[k]+19, 454, qy[k]+19);
  }
  svg += wcSlot(298, 332, '1/2') + wcSlot(354, 332, '1/2');
  svg += '<g class="wcsvg-cup"><text x="350" y="430" text-anchor="middle">🏆</text><rect x="312" y="448" width="76" height="34" rx="12"/><text class="final" x="350" y="471" text-anchor="middle">FINALE</text></g>';
  svg += '</svg>';
  var watch = WATCH_MATCHES.map(function(item){ return '<span>' + item + '</span>'; }).join('');
  setTimeout(initWcTableSize, 0);
  return '<article class="card wide-card wc-table-card"><h2 class="section-title">Tableau Coupe du Monde</h2><p class="subtitle">Tableau compact adapté mobile. Taille réglable sans supprimer les groupes.</p><div class="wc-size-panel"><button type="button" data-wc-small>Petit</button><button type="button" data-wc-normal>Normal</button><button type="button" data-wc-big>Grand</button></div><div class="wc-svg-holder wc-normal">' + svg + '</div><h3 class="mini-title">Sénégal</h3><div class="watch-list"><span>Sénégal qualifié probable</span><span>Angleterre vs Sénégal</span><span>Match 80</span></div><h3 class="mini-title">Matchs à surveiller</h3><div class="watch-list">' + watch + '</div></article>';
}

function initWcTableSize(){
  var root = document.getElementById('knockoutView');
  if(!root) return;
  var holder = root.querySelector('.wc-svg-holder');
  if(!holder) return;
  var saved = localStorage.getItem('wcTableSize') || 'wc-normal';
  holder.className = 'wc-svg-holder ' + saved;
  function setSize(cls){
    holder.className = 'wc-svg-holder ' + cls;
    localStorage.setItem('wcTableSize', cls);
  }
  var small = root.querySelector('[data-wc-small]');
  var normal = root.querySelector('[data-wc-normal]');
  var big = root.querySelector('[data-wc-big]');
  if(small) small.onclick = function(){ setSize('wc-small'); };
  if(normal) normal.onclick = function(){ setSize('wc-normal'); };
  if(big) big.onclick = function(){ setSize('wc-big'); };
}

setTimeout(function(){ if(typeof renderKnockout === 'function') renderKnockout(); }, 80);