import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

/**
 * A trailing ring that follows the native cursor. The native cursor stays
 * visible, so nothing about pointer accuracy changes. Disabled on touch
 * devices and under reduced motion.
 */
export default function CustomCursor() {
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setEnabled(fine && !prefersReduced);
  }, [prefersReduced]);

  useEffect(() => {
    if (!enabled) return undefined;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let raf;

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const interactive = event.target.closest('a, button, input, textarea, [role="button"]');
      ringRef.current?.classList.toggle('scale-[1.7]', Boolean(interactive));
      ringRef.current?.classList.toggle('opacity-90', Boolean(interactive));
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.x - 16}px, ${current.y - 16}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] h-8 w-8 rounded-full border border-violet-400/45
                 opacity-50 transition-[transform,opacity] duration-200 will-change-transform"
    />
  );
}
