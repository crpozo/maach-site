<?php
/**
 * Investigación: listado de artículos. También hace de plantilla de reserva.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="invert" style="position:relative;overflow:hidden;min-height:60vh;display:flex;align-items:flex-end;background:var(--jet-black);color:var(--off-white);border-bottom:1px solid var(--line)">
	<img src="<?php echo esc_url( maach_img( 'bg-investigacion.webp' ) ); ?>" alt="" aria-hidden="true"
		style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
	<div aria-hidden="true" style="position:absolute;inset:0;z-index:0;background:linear-gradient(95deg,rgba(22,22,22,.8) 0%,rgba(22,22,22,.45) 50%,rgba(22,22,22,.1) 100%)"></div>
	<div class="maach-container" style="position:relative;z-index:2;padding:96px 0 64px">
		<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:16px"><?php esc_html_e( 'Investigación', 'maach' ); ?></span>
		<h1 class="h-display" style="font-size:clamp(44px,7vw,96px);color:var(--off-white)">
			<?php echo esc_html( is_search() ? __( 'Resultados', 'maach' ) : __( 'Ideas de trabajo', 'maach' ) ); ?>
		</h1>
	</div>
</section>

<section style="padding:96px 0 128px">
	<div class="maach-container">
		<?php if ( have_posts() ) : ?>
			<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:40px">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article>
						<a href="<?php the_permalink(); ?>">
							<div style="position:relative;aspect-ratio:4/3;overflow:hidden;border:1px solid var(--line);margin-bottom:20px;background:var(--soft)">
								<?php if ( has_post_thumbnail() ) : ?>
									<?php the_post_thumbnail( 'maach-card', array( 'style' => 'width:100%;height:100%;object-fit:cover' ) ); ?>
								<?php endif; ?>
							</div>
							<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:10px">
								<?php
								$maach_cats = get_the_category();
								echo esc_html( $maach_cats ? $maach_cats[0]->name : get_the_date() );
								?>
							</span>
							<h2 style="font-family:var(--display);font-size:24px;line-height:1.15;text-transform:uppercase;margin-bottom:12px"><?php the_title(); ?></h2>
							<p style="font-size:15px;color:var(--muted);line-height:1.6"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 24 ) ); ?></p>
						</a>
					</article>
					<?php
				endwhile;
				?>
			</div>
			<div style="margin-top:64px"><?php the_posts_pagination( array( 'mid_size' => 2 ) ); ?></div>
		<?php else : ?>
			<p style="font-size:18px;color:var(--muted)"><?php esc_html_e( 'No hay contenido todavía.', 'maach' ); ?></p>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
