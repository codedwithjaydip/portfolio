import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/profile.js';
import { cn } from '../utils/cn.js';

const iconClasses =
  'grid h-10 w-10 place-items-center rounded-xl border border-white/[0.09] bg-white/[0.03] ' +
  'text-gray-400 transition-colors hover:border-white/25 hover:text-white';

export default function SocialLinks({ className, showEmail = false, size = 18 }) {
  const emailHref = profile.email.startsWith('[') ? null : `mailto:${profile.email}`;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <a
        href={profile.social.github}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="GitHub profile"
        className={iconClasses}
      >
        <Github size={size} aria-hidden="true" />
      </a>
      <a
        href={profile.social.linkedin}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="LinkedIn profile"
        className={iconClasses}
      >
        <Linkedin size={size} aria-hidden="true" />
      </a>
      {showEmail && emailHref && (
        <a href={emailHref} aria-label="Send an email" className={iconClasses}>
          <Mail size={size} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
