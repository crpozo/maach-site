import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Lang = 'es' | 'en';

type Dict = Record<string, string>;
type Translations = Record<Lang, Dict>;

// Translation dictionary. Keys are plain English-ish identifiers
// grouped by page. Add new keys here when adding new copy.
const T: Translations = {
  es: {
    // ====== NAV ======
    'nav.nuevo': 'Nuevo',
    'nav.productos': 'Productos',
    'nav.colecciones': 'Colecciones',
    'nav.espacios': 'Espacios',
    'nav.portafolio': 'Portafolio',
    'nav.investigacion': 'Investigación',
    'nav.sobre': 'Sobre MAACH',
    'nav.contacto': 'Contacto',

    // ====== COMMON CTAs ======
    'cta.explore': 'Explorar catálogo',
    'cta.spec': 'Inicia tu proyecto',
    'cta.scroll': 'Scroll para descubrir',
    'cta.contact': 'Iniciar proyecto',
    'cta.engineering': 'Contactar ingeniería',
    'cta.see_all': 'Ver todos',
    'cta.discover': 'Descubrir',
    'cta.read': 'Leer artículo',
    'cta.view_details': 'Ver detalles',
    'cta.view_products': 'Ver productos',
    'cta.see_portfolio': 'Ver portafolio',
    'cta.see_catalog': 'Ver catálogo completo',
    'cta.start_planning': 'Iniciar planificación',
    'cta.see_case_studies': 'Ver casos de estudio',
    'cta.send_message': 'Enviar mensaje',
    'cta.continue': 'Continuar',
    'cta.see_all_articles': 'Todos los artículos',
    'cta.next_project': 'Siguiente proyecto',
    'common.advice': 'Asesoría especializada',
    'common.fall_winter': '— Otoño / Invierno',

    // ====== HOME ======
    'home.hero.tag': 'Sistema 2026 / ID: MAACH-01',
    'home.hero.h1.1': 'Diseño',
    'home.hero.h1.2': 'Industrial,',
    'home.hero.h1.3': 'Rendimiento',
    'home.hero.h1.4': 'Real.',
    'home.hero.estudio_caso': 'ESTUDIO_CASO / 01',
    'home.hero.disponible': '+ DISPONIBLE',
    // Categorías section
    'home.cat.eyebrow': 'Sistema',
    'home.cat.title': 'Categorías.',
    'home.cat.01.name': 'Sillonería',
    'home.cat.01.desc': 'Ergonomía técnica, sillas gerenciales, operativas y sofás.',
    'home.cat.02.name': 'Escritorios + Estaciones',
    'home.cat.02.desc': 'Sistemas modulares, escritorios operativos y regulables.',
    'home.cat.03.name': 'Mesas',
    'home.cat.03.desc': 'Mesas de reunión, colaborativas y auxiliares.',
    'home.cat.04.name': 'Almacenamiento',
    'home.cat.04.desc': 'Credenzas, archivos rodantes, lockers y bibliotecas.',
    'home.cat.05.name': 'Divisiones',
    'home.cat.05.desc': 'Sistemas modulares de piso a techo y divisorias de vidrio.',
    'home.cat.06.name': 'Arquitectura',
    'home.cat.06.desc': 'Muros modulares, pods y mamparas divisorias para alta densidad.',
    // ADN industrial
    'home.adn.eyebrow': 'Filosofía',
    'home.adn.title.1': 'ADN',
    'home.adn.title.2': 'Industrial.',
    'home.adn.intro': 'Cada decisión responde a ingeniería, durabilidad y desempeño en el tiempo.',
    'home.adn.01.title': 'Integridad Estructural',
    'home.adn.01.body':
      'Ingeniería sólida pensada para el uso intensivo. Mobiliario que no se deforma y mantiene sus propiedades a lo largo de los años.',
    'home.adn.02.title': 'Funcionalidad Consciente',
    'home.adn.02.body':
      'Diseño centrado en resolver exigencias operativas reales. Si una pieza no cumple un propósito técnico, se elimina del esquema.',
    'home.adn.03.title': 'Escalabilidad Modular',
    'home.adn.03.body':
      'Sistemas creados para crecer y reconfigurarse. Componentes que se integran mediante ingeniería de nodos.',
    'home.adn.04.title': 'Co-diseño con arquitectos',
    'home.adn.04.body':
      'Trabajamos junto a estudios y clientes para resolver requerimientos técnicos específicos. El diseño se construye en conjunto.',
    // Casos de Estudio
    'home.cases.eyebrow': 'Portafolio',
    'home.cases.title': 'Casos de Estudio.',
    // Clientes
    'home.clientes.eyebrow': 'Clientes',
    'home.clientes.title.1': 'Confianza',
    'home.clientes.title.2': 'industrial.',
    'home.clientes.count': '+22 organizaciones · Ecuador',
    'home.clientes.footnote': 'Marcas y organizaciones con las que MAACH ha colaborado · 2018 — 2026',
    // Precisión Industrial
    'home.precision.eyebrow': 'Directiva de proyecto',
    'home.precision.title.1': 'Precisión',
    'home.precision.title.2': 'Industrial.',
    'home.precision.row1.k': 'CAPACIDAD INSTALADA',
    'home.precision.row1.v': 'ALTO VOLUMEN',
    'home.precision.row2.k': 'TOLERANCIA',
    'home.precision.row2.v': '± 2 MM',
    'home.precision.row3.k': 'EJECUCIÓN',
    'home.precision.row3.v': 'INMEDIATA',
    'home.precision.row4.k': 'GARANTÍA',
    'home.precision.row4.v': '10 AÑOS',
    'home.spec.eyebrow': 'Contacto técnico',
    'home.spec.title': 'Iniciar Especificación',
    'home.spec.body':
      'Nuestro equipo de ingeniería de proyectos adapta los sistemas MAACH a tus planos arquitectónicos y requerimientos espaciales.',

    // ====== ESPACIOS ======
    'esp.hero.eyebrow': 'MAACH · PLANIFICACIÓN 2026',
    'esp.hero.section': 'Espacios',
    'esp.hero.title.1': 'Es',
    'esp.hero.title.2': 'pacios.',
    'esp.hero.body':
      'Soluciones integrales que transforman metros cuadrados en entornos productivos, coherentes y listos para escalar.',
    'esp.stat.tipologias': 'Tipologías',
    'esp.stat.sistemas': 'Sistemas',
    'esp.stat.configs': 'Configs.',
    'esp.stat.acabados': 'Acabados',
    // Typologies
    'esp.typ.eyebrow': 'Tipologías',
    'esp.typ.title.1': 'Cuatro',
    'esp.typ.title.2': 'tipologías.',
    'esp.typ.count': '04 espacios · Sistema MAACH',
    'esp.typ.01.name': 'Área Coworking',
    'esp.typ.01.desc':
      'Un espacio de coworking moderno combina funcionalidad, comodidad y diseño para crear ambientes de trabajo dinámicos y eficientes. Los escritorios ergonómicos y las estaciones de trabajo modulares permiten adaptarse a diferentes necesidades, mientras que las sillas ergonómicas brindan soporte y confort durante largas jornadas.',
    'esp.typ.01.products':
      'Estaciones de trabajo · Escritorio operativo · Silla operativa · Arturito rodante',
    'esp.typ.02.name': 'Salas de Reuniones',
    'esp.typ.02.desc':
      'Las salas de reuniones modernas están diseñadas para fomentar la comunicación, la concentración y la colaboración en un entorno profesional y cómodo. Las mesas de reunión son el elemento central, disponibles en distintos formatos y tamaños para adaptarse a reuniones ejecutivas, sesiones creativas o videoconferencias. Las sillas ergonómicas complementan el espacio ofreciendo comodidad y soporte durante encuentros prolongados.',
    'esp.typ.02.products':
      'Mesa de reunión · Sillas operativas · Credenzas · Divisiones modulares',
    'esp.typ.03.name': 'Áreas de Espera',
    'esp.typ.03.desc':
      'Una sala de recepción con área de espera está diseñada para ofrecer una experiencia cómoda, organizada y profesional desde el primer momento. Los mostradores de recepción permiten una atención eficiente y ordenada, mientras que los sofás, butacas y sillas de espera brindan confort a visitantes y clientes. Las mesas auxiliares complementan el espacio aportando funcionalidad y equilibrio visual.',
    'esp.typ.03.products':
      'Recepción · Mesa colaborativa · Silla gerente · Sofá',
    'esp.typ.04.name': 'Áreas de Archivo',
    'esp.typ.04.desc':
      'Las áreas de archivación están diseñadas para mantener la organización, seguridad y fácil acceso a documentos y materiales de trabajo. Los archivadores metálicos, gaveteros y estanterías modulares permiten clasificar y almacenar información de manera eficiente, optimizando el uso del espacio y facilitando las tareas administrativas diarias.',
    'esp.typ.04.products':
      'Archivo rodante · Biblioteca alta · Lockers',
    'esp.typ.tipologia_label': 'TIPOLOGÍA',
    'esp.typ.products_label': 'Productos utilizados',
    // Process
    'esp.proc.eyebrow': 'Proceso',
    'esp.proc.title.1': 'Cómo planificamos',
    'esp.proc.title.2': 'un espacio.',
    'esp.proc.subtitle': 'Del primer plano arquitectónico a la instalación final, en cuatro fases.',
    'esp.proc.01.title': 'Diagnóstico',
    'esp.proc.01.body':
      'Levantamos el espacio existente, analizamos flujos de trabajo y entrevistamos al equipo para entender el uso real.',
    'esp.proc.02.title': 'Diseño',
    'esp.proc.02.body':
      'Propuestas de layout, render 3D y selección de tipologías MAACH. Iteramos con arquitectos e interioristas.',
    'esp.proc.03.title': 'Especificación',
    'esp.proc.03.body':
      'Fichas técnicas, planos CAD/BIM y cuantificación final. Cero ambigüedad en lo que se va a instalar.',
    'esp.proc.04.title': 'Instalación',
    'esp.proc.04.body':
      'Logística, montaje y puesta a punto. Equipo propio MAACH coordinado con la obra y el cliente.',
    // Deliverables
    'esp.del.eyebrow': 'Entregables',
    'esp.del.title': 'Qué entregamos.',
    'esp.del.01': 'Levantamiento de espacio',
    'esp.del.02': 'Plano arquitectónico',
    'esp.del.03': 'Render 3D fotorrealista',
    'esp.del.04': 'Selección de mobiliario',
    'esp.del.05': 'Planos CAD / BIM',
    'esp.del.06': 'Instalación llave en mano',
    // FAQ block
    'faq.eyebrow': 'FAQ · Asesoría',
    'faq.title': '¿Dudas para diseñar tu espacio?',
    'faq.subtitle': 'Aquí las resolvemos.',
    'faq.cta': 'Hablar con un asesor',
    // CTA
    'esp.cta.eyebrow': 'Asesoría especializada',
    'esp.cta.title.1': '¿Necesitas',
    'esp.cta.title.2': 'planificar',
    'esp.cta.title.3': 'un espacio?',
    'esp.cta.body':
      'Trabajamos junto a arquitectos e interioristas. Compartimos planos arquitectónicos, render 3D y propuestas de mobiliario integradas.',
    'esp.cta.response_in': 'Respuesta en',

    // ====== PORTAFOLIO ======
    'port.hero.eyebrow': 'MAACH · PORTAFOLIO 2026',
    'port.hero.section': 'Proyectos · 2024 — 2026',
    'port.hero.title.1': 'Porta',
    'port.hero.title.2': 'folio.',
    'port.hero.body': 'Selección de proyectos donde el diseño arquitectónico y la funcionalidad industrial convergen.',
    'port.m.completed': 'Proyectos completados',
    'port.m.countries': 'Países atendidos',
    'port.m.installed': 'm² instalados',
    'port.m.recurring': 'Clientes recurrentes',
    'port.discover': 'Descubrir proyecto',
    // Detail
    'pdet.phase01.eyebrow': 'FASE 01 · DESAFÍO',
    'pdet.phase01.title': 'El Desafío.',
    'pdet.phase01.lead':
      'Un espacio para fomentar la colaboración espontánea y la concentración profunda, respetando la arquitectura original del edificio y maximizando la luz natural.',
    'pdet.phase01.body':
      'El proyecto requería una solución integral de mobiliario adaptable a diferentes modalidades de trabajo. Se implementaron sistemas de benching para áreas operativas combinados con zonas de soft seating para reuniones informales.',
    'pdet.phase02.eyebrow': 'FASE 02 · PROPUESTA',
    'pdet.phase02.title': 'Propuesta de Valor.',
    'pdet.phase02.lead':
      'Integración de la colección MAACH-02 para lograr una estética cohesiva entre zonas operativas y de dirección.',
    'pdet.phase02.b1': 'Sillería ergonómica certificada para reducir fatiga postural en jornadas de alto rendimiento.',
    'pdet.phase02.b2': 'Paneles termoacústicos en áreas de benching para control de ruido en plantas abiertas.',
    'pdet.phase02.b3':
      'Acabados en maderas naturales y textiles texturizados que aportan calidez al entorno corporativo.',
    'pdet.phase02.b4': 'Integración tecnológica oculta en mesas de juntas y estaciones modulares.',
    'pdet.phase03.eyebrow': 'FASE 03 · RESULTADO',
    'pdet.phase03.title': 'El Resultado.',
    'pdet.phase03.metric': 'MÉTRICA CLAVE',
    'pdet.phase03.metric.body':
      'Incremento en la utilización de espacios colaborativos según reporte del cliente, 6 meses post-instalación.',
    'pdet.phase03.lead':
      'Un ecosistema de trabajo dinámico que responde a las necesidades actuales de la organización, preparándola para su crecimiento a futuro.',
    'pdet.phase03.body':
      'La solución entregada transformó la manera en que los equipos interactúan día a día. Las zonas de soft seating se convirtieron en el núcleo de la creatividad, mientras las estaciones operativas brindan el enfoque y privacidad necesarios.',
    'pdet.phase03.delivery': 'Plazo de entrega',
    'pdet.phase03.delivery.value': '16 semanas',
    'pdet.phase03.pieces': 'Piezas instaladas',
    'pdet.phase03.pieces.value': '284 ud.',
    'pdet.gallery.eyebrow': 'Galería',
    'pdet.gallery.title': 'Vista de instalación.',
    'pdet.next': 'Siguiente proyecto',
    'pdet.continue': 'Continuar',
    'pdet.sector': 'Sector',
    'pdet.arch': 'Arquitectura',
    'pdet.area': 'Superficie',
    'pdet.year': 'Año',
    'pdet.status': 'Status',
    'pdet.status.value': 'Completado',
    'pdet.spec_sheet': 'FICHA TÉCNICA',

    // ====== INVESTIGACIÓN ======
    'inv.hero.eyebrow': 'MAACH · WORK INSIGHTS 2026',
    'inv.hero.section': 'Investigación',
    'inv.hero.title.1': 'Investigación',
    'inv.hero.title.2': 'y contexto.',
    'inv.hero.body':
      'El diseño de nuestro mobiliario no surge de la intuición, sino de la observación sistemática y el análisis de cómo cambian las dinámicas laborales a nivel global.',
    'inv.quote.body': '68% de las oficinas hoy requieren configuraciones adaptables a equipos híbridos.',
    'inv.quote.source': '— Reporte MAACH Work Insights 2025',
    'inv.list.eyebrow': 'Editorial · MAACH Research',
    'inv.list.title.1': 'Lecturas',
    'inv.list.title.2': 'recomendadas.',
    'inv.list.count': '03 artículos · MAACH 2026',
    'inv.manifesto.eyebrow': 'Manifiesto · MAACH 2026',
    'inv.manifesto.body.1': '"Investigamos el trabajo real para diseñar',
    'inv.manifesto.body.2': ' mobiliario que responda',
    'inv.manifesto.body.3': ' a sus exigencias verdaderas — no a tendencias estéticas."',
    'inv.manifesto.source': '— Equipo MAACH Research',
    'blog.read': 'Leer artículo',
    'blog.next_step': 'Siguiente paso',
    'blog.read_too': '¿Quieres profundizar?',
    'blog.read_too.title': 'Lee también.',

    // ====== RECURSOS ======
    'rec.hero.eyebrow': 'MAACH · RECURSOS 2026',
    'rec.hero.section': 'Biblioteca',
    'rec.hero.crumb.home': 'Inicio',
    'rec.hero.crumb.section': 'Recursos de diseño',
    'rec.hero.crumb.current': 'Biblioteca',
    'rec.hero.title.1': 'Biblioteca',
    'rec.hero.title.2': 'de Documentos.',
    'rec.hero.body': 'Descarga folletos, especificaciones técnicas, fichas de producto, planos CAD y modelos 3D / BIM.',
    'rec.filter.type': 'Tipo de documento',
    'rec.filter.docs_guides': 'Documentos & guías',
    'rec.filter.apply': 'APLICAR FILTRO',
    'rec.filter.search': 'Buscar',
    'rec.filter.clear': 'Limpiar',
    'rec.filter.search_placeholder': 'buscar...',
    'rec.filter.refine': 'Refinar resultados',
    'rec.filter.show_more': '+ Mostrar más',
    'rec.col.type': 'Tipo',
    'rec.col.name': 'Nombre del documento',
    'rec.col.product': 'Producto',
    'rec.col.size': 'Tamaño',
    'rec.col.select': 'SELECCIONAR',
    'rec.footer.selected': 'seleccionados',
    'rec.footer.download_selection': 'Descargar selección',

    // ====== CONTACTO ======
    'cont.tag': 'MAACH · CONTACTO',
    'cont.hero.title.1': 'Hablemos',
    'cont.hero.title.2': 'de tu proyecto.',
    'cont.hero.body':
      'Desarrollamos soluciones de mobiliario técnico a gran escala. Integramos nuestros sistemas directamente a tus planos arquitectónicos.',
    'cont.stat.response': 'Respuesta',
    'cont.stat.location': 'Ubicación',
    'cont.stat.direct_lines': 'Líneas directas',
    'cont.right.eyebrow': 'Equipo de ingeniería de proyectos',
    'cont.right.title.1': 'En tu obra,',
    'cont.right.title.2': 'desde el plano.',
    'cont.right.tag': 'QUITO · ECUADOR',
    'cont.form.eyebrow': 'Formulario · Iniciar conversación',
    'cont.form.title': 'Escríbenos.',
    'cont.form.response': 'Respuesta < 24 hrs',
    'cont.form.name': 'Nombre y apellido *',
    'cont.form.name_ph': 'Roberto A. Salgado',
    'cont.form.email': 'Correo electrónico *',
    'cont.form.email_ph': 'r.salgado@empresa.com',
    'cont.form.company': 'Empresa',
    'cont.form.company_ph': 'Estudio Alba',
    'cont.form.message': 'Mensaje *',
    'cont.form.message_ph': 'Cuéntanos sobre tu proyecto: volumen estimado, plazos, sede, m² aprox...',
    'cont.form.privacy': 'Acepto el aviso de privacidad',
    'cont.side.info': 'Información de contacto',
    'cont.side.phones': 'Teléfonos',
    'cont.side.response_time': 'Tiempo de respuesta',
    'cont.side.response_for': 'Para solicitudes técnicas',

    // ====== SOBRE MAACH ======
    'about.brandbook': 'Brandbook',
    'about.section': 'Estrategia de Marca',
    'about.hero.h1':
      'Diseñar y fabricar mobiliario que funcione en el trabajo real.',
    'about.hero.h1.1': 'Diseñar y fabricar',
    'about.hero.h1.2': 'mobiliario',
    'about.hero.h1.3': 'que funcione en',
    'about.hero.h1.4': 'el trabajo real.',
    'about.hero.tag': 'SOBRE MAACH',
    'about.hero.season': 'ESTUDIO · MANIFIESTO 2026',
    'about.hero.id.code': 'MCH-ABOUT-01',
    'about.hero.id.badge': 'EST. 2023 — QUITO',
    'about.hero.vertical': 'MAACH · SOBRE NOSOTROS · 2026',
    'about.hero.meta.1': 'CO-DISEÑO INDUSTRIAL',
    'about.hero.meta.2': 'METAL + MADERA',
    'about.hero.meta.3': '30+ AÑOS',
    'about.mv.eyebrow': 'Misión / Visión',
    'about.mv.mision.label': 'Misión',
    'about.mv.mision.body':
      'Somos fabricantes y partners de diseño para espacios de trabajo; co-creamos y producimos mobiliario que inspira y perdura, fabricado localmente por manos expertas y procesos tecnológicos avanzados, para ayudar a empresas a ser más productivas y que sus colaboradores se sientan mejor.',
    'about.mv.vision.label': 'Visión',
    'about.mv.vision.body':
      'Ser la referencia latinoamericana en mobiliario co-creado y fabricado localmente con estándares internacionales, mejorando la productividad y el bienestar mediante la innovación continua, tecnología y creatividad; impulsando la industria y el talento ecuatoriano hacia el mundo.',
    'about.sobre.eyebrow': 'Sobre Nosotros',
    'about.sobre.title': 'Sobre nosotros.',
    'about.sobre.body.1':
      'MAACH diseña y fabrica mobiliario corporativo a partir de procesos industriales sólidos, criterios de ingeniería y una comprensión profunda del uso real en los espacios de trabajo.',
    'about.sobre.body.2':
      'Cada decisión responde a estructura, ergonomía, durabilidad y desempeño en el tiempo.',
    'about.sobre.body.3':
      'A través del co-diseño con arquitectos, interioristas y clientes, desarrollamos soluciones adaptables que integran materiales, tecnología y producción local con estándares internacionales.',
    'about.sobre.body.4':
      'Diseñamos espacios que funcionan en el día a día, mejoran la productividad y elevan la experiencia de quienes los usan.',
    'about.values.eyebrow': 'Valores',
    'about.values.title': 'Cómo trabajamos.',
    'about.value.01.title': 'Diseño funcional',
    'about.value.01.body':
      'Cada decisión de diseño responde a una necesidad real de uso. La forma existe para cumplir una función y mejorar el desempeño del trabajo cotidiano.',
    'about.value.02.title': 'Ingeniería aplicada',
    'about.value.02.body':
      'La marca se construye desde procesos industriales sólidos, precisión técnica y control productivo. La ingeniería garantiza durabilidad y consistencia.',
    'about.value.03.title': 'Co-diseño colaborativo',
    'about.value.03.body':
      'MAACH trabaja junto a arquitectos, interioristas y clientes para desarrollar soluciones adaptables. El diseño es un proceso compartido.',
    'about.value.04.title': 'Calidad que perdura',
    'about.value.04.body':
      'Productos pensados para resistir el uso intensivo y mantenerse vigentes en el tiempo. La durabilidad es criterio central en materiales y construcción.',
    'about.value.05.title': 'Ergonomía y bienestar',
    'about.value.05.body':
      'El mobiliario se diseña considerando la relación entre cuerpo, espacio y trabajo. Confort y experiencia de uso son parte del desempeño.',
    'about.value.06.title': 'Fabricación con visión',
    'about.value.06.body':
      'Integramos producción local con estándares internacionales, combinando eficiencia, tecnología y responsabilidad para las exigencias actuales.',
    'about.value.label': 'VALOR',
    'about.manifesto.eyebrow': 'MAACH · MANIFIESTO',
    'about.manifesto.body.1': '"No diseñamos objetos para',
    'about.manifesto.body.2': ' decorar espacios ',
    'about.manifesto.body.3': '— diseñamos',
    'about.manifesto.body.4': ' herramientas estructurales ',
    'about.manifesto.body.5': 'que habilitan el trabajo."',
    'about.manifesto.source': 'Estudio MAACH · 2026',
    'about.history.eyebrow': 'Trayectoria',
    'about.history.title': 'Nuestra Historia.',
    'about.history.body.1':
      'MAACH nació hace tres años como la unidad comercial de Sumar, una empresa familiar con más de 30 años de trayectoria en la fabricación de mobiliario corporativo.',
    'about.history.body.2':
      'Desde su origen, la propuesta se ha diferenciado por la combinación de metal y madera, logrando un equilibrio entre durabilidad, diseño y ergonomía.',
    'about.history.body.3':
      'Con el tiempo, MAACH evoluciona para consolidarse como una marca que no solo fabrica, sino que entiende cómo se trabaja hoy y cómo deben responder los espacios.',
    'about.history.stat.years': 'años de trayectoria',
    'about.history.stat.brand': 'años como marca',
    'about.team.eyebrow': 'Estructura Organizacional',
    'about.team.title': 'Equipo.',
    'about.team.join': 'Únete al equipo',
    'about.team.portrait': 'EQUIPO_MAACH',
    'about.team.role.01': 'Gerente General',
    'about.team.role.02': 'Gerente Comercial',
    'about.team.role.03': 'Ejecutivo de Cuentas',
    'about.team.role.04': 'Diseño Arquitectónico',
    'about.team.role.05': 'Gerente Producción',
    'about.team.role.06': 'Jefe de Producción Mobiliario',
    'about.team.role.07': 'Jefe de Instalación',
    'about.allies.eyebrow': 'Red de Aliados',
    'about.allies.title': 'Nuestros Aliados.',
    'about.allies.body':
      'Trabajamos con socios estratégicos en materias primas, componentes y especialidades técnicas para garantizar calidad y consistencia en cada producto.',

    // ====== PRODUCTOS ======
    'prod.crumb.home': 'Inicio',
    'prod.crumb.catalog': 'Catálogo',
    'prod.hero.title.1': 'Catálogo',
    'prod.hero.title.2': 'de Productos.',
    'prod.hero.body':
      'Soluciones modulares diseñadas bajo estrictos criterios de ergonomía, ingeniería aplicada y desempeño en uso intensivo.',
    'prod.filter.title': 'Catálogo · Filtros',
    'prod.sort_by': 'Ordenar por',
    'prod.count_label_all': 'Todas las categorías',
    'prod.count_label_n': 'productos',
    // Catalog category names
    'prod.cat.silloneria': 'Sillonería',
    'prod.cat.escritorios': 'Escritorios + Estaciones de trabajo',
    'prod.cat.mesas': 'Mesas',
    'prod.cat.almacenamiento': 'Almacenamiento',
    'prod.cat.divisiones': 'Divisiones de ambientes',
    'prod.cat.recepciones': 'Recepciones',
    // Detail
    'pd.contact_advisor': 'Contactar asesor',
    'pd.bim_cad': 'BIM / CAD',
    'pd.tech_features': 'Características técnicas',
    'pd.dimensions': 'Dimensiones generales',
    'pd.dim.height': 'Altura total',
    'pd.dim.width': 'Ancho total',
    'pd.dim.depth': 'Profundidad',
    'pd.dim.tolerance': 'Tolerancia',
    'pd.dim.weight': 'Peso',
    'pd.dim.load': 'Carga máx.',
    'pd.docs': 'Documentos & recursos',
    'pd.doc.sheet': 'Ficha técnica',
    'pd.doc.3d': 'Modelo 3D',
    'pd.doc.revit': 'Modelo Revit',
    'pd.doc.cad': 'Plano CAD',
    'pd.doc.soon': '· próximamente',
    'pd.related.eyebrow': 'Línea modular',
    'pd.related.title': 'Productos relacionados.',
    'pd.photo': 'FOTOGRAFÍA_ESTUDIO',

    // ====== FOOTER ======
    'footer.manifesto.line1': 'Ingeniería',
    'footer.manifesto.line2': 'para el trabajo.',
    'footer.manifesto.line3': 'Diseñado para durar.',
    'footer.intro':
      'Mobiliario corporativo diseñado para el trabajo real. Diseño funcional, ingeniería aplicada y fabricación industrial.',
    'footer.address.line1': 'Quito · Ecuador',
    'footer.address.line2': '',
    'footer.col.productos': 'Productos',
    'footer.col.company': 'Compañía',
    'footer.col.resources': 'Recursos',
    'footer.bottom.tagline': 'Diseño Industrial, Rendimiento Real',
    'footer.terms': 'Términos',
    'footer.privacy': 'Privacidad',
    'footer.cookies': 'Cookies',
    'footer.related': 'Relacionado',
    'footer.cat.2026': 'CAT_2026',
    'footer.all_products': 'Ver todos los productos',
  },

  en: {
    // ====== NAV ======
    'nav.nuevo': 'New',
    'nav.productos': 'Products',
    'nav.colecciones': 'Collections',
    'nav.espacios': 'Spaces',
    'nav.portafolio': 'Portfolio',
    'nav.investigacion': 'Research',
    'nav.sobre': 'About MAACH',
    'nav.contacto': 'Contact',

    // ====== COMMON CTAs ======
    'cta.explore': 'Explore catalog',
    'cta.spec': 'Start your project',
    'cta.scroll': 'Scroll to discover',
    'cta.contact': 'Start project',
    'cta.engineering': 'Contact engineering',
    'cta.see_all': 'See all',
    'cta.discover': 'Discover',
    'cta.read': 'Read article',
    'cta.view_details': 'View details',
    'cta.view_products': 'View products',
    'cta.see_portfolio': 'View portfolio',
    'cta.see_catalog': 'See full catalog',
    'cta.start_planning': 'Start planning',
    'cta.see_case_studies': 'See case studies',
    'cta.send_message': 'Send message',
    'cta.continue': 'Continue',
    'cta.see_all_articles': 'All articles',
    'cta.next_project': 'Next project',
    'common.advice': 'Specialist consulting',
    'common.fall_winter': '— Fall / Winter',

    // ====== HOME ======
    'home.hero.tag': 'System 2026 / ID: MAACH-01',
    'home.hero.h1.1': 'Industrial',
    'home.hero.h1.2': 'Design,',
    'home.hero.h1.3': 'Real',
    'home.hero.h1.4': 'Performance.',
    'home.hero.estudio_caso': 'CASE_STUDY / 01',
    'home.hero.disponible': '+ AVAILABLE',
    // Categorías section
    'home.cat.eyebrow': 'System',
    'home.cat.title': 'Categories.',
    'home.cat.01.name': 'Seating',
    'home.cat.01.desc': 'Technical ergonomics, executive, operative chairs and sofas.',
    'home.cat.02.name': 'Desks + Workstations',
    'home.cat.02.desc': 'Modular systems, operative and height-adjustable desks.',
    'home.cat.03.name': 'Tables',
    'home.cat.03.desc': 'Meeting tables, collaborative and side tables.',
    'home.cat.04.name': 'Storage',
    'home.cat.04.desc': 'Credenzas, mobile filing, lockers and bookshelves.',
    'home.cat.05.name': 'Partitions',
    'home.cat.05.desc': 'Floor-to-ceiling modular systems and glass partitions.',
    'home.cat.06.name': 'Architecture',
    'home.cat.06.desc': 'Modular walls, pods and dividers for high density.',
    // ADN industrial
    'home.adn.eyebrow': 'Philosophy',
    'home.adn.title.1': 'Industrial',
    'home.adn.title.2': 'DNA.',
    'home.adn.intro': 'Every decision answers to engineering, durability and long-term performance.',
    'home.adn.01.title': 'Structural Integrity',
    'home.adn.01.body':
      'Solid engineering for intensive use. Furniture that does not deform and holds its properties for years.',
    'home.adn.02.title': 'Conscious Functionality',
    'home.adn.02.body':
      'Design focused on real operating demands. If a part does not serve a technical purpose, it is removed from the scheme.',
    'home.adn.03.title': 'Modular Scalability',
    'home.adn.03.body':
      'Systems built to grow and reconfigure. Components integrated through engineered nodes.',
    'home.adn.04.title': 'Co-design with architects',
    'home.adn.04.body':
      'We work alongside studios and clients to solve specific technical requirements. Design is built together.',
    // Casos de Estudio
    'home.cases.eyebrow': 'Portfolio',
    'home.cases.title': 'Case Studies.',
    // Clientes
    'home.clientes.eyebrow': 'Clients',
    'home.clientes.title.1': 'Industrial',
    'home.clientes.title.2': 'trust.',
    'home.clientes.count': '+22 organizations · Ecuador',
    'home.clientes.footnote': 'Brands and organizations MAACH has worked with · 2018 — 2026',
    // Precisión Industrial
    'home.precision.eyebrow': 'Project directive',
    'home.precision.title.1': 'Industrial',
    'home.precision.title.2': 'Precision.',
    'home.precision.row1.k': 'INSTALLED CAPACITY',
    'home.precision.row1.v': 'HIGH VOLUME',
    'home.precision.row2.k': 'TOLERANCE',
    'home.precision.row2.v': '± 2 MM',
    'home.precision.row3.k': 'EXECUTION',
    'home.precision.row3.v': 'IMMEDIATE',
    'home.precision.row4.k': 'WARRANTY',
    'home.precision.row4.v': '10 YEARS',
    'home.spec.eyebrow': 'Technical contact',
    'home.spec.title': 'Start Specification',
    'home.spec.body':
      'Our project engineering team adapts MAACH systems to your architectural plans and spatial requirements.',

    // ====== ESPACIOS ======
    'esp.hero.eyebrow': 'MAACH · PLANNING 2026',
    'esp.hero.section': 'Spaces',
    'esp.hero.title.1': 'Sp',
    'esp.hero.title.2': 'aces.',
    'esp.hero.body':
      'Integral solutions that turn square meters into productive, coherent environments ready to scale.',
    'esp.stat.tipologias': 'Typologies',
    'esp.stat.sistemas': 'Systems',
    'esp.stat.configs': 'Configs.',
    'esp.stat.acabados': 'Finishes',
    'esp.typ.eyebrow': 'Typologies',
    'esp.typ.title.1': 'Four',
    'esp.typ.title.2': 'typologies.',
    'esp.typ.count': '04 spaces · MAACH System',
    'esp.typ.01.name': 'Coworking Area',
    'esp.typ.01.desc':
      'A modern coworking space combines functionality, comfort and design to create dynamic, efficient work environments. Ergonomic desks and modular workstations adapt to different needs, while ergonomic chairs provide support and comfort during long workdays.',
    'esp.typ.01.products':
      'Workstations · Operative desk · Operative chair · Mobile pedestal',
    'esp.typ.02.name': 'Meeting Rooms',
    'esp.typ.02.desc':
      'Modern meeting rooms are designed to foster communication, concentration and collaboration in a professional, comfortable environment. Meeting tables are the centerpiece, available in formats and sizes that adapt to executive meetings, creative sessions or video conferences. Ergonomic chairs complement the space, offering comfort and support during long encounters.',
    'esp.typ.02.products':
      'Meeting table · Operative chairs · Credenzas · Modular dividers',
    'esp.typ.03.name': 'Waiting Areas',
    'esp.typ.03.desc':
      'A reception area with waiting space is designed to deliver a comfortable, organized and professional experience from the first moment. Reception counters enable efficient, orderly service, while sofas, armchairs and waiting chairs provide comfort to visitors and clients. Auxiliary tables complete the space, adding functionality and visual balance.',
    'esp.typ.03.products':
      'Reception · Collaborative table · Manager chair · Sofa',
    'esp.typ.04.name': 'Archive Areas',
    'esp.typ.04.desc':
      'Archive areas are designed to keep documents and work materials organized, secure and accessible. Metal filing cabinets, drawer units and modular shelves classify and store information efficiently, optimizing space use and facilitating daily administrative tasks.',
    'esp.typ.04.products':
      'Mobile filing · High bookshelf · Lockers',
    'esp.typ.tipologia_label': 'TYPOLOGY',
    'esp.typ.products_label': 'Products used',
    'esp.proc.eyebrow': 'Process',
    'esp.proc.title.1': 'How we plan',
    'esp.proc.title.2': 'a space.',
    'esp.proc.subtitle': 'From the first architectural plan to final installation, in four phases.',
    'esp.proc.01.title': 'Diagnosis',
    'esp.proc.01.body':
      'We survey the existing space, analyze work flows and interview the team to understand real usage.',
    'esp.proc.02.title': 'Design',
    'esp.proc.02.body':
      'Layout proposals, 3D rendering and MAACH typology selection. We iterate with architects and interior designers.',
    'esp.proc.03.title': 'Specification',
    'esp.proc.03.body':
      'Tech sheets, CAD/BIM drawings and final quantification. Zero ambiguity in what gets installed.',
    'esp.proc.04.title': 'Installation',
    'esp.proc.04.body':
      'Logistics, assembly and tuning. In-house MAACH team coordinated with the site and the client.',
    'esp.del.eyebrow': 'Deliverables',
    'esp.del.title': 'What we deliver.',
    'esp.del.01': 'Space survey',
    'esp.del.02': 'Architectural plan',
    'esp.del.03': 'Photoreal 3D render',
    'esp.del.04': 'Furniture selection',
    'esp.del.05': 'CAD / BIM drawings',
    'esp.del.06': 'Turnkey installation',
    'faq.eyebrow': 'FAQ · Consulting',
    'faq.title': 'Questions about designing your space?',
    'faq.subtitle': "We've got answers.",
    'faq.cta': 'Talk to an advisor',
    'esp.cta.eyebrow': 'Specialist consulting',
    'esp.cta.title.1': 'Need help',
    'esp.cta.title.2': 'planning',
    'esp.cta.title.3': 'a space?',
    'esp.cta.body':
      'We work alongside architects and interior designers. We share architectural plans, 3D renders and integrated furniture proposals.',
    'esp.cta.response_in': 'Response in',

    // ====== PORTAFOLIO ======
    'port.hero.eyebrow': 'MAACH · PORTFOLIO 2026',
    'port.hero.section': 'Projects · 2024 — 2026',
    'port.hero.title.1': 'Port',
    'port.hero.title.2': 'folio.',
    'port.hero.body': 'A selection of projects where architectural design and industrial functionality converge.',
    'port.m.completed': 'Completed projects',
    'port.m.countries': 'Countries served',
    'port.m.installed': 'm² installed',
    'port.m.recurring': 'Returning clients',
    'port.discover': 'Discover project',
    // Detail
    'pdet.phase01.eyebrow': 'PHASE 01 · CHALLENGE',
    'pdet.phase01.title': 'The Challenge.',
    'pdet.phase01.lead':
      'A space to encourage spontaneous collaboration and deep focus, respecting the original architecture of the building and maximizing natural light.',
    'pdet.phase01.body':
      'The project required an integral furniture solution adaptable to different work modes. Benching systems for operative areas combined with soft seating zones for informal meetings.',
    'pdet.phase02.eyebrow': 'PHASE 02 · PROPOSAL',
    'pdet.phase02.title': 'Value Proposal.',
    'pdet.phase02.lead':
      'Integration of the MAACH-02 collection to achieve a cohesive aesthetic across operative and executive zones.',
    'pdet.phase02.b1': 'Certified ergonomic seating to reduce postural fatigue on high-performance days.',
    'pdet.phase02.b2': 'Thermoacoustic panels in benching areas for noise control on open floors.',
    'pdet.phase02.b3':
      'Natural wood finishes and textured textiles that bring warmth to the corporate environment.',
    'pdet.phase02.b4': 'Hidden tech integration in meeting tables and modular workstations.',
    'pdet.phase03.eyebrow': 'PHASE 03 · RESULT',
    'pdet.phase03.title': 'The Result.',
    'pdet.phase03.metric': 'KEY METRIC',
    'pdet.phase03.metric.body':
      'Increase in collaborative-space utilization per client report, 6 months post-install.',
    'pdet.phase03.lead':
      'A dynamic work ecosystem that responds to the organization’s current needs and prepares it for future growth.',
    'pdet.phase03.body':
      'The delivered solution transformed how teams interact day-to-day. The soft seating zones became the creative core, while operative stations provide the focus and privacy required.',
    'pdet.phase03.delivery': 'Delivery time',
    'pdet.phase03.delivery.value': '16 weeks',
    'pdet.phase03.pieces': 'Pieces installed',
    'pdet.phase03.pieces.value': '284 units',
    'pdet.gallery.eyebrow': 'Gallery',
    'pdet.gallery.title': 'Installation views.',
    'pdet.next': 'Next project',
    'pdet.continue': 'Continue',
    'pdet.sector': 'Sector',
    'pdet.arch': 'Architecture',
    'pdet.area': 'Surface',
    'pdet.year': 'Year',
    'pdet.status': 'Status',
    'pdet.status.value': 'Completed',
    'pdet.spec_sheet': 'TECH SHEET',

    // ====== INVESTIGACIÓN ======
    'inv.hero.eyebrow': 'MAACH · WORK INSIGHTS 2026',
    'inv.hero.section': 'Research',
    'inv.hero.title.1': 'Research',
    'inv.hero.title.2': 'and context.',
    'inv.hero.body':
      'The design of our furniture does not come from intuition but from systematic observation and analysis of how work dynamics change globally.',
    'inv.quote.body': '68% of offices today require configurations adaptable to hybrid teams.',
    'inv.quote.source': '— MAACH Work Insights Report 2025',
    'inv.list.eyebrow': 'Editorial · MAACH Research',
    'inv.list.title.1': 'Recommended',
    'inv.list.title.2': 'reading.',
    'inv.list.count': '03 articles · MAACH 2026',
    'inv.manifesto.eyebrow': 'Manifesto · MAACH 2026',
    'inv.manifesto.body.1': '"We research real work to design',
    'inv.manifesto.body.2': ' furniture that responds',
    'inv.manifesto.body.3': ' to its true demands — not aesthetic trends."',
    'inv.manifesto.source': '— MAACH Research Team',
    'blog.read': 'Read article',
    'blog.next_step': 'Next step',
    'blog.read_too': 'Want to go deeper?',
    'blog.read_too.title': 'Read also.',

    // ====== RECURSOS ======
    'rec.hero.eyebrow': 'MAACH · RESOURCES 2026',
    'rec.hero.section': 'Library',
    'rec.hero.crumb.home': 'Home',
    'rec.hero.crumb.section': 'Design resources',
    'rec.hero.crumb.current': 'Library',
    'rec.hero.title.1': 'Document',
    'rec.hero.title.2': 'Library.',
    'rec.hero.body': 'Download brochures, tech specs, product sheets, CAD drawings and 3D / BIM models.',
    'rec.filter.type': 'Document type',
    'rec.filter.docs_guides': 'Documents & guides',
    'rec.filter.apply': 'APPLY FILTER',
    'rec.filter.search': 'Search',
    'rec.filter.clear': 'Clear',
    'rec.filter.search_placeholder': 'search...',
    'rec.filter.refine': 'Refine results',
    'rec.filter.show_more': '+ Show more',
    'rec.col.type': 'Type',
    'rec.col.name': 'Document name',
    'rec.col.product': 'Product',
    'rec.col.size': 'Size',
    'rec.col.select': 'SELECT',
    'rec.footer.selected': 'selected',
    'rec.footer.download_selection': 'Download selection',

    // ====== CONTACTO ======
    'cont.tag': 'MAACH · CONTACT',
    'cont.hero.title.1': "Let's talk",
    'cont.hero.title.2': 'about your project.',
    'cont.hero.body':
      'We develop large-scale technical furniture solutions. We integrate our systems directly into your architectural plans.',
    'cont.stat.response': 'Response',
    'cont.stat.location': 'Location',
    'cont.stat.direct_lines': 'Direct lines',
    'cont.right.eyebrow': 'Project engineering team',
    'cont.right.title.1': 'On your site,',
    'cont.right.title.2': 'from the plan.',
    'cont.right.tag': 'QUITO · ECUADOR',
    'cont.form.eyebrow': 'Form · Start the conversation',
    'cont.form.title': 'Write to us.',
    'cont.form.response': 'Response < 24 hrs',
    'cont.form.name': 'Full name *',
    'cont.form.name_ph': 'Roberto A. Salgado',
    'cont.form.email': 'Email *',
    'cont.form.email_ph': 'r.salgado@company.com',
    'cont.form.company': 'Company',
    'cont.form.company_ph': 'Studio Alba',
    'cont.form.message': 'Message *',
    'cont.form.message_ph': 'Tell us about your project: estimated volume, timeline, location, approx. m²...',
    'cont.form.privacy': 'I accept the privacy policy',
    'cont.side.info': 'Contact information',
    'cont.side.phones': 'Phones',
    'cont.side.response_time': 'Response time',
    'cont.side.response_for': 'For technical requests',

    // ====== SOBRE MAACH ======
    'about.brandbook': 'Brandbook',
    'about.section': 'Brand Strategy',
    'about.hero.h1':
      'Design and build furniture that works for real work.',
    'about.hero.h1.1': 'Design and build',
    'about.hero.h1.2': 'furniture',
    'about.hero.h1.3': 'that works for',
    'about.hero.h1.4': 'real work.',
    'about.hero.tag': 'ABOUT MAACH',
    'about.hero.season': 'STUDIO · MANIFESTO 2026',
    'about.hero.id.code': 'MCH-ABOUT-01',
    'about.hero.id.badge': 'EST. 2023 — QUITO',
    'about.hero.vertical': 'MAACH · ABOUT US · 2026',
    'about.hero.meta.1': 'INDUSTRIAL CO-DESIGN',
    'about.hero.meta.2': 'METAL + WOOD',
    'about.hero.meta.3': '30+ YEARS',
    'about.mv.eyebrow': 'Mission / Vision',
    'about.mv.mision.label': 'Mission',
    'about.mv.mision.body':
      'We are manufacturers and design partners for workspaces; we co-create and produce furniture that inspires and endures, made locally by skilled hands and advanced technological processes, to help companies be more productive and their teams feel better.',
    'about.mv.vision.label': 'Vision',
    'about.mv.vision.body':
      'To be the Latin American reference for furniture co-created and manufactured locally with international standards — improving productivity and wellbeing through continuous innovation, technology and creativity, driving Ecuadorian industry and talent into the world.',
    'about.sobre.eyebrow': 'About Us',
    'about.sobre.title': 'About us.',
    'about.sobre.body.1':
      'MAACH designs and manufactures corporate furniture based on solid industrial processes, engineering criteria and a deep understanding of real use in workspaces.',
    'about.sobre.body.2':
      'Every decision answers to structure, ergonomics, durability and long-term performance.',
    'about.sobre.body.3':
      'Through co-design with architects, interior designers and clients, we develop adaptable solutions that integrate materials, technology and local production with international standards.',
    'about.sobre.body.4':
      'We design spaces that work day to day, improve productivity and elevate the experience of the people who use them.',
    'about.values.eyebrow': 'Values',
    'about.values.title': 'How we work.',
    'about.value.01.title': 'Functional design',
    'about.value.01.body':
      'Every design decision answers a real use need. Form exists to fulfill a function and improve daily performance at work.',
    'about.value.02.title': 'Applied engineering',
    'about.value.02.body':
      'The brand is built on solid industrial processes, technical precision and production control. Engineering guarantees durability and consistency.',
    'about.value.03.title': 'Collaborative co-design',
    'about.value.03.body':
      'MAACH works alongside architects, interior designers and clients to develop adaptable solutions. Design is a shared process.',
    'about.value.04.title': 'Lasting quality',
    'about.value.04.body':
      'Products built to withstand intensive use and remain relevant over time. Durability is a central criterion in materials and construction.',
    'about.value.05.title': 'Ergonomics and wellbeing',
    'about.value.05.body':
      'Furniture designed considering the relationship between body, space and work. Comfort and user experience are part of performance.',
    'about.value.06.title': 'Manufacturing with vision',
    'about.value.06.body':
      'We integrate local production with international standards, blending efficiency, technology and responsibility for current demands.',
    'about.value.label': 'VALUE',
    'about.manifesto.eyebrow': 'MAACH · MANIFESTO',
    'about.manifesto.body.1': '"We do not design objects to',
    'about.manifesto.body.2': ' decorate spaces ',
    'about.manifesto.body.3': '— we design',
    'about.manifesto.body.4': ' structural tools ',
    'about.manifesto.body.5': 'that enable work."',
    'about.manifesto.source': 'MAACH Studio · 2026',
    'about.history.eyebrow': 'Trajectory',
    'about.history.title': 'Our History.',
    'about.history.body.1':
      'MAACH was born three years ago as the commercial unit of Sumar, a family business with more than 30 years of experience manufacturing corporate furniture.',
    'about.history.body.2':
      'From the start, the proposition has been distinguished by the combination of metal and wood — balancing durability, design and ergonomics.',
    'about.history.body.3':
      'Over time, MAACH has evolved to consolidate as a brand that not only manufactures, but understands how people work today and how spaces should respond.',
    'about.history.stat.years': 'years of experience',
    'about.history.stat.brand': 'years as a brand',
    'about.team.eyebrow': 'Organizational Structure',
    'about.team.title': 'Team.',
    'about.team.join': 'Join the team',
    'about.team.portrait': 'MAACH_TEAM',
    'about.team.role.01': 'General Manager',
    'about.team.role.02': 'Commercial Manager',
    'about.team.role.03': 'Account Executive',
    'about.team.role.04': 'Architectural Design',
    'about.team.role.05': 'Production Manager',
    'about.team.role.06': 'Furniture Production Lead',
    'about.team.role.07': 'Installation Lead',
    'about.allies.eyebrow': 'Partner Network',
    'about.allies.title': 'Our Allies.',
    'about.allies.body':
      'We work with strategic partners in raw materials, components and technical specialties to guarantee quality and consistency in every product.',

    // ====== PRODUCTOS ======
    'prod.crumb.home': 'Home',
    'prod.crumb.catalog': 'Catalog',
    'prod.hero.title.1': 'Product',
    'prod.hero.title.2': 'Catalog.',
    'prod.hero.body':
      'Modular solutions designed under strict criteria of ergonomics, applied engineering and intensive-use performance.',
    'prod.filter.title': 'Catalog · Filters',
    'prod.sort_by': 'Sort by',
    'prod.count_label_all': 'All categories',
    'prod.count_label_n': 'products',
    'prod.cat.silloneria': 'Seating',
    'prod.cat.escritorios': 'Desks + Workstations',
    'prod.cat.mesas': 'Tables',
    'prod.cat.almacenamiento': 'Storage',
    'prod.cat.divisiones': 'Room partitions',
    'prod.cat.recepciones': 'Reception',
    'pd.contact_advisor': 'Contact advisor',
    'pd.bim_cad': 'BIM / CAD',
    'pd.tech_features': 'Technical features',
    'pd.dimensions': 'General dimensions',
    'pd.dim.height': 'Total height',
    'pd.dim.width': 'Total width',
    'pd.dim.depth': 'Depth',
    'pd.dim.tolerance': 'Tolerance',
    'pd.dim.weight': 'Weight',
    'pd.dim.load': 'Max. load',
    'pd.docs': 'Documents & resources',
    'pd.doc.sheet': 'Tech sheet',
    'pd.doc.3d': '3D model',
    'pd.doc.revit': 'Revit model',
    'pd.doc.cad': 'CAD plan',
    'pd.doc.soon': '· coming soon',
    'pd.related.eyebrow': 'Modular line',
    'pd.related.title': 'Related products.',
    'pd.photo': 'STUDIO_PHOTO',

    // ====== FOOTER ======
    'footer.manifesto.line1': 'Engineered',
    'footer.manifesto.line2': 'for work.',
    'footer.manifesto.line3': 'Designed to last.',
    'footer.intro':
      'Corporate furniture designed for real work. Functional design, applied engineering and industrial manufacturing.',
    'footer.address.line1': 'Quito · Ecuador',
    'footer.address.line2': '',
    'footer.col.productos': 'Products',
    'footer.col.company': 'Company',
    'footer.col.resources': 'Resources',
    'footer.bottom.tagline': 'Industrial Design, Real Performance',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.cookies': 'Cookies',
    'footer.related': 'Related',
    'footer.cat.2026': 'CAT_2026',
    'footer.all_products': 'See all products',
  },
};

type Key = keyof (typeof T)['es'];

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: Key | (string & {})) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = 'maach.lang';

function readInitial(): Lang {
  if (typeof window === 'undefined') return 'es';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'es' || stored === 'en') return stored;
  return 'es';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback<I18nValue['t']>(
    (key) => {
      const dict = T[lang] as Dict;
      return dict[key as string] ?? (T.es as Dict)[key as string] ?? String(key);
    },
    [lang],
  );

  const value = useMemo<I18nValue>(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const v = useContext(I18nContext);
  if (!v) throw new Error('useI18n must be used inside <I18nProvider>');
  return v;
}

export const useT = () => useI18n().t;
