import { useState } from 'react';
import { Layout } from '../components/Layout';
import { IconArrow } from '../components/icons';

type FormState = {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  tipo: string;
  proyecto: string;
};

export default function PageContacto() {
  const [form, setForm] = useState<FormState>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    tipo: '',
    proyecto: '',
  });
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <Layout screenLabel="13 Contacto">
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
              style={{ marginBottom: 24, display: 'inline-flex', borderColor: 'var(--lava-orange)', color: 'var(--lava-orange)' }}
            >
              MAACH · CONTACTO
            </span>
            <h1 className="h-display" style={{ fontSize: 'clamp(56px, 9vw, 168px)', marginBottom: 32 }}>
              Ingeniería<br />
              <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>de proyectos.</span>
            </h1>
            <p style={{ fontSize: 20, color: 'var(--muted)', maxWidth: 640, lineHeight: 1.5 }}>
              Desarrollamos soluciones de mobiliario técnico a gran escala. Integramos nuestros sistemas directamente a
              tus planos arquitectónicos.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80 }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Mock: formulario enviado');
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 16,
                  marginBottom: 48,
                  paddingBottom: 24,
                  borderBottom: '1px solid var(--line)',
                }}
              >
                {[
                  { n: '01', l: 'Datos', active: true },
                  { n: '02', l: 'Proyecto', active: false },
                  { n: '03', l: 'Confirmación', active: false },
                ].map((s) => (
                  <div
                    key={s.n}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: s.active ? 'var(--lava-orange)' : 'var(--muted)',
                    }}
                  >
                    <span
                      className="maach-mono"
                      style={{
                        background: s.active ? 'var(--lava-orange)' : 'transparent',
                        color: s.active ? 'var(--off-white)' : 'var(--muted)',
                        border: '1px solid currentColor',
                        padding: '3px 7px',
                      }}
                    >
                      {s.n}
                    </span>
                    <span className="maach-mono">{s.l}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
                <div>
                  <label htmlFor="nombre" className="maach-label">
                    Nombre completo *
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
                  <label htmlFor="empresa" className="maach-label">
                    Empresa / Estudio *
                  </label>
                  <input
                    id="empresa"
                    required
                    type="text"
                    value={form.empresa}
                    onChange={(e) => set('empresa', e.target.value)}
                    className="maach-input"
                    placeholder="Estudio Alba"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="maach-label">
                    Correo electrónico *
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    className="maach-input"
                    placeholder="r.salgado@empresa.com"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="maach-label">
                    Teléfono (opcional)
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    value={form.telefono}
                    onChange={(e) => set('telefono', e.target.value)}
                    className="maach-input"
                    placeholder="+52 55 1234 5678"
                  />
                </div>
              </div>

              <div style={{ marginBottom: 32 }}>
                <span className="maach-label">Tipo de proyecto *</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  {[
                    { v: 'corporativo', l: 'Corporativo' },
                    { v: 'operativo', l: 'Operativo' },
                    { v: 'directivo', l: 'Directivo' },
                    { v: 'boutique', l: 'Boutique / Otro' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.v}
                      onClick={() => set('tipo', t.v)}
                      style={{
                        padding: '14px 16px',
                        border: '1.5px solid ' + (form.tipo === t.v ? 'var(--lava-orange)' : 'var(--line)'),
                        background: form.tipo === t.v ? 'rgba(243,74,35,.06)' : 'transparent',
                        color: form.tipo === t.v ? 'var(--lava-orange)' : 'var(--fg)',
                        fontFamily: 'var(--mono)',
                        fontSize: 11,
                        letterSpacing: '.1em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        textAlign: 'left',
                        transition: 'all .2s',
                      }}
                    >
                      {t.l}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 40 }}>
                <label htmlFor="proyecto" className="maach-label">
                  Detalles del proyecto *
                </label>
                <textarea
                  id="proyecto"
                  rows={5}
                  value={form.proyecto}
                  onChange={(e) => set('proyecto', e.target.value)}
                  className="maach-input"
                  style={{ resize: 'vertical' }}
                  placeholder="Volumen estimado, requerimientos técnicos, plazos, sede, m² aprox..."
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
                Enviar especificaciones <IconArrow size={14} />
              </button>
            </form>

            <aside
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 40,
                paddingLeft: 48,
                borderLeft: '1px solid var(--line)',
              }}
            >
              <div>
                <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
                  Sede central
                </span>
                <div style={{ fontSize: 16, lineHeight: 1.6 }}>
                  Av. Industrial 450<br />
                  Parque Tecnológico, C.P. 10293<br />
                  Ciudad de México, CDMX
                </div>
              </div>

              <div>
                <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
                  Contacto directo
                </span>
                <div style={{ fontSize: 16, lineHeight: 1.7 }}>
                  T. +52 (55) 1234-5678<br />
                  E. proyectos@maach.com.mx<br />
                  E. info@maach.com.mx
                </div>
              </div>

              <div style={{ paddingTop: 32, borderTop: '1px solid var(--line)' }}>
                <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
                  Horario operativo
                </span>
                <div style={{ fontSize: 16, lineHeight: 1.6 }}>
                  Lun–Vie · 08:00 a 18:00<br />
                  Sáb · 09:00 a 14:00<br />
                  <span style={{ color: 'var(--muted)' }}>(GMT-6)</span>
                </div>
              </div>

              <div style={{ paddingTop: 32, borderTop: '1px solid var(--line)' }}>
                <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
                  Tiempo de respuesta
                </span>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 48, lineHeight: 1, marginBottom: 8 }}>
                  &lt; 24 hrs
                </div>
                <span className="maach-mono" style={{ color: 'var(--muted)' }}>
                  Para solicitudes técnicas
                </span>
              </div>

              <div
                style={{
                  marginTop: 24,
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
                    <textPath href="#circ-contacto">MAACH · INGENIERÍA · PROYECTOS · 2026 · </textPath>
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
