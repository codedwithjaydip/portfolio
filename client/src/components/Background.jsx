import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

/**
 * Page background: a fixed grid, two blurred colour fields, and a soft glow
 * that tracks the pointer. Everything is behind aria-hidden and pointer-events
 * none, and the pointer glow is skipped entirely under reduced motion.
 */
export default function Background() {
  const glowRef = useRef(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced || window.matchMedia('(pointer: coarse)').matches) return undefined;

    let frame = 0;
    const onMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${event.clientX - 300}px, ${event.clientY - 300}px, 0)`;
        }
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [prefersReduced]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
      />

      <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-violet-600/[0.13] blur-[130px] motion-safe:animate-drift" />
      <div className="absolute -right-32 top-[28rem] h-[30rem] w-[30rem] rounded-full bg-electric-600/[0.11] blur-[130px] motion-safe:animate-drift [animation-delay:2.5s]" />

      {!prefersReduced && (
        <div
          ref={glowRef}
          className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-violet-500/[0.055] blur-[100px] will-change-transform"
        />
      )}
    </div>
  );
}
