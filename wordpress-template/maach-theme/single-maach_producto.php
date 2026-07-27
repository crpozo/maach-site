<?php
/**
 * Ficha de producto.
 *
 * Réplica de la ficha del sitio original: galería con miniaturas y lupa,
 * tarjeta negra con la descripción, características técnicas de la
 * subcategoría, documentos descargables y productos relacionados.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

while ( have_posts() ) :
	the_post();

	$producto        = get_the_ID();
	$fotos           = maach_galeria( $producto );
	$categoria       = maach_termino( $producto, 'maach_categoria' );
	$subcategoria    = maach_termino( $producto, 'maach_subcategoria' );
	$caracteristicas = maach_caracteristicas( $producto );
	$documentos      = maach_documentos( $producto );
	$titulo          = get_the_title();

	// El título se achica cuando el nombre es largo, como en el sitio original.
	$palabra_larga = 0;
	foreach ( preg_split( '/\s+/', $titulo ) as $palabra ) {
		$palabra_larga = max( $palabra_larga, mb_strlen( $palabra ) );
	}
	$tam_titulo = $palabra_larga <= 6 ? 'clamp(34px, 4.5vw, 64px)' : ( $palabra_larga <= 8 ? 'clamp(30px, 3.6vw, 50px)' : 'clamp(26px, 3vw, 40px)' );
	?>

	<div style="background:var(--soft);border-bottom:1px solid var(--line)">
		<div class="maach-container" style="padding:14px 48px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="maach-mono" style="color:var(--muted)"><?php esc_html_e( 'Inicio', 'maach' ); ?></a>
			<?php maach_icono( 'chevron', 10, 'color:var(--muted)' ); ?>
			<a href="<?php echo esc_url( get_post_type_archive_link( 'maach_producto' ) ); ?>" class="maach-mono" style="color:var(--muted)"><?php esc_html_e( 'Productos', 'maach' ); ?></a>
			<?php if ( $categoria ) : ?>
				<?php maach_icono( 'chevron', 10, 'color:var(--muted)' ); ?>
				<a href="<?php echo esc_url( get_term_link( $categoria ) ); ?>" class="maach-mono" style="color:var(--muted)"><?php echo esc_html( $categoria->name ); ?></a>
			<?php endif; ?>
			<?php maach_icono( 'chevron', 10, 'color:var(--muted)' ); ?>
			<span class="maach-mono"><?php echo esc_html( $titulo ); ?></span>
		</div>
	</div>

	<section style="padding:64px 0 96px">
		<div class="maach-container">
			<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:80px">

				<!-- GALERÍA -->
				<div>
					<div style="position:relative;aspect-ratio:4/3;border:1px solid var(--line);background:var(--surface);overflow:hidden"
						data-galeria data-fotos="<?php echo esc_attr( wp_json_encode( $fotos ) ); ?>">
						<?php if ( $fotos ) : ?>
							<img src="<?php echo esc_url( $fotos[0] ); ?>" alt="<?php echo esc_attr( $titulo ); ?>" data-principal
								style="width:100%;height:100%;object-fit:contain;padding:32px;cursor:zoom-in">
						<?php endif; ?>

						<button type="button" data-zoom aria-label="<?php esc_attr_e( 'Ampliar imagen', 'maach' ); ?>"
							style="position:absolute;top:16px;right:16px;background:var(--off-white);border:1px solid var(--fg);width:38px;height:38px;display:flex;align-items:center;justify-content:center;cursor:zoom-in">
							<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4"/></svg>
						</button>
						<button type="button" data-anterior
							style="position:absolute;left:16px;top:50%;transform:translateY(-50%);background:var(--off-white);border:1px solid var(--fg);width:44px;height:44px;display:flex;align-items:center;justify-content:center">
							<?php maach_icono( 'chevron', 16, 'transform:rotate(180deg)' ); ?>
						</button>
						<button type="button" data-siguiente
							style="position:absolute;right:16px;top:50%;transform:translateY(-50%);background:var(--off-white);border:1px solid var(--fg);width:44px;height:44px;display:flex;align-items:center;justify-content:center">
							<?php maach_icono( 'chevron', 16 ); ?>
						</button>
						<div style="position:absolute;bottom:16px;left:16px">
							<span class="maach-mono" data-contador style="background:var(--off-white);padding:5px 10px">
								01 / <?php echo esc_html( str_pad( (string) count( $fotos ), 2, '0', STR_PAD_LEFT ) ); ?>
							</span>
						</div>
						<div style="position:absolute;bottom:16px;right:16px">
							<span class="maach-mono" style="background:var(--jet-black);color:var(--off-white);padding:5px 10px">
								<?php esc_html_e( 'FOTOGRAFÍA_ESTUDIO', 'maach' ); ?>
							</span>
						</div>
					</div>

					<?php if ( count( $fotos ) > 1 ) : ?>
						<div class="pd-thumbs" style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:16px">
							<?php foreach ( $fotos as $i => $foto ) : ?>
								<button type="button" data-thumb="<?php echo (int) $i; ?>" class="<?php echo 0 === $i ? 'is-active' : ''; ?>">
									<img src="<?php echo esc_url( $foto ); ?>" alt="" loading="lazy">
								</button>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
				</div>

				<!-- INFORMACIÓN -->
				<div style="display:flex;flex-direction:column;gap:20px">

					<div class="invert" style="position:relative;background:var(--jet-black);color:var(--off-white);padding:clamp(28px,3vw,44px);display:flex;flex-direction:column;gap:28px;overflow:hidden">
						<div aria-hidden="true" style="position:absolute;top:18px;right:18px;width:22px;height:22px;border-top:2px solid var(--lava-orange);border-right:2px solid var(--lava-orange)"></div>
						<div aria-hidden="true" style="position:absolute;bottom:18px;left:18px;width:22px;height:22px;border-bottom:2px solid var(--lava-orange);border-left:2px solid var(--lava-orange)"></div>

						<img src="<?php echo esc_url( maach_img( 'isotipo-maach-color.png' ) ); ?>" alt="MAACH"
							style="height:30px;width:auto;align-self:flex-start;display:block">

						<p style="font-size:16px;color:var(--off-white);line-height:1.6;margin:0;max-width:520px">
							<?php echo esc_html( get_the_excerpt() ); ?>
						</p>

						<div style="height:1px;background:rgba(228,226,227,.22);width:100%"></div>

						<div style="display:flex;flex-direction:column;align-items:flex-start;gap:12px">
							<?php if ( $categoria ) : ?>
								<span class="maach-mono" style="color:var(--lava-orange);letter-spacing:.08em"><?php echo esc_html( $categoria->name ); ?></span>
							<?php endif; ?>
							<h1 class="h-display" style="font-size:<?php echo esc_attr( $tam_titulo ); ?>;line-height:.92;margin:0;align-self:stretch;min-width:0;overflow-wrap:break-word">
								<?php echo esc_html( $titulo ); ?>
							</h1>
						</div>
					</div>

					<div style="display:flex;gap:12px">
						<?php $contacto = get_page_by_path( 'contacto' ); ?>
						<a href="<?php echo esc_url( $contacto ? add_query_arg( 'producto', rawurlencode( $titulo ), get_permalink( $contacto ) ) : '#' ); ?>"
							class="btn-primary" style="flex:1;justify-content:center">
							<?php esc_html_e( 'Contactar asesor', 'maach' ); ?>
						</a>
						<?php if ( maach_tiene_cad( $producto ) ) : ?>
							<button type="button" class="btn-ghost" data-ir-documentos style="flex:1;justify-content:center">
								<?php maach_icono( 'download', 14 ); ?> <?php esc_html_e( 'BIM / CAD', 'maach' ); ?>
							</button>
						<?php endif; ?>
					</div>

					<?php if ( $caracteristicas ) : ?>
						<div style="margin-top:12px;padding-top:28px;border-top:1px solid var(--line)">
							<h3 style="margin-bottom:24px" class="maach-mono">
								<span style="display:inline-flex;align-items:center;gap:8px">
									<?php maach_icono( 'tool', 14 ); ?> <?php esc_html_e( 'Características técnicas', 'maach' ); ?>
								</span>
							</h3>
							<div style="display:flex;flex-direction:column;gap:18px">
								<?php foreach ( $caracteristicas as $i => $caracteristica ) : ?>
									<div style="display:flex;gap:16px;align-items:flex-start">
										<span class="maach-mono" style="color:var(--lava-orange);flex-shrink:0;font-weight:700;padding-top:2px">
											<?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?>
										</span>
										<span style="font-size:15px;line-height:1.55;color:var(--fg)"><?php echo esc_html( $caracteristica ); ?></span>
									</div>
								<?php endforeach; ?>
							</div>
						</div>
					<?php endif; ?>

					<?php if ( $documentos ) : ?>
						<div id="documentos" style="margin-top:12px;padding-top:28px;border-top:1px solid var(--line)">
							<h3 style="margin-bottom:20px" class="maach-mono">
								<span style="display:inline-flex;align-items:center;gap:8px">
									<?php maach_icono( 'file', 14 ); ?> <?php esc_html_e( 'Documentos & recursos', 'maach' ); ?>
								</span>
							</h3>
							<div style="display:flex;flex-direction:column;gap:12px">
								<?php foreach ( $documentos as $doc ) : ?>
									<button type="button" class="maach-descargar"
										data-url="<?php echo esc_url( $doc['url'] ); ?>"
										data-archivo="<?php echo esc_attr( $doc['archivo'] ); ?>"
										data-producto="<?php echo esc_attr( $titulo ); ?>"
										style="background:var(--surface);border:1px solid var(--line);padding:14px 18px;display:flex;justify-content:space-between;align-items:center;gap:16px;width:100%;text-align:left;cursor:pointer">
										<span>
											<span style="font-family:var(--body);font-size:14px;font-weight:500"><?php echo esc_html( $doc['nombre'] ); ?></span>
											<span class="maach-mono" style="color:var(--lava-orange);margin-left:10px">.<?php echo esc_html( $doc['ext'] ); ?></span>
										</span>
										<?php maach_icono( 'download', 14 ); ?>
									</button>
								<?php endforeach; ?>
							</div>
						</div>
					<?php endif; ?>
				</div>
			</div>

			<!-- DIMENSIONES -->
			<div style="margin-top:64px;padding-top:40px;border-top:1px solid var(--line)">
				<h3 style="margin-bottom:20px" class="maach-mono">
					<span style="display:inline-flex;align-items:center;gap:8px">
						<?php maach_icono( 'ruler', 14 ); ?> <?php esc_html_e( 'Dimensiones', 'maach' ); ?>
					</span>
				</h3>
				<p style="font-size:18px;line-height:1.55;color:var(--fg);margin:0;max-width:620px">
					<?php echo esc_html( maach_dimensiones( $producto ) ); ?>
				</p>
			</div>

			<?php if ( get_the_content() ) : ?>
				<div class="maach-prose" style="margin-top:64px;padding-top:40px;border-top:1px solid var(--line);max-width:760px">
					<?php the_content(); ?>
				</div>
			<?php endif; ?>
		</div>
	</section>

	<?php
	// RELACIONADOS — mismo criterio del sitio: otros productos de la categoría.
	$relacionados = $categoria ? get_posts( array(
		'post_type'      => 'maach_producto',
		'posts_per_page' => 4,
		'post__not_in'   => array( $producto ),
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
		'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			array(
				'taxonomy' => 'maach_categoria',
				'field'    => 'term_id',
				'terms'    => $categoria->term_id,
			),
		),
	) ) : array();

	if ( $relacionados ) :
		?>
		<section style="background:var(--soft);border-top:1px solid var(--line);padding:96px 0">
			<div class="maach-container">
				<span class="maach-mono" style="color:var(--muted);display:block;margin-bottom:12px"><?php esc_html_e( 'Línea modular', 'maach' ); ?></span>
				<h2 class="h-display" style="font-size:56px;margin-bottom:48px"><?php esc_html_e( 'Productos relacionados', 'maach' ); ?></h2>
				<?php maach_grid_productos( $relacionados, 4 ); ?>
			</div>
		</section>
	<?php endif; ?>

	<?php
endwhile;

get_footer();
