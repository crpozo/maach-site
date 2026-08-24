<?php
/** Registro de cambios y restauración de una versión anterior. */
require __DIR__ . '/config.php';
exigir_sesion();

$titulo = 'Historial';
$aviso  = '';
$error  = '';

if ( 'POST' === $_SERVER['REQUEST_METHOD'] ) {
	if ( ! token_valido( $_POST['token'] ?? null ) ) {
		$error = 'La sesión caducó. Vuelve a intentarlo.';
	} else {
		$archivo = basename( (string) ( $_POST['respaldo'] ?? '' ) );
		$ruta    = RESPALDOS . '/' . $archivo;
		if ( ! preg_match( '/^contenido-\d{8}-\d{6}\.json$/', $archivo ) || ! is_readable( $ruta ) ) {
			$error = 'Esa versión no existe.';
		} else {
			$datos = json_decode( (string) file_get_contents( $ruta ), true );
			if ( ! is_array( $datos ) ) {
				$error = 'La versión guardada está dañada.';
			} else {
				$fallo = guardar_contenido( $datos, 'Restaurada la versión ' . $archivo );
				$aviso = $fallo ? '' : 'Contenido restaurado. El sitio ya muestra esa versión.';
				$error = $fallo;
			}
		}
	}
}

$respaldos = array_reverse( glob( RESPALDOS . '/contenido-*.json' ) ?: array() );
require __DIR__ . '/cabecera.php';
?>
<h1>Historial</h1>
<p class="ayuda">Cada guardado deja una copia. Si algo sale mal, puedes volver a una versión anterior.</p>

<?php if ( $aviso ) : ?><div class="aviso ok"><?php echo e( $aviso ); ?></div><?php endif; ?>
<?php if ( $error ) : ?><div class="aviso error"><?php echo e( $error ); ?></div><?php endif; ?>

<h2>Últimos cambios</h2>
<div class="tarjeta registro">
	<?php $lineas = ultimos_cambios( 20 ); ?>
	<?php if ( ! $lineas ) : ?>
		Todavía no se ha guardado ningún cambio.
	<?php else : ?>
		<?php foreach ( $lineas as $linea ) : ?>
			<?php echo e( $linea ); ?><br>
		<?php endforeach; ?>
	<?php endif; ?>
</div>

<h2>Versiones guardadas</h2>
<?php if ( ! $respaldos ) : ?>
	<div class="tarjeta">Aún no hay versiones anteriores.</div>
<?php else : ?>
	<table>
		<tr><th>Versión</th><th>Fecha</th><th></th></tr>
		<?php foreach ( array_slice( $respaldos, 0, 30 ) as $ruta ) : ?>
			<?php
			$archivo = basename( $ruta );
			preg_match( '/(\d{4})(\d{2})(\d{2})-(\d{2})(\d{2})(\d{2})/', $archivo, $m );
			$fecha = $m ? "$m[3]/$m[2]/$m[1] $m[4]:$m[5]" : '';
			?>
			<tr>
				<td class="clave"><?php echo e( $archivo ); ?></td>
				<td><?php echo e( $fecha ); ?></td>
				<td>
					<form method="post" onsubmit="return confirm('¿Restaurar el contenido a esta versión?')">
						<input type="hidden" name="token" value="<?php echo e( token() ); ?>">
						<input type="hidden" name="respaldo" value="<?php echo e( $archivo ); ?>">
						<button class="boton claro" type="submit">Restaurar</button>
					</form>
				</td>
			</tr>
		<?php endforeach; ?>
	</table>
<?php endif; ?>
</main></body></html>
