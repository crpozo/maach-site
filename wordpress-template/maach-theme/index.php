<?php
/**
 * Investigación: portada editorial + listado de artículos.
 * También hace de plantilla de reserva (búsquedas, archivos).
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$maach_busqueda = is_search();
$maach_total    = (int) $GLOBALS['wp_query']->found_posts;
?>

<!-- PORTADA EDITORIAL -->
<section class="invert" style="position:relative;overflow:hidden;min-height:calc(100vh - 80px);display:flex;align-items:flex-end;background:var(--jet-black);color:var(--off-white);border-bottom:1px solid var(--line)">
	<img src="<?php echo esc_url( maach_img( 'bg-investigacion.webp' ) ); ?>" alt="" aria-hidden="true"
		style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
	<div aria-hidden="true" style="position:absolute;inset:0;z-index:0;background:linear-gradient(95deg,rgba(22,22,22,.78) 0%,rgba(22,22,22,.5) 40%,rgba(22,22,22,.15) 75%,transparent 100%)"></div>
	<div aria-hidden="true" style="position:absolute;top:50%;right:-4vw;transform:translateY(-50%);font-family:var(--display);font-weight:700;font-size:clamp(60px,52vw,90px);line-height:.78;color:var(--lava-orange);opacity:.06;letter-spacing:-.04em;z-index:0;user-select:none;pointer-events:none">10</div>
	<div aria-hidden="true" style="position:absolute;left:0;bottom:0;width:36vw;height:1.5px;background:linear-gradient(90deg,var(--lava-orange) 0%,var(--lava-orange) 40%,transparent 100%);opacity:.55;z-index:1"></div>
	<div aria-hidden="true" style="position:absolute;inset:0;z-index:1;background:radial-gradient(ellipse at 30% 70%,rgba(0,0,0,0) 0%,rgba(0,0,0,.35) 75%)"></div>

	<div style="position:absolute;top:28px;left:48px;right:48px;z-index:3;display:flex;justify-content:space-between;align-items:center">
		<span class="maach-mono" style="color:var(--lava-orange)"><?php esc_html_e( 'MAACH · WORK INSIGHTS 2026', 'maach' ); ?></span>
		<span class="maach-mono" style="color:var(--off-white)"><?php esc_html_e( 'Investigación', 'maach' ); ?></span>
	</div>
	<div aria-hidden="true" style="position:absolute;top:24px;right:24px;width:22px;height:22px;border-top:2px solid var(--lava-orange);border-right:2px solid var(--lava-orange);z-index:3"></div>
	<div aria-hidden="true" style="position:absolute;bottom:24px;left:24px;width:22px;height:22px;border-bottom:2px solid var(--lava-orange);border-left:2px solid var(--lava-orange);z-index:3"></div>

	<div class="maach-container" style="position:relative;z-index:3;width:100%;padding-top:64px;padding-bottom:64px">
		<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:64px;align-items:end">
			<div style="display:grid;gap:32px">
				<h1 class="h-display" style="font-size:clamp(56px,9vw,90px);margin:0;color:var(--off-white);line-height:.92">
					<?php if ( $maach_busqueda ) : ?>
						<?php esc_html_e( 'Resultados', 'maach' ); ?><br>
						<span class="h-italic" style="color:var(--lava-orange)"><?php echo esc_html( get_search_query() ); ?></span>
					<?php else : ?>
						<?php esc_html_e( 'Investigación', 'maach' ); ?><br>
						<span class="h-italic" style="color:var(--lava-orange)"><?php esc_html_e( 'y contexto', 'maach' ); ?></span>
					<?php endif; ?>
				</h1>
				<p style="font-size:20px;color:var(--off-white);line-height:1.5;max-width:560px;margin:0">
					<?php esc_html_e( 'El diseño de nuestro mobiliario no surge de la intuición, sino de la observación sistemática y el análisis de cómo cambian las dinámicas laborales a nivel global.', 'maach' ); ?>
				</p>
			</div>

			<div style="background:rgba(228,226,227,.06);border:1px solid rgba(228,226,227,.25);padding:40px;position:relative;backdrop-filter:blur(6px)">
				<span aria-hidden="true" style="position:absolute;top:16px;right:24px;font-family:var(--display);font-size:80px;color:var(--lava-orange);line-height:1;letter-spacing:-.04em">&quot;</span>
				<div style="font-family:var(--display);font-weight:600;font-size:28px;line-height:1.15;margin-bottom:20px;letter-spacing:-.01em;color:var(--off-white)">
					<?php esc_html_e( '68% de las oficinas hoy requieren configuraciones adaptables a equipos híbridos.', 'maach' ); ?>
				</div>
				<span class="maach-mono" style="color:var(--sand-grey)"><?php esc_html_e( '— Reporte MAACH Work Insights 2025', 'maach' ); ?></span>
			</div>
		</div>
	</div>
</section>

<!-- LISTADO -->
<section style="padding:112px 0;border-bottom:1px solid var(--line)">
	<div class="maach-container">
		<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:56px;flex-wrap:wrap;gap:16px">
			<div>
				<span class="maach-mono" style="color:var(--muted);display:block;margin-bottom:12px"><?php esc_html_e( 'Editorial · MAACH Research', 'maach' ); ?></span>
				<h2 class="h-display" style="font-size:clamp(48px,6vw,88px)">
					<?php esc_html_e( 'Lecturas', 'maach' ); ?>
					<span class="h-italic" style="color:var(--lava-orange)"><?php esc_html_e( 'recomendadas', 'maach' ); ?></span>
				</h2>
			</div>
			<span class="maach-mono" style="color:var(--muted)">
				<?php
				printf(
					/* translators: %s: número de artículos. */
					esc_html__( '%s artículos · MAACH', 'maach' ),
					esc_html( str_pad( (string) $maach_total, 2, '0', STR_PAD_LEFT ) )
				);
				?>
			</span>
		</div>

		<?php if ( have_posts() ) : ?>
			<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:32px">
				<?php
				while ( have_posts() ) :
					the_post();
					$maach_cats    = get_the_category();
					$maach_lectura = get_post_meta( get_the_ID(), 'maach_lectura', true );
					$maach_numero  = get_post_meta( get_the_ID(), 'maach_numero', true );
					?>
					<a href="<?php the_permalink(); ?>" style="display:flex;flex-direction:column;height:100%">
						<div style="position:relative;aspect-ratio:4/3;overflow:hidden;border:1px solid var(--line);background:var(--soft)">
							<?php if ( has_post_thumbnail() ) : ?>
								<?php the_post_thumbnail( 'maach-card', array( 'style' => 'width:100%;height:100%;object-fit:cover;transition:transform .8s ease' ) ); ?>
							<?php endif; ?>
							<?php if ( $maach_numero ) : ?>
								<span class="maach-mono" style="position:absolute;top:16px;left:16px;background:var(--jet-black);color:var(--off-white);padding:5px 10px">
									<?php echo esc_html( $maach_numero ); ?>
								</span>
							<?php endif; ?>
						</div>
						<div style="padding-top:20px;display:flex;flex-direction:column;gap:12px;flex:1">
							<span class="maach-mono" style="color:var(--lava-orange)">
								<?php echo esc_html( $maach_cats ? $maach_cats[0]->name : get_the_date() ); ?>
								<?php echo $maach_lectura ? ' · ' . esc_html( $maach_lectura ) : ''; ?>
							</span>
							<h3 style="font-family:var(--display);font-size:26px;line-height:1.05;text-transform:uppercase;letter-spacing:-.01em">
								<?php the_title(); ?>
							</h3>
							<p style="font-size:15px;color:var(--muted);line-height:1.6;margin:0">
								<?php echo esc_html( wp_trim_words( get_the_excerpt(), 26 ) ); ?>
							</p>
							<span class="maach-mono" style="margin-top:auto;display:inline-flex;align-items:center;gap:8px;padding-top:16px">
								<?php esc_html_e( 'Leer artículo', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
							</span>
						</div>
					</a>
					<?php
				endwhile;
				?>
			</div>
			<div style="margin-top:64px"><?php the_posts_pagination( array( 'mid_size' => 2 ) ); ?></div>
		<?php else : ?>
			<p style="font-size:18px;color:var(--muted)">
				<?php esc_html_e( 'Todavía no hay artículos publicados. Se cargan desde Productos → Importar catálogo, o puedes escribirlos en Entradas.', 'maach' ); ?>
			</p>
		<?php endif; ?>
	</div>
</section>

<!-- MANIFIESTO -->
<section class="invert" style="background:var(--jet-black);color:var(--off-white);padding:112px 0;position:relative;overflow:hidden">
	<div class="tex-load-line" style="position:absolute;inset:0;color:var(--off-white);pointer-events:none"></div>
	<div class="maach-container" style="position:relative;z-index:2;max-width:1100px">
		<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:24px"><?php esc_html_e( 'Manifiesto · MAACH 2026', 'maach' ); ?></span>
		<p class="h-display" style="font-size:clamp(28px,4vw,56px);line-height:1.1;color:var(--off-white);margin:0 0 24px;text-transform:none">
			<?php esc_html_e( '«Investigamos el trabajo real para diseñar mobiliario que responda a sus exigencias verdaderas —', 'maach' ); ?>
			<span style="color:var(--lava-orange)"><?php esc_html_e( 'no a tendencias estéticas.»', 'maach' ); ?></span>
		</p>
		<span class="maach-mono" style="color:var(--sand-grey)"><?php esc_html_e( '— Equipo MAACH Research', 'maach' ); ?></span>
	</div>
</section>

<?php
get_footer();
