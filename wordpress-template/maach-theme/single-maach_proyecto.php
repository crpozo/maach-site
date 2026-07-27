<?php
/**
 * Ficha de proyecto del portafolio: portada a pantalla completa, las tres
 * secciones editoriales (sólo si tienen texto) y la galería en mosaico.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();

	$proyecto  = get_the_ID();
	$desafio   = maach_lineas( get_post_meta( $proyecto, 'maach_desafio', true ) );
	$prop_intro = get_post_meta( $proyecto, 'maach_propuesta_intro', true );
	$propuesta = maach_lineas( get_post_meta( $proyecto, 'maach_propuesta', true ) );
	$resultado = maach_lineas( get_post_meta( $proyecto, 'maach_resultado', true ) );
	$fotos     = maach_galeria( $proyecto, 'maach-hero' );
	$portada   = get_the_post_thumbnail_url( $proyecto, 'maach-hero' );
	?>

	<section style="position:relative;min-height:calc(100vh - 80px);overflow:hidden;border-bottom:1px solid var(--line);background:var(--jet-black)">
		<?php if ( $portada ) : ?>
			<img src="<?php echo esc_url( $portada ); ?>" alt="<?php the_title_attribute(); ?>"
				style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
		<?php endif; ?>
		<div aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(22,22,22,.55) 0%,rgba(22,22,22,.15) 30%,rgba(22,22,22,.55) 70%,rgba(22,22,22,.9) 100%)"></div>
		<div aria-hidden="true" style="position:absolute;top:0;bottom:0;left:0;width:6px;background:var(--lava-orange);z-index:2"></div>

		<div class="maach-container" style="position:absolute;left:0;right:0;bottom:64px;z-index:3;color:var(--off-white)">
			<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:16px">
				<?php echo esc_html( str_pad( (string) get_post_field( 'menu_order', $proyecto ), 2, '0', STR_PAD_LEFT ) ); ?> · <?php esc_html_e( 'Proyecto', 'maach' ); ?>
			</span>
			<h1 class="h-display" style="font-size:clamp(44px,8vw,120px);color:var(--off-white);margin-bottom:24px"><?php the_title(); ?></h1>
			<div style="display:flex;gap:40px;flex-wrap:wrap">
				<?php
				$maach_datos = array(
					__( 'Ubicación', 'maach' ) => get_post_meta( $proyecto, 'maach_ubicacion', true ),
					__( 'Alcance', 'maach' )   => get_post_meta( $proyecto, 'maach_alcance', true ),
					__( 'Área', 'maach' )      => get_post_meta( $proyecto, 'maach_area', true ),
					__( 'Año', 'maach' )       => get_post_meta( $proyecto, 'maach_anio', true ),
				);
				foreach ( $maach_datos as $maach_label => $maach_valor ) :
					if ( ! $maach_valor ) {
						continue;
					}
					?>
					<div>
						<span class="maach-mono" style="color:var(--sand-grey);display:block;margin-bottom:6px"><?php echo esc_html( $maach_label ); ?></span>
						<span style="font-size:16px;color:var(--off-white)"><?php echo esc_html( $maach_valor ); ?></span>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<?php if ( $desafio ) : ?>
		<section style="padding:112px 0;border-bottom:1px solid var(--line)">
			<div class="maach-container" style="display:grid;grid-template-columns:280px 1fr;gap:64px">
				<div>
					<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:12px">01</span>
					<h2 class="h-display" style="font-size:clamp(28px,3vw,44px)"><?php esc_html_e( 'El Desafío', 'maach' ); ?></h2>
				</div>
				<div style="display:flex;flex-direction:column;gap:24px">
					<p style="font-size:20px;line-height:1.55;margin:0"><?php echo esc_html( $desafio[0] ); ?></p>
					<?php if ( isset( $desafio[1] ) ) : ?>
						<p style="font-size:17px;line-height:1.6;color:var(--muted);margin:0"><?php echo esc_html( $desafio[1] ); ?></p>
					<?php endif; ?>
				</div>
			</div>
		</section>
	<?php endif; ?>

	<?php if ( $propuesta || $prop_intro ) : ?>
		<section class="invert" style="padding:112px 0;background:var(--jet-black);color:var(--off-white)">
			<div class="maach-container" style="display:grid;grid-template-columns:280px 1fr;gap:64px">
				<div>
					<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:12px">02</span>
					<h2 class="h-display" style="font-size:clamp(28px,3vw,44px);color:var(--off-white)"><?php esc_html_e( 'Propuesta de Valor', 'maach' ); ?></h2>
				</div>
				<div>
					<?php if ( $prop_intro ) : ?>
						<p style="font-family:var(--display);font-weight:500;font-size:clamp(20px,2vw,28px);line-height:1.3;color:var(--off-white);margin:0 0 48px;letter-spacing:-.005em">
							<?php echo esc_html( $prop_intro ); ?>
						</p>
					<?php endif; ?>
					<ul style="list-style:none;margin:0;padding:0">
						<?php foreach ( $propuesta as $maach_i => $maach_punto ) : ?>
							<li style="display:grid;grid-template-columns:64px 1fr;gap:24px;padding:24px 0;border-top:1px solid rgba(228,226,227,.18);align-items:flex-start">
								<span class="h-display" style="font-size:28px;color:var(--lava-orange);font-weight:700;letter-spacing:-.02em;line-height:1;padding-top:4px">
									<?php echo esc_html( str_pad( (string) ( $maach_i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?>
								</span>
								<p style="font-size:17px;line-height:1.6;color:var(--sand-grey);margin:0"><?php echo esc_html( $maach_punto ); ?></p>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			</div>
		</section>
	<?php endif; ?>

	<?php if ( $resultado ) : ?>
		<section style="padding:112px 0;border-bottom:1px solid var(--line)">
			<div class="maach-container" style="display:grid;grid-template-columns:280px 1fr;gap:64px">
				<div>
					<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:12px">03</span>
					<h2 class="h-display" style="font-size:clamp(28px,3vw,44px)"><?php esc_html_e( 'El Resultado', 'maach' ); ?></h2>
				</div>
				<div style="display:flex;flex-direction:column;gap:24px">
					<p style="font-size:20px;line-height:1.55;margin:0"><?php echo esc_html( $resultado[0] ); ?></p>
					<?php if ( isset( $resultado[1] ) ) : ?>
						<p style="font-size:17px;line-height:1.6;color:var(--muted);margin:0"><?php echo esc_html( $resultado[1] ); ?></p>
					<?php endif; ?>
				</div>
			</div>
		</section>
	<?php endif; ?>

	<?php if ( $fotos ) : ?>
		<section style="padding:120px 0;border-bottom:1px solid var(--line)">
			<div class="maach-container">
				<span class="maach-mono" style="color:var(--muted);display:block;margin-bottom:24px;letter-spacing:.1em"><?php esc_html_e( 'GALERÍA', 'maach' ); ?></span>
				<div class="maach-mosaic" data-lightbox data-fotos="<?php echo esc_attr( wp_json_encode( $fotos ) ); ?>">
					<?php foreach ( $fotos as $maach_i => $maach_foto ) : ?>
						<?php
						$maach_variante = '';
						if ( 0 === $maach_i % 7 ) {
							$maach_variante = ' feat';
						} elseif ( 4 === $maach_i % 7 ) {
							$maach_variante = ' tall';
						}
						?>
						<button type="button" class="maach-tile<?php echo esc_attr( $maach_variante ); ?>" data-indice="<?php echo (int) $maach_i; ?>"
							aria-label="<?php echo esc_attr( sprintf( __( 'Ampliar foto %d', 'maach' ), $maach_i + 1 ) ); ?>">
							<img src="<?php echo esc_url( $maach_foto ); ?>" alt="" loading="lazy">
							<span class="maach-tile-idx maach-mono"><?php echo esc_html( str_pad( (string) ( $maach_i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
							<span class="maach-tile-zoom" aria-hidden="true"><?php maach_icono( 'plus', 16 ); ?></span>
						</button>
					<?php endforeach; ?>
				</div>
			</div>
		</section>
	<?php endif; ?>

	<?php if ( get_the_content() ) : ?>
		<section style="padding:96px 0">
			<div class="maach-container maach-prose" style="max-width:760px"><?php the_content(); ?></div>
		</section>
	<?php endif; ?>

	<?php
endwhile;

get_footer();
