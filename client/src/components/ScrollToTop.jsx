import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 8 }}
          transition={{ duration: 0.18 }}
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full
                     border border-white/[0.12] bg-ink-raised/80 text-gray-300 backdrop-blur-lg
                     transition-colors hover:border-violet-500/40 hover:text-white"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
