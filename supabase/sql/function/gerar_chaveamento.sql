create or replace function gerar_semifinais()
returns void
language plpgsql
as $$

declare
    primeiro_a bigint;
    segundo_a bigint;
    primeiro_b bigint;
    segundo_b bigint;

begin

    select id into primeiro_a
    from teams
    where grupo = 'A'
    order by pontos desc, saldo desc
    limit 1;

    select id into segundo_a
    from teams
    where grupo = 'A'
    order by pontos desc, saldo desc
    offset 1 limit 1;

    select id into primeiro_b
    from teams
    where grupo = 'B'
    order by pontos desc, saldo desc
    limit 1;

    select id into segundo_b
    from teams
    where grupo = 'B'
    order by pontos desc, saldo desc
    offset 1 limit 1;

    insert into matches (
        time_a,
        time_b,
        fase,
        status
    )
    values
    (primeiro_a, segundo_b, 'SEMIFINAL', 'AGENDADO'),
    (primeiro_b, segundo_a, 'SEMIFINAL', 'AGENDADO');

end;
$$;