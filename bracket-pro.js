function shortStatus(s){
  if(!s) return 'PROJ';
  if(s.indexOf('Confirm') !== -1) return 'OK';
  if(s.indexOf('attente') !== -1 || s.indexOf('Attente') !== -1) return '?';
  return 'PROJ';
}

function firstName(label){ return label.split(' / ')[0]; }
function shortName(name){ return name.length > 13 ? name.slice(0,12) + '.' : name; }
function teamLine(label){
  var n = firstName(label);
  return '<div class="wc-team"><span class="flag">' + flag(n) + '</span><span>' + shortName(n) + '</span></div>';
}
function matchBox(m){
  var cls = m.senegal ? ' wc-match senegal' : ' wc-match';
  return '<div class="' + cls + '"><div class="wc-match-head"><span>M' + m.num + '</span><b>' + shortStatus(m.status) + '</b></div>' + teamLine(m.a) + teamLine(m.b) + '</div>';
}
function slot(label){ return '<div class="wc-slot">' + label + '</div>'; }

function renderProjectedBracket(){
  var left = PROJECTED_R32.slice(0,8).map(matchBox).join('');
  var right = PROJECTED_R32.slice(8).map(matchBox).join('');
  var watch = WATCH_MATCHES.map(function(x){ return '<span>' + x + '</span>'; }).join('');
  return '<article class="card wide-card wc-bracket-card">' +
    '<h2 class="section-title">Tableau Coupe du Monde</h2>' +
    '<p class="subtitle">Tableau visuel provisoire avec coupe au centre. Les groupes J, K et L peuvent encore changer certaines affiches.</p>' +
    '<div class="wc-poster">' +
      '<div class="wc-title">COUPE DU MONDE 2026</div>' +
      '<div class="wc-subtitle">16ES DE FINALE - TABLEAU PROVISOIRE</div>' +
      '<div class="wc-grid">' +
        '<div class="wc-r32 left">' + left + '</div>' +
        '<div class="wc-next">' + slot('8E') + slot('8E') + slot('8E') + slot('8E') + '</div>' +
        '<div class="wc-next small">' + slot('1/4') + slot('1/4') + '</div>' +
        '<div class="wc-center"><div class="wc-cup">🏆</div><div class="wc-final">FINALE</div></div>' +
        '<div class="wc-next small">' + slot('1/4') + slot('1/4') + '</div>' +
        '<div class="wc-next">' + slot('8E') + slot('8E') + slot('8E') + slot('8E') + '</div>' +
        '<div class="wc-r32 right">' + right + '</div>' +
      '</div>' +
    '</div>' +
    '<h3 class="mini-title">Sénégal</h3><div class="watch-list"><span>Sénégal qualifié probable</span><span>Angleterre vs Sénégal</span><span>Match 80</span></div>' +
    '<h3 class="mini-title">Matchs qui peuvent changer le tableau</h3><div class="watch-list">' + watch + '</div>' +
  '</article>';
}
