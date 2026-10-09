-- Certificações que a Salute já exibia (os logos ficam no próprio front e entram quando não há logo enviado)
-- e a Nexus como parceira de marketing. Conteúdo global: clinica_id nulo, visível para todas as clínicas.
insert into public.selos_certificacoes (nome, categoria, descricao, icone, logo_espacamento, ordem)
select v.nome, v.categoria, v.descricao, v.icone, v.esp, v.ordem
  from (values
    ('Startup Brasil', 'Programa', 'Selecionada pelo programa Startup Brasil do Ministério da Ciência, Tecnologia e Inovações.', 'rocket', null, 1),
    ('AWS Certified', 'Infraestrutura', 'Infraestrutura certificada pela Amazon Web Services, garantindo escalabilidade, segurança e alta disponibilidade.', 'server', '2px', 2),
    ('LGPD / GDPR Compliance', 'Conformidade', 'Em conformidade com a Lei Geral de Proteção de Dados (LGPD) e o Regulamento Geral de Proteção de Dados (GDPR).', 'shield-check', null, 3),
    ('Microsoft Partner', 'Parceria', 'Parceiro certificado Microsoft com expertise em soluções de nuvem e produtividade corporativa.', 'cloud', null, 4),
    ('Meta Business Partner', 'Parceria', 'Parceiro oficial da Meta para soluções de marketing e atendimento via WhatsApp, Instagram e Facebook.', 'messages-square', null, 5)
  ) as v(nome, categoria, descricao, icone, esp, ordem)
 where not exists (select 1 from public.selos_certificacoes s where s.clinica_id is null and s.nome = v.nome and s.excluido_em is null);

insert into public.parceiros (nome, categoria, beneficio, oficial, ordem)
select 'Nexus', 'Marketing', 'Parceira oficial de marketing da Salute', true, 1
 where not exists (select 1 from public.parceiros p where p.clinica_id is null and p.nome = 'Nexus' and p.excluido_em is null);
