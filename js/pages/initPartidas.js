// ==========================================
// INIT PARTIDAS
// ==========================================

import {
  buscarPartidas
} from '../services/partidasService.js'

import {
  criarCardPartida
} from '../ui/partidasUI.js'

/**
 * Renderizar partidas
 */
async function renderizarPartidas() {

  const container =
    document.getElementById(
      'partidas-container'
    )

  if (!container) return

  // Loading
  container.innerHTML = `
    <div class="
      text-center
      py-10
      text-zinc-400
    ">
      Carregando partidas...
    </div>
  `

  // Busca no Supabase
  const partidas =
    await buscarPartidas()

  // Sem partidas
  if (!partidas.length) {

    container.innerHTML = `
      <div class="
        text-center
        py-10
        text-red-400
      ">
        Nenhuma partida encontrada
      </div>
    `

    return
  }

  // Renderização
  container.innerHTML =
    partidas
      .map(criarCardPartida)
      .join('')
}

/**
 * Inicialização isolada
 */
export function initPartidas() {

  renderizarPartidas()
}