var bracketZoom = 0.72;

function setBracketZoom(value){
  if(value < 0.45) value = 0.45;
  if(value > 1) value = 1;
  bracketZoom = value;
  var board = document.querySelector('.bracket-premium-board');
  var label = document.querySelector('#bracketZoomValue');
  if(board) board.style.setProperty('--bracket-zoom', bracketZoom);
  if(label) label.textContent = Math.round(bracketZoom * 100) + '%';
}

function initBracketZoom(){
  setBracketZoom(bracketZoom);
  var minus = document.querySelector('#bracketZoomMinus');
  var plus = document.querySelector('#bracketZoomPlus');
  var reset = document.querySelector('#bracketZoomReset');
  if(minus) minus.addEventListener('click', function(){ setBracketZoom(bracketZoom - 0.08); });
  if(plus) plus.addEventListener('click', function(){ setBracketZoom(bracketZoom + 0.08); });
  if(reset) reset.addEventListener('click', function(){ setBracketZoom(0.72); });
}

function renderBracketMatch(match){
  const senegalClass = match.senegal ? ' senegal-highlight' : '';
  return `
    <div class="bracket-match${senegalClass}">
      <div class="bracket-match-top"><span>Match ${match.num}</span><em>${match.status}</em></div>
      <div class="bracket-team-row">${bracketTeamHtml(match.a)}</div>
      <div class="bracket-team-row">${bracketTeamHtml(match.b)}</div>
    </div>
  `;
}

function renderEmptySlots(count, label){
  return Array.from({ length: count }).map(() => `<div class="bracket-slot"><span>${label}</span></div>`).join('');
}

function renderProjectedBracket(){
  const leftMatches = PROJECTED_R32.slice(0, 8);
  const rightMatches = PROJECTED_R32.slice(8);
  setTimeout(initBracketZoom, 0);

  return `
    <article class="card wide-card bracket-premium-card">
      <h2 class="section-title">Tableau provisoire des 16es</h2>
      <p class="subtitle">Utilise les boutons de zoom pour réduire ou agrandir le tableau.</p>
      <div class="zoom-panel">
        <button type="button" id="bracketZoomMinus">−</button>
        <span id="bracketZoomValue">72%</span>
        <button type="button" id="bracketZoomPlus">+</button>
        <button type="button" id="bracketZoomReset">Reset</button>
      </div>
      <div class="bracket-scroll">
        <div class="bracket-scale-shell">
          <div class="bracket-premium-board" style="--bracket-zoom:.72">
            <div class="bracket-bg-title">COUPE DU MONDE 2026</div>
            <div class="bracket-side">
              <div class="bracket-side-head"><span>16es</span><span>8es</span><span>Quarts</span><span>Demi</span></div>
              <div class="bracket-side-grid left">
                <div class="bracket-column bracket-col-r32">${leftMatches.map(renderBracketMatch).join('')}</div>
                <div class="bracket-column bracket-col-r16">${renderEmptySlots(4, '8e')}</div>
                <div class="bracket-column bracket-col-qf">${renderEmptySlots(2, '1/4')}</div>
                <div class="bracket-column bracket-col-sf">${renderEmptySlots(1, '1/2')}</div>
              </div>
            </div>
            <div class="bracket-center">
              <div class="bracket-cup">🏆</div><div class="bracket-final-box">Finale</div>
              <div class="bracket-final-slots"><span></span><span></span></div>
              <div class="bracket-final-note">Finale complète après les derniers groupes</div>
            </div>
            <div class="bracket-side">
              <div class="bracket-side-head right"><span>Demi</span><span>Quarts</span><span>8es</span><span>16es</span></div>
              <div class="bracket-side-grid right">
                <div class="bracket-column bracket-col-sf">${renderEmptySlots(1, '1/2')}</div>
                <div class="bracket-column bracket-col-qf">${renderEmptySlots(2, '1/4')}</div>
                <div class="bracket-column bracket-col-r16">${renderEmptySlots(4, '8e')}</div>
                <div class="bracket-column bracket-col-r32">${rightMatches.map(renderBracketMatch).join('')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 class="mini-title">Sénégal</h3>
      <div class="watch-list"><span>Sénégal qualifié probable</span><span>Angleterre vs Sénégal</span><span>Match 80</span></div>
      <h3 class="mini-title">Matchs à surveiller</h3>
      <div class="watch-list">${WATCH_MATCHES.map(x => `<span>${x}</span>`).join('')}</div>
      <button class="btn primary" style="width:100%;margin-top:14px" id="generateBtn" ${allGroupsDone() ? '' : 'disabled'}>${allGroupsDone() ? 'Générer la phase finale complète' : 'Tableau complet après les 72 matchs'}</button>
    </article>
  `;
}
