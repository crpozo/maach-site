<?php
/**
 * Template Name: MAACH · Contacto
 *
 * Réplica de la página de contacto del sitio original: portada partida con
 * foto y franja de datos, y banda negra con el formulario.
 *
 * El formulario envía al correo configurado en Personalizar → MAACH →
 * Contacto (ventas@maach.ec). Si prefieres Contact Form 7 u otro plugin,
 * pega su shortcode en el contenido de la página y se usará ese.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$maach_producto  = isset( $_GET['producto'] ) ? sanitize_text_field( wp_unslash( $_GET['producto'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$maach_estado    = $GLOBALS['maach_contacto_estado'] ?? '';
$maach_shortcode = trim( wp_strip_all_tags( get_the_content( null, false, get_the_ID() ) ) );
?>

<!-- PORTADA -->
<section style="position:relative;overflow:hidden;padding:64px 0;min-height:calc(100vh - 80px);display:flex;align-items:center;border-bottom:1px solid var(--line)">
	<div aria-hidden="true" style="position:absolute;top:0;bottom:0;left:0;width:6px;background:var(--lava-orange);z-index:1"></div>
	<span aria-hidden="true" class="maach-mono" style="position:absolute;left:16px;top:50%;transform:rotate(-90deg) translateX(50%);transform-origin:left center;color:var(--lava-orange);letter-spacing:.32em;font-weight:700;z-index:1">
		MAACH · CONTACTO <?php echo esc_html( gmdate( 'Y' ) ); ?>
	</span>
	<div aria-hidden="true" style="position:absolute;top:24px;right:24px;width:22px;height:22px;border-top:2px solid var(--lava-orange);border-right:2px solid var(--lava-orange);z-index:1"></div>
	<div aria-hidden="true" style="position:absolute;bottom:24px;right:24px;width:22px;height:22px;border-bottom:2px solid var(--lava-orange);border-right:2px solid var(--lava-orange);z-index:1"></div>

	<div class="maach-container" style="position:relative;z-index:2;width:100%;max-width:1400px">
		<div style="display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center">

			<div>
				<span class="maach-tag" style="margin-bottom:28px;display:inline-flex;border-color:var(--lava-orange);color:var(--lava-orange)">
					<?php esc_html_e( 'MAACH · CONTACTO', 'maach' ); ?>
				</span>
				<h1 class="h-display" style="font-size:clamp(56px,7vw,90px);margin-bottom:32px">
					<?php esc_html_e( 'Hablemos', 'maach' ); ?><br>
					<span class="h-italic" style="color:var(--lava-orange)"><?php esc_html_e( 'de tu proyecto', 'maach' ); ?></span>
				</h1>
				<p style="font-size:19px;color:var(--muted);line-height:1.5;margin-bottom:40px">
					<?php esc_html_e( 'Desarrollamos soluciones de mobiliario técnico a gran escala. Integramos nuestros sistemas directamente a tus planos arquitectónicos.', 'maach' ); ?>
				</p>

				<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding-top:28px;border-top:1px solid var(--line)">
					<?php
					$maach_stats = array(
						array( '< 24h', __( 'Respuesta', 'maach' ) ),
						array( 'QUITO', __( 'Ubicación', 'maach' ) ),
						array( '03', __( 'Líneas directas', 'maach' ) ),
					);
					foreach ( $maach_stats as $maach_stat ) :
						?>
						<div>
							<div style="font-family:var(--display);font-weight:700;font-size:36px;line-height:1;margin-bottom:6px;color:var(--lava-orange);letter-spacing:-.02em">
								<?php echo esc_html( $maach_stat[0] ); ?>
							</div>
							<span class="maach-mono" style="color:var(--muted)"><?php echo esc_html( $maach_stat[1] ); ?></span>
						</div>
					<?php endforeach; ?>
				</div>
			</div>

			<div class="invert" style="position:relative;aspect-ratio:4/5;max-height:calc(100vh - 200px);border:1px solid var(--line);overflow:hidden;background:var(--jet-black);color:var(--off-white)">
				<img src="<?php echo esc_url( maach_img( 'brand/contacto-obra.webp' ) ); ?>" alt="" aria-hidden="true"
					style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
				<div aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(22,22,22,.2) 0%,rgba(22,22,22,0) 30%,rgba(22,22,22,.5) 65%,rgba(22,22,22,.9) 100%)"></div>
				<span class="maach-mono" style="position:absolute;top:20px;left:20px;background:var(--off-white);color:var(--jet-black);padding:6px 10px">
					<?php esc_html_e( 'QUITO · ECUADOR', 'maach' ); ?>
				</span>
				<div style="position:absolute;bottom:28px;left:28px;right:28px;color:var(--off-white)">
					<span class="maach-mono" style="color:var(--sand-grey);display:block;margin-bottom:12px">
						<?php esc_html_e( 'Equipo de ingeniería de proyectos', 'maach' ); ?>
					</span>
					<h2 class="h-display" style="font-size:clamp(32px,3.6vw,52px);color:var(--off-white);margin:0;line-height:1">
						<?php esc_html_e( 'En tu obra,', 'maach' ); ?><br>
						<span style="color:var(--lava-orange)"><?php esc_html_e( 'desde el plano', 'maach' ); ?></span>
					</h2>
				</div>
				<div aria-hidden="true" style="position:absolute;top:14px;right:14px;width:18px;height:18px;border-top:2px solid var(--lava-orange);border-right:2px solid var(--lava-orange)"></div>
			</div>
		</div>
	</div>
</section>

<!-- FORMULARIO -->
<section class="invert" style="background:var(--jet-black);color:var(--off-white);padding:112px 0;position:relative;overflow:hidden;border-bottom:1px solid var(--line)">
	<div class="tex-slats" aria-hidden="true" style="position:absolute;inset:0;z-index:0;pointer-events:none"></div>
	<div class="maach-container" style="position:relative;z-index:1">
		<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:80px;align-items:start">

			<div>
				<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:16px">
					<?php esc_html_e( 'Formulario · Iniciar conversación', 'maach' ); ?>
				</span>
				<h2 class="h-display" style="font-size:clamp(40px,5vw,72px);color:var(--off-white);margin-bottom:12px">
					<?php esc_html_e( 'Escríbenos', 'maach' ); ?>
				</h2>
				<span class="maach-mono" style="color:var(--sand-grey);display:block;margin-bottom:48px">
					<?php esc_html_e( 'Respuesta < 24 hrs', 'maach' ); ?>
				</span>

				<?php if ( 'ok' === $maach_estado || 'sin_correo' === $maach_estado ) : ?>
					<div style="border:1px solid var(--lava-orange);padding:24px;margin-bottom:32px">
						<p class="maach-mono" style="color:var(--lava-orange);margin:0 0 8px"><?php esc_html_e( 'Mensaje recibido', 'maach' ); ?></p>
						<p style="margin:0;font-size:16px;color:var(--off-white)"><?php esc_html_e( 'Gracias por escribirnos. Te respondemos a la brevedad.', 'maach' ); ?></p>
					</div>
				<?php elseif ( 'error' === $maach_estado ) : ?>
					<div style="border:1px solid var(--off-white);padding:24px;margin-bottom:32px">
						<p style="margin:0;font-size:16px;color:var(--off-white)"><?php esc_html_e( 'Revisa los campos obligatorios: nombre, correo y mensaje.', 'maach' ); ?></p>
					</div>
				<?php endif; ?>

				<?php if ( $maach_shortcode ) : ?>
					<div class="maach-prose"><?php the_content(); ?></div>
				<?php else : ?>
					<form method="post" style="display:grid;gap:32px">
						<?php wp_nonce_field( 'maach_contacto', 'maach_contacto_nonce' ); ?>
						<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px">
							<div>
								<label class="maach-label" for="c-nombre"><?php esc_html_e( 'Nombre y apellido *', 'maach' ); ?></label>
								<input class="maach-input" type="text" id="c-nombre" name="c_nombre" required placeholder="Roberto A. Salgado">
							</div>
							<div>
								<label class="maach-label" for="c-correo"><?php esc_html_e( 'Correo electrónico *', 'maach' ); ?></label>
								<input class="maach-input" type="email" id="c-correo" name="c_correo" required placeholder="r.salgado@empresa.com">
							</div>
							<div>
								<label class="maach-label" for="c-empresa"><?php esc_html_e( 'Empresa', 'maach' ); ?></label>
								<input class="maach-input" type="text" id="c-empresa" name="c_empresa" placeholder="Estudio Alba">
							</div>
							<div>
								<label class="maach-label" for="c-telefono"><?php esc_html_e( 'Teléfono', 'maach' ); ?></label>
								<input class="maach-input" type="tel" id="c-telefono" name="c_telefono">
							</div>
						</div>
						<div>
							<label class="maach-label" for="c-mensaje"><?php esc_html_e( 'Mensaje *', 'maach' ); ?></label>
							<textarea class="maach-input" id="c-mensaje" name="c_mensaje" rows="4" required
								placeholder="<?php esc_attr_e( 'Cuéntanos sobre tu proyecto: volumen estimado, plazos, sede, m² aprox...', 'maach' ); ?>"><?php
								echo $maach_producto ? esc_textarea( __( 'Hola, me interesa el producto:', 'maach' ) . ' ' . $maach_producto ) : '';
							?></textarea>
						</div>
						<label style="display:inline-flex;align-items:center;gap:10px;color:var(--sand-grey);font-size:14px">
							<input type="checkbox" name="c_privacidad" required>
							<?php esc_html_e( 'Acepto el aviso de privacidad', 'maach' ); ?>
						</label>
						<button type="submit" class="btn-primary" style="justify-self:start">
							<?php esc_html_e( 'Enviar mensaje', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
						</button>
					</form>
				<?php endif; ?>
			</div>

			<aside style="display:flex;flex-direction:column;gap:40px">
				<div>
					<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:20px">
						<?php esc_html_e( 'Información de contacto', 'maach' ); ?>
					</span>
					<span class="maach-label" style="color:var(--sand-grey)"><?php esc_html_e( 'Dirección', 'maach' ); ?></span>
					<p style="font-size:17px;line-height:1.6;color:var(--off-white);margin:0 0 24px">
						<?php echo esc_html( maach_opcion( 'maach_direccion_1', 'Quito · Ecuador' ) ); ?>
						<?php if ( maach_opcion( 'maach_direccion_2' ) ) : ?><br><?php echo esc_html( maach_opcion( 'maach_direccion_2' ) ); ?><?php endif; ?>
					</p>

					<span class="maach-label" style="color:var(--sand-grey)"><?php esc_html_e( 'Correo', 'maach' ); ?></span>
					<p style="margin:0 0 24px">
						<a href="mailto:<?php echo esc_attr( maach_opcion( 'maach_email', 'ventas@maach.ec' ) ); ?>" style="font-size:17px;color:var(--off-white)">
							<?php echo esc_html( maach_opcion( 'maach_email', 'ventas@maach.ec' ) ); ?>
						</a>
					</p>

					<span class="maach-label" style="color:var(--sand-grey)"><?php esc_html_e( 'Teléfonos', 'maach' ); ?></span>
					<p style="margin:0">
						<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', maach_opcion( 'maach_telefono', '+593997200455' ) ) ); ?>" style="font-size:17px;color:var(--off-white)">
							<?php echo esc_html( maach_opcion( 'maach_telefono', '+593 99 720 0455' ) ); ?>
						</a>
					</p>
				</div>

				<div style="padding-top:32px;border-top:1px solid rgba(228,226,227,.18)">
					<span class="maach-mono" style="color:var(--sand-grey);display:block;margin-bottom:10px">
						<?php esc_html_e( 'Tiempo de respuesta', 'maach' ); ?>
					</span>
					<div style="font-family:var(--display);font-weight:700;font-size:44px;line-height:1;color:var(--lava-orange);letter-spacing:-.02em">&lt; 24h</div>
					<span class="maach-mono" style="color:var(--sand-grey)"><?php esc_html_e( 'Para solicitudes técnicas', 'maach' ); ?></span>
				</div>
			</aside>
		</div>
	</div>
</section>

<?php
get_footer();
