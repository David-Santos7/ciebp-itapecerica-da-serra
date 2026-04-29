create table if not exists futebol_robos (
  id bigint generated always as identity primary key,
  escola text not null,
  time text not null
);

create table if not exists matches (
  id bigint generated always as identity primary key,
  round_number int,
  match_number int,
  team_a text,
  team_b text,
  winner text,

  -- ✅ ADICIONADO
  parent_match_id bigint,
  slot_in_parent text
);

alter table futebol_robos enable row level security;
alter table matches enable row level security;

create policy "liberar tudo times"
on futebol_robos for all using (true);

create policy "liberar tudo matches"
on matches for all using (true);