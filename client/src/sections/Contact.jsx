import { Mail, MapPin } from 'lucide-react';

import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ContactForm from '../components/ContactForm.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import { profile } from '../data/profile.js';

export default function Contact() {
  const hasEmail = !profile.email.startsWith('[');

  return (
    <Section id="contact">
      <SectionHeading
        index="06"
        title="Let's build something together."
        description="Have an opportunity, a project idea, or just want to connect? Send me a message and I'll reply."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-violet-400" />
              {profile.location}
            </p>
            <p className="flex items-start gap-3 text-sm text-gray-400">
              <Mail size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-violet-400" />
              {hasEmail ? (
                <a href={`mailto:${profile.email}`} className="transition-colors hover:text-white">
                  {profile.email}
                </a>
              ) : (
                <span className="font-mono text-xs text-gray-600">Add your email in src/data/profile.js</span>
              )}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-300">Find me elsewhere</p>
            <SocialLinks className="mt-3" showEmail />
          </div>

          <p className="max-w-prose text-sm leading-relaxed text-gray-500">
            Messages go through this site&apos;s own API, get stored in MongoDB, and trigger an email notification.
            The form is rate-limited, so give it a moment between sends.
          </p>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
