// Compila no build o JSX que antes era compilado no navegador (Babel standalone, mesma versão e mesmas opções).
// Uso: node precompilar.js babel.min.js pasta  (cada arquivo .jsx da pasta vira .js ao lado)
const fs = require('fs'), path = require('path');
const Babel = require(path.resolve(process.argv[2]));
const dir = process.argv[3];
// as mesmas opções que o Babel standalone usa em <script type="text/babel"> (sem o mapa de código embutido)
const opcoes = (nome) => ({ filename: nome, presets: ['react', 'env'], plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-flow-strip-types'], targets: { browsers: undefined } });
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.jsx'))) {
  const t0 = Date.now();
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  const out = Babel.transform(src, opcoes(f)).code;
  fs.writeFileSync(path.join(dir, f.replace(/\.jsx$/, '.js')), out);
  console.log(f, src.length, '->', out.length, (Date.now() - t0) + 'ms');
}
