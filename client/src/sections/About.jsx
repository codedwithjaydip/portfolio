import { motion } from 'framer-motion';

import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Timeline from '../components/Timeline.jsx';
import { education, profile } from '../data/profile.js';
import { fadeUp, revealOnce, stagger } from '../utils/motion.js';

export default function About() {
  const timelineItems = education.map((item) => ({
    label: item.period,
    title: item.degree,
    subtitle: item.institution,
    detail: `${item.status} — ${item.detail}`,
  }));

  return (
    <Section id="about">
      <SectionHeading index="01" title="A little about me." />

      <div className="mt-12 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <motion.div
            variants={stagger(0, 0.09)}
            initial="hidden"
            whileInView="show"
            viewport={revealOnce}
            className="max-w-prose space-y-5"
          >
            {profile.intro.map((paragraph) => (
              <motion.p key={paragraph} variants={fadeUp} className="text-pretty leading-relaxed text-gray-400">
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.dl
            variants={stagger(0.1, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={revealOnce}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {profile.stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="surface p-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-display text-display-md font-bold text-white">
                    {stat.value}
                    <span className="text-violet-400">{stat.suffix}</span>
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">{stat.label}</span>
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <div>
          <h3 className="mb-6 font-display text-display-md">Education</h3>
          <Timeline items={timelineItems} />
        </div>
      </div>
    </Section>
  );
}
