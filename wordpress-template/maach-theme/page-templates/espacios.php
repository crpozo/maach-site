<?php
/**
 * Template Name: MAACH · Espacios
 *
 * Tipologías de espacio. El contenido editorial se escribe con bloques en el
 * editor; esta plantilla aporta la portada y la cuadrícula de tipologías.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$maach_tipologias = apply_filters( 'maach_tipologias', array(
	array( 'nombre' => __( 'Áreas operativas', 'maach' ), 'img' => 'espacios/operativas.webp' ),
	array( 'nombre' => __( 'Salas de reunión', 'maach' ), 'img' => 'espacios/reuniones.webp' ),
	array( 'nombre' => __( 'Recepción', 'maach' ), 'img' => 'espacios/recepcion.webp' ),
	array( 'nombre' => __( 'Colaborativo', 'maach' ), 'img' => 'espacios/colaborativo.webp' ),
) );
?>

<section class="invert" style="position:relative;overflow:hidden;min-height:70vh;display:flex;align-items:flex-end;background:var(--jet-black);color:var(--off-white);border-bottom:1px solid var(--line)">
	<img src="<?php echo esc_url( maach_img( 'bg-espacios.webp' ) ); ?>" alt="" aria-hidden="true"
		style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
	<div aria-hidden="true" style="position:absolute;inset:0;z-index:0;background:linear-gradient(95deg,rgba(22,22,22,.8) 0%,rgba(22,22,22,.4) 60%,transparent 100%)"></div>
	<div class="maach-container" style="position:relative;z-index:2;padding-bottom:72px">
		<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:16px"><?php esc_html_e( 'Espacios', 'maach' ); ?></span>
		<h1 class="h-display" style="font-size:clamp(44px,7vw,96px);color:var(--off-white)"><?php the_title(); ?></h1>
	</div>
</section>

<section style="padding:96px 0;border-bottom:1px solid var(--line)">
	<div class="maach-container">
		<div class="keep-grid" style="--keep-cols:repeat(2,1fr);display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
			<?php foreach ( $maach_tipologias as $maach_tip ) : ?>
				<div class="typology-card" style="position:relative;aspect-ratio:3/4;overflow:hidden;border:1px solid var(--line);background:var(--jet-black)">
					<img src="<?php echo esc_url( maach_img( $maach_tip['img'] ) ); ?>" alt="<?php echo esc_attr( $maach_tip['nombre'] ); ?>" loading="lazy"
						style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
					<div class="typology-overlay" style="position:absolute;inset:0"></div>
					<div style="position:absolute;left:0;right:0;bottom:0;padding:24px;color:var(--off-white);z-index:2">
						<h3 class="h-display" style="font-size:22px;color:var(--off-white)"><?php echo esc_html( $maach_tip['nombre'] ); ?></h3>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
while ( have_posts() ) :
	the_post();
	if ( trim( get_the_content() ) ) :
		?>
		<section style="padding:96px 0">
			<div class="maach-container maach-prose" style="max-width:860px"><?php the_content(); ?></div>
		</section>
		<?php
	endif;
endwhile;

get_footer();
