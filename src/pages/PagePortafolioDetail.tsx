import { asset } from '../lib/asset';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow, IconPin } from '../components/icons';
import { useT } from '../i18n/i18n';

type ProjectData = {
  title: string;
  location: string;
  year: string;
  area: string;
  sector: string;
  arq: string;
  /** Hero photo (top of detail page). */
  hero: string;
  /** Side photo (used in the Propuesta de Valor phase). */
  side: string;
  /** Optional gallery (Vista de instalación). Falls back to defaults. */
  gallery?: [string, string, string];
};

const DATA: Record<string, ProjectData> = {
  '01': {
    title: 'Proyecto CPN',
    location: 'Quito, EC',
    year: '2025',
    area: '2,400 m²',
    sector: 'Cooperativa financiera',
    arq: 'MAACH + CPN',
    hero: asset('proyectos/cpn/01.webp'),
    side: asset('proyectos/cpn/04.webp'),
    gallery: [
      asset('proyectos/cpn/02.webp'),
      asset('proyectos/cpn/03.webp'),
      asset('proyectos/cpn/05.webp'),
    ],
  },
  '02': {
    title: 'Palladium',
    location: 'Quito, EC',
    year: '2024',
    area: '1,200 m²',
    sector: 'Corporate · Consultoría',
    arq: 'MAACH In-house',
    hero: asset('proyectos/palladium/02.webp'),
    side: asset('proyectos/palladium/04.webp'),
    gallery: [
      asset('proyectos/palladium/05.webp'),
      asset('proyectos/palladium/03.webp'),
      asset('proyectos/palladium/01.webp'),
    ],
  },
  '03': {
    title: 'Centro de Innovación Tecnológica',
    location: 'Guadalajara, JAL',
    year: '2025',
    area: '1,200 m²',
    sector: 'Tech / R&D',
    arq: 'Sosa Studio',
    hero: asset('biblioteca-3.webp'),
    side: asset('biblioteca-4.webp'),
  },
  '04': {
    title: 'Oficinas Boutique StartUp',
    location: 'Querétaro, QRO',
    year: '2026',
    area: '780 m²',
    sector: 'Startup SaaS',
    arq: 'MAACH In-house',
    hero: asset('biblioteca-4.webp'),
    side: asset('biblioteca-5.webp'),
  },
  '05': {
    title: 'Hub Logístico Industrial',
    location: 'Mérida, YUC',
    year: '2024',
    area: '4,100 m²',
    sector: 'Logística',
    arq: 'Camargo & Hijos',
    hero: asset('biblioteca-5.webp'),
    side: asset('biblioteca-1.webp'),
  },
};

export default function PagePortafolioDetail() {
  const t = useT();
  const { id = '01' } = useParams();
  const p = DATA[id] || DATA['01'];
  const idNum = parseInt(id, 10) || 1;
  const heroImg = p.hero;
  const sideImg = p.side;
  const galleryImgs = p.gallery ?? [
    asset('biblioteca-1.webp'),
    asset('biblioteca-3.webp'),
    asset('biblioteca-5.webp'),
  ];
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
            {t('pdet.spec_sheet')}
          </span>
          {[
            [t('pdet.sector'), p.sector],
            [t('pdet.arch'), p.arq],
            [t('pdet.area'), p.area],
            [t('pdet.year'), p.year],
            [t('pdet.status'), t('pdet.status.value')],
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
                {t('pdet.phase01.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
                {t('pdet.phase01.title')}
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
                {t('pdet.phase01.lead')}
              </p>
              <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.6 }}>
                {t('pdet.phase01.body')}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
                {t('pdet.phase02.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginBottom: 32 }}>
                {t('pdet.phase02.title')}
              </h2>
              <p style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 28, lineHeight: 1.2, marginBottom: 48 }}>
                {t('pdet.phase02.lead')}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  t('pdet.phase02.b1'),
                  t('pdet.phase02.b2'),
                  t('pdet.phase02.b3'),
                  t('pdet.phase02.b4'),
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{ display: 'flex', gap: 32, padding: '20px 0', borderTop: '1px solid var(--line)' }}
                  >
                    <span className="maach-mono" style={{ flexShrink: 0, color: 'var(--lava-orange)' }}>
                      0{i + 1}
                    </span>
                    <span style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
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
                  {t('pdet.gallery.title').toUpperCase().replace('.', '').replace(/\s+/g, '_')}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }}>
            <div>
              <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
                {t('pdet.phase03.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginBottom: 40 }}>
                {t('pdet.phase03.title')}
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
                    {t('pdet.phase03.metric')}
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
                    {t('pdet.phase03.metric.body')}
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
                {t('pdet.phase03.lead')}
              </p>
              <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 32 }}>
                {t('pdet.phase03.body')}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 48 }}>
                <div style={{ borderTop: '2px solid var(--jet-black)', paddingTop: 16 }}>
                  <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 8 }}>
                    {t('pdet.phase03.delivery')}
                  </span>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 28 }}>
                    {t('pdet.phase03.delivery.value')}
                  </div>
                </div>
                <div style={{ borderTop: '2px solid var(--jet-black)', paddingTop: 16 }}>
                  <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 8 }}>
                    {t('pdet.phase03.pieces')}
                  </span>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 28 }}>
                    {t('pdet.phase03.pieces.value')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '128px 0' }}>
        <div className="maach-container">
          <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
            {t('pdet.gallery.eyebrow')}
          </span>
          <h2 className="h-display" style={{ fontSize: 56, marginBottom: 48 }}>
            {t('pdet.gallery.title')}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div style={{ aspectRatio: '1/1', border: '1px solid var(--line)', overflow: 'hidden' }}>
              <img src={galleryImgs[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 16 }}>
              <div style={{ border: '1px solid var(--line)', overflow: 'hidden' }}>
                <img src={galleryImgs[1]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ border: '1px solid var(--line)', overflow: 'hidden' }}>
                <img src={galleryImgs[2]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            {t('pdet.next')}
          </span>
          <h3 className="h-display" style={{ fontSize: 'clamp(48px, 8vw, 128px)' }}>
            {t('pdet.continue')} <IconArrow size={48} />
          </h3>
        </Link>
      </section>
    </Layout>
  );
}
