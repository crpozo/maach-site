import { asset } from '../lib/asset';
import { useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import {
  IconChevronRight,
  IconClose,
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
  const [zoom, setZoom] = useState(false);

  // Lead-gate: clicking a document opens a form that must be completed
  // before the download starts.
  const [gateDoc, setGateDoc] = useState<{ href: string; fileName?: string } | null>(null);
  const emptyForm = { nombre: '', correo: '', empresa: '', ocupacion: '' };
  const [form, setForm] = useState(emptyForm);

  // Downloadable spec files for this product — only those that actually exist.
  const docs = (
    [
      { name: t('pd.doc.sheet'), ext: 'PDF', href: real?.sheets?.pdf, fileName: `${real?.slug ?? id}.pdf` },
      { name: t('pd.doc.3d'), ext: 'SKP', href: real?.sheets?.skp, fileName: `${real?.slug ?? id}.skp` },
      { name: t('pd.doc.revit'), ext: 'RFA', href: real?.sheets?.rfa, fileName: `${real?.slug ?? id}.rfa` },
      { name: t('pd.doc.cad'), ext: 'DWG', href: real?.sheets?.dwg, fileName: `${real?.slug ?? id}.dwg` },
    ] as Array<{ name: string; ext: string; href?: string; fileName?: string }>
  ).filter((d) => !!d.href);

  function handleGateSubmit(e: FormEvent) {
    e.preventDefault();
    if (!gateDoc) return;
    const a = document.createElement('a');
    a.href = gateDoc.href;
    if (gateDoc.fileName) a.download = gateDoc.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setGateDoc(null);
    setForm(emptyForm);
  }

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
          {categorySlug ? (
            <Link to={`/categorias/${categorySlug}`} className="maach-mono" style={{ color: 'var(--muted)' }}>
              {category}
            </Link>
          ) : (
            <span className="maach-mono" style={{ color: 'var(--muted)' }}>
              {category}
            </span>
          )}
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
                  onClick={() => setZoom(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 32, boxSizing: 'border-box', cursor: 'zoom-in' }}
                />
                {/* Expand button */}
                <button
                  onClick={() => setZoom(true)}
                  aria-label="Ampliar imagen"
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'var(--off-white)',
                    border: '1px solid var(--fg)',
                    width: 38,
                    height: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'zoom-in',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" />
                  </svg>
                </button>
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

            {/* INFO — dark brand-book card + actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div
                className="invert"
                style={{
                  position: 'relative',
                  background: 'var(--jet-black)',
                  color: 'var(--off-white)',
                  padding: 'clamp(28px, 3vw, 44px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 28,
                  overflow: 'hidden',
                }}
              >
                {/* Orange L corners */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    width: 22,
                    height: 22,
                    borderTop: '2px solid var(--lava-orange)',
                    borderRight: '2px solid var(--lava-orange)',
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    bottom: 18,
                    left: 18,
                    width: 22,
                    height: 22,
                    borderBottom: '2px solid var(--lava-orange)',
                    borderLeft: '2px solid var(--lava-orange)',
                  }}
                />

                {/* AA monogram */}
                <span
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 30,
                    letterSpacing: '-.04em',
                    color: 'var(--lava-orange)',
                    lineHeight: 1,
                    alignSelf: 'flex-start',
                  }}
                >
                  AA
                </span>

                <p style={{ fontSize: 16, color: 'var(--off-white)', lineHeight: 1.6, margin: 0, maxWidth: 520 }}>
                  {description ??
                    'Una solución industrial enfocada en la optimización del espacio y la estética corporativa. Estructura modular, herrajes ocultos y acabados validados para uso intensivo.'}
                </p>

                <div style={{ height: 1, background: 'rgba(228,226,227,.22)', width: '100%' }} />

                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        background: 'var(--off-white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        marginBottom: 10,
                      }}
                    >
                      <img
                        src={images[0]}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6, boxSizing: 'border-box' }}
                      />
                    </div>
                    <span className="maach-mono" style={{ color: 'var(--lava-orange)', letterSpacing: '.08em' }}>
                      {category}
                    </span>
                  </div>
                  <h1
                    className="h-display"
                    style={{ fontSize: 'clamp(40px, 4.5vw, 64px)', lineHeight: 0.92, margin: 0, flex: 1, minWidth: 0 }}
                  >
                    {productName}
                  </h1>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  {t('pd.contact_advisor')}
                </button>
                <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                  <IconDownload size={14} /> {t('pd.bim_cad')}
                </button>
              </div>

              {/* CARACTERÍSTICAS TÉCNICAS — under the actions, right column */}
              <div style={{ marginTop: 12, paddingTop: 28, borderTop: '1px solid var(--line)' }}>
                <h3 style={{ marginBottom: 24 }} className="maach-mono">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <IconTool size={14} /> {t('pd.tech_features')}
                  </span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {[
                    'Estructura inyectada en aluminio extruido de alta resistencia.',
                    'Superficies con recubrimiento melamínico termo-fundido textura roble.',
                    'Sistema de herrajes ocultos de precisión alemana.',
                    'Módulos reconfigurables sin necesidad de herramientas especiales.',
                    'Validado para >250,000 ciclos de apertura.',
                  ].map((feat, i) => (
                    <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <span
                        className="maach-mono"
                        style={{ color: 'var(--lava-orange)', flexShrink: 0, fontWeight: 700, paddingTop: 2 }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--fg)' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DOCUMENTOS — right column. Only docs that actually exist;
                  each opens a lead-gate form before downloading. */}
              {docs.length > 0 ? (
                <div style={{ marginTop: 12, paddingTop: 28, borderTop: '1px solid var(--line)' }}>
                  <h3 style={{ marginBottom: 20 }} className="maach-mono">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <IconFile size={14} /> {t('pd.docs')}
                    </span>
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {docs.map((d) => (
                      <button
                        key={d.name}
                        type="button"
                        onClick={() => setGateDoc({ href: d.href!, fileName: d.fileName })}
                        style={{
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          padding: '14px 18px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 16,
                          width: '100%',
                          textAlign: 'left',
                          transition: 'border-color .2s',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--fg)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                      >
                        <div>
                          <span style={{ fontFamily: 'var(--body)', fontSize: 14, fontWeight: 500 }}>{d.name}</span>
                          <span className="maach-mono" style={{ color: 'var(--lava-orange)', marginLeft: 10 }}>
                            .{d.ext.toLowerCase()}
                          </span>
                        </div>
                        <IconDownload size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* DIMENSIONES GENERALES — full-width */}
          <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--line)' }}>
            <h3 style={{ marginBottom: 32 }} className="maach-mono">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <IconRuler size={14} /> {t('pd.dimensions')}
              </span>
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 32,
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
                  <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                    {k}
                  </span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
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

      {/* LIGHTBOX — expand product photos */}
      {zoom ? (
        <div
          onClick={() => setZoom(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(12,12,12,.94)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
          }}
        >
          <button
            onClick={() => setZoom(false)}
            aria-label="Cerrar"
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,.5)',
              color: 'var(--off-white)',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <IconClose size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); }}
            aria-label="Anterior"
            style={{
              position: 'absolute',
              left: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,.5)',
              color: 'var(--off-white)',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <IconChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
          </button>
          <img
            src={images[idx]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', cursor: 'default' }}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); }}
            aria-label="Siguiente"
            style={{
              position: 'absolute',
              right: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,.5)',
              color: 'var(--off-white)',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <IconChevronRight size={18} />
          </button>
          <span
            className="maach-mono"
            style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', color: 'var(--off-white)' }}
          >
            {String(idx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </div>
      ) : null}

      {/* DOWNLOAD LEAD-GATE — required form before any document download */}
      {gateDoc ? (
        <div
          onClick={() => setGateDoc(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(12,12,12,.78)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleGateSubmit}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 440,
              background: 'var(--off-white)',
              border: '1px solid var(--fg)',
              padding: 'clamp(28px, 4vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            <button
              type="button"
              onClick={() => setGateDoc(null)}
              aria-label={t('pd.gate.cancel')}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--fg)',
                display: 'flex',
              }}
            >
              <IconClose size={18} />
            </button>

            <div>
              <h3
                className="h-display"
                style={{ fontSize: 26, margin: 0, marginBottom: 8, textTransform: 'uppercase' }}
              >
                {t('pd.gate.title')}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                {t('pd.gate.subtitle')}
              </p>
            </div>

            {(
              [
                { key: 'nombre', label: t('pd.gate.name'), type: 'text' },
                { key: 'correo', label: t('pd.gate.email'), type: 'email' },
                { key: 'empresa', label: t('pd.gate.company'), type: 'text' },
                { key: 'ocupacion', label: t('pd.gate.role'), type: 'text' },
              ] as Array<{ key: keyof typeof form; label: string; type: string }>
            ).map((f) => (
              <label key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="maach-mono" style={{ color: 'var(--muted)', fontSize: 11, letterSpacing: '.08em' }}>
                  {f.label} *
                </span>
                <input
                  type={f.type}
                  required
                  value={form[f.key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  style={{
                    border: '1px solid var(--line)',
                    background: 'var(--surface)',
                    padding: '12px 14px',
                    fontFamily: 'var(--body)',
                    fontSize: 15,
                    color: 'var(--fg)',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--fg)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                />
              </label>
            ))}

            <span className="maach-mono" style={{ color: 'var(--muted)', fontSize: 11 }}>
              {t('pd.gate.required')}
            </span>

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
              <IconDownload size={14} /> {t('pd.gate.submit')}
            </button>
          </form>
        </div>
      ) : null}
    </Layout>
  );
}
