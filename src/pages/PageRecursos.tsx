import { useState, type CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { asset } from '../lib/asset';
import { useT } from '../i18n/i18n';
import {
  IconBookmark,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconDownload,
  IconSearch,
} from '../components/icons';

const btnIcon: CSSProperties = {
  width: 32,
  height: 32,
  border: '1px solid var(--line)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  cursor: 'pointer',
  transition: 'all .15s',
};

export default function PageRecursos() {
  const t = useT();
  const [selected, setSelected] = useState<Set<number>>(new Set([1, 3]));
  const toggle = (id: number) =>
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const documents = [
    { id: 1, type: 'Brochure', name: 'Sistema Operativo Vértice', product: 'Vértice Benching', ext: 'pdf', size: '2.4 MB' },
    { id: 2, type: 'Catálogo', name: 'Catálogo General 2026', product: 'Múltiple', ext: 'pdf', size: '18.7 MB' },
    { id: 3, type: 'Spec Guide', name: 'Sillería Ergonómica · Serie A', product: 'Serie A', ext: 'pdf', size: '4.1 MB' },
    { id: 4, type: 'Guía', name: 'Espacios Colaborativos', product: 'Múltiple', ext: 'pdf', size: '6.8 MB' },
    { id: 5, type: 'Brochure', name: 'Colección Ancillary Lounge', product: 'Colección Ancillary', ext: 'pdf', size: '3.2 MB' },
    { id: 6, type: 'Plano CAD', name: 'Biblioteca Baja — Plano técnico', product: 'Almacenamiento', ext: 'dwg', size: '1.1 MB' },
    { id: 7, type: 'Modelo 3D', name: 'Biblioteca Baja — SketchUp', product: 'Almacenamiento', ext: 'skp', size: '8.9 MB' },
    { id: 8, type: 'Modelo BIM', name: 'Biblioteca Baja — Revit', product: 'Almacenamiento', ext: 'rfa', size: '5.3 MB' },
    { id: 9, type: 'Ficha técnica', name: 'Especificación materiales 2026', product: 'Múltiple', ext: 'pdf', size: '1.4 MB' },
  ];

  // Footer deep-links pre-filter the library by document type via ?tipo=
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get('tipo');
  const typeFilters: Record<string, (d: (typeof documents)[number]) => boolean> = {
    'modelos-3d': (d) => ['Modelo 3D', 'Modelo BIM', 'Plano CAD'].includes(d.type),
    fichas: (d) => d.type === 'Ficha técnica',
    materiales: (d) => /material/i.test(d.name),
  };
  const activeFilter = tipo ? typeFilters[tipo] : undefined;
  const visibleDocuments = activeFilter ? documents.filter(activeFilter) : documents;

  return (
    <Layout screenLabel="11 Recursos">
      {/* HERO — full-bleed background, brand-book style */}
      <section
        className="invert"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'flex-end',
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          borderBottom: '1px solid var(--line)',
        }}
      >
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
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(22,22,22,.35) 0%, rgba(22,22,22,.15) 25%, rgba(22,22,22,.5) 55%, rgba(22,22,22,.92) 100%)',
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
            color: 'var(--off-white)',
          }}
        >
          <span className="maach-mono" style={{ color: 'var(--lava-orange)' }}>
            {t('rec.hero.eyebrow')}
          </span>
          <span className="maach-mono" style={{ color: 'var(--off-white)' }}>
            {t('rec.hero.section')}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }} className="maach-mono">
            <Link to="/" style={{ color: 'var(--sand-grey)' }}>
              {t('rec.hero.crumb.home')}
            </Link>
            <IconChevronRight size={10} style={{ color: 'var(--sand-grey)' }} />
            <span style={{ color: 'var(--lava-orange)' }}>{t('rec.hero.crumb.section')}</span>
            <IconChevronRight size={10} style={{ color: 'var(--sand-grey)' }} />
            <span style={{ color: 'var(--off-white)' }}>{t('rec.hero.crumb.current')}</span>
          </div>
          <h1
            className="h-display"
            style={{
              fontSize: 'clamp(56px, 8vw, 90px)',
              marginBottom: 16,
              color: 'var(--off-white)',
              lineHeight: 0.95,
            }}
          >
            {t('rec.hero.title.1')} <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{t('rec.hero.title.2')}</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--off-white)', maxWidth: 640, lineHeight: 1.55 }}>
            {t('rec.hero.body')}
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 0 128px', background: 'var(--soft)', minHeight: '70vh' }}>
        <div className="maach-container">
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 32 }}>
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'var(--off-white)', border: '1px solid var(--line)', padding: 24 }}>
                <span className="maach-mono" style={{ display: 'block', marginBottom: 12 }}>
                  {t('rec.filter.type')}
                </span>
                <div
                  style={{
                    border: '1px solid var(--line)',
                    padding: '12px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  {t('rec.filter.docs_guides')}
                  <IconChevronDown size={11} />
                </div>
                <button
                  style={{
                    width: '100%',
                    background: 'var(--jet-black)',
                    color: 'var(--off-white)',
                    padding: '12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                  className="maach-mono"
                >
                  {t('rec.filter.apply')} <IconChevronRight size={10} />
                </button>
              </div>

              <div style={{ background: 'var(--off-white)', border: '1px solid var(--line)', padding: 24 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}
                >
                  <span className="maach-mono">{t('rec.filter.search')}</span>
                  <button className="maach-mono" style={{ color: 'var(--muted)' }}>
                    {t('rec.filter.clear')}
                  </button>
                </div>
                <div style={{ position: 'relative', marginBottom: 32 }}>
                  <IconSearch
                    size={14}
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--muted)',
                    }}
                  />
                  <input
                    type="text"
                    placeholder={t('rec.filter.search_placeholder')}
                    style={{
                      width: '100%',
                      border: '1px solid var(--line)',
                      background: 'var(--soft)',
                      padding: '10px 12px 10px 36px',
                      fontSize: 14,
                    }}
                  />
                </div>

                <div style={{ paddingBottom: 16, borderBottom: '1px solid var(--line)', marginBottom: 16 }}>
                  <span className="maach-mono">{t('rec.filter.refine')}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                    className="maach-mono"
                  >
                    {t('rec.filter.type')} <IconChevronDown size={11} />
                  </button>
                  {[
                    { l: 'Spec Guides', k: 'spec-guides', n: '34', checked: !tipo },
                    { l: 'Brochures', k: 'brochures', n: '481', checked: !tipo },
                    { l: 'Modelos 3D / BIM', k: 'modelos-3d-bim', n: '208', checked: tipo === 'modelos-3d' },
                    { l: 'Planos CAD', k: 'planos-cad', n: '194', checked: tipo === 'modelos-3d' },
                    { l: 'Fichas técnicas', k: 'fichas-tecnicas', n: '62', checked: !tipo || tipo === 'fichas' || tipo === 'materiales' },
                  ].map((f) => (
                    <label
                      key={f.l}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 12,
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          color: f.checked ? 'var(--fg)' : 'var(--muted)',
                          fontWeight: f.checked ? 500 : 400,
                        }}
                      >
                        {t('recursos.facet.' + f.k)} ({f.n})
                      </span>
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          background: f.checked ? 'var(--lava-orange)' : 'transparent',
                          border: '1.5px solid ' + (f.checked ? 'var(--lava-orange)' : 'var(--line)'),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {f.checked && <IconCheck size={9} style={{ color: 'var(--off-white)' }} />}
                      </div>
                    </label>
                  ))}
                  <button className="maach-mono" style={{ color: 'var(--lava-orange)', textAlign: 'left', marginTop: 8 }}>
                    {t('rec.filter.show_more')}
                  </button>
                </div>
              </div>
            </aside>

            <div style={{ background: 'var(--off-white)', border: '1px solid var(--line)' }}>
              {activeFilter ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    padding: '14px 32px',
                    borderBottom: '1px solid var(--line)',
                    background: 'rgba(243,74,35,.06)',
                  }}
                >
                  <span className="maach-mono" style={{ color: 'var(--lava-orange)' }}>
                    {t('recursos.active_filter_label')} {t('recursos.filterlabel.' + tipo)}
                  </span>
                  <Link
                    to="/recursos-diseno/biblioteca"
                    className="maach-mono"
                    style={{ color: 'var(--muted)' }}
                  >
                    {t('recursos.clear_filter')}
                  </Link>
                </div>
              ) : null}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '18px 32px',
                  borderBottom: '1px solid var(--line)',
                  gap: 24,
                }}
              >
                <div style={{ width: 140, flexShrink: 0 }} className="maach-mono">
                  {t('rec.col.type')}
                </div>
                <div style={{ flex: 1 }} className="maach-mono">
                  {t('rec.col.name')}
                </div>
                <div style={{ width: 200, flexShrink: 0 }} className="maach-mono">
                  {t('rec.col.product')}
                </div>
                <div style={{ width: 70, flexShrink: 0 }} className="maach-mono">
                  {t('rec.col.size')}
                </div>
                <button
                  className="maach-mono"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    border: '1px solid var(--line)',
                    padding: '6px 10px',
                  }}
                >
                  {t('rec.col.select')}{' '}
                  <span
                    style={{ width: 8, height: 8, borderRadius: '50%', border: '1px solid var(--muted)' }}
                  />
                </button>
              </div>

              <div>
                {visibleDocuments.map((d) => {
                  const isSelected = selected.has(d.id);
                  return (
                    <div
                      key={d.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '20px 32px',
                        borderBottom: '1px solid var(--line)',
                        background: isSelected ? 'rgba(243,74,35,.04)' : 'transparent',
                        gap: 24,
                        transition: 'background .15s',
                      }}
                    >
                      <div
                        style={{ width: 140, flexShrink: 0, fontSize: 13, color: 'var(--muted)' }}
                        className="maach-mono"
                      >
                        {t('recursos.doctype.' + d.id)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontFamily: 'var(--body)', fontSize: 15, marginBottom: 4 }}>
                          {t('recursos.docname.' + d.id)}
                        </h4>
                        <span className="maach-mono" style={{ color: 'var(--lava-orange)' }}>
                          .{d.ext}
                        </span>
                      </div>
                      <div style={{ width: 200, flexShrink: 0, fontSize: 13, color: 'var(--muted)' }}>{t('recursos.docproduct.' + d.id)}</div>
                      <div
                        style={{
                          width: 70,
                          flexShrink: 0,
                          fontFamily: 'var(--mono)',
                          fontSize: 11,
                          color: 'var(--muted)',
                        }}
                      >
                        {d.size}
                      </div>

                      <div style={{ display: 'flex', gap: 8 }}>
                        <button style={btnIcon} title={t('recursos.action_download')}>
                          <IconDownload size={14} />
                        </button>
                        <button style={btnIcon} title={t('recursos.action_save')}>
                          <IconBookmark size={14} />
                        </button>
                        <button
                          onClick={() => toggle(d.id)}
                          style={{
                            ...btnIcon,
                            background: isSelected ? 'var(--lava-orange)' : 'transparent',
                            color: isSelected ? 'var(--off-white)' : 'var(--fg)',
                            borderColor: isSelected ? 'var(--lava-orange)' : 'var(--line)',
                          }}
                          title={t('recursos.action_select')}
                        >
                          <IconCheck size={11} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  padding: '16px 32px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--soft)',
                }}
              >
                <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                  {selected.size} / {visibleDocuments.length} {t('rec.footer.selected')}
                </span>
                <button className="btn-primary" style={{ padding: '12px 20px' }}>
                  <IconDownload size={14} /> {t('rec.footer.download_selection')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
