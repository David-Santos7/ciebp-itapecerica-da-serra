-- =============================
-- TABELA DE TIMES
-- =============================
create table if not exists futebol_robos (
  id bigint generated always as identity primary key,
  escola text not null,
  time text not null,
  created_at timestamptz default now()
);

-- =============================
-- TABELA DE PARTIDAS (CHAVEAMENTO)
-- =============================
create table if not exists matches (
  id bigint generated always as identity primary key,
  round_number int not null,
  match_number int not null,

  team_a text,
  team_b text,

  winner text,

  next_match_id bigint references matches(id),
  position_in_next_match text, -- 'top' ou 'bottom'

  created_at timestamptz default now()
);

-- =============================
-- LIBERAR ACESSO (RLS)
-- =============================
alter table futebol_robos enable row level security;
alter table matches enable row level security;

create policy "liberar tudo times"
on futebol_robos for all using (true);

create policy "liberar tudo matches"
on matches for all using (true);