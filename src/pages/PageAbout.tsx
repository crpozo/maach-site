import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow, IconArrowDownRight } from '../components/icons';
import { useT } from '../i18n/i18n';

const TEAM: { name: string; roleKey: string; init: string }[] = [
  { name: 'Marlon Aguirre', roleKey: 'about.team.role.01', init: 'MA' },
  { name: 'Johnny Aguirre', roleKey: 'about.team.role.02', init: 'JA' },
  { name: 'Karla Lagos', roleKey: 'about.team.role.03', init: 'KL' },
  { name: 'Pablo León', roleKey: 'about.team.role.04', init: 'PL' },
  { name: 'Manuel Mena', roleKey: 'about.team.role.05', init: 'MM' },
  { name: 'Danilo Varela', roleKey: 'about.team.role.06', init: 'DV' },
  { name: 'Diego Buce', roleKey: 'about.team.role.07', init: 'DB' },
];

const ALLIES: { name: string; file: string }[] = [
  { name: '3M', file: '3m.png' },
  { name: 'Edimca', file: 'edimca.png' },
  { name: 'Eni', file: 'eni.svg' },
  { name: 'Import Aceros', file: 'import-aceros.webp' },
  { name: 'Ipac', file: 'ipac.png' },
  { name: 'Pelikano', file: 'pelikano.webp' },
  { name: 'Proacero', file: 'proacero.png' },
  { name: 'Prove Fábrica', file: 'prove-fabrica.webp' },
  { name: 'Vitrum', file: 'vitrum.jpg' },
  { name: 'Wesco', file: 'wesco.webp' },
];

export default function PageAbout() {
  const t = useT();
  return (
    <Layout screenLabel="12 Sobre MAACH">
      {/* HERO — matches home hero proportions + orange accents */}
      <section
        className="invert"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
        }}
      >
        {/* Background photo */}
        <img
          src={asset('biblioteca-1.webp')}
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
        {/* Dark gradient for legibility */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(95deg, rgba(22,22,22,.88) 0%, rgba(22,22,22,.65) 35%, rgba(22,22,22,.3) 65%, rgba(22,22,22,.1) 100%)',
            zIndex: 1,
          }}
        />
        {/* Bold orange edge bar */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 6,
            background: 'var(--lava-orange)',
            zIndex: 2,
          }}
        />
        {/* Vertical rotated label */}
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
            zIndex: 2,
          }}
        >
          {t('about.hero.vertical')}
        </span>
        {/* Corner crosshair marks */}
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
            zIndex: 2,
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
            zIndex: 2,
          }}
        />


        {/* Text overlay */}
        <div className="maach-container" style={{ width: '100%', position: 'relative', zIndex: 3 }}>
          <div style={{ maxWidth: 1100 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
              <span
                className="maach-tag"
                style={{ borderColor: 'var(--lava-orange)', color: 'var(--lava-orange)' }}
              >
                {t('about.hero.tag')}
              </span>
              <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
                {t('about.hero.season')}
              </span>
            </div>

            <h1
              className="h-display"
              style={{
                fontSize: 'clamp(38px, 5.4vw, 76px)',
                marginBottom: 32,
                color: 'var(--off-white)',
                lineHeight: 0.96,
                letterSpacing: '-.02em',
              }}
            >
              {t('about.hero.h1.1')}
              <br />
              <span style={{ color: 'var(--lava-orange)' }}>{t('about.hero.h1.2')}</span>{' '}
              {t('about.hero.h1.3')}
              <br />
              {t('about.hero.h1.4')}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
              <span className="maach-mono" style={{ color: 'var(--off-white)', letterSpacing: '.1em' }}>
                {t('about.hero.meta.1')}
              </span>
              <span style={{ color: 'rgba(255,255,255,.32)' }}>/</span>
              <span className="maach-mono" style={{ color: 'var(--off-white)', letterSpacing: '.1em' }}>
                {t('about.hero.meta.2')}
              </span>
              <span style={{ color: 'rgba(255,255,255,.32)' }}>/</span>
              <span className="maach-mono" style={{ color: 'var(--off-white)', letterSpacing: '.1em' }}>
                {t('about.hero.meta.3')}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 1, background: 'var(--lava-orange)' }} />
                <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
                  {t('cta.scroll')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISIÓN / VISIÓN — editorial spreads */}
      <section
        className="invert"
        style={{
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          padding: '112px 0 96px',
          borderBottom: '1px solid var(--line)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="maach-container">
          {/* Top eyebrow row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingBottom: 24,
              marginBottom: 72,
              borderBottom: '1px solid rgba(228,226,227,.18)',
            }}
          >
            <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
              {t('about.mv.eyebrow')}
            </span>
            <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
              ESTRATEGIA · MAACH 2026
            </span>
          </div>

          {/* MISIÓN spread */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: 80,
              alignItems: 'flex-start',
              paddingBottom: 72,
              marginBottom: 72,
              borderBottom: '1px solid rgba(228,226,227,.18)',
            }}
          >
            <div>
              <span
                className="h-display"
                style={{
                  fontSize: 'clamp(60px, 11vw, 90px)',
                  color: 'var(--lava-orange)',
                  lineHeight: 0.82,
                  display: 'block',
                  letterSpacing: '-.05em',
                }}
              >
                01
              </span>
              <span
                style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--off-white)',
                  display: 'block',
                  marginTop: 20,
                }}
              >
                {t('about.mv.mision.label')}
              </span>
              <div
                style={{
                  width: 40,
                  height: 2,
                  background: 'var(--lava-orange)',
                  marginTop: 16,
                }}
              />
            </div>

            <p
              style={{
                fontFamily: 'var(--body)',
                fontWeight: 400,
                fontSize: 'clamp(18px, 1.6vw, 22px)',
                lineHeight: 1.55,
                color: 'var(--sand-grey)',
                margin: 0,
                maxWidth: 880,
              }}
            >
              {t('about.mv.mision.body')}
            </p>
          </div>

          {/* VISIÓN spread */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: 80,
              alignItems: 'flex-start',
            }}
          >
            <div>
              <span
                className="h-display"
                style={{
                  fontSize: 'clamp(60px, 11vw, 90px)',
                  color: 'var(--off-white)',
                  lineHeight: 0.82,
                  display: 'block',
                  letterSpacing: '-.05em',
                  opacity: 0.35,
                }}
              >
                02
              </span>
              <span
                style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--off-white)',
                  display: 'block',
                  marginTop: 20,
                }}
              >
                {t('about.mv.vision.label')}
              </span>
              <div
                style={{
                  width: 40,
                  height: 2,
                  background: 'var(--off-white)',
                  marginTop: 16,
                  opacity: 0.6,
                }}
              />
            </div>

            <p
              style={{
                fontFamily: 'var(--body)',
                fontWeight: 400,
                fontSize: 'clamp(18px, 1.6vw, 22px)',
                lineHeight: 1.55,
                color: 'var(--sand-grey)',
                margin: 0,
                maxWidth: 880,
              }}
            >
              {t('about.mv.vision.body')}
            </p>
          </div>
        </div>

        {/* Decorative orange corner mark */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 32,
            right: 32,
            width: 24,
            height: 24,
            borderRight: '2px solid var(--lava-orange)',
            borderBottom: '2px solid var(--lava-orange)',
          }}
        />
      </section>

      {/* SOBRE NOSOTROS */}
      <section style={{ padding: '112px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.25fr',
              gap: 72,
              alignItems: 'stretch',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 16 }}>
                {t('about.sobre.eyebrow')}
              </span>
              <h2
                className="h-display"
                style={{
                  fontSize: 'clamp(40px, 5.5vw, 80px)',
                  lineHeight: 0.95,
                  margin: 0,
                  marginBottom: 32,
                }}
              >
                {t('about.sobre.title')}
              </h2>

              <div
                style={{
                  position: 'relative',
                  flex: 1,
                  minHeight: 160,
                  border: '1px solid var(--line)',
                  overflow: 'hidden',
                  background: 'var(--soft)',
                }}
              >
                <img
                  src={asset('biblioteca-4.webp')}
                  alt=""
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(22,22,22,.45), transparent 55%)',
                  }}
                />
                {/* Corner crosshair — top-right */}
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
                {/* Caption pill */}
                <span
                  className="maach-mono"
                  style={{
                    position: 'absolute',
                    bottom: 14,
                    left: 14,
                    background: 'var(--off-white)',
                    color: 'var(--fg)',
                    padding: '5px 10px',
                  }}
                >
                  {t('about.sobre.caption')}
                </span>
                {/* Frame index */}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <p style={{ fontSize: 20, color: 'var(--fg)', lineHeight: 1.5, margin: 0 }}>
                  {t('about.sobre.body.1')}
                </p>
                <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  {t('about.sobre.body.2')}
                </p>
                <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  {t('about.sobre.body.3')}
                </p>
                <p style={{ fontSize: 17, color: 'var(--fg)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  {t('about.sobre.body.4')}
                </p>
              </div>

              {/* Signature strip — anchors the bottom of the column */}
              <div
                style={{
                  marginTop: 40,
                  paddingTop: 24,
                  borderTop: '1px solid var(--line)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 20,
                }}
              >
                <div>
                  <span
                    className="maach-mono"
                    style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 6 }}
                  >
                    {t('about.sobre.step.01.label')}
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--muted)' }}>{t('about.sobre.step.01.value')}</span>
                </div>
                <div>
                  <span
                    className="maach-mono"
                    style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 6 }}
                  >
                    {t('about.sobre.step.02.label')}
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--muted)' }}>{t('about.sobre.step.02.value')}</span>
                </div>
                <div>
                  <span
                    className="maach-mono"
                    style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 6 }}
                  >
                    {t('about.sobre.step.03.label')}
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--muted)' }}>{t('about.sobre.step.03.value')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES (kept) */}
      <section style={{ padding: '128px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div style={{ marginBottom: 64 }}>
            <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 20 }}>
              {t('about.values.eyebrow')}
            </span>
            <h2
              className="h-display"
              style={{
                fontSize: 'clamp(56px, 8vw, 90px)',
                lineHeight: 1.05,
                letterSpacing: '-.01em',
                margin: 0,
              }}
            >
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
                  minHeight: 320,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 32,
                }}
              >
                <span className="maach-mono" style={{ color: 'var(--lava-orange)' }}>
                  {v.n} / {t('about.value.label')}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--display)',
                      fontSize: 28,
                      textTransform: 'uppercase',
                      letterSpacing: '-.01em',
                      lineHeight: 1.05,
                      margin: 0,
                      marginBottom: 16,
                      /* Two lines reserved so every card's body starts at
                         the same Y. 28px × 1.05 × 2 ≈ 58px */
                      minHeight: 58,
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.55, margin: 0 }}>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFIESTO */}
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
          className="tex-slats"
          aria-hidden
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        />
        <div className="maach-container" style={{ position: 'relative', textAlign: 'center', maxWidth: 1200 }}>
          <span className="maach-mono" style={{ color: 'var(--sand-grey)', display: 'block', marginBottom: 32 }}>
            {t('about.manifesto.eyebrow')}
          </span>
          <h2
            className="h-display"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 54px)',
              color: 'var(--off-white)',
              lineHeight: 1.15,
              letterSpacing: '-.01em',
              maxWidth: 1080,
              margin: '0 auto',
            }}
          >
            {t('about.manifesto.body.1')}
            <span style={{ color: 'var(--lava-orange)' }}>{t('about.manifesto.body.2')}</span>
            {t('about.manifesto.body.3')}
            <span className="h-italic" style={{ color: 'var(--sand-grey)' }}>{t('about.manifesto.body.4')}</span>
            {t('about.manifesto.body.5')}
          </h2>
          <div style={{ width: 64, height: 1, background: 'var(--sand-grey)', margin: '48px auto 24px' }} />
          <span className="maach-mono" style={{ color: 'var(--sand-grey)', display: 'block', textAlign: 'center' }}>
            {t('about.manifesto.source')}
          </span>
        </div>
      </section>

      {/* NUESTRA HISTORIA */}
      <section style={{ padding: '88px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: 56,
              alignItems: 'stretch',
              marginBottom: 32,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
                {t('about.history.eyebrow')}
              </span>
              <h2
                className="h-display"
                style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95, margin: 0, marginBottom: 28 }}
              >
                {t('about.history.title')}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 17, color: 'var(--fg)', lineHeight: 1.55, margin: 0 }}>
                  {t('about.history.body.1')}
                </p>
                <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  {t('about.history.body.2')}
                </p>
                <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                  {t('about.history.body.3')}
                </p>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--line)',
                minHeight: 340,
              }}
            >
              <img
                src={asset('biblioteca-3.webp')}
                alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(22,22,22,.45), transparent 50%)',
                }}
              />
              <span
                className="maach-mono"
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  background: 'var(--off-white)',
                  color: 'var(--fg)',
                  padding: '5px 10px',
                }}
              >
                METAL + MADERA
              </span>
            </div>
          </div>

          {/* Stat strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
              border: '1px solid var(--line)',
            }}
          >
            <div style={{ padding: '28px 28px', borderRight: '1px solid var(--line)' }}>
              <span
                className="h-display"
                style={{
                  fontSize: 'clamp(48px, 6vw, 88px)',
                  display: 'block',
                  lineHeight: 0.9,
                  color: 'var(--lava-orange)',
                }}
              >
                30+
              </span>
              <span className="maach-mono" style={{ color: 'var(--muted)', marginTop: 8, display: 'block' }}>
                {t('about.history.stat.years').toUpperCase()}
              </span>
            </div>
            <div style={{ padding: '28px 28px' }}>
              <span
                className="h-display"
                style={{
                  fontSize: 'clamp(48px, 6vw, 88px)',
                  display: 'block',
                  lineHeight: 0.9,
                }}
              >
                03
              </span>
              <span className="maach-mono" style={{ color: 'var(--muted)', marginTop: 8, display: 'block' }}>
                {t('about.history.stat.brand').toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* NUESTRA PLANTA */}
      <section
        className="invert"
        style={{
          padding: '128px 0',
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="maach-container">
          <div style={{ maxWidth: 560, marginBottom: 64 }}>
            <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
              {t('home.planta.eyebrow')}
            </span>
            <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6.5vw, 90px)', marginBottom: 24 }}>
              {t('home.planta.title')}
            </h2>
            <p style={{ fontSize: 17, color: 'var(--sand-grey)', lineHeight: 1.5 }}>
              {t('home.planta.intro')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {[
              { n: '01', img: asset('bg-investigacion.webp'), title: t('home.planta.01.title'), body: t('home.planta.01.body') },
              { n: '02', img: asset('perspectiva-2.webp'), title: t('home.planta.02.title'), body: t('home.planta.02.body') },
              { n: '03', img: asset('biblioteca-4.webp'), title: t('home.planta.03.title'), body: t('home.planta.03.body') },
              { n: '04', img: asset('biblioteca-5.webp'), title: t('home.planta.04.title'), body: t('home.planta.04.body') },
            ].map((p) => (
              <div
                key={p.n}
                style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: '#0f0f0f' }}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .8s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                />
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(22,22,22,0) 35%, rgba(22,22,22,.85) 100%)',
                  }}
                />
                <div style={{ position: 'absolute', left: 24, right: 24, bottom: 24 }}>
                  <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 8, fontSize: 16 }}>
                    {p.n}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--display)',
                      fontSize: 'clamp(22px, 2.4vw, 30px)',
                      textTransform: 'uppercase',
                      letterSpacing: '-.01em',
                      lineHeight: 1,
                      marginBottom: 8,
                      color: 'var(--off-white)',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--sand-grey)', lineHeight: 1.45, maxWidth: 360 }}>
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section style={{ padding: '128px 0', borderBottom: '1px solid var(--line)' }}>
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

          <div
            className="team-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
          >
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="team-card"
                style={{ border: '1px solid var(--line)', background: 'var(--off-white)' }}
              >
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
                  <span
                    style={{
                      fontFamily: 'var(--display)',
                      fontWeight: 700,
                      fontSize: 72,
                      letterSpacing: '-.02em',
                      position: 'relative',
                      color: 'var(--fg)',
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

                {/* Footer — default info + orange "caja de texto" on hover */}
                <div style={{ position: 'relative', minHeight: 92 }}>
                  <div className="team-default" style={{ padding: 24 }}>
                    <h4
                      style={{
                        fontFamily: 'var(--display)',
                        fontSize: 20,
                        textTransform: 'uppercase',
                        letterSpacing: '-.01em',
                        marginBottom: 4,
                      }}
                    >
                      {m.name}
                    </h4>
                    <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                      {t(m.roleKey)}
                    </span>
                  </div>

                  <div
                    className="team-textbox"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--lava-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '16px 22px',
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <span
                        aria-hidden
                        style={{ display: 'block', color: 'var(--jet-black)', marginBottom: 6, lineHeight: 0 }}
                      >
                        <IconArrowDownRight size={14} />
                      </span>
                      <h4
                        style={{
                          fontFamily: 'var(--display)',
                          fontSize: 17,
                          textTransform: 'uppercase',
                          letterSpacing: '-.01em',
                          lineHeight: 1.05,
                          margin: 0,
                          color: 'var(--jet-black)',
                        }}
                      >
                        {m.name}
                      </h4>
                      <span
                        className="maach-mono"
                        style={{ color: 'var(--jet-black)', opacity: 0.8, fontSize: 10 }}
                      >
                        {t(m.roleKey)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                      <div style={{ width: 1, height: 50, background: 'rgba(22,22,22,.35)' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                        <img
                          aria-hidden
                          src={asset('isotipo-maach-color.png')}
                          alt=""
                          style={{ height: 12, width: 'auto', filter: 'brightness(0)' }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--display)',
                            fontWeight: 700,
                            fontSize: 38,
                            letterSpacing: '-.03em',
                            lineHeight: 1,
                            color: 'var(--off-white)',
                          }}
                        >
                          {m.init}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALIADOS */}
      <section style={{ padding: '128px 0' }}>
        <div className="maach-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 64,
              gap: 48,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ maxWidth: 480 }}>
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
                {t('about.allies.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 0.95 }}>
                {t('about.allies.title')}
              </h2>
            </div>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.55, maxWidth: 480, margin: 0 }}>
              {t('about.allies.body')}
            </p>
          </div>

          <div className="logos-marquee" aria-label="Aliados estratégicos MAACH">
            <div className="logos-track">
              {ALLIES.map((a, i) => (
                <div key={`a-${i}`} className="logos-cell" title={a.name}>
                  <img src={asset('aliados/' + a.file)} alt={a.name} />
                </div>
              ))}
            </div>
            <div className="logos-track" aria-hidden>
              {ALLIES.map((a, i) => (
                <div key={`b-${i}`} className="logos-cell" title={a.name}>
                  <img src={asset('aliados/' + a.file)} alt={a.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
