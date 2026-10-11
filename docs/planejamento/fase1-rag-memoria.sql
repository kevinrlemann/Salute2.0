/* RASCUNHO, NÃO APLICADO. Plano da Fase 1 (base de conhecimento e memória da Renata). Não rodar em produção sem decisão do fundador. */
/* SALUTE IA, FASE 1: base de conhecimento e memória no Supabase Salute 02 */
/* Rode no SQL Editor do Supabase, bloco por bloco, na ordem abaixo. */
/* Antes de rodar: confirme se o campo clinicaid das suas tabelas atuais é do tipo uuid. */
/* Se for outro tipo (bigint, text), troque uuid pelo tipo certo em todo este arquivo. */


/* BLOCO 1: ativar a extensão de vetores */
create extension if not exists vector;


/* BLOCO 2: tabelas */

create table if not exists documentosclinica (
  id bigint generated always as identity primary key,
  clinicaid uuid not null,
  titulo text not null,
  categoria text,
  arquivourl text,
  status text not null default 'processando',
  mensagemerro text,
  criadoem timestamptz not null default now()
);

create table if not exists chunksclinica (
  id bigint generated always as identity primary key,
  clinicaid uuid not null,
  documentoid bigint not null references documentosclinica(id) on delete cascade,
  conteudo text not null,
  embedding vector(1536) not null,
  categoria text,
  criadoem timestamptz not null default now()
);

create table if not exists memoriapaciente (
  id bigint generated always as identity primary key,
  clinicaid uuid not null,
  telefone text not null,
  nome text,
  resumo text,
  ultimoprocedimento text,
  horariopreferido text,
  profissionalpreferido text,
  atualizadoem timestamptz not null default now(),
  unique (clinicaid, telefone)
);

create table if not exists mensagenshistorico (
  id bigint generated always as identity primary key,
  clinicaid uuid not null,
  telefone text not null,
  papel text not null,
  texto text not null,
  criadoem timestamptz not null default now()
);

create table if not exists logconsultasrag (
  id bigint generated always as identity primary key,
  clinicaid uuid not null,
  telefone text,
  pergunta text not null,
  chunksusados bigint[],
  melhordistancia double precision,
  respondeu boolean not null default false,
  criadoem timestamptz not null default now()
);


/* BLOCO 3: índices */

create index if not exists idxdocumentosclinica on documentosclinica (clinicaid);
create index if not exists idxchunksclinica on chunksclinica (clinicaid);
create index if not exists idxchunksdocumento on chunksclinica (documentoid);
create index if not exists idxmemoriapaciente on memoriapaciente (clinicaid, telefone);
create index if not exists idxmensagenshistorico on mensagenshistorico (clinicaid, telefone, criadoem desc);
create index if not exists idxlogconsultasrag on logconsultasrag (clinicaid, criadoem desc);

/* Índice vetorial. Os embeddings da OpenAI são normalizados, então a distância padrão */
/* ordena os resultados do mesmo jeito que a similaridade por cosseno. */
create index if not exists idxchunksvetor on chunksclinica using hnsw (embedding);


/* BLOCO 4: segurança por clínica (RLS) */
/* O n8n usa a chave de serviço, que ignora o RLS. */
/* Com o RLS ligado e sem política liberada, o front e a chave pública não leem nada destas tabelas. */
/* A política de leitura para o front depende de como seus usuários se ligam às clínicas. */
/* Veja o bloco opcional ao final. */

alter table documentosclinica enable row level security;
alter table chunksclinica enable row level security;
alter table memoriapaciente enable row level security;
alter table mensagenshistorico enable row level security;
alter table logconsultasrag enable row level security;


/* BLOCO 5: função de busca filtrada por clínica */
/* O filtro por clinicaid fica DENTRO da função. A Renata nunca recebe trecho de outra clínica. */

create or replace function buscarchunks(
  consultaembedding vector(1536),
  clinicaalvo uuid,
  quantidade int default 5
)
returns table (
  id bigint,
  documentoid bigint,
  conteudo text,
  categoria text,
  distancia double precision
)
language sql
stable
as $$
  select
    c.id,
    c.documentoid,
    c.conteudo,
    c.categoria,
    (c.embedding <-> consultaembedding)::double precision as distancia
  from chunksclinica c
  where c.clinicaid = clinicaalvo
  order by c.embedding <-> consultaembedding
  limit quantidade;
$$;


/* BLOCO 6 (opcional): política de leitura para o front */
/* Só rode depois de descobrir qual tabela liga o usuário logado à clínica. */
/* Exemplo, trocando usuariosclinica pelo nome real da sua tabela de vínculo: */
/*
create policy leituradocumentos on documentosclinica
  for select to authenticated
  using (clinicaid in (select clinicaid from usuariosclinica where userid = auth.uid()));
*/


/* BLOCO 7: testes */
/* Teste 1: confirmar que a extensão está ativa */
/* select extname from pg_extension where extname = 'vector'; */

/* Teste 2: inserir um documento e um trecho falso para duas clínicas diferentes, */
/* depois chamar buscarchunks com cada clinicaid e conferir que cada uma vê só o seu. */
