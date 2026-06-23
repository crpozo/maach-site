import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { Layout, Marquee } from '../components/Layout';
import { IconArrow, IconArrowDownRight } from '../components/icons';
import { useT } from '../i18n/i18n';

export default function PageHome() {
  const t = useT();
  return (
    <Layout screenLabel="01 Home">
      {/* HERO — full-bleed photo with text overlay */}
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
          src={asset("biblioteca-1.webp")}
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
              'linear-gradient(95deg, rgba(22,22,22,.85) 0%, rgba(22,22,22,.65) 35%, rgba(22,22,22,.3) 65%, rgba(22,22,22,.05) 100%)',
            zIndex: 1,
          }}
        />
        {/* Circuit-board texture overlay */}
        <div
          className="tex-circuit"
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            opacity: 0.22,
            pointerEvents: 'none',
            backgroundImage: `url(${asset('hero-patron.png')})`,
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
          MAACH · SISTEMA 2026
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span
                className="maach-tag"
                style={{ borderColor: 'var(--lava-orange)', color: 'var(--lava-orange)' }}
              >
                {t('home.hero.tag')}
              </span>
            </div>

            <h1
              className="h-display"
              style={{
                fontSize: 'clamp(48px, 7vw, 90px)',
                marginBottom: 32,
                color: 'var(--off-white)',
              }}
            >
              {t('home.hero.h1.1')}{' '}
              <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>
                {t('home.hero.h1.2')}
              </span>
              <br />
              {t('home.hero.h1.3')} {t('home.hero.h1.4')}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <Link to="/productos" className="btn-primary">
                {t('cta.explore')} <IconArrow size={14} />
              </Link>
              <Link to="/contacto" className="btn-ghost">
                {t('cta.spec')}
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 1, background: 'var(--off-white)' }} />
                <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
                  {t('cta.scroll')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* CATEGORÍAS */}
      <section style={{ padding: '128px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 80,
              gap: 32,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 16 }}>
                {t('home.cat.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(56px, 8vw, 90px)' }}>
                {t('home.cat.title')}
              </h2>
            </div>
            <Link
              to="/productos"
              style={{
                borderBottom: '1.5px solid var(--fg)',
                paddingBottom: 6,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
              }}
              className="maach-mono"
            >
              {t('cta.see_catalog')} <IconArrow size={14} />
            </Link>
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
              { id: '01', slug: 'silloneria',    name: t('home.cat.01.name'), desc: t('home.cat.01.desc'), img: asset('biblioteca-1.webp') },
              { id: '02', slug: 'escritorios',   name: t('home.cat.02.name'), desc: t('home.cat.02.desc'), img: asset('biblioteca-2.webp') },
              { id: '03', slug: 'mesas',         name: t('home.cat.03.name'), desc: t('home.cat.03.desc'), img: asset('perspectiva-2.webp') },
              { id: '04', slug: 'almacenamiento', name: t('home.cat.04.name'), desc: t('home.cat.04.desc'), img: asset('biblioteca-3.webp') },
              { id: '05', slug: 'divisiones',    name: t('home.cat.05.name'), desc: t('home.cat.05.desc'), img: asset('biblioteca-4.webp') },
              { id: '06', slug: 'recepciones',   name: t('home.cat.06.name'), desc: t('home.cat.06.desc'), img: asset('biblioteca-5.webp') },
            ].map((cat, i) => {
              return (
                <Link
                  key={cat.id}
                  to={`/categorias/${cat.slug}`}
                  className="cat-card"
                  style={{
                    borderRight: (i + 1) % 3 === 0 ? 0 : '1px solid var(--line)',
                    borderBottom: i < 3 ? '1px solid var(--line)' : 0,
                    padding: '40px 36px',
                    minHeight: 420,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'var(--jet-black)',
                    color: 'var(--off-white)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector<HTMLImageElement>('img[data-cat-bg]');
                    if (img) img.style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector<HTMLImageElement>('img[data-cat-bg]');
                    if (img) img.style.transform = '';
                  }}
                >
                  <img
                    src={cat.img}
                    alt=""
                    data-cat-bg
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform .9s ease',
                      zIndex: 0,
                    }}
                  />
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(22,22,22,.5) 0%, rgba(22,22,22,.25) 25%, rgba(22,22,22,.75) 65%, rgba(22,22,22,.95) 100%)',
                      zIndex: 1,
                    }}
                  />
                  {/* Distinct texture per card — revealed on hover */}
                  <div
                    className="cat-texture"
                    aria-hidden
                    style={{ backgroundImage: `url(${asset(`texture-${(i % 7) + 1}.png`)})` }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-start',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    <IconArrowDownRight size={22} />
                  </div>

                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--display)',
                        fontSize: 'clamp(28px, 3vw, 44px)',
                        letterSpacing: '-.02em',
                        lineHeight: 0.95,
                        margin: 0,
                        textTransform: 'uppercase',
                        color: 'var(--off-white)',
                        textShadow: '0 2px 24px rgba(0,0,0,.55)',
                        overflowWrap: 'break-word',
                        hyphens: 'auto',
                        /* Reserve room for up to 2 lines so every card aligns
                           the title on the same baseline. 44px font × 0.95
                           line-height × 2 ≈ 84px */
                        minHeight: 84,
                        display: 'flex',
                        alignItems: 'flex-end',
                      }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.55,
                        maxWidth: 320,
                        color: 'rgba(255,255,255,.95)',
                        margin: 0,
                        textShadow: '0 1px 12px rgba(0,0,0,.6)',
                        /* Same idea for the description: 14px × 1.55 × 2 ≈ 44px */
                        minHeight: 44,
                      }}
                    >
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADN */}
      <section
        className="invert"
        style={{
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          padding: '72px 0',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="tex-load-line"
          style={{ position: 'absolute', inset: 0, color: 'var(--off-white)', pointerEvents: 'none' }}
        />
        <div className="maach-container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 64, alignItems: 'center' }}>
            <div>
              <span className="maach-mono" style={{ color: 'var(--sand-grey)', marginBottom: 16, display: 'block' }}>
                {t('home.adn.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(56px, 8vw, 90px)', marginBottom: 24 }}>
                {t('home.adn.title.1')}<br />
                <span className="h-italic" style={{ color: 'var(--sand-grey)' }}>{t('home.adn.title.2')}</span>
              </h2>
              <p style={{ fontSize: 17, color: 'var(--sand-grey)', lineHeight: 1.45, maxWidth: 380, marginBottom: 32 }}>
                {t('home.adn.intro')}
              </p>

              <div
                style={{
                  width: 110,
                  height: 110,
                  border: '1px solid rgba(228,226,227,.25)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  animation: 'spin-slow 24s linear infinite',
                }}
              >
                <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', position: 'absolute' }}>
                  <defs>
                    <path id="circ" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
                  </defs>
                  <text fill="var(--sand-grey)" fontSize="11" letterSpacing="3" fontFamily="JetBrains Mono">
                    <textPath href="#circ">
                      MAACH · SISTEMA 2026 · INDUSTRIAL DESIGN · REAL PERFORMANCE ·{' '}
                    </textPath>
                  </text>
                </svg>
                <div style={{ width: 16, height: 16, background: 'var(--lava-orange)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              {[
                { n: '01', title: t('home.adn.01.title'), body: t('home.adn.01.body') },
                { n: '02', title: t('home.adn.02.title'), body: t('home.adn.02.body') },
                { n: '03', title: t('home.adn.03.title'), body: t('home.adn.03.body') },
                { n: '04', title: t('home.adn.04.title'), body: t('home.adn.04.body') },
              ].map((p) => (
                <div key={p.n}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
                    <span
                      className="maach-mono"
                      style={{
                        fontSize: 14,
                        fontFamily: 'var(--mono)',
                        letterSpacing: 0,
                        color: 'var(--lava-orange)',
                        fontWeight: 700,
                      }}
                    >
                      {p.n}
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(228,226,227,.25)' }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--display)',
                      fontSize: 26,
                      lineHeight: 0.95,
                      marginBottom: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '-.02em',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--sand-grey)' }}>
                    {p.body}
                  </p>
                </div>
              ))}
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 8,
            }}
          >
            {[
              { n: '01', img: asset('bg-investigacion.webp'), title: t('home.planta.01.title'), body: t('home.planta.01.body') },
              { n: '02', img: asset('perspectiva-2.webp'), title: t('home.planta.02.title'), body: t('home.planta.02.body') },
              { n: '03', img: asset('biblioteca-4.webp'), title: t('home.planta.03.title'), body: t('home.planta.03.body') },
              { n: '04', img: asset('biblioteca-5.webp'), title: t('home.planta.04.title'), body: t('home.planta.04.body') },
            ].map((p) => (
              <div
                key={p.n}
                style={{
                  position: 'relative',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  background: 'var(--ink-900, #0f0f0f)',
                }}
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
                    background:
                      'linear-gradient(180deg, rgba(22,22,22,0) 35%, rgba(22,22,22,.85) 100%)',
                  }}
                />
                <div style={{ position: 'absolute', left: 24, right: 24, bottom: 24 }}>
                  <span
                    className="maach-mono"
                    style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 8 }}
                  >
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

      {/* PROYECTOS DESTACADOS */}
      <section style={{ padding: '128px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
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
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 16 }}>
                {t('home.cases.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6.5vw, 90px)' }}>
                {t('home.cases.title')}
              </h2>
            </div>
            <Link
              to="/portafolio"
              className="maach-mono"
              style={{
                borderBottom: '1.5px solid var(--fg)',
                paddingBottom: 6,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              {t('cta.see_portfolio')} <IconArrow size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {([
              { id: '01', img: asset('proyectos/cpn/01.webp'), title: 'CPN', location: 'Quito, EC', area: '2,400 m²', year: '2025' },
              { id: '02', img: asset('proyectos/palladium/02.webp'), title: 'Palladium', location: 'Quito, EC', area: '1,200 m²', year: '2024' },
            ] as Array<{ id: string; img?: string; title: string; location?: string; area?: string; year?: string }>).map((p) => (
              <Link
                key={p.id}
                to={`/portafolio/${p.id}`}
                style={{
                  position: 'relative',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  display: 'block',
                  background: 'var(--jet-black)',
                }}
              >
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .8s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                  />
                ) : (
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: 6,
                      background: 'var(--lava-orange)',
                    }}
                  />
                )}
                <div
                  style={{
                    position: 'absolute',
                    left: 16,
                    right: 16,
                    bottom: 16,
                    background: 'var(--off-white)',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: 16,
                  }}
                >
                  <div>
                    {p.location ? (
                      <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                        {p.location}
                      </span>
                    ) : null}
                    <h4
                      style={{
                        fontFamily: 'var(--display)',
                        fontSize: 22,
                        letterSpacing: '-.01em',
                        textTransform: 'uppercase',
                        lineHeight: 1,
                      }}
                    >
                      {p.title}
                    </h4>
                  </div>
                  {p.year ? (
                    <span className="maach-mono" style={{ color: 'var(--lava-orange)', whiteSpace: 'nowrap' }}>
                      {p.year}
                    </span>
                  ) : null}
                </div>
                {p.area ? (
                  <div style={{ position: 'absolute', top: 16, right: 16 }}>
                    <span
                      className="maach-mono"
                      style={{ background: 'var(--jet-black)', color: 'var(--off-white)', padding: '4px 8px' }}
                    >
                      {p.area}
                    </span>
                  </div>
                ) : null}
              </Link>
            ))}
          </div>

          {/* CTA → Investigación / Blog */}
          <Link
            to="/investigacion"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 32,
              marginTop: 56,
              padding: '36px 40px',
              background: 'var(--jet-black)',
              color: 'var(--off-white)',
              border: '1px solid var(--jet-black)',
              transition: 'background .25s ease, color .25s ease',
              flexWrap: 'wrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--lava-orange)';
              e.currentTarget.style.borderColor = 'var(--lava-orange)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--jet-black)';
              e.currentTarget.style.borderColor = 'var(--jet-black)';
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span
                className="maach-mono"
                style={{ color: 'var(--lava-orange)', letterSpacing: '.12em' }}
              >
                {t('home2.research_eyebrow')}
              </span>
              <span
                className="h-display"
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  lineHeight: 1.1,
                  letterSpacing: '-.01em',
                  color: 'var(--off-white)',
                }}
              >
                {t('home2.research_title')}
              </span>
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
                flexShrink: 0,
              }}
            >
              {t('home2.research_link')} <IconArrow size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* CLIENTES */}
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
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 16 }}>
                {t('home.clientes.eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6.5vw, 90px)' }}>
                {t('home.clientes.title.1')}{' '}
                <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{t('home.clientes.title.2')}</span>
              </h2>
            </div>
            <span className="maach-mono" style={{ color: 'var(--muted)' }}>
              {t('home.clientes.count')}
            </span>
          </div>

          {(() => {
            const clientes: { name: string; file?: string }[] = [
              { name: 'Gran Comercio', file: 'gran-comercio.png' },
              { name: 'Contract Workplaces', file: 'contract-workplaces.png' },
              { name: 'Induvallas', file: 'induvallas.png' },
              { name: 'Sarmiento', file: 'sarmiento.jpeg' },
              { name: 'Grupo KFC', file: 'grupo-kfc.jpeg' },
              { name: 'UDLA', file: 'udla.png' },
              { name: 'Cooperativa Policía Nacional' },
              { name: 'ConstruEcuador', file: 'construecuador.jpg' },
              { name: 'Liga Deportiva U.', file: 'liga-deportiva-u.jpeg' },
              { name: 'PUCE', file: 'puce.png' },
              { name: 'Zaimella', file: 'zaimella.png' },
              { name: 'Corporación Maresa', file: 'corporacion-maresa.avif' },
              { name: 'Kruger', file: 'kruger.png' },
              { name: 'Arroyo & Arroyo', file: 'arroyo-arroyo.jpg' },
              { name: 'Carsnack', file: 'carsnack.jpg' },
              { name: 'UIDE', file: 'uide.webp' },
              { name: 'PMJ Arquitectos', file: 'pmj-arquitectos.png' },
              { name: 'Banco ProCredit', file: 'banco-procredit.png' },
              { name: 'Grupo Puentes', file: 'grupo-puentes.png' },
              { name: 'Wesco', file: 'wesco.webp' },
              { name: 'Palladium', file: 'palladium.jpg' },
              { name: 'Tropi Burger', file: 'tropi-burger.webp' },
            ];

            const renderCell = (c: { name: string; file?: string }, key: string) => (
              <div key={key} className="logos-cell" title={c.name}>
                {c.file ? (
                  <img
                    src={asset(`clientes/${c.file}`)}
                    alt={c.name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <span
                  className="maach-mono"
                  style={{
                    display: c.file ? 'none' : 'flex',
                    textAlign: 'center',
                    fontSize: 11,
                    letterSpacing: '.08em',
                    color: 'var(--fg)',
                    lineHeight: 1.3,
                  }}
                >
                  {c.name}
                </span>
              </div>
            );

            // Duplicate the list so the marquee can loop seamlessly
            // (animation translates -50% → first copy ends where second copy begins)
            return (
              <div className="logos-marquee" aria-label="Clientes MAACH">
                <div className="logos-track">
                  {clientes.map((c, i) => renderCell(c, `a-${i}`))}
                </div>
                <div className="logos-track" aria-hidden>
                  {clientes.map((c, i) => renderCell(c, `b-${i}`))}
                </div>
              </div>
            );
          })()}

          <p
            className="maach-mono"
            style={{ color: 'var(--muted)', marginTop: 24, textAlign: 'center', fontSize: 11 }}
          >
            {t('home.clientes.footnote')}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ padding: '96px 64px', background: 'var(--off-white)', position: 'relative', overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                top: 32,
                right: 32,
                width: 56,
                height: 56,
                borderTop: '2px solid var(--lava-orange)',
                borderRight: '2px solid var(--lava-orange)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 32,
                left: 32,
                width: 56,
                height: 56,
                borderBottom: '2px solid var(--lava-orange)',
                borderLeft: '2px solid var(--lava-orange)',
              }}
            />

            <span className="maach-mono" style={{ color: 'var(--lava-orange)', marginBottom: 24, display: 'block' }}>
              {t('home.precision.eyebrow')}
            </span>
            <h2 className="h-display" style={{ fontSize: 'clamp(48px, 7vw, 90px)', marginBottom: 32 }}>
              {t('home.precision.title.1')}<br />
              <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{t('home.precision.title.2')}</span>
            </h2>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                fontFamily: 'var(--mono)',
                fontSize: 13,
                letterSpacing: '.06em',
              }}
            >
              {[
                [t('home.precision.row1.k'), t('home.precision.row1.v')],
                [t('home.precision.row2.k'), t('home.precision.row2.v')],
                [t('home.precision.row3.k'), t('home.precision.row3.v')],
                [t('home.precision.row4.k'), t('home.precision.row4.v')],
              ].map(([k, v]) => (
                <li key={k} style={{ display: 'flex', gap: 16 }}>
                  <span style={{ color: 'var(--muted)', width: 180 }}>{k}</span>
                  <span style={{ fontWeight: 700, color: 'var(--lava-orange)' }}>{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              padding: '96px 64px',
              background: 'var(--soft)',
              position: 'relative',
              overflow: 'hidden',
              borderLeft: '1px solid var(--line)',
            }}
          >
            <div className="tex-forged-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 2, maxWidth: 480 }}>
              <span className="maach-mono" style={{ color: 'var(--muted)', marginBottom: 24, display: 'block' }}>
                {t('home.spec.eyebrow')}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: 48,
                  marginBottom: 24,
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  letterSpacing: '-.02em',
                }}
              >
                {t('home.spec.title')}
              </h3>
              <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 40, lineHeight: 1.55 }}>
                {t('home.spec.body')}
              </p>
              <Link to="/contacto" className="btn-primary" style={{ width: '100%', justifyContent: 'space-between' }}>
                {t('cta.engineering')} <IconArrow size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
