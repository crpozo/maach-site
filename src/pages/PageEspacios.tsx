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
      <section
        style={{
          background: 'var(--soft)',
          padding: '128px 0 96px',
          borderBottom: '1px solid var(--line)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Orange L crosshair */}
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
        <div className="maach-container" style={{ position: 'relative', textAlign: 'center' }}>
          <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
            § Planificación
          </span>
          <h1 className="h-display" style={{ fontSize: 'clamp(64px, 10vw, 184px)', marginBottom: 32 }}>
            Es<span className="h-italic" style={{ color: 'var(--lava-orange)' }}>pacios.</span>
          </h1>
          <p style={{ fontSize: 22, color: 'var(--muted)', maxWidth: 720, margin: '0 auto', lineHeight: 1.45 }}>
            Soluciones integrales que transforman metros cuadrados en entornos productivos, coherentes y listos para
            escalar.
          </p>
        </div>
      </section>

      {spaces.map((s, i) => (
        <section
          key={s.id}
          style={{
            padding: '112px 0',
            background: i % 2 === 0 ? 'var(--off-white)' : 'var(--soft)',
            borderBottom: '1px solid var(--line)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="maach-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.1fr',
                gap: 80,
                alignItems: 'center',
                direction: i % 2 === 0 ? 'ltr' : 'rtl',
              }}
            >
              <div style={{ direction: 'ltr' }}>
                <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
                  {s.id} / TIPOLOGÍA
                </span>
                <h2 className="h-display" style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', marginBottom: 32 }}>
                  {s.title}.
                </h2>
                <p style={{ fontSize: 18, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 40, maxWidth: 520 }}>
                  {s.desc}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    marginBottom: 40,
                    maxWidth: 480,
                  }}
                >
                  {[
                    { l: 'Sistemas modulares', n: '12' },
                    { l: 'Productos utilizados', n: '26' },
                    { l: 'Configuraciones', n: '48' },
                    { l: 'Acabados', n: '9' },
                  ].map((b) => (
                    <div key={b.l} style={{ border: '1px solid var(--line)', padding: 20, background: 'var(--off-white)' }}>
                      <div
                        style={{
                          fontFamily: 'var(--display)',
                          fontWeight: 700,
                          fontSize: 32,
                          lineHeight: 1,
                          marginBottom: 4,
                        }}
                      >
                        {b.n}
                      </div>
                      <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                        {b.l}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/productos"
                  className="maach-mono"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    borderBottom: '1.5px solid var(--fg)',
                    paddingBottom: 4,
                  }}
                >
                  Ver productos relacionados <IconArrow size={14} />
                </Link>
              </div>

              <div
                style={{
                  direction: 'ltr',
                  position: 'relative',
                  aspectRatio: '4/3',
                  border: '1px solid var(--line)',
                  overflow: 'hidden',
                }}
              >
                <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div
                  className={s.tex}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    color: 'var(--off-white)',
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none',
                  }}
                />
                <span
                  className="maach-mono"
                  style={{ position: 'absolute', top: 16, left: 16, background: 'var(--off-white)', padding: '5px 10px' }}
                >
                  RENDER_ESPACIO_{s.id}
                </span>
                <span
                  className="maach-mono"
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    background: 'var(--jet-black)',
                    color: 'var(--off-white)',
                    padding: '5px 10px',
                  }}
                >
                  ESC 1:50
                </span>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section style={{ padding: '112px 0' }}>
        <div className="maach-container">
          <div
            style={{
              border: '1px solid var(--line)',
              padding: '80px 64px',
              background: 'var(--off-white)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="tex-load-line" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 16 }}>
                Asesoría especializada
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 88px)', marginBottom: 24 }}>
                ¿Necesitas planificar un espacio?
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.55 }}>
                Trabajamos junto a arquitectos e interioristas. Compartimos planos arquitectónicos, render 3D y
                propuestas de mobiliario integradas.
              </p>
              <Link to="/contacto" className="btn-primary">
                Iniciar planificación <IconArrow size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
