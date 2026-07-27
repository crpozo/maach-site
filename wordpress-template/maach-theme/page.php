<?php
/**
 * Página estándar: el editor de bloques manda.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<section style="padding:96px 0 48px;border-bottom:1px solid var(--line)">
		<div class="maach-container">
			<h1 class="h-display" style="font-size:clamp(40px,6vw,88px)"><?php the_title(); ?></h1>
		</div>
	</section>
	<section style="padding:64px 0 112px">
		<div class="maach-container maach-prose" style="max-width:860px">
			<?php the_content(); ?>
		</div>
	</section>
	<?php
endwhile;

get_footer();
