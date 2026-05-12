create or replace function atualizar_status()
returns trigger
language plpgsql
as $$

begin

    if new.gols_a is not null
    and new.gols_b is not null then

        new.status := 'FINALIZADO';

    end if;

    return new;

end;
$$;