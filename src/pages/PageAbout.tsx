import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';
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
      {/* HERO — editorial spread */}
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
        <div
          style={{
            position: 'relative',
            height: 'min(88vh, 880px)',
            minHeight: 620,
            overflow: 'hidden',
            background: 'var(--jet-black)',
          }}
        >
          {/* Photo */}
          <img
            src={asset('perspectiva-2.webp')}
            alt="MAACH"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(.72) contrast(1.05)',
            }}
          />
          {/* Layered gradient for legibility */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(22,22,22,.65) 0%, rgba(22,22,22,.2) 28%, rgba(22,22,22,.35) 70%, rgba(22,22,22,.9) 100%)',
            }}
          />
          {/* Left-side vignette to anchor the headline */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(22,22,22,.55) 0%, rgba(22,22,22,.2) 35%, transparent 65%)',
            }}
          />

          {/* TOP STRIP */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              padding: '24px 48px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 4,
              borderBottom: '1px solid rgba(228,226,227,.16)',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '-.01em',
                color: 'var(--off-white)',
                textTransform: 'uppercase',
              }}
            >
              MAACH<span style={{ color: 'var(--lava-orange)' }}>®</span>
            </span>
            <span className="maach-mono" style={{ color: 'rgba(255,255,255,.78)', letterSpacing: '.08em' }}>
              § 01 / SOBRE MAACH
            </span>
            <span className="maach-mono" style={{ color: 'rgba(255,255,255,.78)', letterSpacing: '.08em' }}>
              EST. 2023 — QUITO, ECUADOR
            </span>
          </div>

          {/* HEADLINE block */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              padding: '0 48px',
              zIndex: 3,
            }}
          >
            <div style={{ maxWidth: 1240 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 32,
                    height: 1,
                    background: 'var(--lava-orange)',
                  }}
                />
                <span
                  className="maach-mono"
                  style={{ color: 'var(--lava-orange)', letterSpacing: '.14em' }}
                >
                  ESTUDIO MAACH · MANIFIESTO
                </span>
              </div>
              <h1
                className="h-display"
                style={{
                  fontSize: 'clamp(44px, 8vw, 128px)',
                  color: 'var(--off-white)',
                  lineHeight: 0.92,
                  letterSpacing: '-.025em',
                  margin: 0,
                  maxWidth: 1140,
                }}
              >
                {t('about.hero.h1')}
              </h1>
            </div>
          </div>

          {/* BOTTOM META STRIP */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '22px 48px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 4,
              borderTop: '1px solid rgba(228,226,227,.16)',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <span className="maach-mono" style={{ color: 'var(--off-white)', letterSpacing: '.1em' }}>
                CO-DISEÑO INDUSTRIAL
              </span>
              <span style={{ color: 'rgba(255,255,255,.32)' }}>/</span>
              <span className="maach-mono" style={{ color: 'var(--off-white)', letterSpacing: '.1em' }}>
                METAL + MADERA
              </span>
              <span style={{ color: 'rgba(255,255,255,.32)' }}>/</span>
              <span className="maach-mono" style={{ color: 'var(--off-white)', letterSpacing: '.1em' }}>
                30+ AÑOS DE EXPERIENCIA
              </span>
            </div>

            {/* Scroll indicator */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span
                className="maach-mono"
                style={{ color: 'rgba(255,255,255,.7)', letterSpacing: '.18em' }}
              >
                SCROLL
              </span>
              <div
                style={{
                  width: 1,
                  height: 30,
                  background:
                    'linear-gradient(to bottom, transparent, var(--lava-orange) 40%, var(--off-white) 100%)',
                }}
              />
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
                  fontSize: 'clamp(96px, 11vw, 168px)',
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
                fontFamily: 'var(--display)',
                fontWeight: 400,
                fontSize: 'clamp(20px, 2.1vw, 30px)',
                lineHeight: 1.32,
                color: 'var(--off-white)',
                margin: 0,
                maxWidth: 920,
                letterSpacing: '-.005em',
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
                  fontSize: 'clamp(96px, 11vw, 168px)',
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
                fontFamily: 'var(--display)',
                fontWeight: 400,
                fontSize: 'clamp(20px, 2.1vw, 30px)',
                lineHeight: 1.32,
                color: 'var(--off-white)',
                margin: 0,
                maxWidth: 920,
                letterSpacing: '-.005em',
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
      <section style={{ padding: '128px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.4fr',
              gap: 96,
              alignItems: 'flex-start',
            }}
          >
            <div>
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 16 }}>
                {t('about.sobre.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6.5vw, 96px)', lineHeight: 0.95 }}>
                {t('about.sobre.title')}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p style={{ fontSize: 19, color: 'var(--fg)', lineHeight: 1.55, margin: 0 }}>
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
          </div>
        </div>
      </section>

      {/* VALORES (kept) */}
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
                    {t(m.roleKey)}
                  </span>
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

          <div
            className="allies-grid keep-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              border: '1px solid var(--line)',
              background: 'var(--off-white)',
              ['--keep-cols' as any]: 'repeat(2, 1fr)',
            }}
          >
            {ALLIES.map((a, i) => {
              const col = i % 5;
              const isLastRow = i >= ALLIES.length - (ALLIES.length % 5 || 5);
              return (
                <div
                  key={a.name}
                  style={{
                    aspectRatio: '4/3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '28px 24px',
                    borderRight: col === 4 ? 0 : '1px solid var(--line)',
                    borderBottom: isLastRow ? 0 : '1px solid var(--line)',
                    background: 'var(--off-white)',
                    transition: 'background .2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--soft)';
                    const img = e.currentTarget.querySelector<HTMLImageElement>('img');
                    if (img) img.style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--off-white)';
                    const img = e.currentTarget.querySelector<HTMLImageElement>('img');
                    if (img) img.style.transform = '';
                  }}
                >
                  <img
                    src={asset('aliados/' + a.file)}
                    alt={a.name}
                    title={a.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: 72,
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      transition: 'transform .25s ease',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
