import { asset } from '../lib/asset';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow, IconPin } from '../components/icons';

type ProjectData = {
  title: string;
  location: string;
  year: string;
  area: string;
  sector: string;
  arq: string;
};

const DATA: Record<string, ProjectData> = {
  '01': { title: 'Corporativo Norte', location: 'Monterrey, NL', year: '2025', area: '2,400 m²', sector: 'Sector Financiero', arq: 'Estudio Alba' },
  '02': { title: 'Torre Financiera Capital', location: 'CDMX', year: '2024', area: '5,800 m²', sector: 'Banca corporativa', arq: 'Pratt & Co' },
  '03': { title: 'Centro de Innovación Tecnológica', location: 'Guadalajara, JAL', year: '2025', area: '1,200 m²', sector: 'Tech / R&D', arq: 'Sosa Studio' },
  '04': { title: 'Oficinas Boutique StartUp', location: 'Querétaro, QRO', year: '2026', area: '780 m²', sector: 'Startup SaaS', arq: 'MAACH In-house' },
  '05': { title: 'Hub Logístico Industrial', location: 'Mérida, YUC', year: '2024', area: '4,100 m²', sector: 'Logística', arq: 'Camargo & Hijos' },
};

export default function PagePortafolioDetail() {
  const { id = '01' } = useParams();
  const p = DATA[id] || DATA['01'];
  const idNum = parseInt(id, 10) || 1;
  const heroImg = asset(`biblioteca-${(idNum % 5) + 1}.webp`);
  const sideImg = asset(`biblioteca-${((idNum + 1) % 5) + 1}.webp`);
  const nextId = String(idNum + 1).padStart(2, '0');

  return (
    <Layout screenLabel={'09 Proyecto · ' + p.title}>
      <section
        style={{
          position: 'relative',
          height: '85vh',
          minHeight: 640,
          overflow: 'hidden',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <img
          src={heroImg}
          alt={p.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(22,22,22,.5), rgba(22,22,22,.2) 50%, transparent)',
          }}
        />
        <div
          className="tex-forged-grid"
          style={{ position: 'absolute', inset: 0, color: 'var(--off-white)', opacity: 0.12 }}
        />

        <div
          className="maach-container"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: 96,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, color: 'var(--off-white)' }}>
            <span className="maach-mono">PRJ-{id}</span>
            <span style={{ width: 24, height: 1, background: 'var(--off-white)' }} />
            <span className="maach-mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <IconPin size={12} /> {p.location}
            </span>
            <span style={{ width: 24, height: 1, background: 'var(--off-white)' }} />
            <span className="maach-mono">{p.year}</span>
          </div>
          <h1
            className="h-display"
            style={{ fontSize: 'clamp(72px, 11vw, 192px)', color: 'var(--off-white)', maxWidth: 1200 }}
          >
            {p.title}.
          </h1>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 64,
            right: 48,
            background: 'var(--off-white)',
            padding: 28,
            width: 280,
          }}
        >
          <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
            FICHA TÉCNICA
          </span>
          {[
            ['Sector', p.sector],
            ['Arquitectura', p.arq],
            ['Superficie', p.area],
            ['Año', p.year],
            ['Status', 'Completado'],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderTop: '1px solid var(--line)',
                gap: 8,
              }}
            >
              <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                {k}
              </span>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '.06em',
                  textAlign: 'right',
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '144px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container" style={{ display: 'flex', flexDirection: 'column', gap: 144 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }}>
            <div>
              <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
                FASE 01 · DESAFÍO
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
                El Desafío.
              </h2>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 500,
                  fontSize: 32,
                  lineHeight: 1.15,
                  marginBottom: 32,
                  letterSpacing: '-.01em',
                }}
              >
                Un espacio para fomentar la colaboración espontánea y la concentración profunda, respetando la
                arquitectura original del edificio y maximizando la luz natural.
              </p>
              <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.6 }}>
                El proyecto requería una solución integral de mobiliario adaptable a diferentes modalidades de trabajo.
                Se implementaron sistemas de benching para áreas operativas combinados con zonas de soft seating para
                reuniones informales.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
                FASE 02 · PROPUESTA
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginBottom: 32 }}>
                Propuesta de Valor.
              </h2>
              <p style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 28, lineHeight: 1.2, marginBottom: 48 }}>
                Integración de la colección MAACH-02 para lograr una estética cohesiva entre zonas operativas y de
                dirección.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  'Sillería ergonómica certificada para reducir fatiga postural en jornadas de alto rendimiento.',
                  'Paneles termoacústicos en áreas de benching para control de ruido en plantas abiertas.',
                  'Acabados en maderas naturales y textiles texturizados que aportan calidez al entorno corporativo.',
                  'Integración tecnológica oculta en mesas de juntas y estaciones modulares.',
                ].map((t, i) => (
                  <li
                    key={i}
                    style={{ display: 'flex', gap: 32, padding: '20px 0', borderTop: '1px solid var(--line)' }}
                  >
                    <span className="maach-mono" style={{ flexShrink: 0, color: 'var(--lava-orange)' }}>
                      0{i + 1}
                    </span>
                    <span style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.55 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                aspectRatio: '3/4',
                border: '1px solid var(--line)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img src={sideImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                <span className="maach-mono" style={{ background: 'var(--off-white)', padding: '5px 10px' }}>
                  VISTA_INSTALACIÓN
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }}>
            <div>
              <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
                FASE 03 · RESULTADO
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginBottom: 40 }}>
                El Resultado.
              </h2>

              <div
                className="invert"
                style={{
                  background: 'var(--jet-black)',
                  color: 'var(--off-white)',
                  padding: 40,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="tex-stack-force"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    color: 'var(--off-white)',
                    opacity: 0.12,
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ position: 'relative' }}>
                  <span className="maach-mono" style={{ color: 'var(--sand-grey)', display: 'block', marginBottom: 16 }}>
                    MÉTRICA CLAVE
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--display)',
                      fontWeight: 700,
                      fontSize: 120,
                      lineHeight: 1,
                      color: 'var(--lava-orange)',
                      letterSpacing: '-.03em',
                      marginBottom: 16,
                    }}
                  >
                    +40%
                  </div>
                  <p style={{ color: 'var(--off-white)', fontSize: 17, lineHeight: 1.5 }}>
                    Incremento en la utilización de espacios colaborativos según reporte del cliente, 6 meses
                    post-instalación.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 500,
                  fontSize: 32,
                  lineHeight: 1.15,
                  marginBottom: 32,
                  letterSpacing: '-.01em',
                }}
              >
                Un ecosistema de trabajo dinámico que responde a las necesidades actuales de la organización,
                preparándola para su crecimiento a futuro.
              </p>
              <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 32 }}>
                La solución entregada transformó la manera en que los equipos interactúan día a día. Las zonas de soft
                seating se convirtieron en el núcleo de la creatividad, mientras las estaciones operativas brindan el
                enfoque y privacidad necesarios.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 48 }}>
                <div style={{ borderTop: '2px solid var(--jet-black)', paddingTop: 16 }}>
                  <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 8 }}>
                    Plazo de entrega
                  </span>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 28 }}>16 semanas</div>
                </div>
                <div style={{ borderTop: '2px solid var(--jet-black)', paddingTop: 16 }}>
                  <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 8 }}>
                    Piezas instaladas
                  </span>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 28 }}>284 ud.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '128px 0' }}>
        <div className="maach-container">
          <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
            § Galería
          </span>
          <h2 className="h-display" style={{ fontSize: 56, marginBottom: 48 }}>
            Vista de instalación.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div style={{ aspectRatio: '1/1', border: '1px solid var(--line)', overflow: 'hidden' }}>
              <img src={asset("biblioteca-1.webp")} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 16 }}>
              <div style={{ border: '1px solid var(--line)', overflow: 'hidden' }}>
                <img src={asset("biblioteca-3.webp")} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ border: '1px solid var(--line)', overflow: 'hidden' }}>
                <img src={asset("biblioteca-5.webp")} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--line)' }}>
        <Link
          to={`/portafolio/${nextId}`}
          style={{ display: 'block', padding: '96px 0', textAlign: 'center', transition: 'background .3s' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--jet-black)';
            e.currentTarget.style.color = 'var(--off-white)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '';
            e.currentTarget.style.color = '';
          }}
        >
          <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 16 }}>
            Siguiente proyecto
          </span>
          <h3 className="h-display" style={{ fontSize: 'clamp(48px, 8vw, 128px)' }}>
            Continuar <IconArrow size={48} />
          </h3>
        </Link>
      </section>
    </Layout>
  );
}
