// ========================================
// BUSCAR TIMES
// ========================================

async function buscarTimes() {

  const { data, error } =
    await window.supabaseClient

      .from('teams')

      .select('*')

      .order('nome_equipe', {
        ascending: true
      })

  if (error) {

    console.error(
      'Erro ao buscar times:',
      error
    )

    return []

  }

  return data
}

// ========================================
// EXPORT
// ========================================

window.buscarTimes =
  buscarTimes