// ========================================
// BUSCAR PARTIDAS
// ========================================

async function buscarPartidas() {

  const { data, error } =
    await window.supabaseClient

      .from('matches')

      .select(`
        *,
        team_a:team_a_id(
          id,
          nome_equipe,
          escola
        ),
        team_b:team_b_id(
          id,
          nome_equipe,
          escola
        ),
        winner:winner_id(
          id,
          nome_equipe
        )
      `)

      .order('round', {
        ascending: true
      })

      .order('match_number', {
        ascending: true
      })

  if (error) {

    console.error(
      'Erro ao buscar partidas:',
      error
    )

    return []

  }

  return data
}

// ========================================
// GERAR CHAVEAMENTO
// ========================================

async function gerarChaveamento() {

  const { error } =
    await window.supabaseClient
      .rpc('gerar_chaveamento')

  if (error) {

    console.error(
      'Erro ao gerar chaveamento:',
      error
    )

    return false

  }

  return true
}

// ========================================
// UPDATE SCORE
// ========================================

async function atualizarPlacar(
  id,
  scoreA,
  scoreB
) {

  const vencedor =
    scoreA > scoreB
      ? 'team_a_id'
      : 'team_b_id'

  const partidas =
    await buscarPartidas()

  const partida =
    partidas.find(p => p.id === id)

  const winnerId =
    partida[vencedor]

  const { error } =
    await window.supabaseClient

      .from('matches')

      .update({

        score_a: scoreA,

        score_b: scoreB,

        status: 'ended',

        winner_id: winnerId

      })

      .eq('id', id)

  if (error) {

    console.error(
      'Erro ao atualizar placar:',
      error
    )

  }
}

// ========================================
// EXPORT
// ========================================

window.buscarPartidas =
  buscarPartidas

window.gerarChaveamento =
  gerarChaveamento

window.atualizarPlacar =
  atualizarPlacar