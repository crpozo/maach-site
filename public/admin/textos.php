<?php
/** Edición de los textos del sitio, en español e inglés. */
require __DIR__ . '/config.php';
require __DIR__ . '/etiquetas.php';
exigir_sesion();

$titulo    = 'Textos';
$aviso     = '';
$error     = '';
$contenido = leer_contenido();
$seed      = leer_seed();

if ( 'POST' === $_SERVER['REQUEST_METHOD'] ) {
	if ( ! token_valido( $_POST['token'] ?? null ) ) {
		$error = 'La sesión caducó. Vuelve a intentarlo.';
	} else {
		$cambios = 0;
		foreach ( array( 'texto' => 'textos', 'texto_en' => 'textos_en' ) as $campo => $destino ) {
			foreach ( (array) ( $_POST[ $campo ] ?? array() ) as $clave => $valor ) {
				$clave = (string) $clave;
				$valor = trim( (string) $valor );
				if ( ( $contenido[ $destino ][ $clave ] ?? null ) !== $valor ) {
					$contenido[ $destino ][ $clave ] = $valor;
					++$cambios;
				}
			}
		}
		if ( $cambios ) {
			$fallo = guardar_contenido( $contenido, sprintf( 'Textos: %d cambio(s)', $cambios ) );
			$aviso = $fallo ? '' : sprintf( 'Guardado. %d cambio(s); ya se ven en el sitio.', $cambios );
			$error = $fallo;
			$contenido = leer_contenido();
		} else {
			$aviso = 'No hubo cambios que guardar.';
		}
	}
}

$textos    = (array) ( $contenido['textos'] ?? array() );
$textos_en = (array) ( $contenido['textos_en'] ?? array() );
$buscar    = trim( (string) ( $_GET['buscar'] ?? '' ) );

/** ¿Este campo encaja con lo que se busca? Cuenta también la frase completa. */
function coincide( string $clave, string $valor, string $buscar, array $textos ): bool {
	if ( '' === $buscar ) {
		return true;
	}
	$candidatos = array( $clave, $valor, etiqueta_de( $clave ), pagina_de( $clave ) );
	$familia = familia_de( $clave );
	if ( $familia ) {
		$candidatos[] = $familia['nombre'];
		$candidatos[] = frase_de_familia( $familia, $textos );
	}
	foreach ( $candidatos as $texto ) {
		if ( false !== mb_stripos( (string) $texto, $buscar ) ) {
			return true;
		}
	}
	return false;
}

// Se agrupa por sección y, dentro, las familias van primero y juntas.
$sesiones = array();
$ya_puesto = array();
foreach ( $textos as $clave => $valor ) {
	if ( ! coincide( (string) $clave, (string) $valor, $buscar, $textos ) ) {
		continue;
	}
	$seccion = pagina_de( (string) $clave );
	$familia = familia_de( (string) $clave );
	if ( $familia ) {
		if ( isset( $ya_puesto[ $familia['primero'] ] ) ) {
			continue;
		}
		$ya_puesto[ $familia['primero'] ] = true;
		$sesiones[ $seccion ]['familias'][] = $familia;
	} else {
		$sesiones[ $seccion ]['sueltos'][ $clave ] = $valor;
	}
}
ksort( $sesiones );
$total_mostrado = 0;
foreach ( $sesiones as $datos ) {
	$total_mostrado += count( $datos['familias'] ?? array() ) + count( $datos['sueltos'] ?? array() );
}

require __DIR__ . '/cabecera.php';

/** Pinta un campo con su versión en español y en inglés. */
function campo_texto( string $clave, string $etiqueta, array $textos, array $textos_en, array $seed ): void {
	$es = (string) ( $textos[ $clave ] ?? '' );
	$en = (string) ( $textos_en[ $clave ] ?? '' );
	$original = $seed['textos'][ $clave ] ?? null;
	$largo = mb_strlen( $es ) > 90;
	?>
	<div class="campo">
		<label for="es-<?php echo e( $clave ); ?>"><?php echo e( $etiqueta ); ?></label>
		<div class="par">
			<div>
				<span class="idioma">Español</span>
				<?php if ( $largo ) : ?>
					<textarea id="es-<?php echo e( $clave ); ?>" name="texto[<?php echo e( $clave ); ?>]"><?php echo e( $es ); ?></textarea>
				<?php else : ?>
					<input type="text" id="es-<?php echo e( $clave ); ?>" name="texto[<?php echo e( $clave ); ?>]" value="<?php echo e( $es ); ?>">
				<?php endif; ?>
			</div>
			<div>
				<span class="idioma">English</span>
				<?php if ( $largo ) : ?>
					<textarea name="texto_en[<?php echo e( $clave ); ?>]"><?php echo e( $en ); ?></textarea>
				<?php else : ?>
					<input type="text" name="texto_en[<?php echo e( $clave ); ?>]" value="<?php echo e( $en ); ?>">
				<?php endif; ?>
			</div>
		</div>
		<div class="clave">
			<?php echo e( $clave ); ?>
			<?php if ( null !== $original && $original !== $es ) : ?>
				· original: <?php echo e( (string) $original ); ?>
			<?php endif; ?>
		</div>
	</div>
	<?php
}
?>
<h1>Textos del sitio</h1>
<p class="ayuda">
	Cambia un texto y pulsa Guardar: se ve en el sitio al recargar, sin publicar nada.
	Cada texto tiene su versión en español y en inglés — <strong>la traducción no es automática</strong>,
	si cambias uno conviene cambiar el otro.
</p>

<?php if ( $aviso ) : ?><div class="aviso ok"><?php echo e( $aviso ); ?></div><?php endif; ?>
<?php if ( $error ) : ?><div class="aviso error"><?php echo e( $error ); ?></div><?php endif; ?>

<form method="get" class="buscador">
	<input type="text" name="buscar" value="<?php echo e( $buscar ); ?>"
		placeholder="Busca por lo que dice el texto: «Rendimiento Real», «Hablemos», «Escríbenos»…">
</form>

<?php if ( '' === $buscar ) : ?>
	<div class="tarjeta">
		Busca el texto tal como se ve en la web y aparecerá aquí para editarlo.
		Por ejemplo: <b>Rendimiento Real</b>, <b>Hablemos</b> o el nombre de un producto.
	</div>
<?php elseif ( 0 === $total_mostrado ) : ?>
	<div class="tarjeta">No se encontró ningún texto con «<?php echo e( $buscar ); ?>».</div>
<?php endif; ?>

<?php if ( '' !== $buscar && $total_mostrado ) : ?>
<form method="post">
	<input type="hidden" name="token" value="<?php echo e( token() ); ?>">

	<?php foreach ( $sesiones as $seccion => $datos ) : ?>
		<details class="grupo" open>
			<summary>
				<span><?php echo e( $seccion ); ?></span>
				<span class="cuenta"><?php echo count( $datos['familias'] ?? array() ) + count( $datos['sueltos'] ?? array() ); ?></span>
			</summary>
			<div>
				<?php foreach ( $datos['familias'] ?? array() as $familia ) : ?>
					<div class="familia">
						<div class="familia-nombre"><?php echo e( $familia['nombre'] ); ?></div>
						<div class="familia-frase">Se ve así: <b><?php echo e( frase_de_familia( $familia, $textos ) ); ?></b></div>
						<?php if ( ! empty( $familia['nota'] ) ) : ?>
							<div class="familia-nota"><?php echo e( $familia['nota'] ); ?></div>
						<?php endif; ?>
						<?php foreach ( $familia['campos'] as $i => $campo ) : ?>
							<?php campo_texto( $campo, 'Parte ' . ( $i + 1 ), $textos, $textos_en, $seed ); ?>
						<?php endforeach; ?>
					</div>
				<?php endforeach; ?>

				<?php foreach ( $datos['sueltos'] ?? array() as $clave => $valor ) : ?>
					<?php campo_texto( (string) $clave, etiqueta_de( (string) $clave ), $textos, $textos_en, $seed ); ?>
				<?php endforeach; ?>
			</div>
		</details>
	<?php endforeach; ?>

	<div class="guardar-fijo">
		<span class="ayuda" style="margin:0">Los cambios se aplican al sitio en cuanto guardas.</span>
		<button class="boton naranja" type="submit">Guardar cambios</button>
	</div>
</form>
<?php endif; ?>
</main></body></html>
