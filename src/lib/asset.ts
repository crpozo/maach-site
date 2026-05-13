// Resolve a public-folder asset path against Vite's BASE_URL so it works
// at both the dev root ("/") and a deployed subpath ("/maach-site/").
//
// Usage:
//   <img src={asset('biblioteca-1.webp')} />
//   <img src={asset(`biblioteca-${n}.webp`)} />
export const asset = (relativePath: string): string =>
  `${import.meta.env.BASE_URL}assets/${relativePath.replace(/^\/?(assets\/)?/, '')}`;
