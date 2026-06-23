import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';
import { useT } from '../i18n/i18n';

export default function PageNuevo() {
  const t = useT();
  const products = [
    { id: 'vertice', name: 'Sistema Vértice', cat: 'Estaciones de trabajo', img: asset('biblioteca-2.webp'), sku: 'MCH-2026-V1' },
    { id: 'tendon', name: 'Sillonería Tendón', cat: 'Sillería operativa', img: asset('biblioteca-3.webp'), sku: 'MCH-2026-T2' },
    { id: 'stratum', name: 'Mesa Stratum', cat: 'Mesas de juntas', img: asset('biblioteca-4.webp'), sku: 'MCH-2026-S3' },
  ];

  return (
    <Layout screenLabel="02 Nuevo">
      {/* HERO — split: text on left, Vértice showcase on right */}
      <section
        style={{
          padding: '56px 0',
          position: 'relative',
          borderBottom: '1px solid var(--line)',
          overflow: 'hidden',
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Orange edge bar */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 6,
            background: 'var(--lava-orange)',
            zIndex: 1,
          }}
        />
        {/* Rotated MAACH label */}
        <span
          aria-hidden
          className="maach-mono"
          style={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'rotate(-90deg) translateX(50%)',
            transformOrigin: 'left center',
            color: 'var(--lava-orange)',
            letterSpacing: '.32em',
            fontWeight: 700,
            zIndex: 1,
          }}
        >
          {t('nuevo.hero_side_label')}
        </span>
        {/* Corner crosshairs */}
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
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            width: 22,
            height: 22,
            borderBottom: '2px solid var(--lava-orange)',
            borderRight: '2px solid var(--lava-orange)',
            zIndex: 1,
          }}
        />

        <div className="maach-container" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1400 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            {/* LEFT: text */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <span className="maach-tag" style={{ borderColor: 'var(--lava-orange)', color: 'var(--lava-orange)' }}>
                  {t('nuevo.hero_tag')}
                </span>
                <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                  {t('nuevo.hero_kicker')}
                </span>
              </div>
              <h1 className="h-display" style={{ fontSize: 'clamp(56px, 7.5vw, 90px)', marginBottom: 32 }}>
                {t('nuevo.hero_title')}<br />
                <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>2026</span>
              </h1>
              <p style={{ fontSize: 19, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 48 }}>
                {t('nuevo.hero_intro')}
              </p>

              {/* Stat row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 24,
                  paddingTop: 28,
                  borderTop: '1px solid var(--line)',
                }}
              >
                {[
                  { n: '03', l: 'Piezas nuevas', k: 'nuevo.stat_piezas' },
                  { n: '04', l: 'Tipologías', k: 'nuevo.stat_tipologias' },
                  { n: 'Q4', l: 'Disponibilidad', k: 'nuevo.stat_disponibilidad' },
                ].map((s) => (
                  <div key={s.l}>
                    <div
                      style={{
                        fontFamily: 'var(--display)',
                        fontWeight: 700,
                        fontSize: 44,
                        lineHeight: 1,
                        marginBottom: 6,
                        color: 'var(--lava-orange)',
                        letterSpacing: '-.02em',
                      }}
                    >
                      {s.n}
                    </div>
                    <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                      {t(s.k)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Vértice showcase */}
            <Link
              to="/productos/sillonera/vertice"
              style={{
                position: 'relative',
                display: 'block',
                aspectRatio: '4/5',
                maxHeight: 'calc(100vh - 180px)',
                border: '1px solid var(--line)',
                overflow: 'hidden',
                background: 'var(--surface)',
              }}
            >
              <img
                src={asset("biblioteca-2.webp")}
                alt={t('prod.name.vertice')}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform .8s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
              />
              {/* Gradient for chip legibility */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(22,22,22,.35) 0%, rgba(22,22,22,0) 30%, rgba(22,22,22,0) 60%, rgba(22,22,22,.75) 100%)',
                }}
              />
              {/* Top chips */}
              <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: 6 }}>
                <span
                  className="maach-mono"
                  style={{ background: 'var(--lava-orange)', color: 'var(--off-white)', padding: '6px 10px' }}
                >
                  {t('nuevo.showcase_badge')}
                </span>
                <span
                  className="maach-mono"
                  style={{ background: 'var(--off-white)', color: 'var(--jet-black)', padding: '6px 10px' }}
                >
                  MCH-2026-V1
                </span>
              </div>
              {/* Bottom text overlay */}
              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, color: 'var(--off-white)' }}>
                <span className="maach-mono" style={{ color: 'var(--sand-grey)', display: 'block', marginBottom: 8 }}>
                  {t('nuevo.showcase_kicker')}
                </span>
                <h2
                  className="h-display"
                  style={{ fontSize: 'clamp(40px, 5.2vw, 80px)', color: 'var(--off-white)', marginBottom: 14 }}
                >
                  {t('nuevo.showcase_name')}
                </h2>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 12,
                    borderTop: '1px solid rgba(228,226,227,.4)',
                  }}
                >
                  <span className="maach-mono" style={{ color: 'var(--off-white)' }}>
                    {t('nuevo.showcase_spec')}
                  </span>
                  <span
                    className="maach-mono"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--lava-orange)' }}
                  >
                    {t('nuevo.showcase_cta')} <IconArrow size={14} />
                  </span>
                </div>
              </div>
              {/* Orange L corner on image — top right */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  width: 18,
                  height: 18,
                  borderTop: '2px solid var(--lava-orange)',
                  borderRight: '2px solid var(--lava-orange)',
                }}
              />
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '128px 0' }}>
        <div className="maach-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <h3 className="h-display" style={{ fontSize: 56 }}>
              {t('nuevo.grid_title')}
            </h3>
            <span className="maach-mono" style={{ color: 'var(--muted)' }}>
              {t('nuevo.grid_count')}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {products.map((p) => {
              const catSlug = p.cat.toLowerCase().replace(/ /g, '-');
              const subKey = p.cat
                .normalize('NFD')
                .replace(/[̀-ͯ]/g, '')
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
              return (
                <Link key={p.id} to={`/productos/${catSlug}/${p.id}`} style={{ display: 'block' }}>
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '4/5',
                      overflow: 'hidden',
                      marginBottom: 20,
                      border: '1px solid var(--line)',
                      background: 'var(--surface)',
                    }}
                  >
                    <img src={p.img} alt={t('prod.name.' + p.id)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span
                      className="maach-mono"
                      style={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        background: 'var(--jet-black)',
                        color: 'var(--off-white)',
                        padding: '4px 8px',
                      }}
                    >
                      {t('nuevo.card_badge')}
                    </span>
                    <span
                      className="maach-mono"
                      style={{ position: 'absolute', bottom: 16, right: 16, background: 'var(--off-white)', padding: '4px 8px' }}
                    >
                      {p.sku}
                    </span>
                  </div>
                  <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                    {t('prod.sub.' + subKey)}
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--display)',
                      fontSize: 28,
                      letterSpacing: '-.01em',
                      textTransform: 'uppercase',
                      lineHeight: 1,
                    }}
                  >
                    {t('prod.name.' + p.id)}
                  </h4>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
