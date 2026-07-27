<?php
/**
 * Catálogo completo, con filtro por categoría.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$maach_cats  = maach_categorias();
$maach_filtro = isset( $_GET['cat'] ) ? sanitize_title( wp_unslash( $_GET['cat'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
?>

<section style="padding:96px 0 48px;border-bottom:1px solid var(--line)">
	<div class="maach-container">
		<span class="maach-mono" style="color:var(--muted);display:block;margin-bottom:16px"><?php esc_html_e( 'Catálogo 2026', 'maach' ); ?></span>
		<h1 class="h-display" style="font-size:clamp(44px,7vw,96px);margin-bottom:24px"><?php esc_html_e( 'Productos', 'maach' ); ?></h1>
		<p style="font-size:18px;color:var(--muted);max-width:620px;line-height:1.6">
			<?php esc_html_e( 'Mobiliario corporativo diseñado y fabricado en Ecuador. Cada línea responde a una forma distinta de habitar la oficina.', 'maach' ); ?>
		</p>
	</div>
</section>

<section style="padding:40px 0;border-bottom:1px solid var(--line);position:sticky;top:80px;background:var(--bg);z-index:20">
	<div class="maach-container" style="display:flex;gap:10px;flex-wrap:wrap">
		<a href="<?php echo esc_url( get_post_type_archive_link( 'maach_producto' ) ); ?>"
			class="maach-filter maach-mono <?php echo '' === $maach_filtro ? 'is-active' : ''; ?>"
			style="border:1px solid var(--line);padding:10px 18px">
			<?php esc_html_e( 'Todos', 'maach' ); ?>
		</a>
		<?php foreach ( $maach_cats as $maach_cat ) : ?>
			<a href="<?php echo esc_url( add_query_arg( 'cat', $maach_cat->slug, get_post_type_archive_link( 'maach_producto' ) ) ); ?>"
				class="maach-filter maach-mono <?php echo $maach_filtro === $maach_cat->slug ? 'is-active' : ''; ?>"
				style="border:1px solid var(--line);padding:10px 18px">
				<?php echo esc_html( $maach_cat->name ); ?>
			</a>
		<?php endforeach; ?>
	</div>
</section>

<section style="padding:64px 0 128px">
	<div class="maach-container">
		<?php
		foreach ( $maach_cats as $maach_cat ) {
			if ( $maach_filtro && $maach_filtro !== $maach_cat->slug ) {
				continue;
			}
			$maach_grupos = maach_productos_agrupados( $maach_cat );
			if ( ! $maach_grupos ) {
				continue;
			}
			?>
			<div id="<?php echo esc_attr( $maach_cat->slug ); ?>" style="margin-bottom:96px">
				<div style="display:flex;align-items:baseline;justify-content:space-between;gap:24px;padding-bottom:20px;border-bottom:1px solid var(--fg);margin-bottom:40px">
					<h2 class="h-display" style="font-size:clamp(28px,3.4vw,48px)"><?php echo esc_html( $maach_cat->name ); ?></h2>
					<a href="<?php echo esc_url( get_term_link( $maach_cat ) ); ?>" class="maach-mono" style="display:inline-flex;align-items:center;gap:8px">
						<?php esc_html_e( 'Ver la línea', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
					</a>
				</div>
				<?php
				foreach ( $maach_grupos as $maach_grupo ) {
					if ( $maach_grupo['term'] ) {
						printf(
							'<h3 class="maach-mono" style="color:var(--muted);margin:40px 0 20px">%s</h3>',
							esc_html( $maach_grupo['term']->name )
						);
					}
					maach_grid_productos( $maach_grupo['posts'], 4 );
				}
				?>
			</div>
			<?php
		}
		?>
	</div>
</section>

<?php
get_footer();
