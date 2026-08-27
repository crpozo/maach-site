<?php
/**
 * Recepción del formulario de contacto de maach.ec.
 *
 * Envía por SMTP autenticado con una cuenta del propio dominio (configurado en
 * correo-config.php). Si esa configuración no existe, cae a la función mail()
 * de PHP, que en muchos cPanel está capada — por eso se prefiere SMTP.
 *
 * Pase lo que pase, cada mensaje queda guardado en mensajes.log, así que
 * ninguno se pierde aunque el correo falle.
 */

declare( strict_types = 1 );

const REGISTRO   = __DIR__ . '/mensajes.log';
const LIMITE_MIN = 3; // Envíos por IP cada 10 minutos.

header( 'Content-Type: application/json; charset=utf-8' );

function responder( int $codigo, array $datos ): void {
	http_response_code( $codigo );
	echo json_encode( $datos, JSON_UNESCAPED_UNICODE );
	exit;
}

/** Configuración de correo; valores por defecto si aún no se ha creado. */
function config_correo(): array {
	$defecto = array(
		'destinatarios' => array( 'ventas@maach.ec' ),
		'copia'         => array(),
		'remitente'     => 'no-reply@maach.ec',
		'nombre'        => 'MAACH · Web',
		'host'          => '',
		'puerto'        => 587,
		'seguridad'     => 'tls',
		'usuario'       => '',
		'clave'         => '',
		'dominio'       => 'maach.ec',
	);
	$archivo = __DIR__ . '/correo-config.php';
	if ( is_readable( $archivo ) ) {
		$propia = require $archivo;
		if ( is_array( $propia ) ) {
			return array_merge( $defecto, $propia );
		}
	}
	return $defecto;
}

$config = config_correo();
$por_smtp = '' !== (string) $config['host'] && '' !== (string) $config['usuario'] && '' !== (string) $config['clave'];

// ─── Diagnóstico ───────────────────────────────────────────────────────────
// /api/contacto.php?diagnostico=1 dice cómo está configurado, sin revelar la
// contraseña. Sirve para comprobar el montaje sin enviar nada.
if ( isset( $_GET['diagnostico'] ) ) {
	responder( 200, array(
		'metodo'          => $por_smtp ? 'SMTP autenticado' : 'mail() de PHP',
		'configurado'     => $por_smtp,
		'host'            => $config['host'] ?: '(sin configurar)',
		'puerto'          => $config['puerto'],
		'seguridad'       => $config['seguridad'],
		'remitente'       => $config['remitente'],
		'destinatarios'   => $config['destinatarios'],
		'copia'           => $config['copia'],
		'registro'        => is_writable( __DIR__ ) ? 'se puede escribir' : 'NO se puede escribir',
		'siguiente_paso'  => $por_smtp ? 'Listo para enviar.' : 'Copia correo-config.ejemplo.php a correo-config.php y rellénalo.',
	) );
}

if ( 'POST' !== ( $_SERVER['REQUEST_METHOD'] ?? '' ) ) {
	responder( 405, array( 'ok' => false, 'error' => 'Método no permitido' ) );
}

// ─── Datos recibidos ───────────────────────────────────────────────────────
$entrada = json_decode( (string) file_get_contents( 'php://input' ), true );
if ( ! is_array( $entrada ) ) {
	$entrada = $_POST;
}

$limpia = static function ( string $clave ) use ( $entrada ): string {
	$valor = trim( (string) ( $entrada[ $clave ] ?? '' ) );
	return str_replace( array( "\r", "\n" ), ' ', $valor );
};

$nombre   = mb_substr( $limpia( 'nombre' ), 0, 120 );
$correo   = mb_substr( $limpia( 'correo' ), 0, 160 );
$empresa  = mb_substr( $limpia( 'empresa' ), 0, 120 );
$telefono = mb_substr( $limpia( 'telefono' ), 0, 60 );
$mensaje  = mb_substr( trim( (string) ( $entrada['mensaje'] ?? '' ) ), 0, 4000 );
$trampa   = trim( (string) ( $entrada['web'] ?? '' ) );

if ( '' !== $trampa ) {
	responder( 200, array( 'ok' => true ) ); // Bot: se le responde bien y no se envía.
}
if ( '' === $nombre || '' === $mensaje || ! filter_var( $correo, FILTER_VALIDATE_EMAIL ) ) {
	responder( 422, array( 'ok' => false, 'error' => 'Faltan datos: nombre, correo válido y mensaje.' ) );
}

// ─── Límite por IP ─────────────────────────────────────────────────────────
$ip     = (string) ( $_SERVER['REMOTE_ADDR'] ?? 'desconocida' );
$marca  = sys_get_temp_dir() . '/maach_' . md5( $ip );
$ahora  = time();
$envios = array();
if ( is_readable( $marca ) ) {
	$envios = array_filter(
		array_map( 'intval', explode( ',', (string) file_get_contents( $marca ) ) ),
		static fn( int $t ): bool => $t > $ahora - 600
	);
}
if ( count( $envios ) >= LIMITE_MIN ) {
	responder( 429, array( 'ok' => false, 'error' => 'Demasiados envíos seguidos. Intenta en unos minutos.' ) );
}
$envios[] = $ahora;
@file_put_contents( $marca, implode( ',', $envios ) );

// ─── Mensaje ───────────────────────────────────────────────────────────────
$asunto = sprintf( 'Nuevo mensaje desde maach.ec · %s', $nombre );
$cuerpo = implode( "\n", array(
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
) );

$destinatarios = array_values( array_unique( array_filter( array_merge(
	(array) $config['destinatarios'],
	(array) $config['copia']
) ) ) );

$enviado = false;
$motivo  = '';

if ( $por_smtp ) {
	require_once __DIR__ . '/smtp.php';
	try {
		$smtp = new EnvioSmtp( $config );
		$smtp->enviar( $destinatarios, $asunto, $cuerpo, sprintf( '%s <%s>', $nombre, $correo ) );
		$enviado = true;
	} catch ( Throwable $e ) {
		$motivo = $e->getMessage();
	}
} else {
	$cabeceras = implode( "\r\n", array(
		'From: ' . $config['nombre'] . ' <' . $config['remitente'] . '>',
		'Reply-To: ' . $nombre . ' <' . $correo . '>',
		'Content-Type: text/plain; charset=UTF-8',
	) );
	$enviado = @mail(
		implode( ', ', $destinatarios ),
		'=?UTF-8?B?' . base64_encode( $asunto ) . '?=',
		$cuerpo,
		$cabeceras,
		'-f' . $config['remitente']
	);
	$motivo = $enviado ? '' : 'La función mail() del servidor devolvió error (suele estar capada en cPanel).';
}

// Copia local: ningún mensaje se pierde aunque el correo falle.
@file_put_contents(
	REGISTRO,
	sprintf(
		"[%s] %s <%s> · enviado=%s%s\n%s\n\n",
		date( 'c' ),
		$nombre,
		$correo,
		$enviado ? 'si' : 'NO',
		$motivo ? ' · motivo: ' . $motivo : '',
		$mensaje
	),
	FILE_APPEND | LOCK_EX
);

if ( ! $enviado ) {
	responder( 500, array(
		'ok'    => false,
		'error' => 'No pudimos enviar el correo, pero guardamos tu mensaje. También puedes escribirnos a ' . ( $config['destinatarios'][0] ?? 'ventas@maach.ec' ),
	) );
}

responder( 200, array( 'ok' => true ) );
