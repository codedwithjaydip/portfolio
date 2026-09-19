import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';

import Badge from './Badge.jsx';

export default function ProjectCard({ project }) {
  const { title, slug, shortDescription, image, technologies = [], features = [], githubUrl, liveUrl, status, category } =
    project;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-raised
                 transition-colors duration-300 hover:border-violet-500/30"
    >
      <Link
        to={`/projects/${slug}`}
        className="relative block aspect-[16/9] overflow-hidden bg-gradient-to-br from-violet-950/40 to-ink-sunken"
        tabIndex={-1}
        aria-hidden="true"
      >
        {image ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="grid h-full w-full place-items-center font-mono text-sm text-gray-600">{title}</span>
        )}
        {status === 'In Development' && (
          <span className="absolute left-3 top-3">
            <Badge tone="amber">In development</Badge>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold">
            <Link to={`/projects/${slug}`} className="transition-colors hover:text-violet-300">
              {title}
            </Link>
          </h3>
          <span className="shrink-0 pt-1 font-mono text-[0.7rem] text-gray-600">{category}</span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-gray-400">{shortDescription}</p>

        {features.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex gap-2.5 text-sm text-gray-500">
                <span aria-hidden="true" className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-violet-500/70" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {technologies.slice(0, 5).map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
          {technologies.length > 5 && (
            <li>
              <Badge>+{technologies.length - 5}</Badge>
            </li>
          )}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/[0.06] pt-4">
          <Link
            to={`/projects/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-violet-300"
          >
            View details
            <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-white"
            >
              <Github size={14} aria-hidden="true" />
              Code
              <span className="sr-only">for {title}</span>
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-white"
            >
              <ExternalLink size={14} aria-hidden="true" />
              Live demo
              <span className="sr-only">of {title}</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
