create or replace function gerar_chaveamento()
returns void as $$
declare
    teams text[];
    total int;
    size int := 1;
    i int;
    match_id int := 1;
begin
    -- pegar times
    select array_agg(time) into teams from futebol_robos;
    total := array_length(teams, 1);

    -- calcular potência de 2
    while size < total loop
        size := size * 2;
    end loop;

    -- limpar tabela antiga
    delete from matches;

    -- preencher com BYE
    while array_length(teams, 1) < size loop
        teams := array_append(teams, 'BYE');
    end loop;

    -- criar primeira rodada
    for i in 1..size by 2 loop
        insert into matches (
            round_number,
            match_number,
            team_a,
            team_b
        )
        values (
            1,
            match_id,
            teams[i],
            teams[i+1]
        );

        match_id := match_id + 1;
    end loop;

end;
$$ language plpgsql;