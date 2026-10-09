-- Precificação em 4 planos (decisão do fundador, 2026-10-09):
-- Inicial R$ 197 (gestão + WhatsApp, sem IA) · Assistente R$ 397 (Renata dentro do sistema)
-- IA Pro R$ 997 (IA no WhatsApp, 10 mil mensagens) · Enterprise a partir de R$ 1.997 (sob consulta)
-- limite_mensagens_ia: 0 = sem IA no plano; null = sob medida (definido por clínica em renata_consumo).

update public.planos set
  nome = 'Inicial', ordem = 1, preco_mensal = 197, destaque = false, limite_mensagens_ia = 0,
  descricao = 'Gestão completa da clínica com o WhatsApp no mesmo lugar.',
  itens = array['Pacientes, prontuário e agenda', 'Anamnese com assinatura digital', 'Financeiro, estoque e CRM de leads',
                'WhatsApp da clínica no sistema (1 número)', 'Até 3 profissionais e 5 usuários', 'Saluteflix e Salute Cast']
where codigo = 'inicial';

insert into public.planos (codigo, nome, ordem, preco_mensal, destaque, limite_mensagens_ia, percentual_aviso_limite, ativo, descricao, itens)
select 'assistente', 'Assistente', 2, 397, false, 1500, 80, true,
       'A Renata IA ajuda a equipe dentro do sistema.',
       array['Tudo do plano Inicial', 'Renata IA dentro do sistema (1.500 perguntas por mês)', 'Renata por voz (60 minutos por mês)',
             'Lembretes automáticos de consulta', 'Envio automático de anamnese e documentos', 'Até 6 profissionais e 10 usuários']
where not exists (select 1 from public.planos where codigo = 'assistente');

update public.planos set
  nome = 'IA Pro', ordem = 3, preco_mensal = 997, destaque = true, limite_mensagens_ia = 10000,
  descricao = 'A Renata IA atende, agenda e confirma pelo WhatsApp.',
  itens = array['Tudo do plano Assistente', 'IA atendendo no WhatsApp 24 horas', 'Até 10 mil mensagens de IA por mês',
                'Agendamento, confirmação e follow-up automáticos', 'CRM que anda sozinho', 'Até 10 profissionais e 20 usuários']
where codigo = 'iapro';

update public.planos set
  nome = 'Enterprise', ordem = 4, preco_mensal = null, destaque = false, limite_mensagens_ia = null,
  descricao = 'A partir de R$ 1.997 por mês. Para redes, várias unidades e alto volume.',
  itens = array['Tudo do plano IA Pro', '30 mil mensagens de IA ou mais por mês', 'Várias unidades e várias IAs',
                'API oficial do WhatsApp (Meta)', 'Consultor dedicado e suporte com prazo', 'Profissionais e usuários sem limite']
where codigo = 'enterprise';
