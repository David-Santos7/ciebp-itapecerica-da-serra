// ===============================
// 🔌 CONFIG SUPABASE
// ===============================
const supabaseUrl = 'https://SEU-PROJETO.supabase.co';
const supabaseKey = 'SUA-CHAVE-ANON';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// ===============================
// ➕ ADICIONAR TIME
// ===============================
async function addTime() {
  const escola = document.getElementById('input-escola').value.trim();
  const nome = document.getElementById('input-time').value.trim();

  if (!escola || !nome) {
    alert("Preencha todos os campos");
    return;
  }

  const { error } = await supabase
    .from('teams')
    .insert([{ escola, nome }]);

  if (error) {
    console.error(error);
    alert("Erro ao cadastrar time");
  } else {
    document.getElementById('input-escola').value = '';
    document.getElementById('input-time').value = '';

    carregarTimes();
  }
}

// ===============================
// 📋 LISTAR TIMES
// ===============================
async function carregarTimes() {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';

  data.forEach(team => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td class="p-3">${team.escola}</td>
      <td class="p-3 font-semibold">${team.nome}</td>
      <td class="p-3">
        <button onclick="removerTime(${team.id})"
          class="text-red-500 hover:underline">
          Remover
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  document.getElementById('row-count').innerText =
    `${data.length} times cadastrados`;
}

// ===============================
// ❌ REMOVER TIME
// ===============================
async function removerTime(id) {
  if (!confirm("Remover este time?")) return;

  const { error } = await supabase
    .from('teams')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    alert("Erro ao remover");
  } else {
    carregarTimes();
  }
}

// ===============================
// 🧠 GERAR CHAVEAMENTO (RPC)
// ===============================
async function gerarChaveamento() {
  const { error } = await supabase.rpc('gerar_chaveamento');

  if (error) {
    console.error(error);
    alert("Erro ao gerar chaveamento");
  } else {
    alert("Chaveamento gerado com sucesso!");
    carregarChaveamento();
  }
}

// ===============================
// 📊 CARREGAR CHAVEAMENTO
// ===============================
async function carregarChaveamento() {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      id,
      round,
      match_number,
      next_match_id,
      team_a:team_a_id (nome),
      team_b:team_b_id (nome)
    `)
    .order('round', { ascending: true })
    .order('match_number', { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  renderBracket(data);
}

// ===============================
// 🏆 RENDER CHAVEAMENTO (ESTILO COPA)
// ===============================
function renderBracket(matches) {
  const container = document.getElementById('bracket-ui');
  container.innerHTML = '';

  // agrupar por rodada
  const rounds = {};

  matches.forEach(match => {
    if (!rounds[match.round]) {
      rounds[match.round] = [];
    }
    rounds[match.round].push(match);
  });

  // criar colunas
  const bracket = document.createElement('div');
  bracket.className = "flex gap-10 overflow-x-auto";

  Object.keys(rounds).forEach(round => {
    const column = document.createElement('div');
    column.className = "flex flex-col gap-6";

    const title = document.createElement('h3');
    title.className = "font-bold text-[#193375]";
    title.innerText = `Rodada ${round}`;

    column.appendChild(title);

    rounds[round].forEach(match => {
      const card = document.createElement('div');

      card.className = `
        bg-gray-50 border rounded-lg p-3 shadow
        w-[200px]
      `;

      card.innerHTML = `
        <div class="font-semibold">
          ${match.team_a?.nome || 'BYE'}
        </div>
        <div class="text-center text-gray-400">vs</div>
        <div class="font-semibold">
          ${match.team_b?.nome || 'BYE'}
        </div>
      `;

      column.appendChild(card);
    });

    bracket.appendChild(column);
  });

  container.appendChild(bracket);
}

// ===============================
// 🚀 INIT
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  carregarTimes();
  carregarChaveamento();
});
