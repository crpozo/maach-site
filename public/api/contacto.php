<?php
/**
 * Recepción del formulario de contacto de maach.ec.
 *
 * Vive en el mismo hosting (cPanel) y envía con la función mail() de PHP, sin
 * depender de ningún servicio externo. Guarda además una copia en un archivo
 * de texto por si el correo se pierde.
 *
 * El sitio es estático; este es el único archivo con lógica de servidor.
 */

declare( strict_types = 1 );

// ─── Configuración ─────────────────────────────────────────────────────────
const DESTINO   = 'ventas@maach.ec';
const REMITENTE = 'no-reply@maach.ec';   // debe ser del propio dominio
const REGISTRO  = __DIR__ . '/mensajes.log';
const LIMITE_MIN = 3;                     // envíos por IP cada 10 minutos

header( 'Content-Type: application/json; charset=utf-8' );

/**
 * Termina la petición con una respuesta JSON.
 */
function responder( int $codigo, array $datos ): void {
	http_response_code( $codigo );
	echo json_encode( $datos, JSON_UNESCAPED_UNICODE );
	exit;
}

if ( 'POST' !== ( $_SERVER['REQUEST_METHOD'] ?? '' ) ) {
	responder( 405, [ 'ok' => false, 'error' => 'Método no permitido' ] );
}

// ─── Datos recibidos ───────────────────────────────────────────────────────
// El formulario envía JSON; se acepta también un POST clásico.
$crudo   = file_get_contents( 'php://input' );
$entrada = json_decode( (string) $crudo, true );
if ( ! is_array( $entrada ) ) {
	$entrada = $_POST;
}

$limpia = static function ( string $clave ) use ( $entrada ): string {
	$valor = trim( (string) ( $entrada[ $clave ] ?? '' ) );
	// Fuera saltos de línea en cabeceras: evita inyección de encabezados.
	return str_replace( [ "\r", "\n" ], ' ', $valor );
};

$nombre  = mb_substr( $limpia( 'nombre' ), 0, 120 );
$correo  = mb_substr( $limpia( 'correo' ), 0, 160 );
$empresa = mb_substr( $limpia( 'empresa' ), 0, 120 );
$telefono = mb_substr( $limpia( 'telefono' ), 0, 60 );
$mensaje = mb_substr( trim( (string) ( $entrada['mensaje'] ?? '' ) ), 0, 4000 );
$trampa  = trim( (string) ( $entrada['web'] ?? '' ) ); // campo señuelo

// ─── Validación ────────────────────────────────────────────────────────────
if ( '' !== $trampa ) {
	// Un bot rellenó el campo oculto: se responde bien para no darle pistas.
	responder( 200, [ 'ok' => true ] );
}
if ( '' === $nombre || '' === $mensaje || ! filter_var( $correo, FILTER_VALIDATE_EMAIL ) ) {
	responder( 422, [ 'ok' => false, 'error' => 'Faltan datos: nombre, correo válido y mensaje.' ] );
}

// ─── Límite por IP ─────────────────────────────────────────────────────────
$ip     = (string) ( $_SERVER['REMOTE_ADDR'] ?? 'desconocida' );
$marca  = sys_get_temp_dir() . '/maach_' . md5( $ip );
$ahora  = time();
$envios = [];
if ( is_readable( $marca ) ) {
	$envios = array_filter(
		array_map( 'intval', explode( ',', (string) file_get_contents( $marca ) ) ),
		static fn( int $t ): bool => $t > $ahora - 600
	);
}
if ( count( $envios ) >= LIMITE_MIN ) {
	responder( 429, [ 'ok' => false, 'error' => 'Demasiados envíos seguidos. Intenta en unos minutos.' ] );
}
$envios[] = $ahora;
@file_put_contents( $marca, implode( ',', $envios ) );

// ─── Correo ────────────────────────────────────────────────────────────────
$asunto = sprintf( 'Nuevo mensaje desde maach.ec · %s', $nombre );
$cuerpo = implode(
	"\n",
	[
		'Nombre:   ' . $nombre,
		'Correo:   ' . $correo,
		'Empresa:  ' . ( '' !== $empresa ? $empresa : '—' ),
		'Teléfono: ' . ( '' !== $telefono ? $telefono : '—' ),
		'',
		'Mensaje:',
		$mensaje,
		'',
		'---',
		'Enviado el ' . date( 'd/m/Y H:i' ) . ' desde ' . $ip,
	]
);

$cabeceras = implode(
	"\r\n",
	[
		'From: MAACH web <' . REMITENTE . '>',
		'Reply-To: ' . $nombre . ' <' . $correo . '>',
		'Content-Type: text/plain; charset=UTF-8',
		'X-Mailer: maach.ec',
	]
);

$enviado = @mail( DESTINO, '=?UTF-8?B?' . base64_encode( $asunto ) . '?=', $cuerpo, $cabeceras, '-f' . REMITENTE );

// Copia local, por si el servidor no puede enviar correo.
@file_put_contents(
	REGISTRO,
	sprintf( "[%s] %s <%s> enviado=%s\n%s\n\n", date( 'c' ), $nombre, $correo, $enviado ? 'si' : 'NO', $mensaje ),
	FILE_APPEND | LOCK_EX
);

if ( ! $enviado ) {
	responder( 500, [
		'ok'    => false,
		'error' => 'No se pudo enviar el correo. Escríbenos a ' . DESTINO,
	] );
}

responder( 200, [ 'ok' => true ] );
