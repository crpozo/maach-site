// MAACH product catalog with real assets.
// Drop product photos under public/assets/productos/<category-slug>/<product-slug>/<n>.webp
// and reference them from a Product entry's gallery array.
//
// PageProducts.tsx renders these entries first (sorted by category order),
// then fills the catalog grid with generic placeholders for subcategories
// that don't have a real entry yet. PageProductDetail.tsx looks up by
// slug and falls back to its existing placeholder rendering otherwise.

import { asset } from '../lib/asset';

export type ProductSheets = {
  /** AutoCAD plan. */
  dwg?: string;
  /** Revit family file. */
  rfa?: string;
  /** SketchUp model. */
  skp?: string;
  /** Tech-sheet PDF. */
  pdf?: string;
};

export type Product = {
  /** URL-safe slug used in /productos/<category>/<slug>. */
  slug: string;
  name: string;
  /** Top-level catalog category (must match catalogCategories[].name). */
  category: string;
  /** Subcategory bucket (matches catalogCategories[].items entry). */
  subcategory: string;
  sku: string;
  description: string;
  /** Gallery photos. First one is used as the catalog thumbnail. */
  gallery: string[];
  /** Downloadable spec files keyed by extension. */
  sheets?: ProductSheets;
};

// Helper for Escritorios products that follow the same disk layout as
// Almacenamiento: NN.webp photos + optional .dwg next to the slug.
const escritorio = (
  slug: string,
  name: string,
  subcategory: 'Escritorios gerente' | 'Escritorios operativos' | 'Estaciones de trabajo' | 'Escritorios regulables',
  sku: string,
  description: string,
  opts: { photos?: number; dwg?: boolean } = {},
): Product => {
  const photos = opts.photos ?? 6;
  const sheets: ProductSheets = {};
  if (opts.dwg !== false) {
    sheets.dwg = asset(`productos/escritorios/${slug}/${slug}.dwg`);
  }
  return {
    slug,
    name,
    category: 'Escritorios + Estaciones de trabajo',
    subcategory,
    sku,
    description,
    gallery: Array.from({ length: photos }, (_, i) =>
      asset(`productos/escritorios/${slug}/${String(i + 1).padStart(2, '0')}.webp`),
    ),
    sheets: Object.keys(sheets).length > 0 ? sheets : undefined,
  };
};

// Helper to keep entries compact for Almacenamiento products that follow a
// consistent on-disk layout: 6 webp photos (01..06) + dwg + rfa + skp.
const almacenamiento = (slug: string, name: string, sku: string, description: string): Product => ({
  slug,
  name,
  category: 'Almacenamiento',
  subcategory: name,
  sku,
  description,
  gallery: Array.from({ length: 6 }, (_, i) =>
    asset(`productos/almacenamiento/${slug}/${String(i + 1).padStart(2, '0')}.webp`),
  ),
  sheets: {
    dwg: asset(`productos/almacenamiento/${slug}/${slug}.dwg`),
    rfa: asset(`productos/almacenamiento/${slug}/${slug}.rfa`),
    skp: asset(`productos/almacenamiento/${slug}/${slug}.skp`),
  },
});

// Default short description per Sillonería subcategory. Used when the
// individual product copy hasn't been provided yet.
const SILLA_DESC: Record<string, string> = {
  'Sillas presidente':
    'Silla ejecutiva con respaldo alto, soporte lumbar y mecanismo sincronizado. Pensada para áreas directivas y oficinas privadas.',
  'Sillas gerenciales':
    'Sillería técnica para uso intensivo, con regulaciones independientes y ajustes ergonómicos completos.',
  'Sillas operativas':
    'Sillería operativa con ergonomía aplicada para jornadas largas y dinámicas de trabajo intensas.',
  'Sillas de visita':
    'Silla para visitas y reuniones ejecutivas. Confort firme, presencia formal.',
  'Colectividades':
    'Silla para colectividades, áreas de espera y zonas multipropósito. Apilable o de base fija según modelo.',
};

// Helper for Sillonería entries. Photos live at
//   productos/silloneria/<slug>/01..NN.webp
// PDF spec sheet at <slug>.pdf (only when ficha !== false).
// `photos` controls how many gallery items we reference — default 5.
const silla = (
  slug: string,
  name: string,
  subcategory: keyof typeof SILLA_DESC,
  sku: string,
  opts: { ficha?: boolean; photos?: number; img?: number } = {},
): Product => {
  const photos = opts.photos ?? 5;
  const ficha = opts.ficha !== false;
  return {
    slug,
    name,
    category: 'Sillonería',
    subcategory,
    sku,
    description: SILLA_DESC[subcategory],
    gallery: Array.from({ length: photos }, (_, i) =>
      asset(`productos/silloneria/${slug}/${String(i + 1).padStart(2, '0')}.webp`),
    ),
    sheets: ficha ? { pdf: asset(`productos/silloneria/${slug}/${slug}.pdf`) } : undefined,
  };
};

export const PRODUCTS: Product[] = [
  // ─── SILLAS PRESIDENTE ───────────────────────────────────────
  silla('silla-zur', 'Silla Zur', 'Sillas presidente', 'MCH-SLP-01', { img: 1 }),
  silla('winner-presidente-base-nylon', 'Winner Presidente Base Nylon', 'Sillas presidente', 'MCH-SLP-02', { img: 2 }),
  silla('vick-presidente', 'Vick Presidente', 'Sillas presidente', 'MCH-SLP-03', { img: 3 }),
  silla('pulse', 'Pulse', 'Sillas presidente', 'MCH-SLP-04', { img: 4, ficha: false }),
  silla('levi-plus', 'Levi Plus', 'Sillas presidente', 'MCH-SLP-05', { img: 5 }),
  silla('levi-plus-ii', 'Levi Plus II', 'Sillas presidente', 'MCH-SLP-06', { img: 1 }),

  // ─── SILLAS GERENCIALES ──────────────────────────────────────
  silla('silla-think-presidente', 'Silla Think Presidente', 'Sillas gerenciales', 'MCH-SLG-01', { img: 2 }),
  silla('style-presidente', 'Style Presidente', 'Sillas gerenciales', 'MCH-SLG-02', { img: 3 }),
  silla('spike-presidente-base-nylon', 'Spike Presidente Base Nylon', 'Sillas gerenciales', 'MCH-SLG-03', { img: 4 }),
  silla('slim-presidente-base-nylon', 'Slim Presidente Base Nylon', 'Sillas gerenciales', 'MCH-SLG-04', { img: 5 }),
  silla('monk-presidente', 'Monk Presidente', 'Sillas gerenciales', 'MCH-SLG-05', { img: 1 }),

  // ─── SILLAS OPERATIVAS ───────────────────────────────────────
  silla('think-gerente', 'Think Gerente', 'Sillas operativas', 'MCH-SLO-01', { img: 2 }),
  silla('vick-gerente', 'Vick Gerente', 'Sillas operativas', 'MCH-SLO-02', { img: 3 }),
  silla('monk-gerente', 'Monk Gerente', 'Sillas operativas', 'MCH-SLO-03', { img: 4 }),
  silla('radius', 'Radius', 'Sillas operativas', 'MCH-SLO-04', { img: 5 }),
  silla('mark-gerente', 'Mark Gerente', 'Sillas operativas', 'MCH-SLO-05', { img: 1 }),
  silla('liam-gerente', 'Liam Gerente', 'Sillas operativas', 'MCH-SLO-06', { img: 2 }),
  silla('slim-gerente', 'Slim Gerente', 'Sillas operativas', 'MCH-SLO-07', { img: 3 }),

  // ─── SILLAS DE VISITA ────────────────────────────────────────
  silla('pinko', 'Pinko', 'Sillas de visita', 'MCH-SLV-01', { img: 4 }),
  silla('andy-interlocutora', 'Andy Interlocutora', 'Sillas de visita', 'MCH-SLV-02', { img: 5 }),
  silla('blade', 'Blade', 'Sillas de visita', 'MCH-SLV-03', { img: 1 }),
  silla('delphi-ii-interlocutora', 'Delphi II Interlocutora', 'Sillas de visita', 'MCH-SLV-04', { img: 2 }),
  silla('mia-con-brazos', 'Mia con Brazos', 'Sillas de visita', 'MCH-SLV-05', { img: 3 }),
  silla('monk-interlocutora', 'Monk Interlocutora', 'Sillas de visita', 'MCH-SLV-06', { img: 4 }),
  silla('rigs-interlocutora', 'Rigs Interlocutora', 'Sillas de visita', 'MCH-SLV-07', { img: 5 }),
  silla('slim-interlocutor', 'Slim Interlocutor', 'Sillas de visita', 'MCH-SLV-08', { img: 1, ficha: false }),
  silla('zao', 'Zao', 'Sillas de visita', 'MCH-SLV-09', { img: 2 }),

  // ─── COLECTIVIDADES ──────────────────────────────────────────
  silla('win', 'Win', 'Colectividades', 'MCH-COL-01', { img: 3, photos: 1 }),
  silla('volga', 'Volga (tapiz/sin tapiz)', 'Colectividades', 'MCH-COL-02', { img: 4 }),
  silla('tex', 'Tex', 'Colectividades', 'MCH-COL-03', { img: 5 }),
  silla('swan', 'Swan', 'Colectividades', 'MCH-COL-04', { img: 1 }),
  silla('sol', 'Sol', 'Colectividades', 'MCH-COL-05', { img: 2, ficha: false }),
  silla('stef', 'Stef', 'Colectividades', 'MCH-COL-06', { img: 3, ficha: false }),
  silla('pop', 'Pop', 'Colectividades', 'MCH-COL-07', { img: 4 }),
  silla('patrick', 'Patrick', 'Colectividades', 'MCH-COL-08', { img: 5 }),
  silla('obi', 'Obi', 'Colectividades', 'MCH-COL-09', { img: 1, ficha: false }),
  silla('net', 'Net', 'Colectividades', 'MCH-COL-10', { img: 2 }),
  silla('misuri', 'Misuri', 'Colectividades', 'MCH-COL-11', { img: 3 }),
  silla('milei', 'Milei', 'Colectividades', 'MCH-COL-12', { img: 4 }),
  silla('lucca', 'Lucca', 'Colectividades', 'MCH-COL-13', { img: 5 }),
  silla('loti', 'Loti', 'Colectividades', 'MCH-COL-14', { img: 1, ficha: false, photos: 4 }),
  silla('kiro', 'Kiro', 'Colectividades', 'MCH-COL-15', { img: 2 }),
  silla('jack', 'Jack', 'Colectividades', 'MCH-COL-16', { img: 3 }),
  silla('glen', 'Glen', 'Colectividades', 'MCH-COL-17', { img: 4 }),
  silla('fresia', 'Fresia', 'Colectividades', 'MCH-COL-18', { img: 5, ficha: false }),
  silla('emi', 'Emi', 'Colectividades', 'MCH-COL-19', { img: 1 }),
  silla('coccolona', 'Coccolona', 'Colectividades', 'MCH-COL-20', { img: 2 }),
  silla('brent', 'Brent', 'Colectividades', 'MCH-COL-21', { img: 3, ficha: false }),
  silla('brand', 'Brand', 'Colectividades', 'MCH-COL-22', { img: 4 }),
  silla('boom', 'Boom', 'Colectividades', 'MCH-COL-23', { img: 5 }),
  silla('bertoia', 'Bertoia', 'Colectividades', 'MCH-COL-24', { img: 1, ficha: false }),

  // ─── ESCRITORIOS GERENTE ─────────────────────────────────────
  escritorio(
    'escritorio-gerente-recto',
    'Escritorio Gerente Recto',
    'Escritorios gerente',
    'MCH-EGR-01',
    'Escritorio gerencial de líneas rectas con tablero superior en melamina y estructura metálica. Pensado para áreas ejecutivas que requieren superficie amplia, organización limpia y conducción eléctrica integrada para una imagen ordenada.',
  ),
  escritorio(
    'escritorio-gerente-en-l',
    'Escritorio Gerente en L',
    'Escritorios gerente',
    'MCH-EGR-02',
    'Escritorio gerencial en formato L que combina superficie principal con módulo de retorno. Ideal para oficinas privadas que requieren área diferenciada para trabajo, atención y archivo activo.',
  ),
  escritorio(
    'escritorio-gerente-en-c',
    'Escritorio Gerente en C',
    'Escritorios gerente',
    'MCH-EGR-03',
    'Escritorio gerencial en C con perímetro envolvente. Maximiza la superficie útil del puesto directivo y permite distribuir periféricos, archivo y zona de juntas en una misma estación.',
  ),

  // ─── ESCRITORIOS OPERATIVOS ──────────────────────────────────
  escritorio(
    'escritorio-operativo-recto',
    'Escritorio Operativo Recto',
    'Escritorios operativos',
    'MCH-EOP-01',
    'Escritorio operativo individual de líneas rectas. Estructura metálica, tablero en melamina y conducción eléctrica integrada — pensado para estaciones de alta densidad sin perder ergonomía.',
  ),
  escritorio(
    'escritorio-operativo-en-l',
    'Escritorio Operativo en L',
    'Escritorios operativos',
    'MCH-EOP-02',
    'Escritorio operativo en formato L con módulo de retorno. Ofrece superficie ampliada para puestos que combinan trabajo en pantalla, atención y archivo en línea.',
  ),

  // ─── ESTACIONES DE TRABAJO ───────────────────────────────────
  escritorio(
    'estacion-de-trabajo-1',
    'Estación de Trabajo 1',
    'Estaciones de trabajo',
    'MCH-ETR-01',
    'Sistema de estación de trabajo configurable. Tableros en melamina sobre estructura metálica, conducción eléctrica integrada y separadores de vidrio opcionales para entornos colaborativos con privacidad acústica.',
  ),
  escritorio(
    'estacion-de-trabajo-2',
    'Estación de Trabajo 2',
    'Estaciones de trabajo',
    'MCH-ETR-02',
    'Segunda configuración del sistema de estaciones, pensada para arreglos de mayor densidad. Mantiene los componentes modulares (estructura, tablero, separadores) y el sistema de canalización eléctrica del primer modelo.',
  ),

  // ─── ESCRITORIO REGULABLE ────────────────────────────────────
  escritorio(
    'escritorio-regulable',
    'Escritorio Regulable',
    'Escritorios regulables',
    'MCH-ERG-01',
    'Escritorio con mecanismo de altura regulable y memoria de ajuste. Permite alternar entre posición sentada y de pie a lo largo de la jornada para una postura más saludable.',
    { dwg: false },
  ),

  // ─── ALMACENAMIENTO ──────────────────────────────────────────
  almacenamiento(
    'biblioteca-alta',
    'Biblioteca Alta',
    'MCH-ALM-01',
    'Biblioteca alta de gran capacidad con puertas en distintos acabados (madera, melamina o color). Estructura interna con repisas reconfigurables y herrajes ocultos. Pensada para áreas directivas, oficinas privadas y zonas de archivo de alta densidad.',
  ),
  almacenamiento(
    'biblioteca-baja',
    'Biblioteca Baja',
    'MCH-ALM-02',
    'Biblioteca baja con repisas abiertas o mixtas (abiertas + puertas) que se mantiene por debajo de la línea de visión. Funciona como divisor visual sutil entre estaciones y como soporte de exhibición para libros, biblioratos y objetos.',
  ),
  almacenamiento(
    'credenza',
    'Credenza',
    'MCH-ALM-03',
    'Credenza ejecutiva con superficie continua y puertas frontales abatibles. Pensada para áreas de recepción, salas de juntas y oficinas privadas como soporte para impresoras, equipos AV y archivo activo.',
  ),
  almacenamiento(
    'modulo-3-gavetas',
    'Módulo 3 gavetas',
    'MCH-ALM-04',
    'Módulo de archivo de tres gavetas con guías metálicas de extensión total. Tope superior reforzado, cerradura general y opcional de ruedas. Se integra bajo escritorio o en línea como pedestal autónomo.',
  ),
  almacenamiento(
    'arturito',
    'Arturito',
    'MCH-ALM-05',
    'Caddy móvil de almacenamiento personal con rodajas, cerradura y superficie superior utilizable. Diseñado para dinámicas de trabajo flexible donde cada usuario lleva su archivo entre puestos.',
  ),
  almacenamiento(
    'locker',
    'Locker',
    'MCH-ALM-06',
    'Sistema de lockers individuales con cerradura electrónica o mecánica. Configurable en bloques verticales 2/3/4 cuerpos. Pensado para esquemas hot-desking y zonas de recepción del equipo operativo.',
  ),
  almacenamiento(
    'archivo-rodante',
    'Archivo Rodante',
    'MCH-ALM-07',
    'Sistema de archivo móvil sobre rieles para máxima densidad de almacenamiento. Activación manual o eléctrica, freno de seguridad y configuración modular. Ideal para áreas administrativas, legales y de cumplimiento.',
  ),
];

export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductsByCategory = (category: string): Product[] =>
  PRODUCTS.filter((p) => p.category === category);

export const getProductsBySubcategory = (subcategory: string): Product[] =>
  PRODUCTS.filter((p) => p.subcategory === subcategory);
