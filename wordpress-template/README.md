# MAACH — Plantilla de WordPress

Réplica del sitio [maach-site](https://crpozo.github.io/maach-site/) como **tema de
WordPress**, con todo el contenido editable desde el administrador: productos,
portafolio, artículos, textos y fotos.

```
wordpress-template/
├── maach-theme/            ← el tema (esto es lo que se instala)
├── build-content.mjs       ← regenera el catálogo desde src/data
└── elementor-kit-legacy/   ← kit de Elementor anterior (obsoleto)
```

---

## Instalación en 5 pasos

1. **Comprime la carpeta** `maach-theme` en un `.zip`.

   ```bash
   cd wordpress-template && zip -r maach-theme.zip maach-theme
   ```

2. En WordPress: **Apariencia → Temas → Añadir nuevo → Subir tema**, elige el zip
   y pulsa **Instalar** y luego **Activar**.

   Al activarlo, el tema arma solo la estructura del sitio: las 6 categorías,
   las páginas, los 4 menús y los textos de portada y pie. Es instantáneo y no
   descarga nada. **El inicio ya se ve completo en este punto**, sin productos.

3. Ve a **Productos → Importar catálogo** y pulsa **Importar todo**.
   Este es el paso pesado: trae los 84 productos, el portafolio y los artículos,
   descargando sus fotos y archivos CAD a la Biblioteca de medios.
   Tarda varios minutos; no cierres la pestaña, la barra avanza sola.

4. **Ajustes → Enlaces permanentes** → pulsa **Guardar cambios**
   (esto refresca las direcciones de productos y proyectos).

5. Listo. El sitio queda idéntico al original.

> Mientras falte el paso 3 verás un aviso naranja en el administrador con un
> botón directo al importador.

> **Requisitos**: WordPress 6.0+, PHP 7.4+, y que el servidor tenga salida a
> internet durante la importación. No hace falta ningún plugin.

### Alternativa por línea de comandos

Si tienes WP-CLI, todo el paso 3 es:

```bash
wp maach importar
```

---

## Qué crea el importador

| Contenido | Cantidad | Dónde se edita |
|---|---|---|
| Productos | 84 | Productos |
| Categorías | 6 | Productos → Categorías |
| Subcategorías | 21 | Productos → Subcategorías |
| Proyectos | 3 | Portafolio |
| Artículos | 3 | Entradas |
| Páginas | 6 | Páginas |
| Menús | 4 | Apariencia → Menús |

Volver a ejecutarlo **no duplica nada**: actualiza lo que ya existe. Las imágenes
ya descargadas se reutilizan, así que la segunda vez es mucho más rápida.

---

## Cómo se edita cada cosa

### Un producto

**Productos → (elegir uno)**. Todo está en la misma pantalla:

- **Título** y **Extracto** → nombre y descripción que salen en la tarjeta negra.
- **Datos del producto** → SKU, características técnicas (una por línea) y el
  texto de dimensiones.
- **Galería de fotos** → añadir, quitar y **arrastrar para reordenar**. La primera
  foto es la portada del catálogo.
- **Documentos descargables** → pega la URL del `.pdf`, `.dwg`, `.rfa` o `.skp`.
  Los formatos que dejes vacíos no aparecen; si no hay ningún CAD/BIM, el botón
  «BIM / CAD» tampoco se muestra.
- **Categorías / Subcategorías** → a la derecha.

Si dejas las **características vacías**, la ficha muestra automáticamente las de
su subcategoría — el mismo comportamiento del sitio original.

### Una categoría o subcategoría

**Productos → Categorías**. Cada una tiene dos campos propios: la
**introducción** (el párrafo bajo el título) y las **características técnicas**,
que heredan todos sus productos.

### Un proyecto del portafolio

**Portafolio → (elegir uno)**. Ubicación, alcance, área, año, la galería y las
tres secciones editoriales (Desafío / Propuesta / Resultado). Si dejas las tres
vacías, el proyecto se publica sólo con portada y galería — así está CAME hoy.

### Textos del sitio

**Apariencia → Personalizar → MAACH**: portada, contacto, redes, pie y el texto
de dimensiones por defecto. Ahí también se decide si se piden datos antes de
descargar un documento.

### Menús

**Apariencia → Menús**. Hay cuatro ubicaciones: menú principal y las tres
columnas del pie. El mega menú de Productos se arma solo con las categorías que
existan, así que crear una categoría nueva la agrega al menú sin tocar nada.

---

## Descargas de documentos

Cuando alguien baja un `.dwg`, `.rfa`, `.skp` o la ficha en PDF, primero completa
un formulario corto. Esos datos quedan en **Productos → Descargas** (nombre,
correo, empresa, ocupación, qué documento y de qué producto).

Para desactivarlo y que la descarga sea directa:
**Personalizar → MAACH → Ficha de producto → Pedir datos antes de descargar → No**.

WordPress no permite subir archivos `.dwg`/`.rfa`/`.skp` por defecto; el tema los
habilita en la Biblioteca de medios.

---

## Regenerar el catálogo

`maach-theme/data/maach-content.json` es la foto del catálogo que usa el
importador. Si cambia el sitio original (`src/data/*`), se regenera con:

```bash
node wordpress-template/build-content.mjs
```

Lee `src/data/productos.ts`, `categorias.ts` y `blogs.ts`, toma los textos en
español del diccionario i18n y arma el JSON con URLs absolutas a las imágenes y
archivos publicados.

---

## Detalles de la réplica

- **Tipografías**: las 16 fuentes de marca (Clash Grotesk, Monoblock y las
  secundarias) van dentro del tema. No se cargan desde ningún servicio externo.
- **CSS**: `style.css` es el mismo `src/index.css` del sitio original, portado
  tal cual, más un bloque final con lo específico de WordPress.
- **Comportamiento**: los mega menús, la galería con miniaturas, el lightbox del
  portafolio y el formulario de descarga están reescritos en JavaScript sin
  dependencias (`assets/js/maach.js`).
- **Diferencias a propósito**:
  - **Sólo español**. El sitio original es bilingüe; el tema no incluye el
    selector ES/EN. Se puede añadir después con Polylang.
  - **La Biblioteca de documentos es real**: recorre los productos y lista los
    archivos que existen de verdad, en vez de la tabla de ejemplo del original.
  - **Palladium** no se importa, igual que en el sitio.

---

## Formulario de contacto

La página Contacto trae un formulario propio que envía por correo. Si prefieres
Contact Form 7 (o cualquier otro), instala el plugin y pega su shortcode en el
contenido de la página: el tema detecta que hay contenido y muestra ese en lugar
del formulario propio.

---

## Kit de Elementor anterior

`elementor-kit-legacy/` es la versión previa: ocho páginas sueltas como
plantillas de Elementor, sin productos ni fichas. Se conserva sólo por
referencia; **el tema lo reemplaza por completo**. No hace falta instalarlo ni
tener Elementor.
