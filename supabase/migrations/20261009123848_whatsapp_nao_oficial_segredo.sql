-- WhatsApp não oficial: salvar a chave do provedor marca a instância como configurada (igual à Meta)
do $do$
declare v text; n text;
begin
  v := pg_get_functiondef('public.salvar_segredo(uuid,provedor_integracao,text)'::regprocedure);
  if position($a$elsif p_provedor = 'whatsapp_meta' then update public.instancias_whatsapp$a$ in v) > 0 then
    n := replace(v, $a$elsif p_provedor = 'whatsapp_meta' then update public.instancias_whatsapp$a$,
                    $b$elsif p_provedor in ('whatsapp_meta', 'whatsapp_nao_oficial') then update public.instancias_whatsapp$b$);
    execute n;
  end if;
end $do$;
