import { cn } from '../utils/cn.js';

const tones = {
  default: 'border-white/[0.09] bg-white/[0.04] text-gray-300',
  violet: 'border-violet-500/25 bg-violet-500/10 text-violet-200',
  blue: 'border-electric-500/25 bg-electric-500/10 text-electric-400',
  amber: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
};

export default function Badge({ tone = 'default', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
