<?php
/** Entrada al panel: inicio de sesión. */
require __DIR__ . '/config.php';

$error = '';

if ( 'POST' === $_SERVER['REQUEST_METHOD'] ) {
	$usuario    = trim( (string) ( $_POST['usuario'] ?? '' ) );
	$contrasena = (string) ( $_POST['contrasena'] ?? '' );
	$lista      = usuarios();

	// Pausa breve ante credenciales incorrectas para desalentar la fuerza bruta.
	if ( isset( $lista[ $usuario ] ) && password_verify( $contrasena, $lista[ $usuario ] ) ) {
		session_regenerate_id( true );
		$_SESSION['maach_usuario'] = $usuario;
		header( 'Location: textos.php' );
		exit;
	}
	usleep( 400000 );
	$error = 'Usuario o contraseña incorrectos.';
}

if ( sesion_activa() ) {
	header( 'Location: textos.php' );
	exit;
}

$sin_usuarios = ! usuarios();
?>
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>MAACH · Panel</title>
<link rel="stylesheet" href="estilo.css">
</head>
<body>
<div class="login">
	<div class="marca">M<b>AA</b>CH</div>
	<p class="ayuda">Panel de contenido</p>

	<?php if ( $sin_usuarios ) : ?>
		<div class="aviso error">
			No hay usuarios configurados todavía. Abre <span class="clave">admin/instalar.php</span>
			en el navegador para crear el primero.
		</div>
	<?php endif; ?>

	<?php if ( $error ) : ?>
		<div class="aviso error"><?php echo e( $error ); ?></div>
	<?php endif; ?>

	<form method="post">
		<div class="campo">
			<label for="usuario">Usuario</label>
			<input type="text" id="usuario" name="usuario" autocomplete="username" required autofocus>
		</div>
		<div class="campo">
			<label for="contrasena">Contraseña</label>
			<input type="password" id="contrasena" name="contrasena" autocomplete="current-password" required>
		</div>
		<button class="boton" type="submit" style="width:100%">Entrar</button>
	</form>
</div>
</body>
</html>
