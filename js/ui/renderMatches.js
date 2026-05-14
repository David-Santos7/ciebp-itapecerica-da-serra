function renderizarPartidas(
  partidas
) {

  const container =
    document.getElementById(
      'partidas-container'
    )

  if (!container) return

  container.innerHTML = ''

  partidas.forEach(partida => {
    
    const getName = (p, side) =>
      p?.[`team_${side}`]?.nome_equipe ||
      p?.[`team${side.toUpperCase()}`]?.nome ||
      p?.[`team_${side}`] ||
      'TBD'

    const card =
      document.createElement('article')

    card.className = `
      bg-white
      rounded-2xl
      shadow-lg
      p-5
      border
      border-gray-200
      flex
      flex-col
      gap-4
    `

    card.innerHTML = `

      <div class="flex justify-between items-center">

        <span class="font-bold text-sm text-gray-500">
          Rodada ${partida.round}
        </span>

        <span class="
          px-3
          py-1
          rounded-full
          text-xs
          bg-blue-100
          text-blue-700
          font-semibold
        ">
          ${partida.status}
        </span>

      </div>

      <div class="space-y-3">

        <div class="
          flex
          justify-between
          items-center
          bg-gray-100
          rounded-xl
          px-4
          py-3
        ">

          <span class="font-semibold">
            ${getName(partida, 'a')}
          </span>

          <span class="text-xl font-black">
            ${partida.score_a}
          </span>

        </div>

        <div class="
          flex
          justify-between
          items-center
          bg-gray-100
          rounded-xl
          px-4
          py-3
        ">

          <span class="font-semibold">
            ${getName(partida, 'b')}
          </span>

          <span class="text-xl font-black">
            ${partida.score_b}
          </span>

        </div>

      </div>
    `

    container.appendChild(card)

  })
}

window.renderizarPartidas =
  renderizarPartidas