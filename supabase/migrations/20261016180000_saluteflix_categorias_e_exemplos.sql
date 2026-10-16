-- Saluteflix: categorias fixas (Técnico, Comercial, Gestão, Marketing, Sistema) e conteúdos de exemplo
-- (só capa e informações; os vídeos serão enviados depois pela equipe da Salute). Conteúdo global: clinica_id nulo.
insert into flix_categorias (nome, ordem)
select v.nome, v.ordem
from (values ('Técnico', 1), ('Comercial', 2), ('Gestão', 3), ('Marketing', 4), ('Sistema', 5)) v(nome, ordem)
where not exists (select 1 from flix_categorias c where c.nome = v.nome and c.excluido_em is null);

insert into flix_conteudos (titulo, tipo, categoria_id, descricao, quantidade_aulas, duracao, cores_capa, icone, destaque, publicado, ordem)
select v.titulo, v.tipo::tipo_conteudo_flix, c.id, v.descricao, v.aulas, v.duracao, v.cores, v.icone, v.destaque, true, v.ordem
from (values
  ('Toxina botulínica: protocolos e pontos de marcação', 'curso', 'Técnico', 'Anatomia aplicada, diluição, pontos de aplicação e manejo de intercorrências.', 18, '4h 15min', array['#7B4BC4','#4F7BE6'], 'syringe', true, 1),
  ('Preenchimento com ácido hialurônico: segurança primeiro', 'curso', 'Técnico', 'Planos de aplicação, zonas de risco vascular e conduta em caso de oclusão.', 14, '3h 30min', array['#0A2A8F','#22C3F2'], 'shield-check', false, 2),
  ('Clareamento dental: do diagnóstico ao resultado', 'curso', 'Técnico', 'Indicações, protocolos de consultório e caseiro, sensibilidade e manutenção.', 9, '2h 10min', array['#0B4BEB','#22C3F2'], 'smile', false, 3),
  ('Atendimento que converte no WhatsApp', 'curso', 'Comercial', 'Roteiros de resposta, quebra de objeções e como levar o lead até o agendamento.', 12, '2h 40min', array['#0B4BEB','#22C3F2'], 'message-circle', false, 4),
  ('Venda de pacotes e planos de tratamento', 'curso', 'Comercial', 'Como montar, apresentar e fechar pacotes sem dar desconto no primeiro não.', 8, '1h 50min', array['#1E8E4E','#2DBF6A'], 'hand-coins', false, 5),
  ('Gestão financeira para clínicas', 'curso', 'Gestão', 'Fluxo de caixa, precificação por hora clínica, comissões e controle de inadimplência.', 10, '2h 30min', array['#B98400','#F2C94C'], 'wallet', false, 6),
  ('Equipe e processos: a clínica rodando sem o dono', 'curso', 'Gestão', 'Rotinas, checklists, metas por função e reuniões semanais que funcionam.', 7, '1h 45min', array['#0A2A8F','#7B4BC4'], 'users', false, 7),
  ('Instagram para clínicas: conteúdo que gera agendamento', 'curso', 'Marketing', 'Linha editorial, antes e depois dentro das regras, stories e anúncios locais.', 11, '2h 20min', array['#D6336C','#F28CB1'], 'megaphone', false, 8),
  ('Google e avaliações: ser encontrado na sua cidade', 'curso', 'Marketing', 'Perfil da empresa no Google, pedidos de avaliação e resposta a comentários.', 6, '1h 20min', array['#1F5EFF','#22C3F2'], 'map-pin', false, 9),
  ('Primeiros passos na Salute', 'curso', 'Sistema', 'Cadastro da clínica, equipe, agenda, pacientes e prontuário em 40 minutos.', 8, '40min', array['#0B4BEB','#7B4BC4'], 'rocket', false, 10),
  ('Renata e o Agente de IA no WhatsApp', 'curso', 'Sistema', 'Como configurar a assistente, o atendimento automático e os lembretes de consulta.', 6, '55min', array['#0A2A8F','#0B4BEB'], 'bot', false, 11),
  ('Consultoria de precificação', 'servico', 'Gestão', 'Revisão da tabela de procedimentos com a equipe da Salute, em uma sessão ao vivo.', 0, 'Sob consulta', array['#0A2A8F','#22C3F2'], 'briefcase-business', false, 12),
  ('Criação de identidade visual da clínica', 'servico', 'Marketing', 'Logo, paleta e modelos de post feitos por parceiros da Salute.', 0, 'Sob consulta', array['#7B4BC4','#D6336C'], 'palette', false, 13)
) v(titulo, tipo, categoria, descricao, aulas, duracao, cores, icone, destaque, ordem)
join flix_categorias c on c.nome = v.categoria and c.excluido_em is null
where not exists (select 1 from flix_conteudos f where f.titulo = v.titulo and f.excluido_em is null);
