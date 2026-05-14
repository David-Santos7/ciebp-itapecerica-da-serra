document.addEventListener('DOMContentLoaded', async () => {
    const totalMatchesEl = document.getElementById('total-matches');
    const totalTimesEl = document.getElementById('total-times');
    const rankingListEl = document.getElementById('ranking-list');
    const rankingChartCtx = document.getElementById('rankingChart');

    let times = [];
    let partidas = [];

    try {
        // 1. Tentar buscar dados do localStorage (Sincronizando com a versão tabela local)
        const timesLocal = localStorage.getItem('times');
        const partidasLocal = localStorage.getItem('partidas');

        if (timesLocal) times = JSON.parse(timesLocal);
        if (partidasLocal) partidas = JSON.parse(partidasLocal);
        
        // 2. Interligação com o Supabase (Se configurado e acessível globalmente)
        // Tenta utilizar o banco em nuvem caso 'db' seja exposto pelo js/supabase.js
        if (typeof db !== 'undefined' && db.from) {
            const { data: teamsData } = await db.from('teams').select('*');
            if (teamsData && teamsData.length > 0) times = teamsData;

            const { data: matchesData } = await db.from('matches').select('*');
            if (matchesData && matchesData.length > 0) partidas = matchesData;
        }
    } catch (e) {
        console.warn("Aviso: Sincronização em nuvem falhou, operando de forma local.", e);
    }

    // ============================================
    // PROCESSAMENTO E ESTATÍSTICAS
    // ============================================
    
    // Varre e inicializa a base de pontuações
    const pontuacoes = {};
    times.forEach(t => {
        const nomeTime = t.nome || t.nome_time || t.id || 'Desconhecido';
        pontuacoes[nomeTime] = { nome: nomeTime, pontos: t.pontos || 0 };
    });

    // Adiciona pontos dinamicamente baseado nos resultados da Tabela (Vitória = 3 | Empate = 1)
    partidas.forEach(p => {
        if (p.encerrada || p.status === 'FINALIZADO' || p.status === 'ended') {
            const scoreA = parseInt(p.score_a) || 0;
            const scoreB = parseInt(p.score_b) || 0;
            const nomeA = p.team_a?.nome || p.team_a || p.time_a;
            const nomeB = p.team_b?.nome || p.team_b || p.time_b;

            if (nomeA && !pontuacoes[nomeA]) pontuacoes[nomeA] = { nome: nomeA, pontos: 0 };
            if (nomeB && !pontuacoes[nomeB]) pontuacoes[nomeB] = { nome: nomeB, pontos: 0 };

            if (nomeA && nomeB) {
                if (scoreA > scoreB) pontuacoes[nomeA].pontos += 3;
                else if (scoreB > scoreA) pontuacoes[nomeB].pontos += 3;
                else {
                    pontuacoes[nomeA].pontos += 1;
                    pontuacoes[nomeB].pontos += 1;
                }
            }
        }
    });

    // Ordena o Ranking Final (Do Maior pro Menor)
    const rankingFinal = Object.values(pontuacoes).sort((a, b) => b.pontos - a.pontos);

    // ============================================
    // ATUALIZAÇÃO DA INTERFACE DO DASHBOARD
    // ============================================

    // Atualiza contadores dos Cards
    if (totalTimesEl) totalTimesEl.innerText = times.length || rankingFinal.length || 0;
    if (totalMatchesEl) totalMatchesEl.innerText = partidas.length || 0;

    // Atualiza a lista lateral de Ranking
    if (rankingListEl) {
        rankingListEl.innerHTML = '';
        if (rankingFinal.length === 0) {
            rankingListEl.innerHTML = '<li class="text-gray-500 py-4 text-center">Nenhum dado gerado ainda. Realize partidas.</li>';
        } else {
            rankingFinal.forEach((time, index) => {
                const li = document.createElement('li');
                li.className = "flex justify-between items-center bg-white p-3 mb-3 rounded-lg shadow-sm border-l-4 border-[#0C87D1]";
                li.innerHTML = `
                    <span class="font-bold text-[#193375] text-lg">${index + 1}º ${time.nome}</span>
                    <span class="bg-[#E91E8C] text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">${time.pontos} pts</span>
                `;
                rankingListEl.appendChild(li);
            });
        }
    }

    // Desenha e Plota os dados no Gráfico
    if (rankingChartCtx && window.Chart) {
        const labels = rankingFinal.slice(0, 5).map(t => t.nome);
        const data = rankingFinal.slice(0, 5).map(t => t.pontos);

        new Chart(rankingChartCtx, {
            type: 'bar',
            data: { 
                labels: labels, 
                datasets: [{ label: 'Pontuação (Top 5)', data: data, backgroundColor: '#0C87D1', borderRadius: 6 }] 
            },
            options: { 
                responsive: true, 
                plugins: { legend: { display: false } }, 
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } 
            }
        });
    }
});