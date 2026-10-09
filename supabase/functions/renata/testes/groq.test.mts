// Rodar: cp supabase/functions/renata/groq.ts /tmp/groq.mts && sed "s#../groq.ts#/tmp/groq.mts#" supabase/functions/renata/testes/groq.test.mts > /tmp/t.mts && npx tsx /tmp/t.mts
import { eventosClaude, paraGroq, chamarGroq, GROQ_MODELOS } from '../groq.ts';
import assert from 'node:assert/strict';

// leitor igual ao do front (1b7a2c45…js, linhas ~2792-2910)
async function lerComoFront(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader(), dec = new TextDecoder();
  let buf = '', stop: string | null = null, texto = '';
  const blocks: any[] = [];
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let k;
    while ((k = buf.indexOf('\n\n')) >= 0) {
      const ev = buf.slice(0, k); buf = buf.slice(k + 2);
      const line = ev.split('\n').find((l) => l.startsWith('data:'));
      if (!line) continue;
      const d = JSON.parse(line.slice(5).trim());
      if (d.type === 'content_block_start') blocks[d.index] = { ...d.content_block, text: d.content_block.text || '', json: '' };
      else if (d.type === 'content_block_delta' && blocks[d.index]) {
        if (d.delta.type === 'text_delta') { blocks[d.index].text += d.delta.text; texto += d.delta.text; }
        else if (d.delta.type === 'input_json_delta') blocks[d.index].json += d.delta.partial_json;
      } else if (d.type === 'message_delta') stop = d.delta && d.delta.stop_reason;
      else if (d.type === 'error') throw new Error('erro ' + JSON.stringify(d));
    }
  }
  const content = blocks.filter(Boolean).map((b) => b.type === 'text' ? { type: 'text', text: b.text } : { type: 'tool_use', id: b.id, name: b.name, input: JSON.parse(b.json || '{}') });
  return { stop, texto, content };
}

function sse(chunks: object[], done = true) {
  const enc = new TextEncoder();
  const linhas = chunks.map((c) => `data: ${JSON.stringify(c)}\n\n`).concat(done ? ['data: [DONE]\n\n'] : []).join('');
  // quebra em pedaços pequenos para testar o buffer
  const partes: Uint8Array[] = []; const b = enc.encode(linhas);
  for (let i = 0; i < b.length; i += 37) partes.push(b.slice(i, i + 37));
  return new ReadableStream<Uint8Array>({ start(c) { partes.forEach((p) => c.enqueue(p)); c.close(); } });
}

async function rodar(nome: string, chunks: object[], done = true) {
  let uso: number[] = [];
  const r = await lerComoFront(sse(chunks, done).pipeThrough(eventosClaude((a, b) => { uso = [a, b]; })));
  console.log('✓', nome, JSON.stringify({ ...r, uso }));
  return { ...r, uso };
}

// 1) só texto
const t1 = await rodar('texto', [
  { choices: [{ index: 0, delta: { role: 'assistant', content: 'Olá, ' } }] },
  { choices: [{ index: 0, delta: { content: 'Kevin!' } }] },
  { choices: [{ index: 0, delta: {}, finish_reason: 'stop' }] },
  { choices: [], usage: { prompt_tokens: 120, completion_tokens: 6 } },
]);
assert.equal(t1.texto, 'Olá, Kevin!'); assert.equal(t1.stop, 'end_turn'); assert.deepEqual(t1.uso, [120, 6]);

// 2) ferramenta inteira num pedaço (jeito do Gemini), finish 'stop'
const t2 = await rodar('ferramenta inteira', [
  { choices: [{ index: 0, delta: { role: 'assistant', tool_calls: [{ index: 0, id: 'fc_1', type: 'function', function: { name: 'agenda_do_dia', arguments: '{"data":"2026-10-09"}' } }] }, finish_reason: 'stop' }] },
  { id: 'x', choices: [], x_groq: { usage: { prompt_tokens: 300, completion_tokens: 20 } } },
]);
assert.equal(t2.stop, 'tool_use'); assert.deepEqual(t2.content, [{ type: 'tool_use', id: 'fc_1', name: 'agenda_do_dia', input: { data: '2026-10-09' } }]);

// 3) texto + duas ferramentas em pedaços (jeito OpenAI), sem id nos pedaços seguintes
const t3 = await rodar('texto + 2 ferramentas em pedaços', [
  { choices: [{ index: 0, delta: { content: 'Vou consultar.' } }] },
  { choices: [{ index: 0, delta: { tool_calls: [{ index: 0, id: 'a', function: { name: 'estoque', arguments: '{"prod' } }] } }] },
  { choices: [{ index: 0, delta: { tool_calls: [{ index: 0, function: { arguments: 'uto":"botox"}' } }] } }] },
  { choices: [{ index: 0, delta: { tool_calls: [{ index: 1, id: 'b', function: { name: 'financeiro', arguments: '{}' } }] } }] },
  { choices: [{ index: 0, delta: {}, finish_reason: 'tool_calls' }] },
]);
assert.equal(t3.stop, 'tool_use'); assert.equal(t3.content.length, 3);
assert.deepEqual(t3.content[1], { type: 'tool_use', id: 'a', name: 'estoque', input: { produto: 'botox' } });
assert.equal(t3.content[2].name, 'financeiro');

// 4) stream sem [DONE] (flush encerra)
const t4 = await rodar('sem [DONE]', [{ choices: [{ index: 0, delta: { content: 'ok' }, finish_reason: 'stop' }] }], false);
assert.equal(t4.texto, 'ok'); assert.equal(t4.stop, 'end_turn');

// 5) conversão do pedido: sistema, ferramentas, rodada com tool_result
const corpo = paraGroq({
  system: [{ type: 'text', text: 'Você é a Renata.' }],
  max_tokens: 1400,
  tools: [{ name: 'estoque', description: 'Consulta estoque', input_schema: { type: 'object', $schema: 'x', additionalProperties: false, properties: { produto: { type: ['string', 'null'], description: 'nome', default: '' } }, required: ['produto'] } }],
  messages: [
    { role: 'user', content: 'Tem botox?' },
    { role: 'assistant', content: [{ type: 'text', text: 'Vou ver.' }, { type: 'tool_use', id: 'a', name: 'estoque', input: { produto: 'botox' } }] },
    { role: 'user', content: [{ type: 'tool_result', tool_use_id: 'a', content: '{"saldo":3}' }] },
  ],
}) as any;
assert.equal(corpo.messages[0].role, 'system');
assert.equal(corpo.messages[2].tool_calls[0].function.arguments, '{"produto":"botox"}');
assert.deepEqual(corpo.messages[3], { role: 'tool', tool_call_id: 'a', content: '{"saldo":3}' });
assert.equal(corpo.model, undefined);
assert.deepEqual(corpo.tools[0].function.parameters, { type: 'object', properties: { produto: { type: 'string', nullable: true, description: 'nome' } }, required: ['produto'] });
console.log('✓ conversão do pedido');
// 6) troca de modelo: 429 no primeiro, 200 no segundo
const pedidos: string[] = [];
(globalThis as any).fetch = async (_url: string, init: any) => {
  const m = JSON.parse(init.body).model; pedidos.push(m);
  return new Response(m === GROQ_MODELOS[0] ? '{"error":"limite"}' : 'data: [DONE]\n\n', { status: m === GROQ_MODELOS[0] ? 429 : 200 });
};
const r6 = await chamarGroq('gsk_teste', { messages: [] });
assert.equal(r6.status, 200); assert.deepEqual(pedidos, GROQ_MODELOS.slice(0, 2));
// 7) chave errada (401) não tenta outro modelo
pedidos.length = 0;
(globalThis as any).fetch = async (_u: string, init: any) => { pedidos.push(JSON.parse(init.body).model); return new Response('{}', { status: 401 }); };
const r7 = await chamarGroq('gsk_errada', { messages: [] });
assert.equal(r7.status, 401); assert.equal(pedidos.length, 1);
console.log('✓ troca de modelo no limite e parada na chave errada');

// 8) 413: reenvia ao mesmo modelo com resumo menor
{
  const { encolher, MAX_SISTEMA } = await import('../groq.ts');
  const grande = { messages: [{ role: 'system', content: 'x'.repeat(12000) }, { role: 'user', content: 'oi' }] };
  const m = encolher(grande) as any;
  assert.ok(m.messages[0].content.length < 7000 && m.messages[0].content.startsWith('x'.repeat(MAX_SISTEMA / 2)));
  assert.equal(encolher({ messages: [{ role: 'system', content: 'curto' }] }), null);
  const vistos: string[] = [];
  (globalThis as any).fetch = async (_u: string, init: any) => {
    const b = JSON.parse(init.body); vistos.push(b.model + ':' + b.messages[0].content.length);
    return new Response(b.messages[0].content.length > 7000 ? '{"error":"too large"}' : 'data: [DONE]\n\n', { status: b.messages[0].content.length > 7000 ? 413 : 200 });
  };
  const r8 = await chamarGroq('gsk_x', grande);
  assert.equal(r8.status, 200); assert.equal(vistos.length, 2); assert.equal(vistos[0].split(':')[0], vistos[1].split(':')[0]);
  console.log('✓ 413 reenvia ao mesmo modelo com resumo menor');
}

// 9) todos no limite por poucos segundos: espera e tenta de novo
{
  let n = 0;
  (globalThis as any).fetch = async () => (++n <= 3
    ? new Response('{"error":{"message":"Please try again in 0.2s"}}', { status: 429 })
    : new Response('data: [DONE]\n\n', { status: 200 }));
  const r9 = await chamarGroq('gsk_x', { messages: [] });
  assert.equal(r9.status, 200); assert.equal(n, 4);
  console.log('✓ espera alguns segundos e tenta de novo quando todos estão no limite');
}

console.log('TODOS OS TESTES PASSARAM');
