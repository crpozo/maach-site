<?php
/**
 * Panel de administración de maach.ec — configuración y utilidades.
 *
 * El contenido editable vive en ../contenido/contenido.json, fuera del
 * repositorio, así que los despliegues no lo pisan. Cada guardado deja una
 * copia con fecha en ../contenido/respaldos/ y una línea en el registro.
 */

declare( strict_types = 1 );

session_start();

const RAIZ       = __DIR__ . '/..';
const CONTENIDO  = RAIZ . '/contenido/contenido.json';
const SEED       = RAIZ . '/contenido/contenido.seed.json';
const RESPALDOS  = RAIZ . '/contenido/respaldos';
const REGISTRO   = RAIZ . '/contenido/registro.log';
const USUARIOS   = __DIR__ . '/usuarios.php';

/** Usuarios del panel: usuario => hash de contraseña. */
function usuarios(): array {
	return file_exists( USUARIOS ) ? (array) require USUARIOS : array();
}

function sesion_activa(): bool {
	return ! empty( $_SESSION['maach_usuario'] );
}

function usuario_actual(): string {
	return (string) ( $_SESSION['maach_usuario'] ?? '' );
}

function exigir_sesion(): void {
	if ( ! sesion_activa() ) {
		header( 'Location: index.php' );
		exit;
	}
}

/** Token contra envíos falsificados desde otro sitio. */
function token(): string {
	if ( empty( $_SESSION['maach_token'] ) ) {
		$_SESSION['maach_token'] = bin2hex( random_bytes( 16 ) );
	}
	return $_SESSION['maach_token'];
}

function token_valido( ?string $enviado ): bool {
	return ! empty( $_SESSION['maach_token'] ) && is_string( $enviado )
		&& hash_equals( $_SESSION['maach_token'], $enviado );
}

/** Contenido vigente: lo editado si existe, si no el de fábrica. */
function leer_contenido(): array {
	foreach ( array( CONTENIDO, SEED ) as $archivo ) {
		if ( is_readable( $archivo ) ) {
			$datos = json_decode( (string) file_get_contents( $archivo ), true );
			if ( is_array( $datos ) ) {
				return $datos;
			}
		}
	}
	return array( 'version' => 1, 'textos' => array(), 'productos' => array() );
}

/** Contenido de fábrica, para poder revertir un texto a su valor original. */
function leer_seed(): array {
	if ( is_readable( SEED ) ) {
		$datos = json_decode( (string) file_get_contents( SEED ), true );
		if ( is_array( $datos ) ) {
			return $datos;
		}
	}
	return array( 'textos' => array(), 'productos' => array() );
}

/**
 * Guarda el contenido: respaldo, escritura atómica y registro de quién lo hizo.
 *
 * @return string Cadena vacía si todo fue bien, o el motivo del fallo.
 */
function guardar_contenido( array $datos, string $resumen ): string {
	$carpeta = dirname( CONTENIDO );
	if ( ! is_dir( $carpeta ) && ! @mkdir( $carpeta, 0755, true ) ) {
		return 'No se pudo crear la carpeta contenido/.';
	}
	if ( ! is_dir( RESPALDOS ) ) {
		@mkdir( RESPALDOS, 0755, true );
	}

	// Respaldo de la versión anterior antes de tocar nada.
	if ( is_readable( CONTENIDO ) ) {
		@copy( CONTENIDO, RESPALDOS . '/contenido-' . date( 'Ymd-His' ) . '.json' );
		limpiar_respaldos();
	}

	$datos['version']   = 1;
	$datos['guardado']  = date( 'c' );
	$datos['por']       = usuario_actual();

	$json = json_encode( $datos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
	if ( false === $json ) {
		return 'No se pudo preparar el contenido.';
	}

	// Escritura atómica: se escribe aparte y se reemplaza de golpe, para que
	// nadie llegue a leer un archivo a medio escribir.
	$temporal = CONTENIDO . '.tmp';
	if ( false === @file_put_contents( $temporal, $json, LOCK_EX ) || ! @rename( $temporal, CONTENIDO ) ) {
		@unlink( $temporal );
		return 'No se pudo escribir contenido.json. Revisa los permisos de la carpeta.';
	}

	@file_put_contents(
		REGISTRO,
		sprintf( "[%s] %s · %s\n", date( 'c' ), usuario_actual(), $resumen ),
		FILE_APPEND | LOCK_EX
	);

	return '';
}

/** Conserva los 30 respaldos más recientes. */
function limpiar_respaldos(): void {
	$archivos = glob( RESPALDOS . '/contenido-*.json' ) ?: array();
	if ( count( $archivos ) <= 30 ) {
		return;
	}
	sort( $archivos );
	foreach ( array_slice( $archivos, 0, count( $archivos ) - 30 ) as $viejo ) {
		@unlink( $viejo );
	}
}

/** Últimas líneas del registro, de la más reciente a la más antigua. */
function ultimos_cambios( int $cuantos = 12 ): array {
	if ( ! is_readable( REGISTRO ) ) {
		return array();
	}
	$lineas = array_filter( explode( "\n", (string) file_get_contents( REGISTRO ) ) );
	return array_slice( array_reverse( $lineas ), 0, $cuantos );
}

function e( ?string $texto ): string {
	return htmlspecialchars( (string) $texto, ENT_QUOTES, 'UTF-8' );
}

/**
 * Agrupa las claves de texto por su prefijo, para que el panel muestre
 * «Inicio», «Contacto», «Productos»… en vez de 864 claves sueltas.
 */
function grupos_de_textos( array $textos ): array {
	$nombres = array(
		'home'    => 'Inicio',
		'cont'    => 'Contacto',
		'prod'    => 'Productos',
		'cat'     => 'Categorías',
		'nav'     => 'Menú y navegación',
		'footer'  => 'Pie de página',
		'port'    => 'Portafolio',
		'inv'     => 'Investigación',
		'blog'    => 'Artículos',
		'about'   => 'Sobre MAACH',
		'esp'     => 'Espacios',
		'pd'      => 'Ficha de producto',
		'pdet'    => 'Ficha de producto',
		'cta'     => 'Botones',
		'rec'     => 'Recursos',
	);
	$grupos = array();
	foreach ( $textos as $clave => $valor ) {
		$prefijo = strtok( $clave, '.' );
		$titulo  = $nombres[ $prefijo ] ?? ucfirst( (string) $prefijo );
		$grupos[ $titulo ][ $clave ] = $valor;
	}
	ksort( $grupos );
	return $grupos;
}
