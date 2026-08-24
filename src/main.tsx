import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { I18nProvider } from './i18n/i18n';
import { cargarContenido } from './lib/contenido';

// Strip trailing slash so basename like "/maach-site/" → "/maach-site".
// In dev (base "/"), this becomes "" → no basename, which is correct.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

// El contenido editable se carga antes de pintar para que no se vea primero
// el texto compilado y luego el editado.
await cargarContenido();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </I18nProvider>
  </StrictMode>,
);
