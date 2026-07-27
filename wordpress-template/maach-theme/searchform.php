<?php
/**
 * Formulario de búsqueda.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" style="display:flex;gap:12px;align-items:center">
	<label class="screen-reader-text" for="maach-s"><?php esc_html_e( 'Buscar', 'maach' ); ?></label>
	<input type="search" id="maach-s" name="s" class="maach-input" value="<?php echo esc_attr( get_search_query() ); ?>"
		placeholder="<?php esc_attr_e( 'Buscar productos, proyectos o artículos…', 'maach' ); ?>">
	<button type="submit" class="btn-primary"><?php esc_html_e( 'Buscar', 'maach' ); ?></button>
</form>
