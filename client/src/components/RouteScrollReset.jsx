import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Sends every new route to the top, but leaves in-page hash links alone. */
export default function RouteScrollReset() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname, hash]);

  return null;
}
