<?php
/**
 * Pie de página: manifiesto, columnas de enlaces y datos de contacto.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$maach_redes = array(
	'IG' => maach_opcion( 'maach_instagram', '#' ),
	'Li' => maach_opcion( 'maach_linkedin', '#' ),
	'Be' => maach_opcion( 'maach_behance', '#' ),
	'Pi' => maach_opcion( 'maach_pinterest', '#' ),
);
?>
</main>

<footer class="invert" style="background:var(--jet-black);color:var(--off-white);padding-top:96px">
	<div class="maach-container">

		<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:64px;align-items:end;padding-bottom:64px;border-bottom:1px solid var(--line)">
			<div style="position:relative">
				<div aria-hidden="true" style="position:absolute;top:-8px;right:-8px;width:22px;height:22px;border-top:2px solid var(--lava-orange);border-right:2px solid var(--lava-orange)"></div>
				<div class="maach-mono" style="color:var(--lava-orange);margin-bottom:16px">MAACH / <?php echo esc_html( gmdate( 'Y' ) ); ?></div>
				<h2 class="h-display" style="font-size:clamp(30px,4vw,60px);color:var(--off-white);line-height:1.08;letter-spacing:-.01em">
					<?php echo esc_html( maach_opcion( 'maach_footer_manifiesto_1', 'No vendemos muebles.' ) ); ?>
					<span style="color:var(--lava-orange)"><?php echo esc_html( maach_opcion( 'maach_footer_manifiesto_2', 'Construimos' ) ); ?></span>
					<br>
					<?php echo esc_html( maach_opcion( 'maach_footer_manifiesto_3', 'entornos de trabajo.' ) ); ?>
				</h2>
			</div>
			<div style="display:flex;flex-direction:column;gap:24px">
				<p style="color:var(--sand-grey);font-size:18px;line-height:1.5;max-width:420px">
					<?php echo esc_html( maach_opcion( 'maach_footer_intro', 'Diseñamos, fabricamos e instalamos mobiliario corporativo con control total del proceso.' ) ); ?>
				</p>
				<?php
				$maach_contacto = get_page_by_path( 'contacto' );
				if ( $maach_contacto ) :
					?>
					<a href="<?php echo esc_url( get_permalink( $maach_contacto ) ); ?>" class="btn-primary" style="align-self:flex-start">
						<?php esc_html_e( 'Iniciar proyecto', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
					</a>
				<?php endif; ?>
			</div>
		</div>

		<div style="display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:48px;padding:64px 0">
			<div>
				<img src="<?php echo esc_url( maach_img( 'maach-logo-transparent.png' ) ); ?>" alt="MAACH" style="width:140px;height:auto;display:block">
				<p style="color:var(--sand-grey);margin-top:32px;max-width:280px">
					<?php echo esc_html( maach_opcion( 'maach_direccion_1', 'Quito · Ecuador' ) ); ?>
					<?php if ( maach_opcion( 'maach_direccion_2' ) ) : ?>
						<br><?php echo esc_html( maach_opcion( 'maach_direccion_2' ) ); ?>
					<?php endif; ?>
				</p>
				<p style="color:var(--sand-grey);margin-top:16px">
					<a href="mailto:<?php echo esc_attr( maach_opcion( 'maach_email', 'ventas@maach.ec' ) ); ?>" style="color:var(--sand-grey)">
						<?php echo esc_html( maach_opcion( 'maach_email', 'ventas@maach.ec' ) ); ?>
					</a><br>
					<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', maach_opcion( 'maach_telefono', '+593997200455' ) ) ); ?>" style="color:var(--sand-grey)">
						<?php echo esc_html( maach_opcion( 'maach_telefono', '+593 99 720 0455' ) ); ?>
					</a>
				</p>
				<div style="display:flex;gap:8px;margin-top:32px">
					<?php foreach ( $maach_redes as $maach_sigla => $maach_url ) : ?>
						<a href="<?php echo esc_url( $maach_url ); ?>" class="maach-mono"
							style="width:40px;height:40px;border:1px solid var(--line);display:inline-flex;align-items:center;justify-content:center;font-size:11px">
							<?php echo esc_html( $maach_sigla ); ?>
						</a>
					<?php endforeach; ?>
				</div>
			</div>

			<div>
				<h4 class="maach-mono" style="color:var(--sand-grey);margin-bottom:24px;font-size:11px"><?php esc_html_e( 'Productos', 'maach' ); ?></h4>
				<?php maach_lista_menu( 'footer_1' ); ?>
			</div>
			<div>
				<h4 class="maach-mono" style="color:var(--sand-grey);margin-bottom:24px;font-size:11px"><?php esc_html_e( 'Compañía', 'maach' ); ?></h4>
				<?php maach_lista_menu( 'footer_2' ); ?>
			</div>
			<div>
				<h4 class="maach-mono" style="color:var(--sand-grey);margin-bottom:24px;font-size:11px"><?php esc_html_e( 'Recursos', 'maach' ); ?></h4>
				<?php maach_lista_menu( 'footer_3' ); ?>
			</div>
		</div>

		<?php if ( is_active_sidebar( 'maach-footer-extra' ) ) : ?>
			<div style="padding-bottom:32px"><?php dynamic_sidebar( 'maach-footer-extra' ); ?></div>
		<?php endif; ?>

		<div style="border-top:1px solid var(--line);padding:32px 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
			<span class="maach-mono" style="color:var(--sand-grey)">
				© <?php echo esc_html( gmdate( 'Y' ) ); ?> MAACH · <?php echo esc_html( maach_opcion( 'maach_tagline', 'Diseño industrial · Ecuador' ) ); ?>
			</span>
			<div style="display:flex;gap:32px">
				<?php
				$maach_legal = wp_get_nav_menu_items( maach_menu_id( 'legal' ) );
				if ( $maach_legal ) :
					foreach ( $maach_legal as $maach_item ) :
						printf(
							'<a href="%s" class="maach-mono" style="color:var(--sand-grey)">%s</a>',
							esc_url( $maach_item->url ),
							esc_html( $maach_item->title )
						);
					endforeach;
				endif;
				?>
			</div>
		</div>

		<div style="position:relative;height:64px;overflow:hidden;border-top:1px solid var(--line)">
			<div class="tex-load-line" style="position:absolute;inset:0;color:var(--off-white)"></div>
		</div>
	</div>
</footer>

</div><!-- /wrapper -->

<div class="maach-lightbox" id="maach-lightbox" role="dialog" aria-modal="true">
	<button type="button" class="lb-close" aria-label="<?php esc_attr_e( 'Cerrar', 'maach' ); ?>">&times;</button>
	<button type="button" class="lb-prev" aria-label="<?php esc_attr_e( 'Anterior', 'maach' ); ?>">&#8249;</button>
	<img alt="" style="display:none">
	<button type="button" class="lb-next" aria-label="<?php esc_attr_e( 'Siguiente', 'maach' ); ?>">&#8250;</button>
	<span class="lb-count maach-mono"></span>
</div>

<?php get_template_part( 'template-parts/gate' ); ?>

<?php wp_footer(); ?>
</body>
</html>
