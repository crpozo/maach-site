<?php
/**
 * Personalizador: los textos y datos que un editor cambia sin tocar páginas.
 *
 * Apariencia → Personalizar → MAACH
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registra los controles.
 *
 * @param WP_Customize_Manager $wp_customize Personalizador.
 */
function maach_customizer( $wp_customize ) {

	$wp_customize->add_panel( 'maach', array(
		'title'       => __( 'MAACH', 'maach' ),
		'description' => __( 'Textos y datos del sitio: portada, contacto y pie.', 'maach' ),
		'priority'    => 20,
	) );

	/**
	 * Atajo para declarar un control.
	 *
	 * @param string $id       Clave.
	 * @param string $seccion  Sección.
	 * @param string $etiqueta Etiqueta.
	 * @param string $tipo     Tipo de control.
	 * @param string $defecto  Valor por defecto.
	 * @param string $ayuda    Descripción.
	 */
	$campo = function ( $id, $seccion, $etiqueta, $tipo = 'text', $defecto = '', $ayuda = '' ) use ( $wp_customize ) {
		$wp_customize->add_setting( $id, array(
			'default'           => $defecto,
			'sanitize_callback' => 'textarea' === $tipo ? 'sanitize_textarea_field' : 'sanitize_text_field',
			'transport'         => 'refresh',
		) );
		$wp_customize->add_control( $id, array(
			'label'       => $etiqueta,
			'section'     => $seccion,
			'type'        => $tipo,
			'description' => $ayuda,
		) );
	};

	// ─── Portada ──────────────────────────────────────────────────────────
	$wp_customize->add_section( 'maach_portada', array(
		'title' => __( 'Portada', 'maach' ),
		'panel' => 'maach',
	) );
	$campo( 'maach_hero_tag', 'maach_portada', __( 'Etiqueta superior', 'maach' ), 'text', 'Catálogo 2026' );
	$campo( 'maach_hero_titulo_1', 'maach_portada', __( 'Título · primera línea', 'maach' ), 'text', 'Ingeniería para el trabajo' );
	$campo( 'maach_hero_titulo_2', 'maach_portada', __( 'Título · palabra destacada (naranja)', 'maach' ), 'text', 'real' );
	$campo( 'maach_hero_titulo_3', 'maach_portada', __( 'Título · segunda línea', 'maach' ), 'text', 'Diseñado para durar' );
	$wp_customize->add_setting( 'maach_hero_img', array( 'sanitize_callback' => 'esc_url_raw' ) );
	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'maach_hero_img', array(
		'label'       => __( 'Foto de fondo de la portada', 'maach' ),
		'section'     => 'maach_portada',
		'description' => __( 'Si la dejas vacía se usa la foto original del sitio.', 'maach' ),
	) ) );
	$campo( 'maach_marquee', 'maach_portada', __( 'Marquesina (una frase por línea)', 'maach' ), 'textarea' );

	$wp_customize->add_setting( 'maach_selector_idioma', array(
		'default'           => 'si',
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'maach_selector_idioma', array(
		'label'       => __( 'Mostrar el selector ES / EN en la cabecera', 'maach' ),
		'section'     => 'maach_portada',
		'type'        => 'radio',
		'choices'     => array(
			'si' => __( 'Sí (igual que el sitio original)', 'maach' ),
			'no' => __( 'No', 'maach' ),
		),
		'description' => __( 'Con Polylang o WPML instalados el selector usa los idiomas reales. Sin ellos, el inglés se muestra pero no lleva a ninguna parte.', 'maach' ),
	) );

	// ─── Contacto ─────────────────────────────────────────────────────────
	$wp_customize->add_section( 'maach_contacto', array(
		'title' => __( 'Contacto y redes', 'maach' ),
		'panel' => 'maach',
	) );
	$campo( 'maach_direccion_1', 'maach_contacto', __( 'Dirección · línea 1', 'maach' ) );
	$campo( 'maach_direccion_2', 'maach_contacto', __( 'Dirección · línea 2', 'maach' ) );
	$campo( 'maach_email', 'maach_contacto', __( 'Correo', 'maach' ), 'text', 'ventas@maach.ec' );
	$campo( 'maach_telefono', 'maach_contacto', __( 'Teléfono', 'maach' ), 'text', '+593 99 720 0455' );
	$campo( 'maach_telefonos', 'maach_contacto', __( 'Teléfonos de la página de contacto (uno por línea)', 'maach' ), 'textarea', '', __( 'Se muestran como lista con el signo + naranja, igual que el sitio original.', 'maach' ) );
	$campo( 'maach_instagram', 'maach_contacto', __( 'Instagram (URL)', 'maach' ), 'url' );
	$campo( 'maach_linkedin', 'maach_contacto', __( 'LinkedIn (URL)', 'maach' ), 'url' );
	$campo( 'maach_behance', 'maach_contacto', __( 'Behance (URL)', 'maach' ), 'url' );
	$campo( 'maach_pinterest', 'maach_contacto', __( 'Pinterest (URL)', 'maach' ), 'url' );

	// ─── Pie ──────────────────────────────────────────────────────────────
	$wp_customize->add_section( 'maach_pie', array(
		'title' => __( 'Pie de página', 'maach' ),
		'panel' => 'maach',
	) );
	$campo( 'maach_footer_manifiesto_1', 'maach_pie', __( 'Manifiesto · línea 1', 'maach' ), 'text', 'No vendemos muebles.' );
	$campo( 'maach_footer_manifiesto_2', 'maach_pie', __( 'Manifiesto · destacado naranja', 'maach' ), 'text', 'Construimos' );
	$campo( 'maach_footer_manifiesto_3', 'maach_pie', __( 'Manifiesto · línea 3', 'maach' ), 'text', 'entornos de trabajo.' );
	$campo( 'maach_footer_intro', 'maach_pie', __( 'Párrafo de la derecha', 'maach' ), 'textarea' );
	$campo( 'maach_tagline', 'maach_pie', __( 'Línea legal (junto al ©)', 'maach' ), 'text', 'Diseño industrial · Ecuador' );

	// ─── Ficha de producto ────────────────────────────────────────────────
	$wp_customize->add_section( 'maach_ficha', array(
		'title' => __( 'Ficha de producto', 'maach' ),
		'panel' => 'maach',
	) );
	$campo(
		'maach_dimensiones_texto',
		'maach_ficha',
		__( 'Texto de dimensiones por defecto', 'maach' ),
		'text',
		'Las medidas se pueden adaptar según el espacio',
		__( 'Cada producto puede sobrescribirlo desde su propia ficha.', 'maach' )
	);
	$wp_customize->add_setting( 'maach_gate', array(
		'default'           => 'si',
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'maach_gate', array(
		'label'       => __( 'Pedir datos antes de descargar documentos', 'maach' ),
		'section'     => 'maach_ficha',
		'type'        => 'radio',
		'choices'     => array( 'si' => __( 'Sí (se guardan en Productos → Descargas)', 'maach' ), 'no' => __( 'No, descarga directa', 'maach' ) ),
	) );
}
add_action( 'customize_register', 'maach_customizer' );

/**
 * URL de una imagen del tema.
 *
 * @param string $ruta Ruta relativa dentro de assets/img.
 * @return string
 */
function maach_img( $ruta ) {
	return MAACH_URI . '/assets/img/' . ltrim( $ruta, '/' );
}
