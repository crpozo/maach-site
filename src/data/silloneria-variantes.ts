// Inventario consolidado de Sillonería con sus variantes (colores,
// tapices o sub-tipos) según el brief del brand owner. Los `slug`
// coinciden 1:1 con los Product.slug definidos en productos.ts.
//
// Tipo Variant es recursivo para soportar tanto listas simples de
// colores como agrupaciones anidadas (p.ej. Emi → Butaco / Silla →
// Gris / Terracota; Volga → Con Tapiz / Sin Tapiz → colores).

export type Variant = string | { label: string; options: Variant[] };

export type VariantItem = {
  slug: string;
  name: string;
  variants?: Variant[];
};

export type VariantSection = {
  slug: string;
  name: string;
  items: VariantItem[];
};

export const SILLONERIA_INVENTORY: VariantSection[] = [
  {
    slug: 'sillas-presidente',
    name: 'Presidenciales',
    items: [
      { slug: 'levi-plus', name: 'Levi Plus' },
      { slug: 'levi-plus-ii', name: 'Levi Plus II' },
      { slug: 'pulse', name: 'Pulse' },
      { slug: 'vick-presidente', name: 'Vick' },
      { slug: 'winner-presidente-base-nylon', name: 'Winner' },
      { slug: 'silla-zur', name: 'Zur' },
    ],
  },
  {
    slug: 'sillas-gerenciales',
    name: 'Gerenciales',
    items: [
      { slug: 'monk-presidente', name: 'Monk', variants: ['Negro', 'Gris'] },
      { slug: 'slim-presidente-base-nylon', name: 'Slim' },
      { slug: 'spike-presidente-base-nylon', name: 'Spike' },
      { slug: 'style-presidente', name: 'Styles' },
      { slug: 'silla-think-presidente', name: 'Think', variants: ['Gris', 'Negro'] },
    ],
  },
  {
    slug: 'sillas-operativas',
    name: 'Operativas',
    items: [
      { slug: 'liam-gerente', name: 'Liam', variants: ['Malla', 'Syncro'] },
      { slug: 'mark-gerente', name: 'Mark', variants: ['Gris', 'Negro'] },
      { slug: 'monk-gerente', name: 'Monk', variants: ['Gris', 'Negro'] },
      { slug: 'radius', name: 'Radius' },
      { slug: 'slim-gerente', name: 'Slim', variants: ['Aluminio', 'Nylon'] },
      { slug: 'think-gerente', name: 'Think', variants: ['Negro', 'Gris'] },
      { slug: 'vick-gerente', name: 'Vick', variants: ['Aluminio', 'Nylon'] },
    ],
  },
  {
    slug: 'sillas-de-visita',
    name: 'Visitas',
    items: [
      { slug: 'andy-interlocutora', name: 'Andy', variants: ['Blanco Gris', 'Gris', 'Negro'] },
      { slug: 'blade', name: 'Blade', variants: ['Blanco', 'Camel', 'Plomo'] },
      { slug: 'delphi-ii-interlocutora', name: 'Delphi II' },
      { slug: 'mia-con-brazos', name: 'Mia' },
      { slug: 'monk-interlocutora', name: 'Monk' },
      {
        slug: 'pinko',
        name: 'Pinko',
        variants: ['Blanco Gris', 'Gris', 'Negro', 'Blanco + patas blancas'],
      },
      { slug: 'rigs-interlocutora', name: 'Rigs' },
      { slug: 'slim-interlocutor', name: 'Slim' },
      { slug: 'zao', name: 'Zao', variants: ['Cromo', 'Negro'] },
    ],
  },
  {
    slug: 'colectividades',
    name: 'Colectivas',
    items: [
      { slug: 'bertoia', name: 'Bertoia', variants: ['Blanco', 'Cromada', 'Negro'] },
      { slug: 'boom', name: 'Boom', variants: ['Azul', 'Gris', 'Mostaza'] },
      { slug: 'brand', name: 'Brand', variants: ['Negra', 'Blanca'] },
      { slug: 'brent', name: 'Brent' },
      { slug: 'coccolona', name: 'Coccolona', variants: ['Silla', 'Sofa'] },
      {
        slug: 'emi',
        name: 'Emi',
        variants: [
          { label: 'Butaco', options: ['Gris', 'Terracota'] },
          { label: 'Silla', options: ['Gris', 'Terracota'] },
        ],
      },
      { slug: 'fresia', name: 'Fresia' },
      { slug: 'glen', name: 'Glen' },
      { slug: 'jack', name: 'Jack' },
      { slug: 'kiro', name: 'Kiro', variants: ['Arena', 'Negro'] },
      { slug: 'loti', name: 'Lotti' },
      { slug: 'lucca', name: 'Lucca', variants: ['Azul', 'Gris'] },
      { slug: 'milei', name: 'Milei', variants: ['Gris', 'Verde Esmeralda'] },
      { slug: 'misuri', name: 'Misuri', variants: ['Arena', 'Blanco', 'Gris', 'Negro'] },
      { slug: 'net', name: 'Net', variants: ['Blanco', 'Gris'] },
      { slug: 'obi', name: 'Obi' },
      { slug: 'patrick', name: 'Patrick', variants: ['Camel', 'Negro'] },
      { slug: 'pop', name: 'Pop' },
      { slug: 'sol', name: 'Sol' },
      { slug: 'stef', name: 'Stef' },
      { slug: 'swan', name: 'Swan' },
      { slug: 'tex', name: 'Tex' },
      {
        slug: 'volga',
        name: 'Volga',
        variants: [
          { label: 'Con Tapiz', options: ['Blanco Gris', 'Gris'] },
          { label: 'Sin Tapiz', options: ['Blanca', 'Gris', 'Negro'] },
        ],
      },
      { slug: 'win', name: 'Win' },
    ],
  },
];

// Helpers ------------------------------------------------------------

/** All items across every section in a single flat array. */
export const SILLONERIA_FLAT: VariantItem[] = SILLONERIA_INVENTORY.flatMap((s) => s.items);

/** Lookup an inventory item by product slug. */
export function getVariantsBySlug(slug: string): VariantItem | undefined {
  return SILLONERIA_FLAT.find((i) => i.slug === slug);
}

/** Count distinct variant leaves for an item — handles nested groups. */
export function countVariants(item: VariantItem): number {
  if (!item.variants) return 0;
  const walk = (v: Variant): number =>
    typeof v === 'string' ? 1 : v.options.reduce((acc, x) => acc + walk(x), 0);
  return item.variants.reduce((acc, v) => acc + walk(v), 0);
}

/** Format an item's variants as a printable string. */
export function formatVariants(item: VariantItem): string {
  if (!item.variants) return '—';
  const walk = (v: Variant): string =>
    typeof v === 'string' ? v : `${v.label}: ${v.options.map(walk).join(', ')}`;
  return item.variants.map(walk).join(' · ');
}
