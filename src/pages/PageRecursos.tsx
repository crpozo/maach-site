import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
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

  return (
    <Layout screenLabel="11 Recursos">
      <section style={{ padding: '112px 0 64px', borderBottom: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
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
        <div className="maach-container" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }} className="maach-mono">
            <Link to="/" style={{ color: 'var(--muted)' }}>
              Inicio
            </Link>
            <IconChevronRight size={10} style={{ color: 'var(--muted)' }} />
            <span style={{ color: 'var(--lava-orange)' }}>Recursos de diseño</span>
            <IconChevronRight size={10} style={{ color: 'var(--muted)' }} />
            <span style={{ color: 'var(--muted)' }}>Biblioteca</span>
          </div>
          <h1 className="h-display" style={{ fontSize: 'clamp(56px, 8vw, 128px)', marginBottom: 16 }}>
            Biblioteca <span className="h-italic" style={{ color: 'var(--lava-orange)' }}>de Documentos.</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 640, lineHeight: 1.55 }}>
            Descarga folletos, especificaciones técnicas, fichas de producto, planos CAD y modelos 3D / BIM.
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 0 128px', background: 'var(--soft)', minHeight: '70vh' }}>
        <div className="maach-container">
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 32 }}>
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'var(--off-white)', border: '1px solid var(--line)', padding: 24 }}>
                <span className="maach-mono" style={{ display: 'block', marginBottom: 12 }}>
                  Tipo de documento
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
                  Documentos & guías
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
                  APLICAR FILTRO <IconChevronRight size={10} />
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
                  <span className="maach-mono">Buscar</span>
                  <button className="maach-mono" style={{ color: 'var(--muted)' }}>
                    Limpiar
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
                    placeholder="buscar..."
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
                  <span className="maach-mono">Refinar resultados</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                    className="maach-mono"
                  >
                    Tipo de documento <IconChevronDown size={11} />
                  </button>
                  {[
                    { l: 'Spec Guides', n: '34', checked: false },
                    { l: 'Brochures', n: '481', checked: true },
                    { l: 'Modelos 3D / BIM', n: '208', checked: false },
                    { l: 'Planos CAD', n: '194', checked: false },
                    { l: 'Fichas técnicas', n: '62', checked: true },
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
                        {f.l} ({f.n})
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
                    + Mostrar más
                  </button>
                </div>
              </div>
            </aside>

            <div style={{ background: 'var(--off-white)', border: '1px solid var(--line)' }}>
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
                  Tipo
                </div>
                <div style={{ flex: 1 }} className="maach-mono">
                  Nombre del documento
                </div>
                <div style={{ width: 200, flexShrink: 0 }} className="maach-mono">
                  Producto
                </div>
                <div style={{ width: 70, flexShrink: 0 }} className="maach-mono">
                  Tamaño
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
                  SELECCIONAR{' '}
                  <span
                    style={{ width: 8, height: 8, borderRadius: '50%', border: '1px solid var(--muted)' }}
                  />
                </button>
              </div>

              <div>
                {documents.map((d) => {
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
                        {d.type}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontFamily: 'var(--body)', fontWeight: 500, fontSize: 15, marginBottom: 4 }}>
                          {d.name}
                        </h4>
                        <span className="maach-mono" style={{ color: 'var(--lava-orange)' }}>
                          .{d.ext}
                        </span>
                      </div>
                      <div style={{ width: 200, flexShrink: 0, fontSize: 13, color: 'var(--muted)' }}>{d.product}</div>
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
                        <button style={btnIcon} title="Descargar">
                          <IconDownload size={14} />
                        </button>
                        <button style={btnIcon} title="Guardar">
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
                          title="Seleccionar"
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
                  {selected.size} de {documents.length} seleccionados
                </span>
                <button className="btn-primary" style={{ padding: '12px 20px' }}>
                  <IconDownload size={14} /> Descargar selección
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
