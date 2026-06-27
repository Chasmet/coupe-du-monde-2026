function bracketStatus(status){
  if(!status) return 'PROJ';
  var value = String(status).toLowerCase();
  if(value.indexOf('confirm') !== -1) return 'OK';
  if(value.indexOf('attente') !== -1) return '?';
  return 'PROJ';
}

function bracketFirstTeam(label){
  return String(label || '').split(' / ')[0];
}

function bracketShortName(name){
  if(!name) return '';
  return name.length > 18 ? name.slice(0, 17) + '.' : name;
}

function bracketTeamLine(label){
  var team = bracketFirstTeam(label);
  return '<div class="wc-team"><span class="flag">' + flag(team) + '</span><span class="wc-team-name">' + bracketShortName(team) + '</span></div>';
}

function bracketMatchBox(match){
  var cls = match.senegal ? 'wc-match senegal' : 'wc-match';
  return '<div class="' + cls + '">' +
    '<div class="wc-match-head"><span class="wc-match-num">M' + match.num + '</span><b class="wc-badge">' + bracketStatus(match.status) + '</b></div>' +
    bracketTeamLine(match.a) + bracketTeamLine(match.b) +
  '</div>';
}

function bracketSlot(label){
  return '<div class="wc-slot"><span>' + label + '</span></div>';
}

function renderProjectedBracket(){
  var left = PROJECTED_R32.slice(0, 8).map(bracketMatchBox).join('');
  var right = PROJECTED_R32.slice(8).map(bracketMatchBox).join('');
  var watch = WATCH_MATCHES.map(function(item){ return '<span>' + item + '</span>'; }).join('');

  return '<article class="card wide-card wc-bracket-card">' +
    '<h2 class="section-title">Tableau Coupe du Monde</h2>' +
    '<p class="subtitle">Tableau visuel provisoire. Glisse horizontalement pour voir toute la phase finale.</p>' +
    '<div class="wc-poster">' +
      '<div class="wc-title">COUPE DU MONDE 2026</div>' +
      '<div class="wc-subtitle">16ES DE FINALE - TABLEAU PROVISOIRE</div>' +
      '<div class="wc-scroll-hint">⬅️ glisse pour voir le tableau complet ➡️</div>' +
      '<div class="wc-board-scroll">' +
        '<div class="wc-board">' +
          '<div class="wc-r32 left">' + left + '</div>' +
          '<div class="wc-next"><div class="wc-col-label">8ES</div>' + bracketSlot('8E') + bracketSlot('8E') + bracketSlot('8E') + bracketSlot('8E') + '</div>' +
          '<div class="wc-next small"><div class="wc-col-label">QUARTS</div>' + bracketSlot('1/4') + bracketSlot('1/4') + '</div>' +
          '<div class="wc-next tiny"><div class="wc-col-label">DEMIE</div>' + bracketSlot('1/2') + '</div>' +
          '<div class="wc-center"><img class="wc-cup-real" src="trophy.svg?v=15" alt="Coupe du monde"><div class="wc-final">FINALE</div></div>' +
          '<div class="wc-next tiny"><div class="wc-col-label">DEMIE</div>' + bracketSlot('1/2') + '</div>' +
          '<div class="wc-next small"><div class="wc-col-label">QUARTS</div>' + bracketSlot('1/4') + bracketSlot('1/4') + '</div>' +
          '<div class="wc-next"><div class="wc-col-label">8ES</div>' + bracketSlot('8E') + bracketSlot('8E') + bracketSlot('8E') + bracketSlot('8E') + '</div>' +
          '<div class="wc-r32 right">' + right + '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<h3 class="mini-title">Sénégal</h3><div class="watch-list"><span>Sénégal qualifié probable</span><span>Angleterre vs Sénégal</span><span>Match 80</span></div>' +
    '<h3 class="mini-title">Matchs à surveiller</h3><div class="watch-list">' + watch + '</div>' +
  '</article>';
}
