<?php
/**
 * Puesta a punto automática al activar el tema.
 *
 * Crea la estructura del sitio —categorías, subcategorías, páginas, menús y
 * los textos de portada y pie— leyendo el JSON que viaja dentro del tema.
 * No descarga nada de internet, así que es instantáneo y funciona en
 * cualquier servidor.
 *
 * Los productos, el portafolio y los artículos (que sí traen fotos y archivos
 * pesados) se cargan aparte, desde Productos → Importar catálogo.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MAACH_BOOTSTRAP_VERSION', 1 );

/**
 * Ejecuta la puesta a punto una sola vez.
 *
 * @param bool $forzar Repetirla aunque ya se haya hecho.
 */
function maach_bootstrap( $forzar = false ) {
	// La marca sólo evita repetir trabajo cuando la estructura sigue en pie.
	if ( ! $forzar
		&& (int) get_option( 'maach_bootstrap', 0 ) >= MAACH_BOOTSTRAP_VERSION
		&& maach_estructura_lista() ) {
		return;
	}
	// Candado para que dos peticiones simultáneas no dupliquen contenido.
	if ( ! $forzar && get_transient( 'maach_bootstrap_corriendo' ) ) {
		return;
	}
	set_transient( 'maach_bootstrap_corriendo', 1, 2 * MINUTE_IN_SECONDS );

	$datos = maach_datos();
	if ( ! $datos ) {
		delete_transient( 'maach_bootstrap_corriendo' );
		return;
	}

	foreach ( $datos['categorias'] as $cat ) {
		maach_importar_categoria( $cat );
	}
	maach_importar_paginas( $datos );
	maach_limpiar_widgets();

	update_option( 'maach_bootstrap', MAACH_BOOTSTRAP_VERSION );
	delete_transient( 'maach_bootstrap_corriendo' );
}

/**
 * Al activar el tema.
 */
function maach_al_activar() {
	maach_bootstrap( true );
}
add_action( 'after_switch_theme', 'maach_al_activar' );

/**
 * Red de seguridad: si el tema se activó por otra vía (WP-CLI, migración,
 * copia de archivos) y la estructura no existe, se crea en la primera visita
 * al administrador.
 */
function maach_bootstrap_tardio() {
	if ( wp_doing_ajax() || wp_doing_cron() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
		return;
	}
	maach_bootstrap();
}
add_action( 'admin_init', 'maach_bootstrap_tardio' );
// También en la primera visita al sitio público: si el tema se copió por FTP o
// se actualizó encima de otra versión, `after_switch_theme` no se dispara y
// sin esto la portada se vería a medias.
add_action( 'wp', 'maach_bootstrap_tardio' );

/**
 * ¿Está la estructura realmente creada? Se comprueba el resultado, no la marca
 * de «ya se ejecutó»: si alguien borra las páginas o el import quedó a medias,
 * la siguiente carga lo repara.
 *
 * @return bool
 */
function maach_estructura_lista() {
	if ( ! get_page_by_path( 'contacto' ) || ! get_page_by_path( 'sobre-maach' ) ) {
		return false;
	}
	$cats = get_terms( array( 'taxonomy' => 'maach_categoria', 'hide_empty' => false, 'fields' => 'ids' ) );
	return ! is_wp_error( $cats ) && count( $cats ) >= 6;
}

/**
 * Aviso mientras el catálogo no esté cargado.
 */
function maach_aviso_importar() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$pantalla = get_current_screen();
	if ( $pantalla && 'maach_producto_page_maach-importar' === $pantalla->id ) {
		return;
	}
	$total = (int) wp_count_posts( 'maach_producto' )->publish;
	if ( $total > 0 ) {
		return;
	}
	printf(
		'<div class="notice notice-warning"><p><strong>%s</strong> %s</p><p><a href="%s" class="button button-primary">%s</a></p></div>',
		esc_html__( 'Falta cargar el catálogo MAACH.', 'maach' ),
		esc_html__( 'La estructura del sitio ya está lista, pero todavía no hay productos ni proyectos: el catálogo se carga en un paso aparte porque descarga las fotos y los archivos CAD.', 'maach' ),
		esc_url( admin_url( 'edit.php?post_type=maach_producto&page=maach-importar' ) ),
		esc_html__( 'Importar el catálogo ahora', 'maach' )
	);
}
add_action( 'admin_notices', 'maach_aviso_importar' );
