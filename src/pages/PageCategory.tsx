import { asset } from '../lib/asset';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';
import { getCategoryBySlug } from '../data/categorias';
import { PRODUCTS } from '../data/productos';

// Map category slug → hero photo + index number
const HEROES: Record<string, { img: string; n: string }> = {
  silloneria: { img: asset('biblioteca-1.webp'), n: '01' },
  escritorios: { img: asset('biblioteca-2.webp'), n: '02' },
  mesas: { img: asset('biblioteca-3.webp'), n: '03' },
  almacenamiento: { img: asset('biblioteca-4.webp'), n: '04' },
  divisiones: { img: asset('biblioteca-5.webp'), n: '05' },
  recepciones: { img: asset('perspectiva-2.webp'), n: '06' },
};

export default function PageCategory() {
  const { slug = '' } = useParams();
  const category = getCategoryBySlug(slug);

  if (!category) {
    return <Navigate to="/productos" replace />;
  }

  const hero = HEROES[category.slug] || HEROES.silloneria;

  return (
    <Layout screenLabel={'03 Catálogo · ' + category.name}>
      {/* HERO */}
      <section
        className="invert"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'calc(70vh)',
          display: 'flex',
          alignItems: 'flex-end',
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <img
          src={hero.img}
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
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(22,22,22,.6) 0%, rgba(22,22,22,.2) 25%, rgba(22,22,22,.55) 70%, rgba(22,22,22,.92) 100%)',
            zIndex: 1,
          }}
        />
        {/* Texture overlay — distinct per category */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            opacity: 0.16,
            pointerEvents: 'none',
            backgroundImage: `url(${asset('texture-5.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
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
            zIndex: 2,
          }}
        />
        {/* Top strip */}
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
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span className="maach-mono" style={{ letterSpacing: '.1em' }}>
            <Link to="/" style={{ color: 'var(--off-white)' }}>
              INICIO
            </Link>{' '}
            <span style={{ color: 'var(--lava-orange)' }}>›</span>{' '}
            <Link to="/productos" style={{ color: 'var(--off-white)' }}>
              CATÁLOGO
            </Link>{' '}
            <span style={{ color: 'var(--lava-orange)' }}>›</span>{' '}
            <span style={{ color: 'var(--lava-orange)' }}>{category.name.toUpperCase()}</span>
          </span>
        </div>

        {/* Crosshair */}
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
          className="maach-container"
          style={{ position: 'relative', zIndex: 3, width: '100%', paddingTop: 96, paddingBottom: 56 }}
        >
          <div style={{ maxWidth: 1100 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <span
                aria-hidden
                style={{
                  display: 'inline-block',
                  width: 28,
                  height: 1,
                  background: 'var(--lava-orange)',
                }}
              />
              <span
                className="maach-mono"
                style={{
                  color: 'var(--lava-orange)',
                  letterSpacing: '.14em',
                }}
              >
                CATEGORÍA · MAACH
              </span>
            </div>
            <h1
              className="h-display"
              style={{
                fontSize: 'clamp(48px, 7vw, 90px)',
                color: 'var(--off-white)',
                lineHeight: 0.92,
                margin: 0,
                marginBottom: 24,
                letterSpacing: '-.02em',
              }}
            >
              {category.name}
              <span style={{ color: 'var(--lava-orange)' }}>.</span>
            </h1>
            {category.intro ? (
              <p
                style={{
                  fontSize: 18,
                  color: 'var(--off-white)',
                  lineHeight: 1.55,
                  maxWidth: 720,
                  margin: 0,
                }}
              >
                {category.intro}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* SECTIONS — one per subcategory */}
      {category.sections.map((s, i) => {
        const inverted = i % 2 === 1;
        const subs = Array.isArray(s.productSubcategory)
          ? s.productSubcategory
          : s.productSubcategory
          ? [s.productSubcategory]
          : [];
        const sectionProducts = subs.length
          ? PRODUCTS.filter((p) => subs.includes(p.subcategory))
          : [];
        // First sub is used for the "see all" link when multiple subs share a section
        const primarySub = subs[0];

        return (
          <section
            key={s.slug}
            id={s.slug}
            className={inverted ? 'invert' : undefined}
            style={{
              padding: '112px 0',
              background: inverted ? 'var(--jet-black)' : 'var(--bg)',
              color: inverted ? 'var(--off-white)' : 'inherit',
              borderBottom: '1px solid var(--line)',
            }}
          >
            <div className="maach-container">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.4fr',
                  gap: 72,
                  alignItems: 'flex-start',
                  marginBottom: sectionProducts.length > 0 ? 64 : 0,
                }}
              >
                <div>
                  <span
                    className="maach-mono"
                    style={{
                      color: 'var(--lava-orange)',
                      display: 'block',
                      marginBottom: 16,
                      letterSpacing: '.1em',
                    }}
                  >
                    {category.name.toUpperCase()}
                  </span>
                  <h2
                    className="h-display"
                    style={{
                      fontSize: 'clamp(36px, 4.5vw, 64px)',
                      lineHeight: 0.95,
                      margin: 0,
                      marginBottom: 12,
                      color: inverted ? 'var(--off-white)' : 'inherit',
                    }}
                  >
                    {s.name}
                    <span style={{ color: 'var(--lava-orange)' }}>.</span>
                  </h2>
                  {s.pendingPhotos ? (
                    <span
                      className="maach-mono"
                      style={{
                        display: 'inline-block',
                        background: 'transparent',
                        border: '1px solid ' + (inverted ? 'rgba(228,226,227,.4)' : 'var(--line)'),
                        color: inverted ? 'var(--sand-grey)' : 'var(--muted)',
                        padding: '4px 8px',
                        marginTop: 8,
                      }}
                    >
                      FOTOS PRÓXIMAMENTE
                    </span>
                  ) : null}
                </div>

                <div>
                  <p
                    style={{
                      fontSize: 18,
                      lineHeight: 1.6,
                      color: inverted ? 'var(--sand-grey)' : 'var(--muted)',
                      margin: 0,
                      marginBottom: s.caracteristicas.length > 0 ? 40 : 0,
                    }}
                  >
                    {s.description}
                  </p>

                  {s.caracteristicas.length > 0 ? (
                    <div>
                      <span
                        className="maach-mono"
                        style={{
                          color: 'var(--lava-orange)',
                          display: 'block',
                          marginBottom: 16,
                          letterSpacing: '.1em',
                        }}
                      >
                        CARACTERÍSTICAS
                      </span>
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                          gap: 0,
                          borderTop: '1px solid ' + (inverted ? 'rgba(228,226,227,.18)' : 'var(--line)'),
                        }}
                      >
                        {s.caracteristicas.map((c, idx) => (
                          <li
                            key={c}
                            style={{
                              padding: '14px 16px 14px 0',
                              borderBottom:
                                '1px solid ' + (inverted ? 'rgba(228,226,227,.18)' : 'var(--line)'),
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 14,
                              fontSize: 15,
                              lineHeight: 1.5,
                              color: inverted ? 'var(--off-white)' : 'var(--fg)',
                            }}
                          >
                            <span
                              className="maach-mono"
                              style={{
                                color: 'var(--lava-orange)',
                                flexShrink: 0,
                                paddingTop: 2,
                              }}
                            >
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Product preview row — first 4 items from this subcategory */}
              {sectionProducts.length > 0 ? (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      marginBottom: 24,
                      flexWrap: 'wrap',
                      gap: 12,
                    }}
                  >
                    <span
                      className="maach-mono"
                      style={{
                        color: inverted ? 'var(--sand-grey)' : 'var(--muted)',
                        letterSpacing: '.1em',
                      }}
                    >
                      MODELOS DISPONIBLES · {sectionProducts.length}
                    </span>
                    <Link
                      to={
                        primarySub
                          ? `/productos?sub=${encodeURIComponent(primarySub)}`
                          : '/productos'
                      }
                      className="maach-mono"
                      style={{
                        color: inverted ? 'var(--off-white)' : 'var(--fg)',
                        borderBottom:
                          '1.5px solid ' + (inverted ? 'var(--off-white)' : 'var(--fg)'),
                        paddingBottom: 4,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      Ver todos en el catálogo <IconArrow size={14} />
                    </Link>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: 16,
                    }}
                  >
                    {sectionProducts.slice(0, 8).map((p) => (
                      <Link
                        key={p.slug}
                        to={`/productos/${category.slug}/${p.slug}`}
                        style={{
                          display: 'block',
                          border:
                            '1px solid ' + (inverted ? 'rgba(228,226,227,.18)' : 'var(--line)'),
                          background: inverted ? 'rgba(228,226,227,.04)' : 'var(--off-white)',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            aspectRatio: '1/1',
                            background: 'var(--off-white)',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            src={p.gallery[0]}
                            alt={p.name}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              padding: 24,
                              boxSizing: 'border-box',
                              transition: 'transform .6s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                          />
                        </div>
                        <div
                          style={{
                            position: 'relative',
                            background: 'var(--jet-black)',
                            color: 'var(--off-white)',
                            padding: '16px 18px 18px',
                            overflow: 'hidden',
                          }}
                        >
                          {/* AA monogram */}
                          <span
                            aria-hidden
                            style={{
                              fontFamily: 'var(--display)',
                              fontWeight: 700,
                              fontSize: 13,
                              letterSpacing: '-.04em',
                              color: 'var(--lava-orange)',
                              display: 'block',
                              marginBottom: 10,
                            }}
                          >
                            AA
                          </span>
                          {/* Orange L corner */}
                          <div
                            aria-hidden
                            style={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              width: 14,
                              height: 14,
                              borderTop: '2px solid var(--lava-orange)',
                              borderRight: '2px solid var(--lava-orange)',
                            }}
                          />
                          <span
                            className="maach-mono"
                            style={{
                              color: 'var(--lava-orange)',
                              display: 'block',
                              marginBottom: 6,
                              fontSize: 10,
                              letterSpacing: '.08em',
                            }}
                          >
                            {p.subcategory}
                          </span>
                          <h3
                            style={{
                              fontFamily: 'var(--display)',
                              fontWeight: 700,
                              fontSize: 20,
                              textTransform: 'uppercase',
                              letterSpacing: '-.01em',
                              margin: 0,
                              color: 'var(--off-white)',
                              lineHeight: 1,
                            }}
                          >
                            {p.name}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

    </Layout>
  );
}
