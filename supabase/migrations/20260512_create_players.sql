create table if not exists players (

    id bigint generated always as identity primary key,

    nome text not null,

    numero integer,

    posicao text,

    gols integer default 0,

    assistencias integer default 0,

    team_id bigint references teams(id) on delete cascade,

    created_at timestamptz default now()
);