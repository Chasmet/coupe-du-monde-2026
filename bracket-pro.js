function applyKnockoutUpdate(){
  if(typeof state !== 'undefined') state.dataLabel = 'MAJ 4 juillet • 16es terminés • 8es complets';
  try{ if(typeof save === 'function') save(); }catch(e){}
}

const R16_RESULTS = [
  {date:'28/06', a:'Afrique du Sud', b:'Canada', score:'0-1', winner:'Canada'},
  {date:'29/06', a:'Brésil', b:'Japon', score:'2-1', winner:'Brésil'},
  {date:'29/06', a:'Allemagne', b:'Paraguay', score:'1-1, 3-4 tab', winner:'Paraguay'},
  {date:'30/06', a:'Pays-Bas', b:'Maroc', score:'1-1, 2-3 tab', winner:'Maroc'},
  {date:'30/06', a:'Côte d’Ivoire', b:'Norvège', score:'1-2', winner:'Norvège'},
  {date:'30/06', a:'France', b:'Suède', score:'3-0', winner:'France'},
  {date:'01/07', a:'Mexique', b:'Équateur', score:'2-0', winner:'Mexique'},
  {date:'01/07', a:'Angleterre', b:'RD Congo', score:'2-1', winner:'Angleterre'},
  {date:'01/07', a:'Belgique', b:'Sénégal', score:'3-2 ap', winner:'Belgique', senegal:true},
  {date:'02/07', a:'États-Unis', b:'Bosnie', score:'2-0', winner:'États-Unis'},
  {date:'02/07', a:'Espagne', b:'Autriche', score:'3-0', winner:'Espagne'},
  {date:'03/07', a:'Portugal', b:'Croatie', score:'2-1', winner:'Portugal'},
  {date:'03/07', a:'Suisse', b:'Algérie', score:'2-0', winner:'Suisse'},
  {date:'03/07', a:'Australie', b:'Égypte', score:'1-1, 2-4 tab', winner:'Égypte'},
  {date:'04/07', a:'Argentine', b:'Cap-Vert', score:'3-2', winner:'Argentine'},
  {date:'04/07', a:'Colombie', b:'Ghana', score:'1-0', winner:'Colombie'}
];

const R8_MATCHES = [
  {date:'04/07', time:'19h00', a:'Canada', b:'Maroc'},
  {date:'04/07', time:'23h00', a:'Paraguay', b:'France'},
  {date:'05/07', time:'22h00', a:'Brésil', b:'Norvège'},
  {date:'06/07', time:'02h00', a:'Mexique', b:'Angleterre'},
  {date:'06/07', time:'21h00', a:'Portugal', b:'Espagne'},
  {date:'07/07', time:'02h00', a:'États-Unis', b:'Belgique'},
  {date:'07/07', time:'18h00', a:'Argentine', b:'Égypte'},
  {date:'07/07', time:'22h00', a:'Suisse', b:'Colombie'}
];

function koFlag(name){ return typeof flag === 'function' ? flag(name) : ''; }
function koShort(name){
  const map = {'Afrique du Sud':'Afrique S.','Côte d’Ivoire':'Côte Iv.','États-Unis':'USA','RD Congo':'RD Congo','Cap-Vert':'Cap-Vert'};
  return map[name] || name;
}
function koTeam(name){ return koFlag(name) + ' ' + koShort(name); }
function koPairLine(a,b){ return '<div class="tree-team"><span>' + koTeam(a) + '</span><span>' + koTeam(b) + '</span></div>'; }
function koR16Card(match, index){
  const cls = match.senegal ? 'tree-card r16 senegal-out' : 'tree-card r16';
  return '<article class="' + cls + '"><div class="tree-head"><b>' + (index+1) + '</b><em>' + match.date + '</em></div>' + koPairLine(match.a, match.b) + '<strong class="tree-score">' + match.score + '</strong><small>Qualifié : ' + koTeam(match.winner) + '</small></article>';
}
function koR8Card(match, index){
  return '<article class="tree-card r8"><div class="tree-head"><b>' + String.fromCharCode(65+index) + '</b><em>' + match.date + ' • ' + match.time + '</em></div>' + koPairLine(match.a, match.b) + '<strong class="tree-score pending">À jouer</strong></article>';
}
function koSlot(label){ return '<article class="tree-card slot"><strong>' + label + '</strong><span>À déterminer</span></article>'; }

function renderTree(){
  const r16Left = R16_RESULTS.slice(0,8).map(koR16Card).join('');
  const r16Right = R16_RESULTS.slice(8,16).map(koR16Card).join('');
  const r8Left = R8_MATCHES.slice(0,4).map(koR8Card).join('');
  const r8Right = R8_MATCHES.slice(4,8).map(koR8Card).join('');
  return '<div class="tree-wrap"><div class="tree-title">ARBRE PHASE FINALE</div><div class="tree-sub">16es terminés • scores visibles • 8es complets</div><div class="tree-grid">' +
    '<section><h4>16es</h4><div class="tree-list">' + r16Left + '</div></section>' +
    '<section><h4>8es</h4><div class="tree-list tree-r8">' + r8Left + '</div></section>' +
    '<section class="tree-center"><div class="tree-cup">🏆</div><div class="tree-final">Finale<br><span>19/07 • 21h00</span></div><div class="tree-next">' + koSlot('Quarts') + koSlot('Demies') + '</div></section>' +
    '<section><h4>8es</h4><div class="tree-list tree-r8">' + r8Right + '</div></section>' +
    '<section><h4>16es</h4><div class="tree-list">' + r16Right + '</div></section>' +
  '</div></div>';
}

function renderR16Result(row){
  var cls = row.senegal ? ' ko-result senegal-out' : ' ko-result';
  return '<div class="' + cls + '"><span>' + row.date + '</span><strong>' + row.a + ' - ' + row.b + '</strong><b>' + row.score + '</b><em>Qualifié : ' + row.winner + '</em></div>';
}

function renderProjectedBracket(){
  var r16 = R16_RESULTS.map(renderR16Result).join('');
  return '<article class="card wide-card ko-card"><h2 class="section-title">Phase finale</h2><p class="subtitle">MAJ : arbre restauré avec tous les résultats et scores des 16es.</p>' +
    '<div class="ko-alert"><strong>Sénégal éliminé</strong><span>Belgique 3-2 Sénégal après prolongation. Le Sénégal sort en 16es.</span></div>' +
    renderTree() +
    '<details class="ko-details" open><summary>Résultats complets des 16es</summary><div class="ko-results">' + r16 + '</div></details>' +
    '<h3 class="mini-title">8es de finale</h3><div class="watch-list"><span>Canada - Maroc</span><span>Paraguay - France</span><span>Brésil - Norvège</span><span>Mexique - Angleterre</span><span>Portugal - Espagne</span><span>USA - Belgique</span><span>Argentine - Égypte</span><span>Suisse - Colombie</span></div>' +
  '</article>';
}

setTimeout(function(){
  applyKnockoutUpdate();
  if(typeof render === 'function') render();
  if(typeof updateDashboard === 'function') updateDashboard();
},120);