/* ============================================================
   CIEBP – Sistema de Torneio (Supabase)
   ============================================================ */

let TIMES = [];
let MATCHES = [];

/* =========================
   CARREGAR TIMES
========================= */
async function loadTimes() {
    const { data, error } = await supabase
        .from("futebol_robos")
        .select("*")
        .order("id");

    if (error) {
        console.error(error);
        return;
    }

    TIMES = data;
    renderTimes();
}

/* =========================
   RENDER TIMES
========================= */
function renderTimes() {
    const tbody = document.getElementById("table-body");
    if (!tbody) return;

    if (TIMES.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3">Nenhum time</td></tr>`;
        return;
    }

    tbody.innerHTML = TIMES.map(t => `
        <tr>
            <td class="p-3">${t.escola}</td>
            <td class="p-3">${t.time}</td>
            <td class="p-3 text-red-500 cursor-pointer"
                onclick="deleteTime(${t.id})">Excluir</td>
        </tr>
    `).join("");
}

/* =========================
   ADICIONAR TIME
========================= */
async function addTime() {
    const escola = document.getElementById("input-escola").value;
    const time = document.getElementById("input-time").value;

    if (!escola || !time) return alert("Preencha tudo");

    await supabase.from("futebol_robos").insert([{ escola, time }]);

    document.getElementById("input-escola").value = "";
    document.getElementById("input-time").value = "";

    loadTimes();
}

/* =========================
   DELETAR TIME
========================= */
async function deleteTime(id) {
    if (!confirm("Excluir?")) return;

    await supabase.from("futebol_robos").delete().eq("id", id);
    loadTimes();
}

/* =========================
   GERAR CHAVEAMENTO
========================= */
async function gerarChaveamento() {
    const { error } = await supabase.rpc("gerar_chaveamento");

    if (error) {
        console.error(error);
        alert("Erro ao gerar chaveamento");
        return;
    }

    loadMatches();
}

/* =========================
   CARREGAR PARTIDAS
========================= */
async function loadMatches() {
    const { data, error } = await supabase
        .from("matches")
        .select("*")
        .order("round_number");

    if (error) {
        console.error(error);
        return;
    }

    MATCHES = data;
    renderMatches();
}

/* =========================
   RENDER CHAVEAMENTO
========================= */
function renderMatches() {
    const container = document.getElementById("bracket-ui");
    if (!container) return;

    if (MATCHES.length === 0) {
        container.innerHTML = "Nenhum chaveamento ainda";
        return;
    }

    container.innerHTML = MATCHES.map(m => `
        <div class="bg-white p-4 mb-3 rounded shadow">
            <strong>Rodada ${m.round_number}</strong><br>
            <div class="flex justify-between">
                <span onclick="setWinner(${m.id}, '${m.team_a}')"
                      class="cursor-pointer">${m.team_a}</span>
                <span onclick="setWinner(${m.id}, '${m.team_b}')"
                      class="cursor-pointer">${m.team_b}</span>
            </div>
            <div class="text-sm text-gray-500 mt-2">
                Vencedor: ${m.winner || "-"}
            </div>
        </div>
    `).join("");
}

/* =========================
   DEFINIR VENCEDOR
========================= */
async function setWinner(matchId, winner) {
    await supabase
        .from("matches")
        .update({ winner })
        .eq("id", matchId);

    loadMatches();
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
    loadTimes();
    loadMatches();
});

window.addTime = addTime;
window.deleteTime = deleteTime;
window.gerarChaveamento = gerarChaveamento;
window.setWinner = setWinner;