<?php
/**
 * Página no encontrada.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>
<section style="padding:160px 0;text-align:center">
	<div class="maach-container">
		<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:20px">Error 404</span>
		<h1 class="h-display" style="font-size:clamp(40px,7vw,96px);margin-bottom:24px"><?php esc_html_e( 'Página no encontrada', 'maach' ); ?></h1>
		<p style="font-size:18px;color:var(--muted);margin-bottom:40px"><?php esc_html_e( 'La página que buscas no existe o cambió de dirección.', 'maach' ); ?></p>
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-primary"><?php esc_html_e( 'Volver al inicio', 'maach' ); ?></a>
	</div>
</section>
<?php
get_footer();
