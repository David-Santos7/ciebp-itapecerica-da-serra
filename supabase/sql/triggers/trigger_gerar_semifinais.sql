create or replace function verificar_fim_grupos()
returns trigger
language plpgsql
as $$

declare
    total_partidas integer;
    finalizadas integer;

begin

    select count(*)
    into total_partidas
    from matches
    where fase = 'GRUPOS';

    select count(*)
    into finalizadas
    from matches
    where fase = 'GRUPOS'
    and status = 'FINALIZADO';

    if total_partidas = finalizadas then

        perform gerar_semifinais();

    end if;

    return new;

end;
$$;

create trigger gerar_semifinais_trigger
after update on matches
for each row
execute function verificar_fim_grupos();