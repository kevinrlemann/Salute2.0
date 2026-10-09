-- S1 (crítico): sequestro de convite.
-- Todo cadastro nascia com e-mail "confirmado" e era ligado na hora aos convites
-- pendentes daquele e-mail. Sem a auto-confirmação, o convite só é ligado quando a
-- pessoa confirma o e-mail de verdade (gatilho usuario_atualizado → ligar_convites).
-- O front já trata o fluxo "enviamos um email de confirmação".
drop trigger if exists on_auth_user_created_auto_confirm on auth.users;
drop function if exists public.auto_confirmar_email();
