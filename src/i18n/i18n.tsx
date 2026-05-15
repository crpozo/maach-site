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

// Translation dictionary. Keys are plain English-ish identifiers.
// Add keys here when wiring new translatable strings.
const T: Translations = {
  es: {
    // Nav links (kept in Spanish even when site is EN — brand has Spanish identity)
    'nav.nuevo': 'Nuevo',
    'nav.productos': 'Productos',
    'nav.colecciones': 'Colecciones',
    'nav.espacios': 'Espacios',
    'nav.portafolio': 'Portafolio',
    'nav.investigacion': 'Investigación',
    'nav.sobre': 'Sobre MAACH',
    'nav.contacto': 'Contacto',

    // Generic buttons / CTAs
    'cta.explore': 'Explorar catálogo',
    'cta.spec': 'Iniciar especificación',
    'cta.scroll': 'Scroll para descubrir',
    'cta.contact': 'Iniciar proyecto',
    'cta.engineering': 'Contactar ingeniería',
    'cta.see_all': 'Ver todos',
    'cta.discover': 'Descubrir',
    'cta.read': 'Leer artículo',
    'cta.view_details': 'Ver detalles',

    // Footer
    'footer.manifesto.line1': 'Engineered',
    'footer.manifesto.line2': 'for work.',
    'footer.manifesto.line3': 'Designed to last.',
    'footer.intro':
      'Mobiliario corporativo diseñado para el trabajo real. Diseño funcional, ingeniería aplicada y fabricación industrial.',
    'footer.address.line1': 'Av. Industrial 450 · Parque Tecnológico',
    'footer.address.line2': 'C.P. 10293 · Ciudad de México, CDMX',
    'footer.col.productos': 'Productos',
    'footer.col.company': 'Compañía',
    'footer.col.resources': 'Recursos',
    'footer.bottom.tagline': 'Industrial Design, Real Performance',
    'footer.terms': 'Términos',
    'footer.privacy': 'Privacidad',
    'footer.cookies': 'Cookies',

    // Homepage hero
    'home.hero.tag': 'Sistema 2026 / ID: MAACH-01',
    'home.hero.season': '— Otoño / Invierno',

    // Doubts FAQ block
    'faq.title': '¿Dudas para diseñar tu espacio?',
    'faq.subtitle': 'Aquí las resolvemos.',
    'faq.cta': 'Hablar con un asesor',
  },
  en: {
    'nav.nuevo': 'New',
    'nav.productos': 'Products',
    'nav.colecciones': 'Collections',
    'nav.espacios': 'Spaces',
    'nav.portafolio': 'Portfolio',
    'nav.investigacion': 'Research',
    'nav.sobre': 'About MAACH',
    'nav.contacto': 'Contact',

    'cta.explore': 'Explore catalog',
    'cta.spec': 'Start specification',
    'cta.scroll': 'Scroll to discover',
    'cta.contact': 'Start project',
    'cta.engineering': 'Contact engineering',
    'cta.see_all': 'See all',
    'cta.discover': 'Discover',
    'cta.read': 'Read article',
    'cta.view_details': 'View details',

    'footer.manifesto.line1': 'Engineered',
    'footer.manifesto.line2': 'for work.',
    'footer.manifesto.line3': 'Designed to last.',
    'footer.intro':
      'Corporate furniture designed for real work. Functional design, applied engineering and industrial manufacturing.',
    'footer.address.line1': 'Av. Industrial 450 · Technology Park',
    'footer.address.line2': 'C.P. 10293 · Mexico City, CDMX',
    'footer.col.productos': 'Products',
    'footer.col.company': 'Company',
    'footer.col.resources': 'Resources',
    'footer.bottom.tagline': 'Industrial Design, Real Performance',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.cookies': 'Cookies',

    'home.hero.tag': 'System 2026 / ID: MAACH-01',
    'home.hero.season': '— Fall / Winter',

    'faq.title': 'Questions about designing your space?',
    'faq.subtitle': "We've got answers.",
    'faq.cta': 'Talk to an advisor',
  },
};

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof (typeof T)['es']) => string;
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

  const t = useCallback(
    (key: keyof (typeof T)['es']) => {
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
