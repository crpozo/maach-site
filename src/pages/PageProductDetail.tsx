import { asset } from '../lib/asset';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import {
  IconChevronRight,
  IconDownload,
  IconFile,
  IconRuler,
  IconTool,
} from '../components/icons';
import { getProductBySlug, getProductsByCategory } from '../data/productos';
import { useT } from '../i18n/i18n';

export default function PageProductDetail() {
  const t = useT();
  const params = useParams();
  const id = params.id || 'producto';

  // Look up real product by slug first; fall back to placeholder behavior.
  const real = getProductBySlug(id);

  const category = real
    ? real.category
    : decodeURIComponent(params.category || 'categoria').replace(/-/g, ' ');
  const productName = real
    ? real.name
    : id.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const images = real
    ? real.gallery
    : [
        asset('biblioteca-1.webp'),
        asset('biblioteca-2.webp'),
        asset('biblioteca-3.webp'),
        asset('biblioteca-4.webp'),
        asset('biblioteca-5.webp'),
      ];
  const description = real?.description;
  const [idx, setIdx] = useState(0);

  // Real related products from the same category (excluding the current one).
  const related = real
    ? getProductsByCategory(real.category)
        .filter((p) => p.slug !== real.slug)
        .slice(0, 4)
    : [];
  const categorySlug = params.category || '';

  return (
    <Layout screenLabel={'04 Producto · ' + productName}>
      <div style={{ background: 'var(--soft)', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container" style={{ padding: '14px 48px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/" className="maach-mono" style={{ color: 'var(--muted)' }}>
            Inicio
          </Link>
          <IconChevronRight size={10} style={{ color: 'var(--muted)' }} />
          <Link to="/productos" className="maach-mono" style={{ color: 'var(--muted)' }}>
            Productos
          </Link>
          <IconChevronRight size={10} style={{ color: 'var(--muted)' }} />
          <span className="maach-mono" style={{ color: 'var(--muted)' }}>
            {category}
          </span>
          <IconChevronRight size={10} style={{ color: 'var(--muted)' }} />
          <span className="maach-mono">{productName}</span>
        </div>
      </div>

      <section style={{ padding: '64px 0 96px' }}>
        <div className="maach-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80 }}>
            <div>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  border: '1px solid var(--line)',
                  background: 'var(--surface)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={images[idx]}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 32, boxSizing: 'border-box' }}
                />
                <button
                  onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                  style={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'var(--off-white)',
                    border: '1px solid var(--fg)',
                    width: 44,
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                </button>
                <button
                  onClick={() => setIdx((i) => (i + 1) % images.length)}
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'var(--off-white)',
                    border: '1px solid var(--fg)',
                    width: 44,
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconChevronRight size={16} />
                </button>
                <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                  <span className="maach-mono" style={{ background: 'var(--off-white)', padding: '5px 10px' }}>
                    {String(idx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                  </span>
                </div>
                <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
                  <span
                    className="maach-mono"
                    style={{ background: 'var(--jet-black)', color: 'var(--off-white)', padding: '5px 10px' }}
                  >
                    {t('pd.photo')}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 16 }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    style={{
                      aspectRatio: '1/1',
                      border: idx === i ? '2px solid var(--lava-orange)' : '1px solid var(--line)',
                      background: 'var(--surface)',
                      overflow: 'hidden',
                      padding: 0,
                    }}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8, boxSizing: 'border-box' }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 16 }}>
                {category}
              </span>
              <h1 className="h-display" style={{ fontSize: 64, marginBottom: 24 }}>
                {productName}
              </h1>
              <p style={{ fontSize: 18, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 32 }}>
                {description ??
                  'Una solución de almacenamiento industrial enfocada en la optimización del espacio y la estética corporativa. Estructura modular, herrajes ocultos y acabados validados para uso intensivo.'}
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  marginBottom: 40,
                  paddingBottom: 40,
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  {t('pd.contact_advisor')}
                </button>
                <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                  <IconDownload size={14} /> {t('pd.bim_cad')}
                </button>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ marginBottom: 16 }} className="maach-mono">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <IconTool size={14} /> {t('pd.tech_features')}
                  </span>
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: '20px 24px',
                    margin: 0,
                    background: 'var(--soft)',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                  }}
                >
                  {[
                    'Estructura inyectada en aluminio extruido de alta resistencia.',
                    'Superficies con recubrimiento melamínico termo-fundido textura roble.',
                    'Sistema de herrajes ocultos de precisión alemana.',
                    'Módulos reconfigurables sin necesidad de herramientas especiales.',
                    'Validado para >250,000 ciclos de apertura.',
                  ].map((t, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--lava-orange)', flexShrink: 0 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ marginBottom: 16 }} className="maach-mono">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <IconRuler size={14} /> {t('pd.dimensions')}
                  </span>
                </h3>
                <div
                  style={{
                    background: 'var(--soft)',
                    border: '1px solid var(--line)',
                    padding: '24px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 24,
                  }}
                >
                  {[
                    [t('pd.dim.height'), '750 mm'],
                    [t('pd.dim.width'), '1200 — 1800 mm'],
                    [t('pd.dim.depth'), '450 — 500 mm'],
                    [t('pd.dim.tolerance'), '± 2 mm'],
                    [t('pd.dim.weight'), '32 kg'],
                    [t('pd.dim.load'), '120 kg'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                        {k}
                      </span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ marginBottom: 16 }} className="maach-mono">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <IconFile size={14} /> {t('pd.docs')}
                  </span>
                </h3>
                <div
                  style={{
                    background: 'var(--soft)',
                    border: '1px solid var(--line)',
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {(
                    [
                      { name: t('pd.doc.sheet'), ext: 'PDF', href: real?.sheets?.pdf, fileName: `${real?.slug ?? id}.pdf` },
                      { name: t('pd.doc.3d'), ext: 'SKP', href: real?.sheets?.skp, fileName: `${real?.slug ?? id}.skp` },
                      { name: t('pd.doc.revit'), ext: 'RFA', href: real?.sheets?.rfa, fileName: `${real?.slug ?? id}.rfa` },
                      { name: t('pd.doc.cad'), ext: 'DWG', href: real?.sheets?.dwg, fileName: `${real?.slug ?? id}.dwg` },
                    ] as Array<{ name: string; ext: string; href?: string; fileName?: string }>
                  ).map((d) => {
                    const isLive = !!d.href;
                    return (
                      <a
                        key={d.name}
                        href={d.href ?? '#'}
                        download={isLive ? d.fileName : undefined}
                        onClick={isLive ? undefined : (e) => e.preventDefault()}
                        style={{
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          padding: '14px 18px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'border-color .2s',
                          opacity: isLive ? 1 : 0.55,
                          cursor: isLive ? 'pointer' : 'default',
                        }}
                        onMouseEnter={(e) =>
                          isLive ? (e.currentTarget.style.borderColor = 'var(--fg)') : null
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                      >
                        <div>
                          <span style={{ fontFamily: 'var(--body)', fontSize: 14, fontWeight: 500 }}>{d.name}</span>
                          <span className="maach-mono" style={{ color: 'var(--lava-orange)', marginLeft: 10 }}>
                            .{d.ext.toLowerCase()}
                          </span>
                          {!isLive && (
                            <span
                              className="maach-mono"
                              style={{ color: 'var(--muted)', marginLeft: 12, fontSize: 10 }}
                            >
                              {t('pd.doc.soon')}
                            </span>
                          )}
                        </div>
                        <IconDownload size={14} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section style={{ background: 'var(--soft)', borderTop: '1px solid var(--line)', padding: '96px 0' }}>
          <div className="maach-container">
            <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
              {t('pd.related.eyebrow')}
            </span>
            <h2 className="h-display" style={{ fontSize: 56, marginBottom: 48 }}>
              {t('pd.related.title')}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {related.map((p) => (
                <Link key={p.slug} to={`/productos/${categorySlug}/${p.slug}`}>
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '4/5',
                      border: '1px solid var(--line)',
                      overflow: 'hidden',
                      marginBottom: 12,
                      background: 'var(--off-white)',
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
                        padding: 20,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                    {p.subcategory}
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--display)',
                      fontWeight: 600,
                      fontSize: 22,
                      textTransform: 'uppercase',
                      letterSpacing: '-.01em',
                    }}
                  >
                    {p.name}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </Layout>
  );
}
