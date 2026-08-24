<?php
/**
 * Reemplazo de fotos del sitio.
 *
 * No se suben archivos nuevos a ciegas: se elige una imagen que ya existe y se
 * sustituye por otra. Así el sitio nunca queda apuntando a una ruta que no
 * está, y el nombre del archivo no cambia.
 */
require __DIR__ . '/config.php';
exigir_sesion();

$titulo = 'Fotos';
$aviso  = '';
$error  = '';

const CARPETA_MEDIOS = RAIZ . '/assets';
const EXT_PERMITIDAS = array( 'webp', 'jpg', 'jpeg', 'png', 'avif' );

/** Rutas relativas de todas las imágenes del sitio, ordenadas. */
function listar_imagenes(): array {
	$salida = array();
	if ( ! is_dir( CARPETA_MEDIOS ) ) {
		return $salida;
	}
	$it = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( CARPETA_MEDIOS, FilesystemIterator::SKIP_DOTS ) );
	foreach ( $it as $archivo ) {
		if ( ! $archivo->isFile() ) {
			continue;
		}
		$ext = strtolower( $archivo->getExtension() );
		if ( in_array( $ext, EXT_PERMITIDAS, true ) ) {
			$salida[] = str_replace( CARPETA_MEDIOS . '/', '', $archivo->getPathname() );
		}
	}
	sort( $salida );
	return $salida;
}

if ( 'POST' === $_SERVER['REQUEST_METHOD'] ) {
	if ( ! token_valido( $_POST['token'] ?? null ) ) {
		$error = 'La sesión caducó. Vuelve a intentarlo.';
	} else {
		$destino_rel = (string) ( $_POST['destino'] ?? '' );
		$subida      = $_FILES['imagen'] ?? null;

		// La ruta debe ser una de las que listamos: nada de subir a cualquier sitio.
		if ( ! in_array( $destino_rel, listar_imagenes(), true ) ) {
			$error = 'Elige una imagen de la lista.';
		} elseif ( ! $subida || UPLOAD_ERR_OK !== ( $subida['error'] ?? 1 ) ) {
			$error = 'No se recibió el archivo. ¿Pesa más de lo que permite el servidor?';
		} else {
			$tipo = @getimagesize( $subida['tmp_name'] );
			$ext  = strtolower( pathinfo( $destino_rel, PATHINFO_EXTENSION ) );
			if ( ! $tipo ) {
				$error = 'El archivo no parece una imagen válida.';
			} else {
				$destino_abs = CARPETA_MEDIOS . '/' . $destino_rel;
				// Copia de seguridad de la imagen anterior.
				$respaldo = RESPALDOS . '/imagenes/' . date( 'Ymd-His' ) . '-' . str_replace( '/', '_', $destino_rel );
				@mkdir( dirname( $respaldo ), 0755, true );
				@copy( $destino_abs, $respaldo );

				if ( @move_uploaded_file( $subida['tmp_name'], $destino_abs ) ) {
					@file_put_contents(
						REGISTRO,
						sprintf( "[%s] %s · Foto reemplazada: %s\n", date( 'c' ), usuario_actual(), $destino_rel ),
						FILE_APPEND | LOCK_EX
					);
					$aviso = 'Foto reemplazada. Si la sigues viendo igual, recarga con Ctrl+F5 (el navegador la tenía guardada).';
				} else {
					$error = 'No se pudo escribir el archivo. Revisa los permisos de la carpeta assets/.';
				}
			}
		}
	}
}

$imagenes = listar_imagenes();
$buscar   = trim( (string) ( $_GET['buscar'] ?? '' ) );
$filtradas = $buscar
	? array_values( array_filter( $imagenes, static fn( $r ): bool => false !== mb_stripos( $r, $buscar ) ) )
	: $imagenes;

require __DIR__ . '/cabecera.php';
?>
<h1>Fotos</h1>
<p class="ayuda">
	Para cambiar una foto, búscala, elige el archivo nuevo y súbelo: reemplaza a la anterior
	conservando su sitio en la web. Hay <?php echo count( $imagenes ); ?> imágenes.
	Conviene subir la nueva con una forma parecida a la que sustituye.
</p>

<?php if ( $aviso ) : ?><div class="aviso ok"><?php echo e( $aviso ); ?></div><?php endif; ?>
<?php if ( $error ) : ?><div class="aviso error"><?php echo e( $error ); ?></div><?php endif; ?>

<form method="get" class="buscador">
	<input type="text" name="buscar" value="<?php echo e( $buscar ); ?>"
		placeholder="Buscar por nombre… (por ejemplo: portada, planta, credenza)">
</form>

<?php if ( ! $buscar ) : ?>
	<div class="tarjeta">Escribe algo en el buscador para ver las fotos. Por ejemplo <b>portada</b>, <b>planta</b> o el nombre de un producto.</div>
<?php else : ?>
	<p class="ayuda"><?php echo count( $filtradas ); ?> resultado(s)</p>
	<?php foreach ( array_slice( $filtradas, 0, 40 ) as $ruta ) : ?>
		<div class="tarjeta" style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
			<img src="/assets/<?php echo e( $ruta ); ?>?v=<?php echo (int) @filemtime( CARPETA_MEDIOS . '/' . $ruta ); ?>"
				alt="" style="width:150px;height:110px;object-fit:contain;background:#f4f4f4;border:1px solid var(--linea)">
			<div style="flex:1;min-width:260px">
				<div class="clave" style="margin-bottom:10px"><?php echo e( $ruta ); ?></div>
				<form method="post" enctype="multipart/form-data" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
					<input type="hidden" name="token" value="<?php echo e( token() ); ?>">
					<input type="hidden" name="destino" value="<?php echo e( $ruta ); ?>">
					<input type="file" name="imagen" accept="image/*" required style="flex:1;min-width:200px">
					<button class="boton claro" type="submit">Reemplazar</button>
				</form>
			</div>
		</div>
	<?php endforeach; ?>
	<?php if ( count( $filtradas ) > 40 ) : ?>
		<div class="tarjeta">Se muestran las primeras 40. Afina la búsqueda para ver el resto.</div>
	<?php endif; ?>
<?php endif; ?>
</main></body></html>
