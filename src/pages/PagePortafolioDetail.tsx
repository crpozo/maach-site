import { useState, useEffect } from 'react';
import { asset } from '../lib/asset';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow, IconClose, IconChevronRight, IconPlus } from '../components/icons';

type ProjectContent = {
  desafio: string[];
  propuesta: { intro: string; bullets: string[] };
  resultado: string[];
};

type ProjectData = {
  title: string;
  status?: 'paused';
  hero?: string;
  gallery?: [string, string, string];
  /** Full photo set — when present, renders the complete gallery grid. */
  photos?: string[];
  content?: ProjectContent;
};

const DATA: Record<string, ProjectData> = {
  '01': {
    title: 'CPN',
    hero: asset('proyectos/cpn/01.webp'),
    gallery: [
      asset('proyectos/cpn/02.webp'),
      asset('proyectos/cpn/03.webp'),
      asset('proyectos/cpn/05.webp'),
    ],
    content: {
      desafio: [
        'Intervenir integralmente 10 pisos de la institución, transformando espacios tradicionales en entornos de trabajo más funcionales, eficientes y alineados a nuevas dinámicas laborales.',
        'El reto estaba en desarrollar soluciones que respondan a distintas necesidades dentro de un mismo proyecto, manteniendo coherencia en diseño, durabilidad y uso en cada área.',
      ],
      propuesta: {
        intro:
          'Desarrollo, fabricación e implementación de soluciones de mobiliario adaptadas a las necesidades específicas de cada espacio, garantizando funcionalidad y consistencia en toda la intervención.',
        bullets: [
          'Diseño de mobiliario a medida, incluyendo estaciones de trabajo, áreas colaborativas, cafeterías, sillonería y mesas de reunión.',
          'Adaptación de soluciones a distintos tipos de uso, priorizando comodidad, durabilidad y eficiencia en el trabajo diario.',
          'Integración de espacios colaborativos que favorecen la interacción entre equipos y optimizan la dinámica interna.',
        ],
      },
      resultado: [
        'Un entorno de trabajo completamente renovado, donde los espacios responden de forma más eficiente a las necesidades operativas de la institución.',
        'El proyecto permitió mejorar la organización interna, facilitar la comunicación entre áreas y generar una experiencia de uso más funcional y alineada a las nuevas dinámicas laborales.',
      ],
    },
  },
  // '02' Palladium está oculto de toda la web por pedido del cliente.
  '03': {
    title: 'Wesco',
    hero: asset('proyectos/wesco/01.webp'),
    gallery: [
      asset('proyectos/wesco/02.webp'),
      asset('proyectos/wesco/03.webp'),
      asset('proyectos/wesco/04.webp'),
    ],
    // Selección editorial: 8 fotos que cubren todo el alcance del proyecto
    // (recepción, counter, área operativa, sala de reunión, colaborativo,
    // auditorio y comedor) en vez de las 39 del set completo.
    photos: [
      asset('proyectos/wesco/02.webp'),
      asset('proyectos/wesco/01.webp'),
      asset('proyectos/wesco/33.webp'),
      asset('proyectos/wesco/10.webp'),
      asset('proyectos/wesco/03.webp'),
      asset('proyectos/wesco/12.webp'),
      asset('proyectos/wesco/27.webp'),
      asset('proyectos/wesco/37.webp'),
    ],
    content: {
      desafio: [
        'Materializar fielmente la propuesta arquitectónica de un edificio administrativo, asegurando que cada decisión de mobiliario responda tanto a criterios estéticos como funcionales.',
        'Un proyecto de alta exigencia que requería coherencia total entre diseño, fabricación e instalación, en un margen de ejecución corto.',
      ],
      propuesta: {
        intro:
          'Desarrollo integral de mobiliario combinando línea estándar y soluciones a medida, adaptadas a los requerimientos específicos del proyecto.',
        bullets: [
          'Fabricación multimaterial (metal y madera) para lograr un balance preciso entre durabilidad, estética y desempeño en el uso diario.',
          'Trabajo colaborativo con el estudio de arquitectura para interpretar y materializar fielmente cada detalle del diseño conceptual.',
          'Control integral del proceso, desde la fabricación hasta la instalación, garantizando consistencia en calidad, acabados y tiempos de entrega.',
        ],
      },
      resultado: [
        'Un espacio corporativo donde la visión arquitectónica se traduce en una ejecución precisa, coherente y funcional.',
        'El proyecto no solo cumplió con las especificaciones técnicas, sino que logró materializar fielmente la intención del diseño, reflejando un alto nivel de detalle, calidad y control en cada elemento implementado.',
      ],
    },
  },
  '04': {
    title: 'Maresa',
    content: {
      desafio: [
        'Desarrollar el mobiliario para múltiples concesionarios de la corporación, asegurando que cada espacio refleje con precisión la identidad de la marca automotriz que representa.',
        'El reto estaba en interpretar distintos manuales de marca internacionales y trasladarlos a una ejecución coherente, funcional y consistente en cada punto intervenido.',
      ],
      propuesta: {
        intro:
          'Desarrollo e implementación de soluciones de mobiliario alineadas a los lineamientos de cada marca, garantizando coherencia estética y funcional en todos los concesionarios.',
        bullets: [
          'Interpretación y aplicación de manuales de marca internacionales, adaptándolos a condiciones reales de construcción sin perder su esencia.',
          'Fabricación e instalación de mobiliario en distintos concesionarios, asegurando consistencia en diseño, calidad y acabados.',
          'Trabajo colaborativo con el cliente para aterrizar conceptos globales en soluciones ejecutables y funcionales en el contexto local.',
        ],
      },
      resultado: [
        'Concesionarios que comunican de forma clara la identidad de cada marca, manteniendo coherencia y nivel en todos los espacios intervenidos.',
        'El proyecto permitió trasladar estándares internacionales al entorno local con precisión, logrando consistencia en diseño, calidad y ejecución en cada punto de la red.',
      ],
    },
  },
  '05': {
    title: 'LDU',
    content: {
      desafio: [
        'Equipar las oficinas administrativas del Centro de Alto Rendimiento con espacios que respondan a las necesidades actuales de gestión y operación.',
        'El reto estaba en actualizar el entorno de trabajo, proyectando una imagen más moderna y profesional, sin perder funcionalidad ni eficiencia en el uso diario.',
      ],
      propuesta: {
        intro:
          'Desarrollo de soluciones de mobiliario orientadas a optimizar el uso del espacio y mejorar la dinámica de trabajo en las áreas administrativas.',
        bullets: [
          'Diseño de ambientes funcionales y eficientes, alineados a nuevas dinámicas laborales.',
          'Implementación de soluciones que facilitan la organización y el uso práctico de cada espacio.',
          'Integración de configuraciones que favorecen la comunicación entre áreas y una operación más fluida.',
        ],
      },
      resultado: [
        'Un entorno administrativo actualizado, donde el diseño y la funcionalidad trabajan en conjunto para mejorar la experiencia de uso.',
        'El proyecto permitió optimizar la organización interna y fortalecer la dinámica de trabajo, generando espacios más eficientes, cómodos y alineados a las necesidades actuales de la institución.',
      ],
    },
  },
  '06': {
    title: 'CAME',
    hero: asset('proyectos/came/01.webp'),
    // Selección de 8 fotos (mismo criterio que Wesco): recepción como pieza
    // destacada, luego reunión, privadas y operativas. Se dejan fuera 08 y 10
    // por repetir encuadre con 09 y 03. El copy del proyecto aún no está
    // entregado, así que la página publica hero + galería.
    photos: [
      asset('proyectos/came/01.webp'),
      asset('proyectos/came/06.webp'),
      asset('proyectos/came/05.webp'),
      asset('proyectos/came/04.webp'),
      asset('proyectos/came/02.webp'),
      asset('proyectos/came/03.webp'),
      asset('proyectos/came/07.webp'),
      asset('proyectos/came/09.webp'),
    ],
  },
};

function ProjectHero({ p }: { p: ProjectData; id?: string }) {
  const paused = p.status === 'paused';

  if (p.hero) {
    return (
      <section
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 80px)',
          overflow: 'hidden',
          borderBottom: '1px solid var(--line)',
          background: 'var(--jet-black)',
        }}
      >
        <img
          src={p.hero}
          alt={p.title}
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
              'linear-gradient(180deg, rgba(22,22,22,.55) 0%, rgba(22,22,22,.15) 30%, rgba(22,22,22,.55) 70%, rgba(22,22,22,.9) 100%)',
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
          }}
        />
        {/* Crosshairs */}
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
          }}
        />

        <div
          className="maach-container"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: 80,
            color: 'var(--off-white)',
          }}
        >
          <h1
            className="h-display"
            style={{
              fontSize: 'clamp(72px, 12vw, 90px)',
              color: 'var(--off-white)',
              lineHeight: 0.9,
              margin: 0,
              letterSpacing: '-.02em',
            }}
          >
            {p.title}
          </h1>
        </div>
      </section>
    );
  }

  // Placeholder hero — no photo yet
  return (
    <section
      className="invert"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--jet-black)',
        color: 'var(--off-white)',
        overflow: 'hidden',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        aria-hidden
        className="tex-forged-grid"
        style={{ position: 'absolute', inset: 0, color: 'var(--off-white)', opacity: 0.06 }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 6,
          background: paused ? 'var(--sand-grey)' : 'var(--lava-orange)',
          opacity: paused ? 0.7 : 1,
        }}
      />
      <div className="maach-container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          {paused ? (
            <span
              className="maach-mono"
              style={{ background: 'var(--sand-grey)', color: 'var(--fg)', padding: '5px 10px' }}
            >
              PAUSADO
            </span>
          ) : (
            <span
              className="maach-mono"
              style={{
                background: 'transparent',
                color: 'var(--off-white)',
                border: '1px solid rgba(228,226,227,.4)',
                padding: '5px 10px',
              }}
            >
              FOTO PRÓXIMAMENTE
            </span>
          )}
        </div>
        <h1
          className="h-display"
          style={{
            fontSize: 'clamp(72px, 12vw, 90px)',
            color: 'var(--off-white)',
            lineHeight: 0.9,
            margin: 0,
            letterSpacing: '-.02em',
          }}
        >
          {p.title}
        </h1>
      </div>
    </section>
  );
}

function ContentSection({
  eyebrow,
  title,
  children,
  invert = false,
}: {
  num?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <section
      style={{
        background: invert ? 'var(--jet-black)' : 'transparent',
        color: invert ? 'var(--off-white)' : 'inherit',
        padding: '120px 0',
        borderBottom: invert ? '1px solid rgba(228,226,227,.18)' : '1px solid var(--line)',
      }}
      className={invert ? 'invert' : undefined}
    >
      <div className="maach-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: 96,
            alignItems: 'flex-start',
          }}
        >
          <div>
            <span
              className="maach-mono"
              style={{
                color: 'var(--lava-orange)',
                display: 'block',
                marginBottom: 16,
                letterSpacing: '.1em',
              }}
            >
              {eyebrow}
            </span>
            <h2
              className="h-display"
              style={{
                fontSize: 'clamp(48px, 6vw, 88px)',
                lineHeight: 0.95,
                margin: 0,
                color: invert ? 'var(--off-white)' : 'inherit',
              }}
            >
              {title}
            </h2>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Las tres secciones editoriales del proyecto. Sólo se renderizan cuando el
 *  proyecto tiene copy; los que sólo tienen fotos publican hero + galería. */
function ProjectStory({ desafio, propuesta, resultado }: ProjectContent) {
  return (
    <>
      {/* EL DESAFÍO */}
      <ContentSection num="01" eyebrow="El Desafío" title="El Desafío">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p style={{ fontSize: 20, lineHeight: 1.55, margin: 0 }}>{desafio[0]}</p>
          {desafio[1] ? (
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--muted)', margin: 0 }}>
              {desafio[1]}
            </p>
          ) : null}
        </div>
      </ContentSection>

      {/* PROPUESTA DE VALOR */}
      <ContentSection num="02" eyebrow="Propuesta de Valor" title="Propuesta de Valor" invert>
        <p
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 500,
            fontSize: 'clamp(20px, 2vw, 28px)',
            lineHeight: 1.3,
            color: 'var(--off-white)',
            margin: 0,
            marginBottom: 48,
            letterSpacing: '-.005em',
          }}
        >
          {propuesta.intro}
        </p>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {propuesta.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                gap: 24,
                padding: '24px 0',
                borderTop: '1px solid rgba(228,226,227,.18)',
                alignItems: 'flex-start',
              }}
            >
              <span
                className="h-display"
                style={{
                  fontSize: 28,
                  color: 'var(--lava-orange)',
                  fontWeight: 700,
                  letterSpacing: '-.02em',
                  lineHeight: 1,
                  paddingTop: 4,
                }}
              >
                0{i + 1}
              </span>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--sand-grey)', margin: 0 }}>{b}</p>
            </li>
          ))}
        </ul>
      </ContentSection>

      {/* EL RESULTADO */}
      <ContentSection num="03" eyebrow="El Resultado" title="El Resultado">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p style={{ fontSize: 20, lineHeight: 1.55, margin: 0 }}>{resultado[0]}</p>
          {resultado[1] ? (
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--muted)', margin: 0 }}>
              {resultado[1]}
            </p>
          ) : null}
        </div>
      </ContentSection>
    </>
  );
}

export default function PagePortafolioDetail() {
  const { id = '01' } = useParams();
  const p = DATA[id] || DATA['01'];
  const paused = p.status === 'paused';

  // Lightbox for the elaborate photo gallery
  const photos = p.photos;
  const [lightbox, setLightbox] = useState<number | null>(null);
  useEffect(() => {
    if (lightbox === null || !photos) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      else if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % photos.length));
      else if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, photos]);

  // Coming-soon screen only when there is nothing to show: sin texto y sin fotos.
  // Un proyecto con fotos se publica aunque su copy editorial aún no exista.
  if (!p.content && !p.photos) {
    return (
      <Layout screenLabel={'09 Proyecto · ' + p.title}>
        <ProjectHero p={p} id={id} />
        <section style={{ padding: '120px 0', borderBottom: '1px solid var(--line)' }}>
          <div className="maach-container" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: 20, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 40 }}>
              {paused
                ? 'Este proyecto se encuentra actualmente pausado. Más información estará disponible próximamente.'
                : 'La documentación de este proyecto estará disponible próximamente.'}
            </p>
            <Link
              to="/portafolio"
              className="maach-mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                borderBottom: '1.5px solid var(--lava-orange)',
                paddingBottom: 4,
              }}
            >
              <IconArrow size={14} rotate={180} /> Volver al portafolio
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const content = p.content;

  return (
    <Layout screenLabel={'09 Proyecto · ' + p.title}>
      <ProjectHero p={p} id={id} />

      {content ? (
        <ProjectStory desafio={content.desafio} propuesta={content.propuesta} resultado={content.resultado} />
      ) : null}

      {/* GALLERY — full grid when a complete photo set exists, else the 3-up layout */}
      {p.photos ? (
        <section style={{ padding: '120px 0', borderBottom: '1px solid var(--line)' }}>
          <div className="maach-container">
            <span
              className="maach-mono"
              style={{ color: 'var(--muted)', display: 'block', marginBottom: 24, letterSpacing: '.1em' }}
            >
              GALERÍA
            </span>
            <div className="maach-mosaic">
              {p.photos.map((src, i) => {
                const variant = i % 7 === 0 ? ' feat' : i % 7 === 4 ? ' tall' : '';
                return (
                  <button
                    key={i}
                    type="button"
                    className={'maach-tile' + variant}
                    onClick={() => setLightbox(i)}
                    aria-label={`Ampliar foto ${i + 1} de ${p.photos!.length}`}
                  >
                    <img src={src} alt="" loading="lazy" />
                    <span className="maach-tile-idx maach-mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="maach-tile-zoom" aria-hidden>
                      <IconPlus size={16} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : p.gallery ? (
        <section style={{ padding: '120px 0', borderBottom: '1px solid var(--line)' }}>
          <div className="maach-container">
            <span
              className="maach-mono"
              style={{ color: 'var(--muted)', display: 'block', marginBottom: 24, letterSpacing: '.1em' }}
            >
              GALERÍA
            </span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: 12,
                height: 'min(56vh, 560px)',
                width: '100%',
              }}
            >
              <div
                style={{
                  gridRow: '1 / span 2',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                }}
              >
                <img
                  src={p.gallery[0]}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                />
              </div>
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                }}
              >
                <img
                  src={p.gallery[1]}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                />
              </div>
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                }}
              >
                <img
                  src={p.gallery[2]}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Back link */}
      <section style={{ padding: '80px 0' }}>
        <div className="maach-container" style={{ textAlign: 'center' }}>
          <Link
            to="/portafolio"
            className="maach-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              borderBottom: '1.5px solid var(--lava-orange)',
              paddingBottom: 4,
            }}
          >
            <IconArrow size={14} rotate={180} /> Volver al portafolio
          </Link>
        </div>
      </section>

      {/* LIGHTBOX — fullscreen photo viewer with prev/next */}
      {photos && lightbox !== null ? (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(12,12,12,.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(16px, 5vw, 64px)',
          }}
        >
          {/* Counter */}
          <span
            className="maach-mono"
            style={{ position: 'absolute', top: 28, left: 28, color: 'var(--off-white)', letterSpacing: '.1em' }}
          >
            {String(lightbox + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
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
          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
            }}
            aria-label="Anterior"
            style={{
              position: 'absolute',
              left: 'clamp(8px, 2vw, 24px)',
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
            src={photos[lightbox]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '86vh', objectFit: 'contain', cursor: 'default' }}
          />
          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i + 1) % photos.length));
            }}
            aria-label="Siguiente"
            style={{
              position: 'absolute',
              right: 'clamp(8px, 2vw, 24px)',
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
        </div>
      ) : null}
    </Layout>
  );
}
