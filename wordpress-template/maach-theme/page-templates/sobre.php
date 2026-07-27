<?php
/**
 * Template Name: MAACH · Sobre MAACH
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<section class="invert" style="position:relative;overflow:hidden;min-height:70vh;display:flex;align-items:flex-end;background:var(--jet-black);color:var(--off-white);border-bottom:1px solid var(--line)">
	<img src="<?php echo esc_url( maach_img( 'brand/about-hero-chairs.webp' ) ); ?>" alt="" aria-hidden="true"
		style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
	<div aria-hidden="true" style="position:absolute;inset:0;z-index:0;background:linear-gradient(95deg,rgba(22,22,22,.85) 0%,rgba(22,22,22,.45) 60%,transparent 100%)"></div>
	<div class="maach-container" style="position:relative;z-index:2;padding-bottom:72px">
		<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:16px"><?php esc_html_e( 'Sobre MAACH', 'maach' ); ?></span>
		<h1 class="h-display" style="font-size:clamp(44px,7vw,96px);color:var(--off-white)"><?php the_title(); ?></h1>
	</div>
</section>

<section style="padding:96px 0 112px">
	<div class="maach-container maach-prose" style="max-width:860px">
		<?php
		while ( have_posts() ) :
			the_post();
			the_content();
		endwhile;
		?>
	</div>
</section>

<?php
get_footer();
