-- A Renata do sistema conversa com a equipe sobre pacientes; o que é proibido é passar dados para quem não é da equipe.
alter table public.agente_ia alter column nao_pode_falar set default array[
  'Diagnósticos ou prescrição de medicamentos',
  'Preços que não estejam na tabela da clínica',
  'Dados de um paciente para quem não é da equipe ou para outro paciente',
  'Política, religião ou assuntos fora da clínica',
  'Promessas de resultado garantido'];
update public.agente_ia
   set nao_pode_falar = array_replace(nao_pode_falar, 'Dados de outros pacientes', 'Dados de um paciente para quem não é da equipe ou para outro paciente')
 where 'Dados de outros pacientes' = any(nao_pode_falar);
