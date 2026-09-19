import { motion } from 'framer-motion';

/**
 * Brief intro cover. It unmounts on a timer in App, so it never blocks
 * interaction for longer than ~800ms.
 */
export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
    >
      <motion.p
        className="font-mono text-2xl tracking-tight text-gray-500 sm:text-3xl"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <span className="text-violet-400">&lt;</span>
        <span className="text-white"> Jaydip </span>
        <span className="text-electric-400">/&gt;</span>
      </motion.p>
    </motion.div>
  );
}
