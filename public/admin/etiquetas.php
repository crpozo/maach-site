<?php
/**
 * Nombres en español para los campos de texto.
 *
 * El sitio guarda los textos con claves técnicas (home.hero.h1.1). Aquí se
 * traducen a algo legible y, sobre todo, se agrupan los que forman una misma
 * frase en pantalla: el título de la portada son cuatro campos porque cada
 * parte lleva su color, pero para quien edita es un solo título.
 */

if ( ! defined( 'RAIZ' ) ) {
	exit;
}

/** Dónde aparece cada bloque de textos. */
function pagina_de( string $clave ): string {
	$mapa = array(
		'home'   => 'Portada',
		'cont'   => 'Contacto',
		'prod'   => 'Catálogo',
		'cat'    => 'Páginas de categoría',
		'nav'    => 'Menú superior',
		'footer' => 'Pie de página',
		'port'   => 'Portafolio',
		'inv'    => 'Investigación',
		'blog'   => 'Artículos',
		'about'  => 'Sobre MAACH',
		'esp'    => 'Espacios',
		'pd'     => 'Ficha de producto',
		'pdet'   => 'Ficha de producto',
		'cta'    => 'Botones del sitio',
		'rec'    => 'Biblioteca de recursos',
	);
	return $mapa[ strtok( $clave, '.' ) ] ?? 'Sitio';
}

/**
 * Familias de campos que juntos forman una sola frase visible.
 * Clave = primer campo de la familia; valor = nombre y campos que la componen.
 */
function familias(): array {
	return array(
		'home.hero.h1.1' => array(
			'nombre' => 'Título principal de la portada',
			'campos' => array( 'home.hero.h1.1', 'home.hero.h1.2', 'home.hero.h1.3', 'home.hero.h1.4' ),
			'nota'   => 'La segunda parte se muestra en naranja; la tercera empieza en una línea nueva.',
		),
		'footer.manifesto.line1' => array(
			'nombre' => 'Manifiesto del pie de página',
			'campos' => array( 'footer.manifesto.line1', 'footer.manifesto.line2', 'footer.manifesto.line3' ),
			'nota'   => 'La segunda parte se muestra en naranja.',
		),
		'home.adn.title.1' => array(
			'nombre' => 'Título de la sección ADN',
			'campos' => array( 'home.adn.title.1', 'home.adn.title.2' ),
		),
		'home.clientes.title.1' => array(
			'nombre' => 'Título de la sección Clientes',
			'campos' => array( 'home.clientes.title.1', 'home.clientes.title.2' ),
		),
		'cont.hero.title.1' => array(
			'nombre' => 'Título de la página Contacto',
			'campos' => array( 'cont.hero.title.1', 'cont.hero.title.2' ),
		),
		'cont.right.title.1' => array(
			'nombre' => 'Título sobre la foto de Contacto',
			'campos' => array( 'cont.right.title.1', 'cont.right.title.2' ),
		),
		'inv.hero.title.1' => array(
			'nombre' => 'Título de Investigación',
			'campos' => array( 'inv.hero.title.1', 'inv.hero.title.2' ),
		),
		'inv.list.title.1' => array(
			'nombre' => 'Título del listado de artículos',
			'campos' => array( 'inv.list.title.1', 'inv.list.title.2' ),
		),
		'port.hero.title.1' => array(
			'nombre' => 'Título del Portafolio',
			'campos' => array( 'port.hero.title.1', 'port.hero.title.2' ),
		),
	);
}

/** Devuelve la familia a la que pertenece un campo, si pertenece a alguna. */
function familia_de( string $clave ): ?array {
	static $indice = null;
	if ( null === $indice ) {
		$indice = array();
		foreach ( familias() as $primero => $datos ) {
			foreach ( $datos['campos'] as $campo ) {
				$indice[ $campo ] = $primero;
			}
		}
	}
	if ( ! isset( $indice[ $clave ] ) ) {
		return null;
	}
	$primero = $indice[ $clave ];
	return familias()[ $primero ] + array( 'primero' => $primero );
}

/** La frase completa tal como se ve en el sitio. */
function frase_de_familia( array $familia, array $textos ): string {
	$partes = array();
	foreach ( $familia['campos'] as $campo ) {
		$valor = trim( (string) ( $textos[ $campo ] ?? '' ) );
		if ( '' !== $valor ) {
			$partes[] = $valor;
		}
	}
	return implode( ' ', $partes );
}

/** Nombre legible de un campo suelto, deducido de su clave. */
function etiqueta_de( string $clave ): string {
	$conocidos = array(
		'tag'      => 'Etiqueta superior',
		'eyebrow'  => 'Antetítulo',
		'title'    => 'Título',
		'subtitle' => 'Subtítulo',
		'body'     => 'Texto',
		'intro'    => 'Introducción',
		'desc'     => 'Descripción',
		'name'     => 'Nombre',
		'cta'      => 'Botón',
		'label'    => 'Etiqueta',
		'quote'    => 'Cita',
		'source'   => 'Fuente de la cita',
		'closing'  => 'Cierre',
		'count'    => 'Contador',
		'tagline'  => 'Frase legal del pie',
		'address'  => 'Dirección',
	);
	$partes = explode( '.', $clave );
	$ultimo = end( $partes );
	if ( is_numeric( $ultimo ) ) {
		$anterior = $partes[ count( $partes ) - 2 ] ?? '';
		$base     = $conocidos[ $anterior ] ?? ucfirst( str_replace( '_', ' ', (string) $anterior ) );
		return $base . ' · parte ' . $ultimo;
	}
	foreach ( $conocidos as $sufijo => $nombre ) {
		if ( str_contains( $clave, '.' . $sufijo ) ) {
			return $nombre;
		}
	}
	return ucfirst( str_replace( array( '_', '.' ), array( ' ', ' › ' ), $clave ) );
}
