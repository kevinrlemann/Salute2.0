-- Painel: o funil (cumulativo) continua sem a etapa "Perdido"; passa a devolver quantos
-- leads do mês foram perdidos, para aparecer ao lado da conversão.
do $$
declare v_def text := pg_get_functiondef('public.painel_mes'::regproc);
        v_alvo text := '''anterior'', (select count(*) from ld where criado_em >= v_ini_ant and criado_em < v_ini),';
begin
  if position(v_alvo in v_def) = 0 then raise exception 'painel_mes: trecho do funil não encontrado'; end if;
  if position('''perdidos''' in v_def) > 0 then return; end if;
  execute replace(v_def, v_alvo, v_alvo || '
      ''perdidos'', (select count(*) from ldm where tipo_final = ''perdido''),');
end $$;
