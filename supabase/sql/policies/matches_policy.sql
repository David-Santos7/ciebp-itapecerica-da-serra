
create policy "liberar leitura matches"
on matches
for select
using (true);

create policy "admin pode editar matches"
on matches
for all
using (auth.role() = 'authenticated');