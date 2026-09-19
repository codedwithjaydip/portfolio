import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Timeline from '../components/Timeline.jsx';
import { journey, learning } from '../data/profile.js';

const statusTone = {
  Building: 'border-violet-500/30 bg-violet-500/10 text-violet-200',
  Learning: 'border-electric-500/25 bg-electric-500/10 text-electric-400',
  Exploring: 'border-white/[0.1] bg-white/[0.03] text-gray-400',
};

export default function Journey() {
  const items = journey.map((item) => ({ label: item.year, title: item.title, detail: item.detail }));

  return (
    <Section id="journey">
      <SectionHeading
        index="04"
        title="Development journey."
        description="No formal industry experience yet. This is the actual path instead — what I picked up, and when."
      />

      <div className="mt-12 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Timeline items={items} />

        <div>
          <h3 className="font-display text-display-md">Currently learning</h3>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-gray-500">
            Where my time goes outside coursework. The labels describe how far along I am, not a percentage I made up.
          </p>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {learning.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-ink-raised px-4 py-3"
              >
                <span className="text-sm text-gray-200">{item.name}</span>
                <span className={`rounded-md border px-2 py-0.5 text-[0.7rem] font-medium ${statusTone[item.status]}`}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
