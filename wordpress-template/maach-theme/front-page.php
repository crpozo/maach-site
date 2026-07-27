<?php
/**
 * Portada.
 *
 * Réplica del inicio del sitio: portada a pantalla completa, marquesina,
 * categorías, ADN, planta, proyectos destacados, clientes y CTA.
 * Los textos se editan en Personalizar → MAACH → Portada.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$maach_hero = maach_opcion( 'maach_hero_img' ) ? maach_opcion( 'maach_hero_img' ) : maach_img( 'brand/hero-red-room.webp' );
?>

<!-- PORTADA -->
<section class="invert" style="position:relative;overflow:hidden;min-height:calc(100vh - 80px);display:flex;align-items:center;background:var(--jet-black);color:var(--off-white)">
	<img src="<?php echo esc_url( $maach_hero ); ?>" alt="" aria-hidden="true"
		style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
	<div aria-hidden="true" style="position:absolute;inset:0;z-index:1;background:linear-gradient(95deg,rgba(22,22,22,.85) 0%,rgba(22,22,22,.65) 35%,rgba(22,22,22,.3) 65%,rgba(22,22,22,.05) 100%)"></div>
	<div aria-hidden="true" style="position:absolute;top:0;bottom:0;left:0;width:6px;background:var(--lava-orange);z-index:2"></div>
	<span aria-hidden="true" class="maach-mono" style="position:absolute;left:16px;top:50%;transform:rotate(-90deg) translateX(50%);transform-origin:left center;color:var(--lava-orange);letter-spacing:.32em;font-weight:700;z-index:2">
		MAACH · SISTEMA <?php echo esc_html( gmdate( 'Y' ) ); ?>
	</span>
	<div aria-hidden="true" style="position:absolute;top:24px;right:24px;width:22px;height:22px;border-top:2px solid var(--lava-orange);border-right:2px solid var(--lava-orange);z-index:2"></div>
	<div aria-hidden="true" style="position:absolute;bottom:24px;right:24px;width:22px;height:22px;border-bottom:2px solid var(--lava-orange);border-right:2px solid var(--lava-orange);z-index:2"></div>

	<div class="maach-container" style="width:100%;position:relative;z-index:3">
		<div style="max-width:1100px">
			<div style="display:flex;align-items:center;gap:16px;margin-bottom:24px">
				<span class="maach-tag" style="border-color:var(--lava-orange);color:var(--lava-orange)">
					<?php echo esc_html( maach_opcion( 'maach_hero_tag', 'Catálogo 2026' ) ); ?>
				</span>
			</div>
			<h1 class="h-display" style="font-size:clamp(48px,7vw,90px);margin-bottom:32px;color:var(--off-white)">
				<?php echo esc_html( maach_opcion( 'maach_hero_titulo_1', 'Ingeniería para el trabajo' ) ); ?>
				<span class="h-italic" style="color:var(--lava-orange)"><?php echo esc_html( maach_opcion( 'maach_hero_titulo_2', 'real' ) ); ?></span>
				<br>
				<?php echo esc_html( maach_opcion( 'maach_hero_titulo_3', 'Diseñado para durar' ) ); ?>
			</h1>
			<div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap">
				<a href="<?php echo esc_url( get_post_type_archive_link( 'maach_producto' ) ); ?>" class="btn-primary">
					<?php esc_html_e( 'Explorar catálogo', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
				</a>
				<?php $maach_contacto = get_page_by_path( 'contacto' ); ?>
				<?php if ( $maach_contacto ) : ?>
					<a href="<?php echo esc_url( get_permalink( $maach_contacto ) ); ?>" class="btn-ghost"><?php esc_html_e( 'Especificar proyecto', 'maach' ); ?></a>
				<?php endif; ?>
				<div style="display:flex;align-items:center;gap:12px">
					<div style="width:32px;height:1px;background:var(--off-white)"></div>
					<span class="maach-mono" style="color:var(--sand-grey)"><?php esc_html_e( 'Scroll', 'maach' ); ?></span>
				</div>
			</div>
		</div>
	</div>
</section>

<?php maach_marquee(); ?>

<!-- CATEGORÍAS -->
<section style="padding:128px 0;border-bottom:1px solid var(--line)">
	<div class="maach-container">
		<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:32px;margin-bottom:56px;flex-wrap:wrap">
			<div>
				<span class="maach-mono" style="color:var(--muted);display:block;margin-bottom:16px"><?php esc_html_e( 'Catálogo', 'maach' ); ?></span>
				<h2 class="h-display" style="font-size:clamp(32px,5vw,72px)"><?php esc_html_e( 'Líneas de producto', 'maach' ); ?></h2>
			</div>
			<a href="<?php echo esc_url( get_post_type_archive_link( 'maach_producto' ) ); ?>" class="maach-mono" style="display:inline-flex;align-items:center;gap:8px;border-bottom:1px solid var(--fg);padding-bottom:4px">
				<?php esc_html_e( 'Ver todos los productos', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
			</a>
		</div>

		<div class="keep-grid" style="--keep-cols:repeat(2,1fr);display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
			<?php foreach ( maach_categorias() as $maach_cat ) : ?>
				<a class="cat-card" href="<?php echo esc_url( get_term_link( $maach_cat ) ); ?>"
					style="position:relative;display:block;aspect-ratio:4/5;overflow:hidden;border:1px solid var(--line);background:var(--jet-black)">
					<img src="<?php echo esc_url( maach_imagen_categoria( $maach_cat ) ); ?>" alt="<?php echo esc_attr( $maach_cat->name ); ?>" loading="lazy"
						style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.75;transition:transform .8s ease">
					<div aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(22,22,22,.1) 0%,rgba(22,22,22,.75) 100%)"></div>
					<div style="position:absolute;left:0;right:0;bottom:0;padding:28px;color:var(--off-white);z-index:2">
						<h3 class="h-display" style="font-size:28px;color:var(--off-white);margin-bottom:8px"><?php echo esc_html( $maach_cat->name ); ?></h3>
						<span class="maach-mono" style="color:var(--sand-grey)">
							<?php
							printf(
								/* translators: %d: número de productos. */
								esc_html__( '%d productos', 'maach' ),
								(int) $maach_cat->count
							);
							?>
						</span>
					</div>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- ADN -->
<?php
$maach_adn = apply_filters( 'maach_adn', array(
	array(
		'n'     => '01',
		'titulo' => __( 'Integridad Estructural', 'maach' ),
		'texto'  => __( 'Ingeniería sólida pensada para el uso intensivo. Mobiliario que no se deforma y mantiene sus propiedades a lo largo de los años.', 'maach' ),
	),
	array(
		'n'     => '02',
		'titulo' => __( 'Funcionalidad Consciente', 'maach' ),
		'texto'  => __( 'Diseño centrado en resolver exigencias operativas reales. Si una pieza no cumple un propósito técnico, se elimina del esquema.', 'maach' ),
	),
	array(
		'n'     => '03',
		'titulo' => __( 'Escalabilidad Modular', 'maach' ),
		'texto'  => __( 'Sistemas creados para crecer y reconfigurarse. Componentes que se integran mediante ingeniería de nodos.', 'maach' ),
	),
	array(
		'n'     => '04',
		'titulo' => __( 'Co-diseño con arquitectos', 'maach' ),
		'texto'  => __( 'Trabajamos junto a estudios y clientes para resolver requerimientos técnicos específicos. El diseño se construye en conjunto.', 'maach' ),
	),
) );
?>
<section class="invert" style="background:var(--jet-black);color:var(--off-white);padding:72px 0;position:relative;overflow:hidden;min-height:calc(100vh - 80px);display:flex;align-items:center">
	<div class="tex-load-line" style="position:absolute;inset:0;color:var(--off-white);pointer-events:none"></div>
	<div class="maach-container" style="position:relative;z-index:2;width:100%">
		<div style="display:grid;grid-template-columns:.85fr 1.15fr;gap:64px;align-items:center">
			<div>
				<span class="maach-mono" style="color:var(--sand-grey);margin-bottom:16px;display:block"><?php esc_html_e( 'Filosofía', 'maach' ); ?></span>
				<h2 class="h-display" style="font-size:clamp(56px,8vw,90px);margin-bottom:24px">
					<?php esc_html_e( 'ADN', 'maach' ); ?><br>
					<span class="h-italic" style="color:var(--sand-grey)"><?php esc_html_e( 'Industrial', 'maach' ); ?></span>
				</h2>
				<p style="font-size:17px;color:var(--sand-grey);line-height:1.45;max-width:380px;margin-bottom:32px">
					<?php esc_html_e( 'Cada decisión responde a ingeniería, durabilidad y desempeño en el tiempo.', 'maach' ); ?>
				</p>
				<div style="width:110px;height:110px;border:1px solid rgba(228,226,227,.25);border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative;animation:spin-slow 24s linear infinite">
					<svg viewBox="0 0 200 200" style="width:100%;height:100%;position:absolute" aria-hidden="true">
						<defs><path id="maach-circ" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"></path></defs>
						<text fill="var(--sand-grey)" font-size="11" letter-spacing="3" font-family="var(--mono)">
							<textPath href="#maach-circ">MAACH · SISTEMA <?php echo esc_html( gmdate( 'Y' ) ); ?> · INDUSTRIAL DESIGN · REAL PERFORMANCE · </textPath>
						</text>
					</svg>
					<div style="width:16px;height:16px;background:var(--lava-orange)"></div>
				</div>
			</div>

			<div class="keep-grid" style="--keep-cols:repeat(2,1fr);display:grid;grid-template-columns:1fr 1fr;gap:32px">
				<?php foreach ( $maach_adn as $maach_p ) : ?>
					<div>
						<div style="display:flex;align-items:center;gap:16px;margin-bottom:14px">
							<span class="maach-mono" style="font-size:14px;letter-spacing:0;color:var(--lava-orange);font-weight:700"><?php echo esc_html( $maach_p['n'] ); ?></span>
							<div style="flex:1;height:1px;background:rgba(228,226,227,.25)"></div>
						</div>
						<h3 style="font-family:var(--display);font-size:26px;line-height:.95;margin-bottom:10px;text-transform:uppercase;letter-spacing:-.02em">
							<?php echo esc_html( $maach_p['titulo'] ); ?>
						</h3>
						<p style="font-size:13px;line-height:1.5;color:var(--sand-grey)"><?php echo esc_html( $maach_p['texto'] ); ?></p>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</section>

<!-- NUESTRA PLANTA -->
<?php
$maach_planta = apply_filters( 'maach_planta', array(
	array( 'n' => '01', 'img' => 'brand/planta-corte-cnc.webp', 'titulo' => __( 'Corte CNC', 'maach' ), 'texto' => __( 'Corte y mecanizado de precisión sobre metal y madera.', 'maach' ) ),
	array( 'n' => '02', 'img' => 'brand/planta-soldadura.webp', 'titulo' => __( 'Soldadura estructural', 'maach' ), 'texto' => __( 'Uniones controladas para estructuras de alto desempeño.', 'maach' ) ),
	array( 'n' => '03', 'img' => 'brand/planta-pintura.webp', 'titulo' => __( 'Pintura electrostática', 'maach' ), 'texto' => __( 'Recubrimiento en polvo horneado para máxima durabilidad.', 'maach' ) ),
	array( 'n' => '04', 'img' => 'brand/planta-ensamble.webp', 'titulo' => __( 'Ensamble y control', 'maach' ), 'texto' => __( 'Armado, verificación dimensional y control de calidad final.', 'maach' ) ),
) );
?>
<section class="invert" style="padding:128px 0;background:var(--jet-black);color:var(--off-white);border-bottom:1px solid var(--line)">
	<div class="maach-container">
		<div style="max-width:560px;margin-bottom:64px">
			<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:16px"><?php esc_html_e( 'Infraestructura · Tecnología', 'maach' ); ?></span>
			<h2 class="h-display" style="font-size:clamp(48px,6.5vw,90px);margin-bottom:24px"><?php esc_html_e( 'Nuestra planta', 'maach' ); ?></h2>
			<p style="font-size:17px;color:var(--sand-grey);line-height:1.5">
				<?php esc_html_e( 'Fabricamos con maquinaria de control numérico y procesos industriales que garantizan precisión, repetibilidad y acabados de estándar internacional.', 'maach' ); ?>
			</p>
		</div>

		<div class="keep-grid" style="--keep-cols:repeat(2,1fr);display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
			<?php foreach ( $maach_planta as $maach_p ) : ?>
				<div style="position:relative;aspect-ratio:16/10;overflow:hidden;background:#0f0f0f">
					<img src="<?php echo esc_url( maach_img( $maach_p['img'] ) ); ?>" alt="<?php echo esc_attr( $maach_p['titulo'] ); ?>" loading="lazy"
						style="width:100%;height:100%;object-fit:cover">
					<div aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(22,22,22,0) 35%,rgba(22,22,22,.85) 100%)"></div>
					<div style="position:absolute;left:24px;right:24px;bottom:24px">
						<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:8px;font-size:16px"><?php echo esc_html( $maach_p['n'] ); ?></span>
						<h3 style="font-family:var(--display);font-size:clamp(22px,2.4vw,30px);text-transform:uppercase;letter-spacing:-.01em;line-height:1;margin-bottom:8px;color:var(--off-white)">
							<?php echo esc_html( $maach_p['titulo'] ); ?>
						</h3>
						<p style="font-size:14px;color:var(--sand-grey);line-height:1.45;max-width:360px"><?php echo esc_html( $maach_p['texto'] ); ?></p>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- PROYECTOS DESTACADOS -->
<?php
$maach_proyectos = get_posts( array(
	'post_type'      => 'maach_proyecto',
	'posts_per_page' => 2,
	'orderby'        => 'menu_order',
	'order'          => 'ASC',
) );
if ( $maach_proyectos ) :
	?>
	<section style="padding:128px 0;border-bottom:1px solid var(--line)">
		<div class="maach-container">
			<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:32px;margin-bottom:56px;flex-wrap:wrap">
				<div>
					<span class="maach-mono" style="color:var(--muted);display:block;margin-bottom:16px"><?php esc_html_e( 'Portafolio', 'maach' ); ?></span>
					<h2 class="h-display" style="font-size:clamp(32px,5vw,72px)"><?php esc_html_e( 'Proyectos', 'maach' ); ?></h2>
				</div>
				<a href="<?php echo esc_url( get_post_type_archive_link( 'maach_proyecto' ) ); ?>" class="maach-mono" style="display:inline-flex;align-items:center;gap:8px;border-bottom:1px solid var(--fg);padding-bottom:4px">
					<?php esc_html_e( 'Ver portafolio completo', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
				</a>
			</div>

			<div class="keep-grid" style="--keep-cols:repeat(2,1fr);display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
				<?php foreach ( $maach_proyectos as $maach_p ) : ?>
					<a href="<?php echo esc_url( get_permalink( $maach_p ) ); ?>" style="position:relative;aspect-ratio:16/10;overflow:hidden;display:block;background:var(--jet-black)">
						<?php $maach_portada = maach_portada( $maach_p->ID ); ?>
						<?php if ( $maach_portada ) : ?>
							<img src="<?php echo esc_url( $maach_portada ); ?>" alt="<?php echo esc_attr( $maach_p->post_title ); ?>" loading="lazy"
								style="width:100%;height:100%;object-fit:cover">
						<?php endif; ?>
						<div aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(22,22,22,.85) 100%)"></div>
						<div style="position:absolute;left:0;right:0;bottom:0;padding:32px;color:var(--off-white)">
							<h3 class="h-display" style="font-size:32px;color:var(--off-white);margin-bottom:8px"><?php echo esc_html( $maach_p->post_title ); ?></h3>
							<span class="maach-mono" style="color:var(--sand-grey)">
								<?php echo esc_html( get_post_meta( $maach_p->ID, 'maach_ubicacion', true ) ); ?>
								<?php
								$maach_anio = get_post_meta( $maach_p->ID, 'maach_anio', true );
								echo $maach_anio ? ' · ' . esc_html( $maach_anio ) : '';
								?>
							</span>
						</div>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
<?php endif; ?>

<!-- CLIENTES -->
<section style="padding:128px 0;border-bottom:1px solid var(--line)">
	<div class="maach-container" style="margin-bottom:48px">
		<span class="maach-mono" style="color:var(--muted);display:block;margin-bottom:16px"><?php esc_html_e( 'Confían en MAACH', 'maach' ); ?></span>
		<h2 class="h-display" style="font-size:clamp(28px,4vw,56px)"><?php esc_html_e( 'Clientes', 'maach' ); ?></h2>
	</div>
	<?php
	// Los logos viven en assets/img/clientes; para cambiarlos basta con
	// reemplazar los archivos o subir los propios y editar esta lista desde
	// el administrador (Medios) usando el filtro maach_logos_clientes.
	$maach_logos = apply_filters( 'maach_logos_clientes', array(
		'zaimella.png', 'corporacion-maresa.avif', 'kruger.png', 'arroyo-arroyo.jpg',
		'carsnack.jpg', 'uide.webp', 'pmj-arquitectos.png', 'banco-procredit.png',
		'grupo-puentes.png', 'wesco.webp', 'tropi-burger.webp',
	) );
	?>
	<div class="logos-marquee">
		<?php for ( $maach_i = 0; $maach_i < 2; $maach_i++ ) : ?>
			<div class="logos-track" <?php echo $maach_i ? 'aria-hidden="true"' : ''; ?>>
				<?php foreach ( $maach_logos as $maach_logo ) : ?>
					<div class="logos-cell">
						<img src="<?php echo esc_url( maach_img( 'clientes/' . $maach_logo ) ); ?>" alt="" loading="lazy">
					</div>
				<?php endforeach; ?>
			</div>
		<?php endfor; ?>
	</div>
</section>

<!-- CTA -->
<section style="border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
	<div class="invert" style="background:var(--lava-orange);color:var(--off-white);padding:96px 0">
		<div class="maach-container" style="display:flex;align-items:center;justify-content:space-between;gap:40px;flex-wrap:wrap">
			<h2 class="h-display" style="font-size:clamp(28px,4vw,56px);color:var(--off-white);max-width:720px">
				<?php esc_html_e( '¿Tienes un proyecto? Empecemos por el espacio.', 'maach' ); ?>
			</h2>
			<?php if ( $maach_contacto ) : ?>
				<a href="<?php echo esc_url( get_permalink( $maach_contacto ) ); ?>" class="btn-primary">
					<?php esc_html_e( 'Hablar con un asesor', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
				</a>
			<?php endif; ?>
		</div>
	</div>
</section>

<?php
// Si la página de portada tiene contenido en el editor, se muestra al final:
// así un editor puede añadir secciones con bloques sin tocar la plantilla.
while ( have_posts() ) :
	the_post();
	if ( trim( get_the_content() ) ) :
		?>
		<section style="padding:96px 0">
			<div class="maach-container maach-prose"><?php the_content(); ?></div>
		</section>
		<?php
	endif;
endwhile;

get_footer();
