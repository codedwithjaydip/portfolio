import { Github, Linkedin, Mail } from 'lucide-react';
import Container from './Container.jsx';
import { profile } from '../data/profile.js';

export default function Footer() {
  const year = new Date().getFullYear();
  const hasEmail = !profile.email.startsWith('[');

  const links = [
    { label: 'GitHub', href: profile.social.github, Icon: Github },
    { label: 'LinkedIn', href: profile.social.linkedin, Icon: Linkedin },
    hasEmail && { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
  ].filter(Boolean);

  return (
    <footer className="border-t border-white/[0.06] py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xl font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-gray-500">{profile.role}</p>
        </div>

        <ul className="flex flex-wrap gap-5">
          {links.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="mt-10 border-t border-white/[0.05] pt-6">
        <p className="text-xs text-gray-600">
          © {year} {profile.name}. Built with React, Tailwind CSS and Node.js.
        </p>
      </Container>
    </footer>
  );
}
