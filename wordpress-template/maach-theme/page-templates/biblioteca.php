<?php
/**
 * Template Name: MAACH · Biblioteca de documentos
 *
 * Lista real de descargas: recorre los productos publicados y muestra cada
 * archivo que realmente existe, con filtro por tipo. Sustituye a la tabla
 * de ejemplo que traía el sitio original.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$maach_tipo = isset( $_GET['tipo'] ) ? sanitize_key( wp_unslash( $_GET['tipo'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
$maach_map  = array( 'fichas' => array( 'pdf' ), 'modelos' => array( 'skp', 'rfa' ), 'planos' => array( 'dwg' ) );
$maach_exts = $maach_map[ $maach_tipo ] ?? array( 'pdf', 'skp', 'rfa', 'dwg' );

$maach_productos = get_posts( array(
	'post_type'      => 'maach_producto',
	'posts_per_page' => -1,
	'orderby'        => 'title',
	'order'          => 'ASC',
) );

$maach_filas = array();
foreach ( $maach_productos as $maach_p ) {
	foreach ( maach_documentos( $maach_p->ID ) as $maach_doc ) {
		if ( in_array( $maach_doc['ext'], $maach_exts, true ) ) {
			$maach_doc['producto'] = $maach_p->post_title;
			$maach_doc['enlace']   = get_permalink( $maach_p );
			$maach_filas[]         = $maach_doc;
		}
	}
}
?>

<section style="padding:96px 0 48px;border-bottom:1px solid var(--line)">
	<div class="maach-container">
		<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:16px"><?php esc_html_e( 'Recursos de diseño', 'maach' ); ?></span>
		<h1 class="h-display" style="font-size:clamp(40px,6vw,88px);margin-bottom:24px"><?php the_title(); ?></h1>
		<p style="font-size:18px;color:var(--muted);max-width:620px;line-height:1.6">
			<?php esc_html_e( 'Fichas técnicas, planos CAD y modelos 3D / BIM de los productos del catálogo.', 'maach' ); ?>
		</p>
	</div>
</section>

<section style="padding:40px 0;border-bottom:1px solid var(--line)">
	<div class="maach-container" style="display:flex;gap:10px;flex-wrap:wrap">
		<?php
		$maach_filtros = array(
			''        => __( 'Todos', 'maach' ),
			'fichas'  => __( 'Fichas técnicas', 'maach' ),
			'planos'  => __( 'Planos CAD', 'maach' ),
			'modelos' => __( 'Modelos 3D / BIM', 'maach' ),
		);
		foreach ( $maach_filtros as $maach_key => $maach_label ) :
			$maach_url = $maach_key ? add_query_arg( 'tipo', $maach_key, get_permalink() ) : get_permalink();
			?>
			<a href="<?php echo esc_url( $maach_url ); ?>" class="maach-filter maach-mono <?php echo $maach_tipo === $maach_key ? 'is-active' : ''; ?>"
				style="border:1px solid var(--line);padding:10px 18px"><?php echo esc_html( $maach_label ); ?></a>
		<?php endforeach; ?>
	</div>
</section>

<section style="padding:64px 0 128px">
	<div class="maach-container">
		<p class="maach-mono" style="color:var(--muted);margin-bottom:24px">
			<?php
			printf(
				/* translators: %d: número de documentos. */
				esc_html__( '%d documentos disponibles', 'maach' ),
				count( $maach_filas )
			);
			?>
		</p>

		<div style="border-top:1px solid var(--fg)">
			<?php foreach ( $maach_filas as $maach_fila ) : ?>
				<div style="display:grid;grid-template-columns:1.4fr 1fr 120px;gap:24px;align-items:center;padding:20px 0;border-bottom:1px solid var(--line)">
					<a href="<?php echo esc_url( $maach_fila['enlace'] ); ?>" style="font-size:16px;font-weight:500">
						<?php echo esc_html( $maach_fila['producto'] ); ?>
					</a>
					<span class="maach-mono" style="color:var(--muted)"><?php echo esc_html( $maach_fila['nombre'] ); ?></span>
					<button type="button" class="maach-descargar maach-mono"
						data-url="<?php echo esc_url( $maach_fila['url'] ); ?>"
						data-archivo="<?php echo esc_attr( $maach_fila['archivo'] ); ?>"
						data-producto="<?php echo esc_attr( $maach_fila['producto'] ); ?>"
						style="border:1px solid var(--fg);padding:8px 14px;display:inline-flex;align-items:center;gap:8px;justify-content:center">
						<?php maach_icono( 'download', 12 ); ?>.<?php echo esc_html( $maach_fila['ext'] ); ?>
					</button>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
get_footer();
