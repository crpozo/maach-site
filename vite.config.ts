import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // Subpath for GitHub Pages (https://crpozo.github.io/maach-site/).
  // For deploys at the root domain (custom domain / Vercel / Netlify),
  // override with `vite build --base=/`.
  base: '/maach-site/',
  plugins: [react()],
});
