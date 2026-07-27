<?php
/**
 * Tema MAACH — configuración general.
 *
 * Réplica del sitio maach-site como tema de WordPress. Todo el contenido
 * (productos, proyectos, artículos, páginas) se edita desde el administrador;
 * este archivo sólo declara capacidades, estilos y utilidades.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MAACH_VERSION', '1.0.0' );
define( 'MAACH_DIR', get_template_directory() );
define( 'MAACH_URI', get_template_directory_uri() );

require_once MAACH_DIR . '/inc/cpt.php';
require_once MAACH_DIR . '/inc/meta.php';
require_once MAACH_DIR . '/inc/helpers.php';
require_once MAACH_DIR . '/inc/customizer.php';
require_once MAACH_DIR . '/inc/importer.php';
require_once MAACH_DIR . '/inc/bootstrap.php';

/**
 * Capacidades del tema.
 */
function maach_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-logo', array(
		'height'      => 60,
		'width'       => 200,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'style.css' );

	// Tamaños pensados para el catálogo: la ficha usa fotos verticales 2:3.
	add_image_size( 'maach-producto', 1067, 1600, false );
	add_image_size( 'maach-card', 800, 1000, true );
	add_image_size( 'maach-hero', 2000, 1200, true );

	register_nav_menus( array(
		'principal' => __( 'Menú principal (header)', 'maach' ),
		'footer_1'  => __( 'Footer · columna Productos', 'maach' ),
		'footer_2'  => __( 'Footer · columna Compañía', 'maach' ),
		'footer_3'  => __( 'Footer · columna Recursos', 'maach' ),
		'legal'     => __( 'Footer · enlaces legales', 'maach' ),
	) );

	load_theme_textdomain( 'maach', MAACH_DIR . '/languages' );
}
add_action( 'after_setup_theme', 'maach_setup' );

/**
 * Hojas de estilo y scripts.
 */
function maach_assets() {
	wp_enqueue_style( 'maach', get_stylesheet_uri(), array(), MAACH_VERSION );
	wp_enqueue_script( 'maach', MAACH_URI . '/assets/js/maach.js', array(), MAACH_VERSION, true );
	wp_localize_script( 'maach', 'MAACH', array(
		'ajax'  => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'maach_lead' ),
	) );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'maach_assets' );

/**
 * Precarga de las dos tipografías críticas para evitar el salto de fuente.
 */
function maach_preload_fonts() {
	$fonts = array( 'clashgrotesk-variable.woff2', 'monoblock-medium.woff2' );
	foreach ( $fonts as $font ) {
		printf(
			'<link rel="preload" as="font" type="font/woff2" href="%s" crossorigin>' . "\n",
			esc_url( MAACH_URI . '/assets/fonts/' . $font )
		);
	}
	printf( '<link rel="icon" href="%s">' . "\n", esc_url( MAACH_URI . '/assets/img/favicon.svg' ) );
}
add_action( 'wp_head', 'maach_preload_fonts', 1 );

/**
 * Áreas de widgets. El tema no las necesita para replicar el sitio, pero
 * dejarlas permite que un editor agregue bloques al pie sin tocar código.
 */
function maach_widgets() {
	register_sidebar( array(
		'name'          => __( 'Pie · bloque libre', 'maach' ),
		'id'            => 'maach-footer-extra',
		'description'   => __( 'Contenido opcional encima de la línea legal del pie.', 'maach' ),
		'before_widget' => '<div class="maach-footer-widget">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="maach-mono" style="color:var(--sand-grey);margin-bottom:16px">',
		'after_title'   => '</h4>',
	) );
}
add_action( 'widgets_init', 'maach_widgets' );

/**
 * En una instalación nueva WordPress coloca sus widgets por defecto
 * («Archivos», «Categorías»…) en la primera barra lateral registrada, y
 * aparecerían en el pie sin que nadie los haya puesto. Se vacía al activar
 * el tema; el área queda disponible para lo que el editor quiera añadir.
 */
function maach_limpiar_widgets() {
	$sidebars = get_option( 'sidebars_widgets', array() );
	if ( ! empty( $sidebars['maach-footer-extra'] ) ) {
		$sidebars['maach-footer-extra'] = array();
		update_option( 'sidebars_widgets', $sidebars );
	}
}
add_action( 'after_switch_theme', 'maach_limpiar_widgets' );

/**
 * Los productos y proyectos se listan completos: sin paginación parcial que
 * rompa las cuadrículas del diseño.
 */
function maach_archive_query( $query ) {
	if ( is_admin() || ! $query->is_main_query() ) {
		return;
	}
	if ( $query->is_post_type_archive( 'maach_producto' ) || $query->is_tax( array( 'maach_categoria', 'maach_subcategoria' ) ) ) {
		$query->set( 'posts_per_page', -1 );
		$query->set( 'orderby', 'menu_order title' );
		$query->set( 'order', 'ASC' );
	}
	if ( $query->is_post_type_archive( 'maach_proyecto' ) ) {
		$query->set( 'posts_per_page', -1 );
		$query->set( 'orderby', 'menu_order' );
		$query->set( 'order', 'ASC' );
	}
}
add_action( 'pre_get_posts', 'maach_archive_query' );

/**
 * Guarda los datos del formulario previo a la descarga de un documento.
 * Se almacenan como entradas privadas para que el equipo comercial los vea
 * en el administrador (MAACH → Descargas).
 */
function maach_registrar_descarga() {
	check_ajax_referer( 'maach_lead', 'nonce' );

	$campos = array(
		'nombre'    => sanitize_text_field( wp_unslash( $_POST['nombre'] ?? '' ) ),
		'correo'    => sanitize_email( wp_unslash( $_POST['correo'] ?? '' ) ),
		'empresa'   => sanitize_text_field( wp_unslash( $_POST['empresa'] ?? '' ) ),
		'ocupacion' => sanitize_text_field( wp_unslash( $_POST['ocupacion'] ?? '' ) ),
		'documento' => esc_url_raw( wp_unslash( $_POST['documento'] ?? '' ) ),
		'producto'  => sanitize_text_field( wp_unslash( $_POST['producto'] ?? '' ) ),
	);

	if ( empty( $campos['correo'] ) ) {
		wp_send_json_error( array( 'mensaje' => __( 'Correo requerido', 'maach' ) ), 400 );
	}

	$id = wp_insert_post( array(
		'post_type'    => 'maach_descarga',
		'post_status'  => 'private',
		'post_title'   => sprintf( '%s · %s', $campos['nombre'] ?: $campos['correo'], $campos['producto'] ),
		'post_content' => '',
		'meta_input'   => $campos,
	) );

	wp_send_json_success( array( 'id' => $id ) );
}
add_action( 'wp_ajax_maach_descarga', 'maach_registrar_descarga' );
add_action( 'wp_ajax_nopriv_maach_descarga', 'maach_registrar_descarga' );

/**
 * Etiqueta de pantalla que el sitio original mostraba en cada página
 * (data-screen-label). Se conserva por paridad visual/depuración.
 */
function maach_screen_label() {
	if ( is_front_page() ) {
		return '01 Inicio';
	}
	if ( is_singular( 'maach_producto' ) ) {
		return '04 Producto · ' . get_the_title();
	}
	if ( is_post_type_archive( 'maach_producto' ) ) {
		return '03 Productos';
	}
	if ( is_tax( 'maach_categoria' ) ) {
		return '03 Categoría · ' . single_term_title( '', false );
	}
	if ( is_singular( 'maach_proyecto' ) ) {
		return '09 Proyecto · ' . get_the_title();
	}
	if ( is_post_type_archive( 'maach_proyecto' ) ) {
		return '08 Portafolio';
	}
	if ( is_singular( 'post' ) ) {
		return '11 Artículo';
	}
	if ( is_home() || is_archive() ) {
		return '10 Investigación';
	}
	if ( is_page() ) {
		return get_the_title();
	}
	return '';
}

/**
 * Procesa el formulario de contacto y lo envía por correo.
 *
 * El destinatario es el correo configurado en Personalizar → MAACH → Contacto
 * (ventas@maach.ec por defecto). Cada envío queda además guardado en
 * Productos → Descargas para que no se pierda si el correo falla.
 */
function maach_procesar_contacto() {
	if ( empty( $_POST['maach_contacto_nonce'] ) ) {
		return;
	}
	if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['maach_contacto_nonce'] ) ), 'maach_contacto' ) ) {
		return;
	}

	$datos = array(
		'nombre'   => sanitize_text_field( wp_unslash( $_POST['c_nombre'] ?? '' ) ),
		'correo'   => sanitize_email( wp_unslash( $_POST['c_correo'] ?? '' ) ),
		'empresa'  => sanitize_text_field( wp_unslash( $_POST['c_empresa'] ?? '' ) ),
		'telefono' => sanitize_text_field( wp_unslash( $_POST['c_telefono'] ?? '' ) ),
		'mensaje'  => sanitize_textarea_field( wp_unslash( $_POST['c_mensaje'] ?? '' ) ),
	);

	if ( ! $datos['nombre'] || ! is_email( $datos['correo'] ) || ! $datos['mensaje'] ) {
		$GLOBALS['maach_contacto_estado'] = 'error';
		return;
	}

	$destino = maach_opcion( 'maach_email', 'ventas@maach.ec' );
	$asunto  = sprintf(
		/* translators: %s: nombre de quien escribe. */
		__( 'Nuevo mensaje desde la web · %s', 'maach' ),
		$datos['nombre']
	);
	$cuerpo = sprintf(
		"%s: %s\n%s: %s\n%s: %s\n%s: %s\n\n%s\n%s\n",
		__( 'Nombre', 'maach' ),
		$datos['nombre'],
		__( 'Correo', 'maach' ),
		$datos['correo'],
		__( 'Empresa', 'maach' ),
		$datos['empresa'] ? $datos['empresa'] : '—',
		__( 'Teléfono', 'maach' ),
		$datos['telefono'] ? $datos['telefono'] : '—',
		__( 'Mensaje:', 'maach' ),
		$datos['mensaje']
	);

	// Remitente del propio dominio para que no lo marquen como suplantación;
	// «Responder a» apunta a quien escribió.
	$dominio    = wp_parse_url( home_url(), PHP_URL_HOST );
	$cabeceras  = array(
		'From: MAACH web <no-reply@' . preg_replace( '/^www\./', '', (string) $dominio ) . '>',
		'Reply-To: ' . $datos['nombre'] . ' <' . $datos['correo'] . '>',
		'Content-Type: text/plain; charset=UTF-8',
	);

	$enviado = wp_mail( $destino, $asunto, $cuerpo, $cabeceras );

	// Copia interna, por si el servidor no puede enviar correo.
	wp_insert_post( array(
		'post_type'   => 'maach_descarga',
		'post_status' => 'private',
		'post_title'  => sprintf( '%s · %s', __( 'Contacto', 'maach' ), $datos['nombre'] ),
		'meta_input'  => array(
			'nombre'    => $datos['nombre'],
			'correo'    => $datos['correo'],
			'empresa'   => $datos['empresa'],
			'ocupacion' => $datos['telefono'],
			'producto'  => __( 'Formulario de contacto', 'maach' ),
			'documento' => $datos['mensaje'],
		),
	) );

	$GLOBALS['maach_contacto_estado'] = $enviado ? 'ok' : 'sin_correo';
}
add_action( 'template_redirect', 'maach_procesar_contacto' );
