'use strict'

import supabase from './supabase.js'

/* --- 1. DADOS (AGORA VINDOS DO BANCO) --- */
let gamesData = []

let currentFilter = 'all'
let timerSeconds = 272
const activeAnimations = {}

/* --- 2. BUSCAR DADOS REAIS --- */
async function carregarJogos() {
  const { data, error } = await supabase
    .from('partidas_chaveamento')
    .select(`
      id,
      rodada,
      vencedor_id,
      equipe_a:equipes!equipe_a_id(nome),
      equipe_b:equipes!equipe_b_id(nome)
    `)

  if (error) {
    console.error(error)
    return
  }

  // 🔄 Adaptando para o formato original do seu app
  gamesData = data.map(j => ({
    id: j.id,
    status: j.vencedor_id ? 'ended' : 'live',
    round: j.rodada,
    arena: 'Arena Principal',

    teamA: {
      name: j.equipe_a?.nome || 'A definir',
      class: '',
      icon: '🤖',
      score: 0
    },

    teamB: {
      name: j.equipe_b?.nome || 'A definir',
      class: '',
      icon: '🤖',
      score: 0
    },

    time: '--:--',
    isMain: false
  }))

  renderCards()
}

/* --- 3. FILTROS (INALTERADO) --- */
window.filterGames = function(filter, btn) {
  currentFilter = filter
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
  if (btn) btn.classList.add('active')
  renderCards()
}

/* --- 4. RENDERIZAÇÃO (INALTERADO) --- */
function renderCards() {
  const grid = document.getElementById('games-grid')
  if (!grid) return

  const list = currentFilter === 'all'
    ? gamesData
    : gamesData.filter(g => g.status === currentFilter)

  grid.innerHTML = ''

  list.forEach((game, i) => {
    const card = document.createElement('div')
    card.className = `game-card ${game.status === 'live' ? 'border-2 border-red-500 shadow-lg' : 'border border-gray-200'} bg-white rounded-xl p-4 transition-transform hover:-translate-y-1`

    card.style.opacity = '0'
    card.style.animation = `fadeUp 0.4s ease ${i * 0.05}s forwards`

    card.innerHTML = `
      <div class="flex justify-between items-center mb-3 border-b pb-2">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">${game.round}</span>
        ${game.status === 'live' ? '<span class="text-xs font-bold text-red-500">AO VIVO</span>' : ''}
      </div>

      <div class="flex justify-between items-center px-2">
        <div class="text-center">
          <div>${game.teamA.name}</div>
        </div>

        <div class="text-center px-4 font-black text-xl">
          <span id="card-score-a-${game.id}">${game.teamA.score}</span>
          ×
          <span id="card-score-b-${game.id}">${game.teamB.score}</span>
        </div>

        <div class="text-center">
          <div>${game.teamB.name}</div>
        </div>
      </div>

      ${game.status === 'live'
        ? `<button onclick="setMainGame(${game.id})" class="mt-2">Ver</button>`
        : ''
      }
    `

    grid.appendChild(card)
  })
}

/* --- 5. PLACAR PRINCIPAL (INALTERADO) --- */
function initScoreboard(game) {
  const map = {
    'team-a-name': game.teamA.name,
    'team-b-name': game.teamB.name
  }

  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id)
    if (el) el.textContent = val
  })

  document.getElementById('score-a').textContent = game.teamA.score
  document.getElementById('score-b').textContent = game.teamB.score
}

/* --- 6. ANIMAÇÃO (INALTERADO) --- */
function animateScore(id, target) {
  const el = document.getElementById(id)
  if (!el) return

  const current = parseInt(el.textContent) || 0
  if (current === target) return

  if (activeAnimations[id]) clearInterval(activeAnimations[id])

  let val = current
  const step = target > current ? 1 : -1

  activeAnimations[id] = setInterval(() => {
    val += step
    el.textContent = val

    if (val === target) {
      clearInterval(activeAnimations[id])
      delete activeAnimations[id]
    }
  }, 40)
}

/* --- 7. SET MAIN GAME (INALTERADO) --- */
window.setMainGame = function(id) {
  const game = gamesData.find(g => g.id === id)
  if (!game) return

  gamesData.forEach(g => g.isMain = false)
  game.isMain = true

  initScoreboard(game)
}

/* --- 8. REALTIME (NOVO) --- */
function ativarRealtime() {
  supabase
    .channel('jogos')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'partidas_chaveamento' },
      () => carregarJogos()
    )
    .subscribe()
}

/* --- 9. TIMER (INALTERADO) --- */
function updateTimer() {
  timerSeconds++
  const m = String(Math.floor(timerSeconds / 60)).padStart(2, '0')
  const s = String(timerSeconds % 60).padStart(2, '0')

  const el = document.getElementById('match-timer')
  if (el) el.textContent = `${m}:${s}`
}

/* --- 10. HEADER (INALTERADO) --- */
function carregarHeader() {
  const header = document.getElementById('header-padrao')
  if (!header) return

  fetch('/header.html')
    .then(r => r.text())
    .then(html => header.innerHTML = html)
}

/* --- 11. INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  carregarJogos()
  ativarRealtime()
  carregarHeader()

  setInterval(updateTimer, 1000)
})