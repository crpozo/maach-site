import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PageHome from './pages/PageHome';
import PageNuevo from './pages/PageNuevo';
import PageProducts from './pages/PageProducts';
import PageProductDetail from './pages/PageProductDetail';
import PageCategory from './pages/PageCategory';
import PageColecciones from './pages/PageColecciones';
import PageColeccionDetail from './pages/PageColeccionDetail';
import PageEspacios from './pages/PageEspacios';
import PagePortafolio from './pages/PagePortafolio';
import PagePortafolioDetail from './pages/PagePortafolioDetail';
import PageInvestigacion from './pages/PageInvestigacion';
import PageBlogPost from './pages/PageBlogPost';
import PageRecursos from './pages/PageRecursos';
import PageAbout from './pages/PageAbout';
import PageContacto from './pages/PageContacto';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/nuevo" element={<PageNuevo />} />
        <Route path="/productos" element={<PageProducts />} />
        <Route path="/categorias/:slug" element={<PageCategory />} />
        <Route path="/productos/:category/:id" element={<PageProductDetail />} />
        <Route path="/colecciones" element={<PageColecciones />} />
        <Route path="/colecciones/:id" element={<PageColeccionDetail />} />
        <Route path="/espacios" element={<PageEspacios />} />
        <Route path="/portafolio" element={<PagePortafolio />} />
        <Route path="/portafolio/:id" element={<PagePortafolioDetail />} />
        <Route path="/investigacion" element={<PageInvestigacion />} />
        <Route path="/investigacion/:slug" element={<PageBlogPost />} />
        <Route path="/recursos-diseno/biblioteca" element={<PageRecursos />} />
        <Route path="/sobre-maach" element={<PageAbout />} />
        <Route path="/contacto" element={<PageContacto />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
