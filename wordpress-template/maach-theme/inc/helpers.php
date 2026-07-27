<?php
/**
 * Utilidades compartidas por las plantillas.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * IDs de la galería de un post, en orden.
 *
 * @param int $post_id Post.
 * @return int[]
 */
function maach_ids_galeria( $post_id ) {
	$raw = (string) get_post_meta( $post_id, 'maach_galeria', true );
	$ids = array_filter( array_map( 'absint', array_filter( explode( ',', $raw ) ) ) );
	if ( ! $ids && has_post_thumbnail( $post_id ) ) {
		$ids = array( get_post_thumbnail_id( $post_id ) );
	}
	return array_values( $ids );
}

/**
 * URLs de la galería de un post, en el tamaño pedido.
 *
 * @param int    $post_id Post.
 * @param string $size    Tamaño de imagen.
 * @return string[]
 */
function maach_galeria( $post_id, $size = 'maach-producto' ) {
	$urls = array();
	foreach ( maach_ids_galeria( $post_id ) as $id ) {
		$src = wp_get_attachment_image_url( $id, $size );
		if ( $src ) {
			$urls[] = $src;
		}
	}
	return $urls;
}

/**
 * Convierte un textarea de «una por línea» en array.
 *
 * @param string $valor Texto.
 * @return string[]
 */
function maach_lineas( $valor ) {
	$lineas = preg_split( '/\r\n|\r|\n/', (string) $valor );
	return array_values( array_filter( array_map( 'trim', $lineas ), 'strlen' ) );
}

/**
 * Características técnicas de un producto: las propias si las tiene, si no las
 * de su subcategoría y, en último caso, las de su categoría. Es el mismo
 * criterio que usa el sitio original.
 *
 * @param int $post_id Producto.
 * @return string[]
 */
function maach_caracteristicas( $post_id ) {
	$propias = maach_lineas( get_post_meta( $post_id, 'maach_caracteristicas', true ) );
	if ( $propias ) {
		return $propias;
	}
	foreach ( array( 'maach_subcategoria', 'maach_categoria' ) as $tax ) {
		$terms = get_the_terms( $post_id, $tax );
		if ( ! $terms || is_wp_error( $terms ) ) {
			continue;
		}
		foreach ( $terms as $term ) {
			$lista = maach_lineas( get_term_meta( $term->term_id, 'maach_caracteristicas', true ) );
			if ( $lista ) {
				return $lista;
			}
		}
	}
	return array();
}

/**
 * Documentos descargables de un producto, sólo los que tienen archivo.
 *
 * @param int $post_id Producto.
 * @return array<int,array{nombre:string,ext:string,url:string,archivo:string}>
 */
function maach_documentos( $post_id ) {
	$mapa = array(
		'pdf' => __( 'Ficha técnica', 'maach' ),
		'skp' => __( 'Modelo 3D', 'maach' ),
		'rfa' => __( 'Modelo Revit', 'maach' ),
		'dwg' => __( 'Plano CAD', 'maach' ),
	);
	$slug = get_post_field( 'post_name', $post_id );
	$docs = array();
	foreach ( $mapa as $ext => $nombre ) {
		$url = get_post_meta( $post_id, 'maach_' . $ext, true );
		if ( $url ) {
			$docs[] = array(
				'nombre'  => $nombre,
				'ext'     => $ext,
				'url'     => $url,
				'archivo' => $slug . '.' . $ext,
			);
		}
	}
	return $docs;
}

/**
 * ¿El producto tiene algún archivo CAD/BIM? (PDF no cuenta.)
 *
 * @param int $post_id Producto.
 * @return bool
 */
function maach_tiene_cad( $post_id ) {
	foreach ( array( 'dwg', 'rfa', 'skp' ) as $ext ) {
		if ( get_post_meta( $post_id, 'maach_' . $ext, true ) ) {
			return true;
		}
	}
	return false;
}

/**
 * Texto de dimensiones de la ficha.
 *
 * @param int $post_id Producto.
 * @return string
 */
function maach_dimensiones( $post_id ) {
	$texto = trim( (string) get_post_meta( $post_id, 'maach_dimensiones', true ) );
	return $texto ? $texto : __( 'Las medidas se pueden adaptar según el espacio', 'maach' );
}

/**
 * Primer término de una taxonomía.
 *
 * @param int    $post_id Post.
 * @param string $tax     Taxonomía.
 * @return WP_Term|null
 */
function maach_termino( $post_id, $tax ) {
	$terms = get_the_terms( $post_id, $tax );
	if ( ! $terms || is_wp_error( $terms ) ) {
		return null;
	}
	return reset( $terms );
}

/**
 * Icono en línea del set del sitio (flecha, chevron, etc.).
 *
 * @param string $nombre Icono.
 * @param int    $size   Tamaño en px.
 * @param string $estilo Estilo extra.
 */
function maach_icono( $nombre, $size = 14, $estilo = '' ) {
	$paths = array(
		'arrow'    => '<path d="M2 8h12M9 3l5 5-5 5"/>',
		'chevron'  => '<path d="M6 3l5 5-5 5"/>',
		'down'     => '<path d="M3 6l5 5 5-5"/>',
		'close'    => '<path d="M3 3l10 10M13 3L3 13"/>',
		'download' => '<path d="M8 2v9M4 7l4 4 4-4M2 14h12"/>',
		'plus'     => '<path d="M8 3v10M3 8h10"/>',
		'search'   => '<circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/>',
		'menu'     => '<path d="M2 4h12M2 8h12M2 12h12"/>',
		'ruler'    => '<path d="M1 6h14v4H1zM4 6v2M7 6v3M10 6v2M13 6v3"/>',
		'tool'     => '<path d="M10 2a3 3 0 00-3 4L2 11l3 3 5-5a3 3 0 004-4l-2 2-2-1-1-2 2-2z"/>',
		'file'     => '<path d="M4 1h5l3 3v11H4zM9 1v3h3"/>',
		'pin'      => '<path d="M8 1a4 4 0 014 4c0 3-4 9-4 9S4 8 4 5a4 4 0 014-4z"/><circle cx="8" cy="5" r="1.4"/>',
	);
	if ( ! isset( $paths[ $nombre ] ) ) {
		return;
	}
	printf(
		'<svg width="%1$d" height="%1$d" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" style="%2$s" aria-hidden="true">%3$s</svg>',
		(int) $size,
		esc_attr( $estilo ),
		$paths[ $nombre ] // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- SVG interno fijo.
	);
}

/**
 * Marquesina de texto (la banda negra animada).
 *
 * @param string[] $items Frases.
 */
function maach_marquee( $items = array() ) {
	if ( ! $items ) {
		$items = maach_opcion_lista( 'maach_marquee', array(
			'Fabricación propia en Quito',
			'Entregas a nivel nacional',
			'Diseño industrial aplicado',
			'Mobiliario corporativo a medida',
			'Garantía y servicio postventa',
		) );
	}
	$full = array_merge( $items, $items, $items, $items );
	echo '<div class="marquee" style="background:var(--jet-black);color:var(--off-white);padding:14px 0;border-top:1px solid var(--jet-black);border-bottom:1px solid var(--jet-black)">';
	for ( $i = 0; $i < 2; $i++ ) {
		echo '<div class="marquee-track"' . ( $i ? ' aria-hidden="true"' : '' ) . '>';
		foreach ( $full as $item ) {
			echo '<span style="display:inline-flex;align-items:center;gap:14px"><span style="color:var(--lava-orange)">+</span> ' . esc_html( $item ) . '</span><span class="dot"></span>';
		}
		echo '</div>';
	}
	echo '</div>';
}

/**
 * Opción del personalizador con valor por defecto.
 *
 * @param string $clave    Clave.
 * @param string $defecto  Valor por defecto.
 * @return string
 */
function maach_opcion( $clave, $defecto = '' ) {
	$valor = get_theme_mod( $clave, $defecto );
	return '' === $valor ? $defecto : $valor;
}

/**
 * Opción del personalizador entendida como lista (una por línea).
 *
 * @param string   $clave   Clave.
 * @param string[] $defecto Valor por defecto.
 * @return string[]
 */
function maach_opcion_lista( $clave, $defecto = array() ) {
	$lineas = maach_lineas( get_theme_mod( $clave, '' ) );
	return $lineas ? $lineas : $defecto;
}

/**
 * Cuadrícula de productos reutilizable (catálogo, categoría, relacionados).
 *
 * @param WP_Post[]|int[] $posts    Productos.
 * @param int             $columnas Columnas del grid.
 */
function maach_grid_productos( $posts, $columnas = 4 ) {
	if ( ! $posts ) {
		return;
	}
	printf(
		'<div class="keep-grid" style="--keep-cols:repeat(2,1fr);display:grid;grid-template-columns:repeat(%d,1fr);gap:20px">',
		(int) $columnas
	);
	foreach ( $posts as $item ) {
		$id  = is_object( $item ) ? $item->ID : (int) $item;
		$sub = maach_termino( $id, 'maach_subcategoria' );
		$img = maach_galeria( $id, 'maach-card' );
		?>
		<a href="<?php echo esc_url( get_permalink( $id ) ); ?>">
			<div style="position:relative;aspect-ratio:4/5;border:1px solid var(--line);overflow:hidden;margin-bottom:12px;background:var(--off-white)">
				<?php if ( ! empty( $img[0] ) ) : ?>
					<img src="<?php echo esc_url( $img[0] ); ?>" alt="<?php echo esc_attr( get_the_title( $id ) ); ?>" loading="lazy"
						style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;padding:20px">
				<?php endif; ?>
			</div>
			<span class="maach-mono" style="color:var(--muted);display:block;margin-bottom:4px">
				<?php echo esc_html( $sub ? $sub->name : '' ); ?>
			</span>
			<h4 style="font-family:var(--display);font-size:22px;text-transform:uppercase;letter-spacing:-.01em">
				<?php echo esc_html( get_the_title( $id ) ); ?>
			</h4>
		</a>
		<?php
	}
	echo '</div>';
}

/**
 * ID del menú asignado a una ubicación.
 *
 * @param string $ubicacion Ubicación registrada.
 * @return int
 */
function maach_menu_id( $ubicacion ) {
	$ubicaciones = get_nav_menu_locations();
	return isset( $ubicaciones[ $ubicacion ] ) ? (int) $ubicaciones[ $ubicacion ] : 0;
}

/**
 * ¿La URL del menú corresponde a lo que se está viendo?
 *
 * @param string $url URL del ítem.
 * @return bool
 */
function maach_menu_activo( $url ) {
	$actual = home_url( add_query_arg( array(), $GLOBALS['wp']->request ?? '' ) );
	return untrailingslashit( $url ) === untrailingslashit( $actual );
}

/**
 * Imprime una lista de enlaces de un menú del pie.
 *
 * @param string $ubicacion Ubicación.
 */
function maach_lista_menu( $ubicacion ) {
	$items = wp_get_nav_menu_items( maach_menu_id( $ubicacion ) );
	if ( ! $items ) {
		return;
	}
	echo '<ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px">';
	foreach ( $items as $item ) {
		printf(
			'<li><a href="%s" style="color:var(--off-white)">%s</a></li>',
			esc_url( $item->url ),
			esc_html( $item->title )
		);
	}
	echo '</ul>';
}

/**
 * Categorías del catálogo con su imagen de portada.
 *
 * @return WP_Term[]
 */
function maach_categorias() {
	$terms = get_terms( array(
		'taxonomy'   => 'maach_categoria',
		'hide_empty' => false,
		'orderby'    => 'term_id',
	) );
	return is_wp_error( $terms ) ? array() : $terms;
}

/**
 * Imagen de portada de una categoría: la del término si se subió, si no la
 * imagen de marca que traía el sitio original.
 *
 * @param WP_Term $term Categoría.
 * @return string
 */
function maach_imagen_categoria( $term ) {
	$id = get_term_meta( $term->term_id, 'maach_imagen', true );
	if ( $id ) {
		$url = wp_get_attachment_image_url( (int) $id, 'maach-card' );
		if ( $url ) {
			return $url;
		}
	}
	return maach_img( 'brand/cat-' . $term->slug . '.webp' );
}

/**
 * Subcategorías presentes en una categoría, en el orden del catálogo.
 *
 * @param WP_Term $categoria Categoría.
 * @return WP_Term[]
 */
function maach_subcategorias_de( $categoria ) {
	// Preferimos el orden del catálogo, que el importador guarda en cada
	// subcategoría (maach_orden) junto a la categoría a la que pertenece.
	$terms = get_terms( array(
		'taxonomy'   => 'maach_subcategoria',
		'hide_empty' => false,
		'meta_key'   => 'maach_orden', // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
		'orderby'    => 'meta_value_num',
		'order'      => 'ASC',
		'meta_query' => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			array(
				'key'   => 'maach_categoria_padre',
				'value' => $categoria->slug,
			),
		),
	) );
	if ( ! is_wp_error( $terms ) && $terms ) {
		return $terms;
	}

	// Subcategorías creadas a mano: se deducen de los productos publicados.
	$productos = get_posts( array(
		'post_type'      => 'maach_producto',
		'posts_per_page' => -1,
		'orderby'        => 'title',
		'order'          => 'ASC',
		'fields'         => 'ids',
		'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			array(
				'taxonomy' => 'maach_categoria',
				'field'    => 'term_id',
				'terms'    => $categoria->term_id,
			),
		),
	) );
	$subs = array();
	foreach ( $productos as $id ) {
		$term = maach_termino( $id, 'maach_subcategoria' );
		if ( $term && ! isset( $subs[ $term->term_id ] ) ) {
			$subs[ $term->term_id ] = $term;
		}
	}
	return array_values( $subs );
}

/**
 * Productos de una categoría agrupados por subcategoría.
 *
 * @param WP_Term $categoria Categoría.
 * @return array<int,array{term:WP_Term,posts:int[]}>
 */
function maach_productos_agrupados( $categoria ) {
	$productos = get_posts( array(
		'post_type'      => 'maach_producto',
		'posts_per_page' => -1,
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
		'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			array(
				'taxonomy' => 'maach_categoria',
				'field'    => 'term_id',
				'terms'    => $categoria->term_id,
			),
		),
	) );
	// Se recorren las subcategorías en el orden del catálogo para que las
	// secciones salgan como en el sitio original.
	$grupos = array();
	foreach ( maach_subcategorias_de( $categoria ) as $sub ) {
		$grupos[ $sub->term_id ] = array( 'term' => $sub, 'posts' => array() );
	}
	foreach ( $productos as $p ) {
		$term = maach_termino( $p->ID, 'maach_subcategoria' );
		$key  = $term ? $term->term_id : 0;
		if ( ! isset( $grupos[ $key ] ) ) {
			$grupos[ $key ] = array( 'term' => $term, 'posts' => array() );
		}
		$grupos[ $key ]['posts'][] = $p->ID;
	}
	// Descarta subcategorías sin productos en esta categoría.
	$grupos = array_filter( $grupos, function ( $g ) {
		return ! empty( $g['posts'] );
	} );
	return array_values( $grupos );
}
