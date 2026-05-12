create policy "liberar leitura teams"
on teams
for select
using (true);

create policy "admin pode editar teams"
on teams
for all
using (auth.role() = 'authenticated');