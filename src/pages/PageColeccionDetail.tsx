import { asset } from '../lib/asset';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow, IconChevronRight, IconDownload } from '../components/icons';
import { useT } from '../i18n/i18n';

const NAMES: Record<string, string> = {
  'maach-01': 'Coalesse',
  'maach-02': 'Viccarbe',
  'maach-03': 'West Elm',
};

export default function PageColeccionDetail() {
  const t = useT();
  const { id = 'maach-01' } = useParams();
  const name = NAMES[id] || 'Coalesse';

  const products = [
    { id: 1, name: 'Silla Operativa X1', nameKey: 'colecd.prod_1_name', cat: 'Sillería', catKey: 'colecd.prod_1_cat', img: asset('biblioteca-1.webp') },
    { id: 2, name: 'Sistema Bench Modular', nameKey: 'colecd.prod_2_name', cat: 'Estaciones', catKey: 'colecd.prod_2_cat', img: asset('biblioteca-2.webp') },
    { id: 3, name: 'Lounge Chair Y', nameKey: 'colecd.prod_3_name', cat: 'Sillería lounge', catKey: 'colecd.prod_3_cat', img: asset('biblioteca-3.webp') },
    { id: 4, name: 'Mesa de Juntas', nameKey: 'colecd.prod_4_name', cat: 'Mesas', catKey: 'colecd.prod_4_cat', img: asset('biblioteca-4.webp') },
    { id: 5, name: 'Separador Acústico', nameKey: 'colecd.prod_5_name', cat: 'Arquitectura', catKey: 'colecd.prod_5_cat', img: asset('biblioteca-5.webp') },
    { id: 6, name: 'Archivero Móvil', nameKey: 'colecd.prod_6_name', cat: 'Almacenamiento', catKey: 'colecd.prod_6_cat', img: asset('biblioteca-1.webp') },
  ];

  return (
    <Layout screenLabel={t('colecd.screen_label') + ' · ' + name}>
      <div
        style={{
          position: 'sticky',
          top: 80,
          zIndex: 30,
          background: 'rgba(228,226,227,.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          className="maach-container"
          style={{ padding: '14px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Link
            to="/colecciones"
            className="maach-mono"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <IconChevronRight size={10} style={{ transform: 'rotate(180deg)' }} /> {t('colecd.breadcrumb_colecciones')}
          </Link>
          <button
            className="maach-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid var(--line)',
              padding: '10px 16px',
            }}
          >
            <IconDownload size={12} /> {t('colecd.btn_ficha')}
          </button>
        </div>
      </div>

      <section
        style={{
          height: '85vh',
          minHeight: 640,
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <img
          src={asset("biblioteca-2.webp")}
          alt={name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(22,22,22,.6), rgba(22,22,22,.1) 60%, transparent)',
          }}
        />
        <div
          className="tex-load-line"
          style={{ position: 'absolute', inset: 0, color: 'var(--off-white)', opacity: 0.15 }}
        />

        <div
          className="maach-container"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: 96,
          }}
        >
          <span className="maach-mono" style={{ color: 'var(--off-white)', marginBottom: 24 }}>
            {t('colecd.hero_eyebrow')}
          </span>
          <h1 className="h-display" style={{ fontSize: 'clamp(60px, 15vw, 90px)', color: 'var(--off-white)' }}>
            {name}
          </h1>
          <p
            style={{
              fontSize: 24,
              color: 'var(--off-white)',
              maxWidth: 720,
              marginTop: 24,
              fontFamily: 'var(--display)',
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            {t('colecd.hero_subtitle')}
          </p>
        </div>
      </section>

      <section style={{ padding: '144px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 16 }}>
                {t('colecd.concepto_eyebrow')}
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(48px, 6.5vw, 90px)', marginBottom: 32 }}>
                {t('colecd.concepto_title_1')}<br />
                <span className="h-italic">{t('colecd.concepto_title_2')}</span>
              </h2>
              <p style={{ fontSize: 18, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 20 }}>
                {name} {t('colecd.concepto_p1')}
              </p>
              <p style={{ fontSize: 18, color: 'var(--muted)', lineHeight: 1.55 }}>
                {t('colecd.concepto_p2')}
              </p>
            </div>
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                border: '1px solid var(--line)',
                overflow: 'hidden',
              }}
            >
              <img src={asset("biblioteca-3.webp")} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                <span className="maach-mono" style={{ background: 'var(--off-white)', padding: '5px 10px' }}>
                  {t('colecd.detalle_estructural')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '128px 0', borderBottom: '1px solid var(--line)' }}>
        <div
          className="maach-container"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}
        >
          <div>
            <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
              {t('colecd.catalogo_eyebrow')}
            </span>
            <h2 className="h-display" style={{ fontSize: 64 }}>
              {t('colecd.catalogo_title')}
            </h2>
          </div>
          <Link
            to="/productos"
            className="maach-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              borderBottom: '1.5px solid var(--fg)',
              paddingBottom: 4,
            }}
          >
            {t('colecd.ver_todos')} <IconArrow size={14} />
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }} className="hide-scrollbar">
          <div style={{ display: 'flex', gap: 24, padding: '0 48px', minWidth: 'max-content' }}>
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/productos/${p.cat.toLowerCase()}/${p.id}`}
                style={{ display: 'block', width: 380, flexShrink: 0 }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4/5',
                    border: '1px solid var(--line)',
                    overflow: 'hidden',
                    marginBottom: 16,
                    background: 'var(--surface)',
                  }}
                >
                  <img src={p.img} alt={t(p.nameKey)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span
                    className="maach-mono"
                    style={{ position: 'absolute', bottom: 12, left: 12, background: 'var(--off-white)', padding: '3px 7px' }}
                  >
                    PRD_0{p.id}
                  </span>
                </div>
                <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                  {t(p.catKey)}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: 24,
                    textTransform: 'uppercase',
                    letterSpacing: '-.01em',
                    lineHeight: 1.05,
                  }}
                >
                  {t(p.nameKey)}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 128px' }}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <img
            src={asset("biblioteca-4.webp")}
            alt=""
            style={{ width: '100%', aspectRatio: '21/9', objectFit: 'cover', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(228,226,227,.95) 0%, rgba(228,226,227,.5) 50%, rgba(228,226,227,.2))',
            }}
          />

          <div
            className="maach-container"
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}
          >
            <div style={{ maxWidth: 560 }}>
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 16 }}>
                {t('colecd.lanzamiento_eyebrow')}
              </span>
              <h3 className="h-display" style={{ fontSize: 64, marginBottom: 24 }}>
                {t('colecd.lanzamiento_title_1')}<br />{t('colecd.lanzamiento_title_2')}
              </h3>
              <p style={{ fontSize: 17, color: 'var(--fg)', lineHeight: 1.55, marginBottom: 16 }}>
                {t('colecd.lanzamiento_p1')}
              </p>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>
                {t('colecd.lanzamiento_quote')}
              </p>
              <span className="maach-mono" style={{ display: 'block', marginTop: 16 }}>
                {t('colecd.lanzamiento_author')}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="invert"
        style={{
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          padding: '144px 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="tex-load-line"
          style={{ position: 'absolute', inset: 0, color: 'var(--off-white)', pointerEvents: 'none' }}
        />
        <div className="maach-container" style={{ position: 'relative' }}>
          <span className="maach-mono" style={{ color: 'var(--sand-grey)', display: 'block', marginBottom: 24 }}>
            {t('colecd.cta_eyebrow')}
          </span>
          <h2
            className="h-display"
            style={{ fontSize: 'clamp(56px, 8vw, 90px)', color: 'var(--off-white)', marginBottom: 24 }}
          >
            {t('colecd.cta_integrar')} <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{name}</span>
          </h2>
          <p
            style={{
              color: 'var(--sand-grey)',
              fontSize: 18,
              maxWidth: 640,
              margin: '0 auto 48px',
              lineHeight: 1.55,
            }}
          >
            {t('colecd.cta_desc')}
          </p>
          <div style={{ display: 'inline-flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/contacto" className="btn-primary">
              {t('colecd.cta_contactar')} <IconArrow size={14} />
            </Link>
            <button className="btn-ghost">
              <IconDownload size={14} /> {t('colecd.cta_descargar')}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
