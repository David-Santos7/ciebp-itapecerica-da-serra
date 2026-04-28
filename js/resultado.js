import supabase from './supabase.js'

async function carregarResultados() {
    const { data, error } = await supabase
        .from('partidas_chaveamento')
        .select(`
            id,
            rodada,
            vencedor_id,
            equipe_a:equipes!equipe_a_id(nome),
            equipe_b:equipes!equipe_b_id(nome)
        `)

    if (error) return console.error(error)

    renderizarResultados(data)
}

function renderizarResultados(jogos) {
    const grid = document.getElementById('games-grid')
    grid.innerHTML = ''

    jogos.forEach(j => {
        grid.innerHTML += `
            <div>
                <p>${j.equipe_a?.nome || '-'}</p>
                <p>vs</p>
                <p>${j.equipe_b?.nome || '-'}</p>
                <p>Vencedor: ${j.vencedor_id || '---'}</p>
            </div>
        `
    })
}

carregarResultados()