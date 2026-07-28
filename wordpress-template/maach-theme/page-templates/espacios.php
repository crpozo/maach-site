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

<section class="invert" style="position:relative;overflow:hidden;min-height:calc(100vh - 80px);display:flex;align-items:flex-end;background:var(--jet-black);color:var(--off-white);border-bottom:1px solid var(--line)">
	<img src="<?php echo esc_url( maach_img( 'bg-espacios.webp' ) ); ?>" alt="" aria-hidden="true"
		style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
	<div aria-hidden="true" style="position:absolute;inset:0;z-index:0;background:linear-gradient(95deg,rgba(22,22,22,.82) 0%,rgba(22,22,22,.5) 45%,rgba(22,22,22,.12) 80%,transparent 100%)"></div>
	<div aria-hidden="true" style="position:absolute;top:0;bottom:0;left:0;width:6px;background:var(--lava-orange);z-index:2"></div>

	<div style="position:absolute;top:28px;left:48px;right:48px;z-index:3;display:flex;justify-content:space-between;align-items:center">
		<span class="maach-mono" style="color:var(--lava-orange)"><?php esc_html_e( 'MAACH · PLANIFICACIÓN 2026', 'maach' ); ?></span>
		<span class="maach-mono" style="color:var(--off-white)"><?php esc_html_e( 'Espacios', 'maach' ); ?></span>
	</div>
	<div aria-hidden="true" style="position:absolute;top:24px;right:24px;width:22px;height:22px;border-top:2px solid var(--lava-orange);border-right:2px solid var(--lava-orange);z-index:3"></div>

	<div class="maach-container" style="position:relative;z-index:3;width:100%;padding-bottom:72px">
		<h1 class="h-display" style="font-size:clamp(56px,9vw,110px);color:var(--off-white);margin:0 0 28px;line-height:.9">
			<?php esc_html_e( 'Espacios', 'maach' ); ?>
		</h1>
		<p style="font-size:20px;color:var(--off-white);line-height:1.5;max-width:640px;margin:0 0 48px">
			<?php esc_html_e( 'Soluciones integrales que transforman metros cuadrados en entornos productivos, coherentes y listos para escalar.', 'maach' ); ?>
		</p>

		<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:32px;max-width:900px;padding-top:32px;border-top:1px solid rgba(228,226,227,.25)">
			<?php
			$maach_cifras = apply_filters( 'maach_espacios_cifras', array(
				array( '04', __( 'Tipologías', 'maach' ) ),
				array( '12', __( 'Sistemas', 'maach' ) ),
				array( '48', __( 'Configs.', 'maach' ) ),
				array( '09', __( 'Acabados', 'maach' ) ),
			) );
			foreach ( $maach_cifras as $maach_c ) :
				?>
				<div>
					<div style="font-family:var(--display);font-weight:700;font-size:clamp(32px,3.4vw,48px);line-height:1;color:var(--lava-orange);letter-spacing:-.02em;margin-bottom:8px">
						<?php echo esc_html( $maach_c[0] ); ?>
					</div>
					<span class="maach-mono" style="color:var(--sand-grey)"><?php echo esc_html( $maach_c[1] ); ?></span>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- TIPOLOGÍAS -->
<?php
$maach_tipologias = apply_filters( 'maach_tipologias', array(
	array(
		'n'    => '01',
		'img'  => 'espacios/tipologia-coworking.webp',
		'name' => __( 'Área Coworking', 'maach' ),
		'desc' => __( 'Un espacio de coworking moderno combina funcionalidad, comodidad y diseño para crear ambientes de trabajo dinámicos y eficientes. Los escritorios ergonómicos y las estaciones de trabajo modulares permiten adaptarse a diferentes necesidades, mientras que las sillas ergonómicas brindan soporte y confort durante largas jornadas.', 'maach' ),
		'subs' => array( 'Estaciones de trabajo', 'Escritorios operativos', 'Sillas operativas', 'Arturito' ),
	),
	array(
		'n'    => '02',
		'img'  => 'espacios/tipologia-salas.webp',
		'name' => __( 'Salas de Reuniones', 'maach' ),
		'desc' => __( 'Las salas de reuniones modernas están diseñadas para fomentar la comunicación, la concentración y la colaboración en un entorno profesional y cómodo. Las mesas de reunión son el elemento central, disponibles en distintos formatos y tamaños para adaptarse a reuniones ejecutivas, sesiones creativas o videoconferencias. Las sillas ergonómicas complementan el espacio ofreciendo comodidad y soporte durante encuentros prolongados.', 'maach' ),
		'subs' => array( 'Mesas de reunión', 'Sillas operativas', 'Credenza', 'Divisiones modulares' ),
	),
	array(
		'n'    => '03',
		'img'  => 'espacios/tipologia-espera.webp',
		'name' => __( 'Áreas de Espera', 'maach' ),
		'desc' => __( 'Una sala de recepción con área de espera está diseñada para ofrecer una experiencia cómoda, organizada y profesional desde el primer momento. Los mostradores permiten una atención eficiente, mientras que los sofás, butacas y sillas de espera brindan confort a visitantes y clientes. Las mesas auxiliares aportan funcionalidad y equilibrio visual al ambiente.', 'maach' ),
		'subs' => array( 'Counters de recepción', 'Mesas colaborativas', 'Sillas gerenciales', 'Sofás' ),
	),
	array(
		'n'    => '04',
		'img'  => 'espacios/tipologia-archivo.webp',
		'name' => __( 'Áreas de Archivo', 'maach' ),
		'desc' => __( 'Las áreas de archivación están diseñadas para mantener la organización, seguridad y fácil acceso a documentos y materiales de trabajo. Los archivadores metálicos, gaveteros y estanterías modulares permiten clasificar y almacenar información de manera eficiente, optimizando el uso del espacio.', 'maach' ),
		'subs' => array( 'Archivo Rodante', 'Biblioteca Alta', 'Locker' ),
	),
) );
?>
<section style="padding:128px 0;border-bottom:1px solid var(--line)">
	<div class="maach-container">
		<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:56px;flex-wrap:wrap;gap:16px">
			<div>
				<span class="maach-mono" style="color:var(--muted);display:block;margin-bottom:12px"><?php esc_html_e( 'Tipologías', 'maach' ); ?></span>
				<h2 class="h-display" style="font-size:clamp(48px,6.5vw,90px)">
					<?php esc_html_e( 'Cuatro', 'maach' ); ?>
					<span class="h-italic" style="color:var(--lava-orange)"><?php esc_html_e( 'tipologías', 'maach' ); ?></span>
				</h2>
			</div>
			<span class="maach-mono" style="color:var(--muted)"><?php esc_html_e( '04 espacios · Sistema MAACH', 'maach' ); ?></span>
		</div>

		<div style="display:flex;flex-direction:column;gap:0">
			<?php foreach ( $maach_tipologias as $maach_i => $maach_tip ) : ?>
				<?php $maach_par = 0 === $maach_i % 2; ?>
				<div class="esp-typ-row" style="display:grid;grid-template-columns:1.05fr 1fr;gap:clamp(40px,6vw,96px);align-items:center;padding:64px 0;<?php echo 0 === $maach_i ? 'border-top:1px solid var(--line);' : ''; ?>border-bottom:1px solid var(--line)">
					<div style="position:relative;aspect-ratio:4/3;overflow:hidden;background:var(--jet-black);order:<?php echo $maach_par ? 1 : 2; ?>">
						<img src="<?php echo esc_url( maach_img( $maach_tip['img'] ) ); ?>" alt="<?php echo esc_attr( $maach_tip['name'] ); ?>" loading="lazy"
							style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
						<span aria-hidden="true" style="position:absolute;bottom:12px;left:18px;font-family:var(--display);font-weight:700;font-size:clamp(36px,4.5vw,64px);line-height:.8;color:var(--off-white);opacity:.9;letter-spacing:-.04em;pointer-events:none">
							<?php echo esc_html( $maach_tip['n'] ); ?>
						</span>
						<div aria-hidden="true" style="position:absolute;top:14px;right:14px;width:20px;height:20px;border-top:2px solid var(--lava-orange);border-right:2px solid var(--lava-orange)"></div>
					</div>

					<div style="order:<?php echo $maach_par ? 2 : 1; ?>">
						<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:16px;letter-spacing:.1em">
							<?php printf( esc_html__( 'TIPOLOGÍA %s', 'maach' ), esc_html( $maach_tip['n'] ) ); ?>
						</span>
						<h3 class="h-display" style="font-size:clamp(34px,4vw,56px);line-height:1;margin:0 0 20px"><?php echo esc_html( $maach_tip['name'] ); ?></h3>
						<p style="font-size:17px;color:var(--muted);line-height:1.65;margin:0;max-width:560px"><?php echo esc_html( $maach_tip['desc'] ); ?></p>

						<div style="margin-top:28px;padding-top:24px;border-top:1px solid var(--line)">
							<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:14px;letter-spacing:.1em">
								<?php esc_html_e( 'PRODUCTOS UTILIZADOS', 'maach' ); ?>
							</span>
							<div style="display:flex;flex-wrap:wrap;gap:8px">
								<?php
								foreach ( $maach_tip['subs'] as $maach_sub_nombre ) :
									$maach_term = get_term_by( 'slug', sanitize_title( $maach_sub_nombre ), 'maach_subcategoria' );
									$maach_href = $maach_term && ! is_wp_error( get_term_link( $maach_term ) ) ? get_term_link( $maach_term ) : get_post_type_archive_link( 'maach_producto' );
									?>
									<a href="<?php echo esc_url( $maach_href ); ?>"
										style="font-size:13px;padding:7px 14px;border:1px solid var(--line);border-radius:999px;color:var(--fg);background:var(--soft)">
										<?php echo esc_html( $maach_term ? $maach_term->name : $maach_sub_nombre ); ?>
									</a>
								<?php endforeach; ?>
							</div>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- PROCESO -->
<section class="invert" style="background:var(--jet-black);color:var(--off-white);padding:128px 0;position:relative;overflow:hidden;border-bottom:1px solid var(--line)">
	<div class="tex-load-line" style="position:absolute;inset:0;color:var(--off-white);pointer-events:none"></div>
	<div class="maach-container" style="position:relative">
		<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:64px;flex-wrap:wrap;gap:16px">
			<div>
				<span class="maach-mono" style="color:var(--lava-orange);display:block;margin-bottom:24px"><?php esc_html_e( 'Proceso', 'maach' ); ?></span>
				<h2 class="h-display" style="font-size:clamp(48px,6.5vw,90px)">
					<?php esc_html_e( 'Cómo planificamos', 'maach' ); ?><br>
					<span class="h-italic" style="color:var(--lava-orange)"><?php esc_html_e( 'un espacio', 'maach' ); ?></span>
				</h2>
			</div>
			<span class="maach-mono" style="color:var(--sand-grey);max-width:380px">
				<?php esc_html_e( 'Del primer plano arquitectónico a la instalación final, en cuatro fases.', 'maach' ); ?>
			</span>
		</div>

		<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:32px">
			<?php
			$maach_fases = array(
				array( '01', __( 'Diagnóstico', 'maach' ), __( 'Levantamos el espacio existente, analizamos flujos de trabajo y entrevistamos al equipo para entender el uso real.', 'maach' ) ),
				array( '02', __( 'Diseño', 'maach' ), __( 'Propuestas de layout, render 3D y selección de tipologías MAACH. Iteramos con arquitectos e interioristas.', 'maach' ) ),
				array( '03', __( 'Especificación', 'maach' ), __( 'Fichas técnicas, planos CAD/BIM y cuantificación final. Cero ambigüedad en lo que se va a instalar.', 'maach' ) ),
				array( '04', __( 'Instalación', 'maach' ), __( 'Logística, montaje y puesta a punto. Equipo propio MAACH coordinado con la obra y el cliente.', 'maach' ) ),
			);
			foreach ( $maach_fases as $maach_f ) :
				?>
				<div style="border-top:2px solid var(--lava-orange);padding-top:24px">
					<span style="font-family:var(--display);font-weight:700;font-size:56px;line-height:1;letter-spacing:-.02em;color:var(--lava-orange);display:block;margin-bottom:24px"><?php echo esc_html( $maach_f[0] ); ?></span>
					<h3 style="font-family:var(--display);font-size:26px;line-height:1.05;letter-spacing:-.01em;text-transform:uppercase;margin-bottom:14px;color:var(--off-white)"><?php echo esc_html( $maach_f[1] ); ?></h3>
					<p style="font-size:14px;color:var(--sand-grey);line-height:1.55"><?php echo esc_html( $maach_f[2] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- ENTREGABLES -->
<section style="padding:96px 0;border-bottom:1px solid var(--line)">
	<div class="maach-container">
		<div style="margin-bottom:40px">
			<span class="maach-mono" style="color:var(--muted);display:block;margin-bottom:12px"><?php esc_html_e( 'Entregables', 'maach' ); ?></span>
			<h2 class="h-display" style="font-size:clamp(32px,4vw,56px);line-height:.95;letter-spacing:-.01em;margin:0"><?php esc_html_e( 'Qué entregamos', 'maach' ); ?></h2>
		</div>
		<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:0;border:1px solid var(--line)">
			<?php
			$maach_entregables = array(
				__( 'Levantamiento de espacio', 'maach' ),
				__( 'Plano arquitectónico', 'maach' ),
				__( 'Render 3D fotorrealista', 'maach' ),
				__( 'Selección de mobiliario', 'maach' ),
				__( 'Planos CAD / BIM', 'maach' ),
				__( 'Instalación llave en mano', 'maach' ),
			);
			foreach ( $maach_entregables as $maach_i => $maach_e ) :
				?>
				<div style="padding:32px 24px;<?php echo 5 === $maach_i ? '' : 'border-right:1px solid var(--line);'; ?>min-height:160px;display:flex;flex-direction:column;justify-content:space-between">
					<span class="maach-mono" style="color:var(--lava-orange);font-size:12px;font-weight:700"><?php echo esc_html( str_pad( (string) ( $maach_i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
					<span style="font-family:var(--display);font-weight:600;font-size:17px;line-height:1.15;text-transform:uppercase;letter-spacing:-.005em"><?php echo esc_html( $maach_e ); ?></span>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- CTA -->
<?php $maach_contacto = get_page_by_path( 'contacto' ); ?>
<section style="background:var(--lava-orange);color:var(--off-white);padding:120px 0;position:relative;overflow:hidden">
	<div aria-hidden="true" style="position:absolute;top:24px;right:24px;width:22px;height:22px;border-top:2px solid var(--off-white);border-right:2px solid var(--off-white);opacity:.8"></div>
	<div aria-hidden="true" style="position:absolute;bottom:24px;left:24px;width:22px;height:22px;border-bottom:2px solid var(--off-white);border-left:2px solid var(--off-white);opacity:.8"></div>
	<div class="maach-container" style="position:relative">
		<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:80px;align-items:center">
			<div>
				<span class="maach-mono" style="color:var(--jet-black);display:block;margin-bottom:16px"><?php esc_html_e( 'Asesoría especializada', 'maach' ); ?></span>
				<h2 class="h-display" style="font-size:clamp(48px,7vw,90px);color:var(--off-white);margin-bottom:24px;line-height:.95">
					<?php esc_html_e( '¿Necesitas', 'maach' ); ?>
					<span class="h-italic" style="color:var(--jet-black)"><?php esc_html_e( 'planificar', 'maach' ); ?></span>
					<?php esc_html_e( 'un espacio?', 'maach' ); ?>
				</h2>
				<p style="color:rgba(255,255,255,.92);font-size:18px;max-width:560px;line-height:1.5">
					<?php esc_html_e( 'Trabajamos junto a arquitectos e interioristas. Compartimos planos arquitectónicos, render 3D y propuestas de mobiliario integradas.', 'maach' ); ?>
				</p>
			</div>
			<div style="display:flex;flex-direction:column;gap:12px">
				<a href="<?php echo esc_url( $maach_contacto ? get_permalink( $maach_contacto ) : home_url( '/' ) ); ?>" class="btn-primary"
					style="width:100%;justify-content:space-between;padding:20px 28px;background:var(--jet-black);color:var(--off-white);border:1.5px solid var(--jet-black)">
					<?php esc_html_e( 'Iniciar planificación', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
				</a>
				<a href="<?php echo esc_url( get_post_type_archive_link( 'maach_proyecto' ) ); ?>" class="btn-ghost"
					style="width:100%;justify-content:space-between;padding:20px 28px;background:transparent;color:var(--off-white);border:1.5px solid var(--off-white)">
					<?php esc_html_e( 'Ver casos de estudio', 'maach' ); ?><?php maach_icono( 'arrow', 14 ); ?>
				</a>
				<div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(22,22,22,.25);display:flex;justify-content:space-between;align-items:center">
					<span class="maach-mono" style="color:rgba(22,22,22,.8)"><?php esc_html_e( 'Respuesta en', 'maach' ); ?></span>
					<span style="font-family:var(--display);font-weight:700;font-size:32px;color:var(--jet-black);letter-spacing:-.02em">&lt; 24 hrs</span>
				</div>
			</div>
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
