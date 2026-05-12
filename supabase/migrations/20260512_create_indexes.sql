create index idx_teams_grupo
on teams(grupo);

create index idx_matches_status
on matches(status);

create index idx_matches_fase
on matches(fase);

create index idx_players_team
on players(team_id);