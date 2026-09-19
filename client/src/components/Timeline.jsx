import { motion } from 'framer-motion';
import { fadeUp, revealOnce, stagger } from '../utils/motion.js';

/**
 * Vertical timeline. Items must be genuinely sequential for this shape to
 * make sense — it is used for education and the development journey.
 */
export default function Timeline({ items }) {
  return (
    <motion.ol
      variants={stagger(0, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={revealOnce}
      className="relative space-y-8 border-l border-white/[0.08] pl-6 sm:pl-8"
    >
      {items.map((item, index) => (
        <motion.li key={`${item.label}-${index}`} variants={fadeUp} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full border border-violet-400/50 bg-ink
                       sm:-left-[2.1rem]"
          >
            <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-violet-400 to-electric-500" />
          </span>

          <p className="font-mono text-xs text-violet-400/80">{item.label}</p>
          <h3 className="mt-1.5 font-display text-lg font-semibold">{item.title}</h3>
          {item.subtitle && <p className="mt-0.5 text-sm text-gray-400">{item.subtitle}</p>}
          {item.detail && <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-500">{item.detail}</p>}
        </motion.li>
      ))}
    </motion.ol>
  );
}
