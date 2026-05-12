create policy "liberar leitura players"
on players
for select
using (true);

create policy "admin pode editar players"
on players
for all
using (auth.role() = 'authenticated');