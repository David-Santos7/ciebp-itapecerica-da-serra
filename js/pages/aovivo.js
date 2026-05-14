import { buscarPartidas } from '../service/partidaService.js'
import { db } from '../config/supabase.js'

document.addEventListener('DOMContentLoaded', () => {
  carregarAoVivo()
  initRealtimeAovivo()
})

async function carregarAoVivo() {

  const container = document.getElementById('aovivo')

  if (!container) {
    console.warn('Container #aovivo não encontrado no DOM — pulando renderização ao vivo')
    return
  }

  try {
    const partidas = await buscarPartidas()
    const aoVivo = Array.isArray(partidas) ? partidas.filter(p => p && p.status === 'live') : []

    container.innerHTML = ''

    if (aoVivo.length === 0) {
      const empty = document.createElement('div')
      empty.className = 'card-aovivo empty'
      empty.textContent = 'Nenhum jogo ao vivo no momento'
      container.appendChild(empty)
      return
    }

    const frag = document.createDocumentFragment()

    aoVivo.forEach(partida => {
      const card = document.createElement('div')
      card.className = 'card-aovivo'

      const h3 = document.createElement('h3')
      h3.textContent = 'AO VIVO'

      const details = document.createElement('div')
      const teamAName = partida.teamA?.nome || '-'
      const teamBName = partida.teamB?.nome || '-'
      const golsA = typeof partida.gols_a === 'number' ? partida.gols_a : (partida.gols_a ?? 0)
      const golsB = typeof partida.gols_b === 'number' ? partida.gols_b : (partida.gols_b ?? 0)

      details.textContent = `${teamAName} ${golsA} x ${golsB} ${teamBName}`

      card.appendChild(h3)
      card.appendChild(details)
      frag.appendChild(card)
    })

    container.appendChild(frag)
  } catch (error) {
    console.error('Erro ao carregar partidas ao vivo:', error)
  }
}

// Realtime subscription for ao vivo
export function initRealtimeAovivo() {
  try {
    db.channel('public:matches')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, () => {
        carregarAoVivo().catch(console.error)
      })
      .subscribe()
  } catch (err) {
    console.error('Realtime init failed (aovivo):', err)
  }
}