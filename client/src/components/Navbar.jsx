import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import Container from './Container.jsx';
import SocialLinks from './SocialLinks.jsx';
import { useScrolled } from '../hooks/useScrolled.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';
import { cn } from '../utils/cn.js';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];
const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);
  const activeId = useScrollSpy(SECTION_IDS);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onHome = pathname === '/';

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    // A manual offset calculation is more reliable across mobile browsers
    // than relying on scrollIntoView + CSS scroll-margin-top alone,
    // especially with a fixed navbar overlapping the top of the page.
    const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const goToSection = (id) => {
    if (!onHome) {
      setOpen(false);
      navigate(`/#${id}`);
      return;
    }
    // Scroll first, then close the mobile menu on the next frame. Closing
    // the menu and starting the scroll in the same instant let the menu's
    // collapse animation swallow the scroll on some mobile browsers.
    scrollToSection(id);
    requestAnimationFrame(() => setOpen(false));
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open ? 'border-b border-white/[0.07] bg-ink/70 backdrop-blur-xl' : 'border-b border-transparent'
      )}
    >
      <Container>
        <nav aria-label="Main" className="flex h-16 items-center justify-between gap-6">
          <Link
            to="/"
            className="font-display text-lg font-bold tracking-tight text-white"
            onClick={() => setOpen(false)}
          >
            Jaydip
            <span className="text-violet-400">.</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => {
              const active = onHome && activeId === link.id;
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => goToSection(link.id)}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'relative rounded-lg px-3 py-2 text-sm transition-colors',
                      active ? 'text-white' : 'text-gray-400 hover:text-white'
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-violet-500 to-electric-500"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <SocialLinks className="hidden sm:flex" size={17} />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.09] bg-white/[0.03] text-gray-300 md:hidden"
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-ink md:hidden"
          >
            <Container className="py-3">
              <ul className="flex flex-col">
                {LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => goToSection(link.id)}
                      className="w-full rounded-lg px-2 py-3 text-left text-base text-gray-300 hover:bg-white/[0.04] hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
              <SocialLinks className="mt-3 sm:hidden" showEmail />
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
