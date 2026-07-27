<?php
/**
 * Template Name: MAACH · Contacto
 *
 * Formulario de contacto con los datos de la empresa. Si el sitio tiene
 * Contact Form 7 o similar, basta con poner su shortcode en el contenido de
 * la página: se muestra en lugar del formulario propio.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$maach_producto = isset( $_GET['producto'] ) ? sanitize_text_field( wp_unslash( $_GET['producto'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$maach_tiene_shortcode = has_shortcode( get_the_content(), 'contact-form-7' ) || trim( wp_strip_all_tags( get_the_content() ) );
?>

<section style="padding:96px 0 48px;border-bottom:1px solid var(--line)">
	<div class="maach-container">
		<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:16px"><?php esc_html_e( 'Contacto', 'maach' ); ?></span>
		<h1 class="h-display" style="font-size:clamp(40px,6vw,88px);margin-bottom:24px"><?php the_title(); ?></h1>
		<p style="font-size:18px;color:var(--muted);max-width:620px;line-height:1.6">
			<?php esc_html_e( 'Cuéntanos del espacio y te respondemos con una propuesta.', 'maach' ); ?>
		</p>
	</div>
</section>

<section style="padding:80px 0 128px">
	<div class="maach-container" style="display:grid;grid-template-columns:1.2fr 1fr;gap:80px">
		<div>
			<?php
			while ( have_posts() ) :
				the_post();
				if ( $maach_tiene_shortcode ) {
					echo '<div class="maach-prose">';
					the_content();
					echo '</div>';
				} else {
					// Formulario simple: envía por correo al administrador.
					?>
					<form method="post" style="display:flex;flex-direction:column;gap:28px">
						<?php wp_nonce_field( 'maach_contacto', 'maach_contacto_nonce' ); ?>
						<div>
							<label class="maach-label" for="c-nombre"><?php esc_html_e( 'Nombre', 'maach' ); ?></label>
							<input class="maach-input" type="text" id="c-nombre" name="c_nombre" required>
						</div>
						<div>
							<label class="maach-label" for="c-correo"><?php esc_html_e( 'Correo', 'maach' ); ?></label>
							<input class="maach-input" type="email" id="c-correo" name="c_correo" required>
						</div>
						<div>
							<label class="maach-label" for="c-empresa"><?php esc_html_e( 'Empresa', 'maach' ); ?></label>
							<input class="maach-input" type="text" id="c-empresa" name="c_empresa">
						</div>
						<div>
							<label class="maach-label" for="c-mensaje"><?php esc_html_e( 'Mensaje', 'maach' ); ?></label>
							<textarea class="maach-input" id="c-mensaje" name="c_mensaje" rows="4" required><?php
								echo $maach_producto ? esc_textarea( sprintf( __( 'Consulta sobre: %s', 'maach' ), $maach_producto ) ) : '';
							?></textarea>
						</div>
						<button type="submit" class="btn-primary" style="align-self:flex-start">
							<?php esc_html_e( 'Enviar', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
						</button>
					</form>
					<?php
				}
			endwhile;
			?>
		</div>

		<aside style="display:flex;flex-direction:column;gap:32px">
			<div>
				<span class="maach-label"><?php esc_html_e( 'Dirección', 'maach' ); ?></span>
				<p style="font-size:16px;line-height:1.6">
					<?php echo esc_html( maach_opcion( 'maach_direccion_1', 'Quito · Ecuador' ) ); ?>
					<?php if ( maach_opcion( 'maach_direccion_2' ) ) : ?><br><?php echo esc_html( maach_opcion( 'maach_direccion_2' ) ); ?><?php endif; ?>
				</p>
			</div>
			<div>
				<span class="maach-label"><?php esc_html_e( 'Correo', 'maach' ); ?></span>
				<a href="mailto:<?php echo esc_attr( maach_opcion( 'maach_email', 'ventas@maach.ec' ) ); ?>" style="font-size:16px">
					<?php echo esc_html( maach_opcion( 'maach_email', 'ventas@maach.ec' ) ); ?>
				</a>
			</div>
			<div>
				<span class="maach-label"><?php esc_html_e( 'Teléfono', 'maach' ); ?></span>
				<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', maach_opcion( 'maach_telefono', '+593997200455' ) ) ); ?>" style="font-size:16px">
					<?php echo esc_html( maach_opcion( 'maach_telefono', '+593 99 720 0455' ) ); ?>
				</a>
			</div>
			<img src="<?php echo esc_url( maach_img( 'brand/contacto-obra.webp' ) ); ?>" alt="" loading="lazy" style="width:100%;border:1px solid var(--line)">
		</aside>
	</div>
</section>

<?php
get_footer();
