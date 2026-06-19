import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';
import { useT } from '../i18n/i18n';

export default function PageColecciones() {
  const t = useT();
  const collections = [
    { id: 'maach-01', name: 'Coalesse', caption: t('colec.coll_modularidad_confort'), tex: 'tex-forged-grid', img: asset('biblioteca-1.webp'), year: '2025' },
    { id: 'maach-02', name: 'Viccarbe', caption: t('colec.coll_sistemas_residenciales'), tex: 'tex-load-line', img: asset('biblioteca-3.webp'), year: '2024' },
    { id: 'maach-03', name: 'West Elm', caption: t('colec.coll_calidez_domestica'), tex: 'tex-tactile-field', img: asset('biblioteca-5.webp'), year: '2026' },
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
            {t('colec.eyebrow_sistema_2026')}
          </span>
          <h1 className="h-display" style={{ fontSize: 'clamp(56px, 9vw, 90px)', marginBottom: 32 }}>
            {t('colec.hero_title_colec')}<span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{t('colec.hero_title_ciones')}</span>
          </h1>
          <p style={{ fontSize: 22, color: 'var(--muted)', maxWidth: 720, lineHeight: 1.45 }}>
            {t('colec.hero_intro')}
          </p>
        </div>
      </section>

      {collections.map((c, i) => (
        <Link
          key={c.id}
          to={`/colecciones/${c.id}`}
          className="invert"
          style={{
            position: 'relative',
            display: 'block',
            width: '100%',
            height: '85vh',
            minHeight: 600,
            borderBottom: '1px solid var(--jet-black)',
            overflow: 'hidden',
            background: 'var(--jet-black)',
            color: 'var(--off-white)',
          }}
          onMouseEnter={(e) => {
            const img = e.currentTarget.querySelector<HTMLImageElement>('img[data-coll-bg]');
            if (img) img.style.transform = 'scale(1.04)';
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget.querySelector<HTMLImageElement>('img[data-coll-bg]');
            if (img) img.style.transform = '';
          }}
        >
          {/* Background photo — full bleed, no fading */}
          <img
            src={c.img}
            alt=""
            data-coll-bg
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
          {/* Diagonal dark gradient for left-side legibility */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(95deg, rgba(22,22,22,.85) 0%, rgba(22,22,22,.6) 35%, rgba(22,22,22,.25) 65%, rgba(22,22,22,.05) 100%)',
            }}
          />

          {/* Side index — huge faded number on the right */}
          <span
            aria-hidden
            style={{
              position: 'absolute',
              right: 48,
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--display)',
              fontWeight: 700,
              fontSize: 'clamp(60px, 22vw, 90px)',
              color: 'var(--off-white)',
              opacity: 0.08,
              lineHeight: 1,
              letterSpacing: '-.04em',
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>

          {/* Top tags */}
          <div style={{ position: 'absolute', top: 32, left: 48, display: 'flex', gap: 8 }}>
            <span
              className="maach-mono"
              style={{ background: 'var(--lava-orange)', color: 'var(--off-white)', padding: '6px 10px' }}
            >
              {c.year}
            </span>
          </div>
          <div style={{ position: 'absolute', top: 32, right: 48 }}>
            <span className="maach-mono" style={{ color: 'var(--off-white)' }}>
              {String(i + 1).padStart(2, '0')} / {String(collections.length).padStart(2, '0')}
            </span>
          </div>

          {/* Orange L corner — top-right of section */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 22,
              height: 22,
              borderTop: '2px solid var(--lava-orange)',
              borderRight: '2px solid var(--lava-orange)',
            }}
          />

          {/* Bottom content block — left-aligned */}
          <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48 }}>
            <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
              {t('colec.card_sistema_maach')} {c.year}
            </span>
            <h2
              className="h-display"
              style={{
                fontSize: 'clamp(72px, 12vw, 90px)',
                color: 'var(--off-white)',
                lineHeight: 0.92,
                margin: 0,
              }}
            >
              {c.name}.
            </h2>
            <div
              style={{
                marginTop: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 32,
                flexWrap: 'wrap',
                paddingTop: 16,
                borderTop: '1px solid rgba(228,226,227,.35)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 500,
                  fontSize: 20,
                  color: 'var(--off-white)',
                  maxWidth: 560,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {c.caption}
              </p>
              <span
                className="maach-mono"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  color: 'var(--lava-orange)',
                  paddingBottom: 4,
                  borderBottom: '1.5px solid var(--lava-orange)',
                }}
              >
                {t('colec.cta_explorar')} <IconArrow size={14} />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </Layout>
  );
}
