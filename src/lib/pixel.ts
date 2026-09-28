// Meta Pixel: el script se carga en index.html. Aquí solo se disparan eventos
// de forma segura (si el bloqueador de anuncios lo impide, no pasa nada).
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function pixel(evento: string, datos?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  if (datos) window.fbq('track', evento, datos);
  else window.fbq('track', evento);
}
