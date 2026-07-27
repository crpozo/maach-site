<?php
/**
 * Archivo de subcategoría.
 *
 * En el sitio original las subcategorías no tienen página propia: viven como
 * secciones dentro de su categoría. Aquí se redirige a esa sección para que
 * la navegación sea idéntica; si la categoría no existe, se muestra la
 * cuadrícula de productos como recurso.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$maach_sub   = get_queried_object();
$maach_padre = get_term_meta( $maach_sub->term_id, 'maach_categoria_padre', true );
$maach_cat   = $maach_padre ? get_term_by( 'slug', $maach_padre, 'maach_categoria' ) : null;

if ( $maach_cat ) {
	wp_safe_redirect( maach_enlace_subcategoria( $maach_cat, $maach_sub ), 301 );
	exit;
}

get_header();
?>

<section style="padding:96px 0 48px;border-bottom:1px solid var(--line)">
	<div class="maach-container">
		<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:16px"><?php esc_html_e( 'Línea de producto', 'maach' ); ?></span>
		<h1 class="h-display" style="font-size:clamp(40px,6vw,88px)"><?php echo esc_html( $maach_sub->name ); ?></h1>
	</div>
</section>

<section style="padding:64px 0 128px">
	<div class="maach-container">
		<?php
		$maach_ids = array();
		while ( have_posts() ) {
			the_post();
			$maach_ids[] = get_the_ID();
		}
		if ( $maach_ids ) {
			maach_grid_productos( $maach_ids, 4 );
		} else {
			echo '<p style="font-size:18px;color:var(--muted)">' .
				esc_html__( 'Todavía no hay productos en esta línea. Cárgalos desde Productos → Importar catálogo.', 'maach' ) .
				'</p>';
		}
		?>
	</div>
</section>

<?php
get_footer();
