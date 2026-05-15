import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';
import { BLOGS } from '../data/blogs';

export default function PageInvestigacion() {
  return (
    <Layout screenLabel="10 Investigación">
      {/* HERO — full-bleed background, brand-book style */}
      <section
        className="invert"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'flex-end',
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <img
          src={asset('proyectos/palladium/02.webp')}
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(22,22,22,.35) 0%, rgba(22,22,22,.1) 25%, rgba(22,22,22,.5) 55%, rgba(22,22,22,.92) 100%)',
            zIndex: 1,
          }}
        />
        {/* Top header strip */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 48,
            right: 48,
            zIndex: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className="maach-mono" style={{ color: 'var(--lava-orange)' }}>
            MAACH · WORK INSIGHTS 2026
          </span>
          <span className="maach-mono" style={{ color: 'var(--off-white)' }}>
            § 10 / Investigación
          </span>
        </div>
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
            zIndex: 3,
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
            zIndex: 3,
          }}
        />

        <div
          className="maach-container"
          style={{ position: 'relative', zIndex: 3, width: '100%', paddingTop: 64, paddingBottom: 64 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'end' }}>
            <div style={{ display: 'grid', gap: 32 }}>
              <h1
                className="h-display"
                style={{
                  fontSize: 'clamp(56px, 9vw, 144px)',
                  margin: 0,
                  color: 'var(--off-white)',
                  lineHeight: 0.92,
                }}
              >
                Investigación<br />
                <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>y contexto.</span>
              </h1>
              <p
                style={{
                  fontSize: 20,
                  color: 'var(--off-white)',
                  lineHeight: 1.5,
                  maxWidth: 560,
                  margin: 0,
                }}
              >
                El diseño de nuestro mobiliario no surge de la intuición, sino de la observación sistemática y el
                análisis de cómo cambian las dinámicas laborales a nivel global.
              </p>
            </div>

            {/* Quote card — sits on top of the photo */}
            <div
              style={{
                background: 'rgba(228,226,227,.06)',
                border: '1px solid rgba(228,226,227,.25)',
                padding: 40,
                position: 'relative',
                backdropFilter: 'blur(6px)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 24,
                  fontFamily: 'var(--display)',
                  fontSize: 80,
                  color: 'var(--lava-orange)',
                  lineHeight: 1,
                  letterSpacing: '-.04em',
                }}
              >
                "
              </span>
              <div
                style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 600,
                  fontSize: 28,
                  lineHeight: 1.15,
                  marginBottom: 20,
                  letterSpacing: '-.01em',
                  color: 'var(--off-white)',
                }}
              >
                68% de las oficinas hoy requieren configuraciones adaptables a equipos híbridos.
              </div>
              <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
                — Reporte MAACH Work Insights 2025
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG LIST */}
      <section style={{ padding: '112px 0', borderBottom: '1px solid var(--line)' }}>
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
                § Editorial · MAACH Research
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}>
                Lecturas <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>recomendadas.</span>
              </h2>
            </div>
            <span className="maach-mono" style={{ color: 'var(--muted)' }}>
              03 artículos · MAACH 2026
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {BLOGS.map((b) => (
              <Link
                key={b.slug}
                to={`/investigacion/${b.slug}`}
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    border: '1px solid var(--line)',
                    marginBottom: 20,
                    background: 'var(--surface)',
                  }}
                >
                  <img
                    src={asset(b.img)}
                    alt=""
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform .8s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                  />
                  <span
                    className="maach-mono"
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      background: 'var(--jet-black)',
                      color: 'var(--off-white)',
                      padding: '5px 10px',
                    }}
                  >
                    BLOG · {b.number}
                  </span>
                  <span
                    className="maach-mono"
                    style={{
                      position: 'absolute',
                      bottom: 14,
                      right: 14,
                      background: 'var(--lava-orange)',
                      color: 'var(--off-white)',
                      padding: '5px 10px',
                    }}
                  >
                    {b.readTime}
                  </span>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span className="maach-mono" style={{ color: 'var(--lava-orange)', marginBottom: 12 }}>
                    {b.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--display)',
                      fontWeight: 600,
                      fontSize: 28,
                      lineHeight: 1.05,
                      letterSpacing: '-.01em',
                      textTransform: 'uppercase',
                      marginBottom: 16,
                    }}
                  >
                    {b.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 24 }}>
                    {b.intro.length > 180 ? b.intro.slice(0, 180).trimEnd() + '…' : b.intro}
                  </p>

                  <span
                    className="maach-mono"
                    style={{
                      marginTop: 'auto',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      paddingBottom: 4,
                      borderBottom: '1.5px solid var(--fg)',
                      alignSelf: 'flex-start',
                    }}
                  >
                    Leer artículo <IconArrow size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE BAND */}
      <section
        className="invert"
        style={{
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          padding: '128px 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="tex-load-line"
          style={{ position: 'absolute', inset: 0, color: 'var(--off-white)', pointerEvents: 'none' }}
        />
        <div className="maach-container" style={{ position: 'relative', maxWidth: 1100 }}>
          <span className="maach-mono" style={{ color: 'var(--sand-grey)', display: 'block', marginBottom: 24 }}>
            Manifiesto · MAACH 2026
          </span>
          <h2
            className="h-display"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)', color: 'var(--off-white)', lineHeight: 1.1 }}
          >
            "Investigamos el trabajo real para diseñar
            <span style={{ color: 'var(--lava-orange)' }}> mobiliario que responda</span> a sus exigencias verdaderas — no a tendencias estéticas."
          </h2>
          <span className="maach-mono" style={{ color: 'var(--sand-grey)', marginTop: 32, display: 'block' }}>
            — Equipo MAACH Research
          </span>
        </div>
      </section>
    </Layout>
  );
}
