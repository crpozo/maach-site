<?php
/**
 * Submenú de Portafolio: lista los proyectos publicados.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$maach_proyectos = get_posts( array(
	'post_type'      => 'maach_proyecto',
	'posts_per_page' => -1,
	'orderby'        => 'menu_order',
	'order'          => 'ASC',
) );
if ( ! $maach_proyectos ) {
	return;
}
?>
<div class="maach-dropdown" data-panel="portafolio">
	<div class="maach-container" style="padding:40px 48px;display:grid;grid-template-columns:260px 1fr;gap:64px">
		<div>
			<span class="maach-mono" style="color:var(--muted);display:block;margin-bottom:16px">
				<?php esc_html_e( 'PROYECTOS · 2024–2026', 'maach' ); ?>
			</span>
			<p style="font-size:14px;color:var(--muted);line-height:1.55;margin-bottom:24px">
				<?php esc_html_e( 'Selección de proyectos donde el diseño arquitectónico se encuentra con la fabricación industrial.', 'maach' ); ?>
			</p>
			<a href="<?php echo esc_url( get_post_type_archive_link( 'maach_proyecto' ) ); ?>"
				style="display:inline-flex;align-items:center;gap:8px;border-bottom:1px solid var(--fg);padding-bottom:4px;font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:600">
				<?php esc_html_e( 'Ver portafolio completo', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
			</a>
		</div>

		<ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:20px 48px">
			<?php foreach ( $maach_proyectos as $maach_p ) : ?>
				<li>
					<a href="<?php echo esc_url( get_permalink( $maach_p ) ); ?>"
						style="display:flex;flex-direction:column;gap:6px;padding-bottom:12px;border-bottom:1px solid var(--line)">
						<span style="font-family:var(--display);font-weight:700;font-size:22px;text-transform:uppercase;letter-spacing:-.01em">
							<?php echo esc_html( $maach_p->post_title ); ?>
						</span>
					</a>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</div>
