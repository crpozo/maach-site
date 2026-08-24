<?php
/** Cierra la sesión del panel. */
require __DIR__ . '/config.php';
$_SESSION = array();
session_destroy();
header( 'Location: index.php' );
