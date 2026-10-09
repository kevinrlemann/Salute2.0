// Rodar: cp supabase/functions/renata/gemini.ts /tmp/gemini.mts && sed "s#../gemini.ts#/tmp/gemini.mts#" supabase/functions/renata/testes/gemini.test.mts > /tmp/t.mts && npx tsx /tmp/t.mts
import { eventosClaude, paraGemini, limparSchema } from '../gemini.ts';
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
  { choices: [], usage: { prompt_tokens: 300, completion_tokens: 20 } },
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
const corpo = paraGemini({
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
assert.deepEqual(corpo.messages[3], { role: 'tool', tool_call_id: 'a', name: 'estoque', content: '{"saldo":3}' });
assert.deepEqual(corpo.tools[0].function.parameters, { type: 'object', properties: { produto: { type: 'string', nullable: true, description: 'nome' } }, required: ['produto'] });
console.log('✓ conversão do pedido');
console.log('TODOS OS TESTES PASSARAM');
