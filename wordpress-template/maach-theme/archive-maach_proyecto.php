<?php
/**
 * Portafolio: listado de proyectos.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="invert" style="position:relative;overflow:hidden;min-height:calc(100vh - 80px);display:flex;align-items:flex-end;background:var(--jet-black);color:var(--off-white);border-bottom:1px solid var(--line)">
	<img src="<?php echo esc_url( maach_img( 'bg-portafolio.webp' ) ); ?>" alt="" aria-hidden="true"
		style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
	<div aria-hidden="true" style="position:absolute;inset:0;z-index:0;background:linear-gradient(95deg,rgba(22,22,22,.7) 0%,rgba(22,22,22,.4) 45%,rgba(22,22,22,.1) 80%,transparent 100%)"></div>
	<div class="maach-container" style="position:relative;z-index:2;padding-bottom:80px">
		<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:16px"><?php esc_html_e( 'Portafolio', 'maach' ); ?></span>
		<h1 class="h-display" style="font-size:clamp(48px,8vw,120px);color:var(--off-white);margin-bottom:24px"><?php esc_html_e( 'Proyectos', 'maach' ); ?></h1>
		<p style="font-size:18px;color:var(--sand-grey);max-width:620px;line-height:1.6">
			<?php esc_html_e( 'Selección de proyectos donde el diseño arquitectónico se encuentra con la fabricación industrial.', 'maach' ); ?>
		</p>
	</div>
</section>

<section style="padding:96px 0 128px">
	<div class="maach-container" style="display:flex;flex-direction:column;gap:64px">
		<?php
		while ( have_posts() ) :
			the_post();
			$maach_id = get_the_ID();
			?>
			<a href="<?php the_permalink(); ?>" style="display:grid;grid-template-columns:1.4fr 1fr;gap:48px;align-items:center;padding-bottom:64px;border-bottom:1px solid var(--line)">
				<div style="position:relative;aspect-ratio:16/10;overflow:hidden;background:var(--jet-black)">
					<?php if ( has_post_thumbnail() ) : ?>
						<?php the_post_thumbnail( 'maach-hero', array( 'style' => 'width:100%;height:100%;object-fit:cover' ) ); ?>
					<?php endif; ?>
				</div>
				<div>
					<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:12px">
						<?php echo esc_html( str_pad( (string) get_post_field( 'menu_order', $maach_id ), 2, '0', STR_PAD_LEFT ) ); ?>
					</span>
					<h2 class="h-display" style="font-size:clamp(32px,4vw,64px);margin-bottom:20px"><?php the_title(); ?></h2>
					<?php $maach_alcance = get_post_meta( $maach_id, 'maach_alcance', true ); ?>
					<?php if ( $maach_alcance ) : ?>
						<p style="font-size:16px;color:var(--muted);line-height:1.6;margin-bottom:20px"><?php echo esc_html( $maach_alcance ); ?></p>
					<?php endif; ?>
					<div style="display:flex;gap:32px;flex-wrap:wrap">
						<?php
						foreach ( array( 'maach_ubicacion', 'maach_area', 'maach_anio' ) as $maach_campo ) :
							$maach_valor = get_post_meta( $maach_id, $maach_campo, true );
							if ( ! $maach_valor ) {
								continue;
							}
							?>
							<span class="maach-mono" style="color:var(--muted);display:inline-flex;align-items:center;gap:8px">
								<?php maach_icono( 'pin', 12 ); ?><?php echo esc_html( $maach_valor ); ?>
							</span>
						<?php endforeach; ?>
					</div>
				</div>
			</a>
			<?php
		endwhile;
		?>
	</div>
</section>

<?php
get_footer();
