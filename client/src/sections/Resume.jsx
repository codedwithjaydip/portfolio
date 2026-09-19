import { Download, FileText } from 'lucide-react';

import Button from '../components/Button.jsx';
import Container from '../components/Container.jsx';
import { profile } from '../data/profile.js';

export default function Resume() {
  const hasResume = !profile.resumeUrl.startsWith('[');

  return (
    <section className="py-12">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-raised p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-prose">
              <h2 className="font-display text-display-md text-balance">Want to know more?</h2>
              <p className="mt-3 text-pretty leading-relaxed text-gray-400">
                Take a look at my resume for the full picture of my education, skills and projects.
              </p>
            </div>

            {hasResume ? (
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button href={profile.resumeUrl} target="_blank" rel="noreferrer noopener" size="lg">
                  <FileText size={16} aria-hidden="true" />
                  View resume
                </Button>
                <Button href={profile.resumeUrl} download variant="secondary" size="lg">
                  <Download size={16} aria-hidden="true" />
                  Download
                </Button>
              </div>
            ) : (
              <p className="shrink-0 rounded-xl border border-dashed border-white/[0.14] px-5 py-4 font-mono text-xs text-gray-500">
                Drop your PDF in client/public/
                <br />
                then set resumeUrl in src/data/profile.js
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
