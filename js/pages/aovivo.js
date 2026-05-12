import { buscarPartidas } from '../service/partidaService.js'
import { db } from '../config/supabase.js'

document.addEventListener('DOMContentLoaded', () => {
  carregarAoVivo()
  initRealtimeAovivo()
})

async function carregarAoVivo() {

  const container =
    document.getElementById('aovivo')

  try {

    const partidas =
      await buscarPartidas()

    const aoVivo = partidas.filter(
      partida => !partida.encerrada
    )

    container.innerHTML = ''

    aoVivo.forEach(partida => {

      container.innerHTML += `
        <div class="card-aovivo">

          <h3>AO VIVO</h3>

          <div>
            ${partida.teamA.nome}
            ${partida.gols_a}
            x
            ${partida.gols_b}
            ${partida.teamB.nome}
          </div>

        </div>
      `
    })

  } catch (error) {

    console.error(error)
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