# Panel de contenido de maach.ec

Editor propio para cambiar textos, productos y fotos del sitio **sin recompilar
ni desplegar**. Vive en el mismo hosting, en `maach.ec/admin`.

## Cómo funciona

El sitio es estático, pero los textos no están sólo dentro del código: al
cargar, la web lee `contenido/contenido.json` desde el servidor. Ese archivo es
el que escribe este panel.

```
Editas en /admin  →  se guarda contenido.json  →  la web lo lee al cargar
```

No hay compilación de por medio ni hay que pasar por cPanel: el cambio se ve en
cuanto recargas la página.

Los despliegues **no pisan** lo editado: `contenido.json` sólo existe en el
servidor, nunca en el repositorio. Lo que sí viaja es `contenido.seed.json`, los
textos de fábrica, que se usan como respaldo si el archivo editado no existe.

## Puesta en marcha (una sola vez)

1. Entra a `https://maach.ec/admin/instalar.php` y crea el primer usuario.
   En cuanto exista uno, esa pantalla se bloquea sola.
2. Entra a `https://maach.ec/admin` con esa cuenta.
3. Desde **Usuarios** añade a las demás personas del equipo, cada una con su
   contraseña.

Si el panel avisa de que no puede escribir, dale permisos de escritura a las
carpetas `contenido/` y `admin/` desde el Administrador de archivos de cPanel
(755 suele bastar).

## Qué se puede editar

| Pantalla | Qué cambia |
|---|---|
| **Textos** | Los 864 textos del sitio, agrupados por sección y con buscador |
| **Productos** | Nombre y descripción de los 84 productos |
| **Fotos** | Reemplaza cualquier imagen por otra, conservando su sitio |
| **Usuarios** | Altas, bajas y cambios de contraseña |
| **Historial** | Quién cambió qué, y restaurar una versión anterior |

## Seguridad y red de protección

- Contraseñas guardadas con `password_hash`, nunca en claro.
- Token contra envíos desde otros sitios en cada formulario.
- Cada guardado deja una copia con fecha; se conservan las 30 últimas y se
  pueden restaurar desde **Historial** con un clic.
- Al reemplazar una foto se guarda la anterior en `contenido/respaldos/imagenes/`.
- El registro anota usuario, fecha y qué se tocó.

## Lo que el panel no hace

Añadir productos nuevos, cambiar la estructura de las páginas o tocar el diseño
sigue siendo trabajo de código. El panel está pensado para el día a día:
corregir textos, actualizar descripciones y cambiar fotos.
