// Supabase-backed table logic for tabela.html
const supabase = () => window.supabaseClient

async function carregarTabela() {
  const client = supabase()
  if (!client) return

  const { data, error } = await client.from('teams').select('*').order('id', {ascending:true})
  if (error) {
    console.error('Erro ao carregar times:', error)
    return
  }

  const tbody = document.getElementById('table-body')
  const rowCount = document.getElementById('row-count')
  tbody.innerHTML = ''

  data.forEach(team => {
    const escola = team.escola ?? team.grupo ?? team.nome ?? team.nome_equipe ?? ''
    const nome = team.nome_equipe ?? team.nome ?? ''

    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td class="p-3">${escola}</td>
      <td class="p-3">${nome}</td>
      <td class="p-3"><button class="px-3 py-1 bg-gray-100 rounded">Remover</button></td>
    `
    tbody.appendChild(tr)
  })

  if (rowCount) rowCount.textContent = `${data.length} times cadastrados`;
}

async function addTime() {
  const inputEscola = document.getElementById('input-escola')
  const inputTime = document.getElementById('input-time')
  const escola = inputEscola?.value?.trim()
  const nome = inputTime?.value?.trim()
  if (!nome) { alert('Informe o nome do time'); return }

  // prefer existing helper if present
  if (typeof cadastrarTime === 'function') {
    try { await cadastrarTime(escola, nome) } catch(e){ console.error(e) }
  } else {
    const client = supabase()
    if (!client) { alert('Supabase não configurado'); return }
    const payload = { nome_equipe: nome, escola }
    const { error } = await client.from('teams').insert([payload])
    if (error) { console.error(error); alert('Erro ao cadastrar'); return }
    alert('Time cadastrado')
  }

  if (inputEscola) inputEscola.value = ''
  if (inputTime) inputTime.value = ''
  carregarTabela()
}

// expose globals used by inline onclick handlers
window.addTime = addTime

// initialize on load
document.addEventListener('DOMContentLoaded', () => {
  carregarTabela()
  // realtime subscription
  const client = supabase()
  if (!client || !client.channel) return
  try {
    client
      .channel('public:teams')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teams' }, () => cargarOnMutation())
      .subscribe()
  } catch (e) {
    // older supabase client compatibility
    try {
      client.from('teams').on('*', () => carregarTabela()).subscribe()
    } catch(_){}
  }
})

function cargarOnMutation(){
  // slight delay to allow DB triggers to finish
  setTimeout(() => carregarTabela(), 300)
}
