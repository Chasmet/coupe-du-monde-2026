function applyKnockoutUpdate(){
  if(typeof state !== 'undefined') state.dataLabel = 'MAJ 4 juillet • 16es terminés • 8es complets';
  try{ if(typeof save === 'function') save(); }catch(e){}
}

const R16_RESULTS = [
  {date:'28/06', match:'Afrique du Sud - Canada', score:'0-1', winner:'Canada'},
  {date:'29/06', match:'Brésil - Japon', score:'2-1', winner:'Brésil'},
  {date:'29/06', match:'Allemagne - Paraguay', score:'1-1, 3-4 tab', winner:'Paraguay'},
  {date:'30/06', match:'Pays-Bas - Maroc', score:'1-1, 2-3 tab', winner:'Maroc'},
  {date:'30/06', match:'Côte d’Ivoire - Norvège', score:'1-2', winner:'Norvège'},
  {date:'30/06', match:'France - Suède', score:'3-0', winner:'France'},
  {date:'01/07', match:'Mexique - Équateur', score:'2-0', winner:'Mexique'},
  {date:'01/07', match:'Angleterre - RD Congo', score:'2-1', winner:'Angleterre'},
  {date:'01/07', match:'Belgique - Sénégal', score:'3-2 ap', winner:'Belgique', senegal:true},
  {date:'02/07', match:'États-Unis - Bosnie', score:'2-0', winner:'États-Unis'},
  {date:'02/07', match:'Espagne - Autriche', score:'3-0', winner:'Espagne'},
  {date:'03/07', match:'Portugal - Croatie', score:'2-1', winner:'Portugal'},
  {date:'03/07', match:'Suisse - Algérie', score:'2-0', winner:'Suisse'},
  {date:'03/07', match:'Australie - Égypte', score:'1-1, 2-4 tab', winner:'Égypte'},
  {date:'04/07', match:'Argentine - Cap-Vert', score:'3-2', winner:'Argentine'},
  {date:'04/07', match:'Colombie - Ghana', score:'1-0', winner:'Colombie'}
];

const R8_MATCHES = [
  {date:'04/07', time:'19h00', a:'Canada', b:'Maroc', block:'Bloc 1'},
  {date:'04/07', time:'23h00', a:'Paraguay', b:'France', block:'Bloc 1'},
  {date:'05/07', time:'22h00', a:'Brésil', b:'Norvège', block:'Bloc 2'},
  {date:'06/07', time:'02h00', a:'Mexique', b:'Angleterre', block:'Bloc 2'},
  {date:'06/07', time:'21h00', a:'Portugal', b:'Espagne', block:'Bloc 3'},
  {date:'07/07', time:'02h00', a:'États-Unis', b:'Belgique', block:'Bloc 3'},
  {date:'07/07', time:'18h00', a:'Argentine', b:'Égypte', block:'Bloc 4'},
  {date:'07/07', time:'22h00', a:'Suisse', b:'Colombie', block:'Bloc 4'}
];

function firstTeam(label){ return String(label || '').split(' - ')[0]; }
function teamFlag(name){ return typeof flag === 'function' ? flag(name) : ''; }
function teamLabel(name){ return '<span class="ko-team"><span class="flag">' + teamFlag(name) + '</span><span>' + name + '</span></span>'; }

function renderR8Card(match, index){
  return '<article class="ko-r8-card"><div class="ko-match-head"><span>8e ' + (index + 1) + '</span><b>' + match.date + ' • ' + match.time + '</b></div><div class="ko-versus"><div>' + teamLabel(match.a) + '</div><strong>VS</strong><div>' + teamLabel(match.b) + '</div></div><small>' + match.block + '</small></article>';
}

function renderR16Result(row){
  var cls = row.senegal ? ' ko-result senegal-out' : ' ko-result';
  return '<div class="' + cls + '"><span>' + row.date + '</span><strong>' + row.match + '</strong><b>' + row.score + '</b><em>' + row.winner + '</em></div>';
}

function renderBracketBlocks(){
  var blocks = [
    ['Bloc 1','Canada - Maroc','Paraguay - France'],
    ['Bloc 2','Brésil - Norvège','Mexique - Angleterre'],
    ['Bloc 3','Portugal - Espagne','États-Unis - Belgique'],
    ['Bloc 4','Argentine - Égypte','Suisse - Colombie']
  ];
  return blocks.map(function(b){
    return '<div class="ko-block"><h4>' + b[0] + '</h4><p>' + b[1] + '</p><p>' + b[2] + '</p><small>Les vainqueurs se retrouvent en quart.</small></div>';
  }).join('');
}

function renderProjectedBracket(){
  var r8 = R8_MATCHES.map(renderR8Card).join('');
  var r16 = R16_RESULTS.map(renderR16Result).join('');
  return '<article class="card wide-card ko-card"><h2 class="section-title">Phase finale</h2><p class="subtitle">MAJ : 16es terminés. Tableau des 8es complet.</p>' +
    '<div class="ko-hero"><div class="ko-cup">🏆</div><div><strong>8es de finale complets</strong><span>Dernier résultat : Colombie 1-0 Ghana</span></div></div>' +
    '<div class="ko-alert"><strong>Sénégal éliminé</strong><span>Belgique 3-2 Sénégal après prolongation. Parcours courageux, fin cruelle en 16es.</span></div>' +
    '<h3 class="mini-title">8es de finale</h3><div class="ko-r8-grid">' + r8 + '</div>' +
    '<h3 class="mini-title">Arbre des quarts</h3><div class="ko-blocks">' + renderBracketBlocks() + '</div>' +
    '<details class="ko-details"><summary>Résultats complets des 16es</summary><div class="ko-results">' + r16 + '</div></details>' +
    '<h3 class="mini-title">Affiches à suivre</h3><div class="watch-list"><span>Paraguay - France</span><span>Canada - Maroc</span><span>Portugal - Espagne</span><span>États-Unis - Belgique</span></div>' +
  '</article>';
}

setTimeout(function(){
  applyKnockoutUpdate();
  if(typeof render === 'function') render();
  if(typeof updateDashboard === 'function') updateDashboard();
},120);