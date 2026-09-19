import { Link } from 'react-router-dom';
import { cn } from '../utils/cn.js';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium ' +
  'transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-55';

const variants = {
  primary:
    'bg-gradient-to-r from-violet-600 to-electric-600 text-white shadow-[0_8px_30px_-12px_rgba(124,58,237,0.8)] ' +
    'hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(124,58,237,0.95)] active:translate-y-0',
  secondary:
    'border border-white/[0.12] bg-white/[0.04] text-white backdrop-blur-sm ' +
    'hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] active:translate-y-0',
  ghost: 'text-gray-400 hover:text-white',
  danger: 'border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20',
};

const sizes = {
  sm: 'h-9 px-3.5',
  md: 'h-11 px-5',
  lg: 'h-12 px-6 text-[0.95rem]',
};

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  const Tag = as || 'button';
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
