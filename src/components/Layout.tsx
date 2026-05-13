import { asset } from '../lib/asset';
import { Fragment, useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconArrow, IconChevronDown, IconSearch } from './icons';

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

const NAV_LINKS: { label: string; path: string; mega?: boolean }[] = [
  { label: 'Nuevo', path: '/nuevo' },
  { label: 'Productos', path: '/productos', mega: true },
  { label: 'Colecciones', path: '/colecciones' },
  { label: 'Espacios', path: '/espacios' },
  { label: 'Portafolio', path: '/portafolio' },
  { label: 'Investigación', path: '/investigacion' },
  { label: 'Sobre MAACH', path: '/sobre-maach' },
];

function MegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const columns = [
    {
      title: 'Sillería',
      items: ['Sillas Operativas', 'Sillas de Visita', 'Sillas Directivas', 'Bancos', 'Sistemas Lounge', 'Sofás'],
    },
    {
      title: 'Escritorios & Estaciones',
      items: ['Estaciones de Trabajo', 'Escritorios', 'Escritorios Regulables', 'Sistemas Benching', 'Oficinas Privadas'],
    },
    { title: 'Mesas', items: ['Mesas de Juntas', 'Mesas Colaborativas', 'Mesas Ocasionales'] },
    {
      title: 'Almacenamiento',
      items: ['Credenzas', 'Bibliotecas', 'Lockers', 'Archivo Rodante', 'Almacenamiento Personal'],
    },
    { title: 'Arquitectura', items: ['Muros Modulares', 'Pods', 'Mamparas Divisorias'] },
    { title: 'Accesorios', items: ['Brazos de Monitor', 'Gestión de Energía', 'Iluminación', 'Pizarrones'] },
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
              src={asset("biblioteca-1.webp")}
              alt="Catálogo MAACH"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: 12, left: 12 }} className="maach-tag">
              CAT_2026
            </div>
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
            Ver todos los productos <IconArrow size={14} />
          </Link>
          <div style={{ marginTop: 32 }}>
            <div className="maach-mono" style={{ color: 'var(--muted)', marginBottom: 12 }}>
              Relacionado
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, fontWeight: 500 }}>
              <Link to="/colecciones" onClick={onClose}>Colecciones</Link>
              <Link to="/portafolio" onClick={onClose}>Portafolio</Link>
              <Link to="/recursos-diseno/biblioteca" onClick={onClose}>Documentos técnicos</Link>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, columnGap: 56 }}>
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 600,
                  fontSize: 22,
                  marginBottom: 20,
                  textTransform: 'uppercase',
                  letterSpacing: '-.01em',
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.items.map((item) => (
                  <li key={item}>
                    <Link
                      to="/productos"
                      onClick={onClose}
                      style={{ fontSize: 14, color: 'var(--muted)', transition: 'color .15s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                    >
                      {item}
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

function Nav() {
  const [megaOpen, setMegaOpen] = useState(false);
  const { pathname } = useLocation();

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
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div
        className="maach-container"
        style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 56, height: '100%' }}>
          <Link to="/" onClick={() => setMegaOpen(false)}>
            <Logo height={26} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', gap: 28 }}>
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
              if (link.mega) {
                return (
                  <div
                    key={link.path}
                    onMouseEnter={() => setMegaOpen(true)}
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
                      {link.label}
                      <IconChevronDown size={11} rotate={megaOpen ? 180 : 0} />
                    </span>
                  </div>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMegaOpen(false)}
                  onMouseEnter={() => setMegaOpen(false)}
                  className="maach-mono"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: active ? 'var(--lava-orange)' : 'var(--fg)',
                    transition: 'color .2s',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{ padding: 10 }} aria-label="Buscar">
            <IconSearch />
          </button>
          <div style={{ width: 1, height: 28, background: 'var(--line)', margin: '0 8px' }} />
          <span className="maach-mono" style={{ color: 'var(--muted)' }}>
            ES / EN
          </span>
        </div>
      </div>

      <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
    </nav>
  );
}

function Footer() {
  const cols = [
    {
      title: 'Productos',
      items: [
        { label: 'Sillería', path: '/productos' },
        { label: 'Escritorios & Estaciones', path: '/productos' },
        { label: 'Mesas', path: '/productos' },
        { label: 'Almacenamiento', path: '/productos' },
        { label: 'Divisiones', path: '/productos' },
      ],
    },
    {
      title: 'Compañía',
      items: [
        { label: 'Sobre MAACH', path: '/sobre-maach' },
        { label: 'Investigación', path: '/investigacion' },
        { label: 'Portafolio', path: '/portafolio' },
        { label: 'Contacto', path: '/contacto' },
      ],
    },
    {
      title: 'Recursos',
      items: [
        { label: 'Biblioteca de documentos', path: '/recursos-diseno/biblioteca' },
        { label: 'Modelos 3D / CAD', path: '/recursos-diseno/biblioteca' },
        { label: 'Fichas técnicas', path: '/recursos-diseno/biblioteca' },
        { label: 'Materiales y acabados', path: '/recursos-diseno/biblioteca' },
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
            <h2 className="h-display" style={{ fontSize: 'clamp(64px, 9vw, 144px)', color: 'var(--off-white)' }}>
              Engineered<br />
              <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>for work.</span>
              <br />
              Designed to last.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ color: 'var(--sand-grey)', fontSize: 18, lineHeight: 1.5, maxWidth: 420 }}>
              Mobiliario corporativo diseñado para el trabajo real. Diseño funcional, ingeniería aplicada y fabricación industrial.
            </p>
            <Link to="/contacto" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              Iniciar proyecto <IconArrow size={14} />
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
            <Logo inverted height={28} />
            <p style={{ color: 'var(--sand-grey)', marginTop: 32, maxWidth: 280 }}>
              Av. Industrial 450 · Parque Tecnológico
              <br />
              C.P. 10293 · Ciudad de México, CDMX
            </p>
            <p style={{ color: 'var(--sand-grey)', marginTop: 16 }}>
              proyectos@maach.com.mx
              <br />
              +52 (55) 1234-5678
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
            © 2026 MAACH · Industrial Design, Real Performance
          </span>
          <div style={{ display: 'flex', gap: 32 }}>
            <a href="#" className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
              Términos
            </a>
            <a href="#" className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
              Privacidad
            </a>
            <a href="#" className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
              Cookies
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
  items = ['Estructura sólida', 'Ergonomía aplicada', 'Fabricación industrial', 'Diseño funcional', 'Ingeniería de proyectos'],
}: {
  items?: string[];
}) {
  const full = [...items, ...items, ...items, ...items];
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
