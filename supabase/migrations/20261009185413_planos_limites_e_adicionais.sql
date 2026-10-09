-- Limites por plano e valores adicionais (cobrados à parte quando a clínica passa do limite).
-- Por enquanto são informativos (aparecem na tela Plano e cobrança); a cobrança automática ainda não existe.

alter table public.planos add column if not exists limite_usuarios integer;
alter table public.planos add column if not exists limite_profissionais integer;
alter table public.planos add column if not exists preco_implantacao numeric(10,2);
alter table public.planos add column if not exists preco_anual numeric(10,2);

update public.planos set limite_usuarios = 5,  limite_profissionais = 3,  preco_implantacao = 0,    preco_anual = 1970 where codigo = 'inicial';
update public.planos set limite_usuarios = 10, limite_profissionais = 6,  preco_implantacao = 297,  preco_anual = 3970 where codigo = 'assistente';
update public.planos set limite_usuarios = 20, limite_profissionais = 10, preco_implantacao = 997,  preco_anual = 9970 where codigo = 'iapro';
update public.planos set limite_usuarios = null, limite_profissionais = null, preco_implantacao = 2997, preco_anual = null where codigo = 'enterprise';

create table if not exists public.planos_adicionais (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid references public.clinicas(id) on delete restrict,   -- nulo = vale para todas as clínicas
  codigo text not null unique,
  nome text not null,
  descricao text,
  preco numeric(10,2),                                                  -- nulo = sob consulta
  cobranca text not null default 'mensal' check (cobranca in ('mensal', 'pacote', 'sob_consulta')),
  quantidade integer,                                                   -- ex.: 2000 mensagens por pacote
  planos text[] not null default '{}',                                  -- códigos dos planos em que está disponível
  ordem integer not null default 0,
  ativo boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  criado_por uuid references public.perfis_usuario(id) on delete set null,
  excluido_em timestamptz
);
alter table public.planos_adicionais enable row level security;

do $do$
begin
  if not exists (select 1 from pg_policies where tablename = 'planos_adicionais' and policyname = 'planos_adicionais_ler') then
    create policy planos_adicionais_ler on public.planos_adicionais for select to authenticated using (clinica_id is null);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'planos_adicionais' and policyname = 'planos_adicionais_criar') then
    create policy planos_adicionais_criar on public.planos_adicionais for insert to authenticated with check ((select public.eh_admin_plataforma()));
  end if;
  if not exists (select 1 from pg_policies where tablename = 'planos_adicionais' and policyname = 'planos_adicionais_editar') then
    create policy planos_adicionais_editar on public.planos_adicionais for update to authenticated
      using ((select public.eh_admin_plataforma())) with check ((select public.eh_admin_plataforma()));
  end if;
end $do$;

create or replace trigger tg_planos_adicionais_atualizado before update on public.planos_adicionais
  for each row execute function public.tocar_atualizado_em();

insert into public.planos_adicionais (codigo, nome, descricao, preco, cobranca, quantidade, planos, ordem) values
  ('usuario_extra',      '+1 usuário',                     'Acima do limite de usuários do plano.',                          19,  'mensal', 1,    array['inicial','assistente','iapro'], 1),
  ('profissional_extra', '+1 profissional com agenda',     'Acima do limite de profissionais do plano.',                     29,  'mensal', 1,    array['inicial','assistente','iapro'], 2),
  ('renata_500',         '+500 perguntas para a Renata',   'Quando a Renata chega ao limite do mês.',                        49,  'pacote', 500,  array['assistente','iapro'], 3),
  ('mensagens_ia_2000',  '+2.000 mensagens de IA',         'Quando a IA do WhatsApp chega ao limite do mês.',                97,  'pacote', 2000, array['iapro','enterprise'], 4),
  ('voz_60',             '+60 minutos de voz da Renata',   'Quando acabam os minutos de voz do mês.',                        49,  'pacote', 60,   array['assistente','iapro','enterprise'], 5),
  ('whatsapp_numero',    '+1 número de WhatsApp',          'Outro número da clínica no mesmo sistema.',                      97,  'mensal', 1,    array['iapro','enterprise'], 6),
  ('unidade',            '+1 unidade (filial)',            'Outra unidade com agenda, equipe e WhatsApp próprios.',          497, 'mensal', 1,    array['enterprise'], 7),
  ('armazenamento_25',   '+25 GB de armazenamento',        'Para fotos, exames e documentos.',                               29,  'mensal', 25,   array['inicial','assistente','iapro','enterprise'], 8),
  ('zapi',               'Z-API no lugar da Evolution',    'Conexão do WhatsApp gerenciada pela Z-API.',                     119, 'mensal', 1,    array['inicial','assistente','iapro','enterprise'], 9),
  ('meta_oficial',       'WhatsApp oficial da Meta',       'Custo das mensagens da Meta + 20%.',                             null,'sob_consulta', null, array['enterprise'], 10)
on conflict (codigo) do nothing;
