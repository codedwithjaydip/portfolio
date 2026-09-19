/**
 * Shared Framer Motion variants. Keeping them here means timing stays
 * consistent across sections instead of being re-invented per component.
 */

export const spring = { type: 'spring', stiffness: 260, damping: 28, mass: 0.9 };

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.07) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

/** Viewport config used for scroll reveals — reveals once, slightly early. */
export const revealOnce = { once: true, margin: '0px 0px -12% 0px' };
