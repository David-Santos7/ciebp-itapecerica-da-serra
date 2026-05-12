import { buscarClassificacao } from '../service/tabelaService.js'
import { db } from '../config/supabase.js'

document.addEventListener('DOMContentLoaded', () => {
  carregarTabela()
  initRealtimeTabela()
})

async function carregarTabela() {

  const tabela = document.getElementById('tabela')

  tabela.innerHTML = `
    <tr>
      <td colspan="8">
        Carregando...
      </td>
    </tr>
  `

  try {

    const dados = await buscarClassificacao()

    tabela.innerHTML = ''

    dados.forEach((time, index) => {

      tabela.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${time.nome}</td>
          <td>${time.pontos}</td>
          <td>${time.jogos}</td>
          <td>${time.vitorias}</td>
          <td>${time.empates}</td>
          <td>${time.derrotas}</td>
          <td>${time.saldo}</td>
        </tr>
      `
    })

  } catch (error) {

    tabela.innerHTML = `
      <tr>
        <td colspan="8">
          Erro ao carregar tabela
        </td>
      </tr>
    `

    console.error(error)
  }
}

// Realtime subscription for tabela
export function initRealtimeTabela() {
  try {
    db.channel('public:matches')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, () => {
        carregarTabela().catch(console.error)
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teams' }, () => {
        carregarTabela().catch(console.error)
      })
      .subscribe()
  } catch (err) {
    console.error('Realtime init failed (tabela):', err)
  }
}