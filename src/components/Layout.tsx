import { asset } from '../lib/asset';
import { Fragment, useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconArrow, IconChevronDown, IconClose, IconMenu, IconSearch } from './icons';
import { useI18n, useT } from '../i18n/i18n';

export function Logo({ inverted = false, height = 28 }: { inverted?: boolean; height?: number }) {
  if (inverted) {
    return (
      <div
        style={{
          height,
          width: height * 3.45,
          backgroundColor: 'var(--off-white)',
          WebkitMaskImage: `url('${asset('logo-bicolor.png')}')`,
          maskImage: `url('${asset('logo-bicolor.png')}')`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--lava-orange)',
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, transparent 25%, black 25%, black 65%, transparent 65%)',
            maskImage:
              'linear-gradient(90deg, transparent 0%, transparent 25%, black 25%, black 65%, transparent 65%)',
          }}
        />
      </div>
    );
  }
  return <img src={asset("logo-bicolor.png")} alt="MAACH" style={{ height, width: 'auto' }} />;
}

const NAV_LINKS: { key: string; path: string; mega?: boolean; submenu?: boolean }[] = [
  // 'Nuevo' and 'Colecciones' are intentionally hidden from the nav. Routes still work.
  { key: 'nav.productos', path: '/productos', mega: true },
  { key: 'nav.espacios', path: '/espacios' },
  { key: 'nav.portafolio', path: '/portafolio', submenu: true },
  { key: 'nav.investigacion', path: '/investigacion' },
  { key: 'nav.sobre', path: '/sobre-maach' },
  { key: 'nav.contacto', path: '/contacto' },
];

export const PROJECTS: { id: string; name: string; status?: 'paused' }[] = [
  { id: '01', name: 'CPN' },
  { id: '02', name: 'Palladium' },
  { id: '03', name: 'Wesco' },
];

function MegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  // Each item carries the URL anchor of its section on the category page.
  // Anchors match the `slug` field of the corresponding section in
  // src/data/categorias.ts (Almacenamiento groups several products under
  // a single editorial section, hence the repeats).
  // `tkey` is the i18n key used to render the visible label: subcategory
  // labels that map to data use prod.sub.*; product-style labels with no
  // clean subcategory mapping use nav.*.
  const columns: {
    title: string;
    slug: string;
    items: { label: string; anchor: string; tkey: string }[];
  }[] = [
    {
      title: 'Sillonería',
      slug: 'silloneria',
      items: [
        { label: 'Sillas Presidente', anchor: 'sillas-presidente', tkey: 'prod.sub.sillas-presidente' },
        { label: 'Sillas Gerenciales', anchor: 'sillas-gerenciales', tkey: 'prod.sub.sillas-gerenciales' },
        { label: 'Sillas Operativas', anchor: 'sillas-operativas', tkey: 'prod.sub.sillas-operativas' },
        { label: 'Sillas de Visita', anchor: 'sillas-de-visita', tkey: 'prod.sub.sillas-de-visita' },
        { label: 'Colectividades', anchor: 'colectividades', tkey: 'prod.sub.colectividades' },
        { label: 'Sofás', anchor: 'sofas', tkey: 'prod.sub.sofas' },
      ],
    },
    {
      title: 'Escritorios',
      slug: 'escritorios',
      items: [
        { label: 'Escritorios Gerente', anchor: 'escritorios-gerente', tkey: 'prod.sub.escritorios-gerente' },
        { label: 'Escritorios Operativos', anchor: 'escritorios-operativos', tkey: 'prod.sub.escritorios-operativos' },
        { label: 'Estaciones de Trabajo', anchor: 'estaciones-de-trabajo', tkey: 'prod.sub.estaciones-de-trabajo' },
        { label: 'Escritorios Regulables', anchor: 'escritorios-regulables', tkey: 'prod.sub.escritorios-regulables' },
      ],
    },
    {
      title: 'Mesas',
      slug: 'mesas',
      items: [
        { label: 'Mesas de Reunión', anchor: 'mesas-de-reunion', tkey: 'prod.sub.mesas-de-reunion' },
        { label: 'Mesas Colaborativas', anchor: 'mesas-colaborativas', tkey: 'prod.sub.mesas-colaborativas' },
        { label: 'Mesas Auxiliares', anchor: 'mesas-auxiliares', tkey: 'prod.sub.mesas-auxiliares' },
      ],
    },
    {
      title: 'Almacenamiento',
      slug: 'almacenamiento',
      items: [
        { label: 'Biblioteca Alta', anchor: 'credenzas-bibliotecas', tkey: 'nav.mega.biblioteca-alta' },
        { label: 'Biblioteca Baja', anchor: 'credenzas-bibliotecas', tkey: 'nav.mega.biblioteca-baja' },
        { label: 'Credenza', anchor: 'credenzas-bibliotecas', tkey: 'nav.mega.credenza' },
        { label: 'Módulo 3 Gavetas', anchor: 'modulos-archivacion', tkey: 'nav.mega.modulo-3-gavetas' },
        { label: 'Arturito', anchor: 'modulos-archivacion', tkey: 'nav.mega.arturito' },
        { label: 'Locker', anchor: 'lockers', tkey: 'nav.mega.locker' },
        { label: 'Archivo Rodante', anchor: 'archivo-rodante', tkey: 'nav.mega.archivo-rodante' },
      ],
    },
    {
      title: 'Divisiones de Ambientes',
      slug: 'divisiones',
      items: [
        { label: 'Divisiones Modulares', anchor: 'divisiones-modulares', tkey: 'prod.sub.divisiones-modulares' },
        { label: 'Divisiones de Vidrio', anchor: 'divisiones-de-vidrio', tkey: 'prod.sub.divisiones-de-vidrio' },
      ],
    },
    {
      title: 'Recepciones',
      slug: 'recepciones',
      items: [
        { label: 'Counters de Recepción', anchor: 'recepciones', tkey: 'nav.mega.counters-de-recepcion' },
        { label: 'Mostradores', anchor: 'recepciones', tkey: 'nav.mega.mostradores' },
        { label: 'Sistemas de Espera', anchor: 'recepciones', tkey: 'nav.mega.sistemas-de-espera' },
      ],
    },
  ];

  return (
    <div
      onMouseLeave={onClose}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: 'var(--off-white)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        maxHeight: open ? 800 : 0,
        opacity: open ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height .4s ease, opacity .25s ease',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      <div
        className="maach-container"
        style={{ padding: '56px 48px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: 64 }}
      >
        <div>
          <div
            style={{
              aspectRatio: '4/5',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 24,
            }}
          >
            <img
              src={asset("brand/megamenu-silloneria.webp")}
              alt="Catálogo MAACH"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <Link
            to="/productos"
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              borderBottom: '1px solid var(--fg)',
              paddingBottom: 4,
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {t('nav.mega.ver_todos')} <IconArrow size={14} />
          </Link>
          <div style={{ marginTop: 32 }}>
            <div className="maach-mono" style={{ color: 'var(--muted)', marginBottom: 12 }}>
              {t('nav.mega.relacionado')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, fontWeight: 500 }}>
              <Link to="/portafolio" onClick={onClose}>{t('nav.portafolio')}</Link>
              <Link to="/recursos-diseno/biblioteca" onClick={onClose}>{t('nav.mega.documentos_tecnicos')}</Link>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, columnGap: 56 }}>
          {columns.map((col) => (
            <div key={col.title}>
              <Link
                to={`/categorias/${col.slug}`}
                onClick={onClose}
                style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 600,
                  fontSize: 22,
                  marginBottom: 20,
                  textTransform: 'uppercase',
                  letterSpacing: '-.01em',
                  color: 'var(--fg)',
                  display: 'block',
                  transition: 'color .15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--lava-orange)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg)')}
              >
                {t(('cat.' + col.slug + '.name') as Parameters<typeof t>[0])}
              </Link>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={`/categorias/${col.slug}#${item.anchor}`}
                      onClick={onClose}
                      style={{ fontSize: 14, color: 'var(--muted)', transition: 'color .15s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                    >
                      {t(item.tkey as Parameters<typeof t>[0])}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortafolioMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  return (
    <div
      onMouseLeave={onClose}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: 'var(--off-white)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        maxHeight: open ? 520 : 0,
        opacity: open ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height .35s ease, opacity .22s ease',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      <div
        className="maach-container"
        style={{ padding: '40px 48px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 64 }}
      >
        <div>
          <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 16 }}>
            {t('nav.port.eyebrow')}
          </span>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 24 }}>
            {t('nav.port.intro')}
          </p>
          <Link
            to="/portafolio"
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              borderBottom: '1px solid var(--fg)',
              paddingBottom: 4,
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {t('nav.port.ver_completo')} <IconArrow size={14} />
          </Link>
        </div>

        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px 48px',
          }}
        >
          {PROJECTS.map((p) => {
            const paused = p.status === 'paused';
            return (
              <li key={p.id}>
                <Link
                  to={`/portafolio/${p.id}`}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    paddingBottom: 12,
                    borderBottom: '1px solid var(--line)',
                  }}
                  onMouseEnter={(e) => {
                    const h = e.currentTarget.querySelector<HTMLElement>('[data-port-name]');
                    if (h) h.style.color = 'var(--lava-orange)';
                  }}
                  onMouseLeave={(e) => {
                    const h = e.currentTarget.querySelector<HTMLElement>('[data-port-name]');
                    if (h) h.style.color = paused ? 'var(--muted)' : 'var(--fg)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      data-port-name
                      style={{
                        fontFamily: 'var(--display)',
                        fontWeight: 700,
                        fontSize: 22,
                        textTransform: 'uppercase',
                        letterSpacing: '-.01em',
                        color: paused ? 'var(--muted)' : 'var(--fg)',
                        transition: 'color .15s',
                      }}
                    >
                      {p.name}
                    </span>
                    {paused ? (
                      <span
                        className="maach-mono"
                        style={{
                          background: 'var(--sand-grey)',
                          color: 'var(--fg)',
                          padding: '2px 7px',
                          fontSize: 10,
                          letterSpacing: '.1em',
                        }}
                      >
                        {t('nav.port.pausado')}
                      </span>
                    ) : null}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Nav() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [portOpen, setPortOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const { lang, setLang, t } = useI18n();

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'var(--off-white)',
        borderBottom: '1px solid var(--line)',
        zIndex: 90,
      }}
      onMouseLeave={() => {
        setMegaOpen(false);
        setPortOpen(false);
      }}
    >
      <div
        className="maach-container"
        style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: 56, height: '100%' }}>
          <Link to="/" onClick={() => setMegaOpen(false)}>
            <Logo height={26} />
          </Link>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', height: '100%', gap: 28 }}>
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
              if (link.mega) {
                return (
                  <div
                    key={link.path}
                    onMouseEnter={() => {
                      setMegaOpen(true);
                      setPortOpen(false);
                    }}
                    style={{ height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <span
                      className="maach-mono"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: megaOpen || active ? 'var(--lava-orange)' : 'var(--fg)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'color .2s',
                      }}
                    >
                      {t(link.key as Parameters<typeof t>[0])}
                      <IconChevronDown size={11} rotate={megaOpen ? 180 : 0} />
                    </span>
                  </div>
                );
              }
              if (link.submenu) {
                return (
                  <div
                    key={link.path}
                    onMouseEnter={() => {
                      setPortOpen(true);
                      setMegaOpen(false);
                    }}
                    style={{ height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setPortOpen(false)}
                      className="maach-mono"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: portOpen || active ? 'var(--lava-orange)' : 'var(--fg)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'color .2s',
                      }}
                    >
                      {t(link.key as Parameters<typeof t>[0])}
                      <IconChevronDown size={11} rotate={portOpen ? 180 : 0} />
                    </Link>
                  </div>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => {
                    setMegaOpen(false);
                    setPortOpen(false);
                  }}
                  onMouseEnter={() => {
                    setMegaOpen(false);
                    setPortOpen(false);
                  }}
                  className="maach-mono"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: active ? 'var(--lava-orange)' : 'var(--fg)',
                    transition: 'color .2s',
                  }}
                >
                  {t(link.key as Parameters<typeof t>[0])}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{ padding: 10 }} aria-label="Buscar">
            <IconSearch />
          </button>
          <div className="nav-divider" style={{ width: 1, height: 28, background: 'var(--line)', margin: '0 8px' }} />
          <div className="nav-lang" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <button
              type="button"
              onClick={() => setLang('es')}
              className="maach-mono"
              aria-pressed={lang === 'es'}
              style={{
                padding: '4px 6px',
                color: lang === 'es' ? 'var(--lava-orange)' : 'var(--muted)',
                fontWeight: lang === 'es' ? 700 : 500,
                cursor: 'pointer',
                transition: 'color .2s',
              }}
            >
              ES
            </button>
            <span className="maach-mono" style={{ color: 'var(--muted)' }}>
              /
            </span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className="maach-mono"
              aria-pressed={lang === 'en'}
              style={{
                padding: '4px 6px',
                color: lang === 'en' ? 'var(--lava-orange)' : 'var(--muted)',
                fontWeight: lang === 'en' ? 700 : 500,
                cursor: 'pointer',
                transition: 'color .2s',
              }}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile hamburger — hidden on desktop via CSS */}
        <button
          className="nav-burger"
          aria-label={drawerOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setDrawerOpen((v) => !v)}
          style={{ padding: 10, display: 'none' }}
        >
          {drawerOpen ? <IconClose size={20} /> : <IconMenu size={20} />}
        </button>
      </div>

      <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
      <PortafolioMenu open={portOpen} onClose={() => setPortOpen(false)} />

      {/* Mobile drawer */}
      <div
        className="nav-drawer"
        style={{
          position: 'fixed',
          top: 80,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--off-white)',
          borderTop: '1px solid var(--line)',
          transform: drawerOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform .35s ease',
          zIndex: 80,
          overflowY: 'auto',
          display: 'none',
        }}
      >
        <div style={{ padding: '32px 32px 64px', display: 'flex', flexDirection: 'column' }}>
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 0',
                  borderBottom: '1px solid var(--line)',
                  fontFamily: 'var(--display)',
                  fontWeight: 600,
                  fontSize: 28,
                  letterSpacing: '-.01em',
                  textTransform: 'uppercase',
                  color: active ? 'var(--lava-orange)' : 'var(--fg)',
                }}
              >
                {t(link.key as Parameters<typeof t>[0])}
                <IconArrow size={18} rotate={-45} />
              </Link>
            );
          })}
          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: '2px solid var(--lava-orange)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            <span>{t('nav.drawer.sistema')}</span>
            <span style={{ display: 'inline-flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => setLang('es')}
                style={{
                  padding: '0 4px',
                  color: lang === 'es' ? 'var(--lava-orange)' : 'var(--muted)',
                  fontWeight: lang === 'es' ? 700 : 500,
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                ES
              </button>
              /
              <button
                type="button"
                onClick={() => setLang('en')}
                style={{
                  padding: '0 4px',
                  color: lang === 'en' ? 'var(--lava-orange)' : 'var(--muted)',
                  fontWeight: lang === 'en' ? 700 : 500,
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                EN
              </button>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const { t } = useI18n();
  const cols = [
    {
      title: t('footer.col.productos'),
      items: [
        { label: t('cat.silloneria.name'), path: '/categorias/silloneria' },
        { label: t('cat.escritorios.name'), path: '/categorias/escritorios' },
        { label: t('cat.mesas.name'), path: '/categorias/mesas' },
        { label: t('cat.almacenamiento.name'), path: '/categorias/almacenamiento' },
        { label: t('cat.divisiones.name'), path: '/categorias/divisiones' },
        { label: t('cat.recepciones.name'), path: '/categorias/recepciones' },
      ],
    },
    {
      title: t('footer.col.company'),
      items: [
        { label: t('nav.sobre'), path: '/sobre-maach' },
        { label: t('nav.investigacion'), path: '/investigacion' },
        { label: t('nav.portafolio'), path: '/portafolio' },
        { label: t('nav.contacto'), path: '/contacto' },
      ],
    },
    {
      title: t('footer.col.resources'),
      items: [
        { label: t('nav.footer.biblioteca'), path: '/recursos-diseno/biblioteca' },
        { label: t('nav.footer.modelos_cad'), path: '/recursos-diseno/biblioteca?tipo=modelos-3d' },
        { label: t('nav.footer.fichas'), path: '/recursos-diseno/biblioteca?tipo=fichas' },
        { label: t('nav.footer.materiales'), path: '/recursos-diseno/biblioteca?tipo=materiales' },
      ],
    },
  ];

  return (
    <footer
      className="invert"
      style={{ background: 'var(--jet-black)', color: 'var(--off-white)', paddingTop: 96 }}
    >
      <div className="maach-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 64,
            alignItems: 'end',
            paddingBottom: 64,
            borderBottom: '1px solid var(--line)',
          }}
        >
          <div style={{ position: 'relative' }}>
            {/* Orange L crosshair */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                width: 22,
                height: 22,
                borderTop: '2px solid var(--lava-orange)',
                borderRight: '2px solid var(--lava-orange)',
              }}
            />
            <div className="maach-mono" style={{ color: 'var(--lava-orange)', marginBottom: 16 }}>
              MAACH / 2026
            </div>
            <h2
              className="h-display"
              style={{
                fontSize: 'clamp(30px, 4vw, 60px)',
                color: 'var(--off-white)',
                lineHeight: 1.08,
                letterSpacing: '-.01em',
              }}
            >
              {t('footer.manifesto.line1')}{' '}
              <span style={{ color: 'var(--lava-orange)' }}>
                {t('footer.manifesto.line2')}
              </span>
              <br />
              {t('footer.manifesto.line3')}
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ color: 'var(--sand-grey)', fontSize: 18, lineHeight: 1.5, maxWidth: 420 }}>
              {t('footer.intro')}
            </p>
            <Link to="/contacto" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              {t('cta.contact')} <IconArrow size={14} />
            </Link>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr repeat(3, 1fr)',
            gap: 48,
            padding: '64px 0',
          }}
        >
          <div>
            <img
              src={asset('maach-logo-transparent.png')}
              alt="MAACH"
              style={{ width: 140, height: 'auto', display: 'block' }}
            />
            <p style={{ color: 'var(--sand-grey)', marginTop: 32, maxWidth: 280 }}>
              {t('footer.address.line1')}
              {t('footer.address.line2') ? (
                <>
                  <br />
                  {t('footer.address.line2')}
                </>
              ) : null}
            </p>
            <p style={{ color: 'var(--sand-grey)', marginTop: 16 }}>
              <a href="mailto:ventas@maach.ec" style={{ color: 'var(--sand-grey)' }}>
                ventas@maach.ec
              </a>
              <br />
              <a href="tel:+593997200455" style={{ color: 'var(--sand-grey)' }}>
                +593 99 720 0455
              </a>
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
              {['IG', 'Li', 'Be', 'Pi'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="maach-mono"
                  style={{
                    width: 40,
                    height: 40,
                    border: '1px solid var(--line)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    transition: 'all .2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--off-white)';
                    e.currentTarget.style.color = 'var(--jet-black)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '';
                    e.currentTarget.style.color = '';
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="maach-mono" style={{ color: 'var(--sand-grey)', marginBottom: 24, fontSize: 11 }}>
                {c.title}
              </h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {c.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      to={it.path}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
                      style={{ color: 'var(--off-white)', transition: 'color .15s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--lava-orange)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--off-white)')}
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid var(--line)',
            padding: '32px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
            © 2026 MAACH · {t('footer.bottom.tagline')}
          </span>
          <div style={{ display: 'flex', gap: 32 }}>
            <a href="#" className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
              {t('footer.terms')}
            </a>
            <a href="#" className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
              {t('footer.privacy')}
            </a>
            <a href="#" className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
              {t('footer.cookies')}
            </a>
          </div>
        </div>

        <div style={{ position: 'relative', height: 64, overflow: 'hidden', borderTop: '1px solid var(--line)' }}>
          <div className="tex-load-line" style={{ position: 'absolute', inset: 0, color: 'var(--off-white)' }} />
        </div>
      </div>
    </footer>
  );
}

export function Marquee({
  items,
}: {
  items?: string[];
}) {
  const t = useT();
  const resolved =
    items ?? [
      t('nav.marquee.0'),
      t('nav.marquee.1'),
      t('nav.marquee.2'),
      t('nav.marquee.3'),
      t('nav.marquee.4'),
    ];
  const full = [...resolved, ...resolved, ...resolved, ...resolved];
  return (
    <div
      className="marquee"
      style={{
        background: 'var(--jet-black)',
        color: 'var(--off-white)',
        padding: '14px 0',
        borderTop: '1px solid var(--jet-black)',
        borderBottom: '1px solid var(--jet-black)',
      }}
    >
      <div className="marquee-track">
        {full.map((t, i) => (
          <Fragment key={i}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: 'var(--lava-orange)' }}>+</span> {t}
            </span>
            <span className="dot" />
          </Fragment>
        ))}
      </div>
      <div className="marquee-track" aria-hidden>
        {full.map((t, i) => (
          <Fragment key={i}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: 'var(--lava-orange)' }}>+</span> {t}
            </span>
            <span className="dot" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function Layout({ children, screenLabel }: { children: ReactNode; screenLabel?: string }) {
  return (
    <div data-screen-label={screenLabel} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, paddingTop: 80 }} className="page">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function useNav() {
  return useNavigate();
}
