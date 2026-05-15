import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';
import { useT } from '../i18n/i18n';

export default function PageAbout() {
  const t = useT();
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
              {t('about.brandbook')}
            </span>
            <span className="maach-mono" style={{ color: 'var(--off-white)' }}>
              {t('about.section')}
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
              {t('about.hero.h1')}
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
              {t('about.hero.body.1')}
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 14, lineHeight: 1.65, letterSpacing: '.01em', margin: 0 }}>
              {t('about.hero.body.2')}
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
            {t('about.purpose.title.1')}<br />
            {t('about.purpose.title.2')}
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
              {t('about.purpose.body.1')}
            </p>
            <p style={{ margin: 0 }}>
              {t('about.purpose.body.2')}
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
              {t('about.values.eyebrow')}
            </span>
            <h2 className="h-display" style={{ fontSize: 'clamp(56px, 8vw, 128px)' }}>
              {t('about.values.title')}
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
              { n: '01', title: t('about.value.01.title'), body: t('about.value.01.body') },
              { n: '02', title: t('about.value.02.title'), body: t('about.value.02.body') },
              { n: '03', title: t('about.value.03.title'), body: t('about.value.03.body') },
              { n: '04', title: t('about.value.04.title'), body: t('about.value.04.body') },
              { n: '05', title: t('about.value.05.title'), body: t('about.value.05.body') },
              { n: '06', title: t('about.value.06.title'), body: t('about.value.06.body') },
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
                  {v.n} / {t('about.value.label')}
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
            {t('about.manifesto.eyebrow')}
          </span>
          <h2
            className="h-display"
            style={{ fontSize: 'clamp(40px, 6vw, 88px)', color: 'var(--off-white)', lineHeight: 1.1 }}
          >
            {t('about.manifesto.body.1')}
            <span style={{ color: 'var(--lava-orange)' }}>{t('about.manifesto.body.2')}</span>
            {t('about.manifesto.body.3')}
            <span className="h-italic" style={{ color: 'var(--sand-grey)' }}>{t('about.manifesto.body.4')}</span>
            {t('about.manifesto.body.5')}
          </h2>
          <div style={{ width: 64, height: 1, background: 'var(--sand-grey)', margin: '48px auto 24px' }} />
          <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
            {t('about.manifesto.source')}
          </span>
        </div>
      </section>

      <section style={{ padding: '128px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div style={{ marginBottom: 64 }}>
            <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
              {t('about.timeline.eyebrow')}
            </span>
            <h2 className="h-display" style={{ fontSize: 64 }}>
              {t('about.timeline.title')}
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
              { y: '2018', title: t('about.tl.2018.title'), body: t('about.tl.2018.body') },
              { y: '2020', title: t('about.tl.2020.title'), body: t('about.tl.2020.body') },
              { y: '2022', title: t('about.tl.2022.title'), body: t('about.tl.2022.body') },
              { y: '2024', title: t('about.tl.2024.title'), body: t('about.tl.2024.body') },
              { y: '2026', title: t('about.tl.2026.title'), body: t('about.tl.2026.body') },
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
                {t('about.team.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 64 }}>
                {t('about.team.title')}
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
              {t('about.team.join')} <IconArrow size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { name: 'Roberto A. Salgado', role: t('about.team.01.role'), init: 'RS' },
              { name: 'María Castellanos', role: t('about.team.02.role'), init: 'MC' },
              { name: 'Daniel Pratt', role: t('about.team.03.role'), init: 'DP' },
              { name: 'Sofía Alba', role: t('about.team.04.role'), init: 'SA' },
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
                    {t('about.team.portrait')}
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
