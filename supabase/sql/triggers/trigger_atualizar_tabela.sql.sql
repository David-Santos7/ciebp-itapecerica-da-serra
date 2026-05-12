create or replace function trigger_recalcular_tabela()
returns trigger
language plpgsql
as $$

begin

    perform calcular_classificacao();

    return new;

end;
$$;

create trigger recalcular_tabela_trigger
after insert or update on matches
for each row
execute function trigger_recalcular_tabela();