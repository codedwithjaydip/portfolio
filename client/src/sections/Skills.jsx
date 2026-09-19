import { motion } from 'framer-motion';

import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import SkillCard from '../components/SkillCard.jsx';
import { skillGroups } from '../data/skills.js';
import { revealOnce, stagger } from '../utils/motion.js';

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        index="02"
        title="What I work with."
        description="Technologies I have used to build something real. Dashed outlines mark what I am still learning rather than claiming."
      />

      <motion.div
        variants={stagger(0.05, 0.07)}
        initial="hidden"
        whileInView="show"
        viewport={revealOnce}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group) => (
          <SkillCard key={group.id} group={group} />
        ))}
      </motion.div>
    </Section>
  );
}
