// Editorial content per top-level product category.
// Each top-level category has one or more "sections" (subcategories) with
// their own description + characteristic bullets. Rendered by PageCategory.

export type CategorySection = {
  slug: string;
  name: string;
  description: string;
  caracteristicas: string[];
  /** Optional: tells the page that real photos haven't been delivered yet. */
  pendingPhotos?: boolean;
  /**
   * Optional: subcategory name(s) used by the filter on /productos.
   * Pass an array when a single editorial section groups multiple
   * catalog subcategories (e.g. "Credenzas / Bibliotecas").
   */
  productSubcategory?: string | string[];
};

export type Category = {
  slug: string;
  name: string;
  intro?: string;
  sections: CategorySection[];
};

export const CATEGORIES: Category[] = [
  {
    slug: 'silloneria',
    name: 'Sillonería',
    intro:
      'Sillería ejecutiva, operativa, de visita y colectividades. Soluciones diseñadas para soportar el trabajo intensivo con ergonomía aplicada.',
    sections: [
      {
        slug: 'sillas-presidente',
        name: 'Sillas Presidente',
        productSubcategory: 'Sillas presidente',
        description:
          'Diseñada para quienes buscan máxima comodidad, nuestra silla tipo presidente combina ergonomía, resistencia y un diseño sofisticado que eleva cualquier oficina. Cuenta con polipropileno de alta densidad y tapizado de primera calidad, ofreciendo una experiencia de uso cómoda y duradera. Sus apoyabrazos ergonómicos, mecanismo reclinable y ajuste de altura permiten adaptarla fácilmente a las necesidades de cada usuario.',
        caracteristicas: [
          'Cabezal',
          'Sistema reclinable con ajuste de tensión',
          'Altura regulable',
          'Apoyabrazos regulable',
          'Base resistente con ruedas de alta movilidad',
        ],
      },
      {
        slug: 'sillas-gerenciales',
        name: 'Sillas Gerenciales',
        productSubcategory: 'Sillas gerenciales',
        description:
          'Ideal para espacios de trabajo dinámicos, esta silla tipo gerente ofrece un equilibrio perfecto entre comodidad y diseño. Su ergonomía brinda soporte adecuado durante la jornada laboral.',
        caracteristicas: [
          'Cabezal',
          'Soporte lumbar',
          'Altura regulable',
          'Apoyabrazos regulable',
          'Base giratoria con ruedas',
        ],
      },
      {
        slug: 'sillas-operativas',
        name: 'Sillas Operativas',
        productSubcategory: 'Sillas operativas',
        description:
          'Optimiza tu espacio de trabajo con esta silla operativa, pensada para brindar confort y practicidad en cada jornada. Su diseño funcional y ligero permite una movilidad ágil para el usuario.',
        caracteristicas: [
          'Soporte lumbar',
          'Altura regulable',
          'Apoyabrazos regulable',
          'Base giratoria con ruedas',
        ],
      },
      {
        slug: 'sillas-de-visita',
        name: 'Sillas de Visita',
        productSubcategory: 'Sillas de visita',
        description:
          'Ideal para salas de espera y áreas de atención, esta silla tipo visita combina diseño sencillo y comodidad. Su estructura firme y respaldo ergonómico brindan un soporte adecuado para estancias cortas.',
        caracteristicas: [
          'Estructura metálica',
          'Asiento y espalda en poliuretano tapizado',
          'Con brazos o sin brazos',
        ],
      },
      {
        slug: 'colectividades',
        name: 'Colectividades',
        productSubcategory: 'Colectividades',
        description:
          'Pensada para espacios de alto tránsito, esta silla ofrece durabilidad y practicidad. Su diseño robusto y ligero permite un uso intensivo, ideal para salas de capacitación, auditorios, comedores o eventos.',
        caracteristicas: [
          'Estructura polipropileno de alta resistencia',
          'Diseño ligero y apilable',
          'Ideal para uso colectivo y continuo',
          'Fácil mantenimiento',
        ],
      },
      {
        slug: 'sofas',
        name: 'Sofás',
        productSubcategory: 'Sofás',
        pendingPhotos: true,
        description:
          'Aporta confort y elegancia a tus espacios. Ideales para salas de espera, recepciones y áreas de descanso. Su diseño moderno y acogedor crea un ambiente profesional sin perder calidez.',
        caracteristicas: [
          'Estructura interna en madera reforzada',
          'Espuma de alta densidad',
          'Tapizado en cuero sintético, tela o malla (según modelo)',
          'Patas metálicas',
          'Superficie de fácil limpieza y mantenimiento',
        ],
      },
    ],
  },
  {
    slug: 'escritorios',
    name: 'Escritorios + Estaciones de trabajo',
    intro:
      'Escritorios gerenciales, operativos, estaciones colaborativas y soluciones regulables. Sistemas con conducción eléctrica integrada y tableros en melamina de alta resistencia.',
    sections: [
      {
        slug: 'escritorios-gerente',
        name: 'Escritorios Gerente',
        productSubcategory: 'Escritorios gerente',
        description:
          'Diseñado para destacar en espacios ejecutivos, este escritorio gerencial combina estilo, comodidad y practicidad. Su diseño amplio permite una organización eficiente, brindando el espacio ideal para trabajar con comodidad y mantener todo al alcance.',
        caracteristicas: [
          'Estructura metálica / melamina de alta resistencia',
          'Tablero superior en melamina',
          'Sistema de conducción eléctrica',
          'Caja porta tomas',
        ],
      },
      {
        slug: 'escritorios-operativos',
        name: 'Escritorios Operativos',
        productSubcategory: 'Escritorios operativos',
        description:
          'Diseñado para maximizar la productividad en espacios de trabajo colaborativos, este escritorio operativo destaca por su estructura compacta y funcional. Es ideal para estaciones de trabajo donde se requiere orden, practicidad y aprovechamiento del espacio.',
        caracteristicas: [
          'Estructura metálica',
          'Tablero superior en melamina',
          'Sistema de conducción eléctrica',
          'Caja porta tomas',
        ],
      },
      {
        slug: 'estaciones-de-trabajo',
        name: 'Estaciones de Trabajo',
        productSubcategory: 'Estaciones de trabajo',
        description:
          'Su diseño versátil se adapta fácilmente a diferentes configuraciones de oficina, facilitando la integración con otros puestos. Es ideal para estaciones de trabajo donde se requiere orden, practicidad y aprovechamiento del espacio.',
        caracteristicas: [
          'Estructura metálica',
          'Tablero superior en melamina',
          'Sistema de conducción eléctrica',
          'Caja porta tomas',
          'Separador de vidrio',
        ],
      },
      {
        slug: 'escritorios-regulables',
        name: 'Escritorios Regulables',
        productSubcategory: 'Escritorios regulables',
        description:
          'Diseñado para adaptarse a diferentes posiciones de trabajo. Permite alternar fácilmente entre estar sentado y de pie, favoreciendo una postura más saludable durante la jornada laboral.',
        caracteristicas: [
          'Estructura metálica',
          'Tablero superior en melamina',
          'Mecanismo regulador de altura',
          'Memoria de ajuste de altura',
        ],
      },
    ],
  },
  {
    slug: 'mesas',
    name: 'Mesas',
    intro:
      'Mesas de reunión, colaborativas y auxiliares. Soluciones modulares con tableros en melamina, vidrio o fórmica e integración eléctrica oculta.',
    sections: [
      {
        slug: 'mesas-de-reunion',
        name: 'Mesas de Reunión',
        productSubcategory: 'Mesas de reunión',
        description:
          'Eleva el nivel de tus espacios corporativos. Diseñada para proyectar autoridad, elegancia y organización. Su diseño imponente y acabados de alta calidad crean el ambiente ideal para reuniones estratégicas y toma de decisiones.',
        caracteristicas: [
          'Estructura metálica / melamina',
          'Tablero superior en melamina / vidrio / fórmica',
          'Sistema de conducción eléctrica',
          'Caja porta tomas',
        ],
      },
      {
        slug: 'mesas-colaborativas',
        name: 'Mesas Colaborativas',
        productSubcategory: 'Mesas colaborativas',
        description:
          'Esta mesa combina estética ejecutiva con funcionalidad compartida. Su diseño elegante y contemporáneo fomenta la interacción, facilitando el trabajo en equipo.',
        caracteristicas: ['Estructura metálica', 'Tablero superior en melamina'],
      },
      {
        slug: 'mesas-auxiliares',
        name: 'Mesas Auxiliares',
        productSubcategory: 'Mesas auxiliares',
        description:
          'Compacta y versátil. Ofrece una superficie útil para organizar documentos, equipos o elementos decorativos.',
        caracteristicas: ['Estructura metálica', 'Tablero superior en melamina'],
      },
    ],
  },
  {
    slug: 'almacenamiento',
    name: 'Almacenamiento',
    intro:
      'Credenzas, bibliotecas, lockers, módulos rodantes y archivo móvil. Soluciones de organización con sistemas de seguridad, herrajes técnicos y acabados coordinados.',
    sections: [
      {
        slug: 'credenzas-bibliotecas',
        name: 'Credenzas / Bibliotecas',
        productSubcategory: ['Credenza', 'Biblioteca Alta', 'Biblioteca Baja'],
        description:
          'Pensada para quienes valoran la organización y una estética cuidada. Su diseño sobrio y contemporáneo se integra perfectamente en espacios de alto nivel. Ideal para almacenar documentos, archivos y elementos de trabajo, permite optimizar el espacio sin perder una imagen limpia y estructurada.',
        caracteristicas: [
          'Estructura metálica',
          'Tablero superior en melamina',
          'Puertas en melamina',
          'Sistema de seguridad con cerradura',
          'Tiraderas',
        ],
      },
      {
        slug: 'modulos-archivacion',
        name: 'Módulos de Archivación / Arturito Rodante',
        productSubcategory: ['Módulo 3 gavetas', 'Arturito'],
        description:
          'Diseñado para mantener todo en su lugar de forma práctica y segura. Su estructura funcional facilita el acceso rápido a archivos, mejorando la organización y la eficiencia en el trabajo diario.',
        caracteristicas: [
          'Estructura metálica',
          'Tablero superior en melamina',
          'Cajones metálicos',
          'Frente de cajón metálico / melamina',
          'Sistema de seguridad con cerradura',
          'Tiraderas',
          'Garruchas de alto tráfico',
        ],
      },
      {
        slug: 'lockers',
        name: 'Lockers',
        productSubcategory: 'Locker',
        description:
          'Diseñados para el almacenamiento individual de pertenencias. Su estructura práctica y resistente permite mantener objetos personales protegidos, contribuyendo a un entorno de trabajo más organizado.',
        caracteristicas: [
          'Estructura metálica',
          'Puertas de melamina',
          'Sistema de seguridad con cerradura / candado',
          'Tiraderas',
        ],
      },
      {
        slug: 'archivo-rodante',
        name: 'Archivo Rodante',
        productSubcategory: 'Archivo Rodante',
        description:
          'Diseñado para mantener documentos y suministros siempre al alcance. Su formato compacto y con ruedas permite desplazarlo fácilmente, adaptándose a diferentes áreas de la oficina según tus necesidades. Ideal para estaciones de trabajo dinámicas, combina funcionalidad, orden y practicidad en un solo mueble.',
        caracteristicas: [],
      },
    ],
  },
  {
    slug: 'divisiones',
    name: 'Divisiones de Ambientes',
    intro:
      'Divisiones modulares y de vidrio para reconfigurar espacios sin perder amplitud ni entrada de luz natural.',
    sections: [
      {
        slug: 'divisiones-modulares',
        name: 'Divisiones Modulares',
        productSubcategory: 'Divisiones modulares',
        description:
          'Optimiza la distribución de tu oficina con divisiones modulares que combinan diseño contemporáneo y funcionalidad. Pensadas para entornos corporativos en constante evolución, permiten redefinir espacios de manera ágil, manteniendo una estética ordenada.',
        caracteristicas: [
          'Estructura metálica',
          'Plafones melamina / vidrio',
          'Altura piso techo / media altura',
          'Puertas tamboradas / vidrio',
          'Canaleta de conducción por piso',
        ],
      },
      {
        slug: 'divisiones-de-vidrio',
        name: 'Divisiones de Vidrio',
        productSubcategory: 'Divisiones de vidrio',
        description:
          'Ideales para oficinas que buscan amplitud visual sin perder organización. Su diseño limpio permite delimitar áreas manteniendo la entrada de luz natural, creando ambientes más abiertos y productivos.',
        caracteristicas: ['Perfiles de aluminio', 'Puerta aluminio y vidrio', 'Altura piso techo'],
      },
    ],
  },
  {
    slug: 'recepciones',
    name: 'Recepciones',
    sections: [
      {
        slug: 'recepciones',
        name: 'Recepciones',
        description:
          'La recepción es el punto de bienvenida de tu empresa y refleja su identidad. Estas recepciones están diseñadas para ofrecer una presencia sólida, combinando líneas modernas con soluciones prácticas para la atención diaria.',
        caracteristicas: [
          'Estructura en melamina / fórmica',
          'Acabados en cuarzo / porcelanato / vidrio',
          'Sistema de conducción eléctrica',
          'Curva / recta / en L',
        ],
      },
    ],
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === slug);
