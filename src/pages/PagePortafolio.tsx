import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow, IconPin } from '../components/icons';

export default function PagePortafolio() {
  const projects = [
    { id: '01', title: 'Proyecto CPN', location: 'Quito, EC', scope: 'Edificio corporativo matriz · Recepción, salas y áreas operativas', area: '2,400 m²', year: '2025', img: asset('proyectos/cpn/01.webp') },
    { id: '02', title: 'Palladium', location: 'Quito, EC', scope: 'Estaciones operativas, mesas de juntas y zonas privadas', area: '1,200 m²', year: '2024', img: asset('proyectos/palladium/02.webp') },
    { id: '03', title: 'Centro de Innovación Tecnológica', location: 'Guadalajara, JAL', scope: 'Sistemas benching y áreas lounge', area: '1,200 m²', year: '2025', img: asset('biblioteca-3.webp') },
    { id: '04', title: 'Oficinas Boutique StartUp', location: 'Querétaro, QRO', scope: 'Mobiliario a medida y colecciones exclusivas', area: '780 m²', year: '2026', img: asset('biblioteca-4.webp') },
    { id: '05', title: 'Hub Logístico Industrial', location: 'Mérida, YUC', scope: 'Áreas operativas de alta densidad', area: '4,100 m²', year: '2024', img: asset('biblioteca-5.webp') },
  ];

  return (
    <Layout screenLabel="08 Portafolio">
      <section style={{ padding: '128px 0 96px', borderBottom: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
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
        <div className="maach-container" style={{ textAlign: 'center', position: 'relative' }}>
          <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
            § Proyectos · 2024 – 2026
          </span>
          <h1 className="h-display" style={{ fontSize: 'clamp(64px, 10vw, 184px)', marginBottom: 32 }}>
            Porta<span className="h-italic" style={{ color: 'var(--lava-orange)' }}>folio.</span>
          </h1>
          <p style={{ fontSize: 22, color: 'var(--muted)', maxWidth: 720, margin: '0 auto', lineHeight: 1.45 }}>
            Selección de proyectos donde el diseño arquitectónico y la funcionalidad industrial convergen.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 0,
              marginTop: 80,
              border: '1px solid var(--line)',
            }}
          >
            {[
              { n: '+ 240', l: 'Proyectos completados' },
              { n: '18', l: 'Países atendidos' },
              { n: '84,000', l: 'm² instalados' },
              { n: '97%', l: 'Clientes recurrentes' },
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  padding: '32px 24px',
                  borderRight: i < 3 ? '1px solid var(--line)' : 0,
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 56,
                    letterSpacing: '-.02em',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {m.n}
                </div>
                <span className="maach-mono" style={{ color: 'var(--muted)' }}>
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
                Descubrir proyecto <IconArrow size={14} />
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
