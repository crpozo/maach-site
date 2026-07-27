<?php
/**
 * Mega menú de Productos: una columna por categoría con sus subcategorías.
 * Se arma solo con lo que exista en la taxonomía, así que añadir una categoría
 * en el administrador la agrega aquí sin tocar código.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$maach_cats = maach_categorias();
if ( ! $maach_cats ) {
	return;
}
?>
<div class="maach-dropdown maach-mega" data-panel="mega">
	<div class="maach-container" style="padding:56px 48px;display:grid;grid-template-columns:300px 1fr;gap:64px">

		<div>
			<div style="aspect-ratio:4/5;background:var(--surface);border:1px solid var(--line);position:relative;overflow:hidden;margin-bottom:24px">
				<img src="<?php echo esc_url( maach_img( 'brand/megamenu-silloneria.webp' ) ); ?>" alt="<?php esc_attr_e( 'Catálogo MAACH', 'maach' ); ?>"
					style="width:100%;height:100%;object-fit:cover">
			</div>
			<a href="<?php echo esc_url( get_post_type_archive_link( 'maach_producto' ) ); ?>"
				style="display:inline-flex;align-items:center;gap:8px;border-bottom:1px solid var(--fg);padding-bottom:4px;font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:600">
				<?php esc_html_e( 'Ver todos los productos', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
			</a>
			<div style="margin-top:32px">
				<div class="maach-mono" style="color:var(--muted);margin-bottom:12px"><?php esc_html_e( 'Relacionado', 'maach' ); ?></div>
				<div style="display:flex;flex-direction:column;gap:8px;font-size:14px;font-weight:500">
					<a href="<?php echo esc_url( get_post_type_archive_link( 'maach_proyecto' ) ); ?>"><?php esc_html_e( 'Portafolio', 'maach' ); ?></a>
					<?php
					$maach_biblio = get_page_by_path( 'biblioteca' );
					if ( $maach_biblio ) :
						?>
						<a href="<?php echo esc_url( get_permalink( $maach_biblio ) ); ?>"><?php esc_html_e( 'Documentos técnicos', 'maach' ); ?></a>
					<?php endif; ?>
				</div>
			</div>
		</div>

		<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:40px;column-gap:56px">
			<?php foreach ( $maach_cats as $maach_cat ) : ?>
				<div class="maach-mega-col">
					<a href="<?php echo esc_url( get_term_link( $maach_cat ) ); ?>"
						style="font-family:var(--display);font-weight:600;font-size:22px;margin-bottom:20px;text-transform:uppercase;letter-spacing:-.01em;display:block">
						<?php echo esc_html( $maach_cat->name ); ?>
					</a>
					<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px">
						<?php
						// Subcategorías que realmente tienen productos en esta categoría.
						$maach_subs = maach_subcategorias_de( $maach_cat );
						foreach ( $maach_subs as $maach_sub ) :
							?>
							<li>
								<a href="<?php echo esc_url( get_term_link( $maach_sub ) ); ?>" style="font-size:14px;color:var(--muted)">
									<?php echo esc_html( $maach_sub->name ); ?>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>
