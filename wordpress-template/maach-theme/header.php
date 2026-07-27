<?php
/**
 * Cabecera: barra fija con mega menú de productos y submenú de portafolio.
 *
 * @package MAACH
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div data-screen-label="<?php echo esc_attr( maach_screen_label() ); ?>" style="min-height:100vh;display:flex;flex-direction:column">

<nav class="maach-nav" style="position:fixed;top:0;left:0;right:0;background:var(--off-white);border-bottom:1px solid var(--line);z-index:90">
	<div class="maach-container" style="height:80px;display:flex;align-items:center;justify-content:space-between">

		<div class="nav-left" style="display:flex;align-items:center;gap:56px;height:100%">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="MAACH">
				<?php if ( has_custom_logo() ) : ?>
					<?php the_custom_logo(); ?>
				<?php else : ?>
					<img src="<?php echo esc_url( maach_img( 'logo-bicolor.png' ) ); ?>" alt="MAACH" style="height:26px;width:auto">
				<?php endif; ?>
			</a>

			<div class="nav-links" style="display:flex;align-items:center;height:100%;gap:28px">

				<div class="maach-nav-item" data-dropdown="mega" style="height:100%;display:flex;align-items:center;cursor:pointer">
					<span class="maach-mono" style="font-size:12px;font-weight:600;display:inline-flex;align-items:center;gap:6px">
						<?php esc_html_e( 'Productos', 'maach' ); ?><?php maach_icono( 'down', 11 ); ?>
					</span>
				</div>

				<?php
				foreach ( maach_nav_principal() as $item ) :
					$titulo = $item['titulo'];
					// "Productos" y "Portafolio" tienen su propio desplegable.
					if ( 0 === strcasecmp( $titulo, 'Productos' ) ) {
						continue;
					}
					$es_portafolio = 0 === strcasecmp( $titulo, 'Portafolio' );
					$activo        = maach_menu_activo( $item['url'] );
					?>
					<div class="maach-nav-item <?php echo $activo ? 'is-active' : ''; ?>"
						<?php echo $es_portafolio ? 'data-dropdown="portafolio"' : ''; ?>
						style="height:100%;display:flex;align-items:center">
						<a href="<?php echo esc_url( $item['url'] ); ?>" class="maach-mono" style="font-size:12px;font-weight:600">
							<?php echo esc_html( $titulo ); ?>
						</a>
					</div>
					<?php
				endforeach;
				?>
			</div>
		</div>

		<div class="nav-right" style="display:flex;align-items:center;gap:24px">
			<button type="button" class="maach-buscar-abrir" aria-label="<?php esc_attr_e( 'Buscar', 'maach' ); ?>"
				style="display:flex;align-items:center"><?php maach_icono( 'search', 18 ); ?></button>
		</div>

		<button type="button" class="nav-burger" aria-label="<?php esc_attr_e( 'Menú', 'maach' ); ?>" aria-expanded="false">
			<?php maach_icono( 'menu', 18 ); ?>
		</button>
	</div>

	<?php get_template_part( 'template-parts/mega-menu' ); ?>
	<?php get_template_part( 'template-parts/menu-portafolio' ); ?>
</nav>

<?php get_template_part( 'template-parts/menu-movil' ); ?>

<div class="maach-buscar" style="display:none;position:fixed;inset:80px 0 auto 0;background:var(--off-white);border-bottom:1px solid var(--line);z-index:89;padding:32px 0">
	<div class="maach-container">
		<?php get_search_form(); ?>
	</div>
</div>

<main style="flex:1;padding-top:80px" class="page">
