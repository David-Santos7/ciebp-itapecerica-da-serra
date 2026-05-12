// Local table handling for tabela.html
(function () {
  const STORAGE_KEY = 'localTeams_v1'

  function getTeams() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      console.error('Failed to parse teams from storage', e)
      return []
    }
  }

  function saveTeams(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }

  function renderTable() {
    const tbody = document.getElementById('table-body')
    const rowCount = document.getElementById('row-count')
    const teams = getTeams()

    tbody.innerHTML = ''

    teams.forEach((t, idx) => {
      const tr = document.createElement('tr')
      tr.className = 'hover:bg-gray-50'

      tr.innerHTML = `
        <td class="p-3">${escapeHtml(t.escola)}</td>
        <td class="p-3">${escapeHtml(t.nome_equipe)}</td>
        <td class="p-3">
          <button data-index="${idx}" class="btn-remove inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Remover</button>
        </td>
      `

      tbody.appendChild(tr)
    })

    rowCount.textContent = teams.length === 0 ? 'Nenhum time cadastrado' : `${teams.length} time(s) cadastrado(s)`
  }

  function escapeHtml(str) {
    if (!str) return ''
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  // global function called by onclick in HTML
  window.addTime = function addTime() {
    const escolaInput = document.getElementById('input-escola')
    const timeInput = document.getElementById('input-time')

    const escola = (escolaInput && escolaInput.value || '').trim()
    const nome_equipe = (timeInput && timeInput.value || '').trim()

    if (!escola || !nome_equipe) {
      alert('Preencha escola e nome do time')
      return
    }

    const teams = getTeams()

    // simple uniqueness check by pair
    const exists = teams.some(t => t.escola.toLowerCase() === escola.toLowerCase() && t.nome_equipe.toLowerCase() === nome_equipe.toLowerCase())
    if (exists) {
      alert('Time já cadastrado')
      return
    }

    teams.push({ escola, nome_equipe })
    saveTeams(teams)

    escolaInput.value = ''
    timeInput.value = ''

    renderTable()
  }

  // remove handler
  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('.btn-remove')
    if (!btn) return
    const idx = Number(btn.getAttribute('data-index'))
    if (Number.isNaN(idx)) return
    const teams = getTeams()
    teams.splice(idx, 1)
    saveTeams(teams)
    renderTable()
  })

  // gerar chaveamento local: simple bracket render
  window.gerarChaveamento = function gerarChaveamento() {
    const teams = getTeams()
    if (!teams || teams.length === 0) {
      alert('Nenhum time cadastrado para gerar chaveamento')
      return
    }

    // compute power of two
    let size = 1
    while (size < teams.length) size *= 2

    // fill with byes (null)
    const bracket = teams.map(t => t.nome_equipe)
    while (bracket.length < size) bracket.push(null)

    // build first round pairs
    const rounds = []
    let current = []
    for (let i = 0; i < bracket.length; i += 2) {
      current.push([bracket[i], bracket[i+1]])
    }
    rounds.push(current)

    // subsequent rounds placeholders
    let levelSize = current.length
    while (levelSize > 1) {
      levelSize = Math.ceil(levelSize/2)
      const next = Array.from({length: levelSize}, () => [null, null])
      rounds.push(next)
    }

    renderBracket(rounds)
  }

  function renderBracket(rounds) {
    const container = document.getElementById('bracket-ui')
    container.innerHTML = ''

    rounds.forEach((round, rIdx) => {
      const col = document.createElement('div')
      col.className = 'bracket-round'
      const title = document.createElement('h4')
      title.textContent = rIdx === 0 ? 'Fase 1' : `Fase ${rIdx+1}`
      title.className = 'text-lg font-bold text-[#193375] mb-2'
      col.appendChild(title)

      round.forEach(match => {
        const card = document.createElement('div')
        card.className = 'p-3 border rounded mb-2 bg-gray-50'
        card.innerHTML = `
          <div class="text-sm text-gray-600">${escapeHtml(match[0] || 'BYE')}</div>
          <div class="text-sm font-semibold">vs</div>
          <div class="text-sm text-gray-600">${escapeHtml(match[1] || 'BYE')}</div>
        `
        col.appendChild(card)
      })

      container.appendChild(col)
    })
  }

  // init
  document.addEventListener('DOMContentLoaded', () => {
    renderTable()
  })

})();
