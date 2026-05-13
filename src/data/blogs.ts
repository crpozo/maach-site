// MAACH research / blog content. Used by PageInvestigacion (list) and
// PageBlogPost (detail). The Section discriminated union renders to
// h2 / h3 / p / ul / pull-quote inside PageBlogPost.

export type Section =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string };

export type Blog = {
  slug: string;
  number: string;
  category: string;
  title: string;
  intro: string;
  sections: Section[];
  closing: string;
  cta: {
    copy: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  img: string; // public/assets filename
  readTime: string;
};

export const BLOGS: Blog[] = [
  {
    slug: 'como-elegir-mobiliario-productividad',
    number: '01',
    category: 'Productividad',
    title: 'Cómo elegir el mobiliario de oficina para mejorar la productividad',
    intro:
      'El mobiliario de oficina no es un detalle decorativo. Es una decisión estratégica que define cómo trabaja un equipo, cómo se siente y hasta dónde puede llegar su rendimiento. Elegirlo bien no solo mejora el espacio: cambia la forma en que las personas trabajan cada día.',
    sections: [
      { type: 'h2', text: 'Ergonomía: la base del rendimiento sostenido' },
      {
        type: 'p',
        text: 'Un espacio mal diseñado se traduce en fatiga, incomodidad y menor concentración. Sillas con soporte lumbar, ajustes de altura y materiales adecuados no son un extra: son la base para sostener jornadas de trabajo exigentes.',
      },
      {
        type: 'quote',
        text: 'Según la Organización Mundial de la Salud (OMS) y la Organización Internacional del Trabajo (OIT), una mala configuración del puesto de trabajo está directamente relacionada con fatiga física, molestias musculoesqueléticas y menor rendimiento laboral.',
      },
      {
        type: 'p',
        text: 'Cuando la ergonomía está bien resuelta, la productividad deja de depender del esfuerzo y pasa a depender del entorno.',
      },

      { type: 'h2', text: 'Funcionalidad y uso del espacio' },
      {
        type: 'p',
        text: 'No es lo mismo diseñar un espacio para un equipo creativo que para un departamento administrativo. Cada dinámica de trabajo exige soluciones distintas.',
      },
      { type: 'h3', text: 'Tipos de espacio y sus necesidades' },
      {
        type: 'ul',
        items: [
          'Espacios colaborativos: requieren flexibilidad y configuraciones adaptables.',
          'Áreas operativas: necesitan orden, eficiencia y acceso rápido a herramientas.',
          'Zonas individuales: exigen condiciones que favorezcan la concentración.',
        ],
      },
      { type: 'p', text: 'El mobiliario debe adaptarse al uso real del espacio, no al revés.' },

      { type: 'h2', text: 'Diseño y coherencia visual' },
      {
        type: 'p',
        text: 'Una oficina bien diseñada transmite profesionalismo: hacia los empleados y hacia los clientes. Los colores, materiales y estilos deben alinearse con la identidad de la empresa.',
      },
      {
        type: 'p',
        text: 'Los tonos neutros generan sensación de elegancia y orden. Los colores más vivos pueden estimular la creatividad en entornos donde eso es una ventaja competitiva.',
      },
      { type: 'p', text: 'No se trata de que se vea bien. Se trata de que sea coherente.' },

      { type: 'h2', text: 'Durabilidad y calidad como inversión' },
      {
        type: 'p',
        text: 'El precio importa, pero no debería ser el único criterio de decisión. El mobiliario de calidad tiene mayor vida útil y responde mejor al uso diario.',
      },
      {
        type: 'p',
        text: 'Materiales resistentes, buenos acabados y fabricación sólida reducen la necesidad de reemplazos y mejoran la experiencia de uso a largo plazo. A veces, lo más barato termina siendo lo más caro.',
      },

      { type: 'h2', text: 'Tecnología integrada en el puesto de trabajo' },
      {
        type: 'p',
        text: 'Hoy el mobiliario también debe responder a las necesidades tecnológicas del trabajo moderno. Escritorios con gestión de cables, estaciones con puertos de conexión y soluciones integradas permiten mantener un espacio ordenado y funcional.',
      },
      {
        type: 'p',
        text: 'Menos desorden visual significa menos distracciones y más eficiencia en el día a día.',
      },
    ],
    closing:
      'Elegir el mobiliario adecuado no es solo una decisión estética. Es una inversión que impacta la salud de los equipos, la productividad y la forma en que opera una empresa. Cuando diseño, ergonomía y funcionalidad trabajan juntos, el espacio deja de ser un contenedor y se convierte en una herramienta de trabajo.',
    cta: {
      copy: 'Diseñamos soluciones que mejoran la ergonomía, el orden y el rendimiento de cada equipo.',
      primaryLabel: 'Ver mobiliario para espacios de trabajo',
      primaryHref: '/productos',
      secondaryLabel: 'Solicita asesoría personalizada',
      secondaryHref: '/contacto',
    },
    img: 'biblioteca-3.webp',
    readTime: '06 min',
  },

  {
    slug: 'beneficios-mobiliario-alta-calidad',
    number: '02',
    category: 'Inversión',
    title: 'Beneficios de invertir en mobiliario de oficina de alta calidad',
    intro:
      'Muchas empresas tratan el mobiliario de oficina como un gasto. Es un error estratégico. Los muebles definen cómo trabajan las personas, cómo se sienten y cómo perciben su entorno. Elegir mobiliario de alta calidad genera beneficios concretos, tanto a corto como a largo plazo.',
    sections: [
      { type: 'h2', text: 'Mayor durabilidad: menos reemplazos, menos costos' },
      {
        type: 'p',
        text: 'Los materiales resistentes y los procesos de fabricación superiores garantizan que el mobiliario soporte el uso diario sin deteriorarse rápidamente. Eso se traduce directamente en menos reemplazos, menos interrupciones y un ahorro real a lo largo del tiempo.',
      },
      { type: 'p', text: 'El mobiliario barato tiene un costo visible al principio. El costo real aparece después.' },

      { type: 'h2', text: 'Salud laboral: menos ausencias, más rendimiento' },
      {
        type: 'p',
        text: 'El mobiliario ergonómico previene los problemas de salud más comunes en entornos de trabajo: dolores musculares, fatiga y lesiones por postura incorrecta. Una silla adecuada y un escritorio bien diseñado mejoran la postura y reducen el riesgo de lesiones a largo plazo.',
      },
      {
        type: 'quote',
        text: 'Según la Organización Internacional del Trabajo (OIT), los trastornos musculoesqueléticos son una de las principales causas de ausentismo laboral a nivel mundial.',
      },
      { type: 'p', text: 'Menos ausencias significa equipos más estables y operaciones más continuas.' },

      { type: 'h2', text: 'Productividad: un entorno que trabaja contigo' },
      {
        type: 'p',
        text: 'Un espacio cómodo y bien organizado elimina fricciones. Los empleados se concentran mejor, pierden menos tiempo y trabajan con mayor eficiencia cuando el entorno está diseñado para ello.',
      },
      {
        type: 'p',
        text: 'El mobiliario de calidad no solo facilita el trabajo: reduce las distracciones que lo interrumpen.',
      },

      { type: 'h2', text: 'Imagen profesional: lo que el espacio dice de la empresa' },
      {
        type: 'p',
        text: 'La apariencia de una oficina comunica antes de que nadie hable. Un mobiliario moderno y bien mantenido transmite profesionalismo, atención al detalle y confianza.',
      },
      {
        type: 'p',
        text: 'Esa percepción importa: en una reunión con un cliente, en una negociación, en el primer día de un empleado nuevo.',
      },

      { type: 'h2', text: 'Adaptabilidad: mobiliario que crece con la empresa' },
      {
        type: 'p',
        text: 'El mobiliario de alta calidad suele ofrecer mayor versatilidad. Los sistemas modulares, los muebles ajustables y las soluciones personalizables permiten reconfigurar el espacio a medida que la empresa crece o cambia de estructura.',
      },
      { type: 'p', text: 'No hay que empezar desde cero con cada cambio organizativo.' },

      { type: 'h2', text: 'Sostenibilidad: una decisión con impacto más allá de la oficina' },
      {
        type: 'p',
        text: 'Muchos fabricantes de mobiliario de calidad trabajan con materiales sostenibles y procesos responsables con el medio ambiente. Invertir en este tipo de muebles es coherente con compromisos de responsabilidad corporativa y reduce el impacto ambiental a largo plazo.',
      },

      { type: 'h2', text: 'Ahorro a largo plazo: la matemática del mobiliario de calidad' },
      {
        type: 'p',
        text: 'El costo inicial puede ser más alto. Pero la durabilidad, la menor tasa de reemplazos y el impacto positivo en la productividad hacen que el retorno sea claro. A largo plazo, el mobiliario de calidad cuesta menos que el barato.',
      },
    ],
    closing:
      'Invertir en mobiliario de oficina de alta calidad no es solo una decisión de diseño. Impacta directamente en la salud de los equipos, en la productividad del día a día y en cómo perciben la empresa quienes la visitan. A largo plazo, se traduce en ahorro, mejor desempeño operativo y una experiencia de trabajo más eficiente.',
    cta: {
      copy: 'Mobiliario diseñado para durar, rendir y adaptarse al crecimiento de tu empresa.',
      primaryLabel: 'Ver catálogo de mobiliario',
      primaryHref: '/productos',
      secondaryLabel: 'Solicita asesoría personalizada',
      secondaryHref: '/contacto',
    },
    img: 'biblioteca-4.webp',
    readTime: '08 min',
  },

  {
    slug: 'tendencias-espacios-modernos',
    number: '03',
    category: 'Tendencias',
    title: 'Tendencias en mobiliario de oficina para espacios modernos',
    intro:
      'El mundo del trabajo está cambiando, y los espacios de trabajo también. Las nuevas tendencias en mobiliario de oficina no siguen modas: responden a cómo trabajan realmente las personas hoy. Flexibilidad, bienestar y tecnología son los tres ejes que están redefiniendo cómo se diseñan y equipan las oficinas modernas.',
    sections: [
      { type: 'h2', text: 'Espacios flexibles y multifuncionales' },
      {
        type: 'p',
        text: 'Las oficinas ya no son lugares rígidos con puestos fijos. Son entornos dinámicos donde los equipos se mueven, se reconfiguran y eligen dónde trabajar según la tarea del momento.',
      },
      {
        type: 'p',
        text: 'El mobiliario modular y adaptable es la respuesta directa a esa necesidad. Permite reorganizar los espacios en minutos, facilitando tanto el trabajo individual como las dinámicas colaborativas sin necesidad de grandes intervenciones.',
      },

      { type: 'h2', text: 'Diseño centrado en el bienestar' },
      {
        type: 'p',
        text: 'El bienestar de los empleados dejó de ser un beneficio opcional y se convirtió en una variable estratégica. El mobiliario refleja ese cambio: sillas ajustables, escritorios de altura regulable y zonas de descanso bien diseñadas forman parte del estándar en oficinas modernas.',
      },
      {
        type: 'quote',
        text: 'Según el World Green Building Council, el diseño del espacio de trabajo influye directamente en el bienestar, la satisfacción y el rendimiento de los colaboradores.',
      },
      { type: 'p', text: 'Un espacio que cuida a las personas también cuida los resultados del negocio.' },

      { type: 'h2', text: 'Integración de la naturaleza: el diseño biofílico' },
      {
        type: 'p',
        text: 'La oficina verde dejó de ser una tendencia de nicho. Incorporar elementos naturales —plantas, materiales como la madera, colores inspirados en entornos naturales— crea ambientes más relajantes, reduce el estrés y mejora la calidad del aire.',
      },
      {
        type: 'p',
        text: 'El mobiliario de madera, en particular, aporta calidez visual y sensación de calma en espacios que tienden al minimalismo tecnológico.',
      },

      { type: 'h2', text: 'Tecnología integrada en el mobiliario' },
      {
        type: 'p',
        text: 'Las oficinas modernas requieren que el mobiliario facilite la conectividad, no que la obstaculice. Mesas con enchufes integrados, estaciones de carga inalámbrica y soluciones de gestión de cables son ya parte del diseño estándar.',
      },
      {
        type: 'p',
        text: 'Un espacio ordenado reduce las distracciones. Un espacio conectado elimina las fricciones del trabajo diario.',
      },

      { type: 'h2', text: 'Minimalismo: menos ruido visual, más concentración' },
      {
        type: 'p',
        text: 'El estilo minimalista sigue dominando el diseño de oficinas modernas, y por razones prácticas, no solo estéticas. Líneas limpias, colores neutros y espacios despejados generan un entorno que favorece la concentración y reduce la carga cognitiva.',
      },
      {
        type: 'p',
        text: 'Menos elementos en el espacio significa menos interrupciones visuales, y más espacio mental para trabajar.',
      },

      { type: 'h2', text: 'Espacios colaborativos diseñados para pensar juntos' },
      {
        type: 'p',
        text: 'El trabajo en equipo necesita infraestructura. Las oficinas modernas reservan zonas específicas para la colaboración: mesas amplias, sofás modulares y áreas informales donde los equipos pueden interactuar de manera más natural y creativa.',
      },
      {
        type: 'p',
        text: 'La clave no es poner sillas alrededor de una mesa. Es diseñar un entorno que invite a pensar juntos.',
      },

      { type: 'h2', text: 'Personalización: el espacio como expresión de la cultura corporativa' },
      {
        type: 'p',
        text: 'Cada empresa tiene una identidad. El mobiliario puede reforzarla o ignorarla. Las soluciones personalizadas —desde paletas de color hasta configuraciones exclusivas— permiten crear espacios que comunican quién es la empresa antes de que nadie hable.',
      },
      { type: 'p', text: 'Eso importa hacia afuera, con clientes. Y también hacia adentro, con los equipos.' },
    ],
    closing:
      'Las tendencias en mobiliario de oficina son el reflejo de un cambio en la forma de trabajar. Flexibilidad, bienestar y tecnología no son tendencias pasajeras: son las nuevas exigencias del trabajo moderno. Las empresas que adaptan sus espacios a esa realidad no solo mejoran la experiencia de sus equipos, sino que se posicionan como organizaciones capaces de evolucionar.',
    cta: {
      copy: 'Mobiliario diseñado para adaptarse a las nuevas formas de trabajo: flexible, funcional y pensado para durar.',
      primaryLabel: 'Ver soluciones para espacios modernos',
      primaryHref: '/espacios',
      secondaryLabel: 'Solicita asesoría personalizada',
      secondaryHref: '/contacto',
    },
    img: 'biblioteca-5.webp',
    readTime: '09 min',
  },
];

export const getBlog = (slug: string): Blog | undefined => BLOGS.find((b) => b.slug === slug);
export const otherBlogs = (slug: string): Blog[] => BLOGS.filter((b) => b.slug !== slug);
