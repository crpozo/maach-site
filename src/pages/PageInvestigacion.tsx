import { Layout } from '../components/Layout';
import {
  IconArrow,
  IconBook,
  IconChart,
  IconChevronDown,
  IconUsers,
} from '../components/icons';

export default function PageInvestigacion() {
  return (
    <Layout screenLabel="10 Investigación">
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
        <div className="maach-container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
                § MAACH Work Insights
              </span>
              <h1 className="h-display" style={{ fontSize: 'clamp(56px, 9vw, 144px)', marginBottom: 32 }}>
                Investigación<br />
                <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>y contexto.</span>
              </h1>
              <p style={{ fontSize: 20, color: 'var(--muted)', lineHeight: 1.5 }}>
                El diseño de nuestro mobiliario no surge de la intuición, sino de la observación sistemática y el
                análisis de cómo cambian las dinámicas laborales a nivel global.
              </p>
            </div>

            <div
              style={{
                background: 'var(--off-white)',
                border: '1px solid var(--line)',
                padding: 56,
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 24,
                  right: 32,
                  fontFamily: 'var(--display)',
                  fontSize: 96,
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
                  fontSize: 36,
                  lineHeight: 1.1,
                  marginBottom: 24,
                  letterSpacing: '-.01em',
                }}
              >
                68% de las oficinas hoy requieren configuraciones adaptables a equipos híbridos.
              </div>
              <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                — Reporte MAACH Work Insights 2025
              </span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '112px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div style={{ marginBottom: 56 }}>
            <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
              § 01 / Áreas de estudio
            </span>
            <h2 className="h-display" style={{ fontSize: 64 }}>
              Pilares de investigación.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { icon: <IconUsers size={32} />, title: 'Sociología del trabajo', desc: 'Estudio de interacciones humanas, necesidades de privacidad vs. colaboración, y bienestar cognitivo en el espacio físico.', n: '01' },
              { icon: <IconChart size={32} />, title: 'Métricas de ocupación', desc: 'Análisis de densidad de planos, tasas de utilización de escritorios y eficiencia métrica de los espacios instalados.', n: '02' },
              { icon: <IconBook size={32} />, title: 'Ergonomía aplicada', desc: 'Desarrollo continuo en biomecánica y posturas de trabajo prolongadas frente a pantallas para guiar el diseño de asientos y mesas.', n: '03' },
            ].map((p) => (
              <div key={p.n} style={{ borderTop: '2px solid var(--jet-black)', padding: '32px 0' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 32,
                  }}
                >
                  {p.icon}
                  <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                    {p.n} / PILAR
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 600,
                    fontSize: 32,
                    textTransform: 'uppercase',
                    letterSpacing: '-.01em',
                    lineHeight: 1.05,
                    marginBottom: 16,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.55 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '112px 0', background: 'var(--soft)' }}>
        <div className="maach-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 48,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
                § 02 / Reportes y publicaciones
              </span>
              <h2 className="h-display" style={{ fontSize: 64 }}>
                Whitepapers.
              </h2>
            </div>
            <div
              className="maach-mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid var(--line)',
                padding: '10px 16px',
              }}
            >
              Filtrar por año <IconChevronDown size={10} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { tag: 'WHITEPAPER', title: 'El futuro del espacio de concentración individual', date: 'Octubre 2025', read: '12 min', desc: 'Análisis cualitativo sobre la necesidad de cabinas acústicas y paneles divisorios en plantas de formato abierto.' },
              { tag: 'REPORTE', title: 'Densidad y bienestar en plantas operativas', date: 'Julio 2025', read: '08 min', desc: 'Cómo la métrica de m²/usuario se relaciona con percepción de bienestar y productividad sostenida.' },
              { tag: 'ESTUDIO', title: 'Adopción del escritorio regulable en LATAM', date: 'Mayo 2025', read: '15 min', desc: 'Datos de implementación, retorno de inversión y cambio cultural en compañías mexicanas y colombianas.' },
              { tag: 'ENSAYO', title: 'Materiales que envejecen bien', date: 'Marzo 2025', read: '06 min', desc: 'Sobre la elección de materialidades resistentes al uso intensivo en entornos corporativos.' },
            ].map((paper, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  background: 'var(--off-white)',
                  border: '1px solid var(--line)',
                  padding: '28px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 32,
                  transition: 'border-color .2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--jet-black)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
              >
                <div style={{ width: 140, flexShrink: 0 }}>
                  <span
                    className="maach-mono"
                    style={{ background: 'var(--jet-black)', color: 'var(--off-white)', padding: '4px 8px' }}
                  >
                    {paper.tag}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--display)',
                      fontWeight: 600,
                      fontSize: 24,
                      textTransform: 'uppercase',
                      letterSpacing: '-.01em',
                      marginBottom: 6,
                    }}
                  >
                    {paper.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5, maxWidth: 720 }}>{paper.desc}</p>
                </div>

                <div style={{ width: 160, flexShrink: 0, textAlign: 'right' }} className="maach-mono">
                  <div style={{ color: 'var(--muted)', marginBottom: 4 }}>{paper.date}</div>
                  <div style={{ color: 'var(--lava-orange)' }}>{paper.read}</div>
                </div>

                <div
                  style={{
                    width: 44,
                    height: 44,
                    border: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <IconArrow size={14} rotate={-45} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

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
