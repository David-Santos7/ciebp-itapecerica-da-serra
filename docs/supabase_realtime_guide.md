**Guia rápido: integrar Realtime do Supabase nas páginas (dashboard.html, aovivo.html, tabela.html)**

Resumo: usar `supabase-js` channel/subscription para escutar mudanças nas tabelas `matches`, `teams` e `players` e atualizar a UI chamando as funções existentes que já preenchem as páginas.

1) Pré-requisitos
- Ter a `anon` key (publishable) configurada no frontend (`js/config/supabase.js`).
- Realtime/publication habilitado para as tabelas no painel Supabase (ver `Realtime` → `Publications`).
- RLS configurado para permitir SELECT via anon (ou ajustar conforme regras de negócio).

2) Exemplo de snippet para inclusão nas páginas JS (adaptar ao projeto)

Importar a instância já exportada em `js/config/supabase.js` (o repositório já exporta `db`):

```js
import { db } from '../config/supabase.js'
import { buscarClassificacao } from '../service/tabelaService.js' // exemplo para tabela
import { buscarPartidas } from '../service/partidaService.js' // exemplo para resultados

// Subscrição para mudanças na tabela `matches`
const matchesChannel = db.channel('public:matches')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, (payload) => {
    // payload contém record, old_record, etc.
    // Chamar função que atualiza a UI — ex.: recarregar tabela de classificação e resultados
    buscarClassificacao().then(renderTabela).catch(console.error)
    buscarPartidas().then(renderResultados).catch(console.error)
  })
  .subscribe()

// Subscrição para mudanças em teams (se precisar atualizar nomes/logos)
const teamsChannel = db.channel('public:teams')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'teams' }, (payload) => {
    buscarClassificacao().then(renderTabela).catch(console.error)
  })
  .subscribe()

// Exemplo de handlers de render — adapte ao HTML do projeto
function renderTabela(dados) {
  const tabela = document.getElementById('tabela')
  tabela.innerHTML = ''
  dados.forEach((time, index) => {
    tabela.innerHTML += `...` // mesmo markup atual
  })
}

function renderResultados(partidas) {
  const container = document.getElementById('resultados')
  container.innerHTML = ''
  partidas.forEach(p => { /* render */ })
}

// Opcional: unsubscribes ao sair da página
window.addEventListener('beforeunload', () => {
  matchesChannel.unsubscribe()
  teamsChannel.unsubscribe()
})
```

3) Notas importantes
- Use somente a `anon` key no cliente. Não exponha `service_role` no frontend.
- Se quiser restringir alterações para admins, crie RPCs com `security definer` e chame-os a partir de um backend seguro.
- Se os eventos em massa forem gerados (muitos updates), considere debounce/throttle nas atualizações da UI e buscar dados por página em vez de recarregar tudo.

4) Testes locais
- Abra `tabela.html` no navegador com console aberto.
- No Supabase Studio, atualize manualmente um `match` (por exemplo `status='FINALIZADO'` ou alterar gols) — você deve ver o browser receber o evento e a UI atualizar.

5) Correções já aplicadas no repositório
- Corrigi `js/config/supabase.js` para usar `SUPABASE_ANON_KEY` corretamente.
- Corrigi imports em `js/pages/tabela.js` e `js/pages/resultado.js` para apontarem para `js/service/*`.

6) Exemplos de troubleshooting
- Se não receber events: verifique `Realtime` → `Logs` no painel, verifique se publication inclui a tabela.
- Se receber evento mas UI não atualiza: confirme que `renderTabela`/`renderResultados` existem e atualizam DOM.

---
Se quiser, eu adapto e gero o snippet final pronto para colar dentro de cada arquivo `js/pages/*.js` conforme o layout atual (posso criar pequenas funções `initRealtimeTabela()`, `initRealtimeAovivo()` e `initRealtimeDashboard()` e injetá-las nas páginas).