<?php
/**
 * Importador del catálogo MAACH.
 *
 * Lee data/maach-content.json (generado desde el sitio original con
 * wordpress-template/build-content.mjs) y crea en WordPress las categorías,
 * los 84 productos, el portafolio, los artículos y las páginas fijas,
 * descargando cada imagen y cada archivo CAD a la Biblioteca de medios.
 *
 * Se ejecuta por lotes desde Productos → Importar catálogo, así no se agota
 * el tiempo de ejecución en hostings lentos. Es idempotente: volver a correrlo
 * actualiza lo existente en vez de duplicarlo.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MAACH_LOTE', 4 ); // Elementos por petición.

/**
 * Datos del manifiesto.
 *
 * @return array
 */
function maach_datos() {
	static $datos = null;
	if ( null === $datos ) {
		$archivo = MAACH_DIR . '/data/maach-content.json';
		$datos   = file_exists( $archivo ) ? json_decode( (string) file_get_contents( $archivo ), true ) : array(); // phpcs:ignore WordPress.WP.AlternativeFunctions
	}
	return is_array( $datos ) ? $datos : array();
}

/**
 * Menú del importador.
 */
function maach_menu_importador() {
	add_submenu_page(
		'edit.php?post_type=maach_producto',
		__( 'Importar catálogo', 'maach' ),
		__( 'Importar catálogo', 'maach' ),
		'manage_options',
		'maach-importar',
		'maach_pantalla_importador'
	);
}
add_action( 'admin_menu', 'maach_menu_importador' );

/**
 * Pasos del importador, en orden.
 *
 * @return array<string,string>
 */
function maach_pasos() {
	return array(
		'categorias' => __( 'Categorías y subcategorías', 'maach' ),
		'paginas'    => __( 'Páginas y menús', 'maach' ),
		'productos'  => __( 'Productos (fotos + documentos)', 'maach' ),
		'proyectos'  => __( 'Portafolio', 'maach' ),
		'articulos'  => __( 'Investigación', 'maach' ),
	);
}

/**
 * Pantalla del importador.
 */
function maach_pantalla_importador() {
	$datos = maach_datos();
	$paso  = isset( $_GET['paso'] ) ? sanitize_key( wp_unslash( $_GET['paso'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$desde = isset( $_GET['desde'] ) ? absint( wp_unslash( $_GET['desde'] ) ) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$correr = isset( $_GET['correr'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended

	echo '<div class="wrap"><h1>' . esc_html__( 'Importar el catálogo MAACH', 'maach' ) . '</h1>';

	if ( ! $datos ) {
		echo '<div class="notice notice-error"><p>' .
			esc_html__( 'No se encontró data/maach-content.json dentro del tema.', 'maach' ) .
			'</p></div></div>';
		return;
	}

	// Botón «rehacer estructura»: crea categorías, páginas y menús al momento,
	// sin descargar nada. Es la reparación rápida cuando el sitio se ve a medias.
	if ( isset( $_GET['estructura'] ) && check_admin_referer( 'maach_estructura' ) ) {
		maach_bootstrap( true );
		echo '<div class="notice notice-success"><p>' .
			esc_html__( 'Estructura creada: categorías, páginas y menús.', 'maach' ) .
			'</p></div>';
	}

	if ( ! $correr ) {
		maach_panel_estado( $datos );

		printf(
			'<p>%s</p><ul class="ul-disc"><li>%d %s</li><li>%d %s</li><li>%d %s</li><li>%d %s</li></ul>',
			esc_html__( 'Se creará en esta instalación todo el contenido del sitio original. Puedes volver a ejecutarlo cuando quieras: actualiza lo que ya existe en lugar de duplicarlo.', 'maach' ),
			count( $datos['productos'] ),
			esc_html__( 'productos con sus fotos, características y archivos CAD/BIM', 'maach' ),
			count( $datos['categorias'] ),
			esc_html__( 'categorías con sus subcategorías', 'maach' ),
			count( $datos['proyectos'] ),
			esc_html__( 'proyectos del portafolio', 'maach' ),
			count( $datos['articulos'] ),
			esc_html__( 'artículos de Investigación', 'maach' )
		);
		echo '<p class="description">' . esc_html__( 'Las imágenes se descargan desde el sitio publicado, así que el servidor necesita salida a internet. Puede tardar varios minutos; no cierres la pestaña.', 'maach' ) . '</p>';
		printf(
			'<p><a href="%s" class="button button-primary button-hero">%s</a>
			 &nbsp;<a href="%s" class="button">%s</a></p>',
			esc_url( add_query_arg( array( 'correr' => 1, 'paso' => 'categorias', 'desde' => 0 ) ) ),
			esc_html__( 'Importar todo', 'maach' ),
			esc_url( wp_nonce_url( add_query_arg( 'estructura', 1 ), 'maach_estructura' ) ),
			esc_html__( 'Sólo rehacer la estructura (rápido, sin descargas)', 'maach' )
		);
		echo '</div>';
		return;
	}

	$pasos = maach_pasos();
	if ( ! isset( $pasos[ $paso ] ) ) {
		echo '<div class="notice notice-success"><p><strong>' . esc_html__( '¡Listo! El catálogo quedó importado.', 'maach' ) . '</strong></p></div>';
		printf(
			'<p><a href="%s" class="button">%s</a> <a href="%s" class="button button-primary">%s</a></p></div>',
			esc_url( admin_url( 'edit.php?post_type=maach_producto' ) ),
			esc_html__( 'Ver los productos', 'maach' ),
			esc_url( home_url( '/' ) ),
			esc_html__( 'Ver el sitio', 'maach' )
		);
		return;
	}

	$total     = maach_total_paso( $paso, $datos );
	$procesado = maach_correr_paso( $paso, $desde, $datos );
	$siguiente = $desde + $procesado;
	$fin       = $siguiente >= $total;

	$claves   = array_keys( $pasos );
	$indice   = array_search( $paso, $claves, true );
	$sig_paso = $fin ? ( $claves[ $indice + 1 ] ?? 'fin' ) : $paso;
	$sig_desde = $fin ? 0 : $siguiente;

	printf(
		'<h2>%s</h2><p>%s: <strong>%d / %d</strong></p>',
		esc_html( $pasos[ $paso ] ),
		esc_html__( 'Progreso', 'maach' ),
		(int) min( $siguiente, $total ),
		(int) $total
	);
	printf(
		'<div style="background:#e0e0e0;height:18px;max-width:640px"><div style="background:#f34a23;height:18px;width:%d%%"></div></div>',
		$total ? (int) ( 100 * min( $siguiente, $total ) / $total ) : 100
	);

	$url = add_query_arg( array( 'correr' => 1, 'paso' => $sig_paso, 'desde' => $sig_desde ) );
	printf(
		'<p class="description">%s</p><meta http-equiv="refresh" content="1;url=%s"><p><a href="%s">%s</a></p></div>',
		esc_html__( 'Continuando automáticamente…', 'maach' ),
		esc_url( $url ),
		esc_url( $url ),
		esc_html__( 'Continuar ahora', 'maach' )
	);
}

/**
 * Cuántos elementos tiene un paso.
 *
 * @param string $paso  Paso.
 * @param array  $datos Manifiesto.
 * @return int
 */
function maach_total_paso( $paso, $datos ) {
	switch ( $paso ) {
		case 'categorias':
			return count( $datos['categorias'] );
		case 'productos':
			return count( $datos['productos'] );
		case 'proyectos':
			return count( $datos['proyectos'] );
		case 'articulos':
			return count( $datos['articulos'] );
		case 'paginas':
			return 1;
	}
	return 0;
}

/**
 * Ejecuta un lote de un paso.
 *
 * @param string $paso  Paso.
 * @param int    $desde Índice inicial.
 * @param array  $datos Manifiesto.
 * @return int Elementos procesados.
 */
function maach_correr_paso( $paso, $desde, $datos ) {
	@set_time_limit( 300 ); // phpcs:ignore WordPress.PHP.NoSilencedErrors

	if ( 'paginas' === $paso ) {
		maach_importar_paginas( $datos );
		return 1;
	}

	$lista = array();
	switch ( $paso ) {
		case 'categorias':
			$lista = $datos['categorias'];
			break;
		case 'productos':
			$lista = $datos['productos'];
			break;
		case 'proyectos':
			$lista = $datos['proyectos'];
			break;
		case 'articulos':
			$lista = $datos['articulos'];
			break;
	}

	$lote = array_slice( $lista, $desde, MAACH_LOTE );
	foreach ( $lote as $item ) {
		switch ( $paso ) {
			case 'categorias':
				maach_importar_categoria( $item );
				break;
			case 'productos':
				maach_importar_producto( $item );
				break;
			case 'proyectos':
				maach_importar_proyecto( $item );
				break;
			case 'articulos':
				maach_importar_articulo( $item );
				break;
		}
	}
	return count( $lote );
}

/**
 * Crea o actualiza una categoría con sus subcategorías.
 *
 * @param array $cat Categoría del manifiesto.
 */
function maach_importar_categoria( $cat ) {
	$term = get_term_by( 'slug', $cat['slug'], 'maach_categoria' );
	if ( ! $term ) {
		$creado = wp_insert_term( $cat['nombre'], 'maach_categoria', array( 'slug' => $cat['slug'] ) );
		if ( is_wp_error( $creado ) ) {
			return;
		}
		$term_id = $creado['term_id'];
	} else {
		$term_id = $term->term_id;
		wp_update_term( $term_id, 'maach_categoria', array( 'name' => $cat['nombre'] ) );
	}
	update_term_meta( $term_id, 'maach_intro', $cat['intro'] );

	$orden = 0;
	foreach ( $cat['secciones'] as $sec ) {
		foreach ( $sec['subcategorias'] as $sub ) {
			++$orden;
			$slug = sanitize_title( $sub );
			$hijo = get_term_by( 'slug', $slug, 'maach_subcategoria' );
			if ( ! $hijo ) {
				$creado = wp_insert_term( $sub, 'maach_subcategoria', array( 'slug' => $slug ) );
				if ( is_wp_error( $creado ) ) {
					continue;
				}
				$hijo_id = $creado['term_id'];
			} else {
				$hijo_id = $hijo->term_id;
			}
			update_term_meta( $hijo_id, 'maach_caracteristicas', implode( "\n", $sec['caracteristicas'] ) );
			update_term_meta( $hijo_id, 'maach_intro', $sec['descripcion'] );
			update_term_meta( $hijo_id, 'maach_categoria_padre', $cat['slug'] );
			update_term_meta( $hijo_id, 'maach_seccion', $sec['slug'] );
			// Conserva el orden del catálogo (gerente → operativos → …).
			update_term_meta( $hijo_id, 'maach_orden', $orden );
		}
	}
}

/**
 * Crea o actualiza un producto con su galería y documentos.
 *
 * @param array $p Producto del manifiesto.
 */
function maach_importar_producto( $p ) {
	$id = maach_post_por_slug( $p['slug'], 'maach_producto' );

	$args = array(
		'post_type'    => 'maach_producto',
		'post_status'  => 'publish',
		'post_title'   => $p['nombre'],
		'post_name'    => $p['slug'],
		'post_excerpt' => $p['descripcion'],
		'post_content' => '',
	);
	if ( $id ) {
		$args['ID'] = $id;
		$id         = wp_update_post( $args );
	} else {
		$id = wp_insert_post( $args );
	}
	if ( ! $id || is_wp_error( $id ) ) {
		return;
	}

	update_post_meta( $id, 'maach_sku', $p['sku'] );
	update_post_meta( $id, 'maach_caracteristicas', implode( "\n", $p['caracteristicas'] ) );

	wp_set_object_terms( $id, array( $p['categoria'] ), 'maach_categoria' );
	wp_set_object_terms( $id, array( sanitize_title( $p['subcategoria'] ) ), 'maach_subcategoria' );

	// Fotos. Si alguna no se puede descargar (servidor sin salida a internet,
	// por ejemplo) se guarda su URL de origen para que la ficha no quede vacía.
	$ids = array();
	foreach ( $p['galeria'] as $url ) {
		$adjunto = maach_traer_medio( $url, $id, $p['nombre'] );
		if ( $adjunto ) {
			$ids[] = $adjunto;
		}
	}
	if ( $ids ) {
		update_post_meta( $id, 'maach_galeria', implode( ',', $ids ) );
		set_post_thumbnail( $id, reset( $ids ) );
	}
	if ( count( $ids ) < count( $p['galeria'] ) ) {
		update_post_meta( $id, 'maach_galeria_urls', implode( "\n", $p['galeria'] ) );
	} else {
		delete_post_meta( $id, 'maach_galeria_urls' );
	}

	// Documentos: se descargan a Medios para que el sitio sea autónomo.
	foreach ( array( 'pdf', 'dwg', 'rfa', 'skp' ) as $ext ) {
		$url = $p['archivos'][ $ext ] ?? '';
		if ( ! $url ) {
			delete_post_meta( $id, 'maach_' . $ext );
			continue;
		}
		$adjunto = maach_traer_medio( $url, $id, $p['nombre'] . ' · ' . strtoupper( $ext ) );
		update_post_meta( $id, 'maach_' . $ext, $adjunto ? wp_get_attachment_url( $adjunto ) : $url );
	}
}

/**
 * Crea o actualiza un proyecto del portafolio.
 *
 * @param array $pr Proyecto del manifiesto.
 */
function maach_importar_proyecto( $pr ) {
	$id   = maach_post_por_slug( $pr['slug'], 'maach_proyecto' );
	$args = array(
		'post_type'   => 'maach_proyecto',
		'post_status' => 'publish',
		'post_title'  => $pr['titulo'],
		'post_name'   => $pr['slug'],
		'menu_order'  => (int) $pr['id'],
	);
	if ( $id ) {
		$args['ID'] = $id;
		$id         = wp_update_post( $args );
	} else {
		$id = wp_insert_post( $args );
	}
	if ( ! $id || is_wp_error( $id ) ) {
		return;
	}

	update_post_meta( $id, 'maach_ubicacion', $pr['ubicacion'] ?? '' );
	update_post_meta( $id, 'maach_alcance', $pr['alcance'] ?? '' );
	update_post_meta( $id, 'maach_area', $pr['area'] ?? '' );
	update_post_meta( $id, 'maach_anio', $pr['anio'] ?? '' );
	update_post_meta( $id, 'maach_desafio', implode( "\n", $pr['desafio'] ?? array() ) );
	update_post_meta( $id, 'maach_propuesta_intro', $pr['propuesta_intro'] ?? '' );
	update_post_meta( $id, 'maach_propuesta', implode( "\n", $pr['propuesta'] ?? array() ) );
	update_post_meta( $id, 'maach_resultado', implode( "\n", $pr['resultado'] ?? array() ) );

	$portada = maach_traer_medio( $pr['portada'], $id, $pr['titulo'] );
	if ( $portada ) {
		set_post_thumbnail( $id, $portada );
	}

	$ids = array();
	foreach ( $pr['galeria'] as $url ) {
		$adjunto = maach_traer_medio( $url, $id, $pr['titulo'] );
		if ( $adjunto ) {
			$ids[] = $adjunto;
		}
	}
	if ( $ids ) {
		update_post_meta( $id, 'maach_galeria', implode( ',', $ids ) );
	}
	if ( count( $ids ) < count( $pr['galeria'] ) ) {
		update_post_meta( $id, 'maach_galeria_urls', implode( "\n", $pr['galeria'] ) );
	} else {
		delete_post_meta( $id, 'maach_galeria_urls' );
	}
	if ( ! $portada && ! empty( $pr['portada'] ) ) {
		update_post_meta( $id, 'maach_portada_url', $pr['portada'] );
	}
}

/**
 * Crea o actualiza un artículo de Investigación como entrada normal.
 *
 * @param array $a Artículo del manifiesto.
 */
function maach_importar_articulo( $a ) {
	$contenido  = '<!-- wp:paragraph --><p>' . esc_html( $a['intro'] ) . '</p><!-- /wp:paragraph -->';
	foreach ( $a['secciones'] as $sec ) {
		switch ( $sec['tipo'] ) {
			case 'h2':
				$contenido .= '<!-- wp:heading --><h2>' . esc_html( $sec['texto'] ) . '</h2><!-- /wp:heading -->';
				break;
			case 'h3':
				$contenido .= '<!-- wp:heading {"level":3} --><h3>' . esc_html( $sec['texto'] ) . '</h3><!-- /wp:heading -->';
				break;
			case 'quote':
				$contenido .= '<!-- wp:quote --><blockquote class="wp-block-quote"><p>' . esc_html( $sec['texto'] ) . '</p></blockquote><!-- /wp:quote -->';
				break;
			case 'ul':
				$items = '';
				foreach ( $sec['items'] as $it ) {
					$items .= '<!-- wp:list-item --><li>' . esc_html( $it ) . '</li><!-- /wp:list-item -->';
				}
				$contenido .= '<!-- wp:list --><ul class="wp-block-list">' . $items . '</ul><!-- /wp:list -->';
				break;
			default:
				$contenido .= '<!-- wp:paragraph --><p>' . esc_html( $sec['texto'] ) . '</p><!-- /wp:paragraph -->';
		}
	}
	if ( ! empty( $a['cierre'] ) ) {
		$contenido .= '<!-- wp:paragraph --><p>' . esc_html( $a['cierre'] ) . '</p><!-- /wp:paragraph -->';
	}

	$id   = maach_post_por_slug( $a['slug'], 'post' );
	$args = array(
		'post_type'    => 'post',
		'post_status'  => 'publish',
		'post_title'   => $a['titulo'],
		'post_name'    => $a['slug'],
		'post_excerpt' => $a['intro'],
		'post_content' => $contenido,
	);
	if ( $id ) {
		$args['ID'] = $id;
		$id         = wp_update_post( $args );
	} else {
		$id = wp_insert_post( $args );
	}
	if ( ! $id || is_wp_error( $id ) ) {
		return;
	}

	update_post_meta( $id, 'maach_lectura', $a['lectura'] );
	update_post_meta( $id, 'maach_numero', $a['numero'] );
	if ( ! empty( $a['categoria'] ) ) {
		wp_set_object_terms( $id, array( $a['categoria'] ), 'category' );
	}
	$portada = maach_traer_medio( $a['portada'], $id, $a['titulo'] );
	if ( $portada ) {
		set_post_thumbnail( $id, $portada );
	}
}

/**
 * Crea las páginas fijas, las asigna a sus plantillas y arma los menús.
 *
 * @param array $datos Manifiesto.
 */
function maach_importar_paginas( $datos ) {
	$t = $datos['textos'];

	$paginas = array(
		'inicio'      => array( 'titulo' => 'Inicio', 'plantilla' => '' ),
		'espacios'    => array( 'titulo' => 'Espacios', 'plantilla' => 'page-templates/espacios.php' ),
		'sobre-maach' => array( 'titulo' => 'Sobre MAACH', 'plantilla' => 'page-templates/sobre.php' ),
		'contacto'    => array( 'titulo' => 'Contacto', 'plantilla' => 'page-templates/contacto.php' ),
		'biblioteca'  => array( 'titulo' => 'Biblioteca de documentos', 'plantilla' => 'page-templates/biblioteca.php' ),
		'investigacion' => array( 'titulo' => 'Investigación', 'plantilla' => '' ),
	);

	$ids = array();
	foreach ( $paginas as $slug => $cfg ) {
		$id = maach_post_por_slug( $slug, 'page' );
		$args = array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_title'  => $cfg['titulo'],
			'post_name'   => $slug,
		);
		if ( $id ) {
			$args['ID'] = $id;
			$id         = wp_update_post( $args );
		} else {
			$id = wp_insert_post( $args );
		}
		if ( $id && ! is_wp_error( $id ) ) {
			$ids[ $slug ] = $id;
			if ( $cfg['plantilla'] ) {
				update_post_meta( $id, '_wp_page_template', $cfg['plantilla'] );
			}
		}
	}

	// Portada estática y página de entradas.
	if ( isset( $ids['inicio'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $ids['inicio'] );
	}
	if ( isset( $ids['investigacion'] ) ) {
		update_option( 'page_for_posts', $ids['investigacion'] );
	}

	// Textos del personalizador tomados del sitio original.
	set_theme_mod( 'maach_footer_manifiesto_1', $t['footer.manifesto.line1'] ?? '' );
	set_theme_mod( 'maach_footer_manifiesto_2', $t['footer.manifesto.line2'] ?? '' );
	set_theme_mod( 'maach_footer_manifiesto_3', $t['footer.manifesto.line3'] ?? '' );
	set_theme_mod( 'maach_footer_intro', $t['footer.intro'] ?? '' );
	set_theme_mod( 'maach_direccion_1', $t['footer.address.line1'] ?? '' );
	set_theme_mod( 'maach_direccion_2', $t['footer.address.line2'] ?? '' );
	set_theme_mod( 'maach_tagline', $t['footer.bottom.tagline'] ?? '' );
	set_theme_mod( 'maach_hero_titulo', $t['home.hero.title'] ?? '' );
	set_theme_mod( 'maach_hero_sub', $t['home.hero.sub'] ?? '' );
	set_theme_mod( 'maach_marquee', implode(
		"\n",
		array_filter( array(
			$t['nav.marquee.0'] ?? '',
			$t['nav.marquee.1'] ?? '',
			$t['nav.marquee.2'] ?? '',
			$t['nav.marquee.3'] ?? '',
			$t['nav.marquee.4'] ?? '',
		) )
	) );

	// Menú principal.
	maach_crear_menu( 'Principal', 'principal', array(
		array( 'titulo' => 'Productos', 'url' => get_post_type_archive_link( 'maach_producto' ) ),
		array( 'titulo' => 'Espacios', 'id' => $ids['espacios'] ?? 0 ),
		array( 'titulo' => 'Portafolio', 'url' => get_post_type_archive_link( 'maach_proyecto' ) ),
		array( 'titulo' => 'Investigación', 'id' => $ids['investigacion'] ?? 0 ),
		array( 'titulo' => 'Sobre MAACH', 'id' => $ids['sobre-maach'] ?? 0 ),
		array( 'titulo' => 'Contacto', 'id' => $ids['contacto'] ?? 0 ),
	) );

	$cats = array();
	foreach ( $datos['categorias'] as $cat ) {
		$term = get_term_by( 'slug', $cat['slug'], 'maach_categoria' );
		if ( $term ) {
			$cats[] = array( 'titulo' => $cat['nombre'], 'url' => get_term_link( $term ) );
		}
	}
	maach_crear_menu( 'Footer productos', 'footer_1', $cats );
	maach_crear_menu( 'Footer compañía', 'footer_2', array(
		array( 'titulo' => 'Sobre MAACH', 'id' => $ids['sobre-maach'] ?? 0 ),
		array( 'titulo' => 'Investigación', 'id' => $ids['investigacion'] ?? 0 ),
		array( 'titulo' => 'Portafolio', 'url' => get_post_type_archive_link( 'maach_proyecto' ) ),
		array( 'titulo' => 'Contacto', 'id' => $ids['contacto'] ?? 0 ),
	) );
	maach_crear_menu( 'Footer recursos', 'footer_3', array(
		array( 'titulo' => 'Biblioteca de documentos', 'id' => $ids['biblioteca'] ?? 0 ),
		array( 'titulo' => 'Modelos 3D / CAD', 'url' => add_query_arg( 'tipo', 'modelos', get_permalink( $ids['biblioteca'] ?? 0 ) ) ),
		array( 'titulo' => 'Fichas técnicas', 'url' => add_query_arg( 'tipo', 'fichas', get_permalink( $ids['biblioteca'] ?? 0 ) ) ),
	) );

	flush_rewrite_rules();
}

/**
 * Crea un menú y lo asigna a su ubicación.
 *
 * @param string $nombre    Nombre visible.
 * @param string $ubicacion Slug de la ubicación registrada.
 * @param array  $items     Entradas.
 */
function maach_crear_menu( $nombre, $ubicacion, $items ) {
	$menu = wp_get_nav_menu_object( $nombre );
	$id   = $menu ? $menu->term_id : wp_create_nav_menu( $nombre );
	if ( is_wp_error( $id ) ) {
		return;
	}

	// Se rehace desde cero para que reejecutar el importador no duplique.
	foreach ( wp_get_nav_menu_items( $id ) ?: array() as $item ) {
		wp_delete_post( $item->ID, true );
	}

	foreach ( $items as $item ) {
		if ( ! empty( $item['id'] ) ) {
			wp_update_nav_menu_item( $id, 0, array(
				'menu-item-title'     => $item['titulo'],
				'menu-item-object'    => 'page',
				'menu-item-object-id' => (int) $item['id'],
				'menu-item-type'      => 'post_type',
				'menu-item-status'    => 'publish',
			) );
		} elseif ( ! empty( $item['url'] ) && ! is_wp_error( $item['url'] ) ) {
			wp_update_nav_menu_item( $id, 0, array(
				'menu-item-title'  => $item['titulo'],
				'menu-item-url'    => $item['url'],
				'menu-item-status' => 'publish',
			) );
		}
	}

	$ubicaciones               = get_theme_mod( 'nav_menu_locations', array() );
	$ubicaciones[ $ubicacion ] = $id;
	set_theme_mod( 'nav_menu_locations', $ubicaciones );
}

/**
 * Busca un post por slug.
 *
 * @param string $slug Slug.
 * @param string $tipo Tipo de contenido.
 * @return int
 */
function maach_post_por_slug( $slug, $tipo ) {
	$posts = get_posts( array(
		'name'        => $slug,
		'post_type'   => $tipo,
		'post_status' => array( 'publish', 'draft', 'private' ),
		'numberposts' => 1,
		'fields'      => 'ids',
	) );
	return $posts ? (int) $posts[0] : 0;
}

/**
 * Descarga un archivo remoto a la Biblioteca de medios (una sola vez).
 *
 * @param string $url    URL de origen.
 * @param int    $post   Post al que se adjunta.
 * @param string $titulo Título del adjunto.
 * @return int ID del adjunto o 0.
 */
function maach_traer_medio( $url, $post = 0, $titulo = '' ) {
	if ( empty( $url ) ) {
		return 0;
	}

	// Si ya se importó antes, se reutiliza.
	$existente = get_posts( array(
		'post_type'   => 'attachment',
		'post_status' => 'inherit',
		'numberposts' => 1,
		'fields'      => 'ids',
		'meta_key'    => 'maach_origen', // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
		'meta_value'  => $url, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
	) );
	if ( $existente ) {
		return (int) $existente[0];
	}

	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';

	$tmp = download_url( $url, 120 );
	if ( is_wp_error( $tmp ) ) {
		return 0;
	}

	$nombre = basename( wp_parse_url( $url, PHP_URL_PATH ) );
	$file   = array( 'name' => $nombre, 'tmp_name' => $tmp );

	// Los .dwg/.rfa/.skp no están en la lista blanca de WordPress: se permiten
	// sólo durante esta subida.
	$permitir = function ( $tipos ) {
		$tipos['dwg'] = 'application/acad';
		$tipos['rfa'] = 'application/octet-stream';
		$tipos['skp'] = 'application/octet-stream';
		return $tipos;
	};
	add_filter( 'upload_mimes', $permitir );
	$saltar_check = function ( $data, $file, $filename ) {
		$ext = strtolower( pathinfo( $filename, PATHINFO_EXTENSION ) );
		if ( in_array( $ext, array( 'dwg', 'rfa', 'skp' ), true ) ) {
			$data['ext']  = $ext;
			$data['type'] = 'application/octet-stream';
		}
		return $data;
	};
	add_filter( 'wp_check_filetype_and_ext', $saltar_check, 10, 3 );

	$id = media_handle_sideload( $file, $post, $titulo );

	remove_filter( 'upload_mimes', $permitir );
	remove_filter( 'wp_check_filetype_and_ext', $saltar_check, 10 );

	if ( is_wp_error( $id ) ) {
		if ( file_exists( $tmp ) ) {
			wp_delete_file( $tmp );
		}
		return 0;
	}

	update_post_meta( $id, 'maach_origen', $url );
	return (int) $id;
}

/**
 * Permite subir DWG/RFA/SKP también a mano desde Medios.
 *
 * @param array $tipos Tipos permitidos.
 * @return array
 */
function maach_mimes( $tipos ) {
	$tipos['dwg'] = 'application/acad';
	$tipos['rfa'] = 'application/octet-stream';
	$tipos['skp'] = 'application/octet-stream';
	return $tipos;
}
add_filter( 'upload_mimes', 'maach_mimes' );

/**
 * Comando WP-CLI equivalente: `wp maach importar`.
 */
if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command( 'maach importar', function () {
		$datos = maach_datos();
		foreach ( array_keys( maach_pasos() ) as $paso ) {
			$total = maach_total_paso( $paso, $datos );
			for ( $i = 0; $i < max( $total, 1 ); $i += MAACH_LOTE ) {
				maach_correr_paso( $paso, $i, $datos );
				WP_CLI::log( sprintf( '%s: %d/%d', $paso, min( $i + MAACH_LOTE, $total ), $total ) );
			}
		}
		WP_CLI::success( 'Catálogo importado.' );
	} );
}

/**
 * Panel de estado: qué hay creado en esta instalación y qué falta.
 * Sirve para ver de un vistazo por qué el sitio puede verse incompleto.
 *
 * @param array $datos Manifiesto.
 */
function maach_panel_estado( $datos ) {
	$paginas = array( 'espacios', 'sobre-maach', 'contacto', 'biblioteca', 'investigacion' );
	$creadas = 0;
	foreach ( $paginas as $slug ) {
		if ( get_page_by_path( $slug ) ) {
			++$creadas;
		}
	}

	$menus = 0;
	foreach ( array( 'principal', 'footer_1', 'footer_2', 'footer_3' ) as $ubicacion ) {
		if ( maach_menu_id( $ubicacion ) ) {
			++$menus;
		}
	}

	$cats      = get_terms( array( 'taxonomy' => 'maach_categoria', 'hide_empty' => false, 'fields' => 'count' ) );
	$cats      = is_wp_error( $cats ) ? 0 : (int) $cats;
	$productos = (int) wp_count_posts( 'maach_producto' )->publish;
	$proyectos = (int) wp_count_posts( 'maach_proyecto' )->publish;

	$filas = array(
		array( __( 'Archivo de catálogo (data/maach-content.json)', 'maach' ), $datos ? __( 'encontrado', 'maach' ) : __( 'NO encontrado', 'maach' ), (bool) $datos ),
		array( __( 'Categorías', 'maach' ), $cats . ' / ' . count( $datos['categorias'] ), $cats >= count( $datos['categorias'] ) ),
		array( __( 'Páginas del sitio', 'maach' ), $creadas . ' / ' . count( $paginas ), $creadas >= count( $paginas ) ),
		array( __( 'Menús asignados', 'maach' ), $menus . ' / 4', $menus >= 4 ),
		array( __( 'Productos', 'maach' ), $productos . ' / ' . count( $datos['productos'] ), $productos >= count( $datos['productos'] ) ),
		array( __( 'Proyectos', 'maach' ), $proyectos . ' / ' . count( $datos['proyectos'] ), $proyectos >= count( $datos['proyectos'] ) ),
	);

	echo '<h2>' . esc_html__( 'Estado de esta instalación', 'maach' ) . '</h2>';
	echo '<table class="widefat striped" style="max-width:640px;margin-bottom:24px"><tbody>';
	foreach ( $filas as $fila ) {
		printf(
			'<tr><td style="width:60%%">%s</td><td><strong>%s</strong></td><td style="width:40px;font-size:16px">%s</td></tr>',
			esc_html( $fila[0] ),
			esc_html( $fila[1] ),
			$fila[2] ? '✅' : '⚠️'
		);
	}
	echo '</tbody></table>';
}
