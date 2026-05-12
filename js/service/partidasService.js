// ==========================================
// SERVICE DE PARTIDAS
// ==========================================

import { supabase } from '../config/supabase.js'

/**
 * Buscar partidas
 */
export async function buscarPartidas() {

  try {

    const { data, error } = await supabase
      .from('matches')
      .select(`
        id,
        round,
        match_number,
        status,
        team_a,
        team_b,
        score_a,
        score_b
      `)
      .order('match_number', {
        ascending: true
      })

    if (error) {
      throw error
    }

    return data

  } catch (err) {

    console.error(
      'Erro ao buscar partidas:',
      err.message
    )

    return []
  }
}