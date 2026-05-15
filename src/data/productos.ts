// MAACH product catalog with real assets.
// Drop product photos under public/assets/productos/<category-slug>/<product-slug>/<n>.webp
// and reference them from a Product entry's gallery array.
//
// PageProducts.tsx renders these entries first (sorted by category order),
// then fills the catalog grid with generic placeholders for subcategories
// that don't have a real entry yet. PageProductDetail.tsx looks up by
// slug and falls back to its existing placeholder rendering otherwise.

import { asset } from '../lib/asset';

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
  /** Optional tech-sheet PDF link (downloadable). */
  sheet?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: 'biblioteca-alta',
    name: 'Biblioteca Alta',
    category: 'Almacenamiento',
    subcategory: 'Biblioteca Alta',
    sku: 'MCH-ALM-01',
    description:
      'Biblioteca alta de gran capacidad con puertas en distintos acabados (madera, melamina o color). Estructura interna con repisas reconfigurables y herrajes ocultos. Pensada para áreas directivas, oficinas privadas y zonas de archivo de alta densidad.',
    gallery: [
      asset('productos/almacenamiento/biblioteca-alta/01.webp'),
      asset('productos/almacenamiento/biblioteca-alta/02.webp'),
      asset('productos/almacenamiento/biblioteca-alta/03.webp'),
      asset('productos/almacenamiento/biblioteca-alta/04.webp'),
      asset('productos/almacenamiento/biblioteca-alta/05.webp'),
    ],
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductsByCategory = (category: string): Product[] =>
  PRODUCTS.filter((p) => p.category === category);

export const getProductsBySubcategory = (subcategory: string): Product[] =>
  PRODUCTS.filter((p) => p.subcategory === subcategory);
