import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WifiOff } from 'lucide-react';

import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectCardSkeleton from '../components/ProjectCardSkeleton.jsx';
import { projectCategories } from '../data/projects.js';
import { useProjects } from '../hooks/useProjects.js';
import { cn } from '../utils/cn.js';

export default function Projects() {
  const { projects, loading, usingFallback } = useProjects();
  const [filter, setFilter] = useState('All');

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)),
    [projects, filter]
  );

  const availableCategories = useMemo(() => {
    const present = new Set(projects.map((project) => project.category));
    return projectCategories.filter((category) => category === 'All' || present.has(category));
  }, [projects]);

  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        title="Things I've built."
        description="Each project below is one I designed, wrote and debugged myself. The detail pages cover the problem, the architecture and what went wrong along the way."
      />

      {usingFallback && !loading && (
        <p className="mt-6 inline-flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] px-3 py-2 text-xs text-amber-300/90">
          <WifiOff size={13} aria-hidden="true" />
          Showing a local copy — the projects API is not reachable right now.
        </p>
      )}

      <div role="group" aria-label="Filter projects by category" className="mt-9 flex flex-wrap gap-2">
        {availableCategories.map((category) => {
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={active}
              className={cn(
                'rounded-lg border px-3.5 py-2 text-sm transition-colors',
                active
                  ? 'border-violet-500/40 bg-violet-500/10 text-white'
                  : 'border-white/[0.08] text-gray-400 hover:border-white/20 hover:text-white'
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {loading ? (
          Array.from({ length: 4 }, (_, index) => <ProjectCardSkeleton key={index} />)
        ) : (
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        )}
      </div>

      {!loading && visible.length === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 text-sm text-gray-500">
          Nothing in this category yet. Try another filter.
        </motion.p>
      )}
    </Section>
  );
}
