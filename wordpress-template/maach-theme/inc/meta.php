<?php
/**
 * Campos personalizados de Producto y Proyecto.
 *
 * Se usan cajas nativas de WordPress (sin ACF ni plugins) para que el tema
 * funcione en cualquier instalación limpia. Todo lo editable de una ficha
 * está en estas cajas.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registra las cajas de campos.
 */
function maach_meta_boxes() {
	add_meta_box( 'maach_producto_datos', __( 'Datos del producto', 'maach' ), 'maach_box_producto', 'maach_producto', 'normal', 'high' );
	add_meta_box( 'maach_producto_galeria', __( 'Galería de fotos', 'maach' ), 'maach_box_galeria', 'maach_producto', 'normal', 'high' );
	add_meta_box( 'maach_producto_archivos', __( 'Documentos descargables (BIM / CAD / Ficha)', 'maach' ), 'maach_box_archivos', 'maach_producto', 'normal', 'default' );
	add_meta_box( 'maach_proyecto_datos', __( 'Datos del proyecto', 'maach' ), 'maach_box_proyecto', 'maach_proyecto', 'normal', 'high' );
	add_meta_box( 'maach_proyecto_galeria', __( 'Galería del proyecto', 'maach' ), 'maach_box_galeria', 'maach_proyecto', 'normal', 'high' );
	add_meta_box( 'maach_descarga_datos', __( 'Solicitud', 'maach' ), 'maach_box_descarga', 'maach_descarga', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'maach_meta_boxes' );

/**
 * Imprime un campo de texto simple.
 *
 * @param string $name  Clave del meta.
 * @param string $label Etiqueta visible.
 * @param int    $post  ID del post.
 * @param string $desc  Ayuda opcional.
 */
function maach_campo( $name, $label, $post, $desc = '' ) {
	$value = get_post_meta( $post, $name, true );
	printf(
		'<p><label for="%1$s"><strong>%2$s</strong></label><br>
		 <input type="text" id="%1$s" name="%1$s" value="%3$s" style="width:100%%"></p>',
		esc_attr( $name ),
		esc_html( $label ),
		esc_attr( $value )
	);
	if ( $desc ) {
		printf( '<p class="description" style="margin-top:-8px">%s</p>', esc_html( $desc ) );
	}
}

/**
 * Imprime un textarea.
 *
 * @param string $name  Clave del meta.
 * @param string $label Etiqueta visible.
 * @param int    $post  ID del post.
 * @param string $desc  Ayuda opcional.
 * @param int    $rows  Alto.
 */
function maach_campo_area( $name, $label, $post, $desc = '', $rows = 5 ) {
	$value = get_post_meta( $post, $name, true );
	printf(
		'<p><label for="%1$s"><strong>%2$s</strong></label><br>
		 <textarea id="%1$s" name="%1$s" rows="%4$d" style="width:100%%">%3$s</textarea></p>',
		esc_attr( $name ),
		esc_html( $label ),
		esc_textarea( $value ),
		(int) $rows
	);
	if ( $desc ) {
		printf( '<p class="description" style="margin-top:-8px">%s</p>', esc_html( $desc ) );
	}
}

/**
 * Caja: datos del producto.
 *
 * @param WP_Post $post Post actual.
 */
function maach_box_producto( $post ) {
	wp_nonce_field( 'maach_meta', 'maach_meta_nonce' );
	maach_campo( 'maach_sku', __( 'SKU / código', 'maach' ), $post->ID, 'Ej. MCH-EGR-01' );
	maach_campo_area(
		'maach_caracteristicas',
		__( 'Características técnicas (una por línea)', 'maach' ),
		$post->ID,
		__( 'Si lo dejas vacío, la ficha muestra las características de su subcategoría.', 'maach' ),
		6
	);
	maach_campo_area(
		'maach_dimensiones',
		__( 'Texto de dimensiones', 'maach' ),
		$post->ID,
		__( 'Por defecto: «Las medidas se pueden adaptar según el espacio».', 'maach' ),
		2
	);
}

/**
 * Caja: galería (productos y proyectos).
 *
 * @param WP_Post $post Post actual.
 */
function maach_box_galeria( $post ) {
	wp_nonce_field( 'maach_meta', 'maach_meta_nonce' );
	$ids = maach_ids_galeria( $post->ID );
	?>
	<div class="maach-galeria-box">
		<p class="description">
			<?php esc_html_e( 'La primera foto es la portada del catálogo y la principal de la ficha. Arrastra para reordenar.', 'maach' ); ?>
		</p>
		<div id="maach-galeria-lista" style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0">
			<?php foreach ( $ids as $id ) : ?>
				<div class="maach-galeria-item" data-id="<?php echo esc_attr( $id ); ?>" style="position:relative;width:96px;height:96px;border:1px solid #ccd0d4;background:#fff">
					<?php echo wp_get_attachment_image( $id, 'thumbnail', false, array( 'style' => 'width:100%;height:100%;object-fit:contain' ) ); ?>
					<button type="button" class="maach-galeria-quitar button-link-delete" style="position:absolute;top:2px;right:4px;background:#fff;line-height:1">&times;</button>
				</div>
			<?php endforeach; ?>
		</div>
		<input type="hidden" id="maach_galeria" name="maach_galeria" value="<?php echo esc_attr( implode( ',', $ids ) ); ?>">
		<button type="button" class="button" id="maach-galeria-add"><?php esc_html_e( 'Añadir fotos', 'maach' ); ?></button>
	</div>
	<?php
}

/**
 * Caja: documentos descargables.
 *
 * @param WP_Post $post Post actual.
 */
function maach_box_archivos( $post ) {
	wp_nonce_field( 'maach_meta', 'maach_meta_nonce' );
	echo '<p class="description">' . esc_html__( 'Sube el archivo a Medios y pega aquí su URL. Los formatos vacíos simplemente no aparecen en la ficha; si no hay ningún CAD/BIM, el botón «BIM / CAD» tampoco se muestra.', 'maach' ) . '</p>';
	maach_campo( 'maach_pdf', __( 'Ficha técnica (.pdf)', 'maach' ), $post->ID );
	maach_campo( 'maach_dwg', __( 'Plano CAD (.dwg)', 'maach' ), $post->ID );
	maach_campo( 'maach_rfa', __( 'Modelo Revit (.rfa)', 'maach' ), $post->ID );
	maach_campo( 'maach_skp', __( 'Modelo 3D SketchUp (.skp)', 'maach' ), $post->ID );
}

/**
 * Caja: datos del proyecto.
 *
 * @param WP_Post $post Post actual.
 */
function maach_box_proyecto( $post ) {
	wp_nonce_field( 'maach_meta', 'maach_meta_nonce' );
	maach_campo( 'maach_ubicacion', __( 'Ubicación', 'maach' ), $post->ID, 'Ej. Quito, EC' );
	maach_campo( 'maach_alcance', __( 'Alcance', 'maach' ), $post->ID );
	maach_campo( 'maach_area', __( 'Área', 'maach' ), $post->ID, 'Ej. 2,400 m²' );
	maach_campo( 'maach_anio', __( 'Año', 'maach' ), $post->ID );
	echo '<hr><p class="description">' . esc_html__( 'Las tres secciones editoriales. Si las dejas vacías, el proyecto se publica sólo con portada y galería.', 'maach' ) . '</p>';
	maach_campo_area( 'maach_desafio', __( 'El Desafío (un párrafo por línea)', 'maach' ), $post->ID, '', 4 );
	maach_campo_area( 'maach_propuesta_intro', __( 'Propuesta de Valor · frase de entrada', 'maach' ), $post->ID, '', 3 );
	maach_campo_area( 'maach_propuesta', __( 'Propuesta de Valor · puntos (uno por línea)', 'maach' ), $post->ID, '', 4 );
	maach_campo_area( 'maach_resultado', __( 'El Resultado (un párrafo por línea)', 'maach' ), $post->ID, '', 4 );
}

/**
 * Caja: detalle de una descarga registrada.
 *
 * @param WP_Post $post Post actual.
 */
function maach_box_descarga( $post ) {
	$campos = array(
		'nombre'    => __( 'Nombre', 'maach' ),
		'correo'    => __( 'Correo', 'maach' ),
		'empresa'   => __( 'Empresa', 'maach' ),
		'ocupacion' => __( 'Ocupación', 'maach' ),
		'producto'  => __( 'Producto', 'maach' ),
		'documento' => __( 'Documento', 'maach' ),
	);
	echo '<table class="widefat striped">';
	foreach ( $campos as $key => $label ) {
		printf(
			'<tr><th style="width:160px">%s</th><td>%s</td></tr>',
			esc_html( $label ),
			esc_html( (string) get_post_meta( $post->ID, $key, true ) )
		);
	}
	echo '</table>';
}

/**
 * Guarda todos los campos.
 *
 * @param int $post_id ID del post.
 */
function maach_guardar_meta( $post_id ) {
	if ( ! isset( $_POST['maach_meta_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['maach_meta_nonce'] ) ), 'maach_meta' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$texto = array( 'maach_sku', 'maach_pdf', 'maach_dwg', 'maach_rfa', 'maach_skp', 'maach_ubicacion', 'maach_alcance', 'maach_area', 'maach_anio' );
	foreach ( $texto as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}

	$areas = array( 'maach_caracteristicas', 'maach_dimensiones', 'maach_desafio', 'maach_propuesta', 'maach_propuesta_intro', 'maach_resultado' );
	foreach ( $areas as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_textarea_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}

	if ( isset( $_POST['maach_galeria'] ) ) {
		$ids = array_filter( array_map( 'absint', explode( ',', sanitize_text_field( wp_unslash( $_POST['maach_galeria'] ) ) ) ) );
		update_post_meta( $post_id, 'maach_galeria', implode( ',', $ids ) );
		// La primera foto de la galería es también la imagen destacada.
		if ( $ids && ! has_post_thumbnail( $post_id ) ) {
			set_post_thumbnail( $post_id, reset( $ids ) );
		}
	}
}
add_action( 'save_post_maach_producto', 'maach_guardar_meta' );
add_action( 'save_post_maach_proyecto', 'maach_guardar_meta' );

/**
 * Carga el selector de medios y el script de la galería en el editor.
 *
 * @param string $hook Pantalla actual.
 */
function maach_admin_assets( $hook ) {
	if ( ! in_array( $hook, array( 'post.php', 'post-new.php' ), true ) ) {
		return;
	}
	$tipo = get_post_type();
	if ( ! in_array( $tipo, array( 'maach_producto', 'maach_proyecto' ), true ) ) {
		return;
	}
	wp_enqueue_media();
	wp_enqueue_script( 'jquery-ui-sortable' );
	wp_enqueue_script( 'maach-admin', MAACH_URI . '/assets/js/maach-admin.js', array( 'jquery', 'jquery-ui-sortable' ), MAACH_VERSION, true );
}
add_action( 'admin_enqueue_scripts', 'maach_admin_assets' );

/**
 * Columnas útiles en el listado de productos.
 *
 * @param array $cols Columnas.
 * @return array
 */
function maach_columnas_producto( $cols ) {
	$nuevas = array();
	foreach ( $cols as $key => $label ) {
		$nuevas[ $key ] = $label;
		if ( 'title' === $key ) {
			$nuevas['maach_sku']    = __( 'SKU', 'maach' );
			$nuevas['maach_fotos']  = __( 'Fotos', 'maach' );
			$nuevas['maach_archivos'] = __( 'Documentos', 'maach' );
		}
	}
	return $nuevas;
}
add_filter( 'manage_maach_producto_posts_columns', 'maach_columnas_producto' );

/**
 * Pinta las columnas propias.
 *
 * @param string $col     Columna.
 * @param int    $post_id Post.
 */
function maach_columna_contenido( $col, $post_id ) {
	if ( 'maach_sku' === $col ) {
		echo esc_html( (string) get_post_meta( $post_id, 'maach_sku', true ) );
	}
	if ( 'maach_fotos' === $col ) {
		echo (int) count( maach_ids_galeria( $post_id ) );
	}
	if ( 'maach_archivos' === $col ) {
		$formatos = array();
		foreach ( array( 'pdf', 'dwg', 'rfa', 'skp' ) as $ext ) {
			if ( get_post_meta( $post_id, 'maach_' . $ext, true ) ) {
				$formatos[] = strtoupper( $ext );
			}
		}
		echo $formatos ? esc_html( implode( ' · ', $formatos ) ) : '—';
	}
}
add_action( 'manage_maach_producto_posts_custom_column', 'maach_columna_contenido', 10, 2 );
