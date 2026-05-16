import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow, IconPin } from '../components/icons';
import { useT } from '../i18n/i18n';

export default function PagePortafolio() {
  const t = useT();
  const projects = [
    { id: '01', title: 'Proyecto CPN', location: 'Quito, EC', scope: 'Edificio corporativo matriz · Recepción, salas y áreas operativas', area: '2,400 m²', year: '2025', img: asset('proyectos/cpn/01.webp') },
    { id: '02', title: 'Palladium', location: 'Quito, EC', scope: 'Estaciones operativas, mesas de juntas y zonas privadas', area: '1,200 m²', year: '2024', img: asset('proyectos/palladium/02.webp') },
    { id: '03', title: 'Centro de Innovación Tecnológica', location: 'Guadalajara, JAL', scope: 'Sistemas benching y áreas lounge', area: '1,200 m²', year: '2025', img: asset('biblioteca-3.webp') },
    { id: '04', title: 'Oficinas Boutique StartUp', location: 'Querétaro, QRO', scope: 'Mobiliario a medida y colecciones exclusivas', area: '780 m²', year: '2026', img: asset('biblioteca-4.webp') },
    { id: '05', title: 'Hub Logístico Industrial', location: 'Mérida, YUC', scope: 'Áreas operativas de alta densidad', area: '4,100 m²', year: '2024', img: asset('biblioteca-5.webp') },
  ];

  return (
    <Layout screenLabel="08 Portafolio">
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
        {/* Brand-book backdrop: technical blueprint grid on jet-black */}
        <div
          aria-hidden
          className="tex-forged-grid"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            color: 'var(--off-white)',
            opacity: 0.06,
          }}
        />
        {/* Oversized brand numeral as a watermark */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            right: '-4vw',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 'clamp(360px, 52vw, 920px)',
            lineHeight: 0.78,
            color: 'var(--lava-orange)',
            opacity: 0.06,
            letterSpacing: '-0.04em',
            zIndex: 0,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          08
        </div>
        {/* Diagonal orange accent stripe — bottom-left */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '36vw',
            height: 1.5,
            background:
              'linear-gradient(90deg, var(--lava-orange) 0%, var(--lava-orange) 40%, transparent 100%)',
            opacity: 0.55,
            zIndex: 1,
          }}
        />
        {/* Subtle vignette so text stays anchored against the texture */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 30% 70%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 75%)',
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
            {t('port.hero.eyebrow')}
          </span>
          <span className="maach-mono" style={{ color: 'var(--off-white)' }}>
            {t('port.hero.section')}
          </span>
        </div>
        {/* Orange L corners */}
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

        <div className="maach-container" style={{ position: 'relative', zIndex: 3, width: '100%', paddingTop: 64, paddingBottom: 64 }}>
          <div style={{ maxWidth: 1100, display: 'grid', gap: 32 }}>
            <h1
              className="h-display"
              style={{ fontSize: 'clamp(64px, 9vw, 168px)', color: 'var(--off-white)', lineHeight: 0.92, margin: 0 }}
            >
              {t('port.hero.title.1')}<span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{t('port.hero.title.2')}</span>
            </h1>
            <p
              style={{
                fontSize: 20,
                color: 'var(--off-white)',
                lineHeight: 1.5,
                maxWidth: 640,
                margin: 0,
              }}
            >
              {t('port.hero.body')}
            </p>
          </div>

          {/* Metrics strip */}
          <div
            style={{
              marginTop: 48,
              paddingTop: 28,
              borderTop: '1px solid rgba(228,226,227,.35)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
            }}
          >
            {[
              { n: '+ 240', l: t('port.m.completed') },
              { n: '18', l: t('port.m.countries') },
              { n: '84,000', l: t('port.m.installed') },
              { n: '97%', l: t('port.m.recurring') },
            ].map((m) => (
              <div key={m.l}>
                <div
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 44,
                    letterSpacing: '-.02em',
                    lineHeight: 1,
                    marginBottom: 8,
                    color: 'var(--lava-orange)',
                  }}
                >
                  {m.n}
                </div>
                <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
                  {m.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {projects.map((p, i) => (
        <Link
          key={p.id}
          to={`/portafolio/${p.id}`}
          style={{
            position: 'relative',
            display: 'block',
            width: '100%',
            height: '85vh',
            minHeight: 600,
            overflow: 'hidden',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <img
            src={p.img}
            alt={p.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 1.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(22,22,22,.85), rgba(22,22,22,.1) 60%, transparent)',
            }}
          />

          <div style={{ position: 'absolute', top: 32, left: 48, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="maach-mono" style={{ background: 'var(--off-white)', padding: '5px 10px' }}>
              PRJ-{p.id}
            </span>
            <span
              className="maach-mono"
              style={{ background: 'var(--lava-orange)', color: 'var(--off-white)', padding: '5px 10px' }}
            >
              {p.year}
            </span>
          </div>
          <div style={{ position: 'absolute', top: 32, right: 48 }}>
            <span
              className="maach-mono"
              style={{ background: 'var(--jet-black)', color: 'var(--off-white)', padding: '5px 10px' }}
            >
              {p.area}
            </span>
          </div>

          <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48, color: 'var(--off-white)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 32,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }} className="maach-mono">
                  <IconPin size={12} /> {p.location}
                </div>
                <h2 className="h-display" style={{ fontSize: 'clamp(48px, 7vw, 120px)', color: 'var(--off-white)' }}>
                  {p.title}.
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 500,
                    fontSize: 22,
                    color: 'var(--sand-grey)',
                    marginTop: 12,
                  }}
                >
                  {p.scope}
                </p>
              </div>
              <span
                className="maach-mono"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  color: 'var(--off-white)',
                  borderBottom: '1.5px solid var(--off-white)',
                  paddingBottom: 4,
                }}
              >
                {t('port.discover')} <IconArrow size={14} />
              </span>
            </div>
          </div>

          <div style={{ position: 'absolute', left: 48, top: '50%', transform: 'translateY(-50%)' }}>
            <span
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: 200,
                color: 'var(--off-white)',
                opacity: 0.12,
                lineHeight: 1,
                letterSpacing: '-.04em',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
        </Link>
      ))}
    </Layout>
  );
}
