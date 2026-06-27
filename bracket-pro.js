function phaseStatus(status){
  if(!status) return 'Projection';
  if(status.indexOf('Confirm') !== -1) return 'Confirme';
  if(status.indexOf('attente') !== -1 || status.indexOf('Attente') !== -1) return 'A confirmer';
  return 'Projection';
}

function phaseTeam(label){
  return label.split(' / ').map(function(name){
    return '<span class="phase-team"><span class="flag">' + flag(name) + '</span><span>' + name + '</span></span>';
  }).join('<span class="phase-or"> ou </span>');
}

function renderProjectedBracket(){
  var cards = PROJECTED_R32.map(function(m){
    var css = m.senegal ? ' phase-card senegal-item' : ' phase-card';
    var note = m.senegal ? '<div class="phase-note">Senegal qualifie probable - adversaire probable : Angleterre</div>' : '';
    return '<div class="' + css + '">' +
      '<div class="phase-card-head"><span>Match ' + m.num + '</span><strong>' + phaseStatus(m.status) + '</strong></div>' +
      '<div class="phase-versus"><div>' + phaseTeam(m.a) + '</div><b>VS</b><div>' + phaseTeam(m.b) + '</div></div>' + note +
      '</div>';
  }).join('');
  var watch = WATCH_MATCHES.map(function(x){ return '<span>' + x + '</span>'; }).join('');
  return '<article class="card wide-card phase-card-wrap">' +
    '<h2 class="section-title">Phase finale provisoire</h2>' +
    '<p class="subtitle">Vue mobile propre : une carte par match, sans zoom et sans tableau casse.</p>' +
    '<div class="phase-hero"><div class="phase-cup">🏆</div><div><strong>16es de finale</strong><span>Tableau provisoire actuel</span></div></div>' +
    '<div class="phase-list">' + cards + '</div>' +
    '<h3 class="mini-title">Matchs qui peuvent changer le tableau</h3>' +
    '<div class="watch-list">' + watch + '</div>' +
    '<button class="btn primary" style="width:100%;margin-top:14px" id="generateBtn" disabled>Tableau complet apres les 72 matchs</button>' +
    '</article>';
}
