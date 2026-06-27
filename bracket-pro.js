function renderBracketMatch(match){
  const senegalClass = match.senegal ? ' senegal-highlight' : '';
  return `
    <div class="bracket-match${senegalClass}">
      <div class="bracket-match-top">
        <span>Match ${match.num}</span>
        <em>${match.status}</em>
      </div>
      <div class="bracket-team-row">${bracketTeamHtml(match.a)}</div>
      <div class="bracket-team-row">${bracketTeamHtml(match.b)}</div>
    </div>
  `;
}

function renderEmptySlots(count, label){
  return Array.from({ length: count }).map(() => `
    <div class="bracket-slot"><span>${label}</span></div>
  `).join('');
}

function renderProjectedBracket(){
  const leftMatches = PROJECTED_R32.slice(0, 8);
  const rightMatches = PROJECTED_R32.slice(8);

  return `
    <article class="card wide-card bracket-premium-card">
      <h2 class="section-title">Tableau provisoire des 16es</h2>
      <p class="subtitle">
        Vue tableau type affiche sportive. Le tableau reste provisoire tant que les groupes J, K et L ne sont pas terminés.
      </p>

      <div class="bracket-scroll">
        <div class="bracket-premium-board">
          <div class="bracket-bg-title">COUPE DU MONDE 2026</div>

          <div class="bracket-side">
            <div class="bracket-side-head">
              <span>16es</span>
              <span>8es</span>
              <span>Quarts</span>
              <span>Demi</span>
            </div>

            <div class="bracket-side-grid left">
              <div class="bracket-column bracket-col-r32">
                ${leftMatches.map(renderBracketMatch).join('')}
              </div>
              <div class="bracket-column bracket-col-r16">
                ${renderEmptySlots(4, '8e')}
              </div>
              <div class="bracket-column bracket-col-qf">
                ${renderEmptySlots(2, '1/4')}
              </div>
              <div class="bracket-column bracket-col-sf">
                ${renderEmptySlots(1, '1/2')}
              </div>
            </div>
          </div>

          <div class="bracket-center">
            <div class="bracket-cup">🏆</div>
            <div class="bracket-final-box">Finale</div>
            <div class="bracket-final-slots">
              <span></span>
              <span></span>
            </div>
            <div class="bracket-final-note">Finale complète après les derniers groupes</div>
          </div>

          <div class="bracket-side">
            <div class="bracket-side-head right">
              <span>Demi</span>
              <span>Quarts</span>
              <span>8es</span>
              <span>16es</span>
            </div>

            <div class="bracket-side-grid right">
              <div class="bracket-column bracket-col-sf">
                ${renderEmptySlots(1, '1/2')}
              </div>
              <div class="bracket-column bracket-col-qf">
                ${renderEmptySlots(2, '1/4')}
              </div>
              <div class="bracket-column bracket-col-r16">
                ${renderEmptySlots(4, '8e')}
              </div>
              <div class="bracket-column bracket-col-r32">
                ${rightMatches.map(renderBracketMatch).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="mini-title">Sénégal</h3>
      <div class="watch-list">
        <span>Sénégal qualifié probable</span>
        <span>Angleterre vs Sénégal</span>
        <span>Match 80</span>
      </div>

      <h3 class="mini-title">Matchs à surveiller</h3>
      <div class="watch-list">
        ${WATCH_MATCHES.map(x => `<span>${x}</span>`).join('')}
      </div>

      <button class="btn primary" style="width:100%;margin-top:14px" id="generateBtn" ${allGroupsDone() ? '' : 'disabled'}>
        ${allGroupsDone() ? 'Générer la phase finale complète' : 'Tableau complet après les 72 matchs'}
      </button>
    </article>
  `;
}
