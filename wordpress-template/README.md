# MAACH — Plantilla WordPress editable en Elementor

Réplica del sitio [maach-site](https://crpozo.github.io/maach-site/) como plantillas de
Elementor (gratis, sin Pro), 100% editables desde el editor visual.

## Contenido

| Archivo | Qué es |
|---|---|
| `templates/00-header.json` | Barra de navegación (plantilla de sección) |
| `templates/01-footer.json` | Footer negro con manifiesto (plantilla de sección) |
| `templates/10-inicio.json` | Página de inicio |
| `templates/11-productos.json` | Catálogo / Productos (con anclas por categoría) |
| `templates/12-espacios.json` | Espacios |
| `templates/13-portafolio.json` | Portafolio |
| `templates/14-investigacion.json` | Investigación (blog) |
| `templates/15-sobre-maach.json` | Sobre MAACH |
| `templates/16-contacto.json` | Contacto |
| `templates/17-recursos-biblioteca.json` | Recursos de diseño / Biblioteca |
| `maach-custom.css` | Tipografías de marca + utilidades (obligatorio) |

## Instalación (WordPress + Elementor gratis)

1. **Tema**: instala y activa **Hello Elementor** (Apariencia → Temas → Añadir nuevo).
2. **Plugin**: instala **Elementor** (gratis).
3. **CSS de marca** (obligatorio): copia todo `maach-custom.css` en
   **Apariencia → Personalizar → CSS adicional**. Esto carga las tipografías
   *Clash Grotesk* y *Monoblock* desde el sitio en vivo.
4. **Importar plantillas**: en **Plantillas → Plantillas guardadas → Importar plantillas**,
   sube los 10 archivos `.json` de la carpeta `templates/`.
5. **Crear las páginas** (Páginas → Añadir nueva, con estos slugs exactos):

   | Página | Slug | Plantilla a insertar |
   |---|---|---|
   | Inicio | `/` (marcar como portada) | 10-inicio |
   | Productos | `productos` | 11-productos |
   | Espacios | `espacios` | 12-espacios |
   | Portafolio | `portafolio` | 13-portafolio |
   | Investigación | `investigacion` | 14-investigacion |
   | Sobre MAACH | `sobre-maach` | 15-sobre-maach |
   | Contacto | `contacto` | 16-contacto |
   | Recursos | `recursos-diseno-biblioteca` | 17-recursos-biblioteca |

   En cada página: **Editar con Elementor → icono de carpeta (Añadir plantilla) →
   Mis plantillas → Insertar**. Los enlaces internos entre páginas ya apuntan a esos slugs.

6. **Header y footer en todo el sitio** — dos opciones:
   - **Gratis**: plugin **Elementor Header & Footer Builder** (Brainstorm Force).
     Crea un header nuevo, edítalo con Elementor e inserta la plantilla `00-header`
     (igual con `01-footer` como footer). Display: todo el sitio.
   - **Con Elementor Pro**: Theme Builder → Header/Footer → insertar las mismas plantillas.

## Formulario de contacto

La página Contacto trae un widget *Shortcode* con `[contact-form-7 id="TODO"]`.
Instala **Contact Form 7**, crea el formulario (Nombre, Email, Teléfono, Empresa, Mensaje)
y reemplaza `TODO` por el ID real del formulario.

## Imágenes y fuentes

Las imágenes y las fuentes se cargan por URL directa desde
`https://crpozo.github.io/maach-site/assets/…` (el sitio en vivo en GitHub Pages).
Ventaja: la importación funciona de una y pesa poco.
Para independizarte de GitHub Pages: sube las imágenes a la Biblioteca de medios y
reemplázalas desde Elementor (clic en la imagen → elegir de la biblioteca), y sube los
`.woff2` al servidor ajustando las URLs del CSS.

## Colores globales (opcional, recomendado)

En Elementor → **Site Settings → Global Colors** registra la paleta para tenerla a un clic:

- Jet Black `#161616` · Blanco `#FFFFFF` · Lava Orange `#F34A23`
- Mid Grey `#6F6F6F` · Sand Grey `#A9AAAC` · Line Grey `#E5E3E4`

Y en **Global Fonts**: títulos *Clash Grotesk* (peso 500, mayúsculas),
texto *Clash Grotesk* 400, acentos/botones *Monoblock* 600.

## Límites conocidos

- El **mega-menú** de Productos y el menú móvil del sitio original usan JavaScript propio;
  el header de la plantilla usa enlaces simples (con Elementor Pro puedes montar el
  mega-menú con el widget Nav Menu).
- Los efectos *hover-reveal* de algunas tarjetas se muestran en su estado fijo.
- Las páginas de detalle (producto, proyecto, artículo) no se incluyen; sus enlaces
  apuntan a la página lista correspondiente.
- El sitio original es bilingüe ES/EN; la plantilla usa el español. Para EN: Polylang o WPML
  duplicando páginas.
