// node --experimental-strip-types --test supabase/functions/whatsapp/testes/provedores.test.mts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerEvolution, lerZapi, lerQr, lerEstado, pedidosConectar, provedorDe, telefoneDoJid } from '../provedores.ts';

test('Evolution: mensagem de texto recebida', () => {
  const r = lerEvolution({ event: 'messages.upsert', data: { key: { remoteJid: '5519999998888@s.whatsapp.net', fromMe: false, id: 'ABC' }, pushName: 'Júlia', message: { conversation: 'Oi, quero agendar' }, messageTimestamp: 1791560000 } });
  assert.deepEqual(r, [{ tipo: 'mensagem', id_externo: 'ABC', telefone: '5519999998888', nome: 'Júlia', texto: 'Oi, quero agendar', tipo_msg: 'text', de_mim: false, timestamp: 1791560000, midia: undefined }]);
});
test('Evolution: grupo é ignorado e @lid usa o número real', () => {
  assert.equal(lerEvolution({ event: 'MESSAGES_UPSERT', data: { key: { remoteJid: '1203@g.us', id: 'X' }, message: { conversation: 'a' } } }).length, 0);
  const r = lerEvolution({ event: 'messages.upsert', data: { key: { remoteJid: '999@lid', remoteJidAlt: '5511988887777@s.whatsapp.net', id: 'Y', fromMe: true }, message: { extendedTextMessage: { text: 'eco' } } } });
  assert.equal((r[0] as any).telefone, '5511988887777');
  assert.equal((r[0] as any).de_mim, true);
});
test('Evolution: status e conexão', () => {
  assert.deepEqual(lerEvolution({ event: 'messages.update', data: { keyId: 'K', status: 'READ' } }), [{ tipo: 'status', id_externo: 'K', status: 'read' }]);
  assert.deepEqual(lerEvolution({ event: 'connection.update', data: { state: 'open', wuid: '5519977776666@s.whatsapp.net' } }), [{ conexao: 'conectado', numero: '5519977776666' }]);
  assert.equal(lerEstado('evolution', { instance: { state: 'open' } }), 'conectado');
});
test('Z-API: mensagem, áudio, status e conexão', () => {
  const r = lerZapi({ type: 'ReceivedCallback', phone: '5519999998888', messageId: 'M1', fromMe: false, momment: 1791560000123, senderName: 'Ana', text: { message: 'Bom dia' }, isGroup: false });
  assert.deepEqual(r, [{ tipo: 'mensagem', id_externo: 'M1', telefone: '5519999998888', nome: 'Ana', texto: 'Bom dia', tipo_msg: 'text', de_mim: false, timestamp: 1791560000 }]);
  assert.equal((lerZapi({ type: 'ReceivedCallback', phone: '5519999998888', messageId: 'M2', audio: { audioUrl: 'x' } })[0] as any).tipo_msg, 'audio');
  assert.equal(lerZapi({ type: 'ReceivedCallback', phone: '1203-group', messageId: 'M3', isGroup: true }).length, 0);
  assert.deepEqual(lerZapi({ type: 'MessageStatusCallback', status: 'RECEIVED', ids: ['A', 'B'] }).map((e: any) => e.status), ['delivered', 'delivered']);
  assert.deepEqual(lerZapi({ type: 'DisconnectedCallback' }), [{ conexao: 'desconectado' }]);
  assert.equal(lerEstado('zapi', { connected: true }), 'conectado');
});
test('QR Code e pedidos de conexão', () => {
  assert.equal(lerQr('evolution', { base64: 'data:image/png;base64,AAA' }), 'data:image/png;base64,AAA');
  assert.equal(lerQr('zapi', { value: 'BBB' }), 'data:image/png;base64,BBB');
  const p = pedidosConectar('evolution', { api_url: 'https://evo.exemplo.com/', nome_instancia: 'clinica 1' }, 'k', 'https://h');
  assert.equal(p.webhook.url, 'https://evo.exemplo.com/webhook/set/clinica%201');
  assert.equal(JSON.parse(p.webhook.body!).webhook.url, 'https://h');
  const z = pedidosConectar('zapi', { api_url: 'https://api.z-api.io/instances/ID1' }, 'TOK|CLI', 'https://h');
  assert.equal(z.qr.url, 'https://api.z-api.io/instances/ID1/token/TOK/qr-code/image');
  assert.equal(z.qr.headers['Client-Token'], 'CLI');
  assert.equal(provedorDe('Z-API'), 'zapi'); assert.equal(provedorDe(null), 'evolution');
  assert.equal(telefoneDoJid('status@broadcast'), null);
});
test('Mídia: Evolution e Z-API', async () => {
  const { pedidoMidia, nomeArquivo } = await import('../provedores.ts');
  const r = lerEvolution({ event: 'messages.upsert', data: { key: { remoteJid: '5519999998888@s.whatsapp.net', id: 'IMG1' }, message: { imageMessage: { caption: 'foto do dente', mimetype: 'image/jpeg' } } } });
  assert.equal((r[0] as any).tipo_msg, 'image');
  assert.deepEqual((r[0] as any).midia, { mime: 'image/jpeg', nome: undefined });
  const z = lerZapi({ type: 'ReceivedCallback', phone: '5519999998888', messageId: 'V1', video: { videoUrl: 'https://cdn.z-api.io/v.mp4', mimeType: 'video/mp4', caption: 'veja' } });
  assert.equal((z[0] as any).midia.url, 'https://cdn.z-api.io/v.mp4');
  assert.equal(pedidoMidia('zapi', { api_url: 'x' }, '', 'V1', 'http://inseguro')?.url, undefined);
  assert.match(pedidoMidia('evolution', { api_url: 'https://evo.x', nome_instancia: 'i' }, 'k', 'IMG1')!.url, /getBase64FromMediaMessage\/i$/);
  assert.equal(nomeArquivo('image', 'image/jpeg'), 'image.jpg');
  assert.equal(nomeArquivo('document', 'application/pdf', 'Exame Jóia.pdf'), 'Exame_Joia.pdf');
  assert.equal(nomeArquivo('audio', 'audio/ogg; codecs=opus'), 'audio.ogg');
});
