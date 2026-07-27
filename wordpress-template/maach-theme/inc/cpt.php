<?php
/**
 * Tipos de contenido y taxonomías del catálogo MAACH.
 *
 * Producto  → cada ficha del catálogo (Escritorio Gerente Recto, Silla Zur…)
 * Proyecto  → cada caso del portafolio (CPN, Wesco, CAME)
 * Descarga  → registro de quién bajó qué documento (sólo lectura)
 *
 * Las categorías del catálogo son taxonomías, así el editor puede crear una
 * categoría nueva sin tocar código.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registra los tipos de contenido.
 */
function maach_registrar_cpt() {

	register_post_type( 'maach_producto', array(
		'labels'        => array(
			'name'               => __( 'Productos', 'maach' ),
			'singular_name'      => __( 'Producto', 'maach' ),
			'add_new'            => __( 'Añadir producto', 'maach' ),
			'add_new_item'       => __( 'Añadir nuevo producto', 'maach' ),
			'edit_item'          => __( 'Editar producto', 'maach' ),
			'new_item'           => __( 'Nuevo producto', 'maach' ),
			'view_item'          => __( 'Ver producto', 'maach' ),
			'search_items'       => __( 'Buscar productos', 'maach' ),
			'not_found'          => __( 'No hay productos', 'maach' ),
			'all_items'          => __( 'Todos los productos', 'maach' ),
			'menu_name'          => __( 'Productos', 'maach' ),
		),
		'public'        => true,
		'has_archive'   => 'productos',
		'menu_icon'     => 'dashicons-screenoptions',
		'menu_position' => 20,
		'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes', 'revisions' ),
		'rewrite'       => array( 'slug' => 'productos', 'with_front' => false ),
		'show_in_rest'  => true,
	) );

	register_post_type( 'maach_proyecto', array(
		'labels'        => array(
			'name'          => __( 'Proyectos', 'maach' ),
			'singular_name' => __( 'Proyecto', 'maach' ),
			'add_new_item'  => __( 'Añadir nuevo proyecto', 'maach' ),
			'edit_item'     => __( 'Editar proyecto', 'maach' ),
			'all_items'     => __( 'Todos los proyectos', 'maach' ),
			'menu_name'     => __( 'Portafolio', 'maach' ),
		),
		'public'        => true,
		'has_archive'   => 'portafolio',
		'menu_icon'     => 'dashicons-building',
		'menu_position' => 21,
		'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes', 'revisions' ),
		'rewrite'       => array( 'slug' => 'portafolio', 'with_front' => false ),
		'show_in_rest'  => true,
	) );

	register_post_type( 'maach_descarga', array(
		'labels'          => array(
			'name'          => __( 'Descargas', 'maach' ),
			'singular_name' => __( 'Descarga', 'maach' ),
			'menu_name'     => __( 'Descargas', 'maach' ),
		),
		'public'          => false,
		'show_ui'         => true,
		'show_in_menu'    => 'edit.php?post_type=maach_producto',
		'capability_type' => 'post',
		'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
		'map_meta_cap'    => true,
		'supports'        => array( 'title' ),
	) );
}
add_action( 'init', 'maach_registrar_cpt' );

/**
 * Registra las taxonomías del catálogo.
 */
function maach_registrar_taxonomias() {

	register_taxonomy( 'maach_categoria', array( 'maach_producto' ), array(
		'labels'            => array(
			'name'          => __( 'Categorías de producto', 'maach' ),
			'singular_name' => __( 'Categoría', 'maach' ),
			'add_new_item'  => __( 'Añadir categoría', 'maach' ),
			'menu_name'     => __( 'Categorías', 'maach' ),
		),
		'hierarchical'      => true,
		'public'            => true,
		'show_admin_column' => true,
		'show_in_rest'      => true,
		'rewrite'           => array( 'slug' => 'categorias', 'with_front' => false ),
	) );

	register_taxonomy( 'maach_subcategoria', array( 'maach_producto' ), array(
		'labels'            => array(
			'name'          => __( 'Subcategorías', 'maach' ),
			'singular_name' => __( 'Subcategoría', 'maach' ),
			'add_new_item'  => __( 'Añadir subcategoría', 'maach' ),
			'menu_name'     => __( 'Subcategorías', 'maach' ),
		),
		'hierarchical'      => true,
		'public'            => true,
		'show_admin_column' => true,
		'show_in_rest'      => true,
		'rewrite'           => array( 'slug' => 'linea', 'with_front' => false ),
	) );
}
add_action( 'init', 'maach_registrar_taxonomias' );

/**
 * Campos propios de cada categoría: introducción editorial y, por
 * subcategoría, la descripción y las características técnicas que la ficha de
 * producto reutiliza. Se editan en Productos → Categorías.
 */
function maach_campos_taxonomia( $term ) {
	$intro   = is_object( $term ) ? get_term_meta( $term->term_id, 'maach_intro', true ) : '';
	$features = is_object( $term ) ? get_term_meta( $term->term_id, 'maach_caracteristicas', true ) : '';
	$editing = is_object( $term );
	?>
	<?php if ( $editing ) : ?><tr class="form-field"><th scope="row"><?php endif; ?>
	<label for="maach_intro"><?php esc_html_e( 'Introducción (texto largo bajo el título)', 'maach' ); ?></label>
	<?php if ( $editing ) : ?></th><td><?php endif; ?>
	<textarea name="maach_intro" id="maach_intro" rows="3" style="width:100%"><?php echo esc_textarea( $intro ); ?></textarea>
	<p class="description"><?php esc_html_e( 'Aparece bajo el título en la página de categoría.', 'maach' ); ?></p>
	<?php if ( $editing ) : ?></td></tr><tr class="form-field"><th scope="row"><?php endif; ?>
	<label for="maach_caracteristicas"><?php esc_html_e( 'Características técnicas (una por línea)', 'maach' ); ?></label>
	<?php if ( $editing ) : ?></th><td><?php endif; ?>
	<textarea name="maach_caracteristicas" id="maach_caracteristicas" rows="6" style="width:100%"><?php echo esc_textarea( $features ); ?></textarea>
	<p class="description"><?php esc_html_e( 'Cada producto de esta categoría o subcategoría muestra esta lista en su ficha, salvo que tenga características propias.', 'maach' ); ?></p>
	<?php if ( $editing ) : ?></td></tr><?php endif; ?>
	<?php
}
add_action( 'maach_categoria_add_form_fields', 'maach_campos_taxonomia' );
add_action( 'maach_categoria_edit_form_fields', 'maach_campos_taxonomia' );
add_action( 'maach_subcategoria_add_form_fields', 'maach_campos_taxonomia' );
add_action( 'maach_subcategoria_edit_form_fields', 'maach_campos_taxonomia' );

/**
 * Guarda los campos de la taxonomía.
 *
 * @param int $term_id ID del término.
 */
function maach_guardar_campos_taxonomia( $term_id ) {
	if ( ! current_user_can( 'manage_categories' ) ) {
		return;
	}
	if ( isset( $_POST['maach_intro'] ) ) {
		update_term_meta( $term_id, 'maach_intro', sanitize_textarea_field( wp_unslash( $_POST['maach_intro'] ) ) );
	}
	if ( isset( $_POST['maach_caracteristicas'] ) ) {
		update_term_meta( $term_id, 'maach_caracteristicas', sanitize_textarea_field( wp_unslash( $_POST['maach_caracteristicas'] ) ) );
	}
}
add_action( 'created_maach_categoria', 'maach_guardar_campos_taxonomia' );
add_action( 'edited_maach_categoria', 'maach_guardar_campos_taxonomia' );
add_action( 'created_maach_subcategoria', 'maach_guardar_campos_taxonomia' );
add_action( 'edited_maach_subcategoria', 'maach_guardar_campos_taxonomia' );
