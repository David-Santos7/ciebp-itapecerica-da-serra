import { db } from './config/supabase.js'

async function loadDashboard() {

  const { data: matches, error } = await db
    .from('matches')
    .select(`*
    `)

  if (error) {
    console.error('Error loading dashboard matches:', error)
    return
  }

  const stats = {};

  (matches || []).forEach(m => {
    const a = m.team_a?.nome || m.teamA?.nome || null;
    const b = m.team_b?.nome || m.teamB?.nome || null;
    const w = null; // original schema didn't provide winner lookup here

    if (!a || !b) return;

    [a, b].forEach(t => {
      if (!stats[t]) stats[t] = { wins: 0, games: 0 };
      stats[t].games++;
    });

    if (w) stats[w].wins++;
  });

  const ranking = Object.entries(stats)
    .map(([team, s]) => ({
      team,
      ...s
    }))
    .sort((a, b) => b.wins - a.wins);

  const list = document.getElementById("ranking-list");

  if (list) {
    list.innerHTML = ranking.map((t, i) => `
      <li>${i+1}º ${t.team} - ${t.wins} vitórias</li>
    `).join('');
  }
}

export function initRealtimeDashboard() {
  loadDashboard().catch(console.error)

  try {
    db.channel('public:matches')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, () => {
        loadDashboard().catch(console.error)
      })
      .subscribe()
  } catch (err) {
    console.error('Realtime init failed (dashboard):', err)
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initRealtimeDashboard()
})