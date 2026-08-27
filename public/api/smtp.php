<?php
/**
 * Cliente SMTP mínimo, sin dependencias.
 *
 * cPanel suele tener capada la función mail() de PHP, así que el formulario
 * envía autenticándose contra el propio servidor de correo del dominio, igual
 * que lo haría un cliente como Outlook.
 */

declare( strict_types = 1 );

class EnvioSmtp {
	private $conexion;
	private array $config;
	/** @var string[] Diálogo con el servidor, para diagnóstico. */
	public array $traza = array();

	public function __construct( array $config ) {
		$this->config = $config;
	}

	/** Lee la respuesta del servidor y comprueba el código esperado. */
	private function leer( string $esperado ): string {
		$respuesta = '';
		while ( $linea = fgets( $this->conexion, 515 ) ) {
			$respuesta .= $linea;
			// La última línea de una respuesta lleva un espacio tras el código.
			if ( isset( $linea[3] ) && ' ' === $linea[3] ) {
				break;
			}
		}
		$this->traza[] = '< ' . trim( $respuesta );
		if ( '' !== $esperado && 0 !== strpos( $respuesta, $esperado ) ) {
			throw new RuntimeException( 'El servidor respondió: ' . trim( $respuesta ) );
		}
		return $respuesta;
	}

	/** Envía una orden al servidor. */
	private function decir( string $orden, string $esperado, bool $secreto = false ): void {
		$this->traza[] = '> ' . ( $secreto ? '········' : $orden );
		fwrite( $this->conexion, $orden . "\r\n" );
		$this->leer( $esperado );
	}

	/**
	 * Envía el mensaje. Lanza RuntimeException con el motivo si falla.
	 *
	 * @param string[] $destinatarios Correos de destino.
	 */
	public function enviar( array $destinatarios, string $asunto, string $cuerpo, string $responder_a = '' ): void {
		$host   = (string) $this->config['host'];
		$puerto = (int) $this->config['puerto'];
		$seguro = (string) ( $this->config['seguridad'] ?? 'tls' ); // tls | ssl

		$destino = ( 'ssl' === $seguro ? 'ssl://' : '' ) . $host;
		$contexto = stream_context_create( array(
			'ssl' => array( 'verify_peer' => true, 'verify_peer_name' => true ),
		) );

		$this->conexion = @stream_socket_client(
			$destino . ':' . $puerto,
			$errno,
			$errstr,
			15,
			STREAM_CLIENT_CONNECT,
			$contexto
		);
		if ( ! $this->conexion ) {
			throw new RuntimeException( sprintf( 'No se pudo conectar a %s:%d (%s)', $host, $puerto, $errstr ?: 'sin detalle' ) );
		}
		stream_set_timeout( $this->conexion, 15 );

		$this->leer( '220' );
		$yo = $this->config['dominio'] ?? 'localhost';
		$this->decir( 'EHLO ' . $yo, '250' );

		if ( 'tls' === $seguro ) {
			$this->decir( 'STARTTLS', '220' );
			if ( ! stream_socket_enable_crypto( $this->conexion, true, STREAM_CRYPTO_METHOD_TLS_CLIENT ) ) {
				throw new RuntimeException( 'No se pudo cifrar la conexión (STARTTLS).' );
			}
			$this->decir( 'EHLO ' . $yo, '250' );
		}

		$this->decir( 'AUTH LOGIN', '334' );
		$this->decir( base64_encode( (string) $this->config['usuario'] ), '334', true );
		$this->decir( base64_encode( (string) $this->config['clave'] ), '235', true );

		$remitente = (string) $this->config['remitente'];
		$this->decir( 'MAIL FROM:<' . $remitente . '>', '250' );
		foreach ( $destinatarios as $destinatario ) {
			$this->decir( 'RCPT TO:<' . $destinatario . '>', '250' );
		}
		$this->decir( 'DATA', '354' );

		$cabeceras = array(
			'From: ' . ( $this->config['nombre'] ?? 'MAACH' ) . ' <' . $remitente . '>',
			'To: ' . implode( ', ', $destinatarios ),
			'Subject: =?UTF-8?B?' . base64_encode( $asunto ) . '?=',
			'MIME-Version: 1.0',
			'Content-Type: text/plain; charset=UTF-8',
			'Content-Transfer-Encoding: 8bit',
			'Date: ' . date( 'r' ),
		);
		if ( '' !== $responder_a ) {
			$cabeceras[] = 'Reply-To: ' . $responder_a;
		}

		// Un punto solo en una línea cierra el mensaje: hay que escaparlo.
		$texto = preg_replace( '/^\./m', '..', $cuerpo );
		fwrite( $this->conexion, implode( "\r\n", $cabeceras ) . "\r\n\r\n" . $texto . "\r\n.\r\n" );
		$this->traza[] = '> (mensaje)';
		$this->leer( '250' );

		$this->decir( 'QUIT', '221' );
		fclose( $this->conexion );
	}
}
