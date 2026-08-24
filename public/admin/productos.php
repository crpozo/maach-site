<?php
/** Edición de los productos del catálogo: nombre y descripción. */
require __DIR__ . '/config.php';
exigir_sesion();

$titulo    = 'Productos';
$aviso     = '';
$error     = '';
$contenido = leer_contenido();

if ( 'POST' === $_SERVER['REQUEST_METHOD'] ) {
	if ( ! token_valido( $_POST['token'] ?? null ) ) {
		$error = 'La sesión caducó. Vuelve a intentarlo.';
	} else {
		$cambios = 0;
		foreach ( (array) ( $_POST['prod'] ?? array() ) as $slug => $campos ) {
			$slug = (string) $slug;
			$nombre      = trim( (string) ( $campos['nombre'] ?? '' ) );
			$descripcion = trim( (string) ( $campos['descripcion'] ?? '' ) );

			// El sitio lee el nombre y la descripción del producto por estas
			// claves de texto, así que se escriben ahí.
			foreach ( array( 'prod.name.' . $slug => $nombre, 'prod.desc.' . $slug => $descripcion ) as $clave => $valor ) {
				if ( '' !== $valor && ( ( $contenido['textos'][ $clave ] ?? null ) !== $valor ) ) {
					$contenido['textos'][ $clave ] = $valor;
					++$cambios;
				}
			}
			if ( '' !== $nombre ) {
				$contenido['productos'][ $slug ]['nombre'] = $nombre;
			}
			if ( '' !== $descripcion ) {
				$contenido['productos'][ $slug ]['descripcion'] = $descripcion;
			}
		}
		if ( $cambios ) {
			$fallo = guardar_contenido( $contenido, sprintf( 'Productos: %d campo(s)', $cambios ) );
			$aviso = $fallo ? '' : sprintf( 'Guardado. %d campo(s) actualizado(s).', $cambios );
			$error = $fallo;
			$contenido = leer_contenido();
		} else {
			$aviso = 'No hubo cambios que guardar.';
		}
	}
}

$productos = (array) ( $contenido['productos'] ?? array() );
$textos    = (array) ( $contenido['textos'] ?? array() );
$buscar    = trim( (string) ( $_GET['buscar'] ?? '' ) );

// Nombre y descripción vigentes: manda lo editado en textos.
foreach ( $productos as $slug => $datos ) {
	$productos[ $slug ]['nombre']      = $textos[ 'prod.name.' . $slug ] ?? ( $datos['nombre'] ?? $slug );
	$productos[ $slug ]['descripcion'] = $textos[ 'prod.desc.' . $slug ] ?? ( $datos['descripcion'] ?? '' );
}
uasort( $productos, static fn( $a, $b ): int => strcmp( (string) $a['nombre'], (string) $b['nombre'] ) );

require __DIR__ . '/cabecera.php';
?>
<h1>Productos</h1>
<p class="ayuda">
	Nombre y descripción de cada uno de los <?php echo count( $productos ); ?> productos.
	Las fotos y los archivos CAD se gestionan desde «Fotos».
</p>

<?php if ( $aviso ) : ?><div class="aviso ok"><?php echo e( $aviso ); ?></div><?php endif; ?>
<?php if ( $error ) : ?><div class="aviso error"><?php echo e( $error ); ?></div><?php endif; ?>

<form method="get" class="buscador">
	<input type="text" name="buscar" value="<?php echo e( $buscar ); ?>" placeholder="Buscar un producto…">
</form>

<form method="post">
	<input type="hidden" name="token" value="<?php echo e( token() ); ?>">
	<?php
	$mostrados = 0;
	foreach ( $productos as $slug => $datos ) :
		if ( $buscar && false === mb_stripos( (string) $datos['nombre'], $buscar ) && false === mb_stripos( $slug, $buscar ) ) {
			continue;
		}
		++$mostrados;
		?>
		<details class="grupo" <?php echo $buscar ? 'open' : ''; ?>>
			<summary>
				<span><?php echo e( $datos['nombre'] ); ?></span>
				<span class="cuenta"><?php echo e( $datos['sku'] ?? '' ); ?></span>
			</summary>
			<div>
				<div class="campo">
					<label for="n-<?php echo e( $slug ); ?>">Nombre</label>
					<input type="text" id="n-<?php echo e( $slug ); ?>"
						name="prod[<?php echo e( $slug ); ?>][nombre]" value="<?php echo e( $datos['nombre'] ); ?>">
				</div>
				<div class="campo">
					<label for="d-<?php echo e( $slug ); ?>">Descripción</label>
					<textarea id="d-<?php echo e( $slug ); ?>"
						name="prod[<?php echo e( $slug ); ?>][descripcion]"><?php echo e( $datos['descripcion'] ); ?></textarea>
				</div>
				<div class="clave">
					Dirección en el sitio: /productos/…/<?php echo e( $slug ); ?>
				</div>
			</div>
		</details>
	<?php endforeach; ?>

	<?php if ( $buscar && 0 === $mostrados ) : ?>
		<div class="tarjeta">Ningún producto coincide con «<?php echo e( $buscar ); ?>».</div>
	<?php endif; ?>

	<div class="guardar-fijo">
		<span class="ayuda" style="margin:0">Los cambios se aplican al sitio en cuanto guardas.</span>
		<button class="boton naranja" type="submit">Guardar cambios</button>
	</div>
</form>
</main></body></html>
