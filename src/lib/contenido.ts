/**
 * Contenido editable en caliente.
 *
 * El sitio es estático, pero los textos no viven sólo en el código: al
 * arrancar se carga `contenido/contenido.json`, el archivo que escribe el
 * panel /admin en el servidor. Lo que venga ahí tiene prioridad sobre lo
 * compilado, así un cambio desde el panel se ve al instante, sin recompilar
 * ni desplegar.
 *
 * Si el archivo no existe (desarrollo, GitHub Pages o una instalación recién
 * hecha) se usa `contenido.seed.json`, que sí viaja en el repositorio. Y si
 * tampoco está, el sitio funciona igual con los textos compilados.
 */

type Contenido = {
  version?: number;
  /** Textos en español. */
  textos?: Record<string, string>;
  /** Textos en inglés. */
  textos_en?: Record<string, string>;
  productos?: Record<string, { nombre?: string; sku?: string; descripcion?: string }>;
};

let contenido: Contenido = {};

/** Texto editado desde el panel para ese idioma, si existe. */
export function textoEditado(clave: string, idioma: 'es' | 'en' = 'es'): string | undefined {
  const diccionario = 'en' === idioma ? contenido.textos_en : contenido.textos;
  const valor = diccionario?.[clave];
  return typeof valor === 'string' && valor.length > 0 ? valor : undefined;
}

/** Datos editados de un producto, si existen. */
export function productoEditado(slug: string) {
  return contenido.productos?.[slug];
}

/**
 * Carga el contenido antes de pintar la página. Nunca lanza: ante cualquier
 * fallo el sitio arranca con lo compilado.
 */
export async function cargarContenido(): Promise<void> {
  // Ojo: no se usa asset(), que apunta a /assets/. El contenido vive en
  // /contenido/, junto a la raíz del sitio.
  const base = import.meta.env.BASE_URL;
  const candidatos = [`${base}contenido/contenido.json`, `${base}contenido/contenido.seed.json`];
  for (const url of candidatos) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) continue;
      const datos = (await res.json()) as Contenido;
      if (datos && typeof datos === 'object') {
        contenido = datos;
        return;
      }
    } catch {
      // Se prueba el siguiente candidato.
    }
  }
}
