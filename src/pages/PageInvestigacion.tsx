import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';
import { BLOGS } from '../data/blogs';
import { useT } from '../i18n/i18n';

export default function PageInvestigacion() {
  const t = useT();
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
          10
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
            {t('inv.hero.eyebrow')}
          </span>
          <span className="maach-mono" style={{ color: 'var(--off-white)' }}>
            {t('inv.hero.section')}
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
                {t('inv.hero.title.1')}<br />
                <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{t('inv.hero.title.2')}</span>
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
                {t('inv.hero.body')}
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
                {t('inv.quote.body')}
              </div>
              <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
                {t('inv.quote.source')}
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
                {t('inv.list.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}>
                {t('inv.list.title.1')} <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{t('inv.list.title.2')}</span>
              </h2>
            </div>
            <span className="maach-mono" style={{ color: 'var(--muted)' }}>
              {t('inv.list.count')}
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
                    {t('blog.read')} <IconArrow size={14} />
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
            {t('inv.manifesto.eyebrow')}
          </span>
          <h2
            className="h-display"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)', color: 'var(--off-white)', lineHeight: 1.1 }}
          >
            {t('inv.manifesto.body.1')}
            <span style={{ color: 'var(--lava-orange)' }}>{t('inv.manifesto.body.2')}</span>{t('inv.manifesto.body.3')}
          </h2>
          <span className="maach-mono" style={{ color: 'var(--sand-grey)', marginTop: 32, display: 'block' }}>
            {t('inv.manifesto.source')}
          </span>
        </div>
      </section>
    </Layout>
  );
}
