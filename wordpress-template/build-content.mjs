// Genera maach-theme/data/maach-content.json a partir de los datos reales del
// sitio React (src/data/*). Ese JSON es lo que el importador del tema carga en
// WordPress: productos, categorías, proyectos y artículos, con URLs absolutas
// a las imágenes y archivos CAD publicados en GitHub Pages.
//
//   node wordpress-template/build-content.mjs
//
// Reejecutar cada vez que cambie el catálogo en src/data.

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const SITE = 'https://crpozo.github.io/maach-site';

// Los módulos de datos son TypeScript y usan import.meta.env; los transpilamos
// con el esbuild que ya trae Vite y les inyectamos la base del sitio en vivo,
// de modo que asset() devuelva URLs absolutas listas para importar.
function loadData(entry) {
  const out = join(mkdtempSync(join(tmpdir(), 'maach-')), 'data.mjs');
  execFileSync(
    'npx',
    [
      'esbuild',
      join(root, entry),
      '--bundle',
      '--format=esm',
      `--outfile=${out}`,
      `--define:import.meta.env.BASE_URL="${SITE}/"`,
      '--log-level=error',
    ],
    { cwd: root, stdio: ['ignore', 'ignore', 'inherit'] },
  );
  return import(pathToFileURL(out).href);
}

const { PRODUCTS } = await loadData('src/data/productos.ts');
const { CATEGORIES } = await loadData('src/data/categorias.ts');
const { BLOGS } = await loadData('src/data/blogs.ts');

// Los textos visibles viven en el diccionario i18n; para el tema en español
// tomamos la rama 'es' tal cual.
const i18nSrc = readFileSync(join(root, 'src/i18n/i18n.tsx'), 'utf8');
const es = {};
{
  // Extrae el bloque `es: { ... }` respetando el anidamiento de llaves.
  const start = i18nSrc.indexOf('  es: {');
  let depth = 0;
  let end = start;
  for (let i = i18nSrc.indexOf('{', start); i < i18nSrc.length; i++) {
    if (i18nSrc[i] === '{') depth++;
    else if (i18nSrc[i] === '}') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const body = i18nSrc.slice(start, end);
  for (const m of body.matchAll(/'([^']+)':\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g)) {
    es[m[1]] = (m[2] ?? m[3]).replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n');
  }
}

const t = (key, fallback = '') => es[key] ?? fallback;
const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// ─── Categorías y subcategorías ────────────────────────────────────────────
const categorias = CATEGORIES.map((c) => ({
  slug: c.slug,
  nombre: t(`cat.${c.slug}.name`, c.name),
  intro: t(`cat.${c.slug}.intro`, c.intro ?? ''),
  secciones: c.sections.map((s, i) => ({
    slug: s.slug,
    nombre: t(`cat.${c.slug}.sec.${i}.name`, s.name),
    descripcion: t(`cat.${c.slug}.sec.${i}.desc`, s.description),
    caracteristicas: s.caracteristicas.map((f, j) => t(`cat.${c.slug}.sec.${i}.feat.${j}`, f)),
    subcategorias: Array.isArray(s.productSubcategory)
      ? s.productSubcategory
      : s.productSubcategory
        ? [s.productSubcategory]
        : [],
  })),
}));

// Índice subcategoría → sección, para copiar las características reales a cada
// ficha de producto (mismo criterio que usa la web).
const porSubcategoria = new Map();
for (const c of categorias) {
  for (const s of c.secciones) {
    for (const sub of s.subcategorias) porSubcategoria.set(sub, { categoria: c, seccion: s });
  }
}

// ─── Productos ─────────────────────────────────────────────────────────────
const CAT_SLUG = {
  Sillonería: 'silloneria',
  Escritorios: 'escritorios',
  Mesas: 'mesas',
  Almacenamiento: 'almacenamiento',
  'Divisiones de ambientes': 'divisiones',
  Recepciones: 'recepciones',
};

const productos = PRODUCTS.map((p) => {
  const match = porSubcategoria.get(p.subcategory);
  return {
    slug: p.slug,
    nombre: t('prod.name.' + p.slug, p.name),
    sku: p.sku,
    descripcion: t('prod.desc.' + p.slug, p.description),
    categoria: CAT_SLUG[p.category] ?? slugify(p.category),
    categoria_nombre: p.category,
    subcategoria: p.subcategory,
    subcategoria_slug: slugify(p.subcategory),
    seccion: match ? match.seccion.slug : '',
    caracteristicas: match ? match.seccion.caracteristicas : [],
    galeria: p.gallery,
    archivos: {
      pdf: p.sheets?.pdf ?? '',
      dwg: p.sheets?.dwg ?? '',
      rfa: p.sheets?.rfa ?? '',
      skp: p.sheets?.skp ?? '',
    },
  };
});

// ─── Proyectos del portafolio ──────────────────────────────────────────────
// PagePortafolioDetail no exporta sus datos, así que el portafolio se declara
// aquí; son pocos y cambian poco. Palladium queda fuera a propósito.
const proyectos = [
  {
    slug: 'cpn',
    id: '01',
    titulo: 'CPN',
    ubicacion: 'Quito, EC',
    alcance: 'Edificio corporativo matriz · Recepción, salas y áreas operativas',
    area: '2,400 m²',
    anio: '2025',
    portada: `${SITE}/assets/proyectos/cpn/01.webp`,
    galeria: [2, 3, 5].map((n) => `${SITE}/assets/proyectos/cpn/0${n}.webp`),
    desafio: [
      'Intervenir integralmente 10 pisos de la institución, transformando espacios tradicionales en entornos de trabajo más funcionales, eficientes y alineados a nuevas dinámicas laborales.',
      'El reto estaba en desarrollar soluciones que respondan a distintas necesidades dentro de un mismo proyecto, manteniendo coherencia en diseño, durabilidad y uso en cada área.',
    ],
    propuesta_intro:
      'Desarrollo, fabricación e implementación de soluciones de mobiliario adaptadas a las necesidades específicas de cada espacio, garantizando funcionalidad y consistencia en toda la intervención.',
    propuesta: [
      'Diseño de mobiliario a medida, incluyendo estaciones de trabajo, áreas colaborativas, cafeterías, sillonería y mesas de reunión.',
      'Adaptación de soluciones a distintos tipos de uso, priorizando comodidad, durabilidad y eficiencia en el trabajo diario.',
      'Integración de espacios colaborativos que favorecen la interacción entre equipos y optimizan la dinámica interna.',
    ],
    resultado: [
      'Un entorno de trabajo completamente renovado, donde los espacios responden de forma más eficiente a las necesidades operativas de la institución.',
      'El proyecto permitió mejorar la organización interna, facilitar la comunicación entre áreas y generar una experiencia de uso más funcional y alineada a las nuevas dinámicas laborales.',
    ],
  },
  {
    slug: 'wesco',
    id: '03',
    titulo: 'Wesco',
    ubicacion: 'Quito, EC',
    alcance: 'Edificio administrativo · Mobiliario estándar y a medida',
    anio: '2026',
    portada: `${SITE}/assets/proyectos/wesco/01.webp`,
    galeria: ['02', '01', '33', '10', '03', '12', '27', '37'].map(
      (n) => `${SITE}/assets/proyectos/wesco/${n}.webp`,
    ),
    desafio: [
      'Materializar fielmente la propuesta arquitectónica de un edificio administrativo, asegurando que cada decisión de mobiliario responda tanto a criterios estéticos como funcionales.',
      'Un proyecto de alta exigencia que requería coherencia total entre diseño, fabricación e instalación, en un margen de ejecución corto.',
    ],
    propuesta_intro:
      'Desarrollo integral de mobiliario combinando línea estándar y soluciones a medida, adaptadas a los requerimientos específicos del proyecto.',
    propuesta: [
      'Fabricación multimaterial (metal y madera) para lograr un balance preciso entre durabilidad, estética y desempeño en el uso diario.',
      'Trabajo colaborativo con el estudio de arquitectura para interpretar y materializar fielmente cada detalle del diseño conceptual.',
      'Control integral del proceso, desde la fabricación hasta la instalación, garantizando consistencia en calidad, acabados y tiempos de entrega.',
    ],
    resultado: [
      'Un espacio corporativo donde la visión arquitectónica se traduce en una ejecución precisa, coherente y funcional.',
      'El proyecto no solo cumplió con las especificaciones técnicas, sino que logró materializar fielmente la intención del diseño, reflejando un alto nivel de detalle, calidad y control en cada elemento implementado.',
    ],
  },
  {
    slug: 'came',
    id: '06',
    titulo: 'CAME',
    ubicacion: 'Quito, EC',
    alcance: 'Oficinas corporativas · Mobiliario estándar y a medida',
    portada: `${SITE}/assets/proyectos/came/01.webp`,
    galeria: ['01', '06', '05', '04', '02', '03', '07', '09'].map(
      (n) => `${SITE}/assets/proyectos/came/${n}.webp`,
    ),
    desafio: [],
    propuesta_intro: '',
    propuesta: [],
    resultado: [],
  },
];

// ─── Artículos (Investigación) ─────────────────────────────────────────────
const articulos = BLOGS.map((b) => ({
  slug: b.slug,
  numero: b.number,
  titulo: t('blog.' + b.slug + '.title', b.title),
  categoria: t('blog.' + b.slug + '.category', b.category),
  intro: t('blog.' + b.slug + '.intro', b.intro),
  lectura: b.readTime,
  portada: `${SITE}/assets/${b.img}`,
  secciones: b.sections.map((s, i) => {
    const base = 'blog.' + b.slug + '.sec.' + i;
    if (s.type === 'ul') {
      return { tipo: 'ul', items: s.items.map((it, j) => t(base + '.item.' + j, it)) };
    }
    return { tipo: s.type, texto: t(base + '.text', s.text) };
  }),
  cierre: t('blog.' + b.slug + '.closing', b.closing),
  cta: {
    copy: t('blog.' + b.slug + '.cta.copy', b.cta.copy),
    primario: b.cta.primaryLabel,
    primario_href: b.cta.primaryHref,
    secundario: b.cta.secondaryLabel,
    secundario_href: b.cta.secondaryHref,
  },
}));

const out = {
  generado: 'wordpress-template/build-content.mjs',
  origen: SITE,
  categorias,
  productos,
  proyectos,
  articulos,
  textos: es,
};

const dest = join(here, 'maach-theme/data/maach-content.json');
writeFileSync(dest, JSON.stringify(out, null, 1));
console.log(
  `OK  ${dest}\n    ${productos.length} productos · ${categorias.length} categorías · ` +
    `${proyectos.length} proyectos · ${articulos.length} artículos · ${Object.keys(es).length} textos`,
);
