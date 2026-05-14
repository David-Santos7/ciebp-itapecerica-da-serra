function renderizarTabela(
  partidas
) {

  const tabela =
    document.getElementById(
      'tabela-body'
    )

  if (!tabela) return

  tabela.innerHTML = ''

  partidas.forEach(partida => {
    
    const getName = (p, side) =>
      p?.[`team_${side}`]?.nome_equipe ||
      p?.[`team${side.toUpperCase()}`]?.nome ||
      p?.[`team_${side}`] ||
      'TBD'

    const tr =
      document.createElement('tr')

    tr.innerHTML = `

      <td>${partida.round}</td>

      <td>
        ${getName(partida, 'a')}
      </td>

      <td>
        ${partida.score_a}
      </td>

      <td>
        ${partida.score_b}
      </td>

      <td>
        ${getName(partida, 'b')}
      </td>

      <td>
        ${partida.status}
      </td>

    `

    tabela.appendChild(tr)

  })
}

window.renderizarTabela =
  renderizarTabela