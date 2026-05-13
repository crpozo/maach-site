import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';

export default function PageAbout() {
  return (
    <Layout screenLabel="12 Sobre MAACH">
      {/* BRANDBOOK-STYLE HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
        {/* Editorial photo with overlays */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '16/8',
            minHeight: 600,
            maxHeight: 820,
            overflow: 'hidden',
            background: 'var(--soft)',
          }}
        >
          <img
            src={asset("biblioteca-5.webp")}
            alt="MAACH"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(22,22,22,.6), rgba(22,22,22,.2) 45%, rgba(22,22,22,.05) 75%, transparent)',
            }}
          />

          {/* Top header strip */}
          <div
            style={{
              position: 'absolute',
              top: 28,
              left: 48,
              right: 48,
              zIndex: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'var(--off-white)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: 0,
                color: 'var(--lava-orange)',
                textTransform: 'uppercase',
              }}
            >
              MAACH
            </span>
            <span className="maach-mono" style={{ color: 'var(--off-white)' }}>
              Brandbook
            </span>
            <span className="maach-mono" style={{ color: 'var(--off-white)' }}>
              Estratégia de Marca
            </span>
          </div>

          {/* Headline top-left */}
          <div style={{ position: 'absolute', top: 96, left: 48, right: 48 }}>
            <h1
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.6vw, 52px)',
                lineHeight: 1.1,
                letterSpacing: '-.01em',
                textTransform: 'none',
                maxWidth: 880,
                color: 'var(--off-white)',
                margin: 0,
              }}
            >
              Diseñar y fabricar mobiliario<br />
              que funcione en el trabajo real.
            </h1>
          </div>

          {/* Body copy bottom-left, 2 columns mono */}
          <div
            style={{
              position: 'absolute',
              bottom: 56,
              left: 48,
              right: 48,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 32,
              maxWidth: 920,
              color: 'var(--off-white)',
            }}
          >
            <p style={{ fontFamily: 'var(--mono)', fontSize: 14, lineHeight: 1.65, letterSpacing: '.01em', margin: 0 }}>
              MAACH existe para diseñar, fabricar y desarrollar mobiliario corporativo a partir de procesos
              industriales sólidos, criterios de ingeniería y una comprensión profunda del uso real en los espacios
              de trabajo. La marca transforma la fabricación en un sistema de diseño funcional, donde cada decisión
              responde a estructura, ergonomía, durabilidad y desempeño en el tiempo.
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 14, lineHeight: 1.65, letterSpacing: '.01em', margin: 0 }}>
              A través del co-diseño con arquitectos, interioristas y clientes, MAACH crea soluciones adaptables que
              integran materiales, tecnología y producción local con estándares internacionales. Su propósito es
              equipar entornos de trabajo eficientes, coherentes y preparados para evolucionar, asegurando productos
              que se validan en el uso cotidiano, la productividad y la experiencia de las personas.
            </p>
          </div>

          {/* Orange L corner mark bottom-right */}
          <div
            style={{
              position: 'absolute',
              bottom: 80,
              right: 80,
              width: 28,
              height: 28,
              borderLeft: '2px solid var(--lava-orange)',
              borderBottom: '2px solid var(--lava-orange)',
            }}
          />
        </div>

        {/* PROPÓSITO DE MARCA black band */}
        <div
          className="invert"
          style={{
            background: 'var(--jet-black)',
            color: 'var(--off-white)',
            padding: '44px 48px 56px',
            display: 'grid',
            gridTemplateColumns: '1.4fr auto 1.6fr',
            gap: 48,
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <h2
            style={{
              color: 'var(--lava-orange)',
              fontFamily: 'var(--display)',
              fontWeight: 700,
              fontSize: 'clamp(40px, 5.5vw, 80px)',
              lineHeight: 0.95,
              letterSpacing: '-.01em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Propósito<br />
            De&nbsp;&nbsp;Marca
          </h2>

          <IconArrow size={48} rotate={-45} style={{ color: 'var(--off-white)' }} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 32,
              fontSize: 15,
              lineHeight: 1.6,
              color: 'var(--off-white)',
            }}
          >
            <p style={{ margin: 0 }}>
              El propósito de marca en MAACH funciona como un criterio rector que guía de forma consistente las
              decisiones de diseño, fabricación y comunicación. Establece una lógica clara basada en el desempeño y
              el uso real, asegurando coherencia entre el producto, la identidad visual y el mensaje de la marca. Al
              mismo tiempo, permite alinear a los equipos
            </p>
            <p style={{ margin: 0 }}>
              internos y aliados estratégicos bajo una misma forma de trabajar, facilitando la toma de decisiones y
              la evolución del portafolio. Más que una declaración conceptual, el propósito ayuda a MAACH a
              diferenciarse en el mercado, sostener su identidad en el tiempo y construir una marca sólida,
              funcional y preparada para escalar.
            </p>
          </div>

          {/* AA monogram bottom-right */}
          <span
            style={{
              position: 'absolute',
              bottom: 14,
              right: 48,
              color: 'var(--lava-orange)',
              fontFamily: 'var(--display)',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '-.04em',
            }}
          >
            AA
          </span>
        </div>

        {/* Page footer strip */}
        <div
          style={{
            background: 'var(--jet-black)',
            color: 'var(--sand-grey)',
            padding: '14px 48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(228,226,227,.18)',
          }}
        >
          <span className="maach-mono">2026</span>
          <span className="maach-mono">Mess Studio</span>
          <span
            className="maach-mono"
            style={{
              background: 'var(--lava-orange)',
              color: 'var(--off-white)',
              padding: '4px 8px',
              letterSpacing: '.08em',
            }}
          >
            PÁGINA 0000.
          </span>
        </div>
      </section>

      <section style={{ padding: '128px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div style={{ marginBottom: 64 }}>
            <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
              § 01 / Valores
            </span>
            <h2 className="h-display" style={{ fontSize: 'clamp(56px, 8vw, 128px)' }}>
              Cómo trabajamos.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 0,
              border: '1px solid var(--line)',
            }}
          >
            {[
              { n: '01', title: 'Diseño funcional', body: 'Cada decisión de diseño responde a una necesidad real de uso. La forma existe para cumplir una función y mejorar el desempeño del trabajo cotidiano.' },
              { n: '02', title: 'Ingeniería aplicada', body: 'La marca se construye desde procesos industriales sólidos, precisión técnica y control productivo. La ingeniería garantiza durabilidad y consistencia.' },
              { n: '03', title: 'Co-diseño colaborativo', body: 'MAACH trabaja junto a arquitectos, interioristas y clientes para desarrollar soluciones adaptables. El diseño es un proceso compartido.' },
              { n: '04', title: 'Calidad que perdura', body: 'Productos pensados para resistir el uso intensivo y mantenerse vigentes en el tiempo. La durabilidad es criterio central en materiales y construcción.' },
              { n: '05', title: 'Ergonomía y bienestar', body: 'El mobiliario se diseña considerando la relación entre cuerpo, espacio y trabajo. Confort y experiencia de uso son parte del desempeño.' },
              { n: '06', title: 'Fabricación con visión', body: 'Integramos producción local con estándares internacionales, combinando eficiencia, tecnología y responsabilidad para las exigencias actuales.' },
            ].map((v, i) => (
              <div
                key={v.n}
                style={{
                  padding: '40px 32px',
                  borderRight: (i + 1) % 3 === 0 ? 0 : '1px solid var(--line)',
                  borderBottom: i < 3 ? '1px solid var(--line)' : 0,
                  minHeight: 280,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <span className="maach-mono" style={{ color: 'var(--lava-orange)' }}>
                  {v.n} / VALOR
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--display)',
                      fontWeight: 700,
                      fontSize: 32,
                      textTransform: 'uppercase',
                      letterSpacing: '-.01em',
                      lineHeight: 1,
                      marginBottom: 16,
                    }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.55 }}>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="invert"
        style={{
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          padding: '144px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="tex-stack-force"
          style={{ position: 'absolute', inset: 0, color: 'var(--off-white)', pointerEvents: 'none' }}
        />
        <div className="maach-container" style={{ position: 'relative', textAlign: 'center', maxWidth: 1200 }}>
          <span className="maach-mono" style={{ color: 'var(--sand-grey)', display: 'block', marginBottom: 32 }}>
            MAACH · MANIFIESTO
          </span>
          <h2
            className="h-display"
            style={{ fontSize: 'clamp(40px, 6vw, 88px)', color: 'var(--off-white)', lineHeight: 1.1 }}
          >
            "No diseñamos objetos para
            <span style={{ color: 'var(--lava-orange)' }}> decorar espacios </span>
            — diseñamos
            <span className="h-italic" style={{ color: 'var(--sand-grey)' }}> herramientas estructurales </span>
            que habilitan el trabajo."
          </h2>
          <div style={{ width: 64, height: 1, background: 'var(--sand-grey)', margin: '48px auto 24px' }} />
          <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
            Estudio MAACH · 2026
          </span>
        </div>
      </section>

      <section style={{ padding: '128px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div style={{ marginBottom: 64 }}>
            <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
              § 02 / Trayectoria
            </span>
            <h2 className="h-display" style={{ fontSize: 64 }}>
              Historia.
            </h2>
          </div>

          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 2,
                background: 'var(--line)',
              }}
            />

            {[
              { y: '2018', title: 'Fundación', body: 'Nace MAACH como respuesta a la necesidad de mobiliario industrial corporativo fabricado en México con estándares internacionales.' },
              { y: '2020', title: 'Primera planta productiva', body: 'Apertura de planta de 2,400 m² en CDMX. Integración de procesos de aluminio extruido y maderas técnicas.' },
              { y: '2022', title: 'Co-diseño con arquitectos', body: 'Lanzamiento del programa de colaboración con estudios. Más de 40 proyectos co-desarrollados en 18 meses.' },
              { y: '2024', title: 'Sistema BIM completo', body: 'Toda la línea disponible en formatos BIM/CAD para integración directa a planos arquitectónicos.' },
              { y: '2026', title: 'Sistema MAACH 2026', body: 'Renovación completa del lenguaje de marca y portafolio. Tres colecciones nuevas: Coalesse, Viccarbe, West Elm.' },
            ].map((m, i) => (
              <div
                key={m.y}
                style={{ position: 'relative', paddingLeft: 48, paddingBottom: i < 4 ? 56 : 0 }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: -8,
                    top: 0,
                    width: 16,
                    height: 16,
                    background: 'var(--lava-orange)',
                    border: '2px solid var(--off-white)',
                  }}
                />
                <span
                  className="maach-mono"
                  style={{ color: 'var(--lava-orange)', fontSize: 14, display: 'block', marginBottom: 8 }}
                >
                  {m.y}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 600,
                    fontSize: 32,
                    textTransform: 'uppercase',
                    letterSpacing: '-.01em',
                    marginBottom: 12,
                  }}
                >
                  {m.title}
                </h3>
                <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.55, maxWidth: 720 }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '128px 0' }}>
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
                § 03 / Equipo
              </span>
              <h2 className="h-display" style={{ fontSize: 64 }}>
                Liderazgo.
              </h2>
            </div>
            <Link
              to="/contacto"
              className="maach-mono"
              style={{
                borderBottom: '1.5px solid var(--fg)',
                paddingBottom: 4,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              Únete al equipo <IconArrow size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { name: 'Roberto A. Salgado', role: 'Gerente Comercial', init: 'RS' },
              { name: 'María Castellanos', role: 'Directora de Diseño', init: 'MC' },
              { name: 'Daniel Pratt', role: 'Ingeniería de Producto', init: 'DP' },
              { name: 'Sofía Alba', role: 'Dirección de Operaciones', init: 'SA' },
            ].map((m) => (
              <div key={m.name} style={{ border: '1px solid var(--line)', background: 'var(--off-white)' }}>
                <div
                  style={{
                    aspectRatio: '1/1',
                    background: 'var(--soft)',
                    borderBottom: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div className="tex-forged-grid" style={{ position: 'absolute', inset: 0 }} />
                  <span
                    style={{
                      fontFamily: 'var(--display)',
                      fontWeight: 700,
                      fontSize: 64,
                      letterSpacing: '-.02em',
                      position: 'relative',
                    }}
                  >
                    {m.init}
                  </span>
                  <span
                    className="maach-mono"
                    style={{ position: 'absolute', bottom: 12, left: 12, color: 'var(--muted)' }}
                  >
                    RETRATO_OFICIAL
                  </span>
                </div>
                <div style={{ padding: 24 }}>
                  <h4
                    style={{
                      fontFamily: 'var(--display)',
                      fontWeight: 600,
                      fontSize: 20,
                      textTransform: 'uppercase',
                      letterSpacing: '-.01em',
                      marginBottom: 4,
                    }}
                  >
                    {m.name}
                  </h4>
                  <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                    {m.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
