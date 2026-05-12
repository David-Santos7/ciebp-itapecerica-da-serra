create table if not exists matches (

    id bigint generated always as identity primary key,

    time_a bigint references teams(id) on delete cascade,

    time_b bigint references teams(id) on delete cascade,

    gols_a integer default 0,

    gols_b integer default 0,

    rodada integer,

    fase text,

    status text default 'AGENDADO',

    data_partida timestamptz,

    created_at timestamptz default now()
);