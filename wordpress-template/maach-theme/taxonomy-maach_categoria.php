<?php
/**
 * Página de categoría: introducción, y una sección editorial por subcategoría
 * con su descripción, sus características y su cuadrícula de productos.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$maach_term   = get_queried_object();
$maach_intro  = get_term_meta( $maach_term->term_id, 'maach_intro', true );
$maach_grupos = maach_productos_agrupados( $maach_term );
?>

<section class="invert" style="position:relative;overflow:hidden;min-height:52vh;display:flex;align-items:flex-end;background:var(--jet-black);color:var(--off-white);border-bottom:1px solid var(--line)">
	<img src="<?php echo esc_url( maach_imagen_categoria( $maach_term ) ); ?>" alt="" aria-hidden="true"
		style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
	<div aria-hidden="true" style="position:absolute;inset:0;z-index:1;background:linear-gradient(95deg,rgba(22,22,22,.85) 0%,rgba(22,22,22,.6) 45%,rgba(22,22,22,.2) 100%)"></div>
	<div aria-hidden="true" style="position:absolute;top:0;bottom:0;left:0;width:6px;background:var(--lava-orange);z-index:2"></div>

	<div class="maach-container" style="position:relative;z-index:3;padding-top:96px;padding-bottom:64px">
		<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:16px"><?php esc_html_e( 'Línea de producto', 'maach' ); ?></span>
		<h1 class="h-display" style="font-size:clamp(40px,6vw,88px);color:var(--off-white);margin-bottom:24px">
			<?php echo esc_html( $maach_term->name ); ?>
		</h1>
		<?php if ( $maach_intro ) : ?>
			<p style="font-size:18px;color:var(--sand-grey);max-width:680px;line-height:1.6"><?php echo esc_html( $maach_intro ); ?></p>
		<?php endif; ?>
	</div>
</section>

<?php
foreach ( $maach_grupos as $maach_i => $maach_grupo ) :
	$maach_sub = $maach_grupo['term'];
	if ( ! $maach_sub ) {
		continue;
	}
	$maach_desc  = get_term_meta( $maach_sub->term_id, 'maach_intro', true );
	$maach_feats = maach_lineas( get_term_meta( $maach_sub->term_id, 'maach_caracteristicas', true ) );
	$maach_slug  = get_term_meta( $maach_sub->term_id, 'maach_seccion', true );
	?>
	<section id="<?php echo esc_attr( $maach_slug ? $maach_slug : $maach_sub->slug ); ?>"
		style="padding:96px 0;border-bottom:1px solid var(--line);<?php echo $maach_i % 2 ? 'background:var(--soft)' : ''; ?>">
		<div class="maach-container">
			<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:64px;margin-bottom:56px">
				<div>
					<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:14px">
						<?php echo esc_html( str_pad( (string) ( $maach_i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?>
					</span>
					<h2 class="h-display" style="font-size:clamp(30px,3.6vw,52px);margin-bottom:24px"><?php echo esc_html( $maach_sub->name ); ?></h2>
					<?php if ( $maach_desc ) : ?>
						<p style="font-size:17px;line-height:1.65;color:var(--muted);max-width:640px"><?php echo esc_html( $maach_desc ); ?></p>
					<?php endif; ?>
				</div>

				<?php if ( $maach_feats ) : ?>
					<div>
						<h3 class="maach-mono" style="color:var(--muted);margin-bottom:20px"><?php esc_html_e( 'Características', 'maach' ); ?></h3>
						<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:18px 32px">
							<?php foreach ( $maach_feats as $maach_j => $maach_feat ) : ?>
								<div style="display:flex;gap:14px;align-items:flex-start;padding-top:14px;border-top:1px solid var(--line)">
									<span class="maach-mono" style="color:var(--lava-orange);flex-shrink:0;font-weight:700">
										<?php echo esc_html( str_pad( (string) ( $maach_j + 1 ), 2, '0', STR_PAD_LEFT ) ); ?>
									</span>
									<span style="font-size:15px;line-height:1.5"><?php echo esc_html( $maach_feat ); ?></span>
								</div>
							<?php endforeach; ?>
						</div>
					</div>
				<?php endif; ?>
			</div>

			<?php
			if ( $maach_grupo['posts'] ) {
				maach_grid_productos( $maach_grupo['posts'], 4 );
			} else {
				echo '<p style="font-size:17px;color:var(--muted)">' .
					esc_html__( 'Todavía no hay productos cargados en esta línea. Ve a Productos → Importar catálogo en el administrador.', 'maach' ) .
					'</p>';
			}
			?>
		</div>
	</section>
	<?php
endforeach;

get_footer();
