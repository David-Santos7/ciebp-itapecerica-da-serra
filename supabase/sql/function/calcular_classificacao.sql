create or replace function calcular_classificacao()
returns void
language plpgsql
as $$

begin

    update teams
    set
        pontos = 0,
        jogos = 0,
        vitorias = 0,
        empates = 0,
        derrotas = 0,
        gols_pro = 0,
        gols_contra = 0,
        saldo = 0;

    update teams t
    set
        jogos = sub.jogos,
        vitorias = sub.vitorias,
        empates = sub.empates,
        derrotas = sub.derrotas,
        gols_pro = sub.gols_pro,
        gols_contra = sub.gols_contra,
        saldo = sub.saldo,
        pontos = sub.pontos
    from (

        select
            team_id,

            count(*) as jogos,

            sum(vitorias) as vitorias,

            sum(empates) as empates,

            sum(derrotas) as derrotas,

            sum(gols_pro) as gols_pro,

            sum(gols_contra) as gols_contra,

            sum(gols_pro - gols_contra) as saldo,

            sum(pontos) as pontos

        from (

            select
                time_a as team_id,

                case when gols_a > gols_b then 1 else 0 end as vitorias,

                case when gols_a = gols_b then 1 else 0 end as empates,

                case when gols_a < gols_b then 1 else 0 end as derrotas,

                gols_a as gols_pro,

                gols_b as gols_contra,

                case
                    when gols_a > gols_b then 3
                    when gols_a = gols_b then 1
                    else 0
                end as pontos

            from matches

            where status = 'FINALIZADO'

            union all

            select
                time_b as team_id,

                case when gols_b > gols_a then 1 else 0 end,

                case when gols_b = gols_a then 1 else 0 end,

                case when gols_b < gols_a then 1 else 0 end,

                gols_b,

                gols_a,

                case
                    when gols_b > gols_a then 3
                    when gols_b = gols_a then 1
                    else 0
                end

            from matches

            where status = 'FINALIZADO'

        ) resultados

        group by team_id

    ) sub

    where t.id = sub.team_id;

end;
$$;