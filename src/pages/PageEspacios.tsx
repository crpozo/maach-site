import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';

export default function PageEspacios() {
  const spaces = [
    { id: '01', title: 'Áreas Operativas', desc: 'Sistemas bench y estaciones de alta densidad. Maximizan el área por usuario sin sacrificar la ergonomía individual ni la productividad.', tex: 'tex-stack-force', img: asset('biblioteca-2.webp') },
    { id: '02', title: 'Salas de Juntas', desc: 'Mesas ejecutivas y modulares con integración tecnológica oculta. Preparadas para reuniones presenciales e híbridas.', tex: 'tex-load-line', img: asset('biblioteca-3.webp') },
    { id: '03', title: 'Zonas Lounge & Colaborativas', desc: 'Mobiliario flexible que fomenta la interacción espontánea y el trabajo ágil fuera del escritorio tradicional.', tex: 'tex-tactile-field', img: asset('biblioteca-4.webp') },
    { id: '04', title: 'Oficinas Privadas & Directivas', desc: 'Soluciones de carácter institucional. Escritorios, sillería y almacenamiento ejecutivo para liderazgo y áreas confidenciales.', tex: 'tex-forged-grid', img: asset('biblioteca-1.webp') },
  ];

  return (
    <Layout screenLabel="07 Espacios">
      {/* HERO — 2-column editorial */}
      <section
        style={{
          padding: '64px 0',
          borderBottom: '1px solid var(--line)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Orange edge bar */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 6,
            background: 'var(--lava-orange)',
            zIndex: 1,
          }}
        />
        {/* Rotated label */}
        <span
          aria-hidden
          className="maach-mono"
          style={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'rotate(-90deg) translateX(50%)',
            transformOrigin: 'left center',
            color: 'var(--lava-orange)',
            letterSpacing: '.32em',
            fontWeight: 700,
            zIndex: 1,
          }}
        >
          PLANIFICACIÓN · 2026
        </span>
        {/* Corner crosshairs */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            width: 22,
            height: 22,
            borderTop: '2px solid var(--lava-orange)',
            borderRight: '2px solid var(--lava-orange)',
            zIndex: 1,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            width: 22,
            height: 22,
            borderBottom: '2px solid var(--lava-orange)',
            borderRight: '2px solid var(--lava-orange)',
            zIndex: 1,
          }}
        />

        <div className="maach-container" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1400 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            {/* LEFT: text */}
            <div>
              <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
                § Planificación
              </span>
              <h1 className="h-display" style={{ fontSize: 'clamp(56px, 7.5vw, 128px)', marginBottom: 32 }}>
                Es<span className="h-italic" style={{ color: 'var(--lava-orange)' }}>pacios.</span>
              </h1>
              <p style={{ fontSize: 20, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 48 }}>
                Soluciones integrales que transforman metros cuadrados en entornos productivos, coherentes y listos
                para escalar.
              </p>

              {/* Stat row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 24,
                  paddingTop: 28,
                  borderTop: '1px solid var(--line)',
                }}
              >
                {[
                  { n: '04', l: 'Tipologías' },
                  { n: '12', l: 'Sistemas' },
                  { n: '48', l: 'Configs.' },
                  { n: '09', l: 'Acabados' },
                ].map((s) => (
                  <div key={s.l}>
                    <div
                      style={{
                        fontFamily: 'var(--display)',
                        fontWeight: 700,
                        fontSize: 36,
                        lineHeight: 1,
                        marginBottom: 6,
                        color: 'var(--lava-orange)',
                        letterSpacing: '-.02em',
                      }}
                    >
                      {s.n}
                    </div>
                    <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                      {s.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: tall photo */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                maxHeight: 'calc(100vh - 200px)',
                border: '1px solid var(--line)',
                overflow: 'hidden',
                background: 'var(--surface)',
              }}
            >
              <img
                src={asset('biblioteca-2.webp')}
                alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(22,22,22,.25) 0%, rgba(22,22,22,0) 30%, rgba(22,22,22,0) 60%, rgba(22,22,22,.65) 100%)',
                }}
              />
              <span
                className="maach-mono"
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  background: 'var(--off-white)',
                  color: 'var(--jet-black)',
                  padding: '6px 10px',
                }}
              >
                RENDER · ÁREA OPERATIVA
              </span>
              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, color: 'var(--off-white)' }}>
                <span className="maach-mono" style={{ color: 'var(--sand-grey)', display: 'block', marginBottom: 8 }}>
                  ESC 1:50 · MAACH SISTEMA
                </span>
                <h2
                  className="h-display"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'var(--off-white)', margin: 0 }}
                >
                  Áreas Operativas.
                </h2>
              </div>
              {/* Orange L corner on image */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  width: 18,
                  height: 18,
                  borderTop: '2px solid var(--lava-orange)',
                  borderRight: '2px solid var(--lava-orange)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* TYPOLOGIES — 2x2 cinematic grid */}
      <section style={{ padding: '128px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 56,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
                § 01 / Tipologías
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6.5vw, 96px)' }}>
                Cuatro <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>tipologías.</span>
              </h2>
            </div>
            <span className="maach-mono" style={{ color: 'var(--muted)' }}>
              04 espacios · Sistema MAACH
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {spaces.map((s) => (
              <Link
                key={s.id}
                to="/productos"
                className="invert"
                style={{
                  position: 'relative',
                  display: 'block',
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  background: 'var(--jet-black)',
                  color: 'var(--off-white)',
                  border: '1px solid var(--line)',
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector<HTMLImageElement>('img[data-typology-bg]');
                  if (img) img.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector<HTMLImageElement>('img[data-typology-bg]');
                  if (img) img.style.transform = '';
                }}
              >
                <img
                  src={s.img}
                  alt=""
                  data-typology-bg
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 1.2s ease',
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(22,22,22,.2) 0%, rgba(22,22,22,0) 30%, rgba(22,22,22,.6) 75%, rgba(22,22,22,.9) 100%)',
                  }}
                />

                {/* Top chips */}
                <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: 8 }}>
                  <span
                    className="maach-mono"
                    style={{ background: 'var(--off-white)', color: 'var(--jet-black)', padding: '5px 10px' }}
                  >
                    {s.id} / TIPOLOGÍA
                  </span>
                  <span
                    className="maach-mono"
                    style={{ background: 'var(--lava-orange)', color: 'var(--off-white)', padding: '5px 10px' }}
                  >
                    ESC 1:50
                  </span>
                </div>

                {/* Orange L corner */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    width: 18,
                    height: 18,
                    borderTop: '2px solid var(--lava-orange)',
                    borderRight: '2px solid var(--lava-orange)',
                  }}
                />

                {/* Bottom content */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 28,
                    left: 28,
                    right: 28,
                    color: 'var(--off-white)',
                  }}
                >
                  <h3
                    className="h-display"
                    style={{
                      fontSize: 'clamp(28px, 3.4vw, 44px)',
                      color: 'var(--off-white)',
                      lineHeight: 1,
                      marginBottom: 12,
                    }}
                  >
                    {s.title}.
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--sand-grey)',
                      lineHeight: 1.5,
                      maxWidth: 480,
                      marginBottom: 16,
                    }}
                  >
                    {s.desc}
                  </p>
                  <span
                    className="maach-mono"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      color: 'var(--lava-orange)',
                      paddingBottom: 4,
                      borderBottom: '1.5px solid var(--lava-orange)',
                    }}
                  >
                    Ver productos <IconArrow size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — black band, 4 steps */}
      <section
        className="invert"
        style={{
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          padding: '128px 0',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          className="tex-load-line"
          style={{ position: 'absolute', inset: 0, color: 'var(--off-white)', pointerEvents: 'none' }}
        />
        <div className="maach-container" style={{ position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 64,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 12 }}>
                § 02 / Proceso
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6.5vw, 96px)' }}>
                Cómo planificamos<br />
                <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>un espacio.</span>
              </h2>
            </div>
            <span className="maach-mono" style={{ color: 'var(--sand-grey)', maxWidth: 380 }}>
              Del primer plano arquitectónico a la instalación final, en cuatro fases.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {[
              {
                n: '01',
                title: 'Diagnóstico',
                body: 'Levantamos el espacio existente, analizamos flujos de trabajo y entrevistamos al equipo para entender el uso real.',
              },
              {
                n: '02',
                title: 'Diseño',
                body: 'Propuestas de layout, render 3D y selección de tipologías MAACH. Iteramos con arquitectos e interioristas.',
              },
              {
                n: '03',
                title: 'Especificación',
                body: 'Fichas técnicas, planos CAD/BIM y cuantificación final. Cero ambigüedad en lo que se va a instalar.',
              },
              {
                n: '04',
                title: 'Instalación',
                body: 'Logística, montaje y puesta a punto. Equipo propio MAACH coordinado con la obra y el cliente.',
              },
            ].map((p) => (
              <div key={p.n} style={{ borderTop: '2px solid var(--lava-orange)', paddingTop: 24 }}>
                <span
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 56,
                    lineHeight: 1,
                    letterSpacing: '-.02em',
                    color: 'var(--lava-orange)',
                    display: 'block',
                    marginBottom: 24,
                  }}
                >
                  {p.n}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 600,
                    fontSize: 26,
                    lineHeight: 1.05,
                    letterSpacing: '-.01em',
                    textTransform: 'uppercase',
                    marginBottom: 14,
                    color: 'var(--off-white)',
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--sand-grey)', lineHeight: 1.55 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES strip */}
      <section style={{ padding: '96px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div style={{ marginBottom: 40 }}>
            <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
              § 03 / Entregables
            </span>
            <h2 className="h-display" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
              Qué entregamos.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0, border: '1px solid var(--line)' }}>
            {[
              'Levantamiento de espacio',
              'Plano arquitectónico',
              'Render 3D fotorrealista',
              'Selección de mobiliario',
              'Planos CAD / BIM',
              'Instalación llave en mano',
            ].map((d, i) => (
              <div
                key={d}
                style={{
                  padding: '32px 24px',
                  borderRight: (i + 1) % 6 === 0 ? 0 : '1px solid var(--line)',
                  minHeight: 160,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  className="maach-mono"
                  style={{ color: 'var(--lava-orange)', fontSize: 12, fontWeight: 700 }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 600,
                    fontSize: 17,
                    lineHeight: 1.15,
                    textTransform: 'uppercase',
                    letterSpacing: '-.005em',
                  }}
                >
                  {d}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — black band, brand-book style */}
      <section
        className="invert"
        style={{
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          padding: '120px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            width: 22,
            height: 22,
            borderTop: '2px solid var(--lava-orange)',
            borderRight: '2px solid var(--lava-orange)',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            width: 22,
            height: 22,
            borderBottom: '2px solid var(--lava-orange)',
            borderLeft: '2px solid var(--lava-orange)',
          }}
        />
        <div className="maach-container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
                § Asesoría especializada
              </span>
              <h2
                className="h-display"
                style={{
                  fontSize: 'clamp(48px, 7vw, 120px)',
                  color: 'var(--off-white)',
                  marginBottom: 24,
                  lineHeight: 0.95,
                }}
              >
                ¿Necesitas <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>planificar</span> un espacio?
              </h2>
              <p style={{ color: 'var(--sand-grey)', fontSize: 18, maxWidth: 560, lineHeight: 1.5 }}>
                Trabajamos junto a arquitectos e interioristas. Compartimos planos arquitectónicos, render 3D y
                propuestas de mobiliario integradas.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link
                to="/contacto"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'space-between', padding: '20px 28px' }}
              >
                Iniciar planificación <IconArrow size={14} />
              </Link>
              <Link
                to="/portafolio"
                className="btn-ghost"
                style={{ width: '100%', justifyContent: 'space-between', padding: '20px 28px' }}
              >
                Ver casos de estudio <IconArrow size={14} />
              </Link>
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: '1px solid rgba(228,226,227,.18)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
                  Respuesta en
                </span>
                <span
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 32,
                    color: 'var(--lava-orange)',
                    letterSpacing: '-.02em',
                  }}
                >
                  &lt; 24 hrs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
