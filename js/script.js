// script.js — Premier League Hub (clean version)
// Kept separate for maintainability

const API_KEY  = 'c081128d6f814d9191cfdab82482f7be';
const API_BASE = 'https://corsproxy.io/?https://api.football-data.org/v4';

const tableBody        = document.getElementById('tableBody');
const matchesContainer = document.getElementById('matchesContainer');
const newsContainer    = document.getElementById('newsContainer');

/* Tab switching */
document.querySelectorAll('.tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* Standings */
async function loadTable() {
  try {
    const res  = await fetch(`${API_BASE}/competitions/PL/standings`, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    const data = await res.json();
    const rows = data.standings[0].table;

    tableBody.innerHTML = rows.map(team => {
      const cls = team.position <= 4 ? 'top4' : team.position >= 18 ? 'relegation' : '';
      return `
        <tr class="${cls}">
          <td><span class="pos-num">${team.position}</span></td>
          <td>
            <div class="team-cell">
              <img src="${team.team.crest}" alt="${team.team.shortName}">
              <span class="team-name">${team.team.shortName || team.team.name}</span>
            </div>
          </td>
          <td>${team.playedGames}</td>
          <td>${team.won}</td>
          <td>${team.draw}</td>
          <td>${team.lost}</td>
          <td>${team.goalDifference > 0 ? '+' : ''}${team.goalDifference}</td>
          <td class="pts-cell">${team.points}</td>
        </tr>`;
    }).join('');
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="8" style="padding:20px;color:var(--muted);font-size:13px;">⚠ Failed to load standings</td></tr>`;
    console.error('loadTable error:', err);
  }
}

/* Matches */
async function loadMatches() {
  try {
    const url  = 'https://corsproxy.io/?https://site.api.espn.com/apis/v2/sports/soccer/eng.1/scoreboard';
    const res  = await fetch(url);
    const data = await res.json();

    const grouped = {};
    data.events.forEach(match => {
      const week = match.week?.number ?? 0;
      (grouped[week] = grouped[week] || []).push(match);
    });

    const matchdays = Object.keys(grouped).map(Number);
    const latest    = Math.max(...matchdays);
    const previous  = latest - 1;

    matchesContainer.innerHTML = '';

    [latest, previous].forEach(day => {
      if (!grouped[day]) return;

      matchesContainer.innerHTML += `<div class="matchday-label">Matchday ${day} · 2024–25</div>`;

      grouped[day].forEach(match => {
        const home   = match.competitions[0].competitors[0];
        const away   = match.competitions[0].competitors[1];
        const hScore = parseInt(home.score) || 0;
        const aScore = parseInt(away.score) || 0;
        const status = match.status?.type?.shortDetail || '';
        const isLive = match.status?.type?.state === 'in';

        const hClass = hScore > aScore ? 'winner' : hScore < aScore ? 'loser' : '';
        const aClass = aScore > hScore ? 'winner' : aScore < hScore ? 'loser' : '';

        matchesContainer.innerHTML += `
          <div class="match-card">
            <div class="match-teams">
              <div class="team-row ${hClass}">
                <img src="${home.team.logo}" alt="${home.team.displayName}">
                ${home.team.displayName}
              </div>
              <div class="team-row ${aClass}">
                <img src="${away.team.logo}" alt="${away.team.displayName}">
                ${away.team.displayName}
              </div>
            </div>
            <div class="match-score-block">
              <div class="score-pair">
                <span class="score-num">${home.score ?? '–'}</span>
                <span class="score-num">${away.score ?? '–'}</span>
              </div>
              <span class="match-status ${isLive ? 'live' : ''}">${status}</span>
            </div>
          </div>`;
      });
    });

  } catch (err) {
    matchesContainer.innerHTML = `<div class="loading" style="color:var(--muted)">⚠ Failed to load matches</div>`;
    console.error('loadMatches error:', err);
  }
}

/* News */
function loadNews() {
  const news = [
    { tag: 'Title Race',      title: 'Arsenal continue strong title race',      desc: 'The Gunners maintain top position with clinical performances across the pitch.' },
    { tag: 'City',            title: 'Manchester City push hard for comeback',   desc: "Pep Guardiola's side refuse to drop the pace as they chase league leaders." },
    { tag: 'Liverpool',       title: 'Liverpool dominate in latest fixture',     desc: "Slot's Liverpool put in an impressive display, moving into Champions League spots." },
    { tag: 'Top Four Battle', title: 'Tottenham battle hard for top four',       desc: 'Spurs keep the pressure on as the race for European football heats up.' },
  ];

  newsContainer.innerHTML = news.map(n => `
    <div class="news-card">
      <div class="news-tag">${n.tag}</div>
      <h3>${n.title}</h3>
      <p>${n.desc}</p>
    </div>`).join('');
}

loadTable();
loadMatches();
loadNews();
