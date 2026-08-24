<?php
/** Gestión de las cuentas que pueden entrar al panel. */
require __DIR__ . '/config.php';
exigir_sesion();

$titulo = 'Usuarios';
$aviso  = '';
$error  = '';

function escribir_usuarios( array $lista ): bool {
	$php = "<?php\n// Usuarios del panel MAACH. Generado automáticamente.\nreturn " . var_export( $lista, true ) . ";\n";
	return false !== @file_put_contents( USUARIOS, $php, LOCK_EX );
}

if ( 'POST' === $_SERVER['REQUEST_METHOD'] ) {
	if ( ! token_valido( $_POST['token'] ?? null ) ) {
		$error = 'La sesión caducó. Vuelve a intentarlo.';
	} else {
		$lista  = usuarios();
		$accion = (string) ( $_POST['accion'] ?? '' );

		if ( 'crear' === $accion ) {
			$usuario    = trim( (string) ( $_POST['usuario'] ?? '' ) );
			$contrasena = (string) ( $_POST['contrasena'] ?? '' );
			if ( ! preg_match( '/^[a-zA-Z0-9._-]{3,32}$/', $usuario ) ) {
				$error = 'Usuario no válido: entre 3 y 32 caracteres, sin espacios ni acentos.';
			} elseif ( isset( $lista[ $usuario ] ) ) {
				$error = 'Ese usuario ya existe.';
			} elseif ( strlen( $contrasena ) < 10 ) {
				$error = 'La contraseña debe tener al menos 10 caracteres.';
			} else {
				$lista[ $usuario ] = password_hash( $contrasena, PASSWORD_DEFAULT );
				if ( escribir_usuarios( $lista ) ) {
					$aviso = 'Usuario «' . $usuario . '» creado.';
					@file_put_contents( REGISTRO, sprintf( "[%s] %s · Alta de usuario: %s\n", date( 'c' ), usuario_actual(), $usuario ), FILE_APPEND );
				} else {
					$error = 'No se pudo guardar. Revisa los permisos de admin/.';
				}
			}
		}

		if ( 'clave' === $accion ) {
			$usuario    = (string) ( $_POST['usuario'] ?? '' );
			$contrasena = (string) ( $_POST['contrasena'] ?? '' );
			if ( ! isset( $lista[ $usuario ] ) ) {
				$error = 'Ese usuario no existe.';
			} elseif ( strlen( $contrasena ) < 10 ) {
				$error = 'La contraseña debe tener al menos 10 caracteres.';
			} else {
				$lista[ $usuario ] = password_hash( $contrasena, PASSWORD_DEFAULT );
				$aviso = escribir_usuarios( $lista ) ? 'Contraseña actualizada.' : '';
				$error = $aviso ? '' : 'No se pudo guardar.';
			}
		}

		if ( 'borrar' === $accion ) {
			$usuario = (string) ( $_POST['usuario'] ?? '' );
			if ( $usuario === usuario_actual() ) {
				$error = 'No puedes borrar tu propia cuenta mientras la usas.';
			} elseif ( count( $lista ) <= 1 ) {
				$error = 'Debe quedar al menos un usuario.';
			} elseif ( ! isset( $lista[ $usuario ] ) ) {
				$error = 'Ese usuario no existe.';
			} else {
				unset( $lista[ $usuario ] );
				$aviso = escribir_usuarios( $lista ) ? 'Usuario eliminado.' : '';
				$error = $aviso ? '' : 'No se pudo guardar.';
				@file_put_contents( REGISTRO, sprintf( "[%s] %s · Baja de usuario: %s\n", date( 'c' ), usuario_actual(), $usuario ), FILE_APPEND );
			}
		}
	}
}

$lista = usuarios();
require __DIR__ . '/cabecera.php';
?>
<h1>Usuarios del panel</h1>
<p class="ayuda">Cada persona entra con su propia cuenta, y el historial deja constancia de quién cambió qué.</p>

<?php if ( $aviso ) : ?><div class="aviso ok"><?php echo e( $aviso ); ?></div><?php endif; ?>
<?php if ( $error ) : ?><div class="aviso error"><?php echo e( $error ); ?></div><?php endif; ?>

<h2>Cuentas</h2>
<table>
	<tr><th>Usuario</th><th>Cambiar contraseña</th><th></th></tr>
	<?php foreach ( $lista as $usuario => $hash ) : ?>
		<tr>
			<td><?php echo e( (string) $usuario ); ?><?php echo $usuario === usuario_actual() ? ' <span class="clave">(tú)</span>' : ''; ?></td>
			<td>
				<form method="post" style="display:flex;gap:8px">
					<input type="hidden" name="token" value="<?php echo e( token() ); ?>">
					<input type="hidden" name="accion" value="clave">
					<input type="hidden" name="usuario" value="<?php echo e( (string) $usuario ); ?>">
					<input type="password" name="contrasena" placeholder="Nueva contraseña" required minlength="10">
					<button class="boton claro" type="submit">Cambiar</button>
				</form>
			</td>
			<td>
				<?php if ( $usuario !== usuario_actual() && count( $lista ) > 1 ) : ?>
					<form method="post" onsubmit="return confirm('¿Eliminar a <?php echo e( (string) $usuario ); ?>?')">
						<input type="hidden" name="token" value="<?php echo e( token() ); ?>">
						<input type="hidden" name="accion" value="borrar">
						<input type="hidden" name="usuario" value="<?php echo e( (string) $usuario ); ?>">
						<button class="boton claro" type="submit">Eliminar</button>
					</form>
				<?php endif; ?>
			</td>
		</tr>
	<?php endforeach; ?>
</table>

<h2>Añadir una cuenta</h2>
<form method="post" class="tarjeta">
	<input type="hidden" name="token" value="<?php echo e( token() ); ?>">
	<input type="hidden" name="accion" value="crear">
	<div class="campo">
		<label for="u">Usuario</label>
		<input type="text" id="u" name="usuario" required>
	</div>
	<div class="campo">
		<label for="c">Contraseña (mínimo 10 caracteres)</label>
		<input type="password" id="c" name="contrasena" required minlength="10">
	</div>
	<button class="boton" type="submit">Crear usuario</button>
</form>
</main></body></html>
