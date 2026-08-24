<?php
/** Edición de todos los textos del sitio, agrupados por sección. */
require __DIR__ . '/config.php';
exigir_sesion();

$titulo  = 'Textos';
$aviso   = '';
$error   = '';
$contenido = leer_contenido();
$seed      = leer_seed();

if ( 'POST' === $_SERVER['REQUEST_METHOD'] ) {
	if ( ! token_valido( $_POST['token'] ?? null ) ) {
		$error = 'La sesión caducó. Vuelve a intentarlo.';
	} else {
		$enviados = (array) ( $_POST['texto'] ?? array() );
		$cambios  = 0;
		foreach ( $enviados as $clave => $valor ) {
			$clave = (string) $clave;
			$valor = trim( (string) $valor );
			if ( ! isset( $contenido['textos'][ $clave ] ) || $contenido['textos'][ $clave ] !== $valor ) {
				$contenido['textos'][ $clave ] = $valor;
				++$cambios;
			}
		}
		if ( $cambios ) {
			$fallo = guardar_contenido( $contenido, sprintf( 'Textos: %d cambio(s)', $cambios ) );
			$aviso = $fallo ? '' : sprintf( 'Guardado. %d texto(s) actualizado(s); ya se ven en el sitio.', $cambios );
			$error = $fallo;
			$contenido = leer_contenido();
		} else {
			$aviso = 'No hubo cambios que guardar.';
		}
	}
}

$textos = (array) ( $contenido['textos'] ?? array() );
$grupos = grupos_de_textos( $textos );
$buscar = trim( (string) ( $_GET['buscar'] ?? '' ) );

require __DIR__ . '/cabecera.php';
?>
<h1>Textos del sitio</h1>
<p class="ayuda">
	Cambia cualquier texto y pulsa Guardar: se ve en el sitio al instante, sin publicar nada.
	Son <?php echo count( $textos ); ?> textos agrupados por sección.
</p>

<?php if ( $aviso ) : ?><div class="aviso ok"><?php echo e( $aviso ); ?></div><?php endif; ?>
<?php if ( $error ) : ?><div class="aviso error"><?php echo e( $error ); ?></div><?php endif; ?>

<form method="get" class="buscador">
	<input type="text" name="buscar" value="<?php echo e( $buscar ); ?>"
		placeholder="Buscar un texto… (por ejemplo: Hablemos)">
</form>

<form method="post">
	<input type="hidden" name="token" value="<?php echo e( token() ); ?>">

	<?php
	$mostrados = 0;
	foreach ( $grupos as $seccion => $claves ) :
		if ( $buscar ) {
			$claves = array_filter(
				$claves,
				static fn( $v, $k ): bool => false !== mb_stripos( (string) $v, $buscar ) || false !== mb_stripos( (string) $k, $buscar ),
				ARRAY_FILTER_USE_BOTH
			);
			if ( ! $claves ) {
				continue;
			}
		}
		$mostrados += count( $claves );
		?>
		<details class="grupo" <?php echo $buscar ? 'open' : ''; ?>>
			<summary>
				<span><?php echo e( $seccion ); ?></span>
				<span class="cuenta"><?php echo count( $claves ); ?> textos</span>
			</summary>
			<div>
				<?php foreach ( $claves as $clave => $valor ) : ?>
					<?php $original = $seed['textos'][ $clave ] ?? null; ?>
					<div class="campo">
						<label for="c-<?php echo e( $clave ); ?>"><?php echo e( $clave ); ?></label>
						<?php if ( mb_strlen( (string) $valor ) > 90 ) : ?>
							<textarea id="c-<?php echo e( $clave ); ?>" name="texto[<?php echo e( $clave ); ?>]"><?php echo e( $valor ); ?></textarea>
						<?php else : ?>
							<input type="text" id="c-<?php echo e( $clave ); ?>" name="texto[<?php echo e( $clave ); ?>]" value="<?php echo e( $valor ); ?>">
						<?php endif; ?>
						<?php if ( null !== $original && $original !== $valor ) : ?>
							<div class="clave">Original: <?php echo e( $original ); ?></div>
						<?php endif; ?>
					</div>
				<?php endforeach; ?>
			</div>
		</details>
	<?php endforeach; ?>

	<?php if ( $buscar && 0 === $mostrados ) : ?>
		<div class="tarjeta">No se encontró ningún texto con «<?php echo e( $buscar ); ?>».</div>
	<?php endif; ?>

	<div class="guardar-fijo">
		<span class="ayuda" style="margin:0">Los cambios se aplican al sitio en cuanto guardas.</span>
		<button class="boton naranja" type="submit">Guardar cambios</button>
	</div>
</form>
</main></body></html>
