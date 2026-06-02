import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';
import { useT } from '../i18n/i18n';

export default function PageEspacios() {
  const t = useT();
  const spaces = [
    { id: '01', title: t('esp.typ.01.name'), desc: t('esp.typ.01.desc'), products: t('esp.typ.01.products'), cat: 'escritorios', img: asset('biblioteca-2.webp') },
    { id: '02', title: t('esp.typ.02.name'), desc: t('esp.typ.02.desc'), products: t('esp.typ.02.products'), cat: 'mesas', img: asset('biblioteca-3.webp') },
    { id: '03', title: t('esp.typ.03.name'), desc: t('esp.typ.03.desc'), products: t('esp.typ.03.products'), cat: 'recepciones', img: asset('biblioteca-4.webp') },
    { id: '04', title: t('esp.typ.04.name'), desc: t('esp.typ.04.desc'), products: t('esp.typ.04.products'), cat: 'almacenamiento', img: asset('biblioteca-1.webp') },
  ];

  return (
    <Layout screenLabel="07 Espacios">
      {/* HERO — full-bleed background image, brand-book style */}
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
        {/* Brand-book hero photo */}
        <img
          src={asset('bg-espacios.webp')}
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
        {/* Dark gradient for headline legibility */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(95deg, rgba(22,22,22,.78) 0%, rgba(22,22,22,.5) 40%, rgba(22,22,22,.15) 75%, transparent 100%)',
            zIndex: 0,
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
            fontSize: 'clamp(60px, 52vw, 90px)',
            lineHeight: 0.78,
            color: 'var(--lava-orange)',
            opacity: 0.06,
            letterSpacing: '-0.04em',
            zIndex: 0,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          07
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
        {/* Top header strip — eyebrow left, page tag right */}
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
            color: 'var(--off-white)',
          }}
        >
          <span
            className="maach-mono"
            style={{ color: 'var(--lava-orange)' }}
          >
            {t('esp.hero.eyebrow')}
          </span>
          <span className="maach-mono" style={{ color: 'var(--off-white)' }}>
            {t('esp.hero.section')}
          </span>
        </div>
        {/* Orange L crosshairs */}
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
          style={{ position: 'relative', zIndex: 3, width: '100%', paddingBottom: 64, paddingTop: 64 }}
        >
          <div style={{ maxWidth: 1100, display: 'grid', gap: 32 }}>
            <h1
              className="h-display"
              style={{
                fontSize: 'clamp(64px, 9vw, 90px)',
                color: 'var(--off-white)',
                lineHeight: 0.92,
                margin: 0,
              }}
            >
              {t('esp.hero.title.1')}<span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{t('esp.hero.title.2')}</span>
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
              {t('esp.hero.body')}
            </p>
          </div>

          {/* Stat strip — bottom bar */}
          <div
            style={{
              marginTop: 48,
              paddingTop: 28,
              borderTop: '1px solid rgba(228,226,227,.35)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
              maxWidth: 720,
            }}
          >
            {[
              { n: '04', l: t('esp.stat.tipologias') },
              { n: '12', l: t('esp.stat.sistemas') },
              { n: '48', l: t('esp.stat.configs') },
              { n: '09', l: t('esp.stat.acabados') },
            ].map((s) => (
              <div key={s.l}>
                <div
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 40,
                    lineHeight: 1,
                    marginBottom: 6,
                    color: 'var(--lava-orange)',
                    letterSpacing: '-.02em',
                  }}
                >
                  {s.n}
                </div>
                <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPOLOGIES — 2x2 cinematic grid */}
      <section style={{ padding: '128px 0', borderBottom: '1px solid var(--line)' }}>
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
                {t('esp.typ.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6.5vw, 90px)' }}>
                {t('esp.typ.title.1')} <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{t('esp.typ.title.2')}</span>
              </h2>
            </div>
            <span className="maach-mono" style={{ color: 'var(--muted)' }}>
              {t('esp.typ.count')}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {spaces.map((s, i) => {
              const imageRight = i % 2 === 1;
              const products = s.products.split('·').map((p) => p.trim()).filter(Boolean);
              return (
                <div
                  key={s.id}
                  className="esp-typ-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.05fr 1fr',
                    gap: 'clamp(40px, 6vw, 96px)',
                    alignItems: 'center',
                    padding: '64px 0',
                    borderTop: i === 0 ? '1px solid var(--line)' : 'none',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  {/* IMAGE */}
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '4/3',
                      overflow: 'hidden',
                      background: 'var(--jet-black)',
                      order: imageRight ? 2 : 1,
                    }}
                  >
                    <img
                      src={s.img}
                      alt={s.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Oversized number watermark */}
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        bottom: 12,
                        left: 18,
                        fontFamily: 'var(--display)',
                        fontWeight: 700,
                        fontSize: 'clamp(64px, 9vw, 130px)',
                        lineHeight: 0.8,
                        color: 'var(--off-white)',
                        opacity: 0.85,
                        letterSpacing: '-.04em',
                        textShadow: '0 2px 30px rgba(0,0,0,.6)',
                        pointerEvents: 'none',
                      }}
                    >
                      {s.id}
                    </span>
                    {/* Orange L corner */}
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        top: 14,
                        right: 14,
                        width: 20,
                        height: 20,
                        borderTop: '2px solid var(--lava-orange)',
                        borderRight: '2px solid var(--lava-orange)',
                      }}
                    />
                  </div>

                  {/* CONTENT */}
                  <div style={{ order: imageRight ? 1 : 2 }}>
                    <span
                      className="maach-mono"
                      style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16, letterSpacing: '.1em' }}
                    >
                      {t('esp.typ.tipologia_label')} {s.id}
                    </span>
                    <h3
                      className="h-display"
                      style={{ fontSize: 'clamp(34px, 4vw, 56px)', lineHeight: 1, margin: 0, marginBottom: 20 }}
                    >
                      {s.title}.
                    </h3>
                    <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.65, margin: 0, maxWidth: 560 }}>
                      {s.desc}
                    </p>

                    <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                      <span
                        className="maach-mono"
                        style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 14, letterSpacing: '.1em' }}
                      >
                        {t('esp.typ.products_label').toUpperCase()}
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {products.map((p) => (
                          <span
                            key={p}
                            style={{
                              fontSize: 13,
                              padding: '7px 14px',
                              border: '1px solid var(--line)',
                              borderRadius: 999,
                              color: 'var(--fg)',
                              background: 'var(--soft)',
                            }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={`/categorias/${s.cat}`}
                      className="maach-mono"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 28,
                        color: 'var(--fg)',
                        paddingBottom: 4,
                        borderBottom: '1.5px solid var(--lava-orange)',
                      }}
                    >
                      {t('cta.view_products')} <IconArrow size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS — black band, 4 steps */}
      <section
        className="invert"
        style={{
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          padding: '128px 0',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          className="tex-load-line"
          style={{ position: 'absolute', inset: 0, color: 'var(--off-white)', pointerEvents: 'none' }}
        />
        <div className="maach-container" style={{ position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 64,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 12 }}>
                {t('esp.proc.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6.5vw, 90px)' }}>
                {t('esp.proc.title.1')}<br />
                <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{t('esp.proc.title.2')}</span>
              </h2>
            </div>
            <span className="maach-mono" style={{ color: 'var(--sand-grey)', maxWidth: 380 }}>
              {t('esp.proc.subtitle')}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {[
              { n: '01', title: t('esp.proc.01.title'), body: t('esp.proc.01.body') },
              { n: '02', title: t('esp.proc.02.title'), body: t('esp.proc.02.body') },
              { n: '03', title: t('esp.proc.03.title'), body: t('esp.proc.03.body') },
              { n: '04', title: t('esp.proc.04.title'), body: t('esp.proc.04.body') },
            ].map((p) => (
              <div key={p.n} style={{ borderTop: '2px solid var(--lava-orange)', paddingTop: 24 }}>
                <span
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 56,
                    lineHeight: 1,
                    letterSpacing: '-.02em',
                    color: 'var(--lava-orange)',
                    display: 'block',
                    marginBottom: 24,
                  }}
                >
                  {p.n}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 600,
                    fontSize: 26,
                    lineHeight: 1.05,
                    letterSpacing: '-.01em',
                    textTransform: 'uppercase',
                    marginBottom: 14,
                    color: 'var(--off-white)',
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--sand-grey)', lineHeight: 1.55 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES strip */}
      <section style={{ padding: '96px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div style={{ marginBottom: 40 }}>
            <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
              {t('esp.del.eyebrow')}
            </span>
            <h2
              className="h-display"
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                lineHeight: 0.95,
                letterSpacing: '-.01em',
                margin: 0,
              }}
            >
              {t('esp.del.title')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0, border: '1px solid var(--line)' }}>
            {[
              t('esp.del.01'),
              t('esp.del.02'),
              t('esp.del.03'),
              t('esp.del.04'),
              t('esp.del.05'),
              t('esp.del.06'),
            ].map((d, i) => (
              <div
                key={d}
                style={{
                  padding: '32px 24px',
                  borderRight: (i + 1) % 6 === 0 ? 0 : '1px solid var(--line)',
                  minHeight: 160,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  className="maach-mono"
                  style={{ color: 'var(--lava-orange)', fontSize: 12, fontWeight: 700 }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 600,
                    fontSize: 17,
                    lineHeight: 1.15,
                    textTransform: 'uppercase',
                    letterSpacing: '-.005em',
                  }}
                >
                  {d}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — orange band, differentiates from the dark footer below */}
      <section
        style={{
          background: 'var(--lava-orange)',
          color: 'var(--off-white)',
          padding: '120px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            width: 22,
            height: 22,
            borderTop: '2px solid var(--off-white)',
            borderRight: '2px solid var(--off-white)',
            opacity: 0.8,
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
            borderBottom: '2px solid var(--off-white)',
            borderLeft: '2px solid var(--off-white)',
            opacity: 0.8,
          }}
        />
        <div className="maach-container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <span className="maach-mono" style={{ color: 'var(--jet-black)', display: 'block', marginBottom: 16 }}>
                {t('esp.cta.eyebrow')}
              </span>
              <h2
                className="h-display"
                style={{
                  fontSize: 'clamp(48px, 7vw, 90px)',
                  color: 'var(--off-white)',
                  marginBottom: 24,
                  lineHeight: 0.95,
                }}
              >
                {t('esp.cta.title.1')} <span className="h-italic" style={{ color: 'var(--jet-black)' }}>{t('esp.cta.title.2')}</span> {t('esp.cta.title.3')}
              </h2>
              <p style={{ color: 'rgba(255,255,255,.92)', fontSize: 18, maxWidth: 560, lineHeight: 1.5 }}>
                {t('esp.cta.body')}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link
                to="/contacto"
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: '20px 28px',
                  background: 'var(--jet-black)',
                  color: 'var(--off-white)',
                  border: '1.5px solid var(--jet-black)',
                }}
              >
                {t('cta.start_planning')} <IconArrow size={14} />
              </Link>
              <Link
                to="/portafolio"
                className="btn-ghost"
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: '20px 28px',
                  background: 'transparent',
                  color: 'var(--off-white)',
                  border: '1.5px solid var(--off-white)',
                }}
              >
                {t('cta.see_case_studies')} <IconArrow size={14} />
              </Link>
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: '1px solid rgba(22,22,22,.25)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span className="maach-mono" style={{ color: 'rgba(22,22,22,.8)' }}>
                  {t('esp.cta.response_in')}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 32,
                    color: 'var(--jet-black)',
                    letterSpacing: '-.02em',
                  }}
                >
                  &lt; 24 hrs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
