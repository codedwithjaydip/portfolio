import { motion } from 'framer-motion';
import { fadeUp, revealOnce } from '../utils/motion.js';

/**
 * Section headings carry an index because the page reads as an ordered
 * narrative; the number is structural, not decoration.
 */
export default function SectionHeading({ index, title, description, align = 'left' }) {
  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealOnce}
      className={align === 'center' ? 'mx-auto max-w-prose text-center' : 'max-w-prose'}
    >
      <h2 className="font-display text-display-lg text-balance">
        {index && <span className="mr-3 font-mono text-base text-violet-400/70 align-middle">{index}</span>}
        {title}
      </h2>
      {description && <p className="mt-4 text-pretty text-[1.0625rem] leading-relaxed text-gray-400">{description}</p>}
    </motion.header>
  );
}
