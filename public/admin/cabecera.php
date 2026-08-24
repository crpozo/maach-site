<?php
/** Cabecera común de las pantallas del panel. */
if ( ! defined( 'RAIZ' ) ) {
	exit;
}
$actual = basename( $_SERVER['PHP_SELF'] );
$menu = array(
	'textos.php'    => 'Textos',
	'productos.php' => 'Productos',
	'medios.php'    => 'Fotos',
	'usuarios_admin.php' => 'Usuarios',
	'historial.php' => 'Historial',
);
?>
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title><?php echo e( $titulo ?? 'Panel' ); ?> · MAACH</title>
<link rel="stylesheet" href="estilo.css">
</head>
<body>
<header class="barra">
	<span class="marca">M<b>AA</b>CH · Panel</span>
	<nav>
		<?php foreach ( $menu as $archivo => $nombre ) : ?>
			<a href="<?php echo e( $archivo ); ?>" class="<?php echo $actual === $archivo ? 'activo' : ''; ?>">
				<?php echo e( $nombre ); ?>
			</a>
		<?php endforeach; ?>
	</nav>
	<span class="sesion">
		<?php echo e( usuario_actual() ); ?>
		<a href="/" target="_blank" rel="noopener" style="color:#bdbdbd">Ver sitio ↗</a>
		<a href="salir.php" style="color:#bdbdbd">Salir</a>
	</span>
</header>
<main>
