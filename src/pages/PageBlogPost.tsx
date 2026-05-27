import { asset } from '../lib/asset';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { IconArrow, IconChevronRight } from '../components/icons';
import { getBlog, otherBlogs, type Section } from '../data/blogs';

function renderSection(s: Section, i: number) {
  switch (s.type) {
    case 'h2':
      return (
        <h2
          key={i}
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 700,
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            letterSpacing: '-.015em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            margin: '64px 0 20px',
          }}
        >
          {s.text}
        </h2>
      );
    case 'h3':
      return (
        <h3
          key={i}
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: '-.01em',
            lineHeight: 1.15,
            textTransform: 'uppercase',
            margin: '40px 0 16px',
            color: 'var(--lava-orange)',
          }}
        >
          {s.text}
        </h3>
      );
    case 'p':
      return (
        <p key={i} style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg)', margin: '0 0 20px' }}>
          {s.text}
        </p>
      );
    case 'ul':
      return (
        <ul
          key={i}
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {s.items.map((it, j) => (
            <li
              key={j}
              style={{
                display: 'flex',
                gap: 20,
                padding: '14px 0',
                borderTop: '1px solid var(--line)',
                fontSize: 16,
                lineHeight: 1.55,
                color: 'var(--fg)',
              }}
            >
              <span className="maach-mono" style={{ color: 'var(--lava-orange)', flexShrink: 0, paddingTop: 3 }}>
                0{j + 1}
              </span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote
          key={i}
          style={{
            margin: '32px 0',
            padding: '28px 32px',
            borderLeft: '3px solid var(--lava-orange)',
            background: 'var(--soft)',
            fontFamily: 'var(--display)',
            fontWeight: 500,
            fontSize: 22,
            lineHeight: 1.3,
            color: 'var(--fg)',
            letterSpacing: '-.005em',
          }}
        >
          {s.text}
        </blockquote>
      );
  }
}

export default function PageBlogPost() {
  const { slug = '' } = useParams();
  const blog = getBlog(slug);

  if (!blog) {
    return <Navigate to="/investigacion" replace />;
  }

  const related = otherBlogs(blog.slug);

  return (
    <Layout screenLabel={'10 Investigación · ' + blog.title}>
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--soft)' }}>
        <div
          className="maach-container"
          style={{ padding: '14px 48px', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <Link to="/" className="maach-mono" style={{ color: 'var(--muted)' }}>
            Inicio
          </Link>
          <IconChevronRight size={10} style={{ color: 'var(--muted)' }} />
          <Link to="/investigacion" className="maach-mono" style={{ color: 'var(--muted)' }}>
            Investigación
          </Link>
          <IconChevronRight size={10} style={{ color: 'var(--muted)' }} />
          <span className="maach-mono" style={{ color: 'var(--lava-orange)' }}>
            {blog.category}
          </span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ padding: '80px 0 56px', borderBottom: '1px solid var(--line)', position: 'relative' }}>
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
          }}
        />
        <div className="maach-container" style={{ maxWidth: 1100 }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}
            className="maach-mono"
          >
            <span style={{ background: 'var(--jet-black)', color: 'var(--off-white)', padding: '4px 8px' }}>
              BLOG · {blog.number}
            </span>
            <span style={{ color: 'var(--lava-orange)' }}>{blog.category}</span>
            <span style={{ color: 'var(--muted)' }}>· Lectura {blog.readTime}</span>
          </div>
          <h1
            className="h-display"
            style={{
              fontSize: 'clamp(40px, 6vw, 88px)',
              lineHeight: 1.02,
              marginBottom: 32,
            }}
          >
            {blog.title}
          </h1>
          <p style={{ fontSize: 22, color: 'var(--muted)', lineHeight: 1.45, maxWidth: 880 }}>{blog.intro}</p>
        </div>
      </section>

      {/* COVER IMAGE */}
      <section style={{ padding: '48px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <div
            style={{
              aspectRatio: '21/9',
              overflow: 'hidden',
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              position: 'relative',
            }}
          >
            <img
              src={asset(blog.img)}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* BODY */}
      <section style={{ padding: '64px 0 96px', borderBottom: '1px solid var(--line)' }}>
        <div className="maach-container">
          <article style={{ maxWidth: 760, margin: '0 auto' }}>
            {blog.sections.map((s, i) => renderSection(s, i))}

            {/* Closing paragraph — emphasized */}
            <p
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1.35,
                color: 'var(--fg)',
                marginTop: 56,
                paddingTop: 32,
                borderTop: '2px solid var(--jet-black)',
                letterSpacing: '-.005em',
              }}
            >
              {blog.closing}
            </p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section
        className="invert"
        style={{
          background: 'var(--jet-black)',
          color: 'var(--off-white)',
          padding: '96px 0',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          className="tex-load-line"
          style={{ position: 'absolute', inset: 0, color: 'var(--off-white)', pointerEvents: 'none' }}
        />
        <div className="maach-container" style={{ position: 'relative', maxWidth: 1000 }}>
          <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 16 }}>
            Siguiente paso
          </span>
          <h2
            className="h-display"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--off-white)', marginBottom: 32, maxWidth: 820 }}
          >
            {blog.cta.copy}
          </h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to={blog.cta.primaryHref} className="btn-primary">
              {blog.cta.primaryLabel} <IconArrow size={14} />
            </Link>
            <Link to={blog.cta.secondaryHref} className="btn-ghost">
              {blog.cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section style={{ padding: '96px 0' }}>
        <div className="maach-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 40,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span className="maach-mono" style={{ color: 'var(--muted)', display: 'block', marginBottom: 12 }}>
                ¿Quieres profundizar?
              </span>
              <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
                Lee también.
              </h2>
            </div>
            <Link
              to="/investigacion"
              className="maach-mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                paddingBottom: 4,
                borderBottom: '1.5px solid var(--fg)',
              }}
            >
              Todos los artículos <IconArrow size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
            {related.map((b) => (
              <Link
                key={b.slug}
                to={`/investigacion/${b.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr',
                  gap: 24,
                  alignItems: 'center',
                  border: '1px solid var(--line)',
                  padding: 16,
                  transition: 'border-color .2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--jet-black)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
              >
                <div
                  style={{
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <img src={asset(b.img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <span className="maach-mono" style={{ color: 'var(--lava-orange)', display: 'block', marginBottom: 6 }}>
                    BLOG · {b.number} / {b.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--display)',
                      fontWeight: 600,
                      fontSize: 20,
                      lineHeight: 1.1,
                      letterSpacing: '-.01em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {b.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
