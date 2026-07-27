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
// Almacenamiento: NN.webp photos + .dwg/.rfa/.skp junto al slug.
// `cad: false` para los modelos que sólo tienen fotos (Escritorio Regulable).
const escritorio = (
  slug: string,
  name: string,
  subcategory: 'Escritorios gerente' | 'Escritorios operativos' | 'Estaciones de trabajo' | 'Escritorios regulables',
  sku: string,
  description: string,
  opts: { photos?: number; cad?: boolean } = {},
): Product => {
  const photos = opts.photos ?? 6;
  const sheets: ProductSheets = {};
  if (opts.cad !== false) {
    sheets.dwg = asset(`productos/escritorios/${slug}/${slug}.dwg`);
    sheets.rfa = asset(`productos/escritorios/${slug}/${slug}.rfa`);
    sheets.skp = asset(`productos/escritorios/${slug}/${slug}.skp`);
  }
  return {
    slug,
    name,
    category: 'Escritorios',
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

// Helper for Mesas products. Photos live at
//   productos/mesas/<slug>/01..06.webp  (01 = clean render, 02-06 = ambientadas)
// CAD/BIM sheets at <slug>.dwg / .rfa / .skp
const mesa = (
  slug: string,
  name: string,
  subcategory: 'Mesas de reunión' | 'Mesas colaborativas' | 'Mesas auxiliares',
  sku: string,
  description: string,
): Product => ({
  slug,
  name,
  category: 'Mesas',
  subcategory,
  sku,
  description,
  gallery: Array.from({ length: 6 }, (_, i) =>
    asset(`productos/mesas/${slug}/${String(i + 1).padStart(2, '0')}.webp`),
  ),
  sheets: {
    dwg: asset(`productos/mesas/${slug}/${slug}.dwg`),
    rfa: asset(`productos/mesas/${slug}/${slug}.rfa`),
    skp: asset(`productos/mesas/${slug}/${slug}.skp`),
  },
});

// Helper for Divisiones de ambientes products. Photos live at
//   productos/divisiones/<slug>/01..06.webp  (01 = perspectiva render, 02-06 = ambientadas)
// CAD/BIM sheets at <slug>.dwg / .rfa / .skp, only for entries that ship them.
const division = (
  slug: string,
  name: string,
  subcategory: 'Divisiones modulares' | 'Divisiones de vidrio',
  sku: string,
  description: string,
  opts: { sheets?: boolean } = {},
): Product => ({
  slug,
  name,
  category: 'Divisiones de ambientes',
  subcategory,
  sku,
  description,
  gallery: Array.from({ length: 6 }, (_, i) =>
    asset(`productos/divisiones/${slug}/${String(i + 1).padStart(2, '0')}.webp`),
  ),
  sheets: opts.sheets
    ? {
        dwg: asset(`productos/divisiones/${slug}/${slug}.dwg`),
        rfa: asset(`productos/divisiones/${slug}/${slug}.rfa`),
        skp: asset(`productos/divisiones/${slug}/${slug}.skp`),
      }
    : undefined,
});

// Helper for Recepciones products. Photos live at
//   productos/recepciones/<slug>/01..06.webp  (01 = perspectiva render, 02-06 = ambientadas)
// CAD/BIM sheets at <slug>.dwg / .rfa / .skp
const recepcion = (slug: string, name: string, sku: string, description: string): Product => ({
  slug,
  name,
  category: 'Recepciones',
  subcategory: 'Counters de recepción',
  sku,
  description,
  gallery: Array.from({ length: 6 }, (_, i) =>
    asset(`productos/recepciones/${slug}/${String(i + 1).padStart(2, '0')}.webp`),
  ),
  sheets: {
    dwg: asset(`productos/recepciones/${slug}/${slug}.dwg`),
    rfa: asset(`productos/recepciones/${slug}/${slug}.rfa`),
    skp: asset(`productos/recepciones/${slug}/${slug}.skp`),
  },
});

// Helper for Sofás (Sillonería · soft seating). Photos live at
//   productos/silloneria/<slug>/01..06.webp  (01 = perspectiva render, 02-06 = ambientadas)
// CAD/BIM sheets at <slug>.dwg / .rfa / .skp
const sofa = (slug: string, name: string, sku: string, description: string): Product => ({
  slug,
  name,
  category: 'Sillonería',
  subcategory: 'Sofás',
  sku,
  description,
  gallery: Array.from({ length: 6 }, (_, i) =>
    asset(`productos/silloneria/${slug}/${String(i + 1).padStart(2, '0')}.webp`),
  ),
  sheets: {
    dwg: asset(`productos/silloneria/${slug}/${slug}.dwg`),
    rfa: asset(`productos/silloneria/${slug}/${slug}.rfa`),
    skp: asset(`productos/silloneria/${slug}/${slug}.skp`),
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
  opts: { ficha?: boolean; photos?: number; cover?: number } = {},
): Product => {
  const photos = opts.photos ?? 5;
  const ficha = opts.ficha !== false;
  // `cover` (1-based) is the front-diagonal view used as the catalog thumbnail
  // and detail hero. It is moved to the front of the gallery; the rest follow
  // in natural order.
  const cover = Math.min(Math.max(opts.cover ?? 1, 1), photos);
  const order = [
    cover,
    ...Array.from({ length: photos }, (_, i) => i + 1).filter((n) => n !== cover),
  ];
  return {
    slug,
    name,
    category: 'Sillonería',
    subcategory,
    sku,
    description: SILLA_DESC[subcategory],
    gallery: order.map((n) =>
      asset(`productos/silloneria/${slug}/${String(n).padStart(2, '0')}.webp`),
    ),
    sheets: ficha ? { pdf: asset(`productos/silloneria/${slug}/${slug}.pdf`) } : undefined,
  };
};

export const PRODUCTS: Product[] = [
  // ─── SILLAS PRESIDENTE ───────────────────────────────────────
  silla('silla-zur', 'Silla Zur', 'Sillas presidente', 'MCH-SLP-01', { cover: 2 }),
  silla('winner-presidente-base-nylon', 'Silla Winner', 'Sillas presidente', 'MCH-SLP-02', { cover: 3 }),
  silla('vick-presidente', 'Silla Vick', 'Sillas presidente', 'MCH-SLP-03', { cover: 4 }),
  silla('pulse', 'Silla Pulse', 'Sillas presidente', 'MCH-SLP-04', { cover: 4, ficha: false }),
  silla('levi-plus', 'Silla Levi Plus', 'Sillas presidente', 'MCH-SLP-05', { cover: 4 }),
  silla('levi-plus-ii', 'Silla Levi Plus II', 'Sillas presidente', 'MCH-SLP-06', { cover: 2 }),

  // ─── SILLAS GERENCIALES ──────────────────────────────────────
  silla('silla-think-presidente', 'Silla Think', 'Sillas gerenciales', 'MCH-SLG-01', { cover: 4 }),
  silla('style-presidente', 'Silla Style', 'Sillas gerenciales', 'MCH-SLG-02', { cover: 2 }),
  silla('spike-presidente-base-nylon', 'Silla Spike', 'Sillas gerenciales', 'MCH-SLG-03', { cover: 2 }),
  silla('slim-presidente-base-nylon', 'Silla Slim', 'Sillas gerenciales', 'MCH-SLG-04', { cover: 4 }),
  silla('monk-presidente', 'Silla Monk', 'Sillas gerenciales', 'MCH-SLG-05', { cover: 4 }),

  // ─── SILLAS OPERATIVAS ───────────────────────────────────────
  silla('think-gerente', 'Silla Think', 'Sillas operativas', 'MCH-SLO-01', { cover: 4 }),
  silla('vick-gerente', 'Silla Vick', 'Sillas operativas', 'MCH-SLO-02', { cover: 4 }),
  silla('monk-gerente', 'Silla Monk', 'Sillas operativas', 'MCH-SLO-03', { cover: 4 }),
  silla('radius', 'Silla Radius', 'Sillas operativas', 'MCH-SLO-04', { cover: 4 }),
  silla('mark-gerente', 'Silla Mark', 'Sillas operativas', 'MCH-SLO-05', { cover: 2 }),
  silla('liam-gerente', 'Silla Liam', 'Sillas operativas', 'MCH-SLO-06', { cover: 2 }),
  silla('slim-gerente', 'Silla Slim', 'Sillas operativas', 'MCH-SLO-07', { cover: 4 }),

  // ─── SILLAS DE VISITA ────────────────────────────────────────
  silla('pinko', 'Silla Pinko', 'Sillas de visita', 'MCH-SLV-01', { cover: 4 }),
  silla('andy-interlocutora', 'Silla Andy', 'Sillas de visita', 'MCH-SLV-02', { cover: 4 }),
  silla('blade', 'Silla Blade', 'Sillas de visita', 'MCH-SLV-03', { cover: 2 }),
  silla('delphi-ii-interlocutora', 'Silla Delphi II', 'Sillas de visita', 'MCH-SLV-04', { cover: 6 }),
  silla('mia-con-brazos', 'Silla Mia', 'Sillas de visita', 'MCH-SLV-05', { cover: 4 }),
  silla('monk-interlocutora', 'Silla Monk', 'Sillas de visita', 'MCH-SLV-06', { cover: 4 }),
  silla('rigs-interlocutora', 'Silla Rigs', 'Sillas de visita', 'MCH-SLV-07', { cover: 4 }),
  silla('slim-interlocutor', 'Silla Slim', 'Sillas de visita', 'MCH-SLV-08', { cover: 4, ficha: false }),
  silla('zao', 'Silla Zao', 'Sillas de visita', 'MCH-SLV-09', { cover: 4 }),

  // ─── COLECTIVIDADES ──────────────────────────────────────────
  silla('win', 'Silla Win', 'Colectividades', 'MCH-COL-01', { cover: 1, photos: 1 }),
  silla('volga', 'Silla Volga', 'Colectividades', 'MCH-COL-02', { cover: 4 }),
  silla('tex', 'Silla Tex', 'Colectividades', 'MCH-COL-03', { cover: 4 }),
  silla('swan', 'Silla Swan', 'Colectividades', 'MCH-COL-04', { cover: 4 }),
  silla('sol', 'Silla Sol', 'Colectividades', 'MCH-COL-05', { cover: 4, ficha: false }),
  silla('stef', 'Silla Stef', 'Colectividades', 'MCH-COL-06', { cover: 4, ficha: false }),
  silla('pop', 'Silla Pop', 'Colectividades', 'MCH-COL-07', { cover: 4 }),
  silla('patrick', 'Silla Patrick', 'Colectividades', 'MCH-COL-08', { cover: 4 }),
  silla('obi', 'Silla Obi', 'Colectividades', 'MCH-COL-09', { cover: 5, ficha: false }),
  silla('net', 'Silla Net', 'Colectividades', 'MCH-COL-10', { cover: 3 }),
  silla('misuri', 'Silla Misuri', 'Colectividades', 'MCH-COL-11', { cover: 4 }),
  silla('milei', 'Silla Milei', 'Colectividades', 'MCH-COL-12', { cover: 4 }),
  silla('lucca', 'Silla Lucca', 'Colectividades', 'MCH-COL-13', { cover: 4 }),
  silla('loti', 'Silla Loti', 'Colectividades', 'MCH-COL-14', { cover: 2, ficha: false, photos: 4 }),
  silla('kiro', 'Silla Kiro', 'Colectividades', 'MCH-COL-15', { cover: 4 }),
  silla('jack', 'Silla Jack', 'Colectividades', 'MCH-COL-16', { cover: 4 }),
  silla('glen', 'Silla Glen', 'Colectividades', 'MCH-COL-17', { cover: 4 }),
  silla('fresia', 'Silla Fresia', 'Colectividades', 'MCH-COL-18', { cover: 5, ficha: false }),
  silla('emi', 'Silla Emi', 'Colectividades', 'MCH-COL-19', { cover: 4 }),
  silla('coccolona', 'Silla Coccolona', 'Colectividades', 'MCH-COL-20', { cover: 4 }),
  silla('brent', 'Silla Brent', 'Colectividades', 'MCH-COL-21', { cover: 4, ficha: false }),
  silla('brand', 'Silla Brand', 'Colectividades', 'MCH-COL-22', { cover: 3 }),
  silla('boom', 'Silla Boom', 'Colectividades', 'MCH-COL-23', { cover: 4 }),
  silla('bertoia', 'Silla Bertoia', 'Colectividades', 'MCH-COL-24', { cover: 2, ficha: false }),

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
    { cad: false },
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

  // ─── MESAS DE REUNIÓN ────────────────────────────────────────
  mesa(
    'mesa-rectangular',
    'Mesa Rectangular',
    'Mesas de reunión',
    'MCH-MES-01',
    'Mesa de reunión rectangular que proyecta autoridad y organización. Estructura metálica o en melamina con tablero superior en melamina, vidrio o fórmica, sistema de conducción eléctrica y caja porta tomas integrada para reuniones estratégicas.',
  ),
  mesa(
    'mesa-ovalada',
    'Mesa Ovalada',
    'Mesas de reunión',
    'MCH-MES-02',
    'Mesa de reunión ovalada de líneas fluidas que favorece la comunicación visual entre los participantes. Tablero en melamina, vidrio o fórmica con conducción eléctrica oculta y caja porta tomas.',
  ),
  mesa(
    'mesa-especial',
    'Mesa Especial',
    'Mesas de reunión',
    'MCH-MES-03',
    'Mesa de reunión de formato especial diseñada a medida del espacio corporativo. Estructura y acabados de alta calidad con integración eléctrica para sesiones ejecutivas y toma de decisiones.',
  ),

  // ─── MESAS COLABORATIVAS ─────────────────────────────────────
  mesa(
    'mesa-colaborativa-circular',
    'Mesa Colaborativa Circular',
    'Mesas colaborativas',
    'MCH-MES-04',
    'Mesa colaborativa circular que combina estética ejecutiva con funcionalidad compartida. Estructura metálica y tablero en melamina; su forma fomenta la interacción y el trabajo en equipo.',
  ),
  mesa(
    'mesa-colaborativa-cuadrada',
    'Mesa Colaborativa Cuadrada',
    'Mesas colaborativas',
    'MCH-MES-05',
    'Mesa colaborativa cuadrada de diseño contemporáneo. Estructura metálica con tablero en melamina, ideal para sesiones de trabajo en grupo y dinámicas creativas.',
  ),
  mesa(
    'mesa-porta-laptop',
    'Mesa Porta Laptop',
    'Mesas colaborativas',
    'MCH-MES-06',
    'Mesa porta laptop versátil para trabajo flexible y espacios colaborativos. Estructura metálica con tablero en melamina, fácil de reconfigurar según la actividad.',
  ),

  // ─── MESAS AUXILIARES ────────────────────────────────────────
  mesa(
    'mesa-auxiliar',
    'Mesa Auxiliar',
    'Mesas auxiliares',
    'MCH-MES-07',
    'Mesa auxiliar compacta y versátil. Ofrece una superficie útil para organizar documentos, equipos o elementos decorativos. Estructura metálica con tablero en melamina.',
  ),

  // ─── DIVISIONES DE AMBIENTES ─────────────────────────────────
  division(
    'division-modular',
    'División Modular',
    'Divisiones modulares',
    'MCH-DIV-01',
    'División modular de piso a techo o media altura que reconfigura la oficina sin obra civil. Estructura metálica con plafones en melamina o vidrio, puertas tamboradas o de vidrio y canaleta de conducción eléctrica por piso para redefinir áreas manteniendo una estética ordenada.',
    { sheets: true },
  ),
  division(
    'division-aluminio-y-vidrio',
    'División de Aluminio y Vidrio',
    'Divisiones de vidrio',
    'MCH-DIV-02',
    'División de aluminio y vidrio de piso a techo que delimita áreas sin perder amplitud visual ni entrada de luz natural. Perfiles de aluminio con puerta de aluminio y vidrio, ideal para oficinas que buscan ambientes abiertos, luminosos y organizados.',
  ),

  // ─── RECEPCIONES ─────────────────────────────────
  recepcion(
    'recepcion-en-l',
    'Recepción en L',
    'MCH-REC-01',
    'Counter de recepción en L que organiza el área de bienvenida y aprovecha el espacio en esquina. Estructura en melamina / fórmica con acabados en cuarzo, porcelanato o vidrio y sistema de conducción eléctrica integrado.',
  ),
  recepcion(
    'recepcion-recta-madera',
    'Recepción Recta Madera',
    'MCH-REC-02',
    'Counter de recepción recto con frente en madera, cálido y sobrio para el punto de bienvenida. Estructura en melamina / fórmica con acabados combinables y sistema de conducción eléctrica integrado.',
  ),
  recepcion(
    'recepcion-recta-metal',
    'Recepción Recta Metal',
    'MCH-REC-03',
    'Counter de recepción recto con frente en metal, de línea moderna y robusta. Estructura en melamina / fórmica con acabados en cuarzo, porcelanato o vidrio y sistema de conducción eléctrica integrado.',
  ),

  // ─── SOFÁS (Sillonería) ─────────────────────────────────
  sofa(
    'booth-con-jardinera',
    'Booth con Jardinera',
    'MCH-SOF-01',
    'Booth de asiento envolvente con jardinera integrada que crea espacios semiprivados dentro de oficinas abiertas. Ideal para reuniones informales, focus rooms y zonas de descanso, combinando confort acústico y aislamiento visual.',
  ),
  sofa(
    'sofa-en-l',
    'Sofá en L',
    'MCH-SOF-02',
    'Sofá modular en L con jardinera, pensado para áreas de espera y lounge. Tapizado de alta resistencia sobre estructura reforzada, define zonas de estar cómodas y representativas.',
  ),
  sofa(
    'sofa-en-l-2',
    'Sofá en L II',
    'MCH-SOF-03',
    'Variante del sofá en L con jardinera, en una configuración alternativa de proporciones y módulos para adaptarse a distintos espacios de recepción y descanso.',
  ),
  sofa(
    'sofa-personal',
    'Sofá Personal',
    'MCH-SOF-04',
    'Sofá individual de líneas limpias para salas de espera, oficinas privadas y áreas colaborativas. Confort ergonómico y tapizado durable para uso intensivo.',
  ),
  sofa(
    'sofa-tripersonal',
    'Sofá Tripersonal',
    'MCH-SOF-05',
    'Sofá de tres plazas para lobbies y salas de espera de alto tránsito. Asientos de espuma de alta densidad y estructura reforzada que mantienen el confort a lo largo del tiempo.',
  ),
  sofa(
    'puff',
    'Puff',
    'MCH-SOF-06',
    'Puff tapizado versátil que aporta asientos flexibles a zonas colaborativas y de descanso. Ligero, reconfigurable y disponible en distintos acabados de tela.',
  ),
];

export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductsByCategory = (category: string): Product[] =>
  PRODUCTS.filter((p) => p.category === category);

export const getProductsBySubcategory = (subcategory: string): Product[] =>
  PRODUCTS.filter((p) => p.subcategory === subcategory);
