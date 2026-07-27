<?php
/**
 * Artículo de Investigación.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();
	$maach_lectura = get_post_meta( get_the_ID(), 'maach_lectura', true );
	$maach_cats    = get_the_category();
	?>
	<article>
		<section style="padding:96px 0 48px;border-bottom:1px solid var(--line)">
			<div class="maach-container" style="max-width:860px">
				<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:20px">
					<?php echo esc_html( $maach_cats ? $maach_cats[0]->name : '' ); ?>
					<?php echo $maach_lectura ? ' · ' . esc_html( $maach_lectura ) : ''; ?>
				</span>
				<h1 class="h-display" style="font-size:clamp(32px,5vw,64px);margin-bottom:24px"><?php the_title(); ?></h1>
				<p style="font-size:19px;color:var(--muted);line-height:1.6"><?php echo esc_html( get_the_excerpt() ); ?></p>
			</div>
		</section>

		<?php if ( has_post_thumbnail() ) : ?>
			<div style="border-bottom:1px solid var(--line)">
				<?php the_post_thumbnail( 'maach-hero', array( 'style' => 'width:100%;max-height:70vh;object-fit:cover' ) ); ?>
			</div>
		<?php endif; ?>

		<section style="padding:80px 0 112px">
			<div class="maach-container maach-prose" style="max-width:760px">
				<?php the_content(); ?>
			</div>
		</section>
	</article>
	<?php
endwhile;

get_footer();
