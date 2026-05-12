create table if not exists teams (
    id bigint generated always as identity primary key,

    nome text not null,

    grupo text not null,

    logo text,

    pontos integer default 0,

    jogos integer default 0,

    vitorias integer default 0,

    empates integer default 0,

    derrotas integer default 0,

    gols_pro integer default 0,

    gols_contra integer default 0,

    saldo integer default 0,

    created_at timestamptz default now()
);