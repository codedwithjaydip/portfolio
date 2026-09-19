import { useEffect, useState } from 'react';
import { ArrowUpRight, Github, Star } from 'lucide-react';

import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';
import { fetchGithubProfile, githubProfileUrl } from '../services/github.js';

export default function GithubSection() {
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading'); // loading | ready | unavailable

  useEffect(() => {
    let active = true;
    fetchGithubProfile()
      .then((result) => {
        if (!active) return;
        setData(result);
        setState('ready');
      })
      .catch(() => active && setState('unavailable'));
    return () => {
      active = false;
    };
  }, []);

  return (
    <Section id="github">
      <SectionHeading
        index="05"
        title="On GitHub."
        description="Public repositories, pulled live from the GitHub API."
      />

      <div className="mt-10">
        {state === 'loading' && (
          <div className="grid gap-4 sm:grid-cols-2" aria-hidden="true">
            {Array.from({ length: 2 }, (_, index) => (
              <div key={index} className="h-32 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02]" />
            ))}
          </div>
        )}

        {state === 'unavailable' && (
          <div className="surface flex flex-wrap items-center justify-between gap-5 p-6">
            <p className="max-w-prose text-sm text-gray-400">
              GitHub&apos;s public API is rate-limited right now. The profile itself is still one click away.
            </p>
            <Button href={githubProfileUrl} target="_blank" rel="noreferrer noopener" variant="secondary">
              <Github size={16} aria-hidden="true" />
              Open GitHub profile
            </Button>
          </div>
        )}

        {state === 'ready' && data && (
          <>
            <div className="surface flex flex-wrap items-center gap-6 p-6">
              <img
                src={data.avatar}
                alt=""
                width="56"
                height="56"
                loading="lazy"
                className="h-14 w-14 rounded-xl border border-white/10"
              />
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold">@{data.username}</p>
                <p className="mt-0.5 text-sm text-gray-500">
                  {data.publicRepos} public repositories · {data.followers} followers
                </p>
              </div>
              <Button
                href={data.url}
                target="_blank"
                rel="noreferrer noopener"
                variant="secondary"
                size="sm"
                className="ml-auto"
              >
                Visit profile
                <ArrowUpRight size={14} aria-hidden="true" />
              </Button>
            </div>

            {data.languages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-300">Most-used languages</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {data.languages.map((language) => (
                    <li
                      key={language.name}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-gray-300"
                    >
                      {language.name}
                      <span className="ml-2 font-mono text-[0.7rem] text-gray-600">{language.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.topRepos.length > 0 && (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {data.topRepos.map((repo) => (
                  <li key={repo.id}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="surface block h-full p-5 transition-colors hover:border-violet-500/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-mono text-sm text-white">{repo.name}</span>
                        {repo.stars > 0 && (
                          <span className="inline-flex shrink-0 items-center gap-1 text-xs text-gray-500">
                            <Star size={12} aria-hidden="true" />
                            {repo.stars}
                          </span>
                        )}
                      </div>
                      {repo.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-gray-500">{repo.description}</p>
                      )}
                      {repo.language && <p className="mt-3 text-xs text-violet-400/80">{repo.language}</p>}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </Section>
  );
}
