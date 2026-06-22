import { asset } from '../lib/asset';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import {
  IconChevronDown,
  IconChevronRight,
  IconFilter,
  IconMinus,
  IconPlus,
} from '../components/icons';
import { PRODUCTS } from '../data/productos';
import { useT } from '../i18n/i18n';

type GridProduct = {
  id: string;
  slug?: string;
  name: string;
  category: string;
  subcategory: string;
  sku: string;
  img: string;
};

const slugify = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function PageProducts() {
  const t = useT();
  const catalogCategories = [
    { name: 'Sillonería', slug: 'silloneria', items: ['Sillas presidente', 'Sillas gerenciales', 'Sillas operativas', 'Sillas de visita', 'Colectividades', 'Sofás'] },
    { name: 'Escritorios', slug: 'escritorios', items: ['Escritorios gerente', 'Escritorios operativos', 'Estaciones de trabajo', 'Escritorios regulables'] },
    { name: 'Mesas', slug: 'mesas', items: ['Mesas de reunión', 'Mesas colaborativas', 'Mesas auxiliares'] },
    { name: 'Almacenamiento', slug: 'almacenamiento', items: ['Biblioteca Alta', 'Biblioteca Baja', 'Credenza', 'Módulo 3 gavetas', 'Arturito', 'Locker', 'Archivo Rodante'] },
    { name: 'Divisiones de ambientes', slug: 'divisiones', items: ['Divisiones modulares', 'Divisiones de vidrio'] },
    { name: 'Recepciones', slug: 'recepciones', items: ['Counters de recepción', 'Mostradores', 'Sistemas de espera'] },
  ];

  // Real products from the catalog data
  const realProducts: GridProduct[] = PRODUCTS.map((p) => ({
    id: p.slug,
    slug: p.slug,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    sku: p.sku,
    img: p.gallery[0],
  }));

  // Generic placeholders to fill the grid for subcategories without real
  // products yet. Skips any subcategory already covered by a real product.
  const coveredSubs = new Set(realProducts.map((p) => p.subcategory));
  const allSubs = catalogCategories.flatMap((c) => c.items).filter((s) => !coveredSubs.has(s));
  const placeholders: GridProduct[] = Array.from({ length: Math.max(0, 12 - realProducts.length) }).map((_, i) => {
    const sub = allSubs[i % Math.max(1, allSubs.length)] || 'General';
    return {
      id: `placeholder-${i}`,
      name: `${t('prod.sub.' + slugify(sub))} · ${t('prodpage.placeholder_model')} ${String.fromCharCode(65 + (i % 5))}${i + 1}`,
      category: catalogCategories.find((c) => c.items.includes(sub))?.name || 'General',
      subcategory: sub,
      sku: `MCH-${2000 + i}`,
      img: asset(`biblioteca-${(i % 5) + 1}.webp`),
    };
  });
  const products: GridProduct[] = [...realProducts, ...placeholders];

  // Build a list of all known subcategory canonical strings so we can
  // resolve case-insensitive query params from the mega menu.
  const ALL_SUBS = catalogCategories.flatMap((c) => c.items);
  const resolveSub = (raw: string | null): string | null => {
    if (!raw) return null;
    const target = raw.trim().toLowerCase();
    return ALL_SUBS.find((s) => s.toLowerCase() === target) ?? null;
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSub = resolveSub(searchParams.get('sub'));
  const initialCatName = initialSub
    ? catalogCategories.find((c) => c.items.includes(initialSub))?.name
    : undefined;

  const [openCats, setOpenCats] = useState<string[]>(
    initialCatName ? [initialCatName] : ['Sillonería'],
  );
  const toggle = (n: string) =>
    setOpenCats((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));
  const [selectedSub, setSelectedSub] = useState<string | null>(initialSub);
  const [page, setPage] = useState(1);

  // Keep state ↔ URL in sync when the user clicks a chip
  const selectSub = (sub: string | null) => {
    setSelectedSub(sub);
    setPage(1);
    if (sub) {
      setSearchParams({ sub }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  // React to URL changes (e.g. arriving from the mega menu)
  useEffect(() => {
    const next = resolveSub(searchParams.get('sub'));
    if (next !== selectedSub) {
      setSelectedSub(next);
      setPage(1);
      if (next) {
        const parent = catalogCategories.find((c) => c.items.includes(next))?.name;
        if (parent && !openCats.includes(parent)) {
          setOpenCats((p) => [...p, parent]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filtered = selectedSub ? products.filter((p) => p.subcategory === selectedSub) : products;

  // Pagination
  const PER_PAGE = 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout screenLabel={t('prodpage.screen_label')}>
      <section
        className="invert"
        style={{
          borderBottom: '1px solid var(--line)',
          padding: '96px 0 80px',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          minHeight: 420,
        }}
      >
        {/* Background photo */}
        <img
          src={asset("biblioteca-2.webp")}
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
              'linear-gradient(90deg, rgba(22,22,22,.85) 0%, rgba(22,22,22,.65) 45%, rgba(22,22,22,.25) 80%, rgba(22,22,22,.1) 100%)',
            zIndex: 1,
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
        {/* Orange L corner marks */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 20,
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
            bottom: 20,
            right: 24,
            width: 22,
            height: 22,
            borderBottom: '2px solid var(--lava-orange)',
            borderRight: '2px solid var(--lava-orange)',
            zIndex: 2,
          }}
        />
        <div className="maach-container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Link to="/" className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
              {t('prod.crumb.home')}
            </Link>
            <IconChevronRight size={11} style={{ color: 'var(--sand-grey)' }} />
            <span className="maach-mono" style={{ color: 'var(--lava-orange)' }}>{t('prod.crumb.catalog')}</span>
          </div>
          <h1
            className="h-display"
            style={{
              fontSize: 'clamp(40px, 5.5vw, 88px)',
              marginBottom: 32,
              color: 'var(--off-white)',
              lineHeight: 0.95,
              letterSpacing: '-.01em',
            }}
          >
            {t('prod.hero.title.1')}<br />
            <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{t('prod.hero.title.2')}</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--sand-grey)', maxWidth: 640 }}>
            {t('prod.hero.body')}
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 0 128px' }}>
        <div className="maach-container">
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 56 }}>
            <aside>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  paddingBottom: 16,
                  borderBottom: '1px solid var(--line)',
                  marginBottom: 32,
                }}
              >
                <IconFilter size={14} />
                <span className="maach-mono" style={{ fontWeight: 700 }}>
                  {t('prod.filter.title')}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {catalogCategories.map((cat) => {
                  const isOpen = openCats.includes(cat.name);
                  return (
                    <div key={cat.name} style={{ paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => toggle(cat.name)}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 8,
                          width: '100%',
                          padding: 0,
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'var(--display)',
                          fontWeight: 600,
                          fontSize: 18,
                          textTransform: 'uppercase',
                          letterSpacing: '-.01em',
                          color: 'var(--fg)',
                          textAlign: 'left',
                          transition: 'color .15s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--lava-orange)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                      >
                        <span>{t('cat.' + cat.slug + '.name')}</span>
                        <span style={{ color: 'var(--muted)' }}>
                          {isOpen ? <IconMinus size={12} /> : <IconPlus size={12} />}
                        </span>
                      </button>
                      {isOpen && (
                        <div
                          style={{
                            marginTop: 20,
                            paddingLeft: 8,
                            borderLeft: '1px solid var(--line)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 12,
                          }}
                        >
                          {cat.items.map((it) => (
                            <button
                              key={it}
                              onClick={() => selectSub(selectedSub === it ? null : it)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                paddingLeft: 12,
                                textAlign: 'left',
                                color: selectedSub === it ? 'var(--lava-orange)' : 'var(--muted)',
                                fontFamily: 'var(--mono)',
                                fontSize: 11,
                                letterSpacing: '.1em',
                                textTransform: 'uppercase',
                              }}
                            >
                              <div
                                style={{
                                  width: 11,
                                  height: 11,
                                  border: '1.5px solid currentColor',
                                  background: selectedSub === it ? 'currentColor' : 'transparent',
                                  flexShrink: 0,
                                }}
                              />
                              {t('prod.sub.' + slugify(it))}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </aside>

            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 24,
                  paddingBottom: 16,
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                  {filtered.length} {t('prod.count_label_n')} · {selectedSub ? t('prod.sub.' + slugify(selectedSub)) : t('prod.count_label_all')}
                </span>
                <div
                  className="maach-mono"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    border: '1px solid var(--line)',
                    padding: '10px 16px',
                    cursor: 'pointer',
                  }}
                >
                  {t('prod.sort_by')} <IconChevronDown size={10} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {pageItems.map((p) => {
                  const catSlug = encodeURIComponent(p.category.toLowerCase().replace(/ /g, '-'));
                  const productId = p.slug ?? p.id;
                  return (
                    <Link key={p.id} to={`/productos/${catSlug}/${productId}`} style={{ display: 'block' }}>
                      <div
                        style={{
                          position: 'relative',
                          aspectRatio: '4/5',
                          border: '1px solid var(--line)',
                          marginBottom: 16,
                          overflow: 'hidden',
                          background: 'var(--surface)',
                        }}
                      >
                        <img
                          src={p.img}
                          alt={p.slug ? t('prod.name.' + p.slug) : p.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s' }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                        />
                      </div>
                      <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                        {t('prod.sub.' + slugify(p.subcategory))}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--display)',
                          fontWeight: 600,
                          fontSize: 22,
                          textTransform: 'uppercase',
                          letterSpacing: '-.01em',
                          lineHeight: 1.05,
                        }}
                      >
                        {p.slug ? t('prod.name.' + p.slug) : p.name}
                      </h3>
                    </Link>
                  );
                })}
              </div>

              {totalPages > 1 ? (
                <div style={{ marginTop: 80, display: 'flex', justifyContent: 'center', gap: 6 }}>
                  {[
                    { l: '‹', page: currentPage - 1, disabled: currentPage === 1 },
                    ...Array.from({ length: totalPages }, (_, i) => ({
                      l: String(i + 1).padStart(2, '0'),
                      page: i + 1,
                      disabled: false,
                    })),
                    { l: '›', page: currentPage + 1, disabled: currentPage === totalPages },
                  ].map((b, i) => {
                    const active = b.page === currentPage && b.l !== '‹' && b.l !== '›';
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goToPage(b.page)}
                        disabled={b.disabled}
                        aria-current={active ? 'page' : undefined}
                        style={{
                          width: 48,
                          height: 48,
                          border: '1px solid var(--line)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: active ? 'var(--jet-black)' : 'transparent',
                          color: active ? 'var(--off-white)' : 'var(--fg)',
                          fontFamily: 'var(--mono)',
                          fontSize: 12,
                          cursor: b.disabled ? 'not-allowed' : 'pointer',
                          opacity: b.disabled ? 0.35 : 1,
                          transition: 'background .15s, color .15s',
                        }}
                      >
                        {b.l}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
