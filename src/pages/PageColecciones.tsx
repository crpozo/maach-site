import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';

export default function PageColecciones() {
  const collections = [
    { id: 'maach-01', name: 'Coalesse', caption: 'Modularidad y confort para entornos de alto rendimiento', tex: 'tex-forged-grid', img: asset('biblioteca-1.webp'), year: '2025' },
    { id: 'maach-02', name: 'Viccarbe', caption: 'Sistemas residenciales adaptados al trabajo contemporáneo', tex: 'tex-load-line', img: asset('biblioteca-3.webp'), year: '2024' },
    { id: 'maach-03', name: 'West Elm', caption: 'Calidez doméstica con estándares industriales', tex: 'tex-tactile-field', img: asset('biblioteca-5.webp'), year: '2026' },
  ];

  return (
    <Layout screenLabel="05 Colecciones">
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
        <div className="maach-container">
          <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
            § Sistema 2026
          </span>
          <h1 className="h-display" style={{ fontSize: 'clamp(56px, 9vw, 168px)', marginBottom: 32 }}>
            Colec<span className="h-italic" style={{ color: 'var(--lava-orange)' }}>ciones.</span>
          </h1>
          <p style={{ fontSize: 22, color: 'var(--muted)', maxWidth: 720, lineHeight: 1.45 }}>
            Sistemas de mobiliario agrupados por visión arquitectónica. Cada colección resuelve necesidades operativas específicas bajo un lenguaje visual unificado.
          </p>
        </div>
      </section>

      {collections.map((c, i) => (
        <Link
          key={c.id}
          to={`/colecciones/${c.id}`}
          style={{
            position: 'relative',
            display: 'block',
            width: '100%',
            height: '85vh',
            minHeight: 640,
            borderBottom: '1px solid var(--line)',
            overflow: 'hidden',
            background: 'var(--off-white)',
          }}
        >
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              src={c.img}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.35,
                filter: 'grayscale(.5)',
                transition: 'opacity .8s, transform .8s, filter .8s',
              }}
            />
          </div>
          <div className={c.tex} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.25 }} />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 48,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <span className="maach-mono" style={{ marginBottom: 24, background: 'var(--off-white)', padding: '6px 12px' }}>
              COL_{c.id.split('-')[1]} · {c.year}
            </span>
            <h2
              className="h-display"
              style={{
                fontSize: 'clamp(80px, 14vw, 240px)',
                color: 'var(--jet-black)',
                mixBlendMode: 'difference',
                filter: 'invert(1)',
                textTransform: 'uppercase',
              }}
            >
              {c.name}
            </h2>
            <p
              style={{
                fontSize: 18,
                color: 'var(--fg)',
                maxWidth: 560,
                marginTop: 16,
                fontFamily: 'var(--display)',
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              {c.caption}
            </p>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 32,
              left: 48,
              right: 48,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              pointerEvents: 'none',
            }}
          >
            <span
              className="maach-mono"
              style={{ background: 'var(--jet-black)', color: 'var(--off-white)', padding: '6px 12px' }}
            >
              {String(i + 1).padStart(2, '0')} / {String(collections.length).padStart(2, '0')}
            </span>
            <span
              className="maach-mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                borderBottom: '1.5px solid var(--fg)',
                paddingBottom: 4,
              }}
            >
              Explorar colección <IconArrow size={14} />
            </span>
          </div>
        </Link>
      ))}
    </Layout>
  );
}
