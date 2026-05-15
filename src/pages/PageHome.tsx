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

        {/* Photo-ID labels — bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            right: 64,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            alignItems: 'flex-end',
          }}
        >
          <span
            className="maach-mono"
            style={{ background: 'var(--jet-black)', color: 'var(--off-white)', padding: '6px 10px' }}
          >
            MCH-2026-A1
          </span>
          <span
            className="maach-mono"
            style={{ background: 'var(--lava-orange)', color: 'var(--off-white)', padding: '6px 10px' }}
          >
            + DISPONIBLE
          </span>
        </div>

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
              <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
                {t('home.hero.season')}
              </span>
            </div>

            <h1
              className="h-display"
              style={{
                fontSize: 'clamp(48px, 7vw, 120px)',
                marginBottom: 32,
                color: 'var(--off-white)',
              }}
            >
              Industrial{' '}
              <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>
                Design,
              </span>
              <br />
              Real Performance.
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
                § 02 / Sistema
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(56px, 8vw, 128px)' }}>
                Categorías.
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
              Ver catálogo completo <IconArrow size={14} />
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
              { id: '01', name: 'Sillonería', desc: 'Ergonomía técnica, sillas gerenciales, operativas y sofás.', texture: 'tex-forged-grid', img: asset('biblioteca-1.webp') },
              { id: '02', name: 'Escritorios + Estaciones', desc: 'Sistemas modulares, escritorios operativos y regulables.', texture: 'tex-stack-force', img: asset('biblioteca-2.webp') },
              { id: '03', name: 'Mesas', desc: 'Mesas de reunión, colaborativas y auxiliares.', texture: 'tex-load-line', img: asset('perspectiva-2.webp') },
              { id: '04', name: 'Almacenamiento', desc: 'Credenzas, archivos rodantes, lockers y bibliotecas.', texture: 'tex-tactile-field', img: asset('biblioteca-3.webp') },
              { id: '05', name: 'Divisiones', desc: 'Sistemas modulares de piso a techo y divisorias de vidrio.', texture: 'tex-steel-align', img: asset('biblioteca-4.webp') },
              { id: '06', name: 'Arquitectura', desc: 'Muros modulares, pods y mamparas divisorias para alta densidad.', texture: 'tex-factory-core', img: asset('biblioteca-5.webp') },
            ].map((cat, i) => {
              return (
                <Link
                  key={cat.id}
                  to="/productos"
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
                        'linear-gradient(180deg, rgba(22,22,22,.35) 0%, rgba(22,22,22,.55) 55%, rgba(22,22,22,.85) 100%)',
                      zIndex: 1,
                    }}
                  />
                  {/* Brand texture overlay */}
                  <div
                    className={cat.texture}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none',
                      color: 'var(--off-white)',
                      zIndex: 1,
                    }}
                  />

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    <span className="maach-mono">CAT_{cat.id}</span>
                    <IconArrowDownRight size={22} />
                  </div>

                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--display)',
                        fontWeight: 700,
                        fontSize: 44,
                        letterSpacing: '-.02em',
                        lineHeight: 0.95,
                        marginBottom: 12,
                        textTransform: 'uppercase',
                        color: 'var(--off-white)',
                      }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.55,
                        opacity: 0.85,
                        maxWidth: 320,
                        color: 'var(--off-white)',
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
                § 03 / Filosofía
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', marginBottom: 24 }}>
                ADN<br />
                <span className="h-italic" style={{ color: 'var(--sand-grey)' }}>Industrial.</span>
              </h2>
              <p style={{ fontSize: 17, color: 'var(--sand-grey)', lineHeight: 1.45, maxWidth: 380, marginBottom: 32 }}>
                Cada decisión responde a ingeniería, durabilidad y desempeño en el tiempo.
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
                { n: '01', title: 'Integridad Estructural', body: 'Ingeniería sólida pensada para el uso intensivo. Mobiliario que no se deforma y mantiene sus propiedades a lo largo de los años.' },
                { n: '02', title: 'Funcionalidad Consciente', body: 'Diseño centrado en resolver exigencias operativas reales. Si una pieza no cumple un propósito técnico, se elimina del esquema.' },
                { n: '03', title: 'Escalabilidad Modular', body: 'Sistemas creados para crecer y reconfigurarse. Componentes que se integran mediante ingeniería de nodos.' },
                { n: '04', title: 'Co-diseño con arquitectos', body: 'Trabajamos junto a estudios y clientes para resolver requerimientos técnicos específicos. El diseño se construye en conjunto.' },
              ].map((p) => (
                <div key={p.n}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
                    <span
                      className="maach-mono"
                      style={{
                        fontSize: 18,
                        fontFamily: 'var(--display)',
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
                      fontWeight: 600,
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
                § 04 / Portafolio
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6.5vw, 96px)' }}>
                Casos de Estudio.
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
              Ver portafolio <IconArrow size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { id: '01', img: asset('proyectos/cpn/01.webp'), title: 'Proyecto CPN', location: 'Quito, EC', area: '2,400 m²', year: '2025' },
              { id: '02', img: asset('proyectos/palladium/02.webp'), title: 'Palladium', location: 'Quito, EC', area: '1,200 m²', year: '2024' },
              { id: '03', img: asset('biblioteca-4.webp'), title: 'Hub de Innovación', location: 'Guadalajara', area: '1,200 m²', year: '2025' },
            ].map((p) => (
              <Link
                key={p.id}
                to={`/portafolio/${p.id}`}
                style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  overflow: 'hidden',
                  display: 'block',
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
                    <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                      PRJ-{p.id} · {p.location}
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--display)',
                        fontWeight: 700,
                        fontSize: 22,
                        letterSpacing: '-.01em',
                        textTransform: 'uppercase',
                        lineHeight: 1,
                      }}
                    >
                      {p.title}
                    </h4>
                  </div>
                  <span className="maach-mono" style={{ color: 'var(--lava-orange)', whiteSpace: 'nowrap' }}>
                    {p.year}
                  </span>
                </div>
                <div style={{ position: 'absolute', top: 16, right: 16 }}>
                  <span
                    className="maach-mono"
                    style={{ background: 'var(--jet-black)', color: 'var(--off-white)', padding: '4px 8px' }}
                  >
                    {p.area}
                  </span>
                </div>
              </Link>
            ))}
          </div>
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
                § 05 / Clientes
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6.5vw, 96px)' }}>
                Confianza <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>industrial.</span>
              </h2>
            </div>
            <span className="maach-mono" style={{ color: 'var(--muted)' }}>
              +24 organizaciones · LATAM
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 0,
              border: '1px solid var(--line)',
            }}
          >
            {[
              'Gran Comercio',
              'Contract Workplaces',
              'Induvallas',
              'Sarmiento',
              'Grupo KFC',
              'UDLA',
              'Cooperativa Policía Nacional',
              'ConstruEcuador',
              'Liga Deportiva U.',
              'PUCE',
              'Zaimella',
              'CAME Arquitectos',
              'Corporación Maresa',
              'Kruger',
              'Arroyo & Arroyo',
              'Carsnack',
              'UIDE',
              'PMJ Arquitectos',
              'Banco ProCredit',
              'Grupo Puentes',
              'Wesco',
              'Palladium',
              'Tropi Burger',
              'Moreno & Valdivieso',
            ].map((name, i) => {
              // Slug used to look up an optional logo image. Drop a file at
              //   public/assets/clientes/<slug>.png  (or .webp / .svg)
              // and the <img> below will pick it up automatically.
              const slug = name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[̀-ͯ]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
              const col = i % 6;
              const row = Math.floor(i / 6);
              const total = 24;
              return (
                <div
                  key={name}
                  title={name}
                  style={{
                    position: 'relative',
                    aspectRatio: '3/2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    borderRight: col === 5 ? 0 : '1px solid var(--line)',
                    borderBottom: row < Math.floor((total - 1) / 6) ? '1px solid var(--line)' : 0,
                    background: 'var(--off-white)',
                    overflow: 'hidden',
                    transition: 'background .25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--soft)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--off-white)')}
                >
                  {/* Logo image — falls back to the name label if file is missing */}
                  <img
                    src={asset(`clientes/${slug}.png`)}
                    alt={name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                    style={{
                      maxWidth: '70%',
                      maxHeight: '60%',
                      objectFit: 'contain',
                      filter: 'grayscale(1)',
                      opacity: 0.85,
                      transition: 'filter .2s, opacity .2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = '';
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'grayscale(1)';
                      e.currentTarget.style.opacity = '0.85';
                    }}
                  />
                  {/* Fallback text label */}
                  <span
                    className="maach-mono"
                    style={{
                      display: 'none',
                      textAlign: 'center',
                      fontSize: 11,
                      letterSpacing: '.08em',
                      color: 'var(--fg)',
                      lineHeight: 1.3,
                    }}
                  >
                    {name}
                  </span>

                  {/* Small index in the corner */}
                  <span
                    className="maach-mono"
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 10,
                      fontSize: 9,
                      color: 'var(--muted)',
                      letterSpacing: '.1em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              );
            })}
          </div>

          <p
            className="maach-mono"
            style={{ color: 'var(--muted)', marginTop: 24, textAlign: 'center', fontSize: 11 }}
          >
            Marcas y organizaciones con las que MAACH ha colaborado · 2018 — 2026
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
              Directiva de proyecto
            </span>
            <h2 className="h-display" style={{ fontSize: 'clamp(48px, 7vw, 112px)', marginBottom: 32 }}>
              Precisión<br />
              <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>Industrial.</span>
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
                ['CAPACIDAD INSTALADA', 'ALTO VOLUMEN'],
                ['TOLERANCIA', '± 2 MM'],
                ['EJECUCIÓN', 'INMEDIATA'],
                ['GARANTÍA', '10 AÑOS'],
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
                Contacto técnico
              </span>
              <h3
                style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 700,
                  fontSize: 48,
                  marginBottom: 24,
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  letterSpacing: '-.02em',
                }}
              >
                Iniciar Especificación
              </h3>
              <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 40, lineHeight: 1.55 }}>
                Nuestro equipo de ingeniería de proyectos adapta los sistemas MAACH a tus planos arquitectónicos y requerimientos espaciales.
              </p>
              <Link to="/contacto" className="btn-primary" style={{ width: '100%', justifyContent: 'space-between' }}>
                Contactar ingeniería <IconArrow size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
