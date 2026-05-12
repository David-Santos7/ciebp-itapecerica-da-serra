**SQL pronto para aplicar (painel Supabase)**

- Arquivo com o SQL pronto: `supabase/sql/apply_20260513_compat.sql`

Passos (Studio — manual):
1. Abra o Supabase Studio do seu projeto.
2. Vá em `SQL Editor` → `New Query`.
3. Cole todo o conteúdo de `supabase/sql/apply_20260513_compat.sql` no editor.
4. Execute (Run). Aguarde confirmação.

O que este script faz:
- Adiciona colunas geradas compatíveis (`team_a`, `team_b`, `encerrada`) que espelham `time_a`, `time_b` e `status='FINALIZADO'`.
- Adiciona constraints FK (se não existirem) para `team_a` e `team_b`.
- Cria uma função wrapper `gerar_chaveamento()` que chama a função existente `gerar_semifinais()` (assim o frontend que chama `gerar_chaveamento` continuará funcionando).
- Cria índices úteis para queries e realtime.

Verificações após aplicar:
- No `Table Editor`, abra `matches` e confirme que as colunas `team_a`, `team_b`, `encerrada` foram criadas (as colunas geradas aparecerão e refletirão os valores de `time_a/time_b/status`).
- Abra `SQL Editor` e execute `select * from classificacao_view limit 5;` — a view já foi ajustada no repositório e deve refletir os dados.
- No `SQL Editor`, rode `select gerar_chaveamento();` para testar o wrapper RPC — verifique se novos `matches` de semifinal são inseridos.

Rollback / segurança:
- Faça backup antes (export SQL ou snapshot do DB) se for produção.
- Para reverter, remova as colunas e a função manualmente ou restaure o backup.

Notas:
- Preferível aplicar primeiro em staging/local via Supabase CLI (ex.: `supabase db push` ou `supabase db reset` conforme fluxo) antes de produção.
