<?php
/**
 * Crea el primer usuario del panel. En cuanto existe uno, esta pantalla se
 * bloquea sola: para añadir más se usa Usuarios dentro del panel.
 */
require __DIR__ . '/config.php';

$mensaje = '';
$error   = '';

if ( usuarios() ) {
	$error = 'El panel ya tiene usuarios. Entra con tu cuenta y añade los demás desde «Usuarios».';
} elseif ( 'POST' === $_SERVER['REQUEST_METHOD'] ) {
	$usuario    = trim( (string) ( $_POST['usuario'] ?? '' ) );
	$contrasena = (string) ( $_POST['contrasena'] ?? '' );

	if ( ! preg_match( '/^[a-zA-Z0-9._-]{3,32}$/', $usuario ) ) {
		$error = 'El usuario debe tener entre 3 y 32 caracteres: letras, números, punto, guion o guion bajo.';
	} elseif ( strlen( $contrasena ) < 10 ) {
		$error = 'La contraseña debe tener al menos 10 caracteres.';
	} else {
		$lista = array( $usuario => password_hash( $contrasena, PASSWORD_DEFAULT ) );
		$php   = "<?php\n// Usuarios del panel MAACH. Generado automáticamente.\nreturn " . var_export( $lista, true ) . ";\n";
		if ( false === @file_put_contents( USUARIOS, $php, LOCK_EX ) ) {
			$error = 'No se pudo escribir admin/usuarios.php. Revisa los permisos de la carpeta.';
		} else {
			$mensaje = 'Usuario creado. Ya puedes entrar al panel.';
		}
	}
}
?>
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>MAACH · Crear usuario</title>
<link rel="stylesheet" href="estilo.css">
</head>
<body>
<div class="login">
	<div class="marca">M<b>AA</b>CH</div>
	<p class="ayuda">Primer usuario del panel</p>

	<?php if ( $mensaje ) : ?>
		<div class="aviso ok"><?php echo e( $mensaje ); ?></div>
		<a class="boton" href="index.php" style="width:100%;text-align:center">Entrar</a>
	<?php else : ?>
		<?php if ( $error ) : ?><div class="aviso error"><?php echo e( $error ); ?></div><?php endif; ?>
		<?php if ( ! usuarios() ) : ?>
			<form method="post">
				<div class="campo">
					<label for="usuario">Usuario</label>
					<input type="text" id="usuario" name="usuario" required autofocus>
				</div>
				<div class="campo">
					<label for="contrasena">Contraseña (mínimo 10 caracteres)</label>
					<input type="password" id="contrasena" name="contrasena" required>
				</div>
				<button class="boton" type="submit" style="width:100%">Crear usuario</button>
			</form>
		<?php endif; ?>
	<?php endif; ?>
</div>
</body>
</html>
