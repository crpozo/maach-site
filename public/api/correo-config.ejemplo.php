<?php
/**
 * Configuración del correo del formulario de contacto.
 *
 * CÓMO ACTIVARLO
 * 1. En cPanel → Cuentas de correo, crea (o usa) una cuenta del dominio, por
 *    ejemplo web@maach.ec, y anota su contraseña.
 * 2. Copia este archivo como  correo-config.php  en la misma carpeta.
 * 3. Rellena usuario y clave con los de esa cuenta.
 *
 * El archivo correo-config.php NO está en el repositorio y los despliegues no
 * lo tocan: tu contraseña se queda sólo en el servidor.
 */

return array(
	// A dónde llegan los mensajes.
	'destinatarios' => array( 'ventas@maach.ec' ),

	// Copia adicional. Útil para pruebas; deja el array vacío para quitarla.
	'copia'         => array( 'carlos@mindfultech.ec' ),

	// Cuenta desde la que sale el correo. Debe ser del propio dominio.
	'remitente'     => 'web@maach.ec',
	'nombre'        => 'MAACH · Web',

	// Servidor de salida. En cPanel suele ser mail.tudominio.com.
	'host'          => 'mail.maach.ec',
	'puerto'        => 587,          // 587 con 'tls', o 465 con 'ssl'
	'seguridad'     => 'tls',
	'usuario'       => 'web@maach.ec',
	'clave'         => 'PON-AQUI-LA-CONTRASENA',
	'dominio'       => 'maach.ec',
);
