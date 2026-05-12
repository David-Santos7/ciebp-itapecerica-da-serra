create trigger atualizar_status_trigger
before insert or update on matches
for each row
execute function atualizar_status();