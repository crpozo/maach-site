import { useState } from 'react';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';

type FormState = {
  nombre: string;
  correo: string;
  empresa: string;
  mensaje: string;
};

export default function PageContacto() {
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
      <section style={{ padding: '112px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Orange L crosshair */}
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
        <div className="maach-container" style={{ position: 'relative', maxWidth: 1240 }}>
          <div style={{ marginBottom: 80 }}>
            <span
              className="maach-tag"
              style={{
                marginBottom: 24,
                display: 'inline-flex',
                borderColor: 'var(--lava-orange)',
                color: 'var(--lava-orange)',
              }}
            >
              MAACH · CONTACTO
            </span>
            <h1 className="h-display" style={{ fontSize: 'clamp(56px, 9vw, 168px)', marginBottom: 32 }}>
              Hablemos<br />
              <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>de tu proyecto.</span>
            </h1>
            <p style={{ fontSize: 20, color: 'var(--muted)', maxWidth: 640, lineHeight: 1.5 }}>
              Desarrollamos soluciones de mobiliario técnico a gran escala. Integramos nuestros sistemas directamente a
              tus planos arquitectónicos.
            </p>
          </div>

          {/* Body */}
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80 }}>
            {/* FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Mock: formulario enviado');
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 32,
                  paddingBottom: 16,
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <span
                  className="maach-mono"
                  style={{ background: 'var(--lava-orange)', color: 'var(--off-white)', padding: '4px 8px' }}
                >
                  FORMULARIO
                </span>
                <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                  · Respuesta &lt; 24 hrs
                </span>
              </div>

              <div
                className="grid-2"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}
              >
                <div>
                  <label htmlFor="nombre" className="maach-label">
                    Nombre y apellido *
                  </label>
                  <input
                    id="nombre"
                    required
                    type="text"
                    value={form.nombre}
                    onChange={(e) => set('nombre', e.target.value)}
                    className="maach-input"
                    placeholder="Roberto A. Salgado"
                  />
                </div>
                <div>
                  <label htmlFor="correo" className="maach-label">
                    Correo electrónico *
                  </label>
                  <input
                    id="correo"
                    required
                    type="email"
                    value={form.correo}
                    onChange={(e) => set('correo', e.target.value)}
                    className="maach-input"
                    placeholder="r.salgado@empresa.com"
                  />
                </div>
              </div>

              <div style={{ marginBottom: 32 }}>
                <label htmlFor="empresa" className="maach-label">
                  Empresa
                </label>
                <input
                  id="empresa"
                  type="text"
                  value={form.empresa}
                  onChange={(e) => set('empresa', e.target.value)}
                  className="maach-input"
                  placeholder="Estudio Alba"
                />
              </div>

              <div style={{ marginBottom: 40 }}>
                <label htmlFor="mensaje" className="maach-label">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  required
                  rows={5}
                  value={form.mensaje}
                  onChange={(e) => set('mensaje', e.target.value)}
                  className="maach-input"
                  style={{ resize: 'vertical' }}
                  placeholder="Cuéntanos sobre tu proyecto: volumen estimado, plazos, sede, m² aprox..."
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ width: 16, height: 16, accentColor: 'var(--lava-orange)' }}
                  />
                  <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                    Acepto el aviso de privacidad
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'space-between', padding: '20px 28px' }}
              >
                Enviar mensaje <IconArrow size={14} />
              </button>
            </form>

            {/* SIDE INFO */}
            <aside
              className="contact-aside"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 40,
                paddingLeft: 48,
                borderLeft: '1px solid var(--line)',
              }}
            >
              <div>
                <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
                  Información de contacto
                </span>
                <a
                  href="mailto:ventas@maach.ec"
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 600,
                    fontSize: 28,
                    letterSpacing: '-.01em',
                    textTransform: 'lowercase',
                    color: 'var(--fg)',
                    display: 'inline-block',
                    borderBottom: '1.5px solid var(--lava-orange)',
                    paddingBottom: 4,
                  }}
                >
                  ventas@maach.ec
                </a>
              </div>

              <div style={{ paddingTop: 32, borderTop: '1px solid var(--line)' }}>
                <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 16 }}>
                  Teléfonos
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['0997 200 455', '0979 514 286', '0999 441 139'].map((tel) => (
                    <a
                      key={tel}
                      href={`tel:${tel.replace(/\s/g, '')}`}
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 18,
                        fontWeight: 500,
                        letterSpacing: '.04em',
                        color: 'var(--fg)',
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

              <div style={{ paddingTop: 32, borderTop: '1px solid var(--line)' }}>
                <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
                  Tiempo de respuesta
                </span>
                <div
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 48,
                    lineHeight: 1,
                    marginBottom: 8,
                    color: 'var(--lava-orange)',
                    letterSpacing: '-.02em',
                  }}
                >
                  &lt; 24 hrs
                </div>
                <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                  Para solicitudes técnicas
                </span>
              </div>

              {/* Rotating seal */}
              <div
                style={{
                  marginTop: 8,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  border: '1px solid var(--fg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  animation: 'spin-slow 20s linear infinite',
                }}
              >
                <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', position: 'absolute' }}>
                  <defs>
                    <path id="circ-contacto" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
                  </defs>
                  <text fill="var(--fg)" fontSize="11" letterSpacing="3" fontFamily="JetBrains Mono">
                    <textPath href="#circ-contacto">MAACH · VENTAS · PROYECTOS · 2026 · </textPath>
                  </text>
                </svg>
                <div style={{ width: 16, height: 16, background: 'var(--lava-orange)' }} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
