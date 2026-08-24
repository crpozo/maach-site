// Genera public/contenido/contenido.seed.json: el contenido editable del sitio
// (textos, productos y portafolio) extraído de los archivos de datos.
//
//   node scripts/build-contenido.mjs
//
// El sitio lee en caliente contenido/contenido.json —el que escribe el panel
// /admin en el servidor— y si no existe usa este seed. Por eso el seed sí
// viaja en el repositorio y contenido.json NO: así un despliegue nunca pisa
// lo que se editó desde el panel.

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

function cargar(entrada) {
  const salida = join(mkdtempSync(join(tmpdir(), 'maach-')), 'data.mjs');
  execFileSync(
    'npx',
    ['esbuild', join(root, entrada), '--bundle', '--format=esm', `--outfile=${salida}`,
     '--define:import.meta.env.BASE_URL="/"', '--log-level=error'],
    { cwd: root, stdio: ['ignore', 'ignore', 'inherit'] },
  );
  return import(pathToFileURL(salida).href);
}

const { PRODUCTS } = await cargar('src/data/productos.ts');

// ─── Textos ────────────────────────────────────────────────────────────────
const fuente = readFileSync(join(root, 'src/i18n/i18n.tsx'), 'utf8');

/** Extrae el diccionario de un idioma del archivo de traducciones. */
function extraer(idioma) {
  const dict = {};
  const inicio = fuente.indexOf(`  ${idioma}: {`);
  if (inicio < 0) return dict;
  let nivel = 0;
  let fin = inicio;
  for (let i = fuente.indexOf('{', inicio); i < fuente.length; i++) {
    if (fuente[i] === '{') nivel++;
    else if (fuente[i] === '}') {
      nivel--;
      if (nivel === 0) { fin = i; break; }
    }
  }
  const cuerpo = fuente.slice(inicio, fin);
  for (const m of cuerpo.matchAll(/'([^']+)':\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g)) {
    dict[m[1]] = (m[2] ?? m[3]).replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n');
  }
  return dict;
}

const textos_en = extraer('en');
const textos = {};
{
  const inicio = fuente.indexOf('  es: {');
  let nivel = 0;
  let fin = inicio;
  for (let i = fuente.indexOf('{', inicio); i < fuente.length; i++) {
    if (fuente[i] === '{') nivel++;
    else if (fuente[i] === '}') {
      nivel--;
      if (nivel === 0) { fin = i; break; }
    }
  }
  const cuerpo = fuente.slice(inicio, fin);
  for (const m of cuerpo.matchAll(/'([^']+)':\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g)) {
    textos[m[1]] = (m[2] ?? m[3]).replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n');
  }
}

// ─── Productos ─────────────────────────────────────────────────────────────
// Sólo lo que tiene sentido editar: el resto (rutas de fotos y archivos) sigue
// resolviéndose en el código.
const productos = {};
for (const p of PRODUCTS) {
  productos[p.slug] = {
    nombre: textos['prod.name.' + p.slug] ?? p.name,
    sku: p.sku,
    descripcion: textos['prod.desc.' + p.slug] ?? p.description,
  };
}

const salida = {
  version: 1,
  generado: new Date().toISOString().slice(0, 10),
  textos,
  textos_en,
  productos,
};

mkdirSync(join(root, 'public/contenido'), { recursive: true });
const destino = join(root, 'public/contenido/contenido.seed.json');
writeFileSync(destino, JSON.stringify(salida, null, 1));
console.log(`OK  ${destino}`);
console.log(
  `    ${Object.keys(textos).length} textos ES · ${Object.keys(textos_en).length} textos EN · ` +
    `${Object.keys(productos).length} productos`,
);
