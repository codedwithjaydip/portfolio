import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';

export default function MainLayout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
