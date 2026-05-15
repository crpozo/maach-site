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

export const PRODUCTS: Product[] = [
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
