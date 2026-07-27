<?php
/**
 * Formulario que se pide antes de descargar un documento.
 * Se puede desactivar en Personalizar → MAACH → Ficha de producto.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( 'no' === maach_opcion( 'maach_gate', 'si' ) ) {
	return;
}

$maach_campos = array(
	'nombre'    => __( 'Nombre', 'maach' ),
	'correo'    => __( 'Correo', 'maach' ),
	'empresa'   => __( 'Empresa', 'maach' ),
	'ocupacion' => __( 'Ocupación', 'maach' ),
);
?>
<div class="maach-gate" id="maach-gate" role="dialog" aria-modal="true">
	<form>
		<button type="button" class="gate-cerrar" aria-label="<?php esc_attr_e( 'Cancelar', 'maach' ); ?>"
			style="position:absolute;top:16px;right:16px;display:flex"><?php maach_icono( 'close', 18 ); ?></button>

		<div>
			<h3 class="h-display" style="font-size:26px;margin:0 0 8px;text-transform:uppercase">
				<?php esc_html_e( 'Descarga de documento', 'maach' ); ?>
			</h3>
			<p style="font-size:14px;color:var(--muted);margin:0;line-height:1.5">
				<?php esc_html_e( 'Completa tus datos y la descarga inicia automáticamente.', 'maach' ); ?>
			</p>
		</div>

		<?php foreach ( $maach_campos as $maach_key => $maach_label ) : ?>
			<label style="display:flex;flex-direction:column;gap:6px">
				<span class="maach-mono" style="color:var(--muted);font-size:11px;letter-spacing:.08em">
					<?php echo esc_html( $maach_label ); ?> *
				</span>
				<input type="<?php echo 'correo' === $maach_key ? 'email' : 'text'; ?>" name="<?php echo esc_attr( $maach_key ); ?>" required
					class="maach-gate-campo"
					style="border:1px solid var(--line);background:var(--surface);padding:12px 14px;font-family:var(--body);font-size:15px;color:var(--fg);outline:none">
			</label>
		<?php endforeach; ?>

		<span class="maach-mono" style="color:var(--muted);font-size:11px"><?php esc_html_e( '* Campos obligatorios', 'maach' ); ?></span>

		<button type="submit" class="btn-primary" style="justify-content:center">
			<?php maach_icono( 'download', 14 ); ?> <?php esc_html_e( 'Descargar', 'maach' ); ?>
		</button>
	</form>
</div>
