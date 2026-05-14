// ==========================================
// UI DAS PARTIDAS
// ==========================================

/**
 * Criar card da partida
 */
export function criarCardPartida(partida) {

  return `

    <div class="
      bg-zinc-900
      border
      border-zinc-800
      rounded-xl
      p-4
      shadow-lg
    ">

      <div class="
        flex
        justify-between
        items-center
        mb-4
      ">

        <span class="
            text-cyan-400
            text-xs
            font-bold
          ">
          Rodada ${partida.round}
        </span>

        <span class="
          bg-zinc-800
          text-zinc-300
          text-xs
          px-2
          py-1
          rounded
        ">
          ${partida.status}
        </span>

      </div>

      <div class="
        flex
        items-center
        justify-between
      ">

        <div class="w-1/3 text-center">

          <h3 class="
            text-white
            font-bold
          ">
            ${
              partida?.team_a?.nome_equipe ||
              partida?.teamA?.nome ||
              partida?.team_a ||
              'TBD'
            }
          </h3>

        </div>

        <div class="
          flex
          items-center
          gap-4
        ">

          <span class="
            text-3xl
            font-black
            text-white
          ">
            ${partida.score_a ?? 0}
          </span>

          <span class="text-zinc-500">
            x
          </span>

          <span class="
            text-3xl
            font-black
            text-white
          ">
            ${partida.score_b ?? 0}
          </span>

        </div>

        <div class="w-1/3 text-center">

          <h3 class="
            text-white
            font-bold
          ">
            ${
              partida?.team_b?.nome_equipe ||
              partida?.teamB?.nome ||
              partida?.team_b ||
              'TBD'
            }
          </h3>

        </div>

      </div>

    </div>
  `
}