function bracketStatus(status){
  var value = String(status || '').toLowerCase();
  if(value.indexOf('confirm') !== -1) return 'Confirme';
  if(value.indexOf('attente') !== -1) return 'A confirmer';
  return 'Projection';
}

function bracketFirstTeam(label){
  return String(label || '').split(' / ')[0];
}

function bracketShortName(name){
  if(!name) return '';
  return name.length > 22 ? name.slice(0, 21) + '.' : name;
}

function bracketTeamLine(label){
  var team = bracketFirstTeam(label);
  return '<div class="wc-team-row"><span class="flag">' + flag(team) + '</span><span>' + bracketShortName(team) + '</span></div>';
}

function bracketMatchBox(match){
  var cls = match.senegal ? 'wc-vmatch senegal' : 'wc-vmatch';
  var note = match.senegal ? '<div class="wc-senegal-note">Senegal qualifie probable - Angleterre adversaire probable</div>' : '';
  return '<article class="' + cls + '"><div class="wc-vmatch-top"><span>Match ' + match.num + '</span><strong>' + bracketStatus(match.status) + '</strong></div><div class="wc-vteams"><div>' + bracketTeamLine(match.a) + '</div><b>VS</b><div>' + bracketTeamLine(match.b) + '</div></div>' + note + '</article>';
}

function bracketSlot(label, count){
  var html = '';
  for(var i = 1; i <= count; i++) html += '<div class="wc-vslot"><span>' + label + ' ' + i + '</span><em>A generer</em></div>';
  return html;
}

function renderProjectedBracket(){
  var matches = PROJECTED_R32.map(bracketMatchBox).join('');
  var watch = WATCH_MATCHES.map(function(item){ return '<span>' + item + '</span>'; }).join('');
  var html = '<article class="card wide-card wc-vertical-card"><h2 class="section-title">Tableau Coupe du Monde</h2><p class="subtitle">Vue verticale mobile. Chaque tour peut etre ouvert ou reduit manuellement.</p>';
  html += '<div class="wc-vhero"><img class="wc-cup-real" src="trophy.svg?v=16" alt="Coupe"><div><strong>Phase finale provisoire</strong><span>16es, 8es, quarts, demies, finale</span></div></div>';
  html += '<div class="wc-controls"><button type="button" data-bracket-close>Tout reduire</button><button type="button" data-bracket-open>Tout afficher</button></div>';
  html += '<details class="wc-round" open><summary><span>16es de finale</span><b>16 matchs</b></summary><div class="wc-vlist">' + matches + '</div></details>';
  html += '<details class="wc-round"><summary><span>8es de finale</span><b>8 places</b></summary><div class="wc-slots">' + bracketSlot('8e',8) + '</div></details>';
  html += '<details class="wc-round"><summary><span>Quarts de finale</span><b>4 places</b></summary><div class="wc-slots">' + bracketSlot('Quart',4) + '</div></details>';
  html += '<details class="wc-round"><summary><span>Demi-finales</span><b>2 places</b></summary><div class="wc-slots">' + bracketSlot('Demi',2) + '</div></details>';
  html += '<details class="wc-round"><summary><span>Finale</span><b>Champion</b></summary><div class="wc-final-panel"><img class="wc-final-cup" src="trophy.svg?v=16" alt="Coupe"><strong>Finale</strong><span>Disponible apres les 72 matchs de groupes</span></div></details>';
  html += '<h3 class="mini-title">Senegal</h3><div class="watch-list"><span>Senegal qualifie probable</span><span>Angleterre vs Senegal</span><span>Match 80</span></div><h3 class="mini-title">Matchs a surveiller</h3><div class="watch-list">' + watch + '</div></article>';
  setTimeout(initBracketControls, 0);
  return html;
}

function initBracketControls(){
  var root = document.getElementById('knockoutView');
  if(!root) return;
  var openBtn = root.querySelector('[data-bracket-open]');
  var closeBtn = root.querySelector('[data-bracket-close]');
  if(openBtn) openBtn.onclick = function(){ root.querySelectorAll('details.wc-round').forEach(function(d){ d.open = true; }); };
  if(closeBtn) closeBtn.onclick = function(){ root.querySelectorAll('details.wc-round').forEach(function(d){ d.open = false; }); };
}

setTimeout(function(){ if(typeof renderKnockout === 'function') renderKnockout(); }, 50);
