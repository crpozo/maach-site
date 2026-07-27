<?php
/**
 * Cajón de navegación para móvil.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="nav-drawer" id="maach-drawer">
	<a href="<?php echo esc_url( get_post_type_archive_link( 'maach_producto' ) ); ?>"><?php esc_html_e( 'Productos', 'maach' ); ?></a>
	<div class="sub">
		<?php foreach ( maach_categorias() as $maach_cat ) : ?>
			<a href="<?php echo esc_url( get_term_link( $maach_cat ) ); ?>"><?php echo esc_html( $maach_cat->name ); ?></a>
		<?php endforeach; ?>
	</div>
	<?php
	foreach ( maach_nav_principal() as $maach_item ) :
		if ( 0 === strcasecmp( $maach_item['titulo'], 'Productos' ) ) {
			continue;
		}
		?>
		<a href="<?php echo esc_url( $maach_item['url'] ); ?>"><?php echo esc_html( $maach_item['titulo'] ); ?></a>
		<?php
	endforeach;
	?>
	<div style="margin-top:32px"><?php get_search_form(); ?></div>
</div>
