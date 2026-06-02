import { asset } from '../lib/asset';
import { useState } from 'react';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';
import { useT } from '../i18n/i18n';

type FormState = {
  nombre: string;
  correo: string;
  empresa: string;
  mensaje: string;
};

export default function PageContacto() {
  const t = useT();
  const [form, setForm] = useState<FormState>({
    nombre: '',
    correo: '',
    empresa: '',
    mensaje: '',
  });
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <Layout screenLabel="14 Contacto">
      {/* HERO — split, photo on the right, orange spine on the left */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '64px 0',
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid var(--line)',
        }}
      >
        {/* Orange spine */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 6,
            background: 'var(--lava-orange)',
            zIndex: 1,
          }}
        />
        {/* Rotated label */}
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
            zIndex: 1,
          }}
        >
          MAACH · CONTACTO 2026
        </span>
        {/* Corner crosshairs */}
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
            zIndex: 1,
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
            zIndex: 1,
          }}
        />

        <div className="maach-container" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1400 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            {/* LEFT: text */}
            <div>
              <span
                className="maach-tag"
                style={{
                  marginBottom: 28,
                  display: 'inline-flex',
                  borderColor: 'var(--lava-orange)',
                  color: 'var(--lava-orange)',
                }}
              >
                {t('cont.tag')}
              </span>
              <h1 className="h-display" style={{ fontSize: 'clamp(56px, 7vw, 90px)', marginBottom: 32 }}>
                {t('cont.hero.title.1')}<br />
                <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>{t('cont.hero.title.2')}</span>
              </h1>
              <p style={{ fontSize: 19, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 40 }}>
                {t('cont.hero.body')}
              </p>

              {/* Stat strip */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 24,
                  paddingTop: 28,
                  borderTop: '1px solid var(--line)',
                }}
              >
                {[
                  { n: '< 24h', l: t('cont.stat.response') },
                  { n: 'QUITO', l: t('cont.stat.location') },
                  { n: '03', l: t('cont.stat.direct_lines') },
                ].map((s) => (
                  <div key={s.l}>
                    <div
                      style={{
                        fontFamily: 'var(--display)',
                        fontWeight: 700,
                        fontSize: 36,
                        lineHeight: 1,
                        marginBottom: 6,
                        color: 'var(--lava-orange)',
                        letterSpacing: '-.02em',
                      }}
                    >
                      {s.n}
                    </div>
                    <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                      {s.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: tall photo with info chips */}
            <div
              className="invert"
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                maxHeight: 'calc(100vh - 200px)',
                border: '1px solid var(--line)',
                overflow: 'hidden',
                background: 'var(--jet-black)',
                color: 'var(--off-white)',
              }}
            >
              <img
                src={asset('biblioteca-3.webp')}
                alt=""
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(22,22,22,.2) 0%, rgba(22,22,22,0) 30%, rgba(22,22,22,.5) 65%, rgba(22,22,22,.9) 100%)',
                }}
              />
              {/* Top chip */}
              <span
                className="maach-mono"
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  background: 'var(--off-white)',
                  color: 'var(--jet-black)',
                  padding: '6px 10px',
                }}
              >
                {t('cont.right.tag')}
              </span>
              {/* Bottom content */}
              <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28, color: 'var(--off-white)' }}>
                <span className="maach-mono" style={{ color: 'var(--sand-grey)', display: 'block', marginBottom: 12 }}>
                  {t('cont.right.eyebrow')}
                </span>
                <h2
                  className="h-display"
                  style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', color: 'var(--off-white)', margin: 0, lineHeight: 1 }}
                >
                  {t('cont.right.title.1')}<br />
                  <span style={{ color: 'var(--lava-orange)' }}>{t('cont.right.title.2')}</span>
                </h2>
              </div>
              {/* Orange L corner on image */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  width: 18,
                  height: 18,
                  borderTop: '2px solid var(--lava-orange)',
                  borderRight: '2px solid var(--lava-orange)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FORM + INFO — black band, brand-book style */}
      <section
        className="invert"
        style={{
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          padding: '112px 0',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          className="tex-slats"
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            backgroundImage: `url(${asset('texture-2.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="maach-container" style={{ position: 'relative', zIndex: 1 }}>
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
              <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 28 }}>
                {t('cont.form.eyebrow')}
              </span>
              <h2
                className="h-display"
                style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', color: 'var(--off-white)', lineHeight: 1, margin: 0 }}
              >
                {t('cont.form.title')}
              </h2>
            </div>
            <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
              {t('cont.form.response')}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 80 }}>
            {/* FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Mock: formulario enviado');
              }}
              style={{
                background: '#1c1c1c',
                border: '1px solid rgba(228,226,227,.15)',
                padding: '40px 40px 32px',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 32,
                  marginBottom: 28,
                }}
              >
                <div>
                  <label htmlFor="nombre" className="maach-label" style={{ color: 'var(--sand-grey)' }}>
                    {t('cont.form.name')}
                  </label>
                  <input
                    id="nombre"
                    required
                    type="text"
                    value={form.nombre}
                    onChange={(e) => set('nombre', e.target.value)}
                    className="maach-input"
                    style={{ borderColor: 'rgba(228,226,227,.4)', color: 'var(--off-white)' }}
                    placeholder={t('cont.form.name_ph')}
                  />
                </div>
                <div>
                  <label htmlFor="correo" className="maach-label" style={{ color: 'var(--sand-grey)' }}>
                    {t('cont.form.email')}
                  </label>
                  <input
                    id="correo"
                    required
                    type="email"
                    value={form.correo}
                    onChange={(e) => set('correo', e.target.value)}
                    className="maach-input"
                    style={{ borderColor: 'rgba(228,226,227,.4)', color: 'var(--off-white)' }}
                    placeholder={t('cont.form.email_ph')}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label htmlFor="empresa" className="maach-label" style={{ color: 'var(--sand-grey)' }}>
                  {t('cont.form.company')}
                </label>
                <input
                  id="empresa"
                  type="text"
                  value={form.empresa}
                  onChange={(e) => set('empresa', e.target.value)}
                  className="maach-input"
                  style={{ borderColor: 'rgba(228,226,227,.4)', color: 'var(--off-white)' }}
                  placeholder={t('cont.form.company_ph')}
                />
              </div>

              <div style={{ marginBottom: 32 }}>
                <label htmlFor="mensaje" className="maach-label" style={{ color: 'var(--sand-grey)' }}>
                  {t('cont.form.message')}
                </label>
                <textarea
                  id="mensaje"
                  required
                  rows={5}
                  value={form.mensaje}
                  onChange={(e) => set('mensaje', e.target.value)}
                  className="maach-input"
                  style={{
                    resize: 'vertical',
                    borderColor: 'rgba(228,226,227,.4)',
                    color: 'var(--off-white)',
                  }}
                  placeholder={t('cont.form.message_ph')}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 24,
                  marginBottom: 24,
                  flexWrap: 'wrap',
                }}
              >
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ width: 16, height: 16, accentColor: 'var(--lava-orange)' }}
                  />
                  <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
                    {t('cont.form.privacy')}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'space-between', padding: '20px 28px' }}
              >
                {t('cta.send_message')} <IconArrow size={14} />
              </button>
            </form>

            {/* SIDE INFO */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div
                style={{
                  border: '1px solid rgba(228,226,227,.18)',
                  padding: 32,
                  background: '#1c1c1c',
                }}
              >
                <span
                  className="maach-mono"
                  style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}
                >
                  {t('cont.side.info')}
                </span>
                <a
                  href="mailto:ventas@maach.ec"
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 600,
                    fontSize: 26,
                    letterSpacing: '-.01em',
                    textTransform: 'lowercase',
                    color: 'var(--off-white)',
                    display: 'inline-block',
                    borderBottom: '1.5px solid var(--lava-orange)',
                    paddingBottom: 4,
                  }}
                >
                  ventas@maach.ec
                </a>
              </div>

              <div
                style={{
                  border: '1px solid rgba(228,226,227,.18)',
                  padding: 32,
                  background: '#1c1c1c',
                }}
              >
                <span className="maach-mono" style={{ color: 'var(--sand-grey)', display: 'block', marginBottom: 16 }}>
                  {t('cont.side.phones')}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['0997 200 455', '0979 514 286', '0999 441 139'].map((tel) => (
                    <a
                      key={tel}
                      href={`tel:${tel.replace(/\s/g, '')}`}
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 17,
                        fontWeight: 500,
                        letterSpacing: '.04em',
                        color: 'var(--off-white)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <span style={{ color: 'var(--lava-orange)' }}>+</span> {tel}
                    </a>
                  ))}
                </div>
              </div>

              <div
                style={{
                  border: '1px solid rgba(228,226,227,.18)',
                  padding: 32,
                  background: '#1c1c1c',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span className="maach-mono" style={{ color: 'var(--sand-grey)', display: 'block', marginBottom: 12 }}>
                  {t('cont.side.response_time')}
                </span>
                <div
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 56,
                    lineHeight: 1,
                    marginBottom: 8,
                    color: 'var(--lava-orange)',
                    letterSpacing: '-.02em',
                  }}
                >
                  &lt; 24 hrs
                </div>
                <span className="maach-mono" style={{ color: 'var(--sand-grey)' }}>
                  {t('cont.side.response_for')}
                </span>
                {/* Rotating seal — anchored bottom-right */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    bottom: -28,
                    right: -28,
                    width: 110,
                    height: 110,
                    borderRadius: '50%',
                    border: '1px solid rgba(228,226,227,.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'spin-slow 20s linear infinite',
                  }}
                >
                  <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', position: 'absolute' }}>
                    <defs>
                      <path id="circ-contacto" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
                    </defs>
                    <text fill="var(--sand-grey)" fontSize="11" letterSpacing="3" fontFamily="JetBrains Mono">
                      <textPath href="#circ-contacto">MAACH · VENTAS · 2026 · </textPath>
                    </text>
                  </svg>
                  <div style={{ width: 14, height: 14, background: 'var(--lava-orange)' }} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
