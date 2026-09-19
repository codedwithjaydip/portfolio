import { motion } from 'framer-motion';
import { fadeUp } from '../utils/motion.js';

export default function SkillCard({ group }) {
  return (
    <motion.article
      variants={fadeUp}
      className="surface group p-6 transition-colors duration-300 hover:border-violet-500/25"
    >
      <h3 className="font-display text-lg font-semibold">{group.title}</h3>
      <p className="mt-1 text-sm text-gray-500">{group.blurb}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li key={skill.name}>
            <span
              className={
                'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm transition-colors ' +
                (skill.learning
                  ? 'border-dashed border-white/[0.12] bg-transparent text-gray-500'
                  : 'border-white/[0.08] bg-white/[0.035] text-gray-200 hover:border-violet-500/35 hover:text-white')
              }
            >
              {skill.name}
              {skill.learning && (
                <span className="font-mono text-[0.65rem] text-violet-400/70" title="Currently learning">
                  learning
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
