import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"

import Container from "../components/Container.jsx"
import Badge from "../components/Badge.jsx"
import Button from "../components/Button.jsx"
import NotFound from "./NotFound.jsx"
import { useProject } from "../hooks/useProject.js"
import { useDocumentMeta } from "../hooks/useDocumentMeta.js"

function Prose({ title, children }) {
  if (!children) return null
  return (
    <section className="mt-12">
      <h2 className="font-display text-display-md">{title}</h2>
      <div className="mt-4 max-w-prose text-pretty leading-relaxed text-gray-400">
        {children}
      </div>
    </section>
  )
}

function Bullets({ title, items, marker = "dot" }) {
  if (!items?.length) return null
  return (
    <section className="mt-12">
      <h2 className="font-display text-display-md">{title}</h2>
      <ul className="mt-5 max-w-prose space-y-3">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3.5 leading-relaxed text-gray-400">
            {marker === "number" ? (
              <span className="mt-0.5 shrink-0 font-mono text-sm text-violet-400/70">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-violet-500/70"
              />
            )}
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { project, loading, notFound } = useProject(slug)

  useDocumentMeta({
    title: project
      ? `${project.title} | Jaydip Solanki`
      : "Project | Jaydip Solanki",
    description: project?.shortDescription,
  })

  if (loading) {
    return (
      <Container className="py-32">
        <div className="h-4 w-32 animate-pulse rounded bg-white/[0.05]" />
        <div className="mt-6 h-12 w-2/3 animate-pulse rounded bg-white/[0.05]" />
        <div className="mt-8 space-y-3">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="h-3 w-full animate-pulse rounded bg-white/[0.03]"
            />
          ))}
        </div>
      </Container>
    )
  }

  if (notFound || !project) return <NotFound />

  const details = project.details || {}

  return (
    <article className="pt-28 pb-24">
      <Container>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          All projects
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="violet">{project.category}</Badge>
            {project.status === "In Development" && (
              <Badge tone="amber">Advanced / in development</Badge>
            )}
          </div>

          <h1 className="mt-5 font-display text-display-lg font-bold text-balance">
            {project.title}
          </h1>
          <p className="mt-5 max-w-prose text-pretty text-[1.0625rem] leading-relaxed text-gray-400">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                variant="secondary"
              >
                <Github size={16} aria-hidden="true" />
                View code
              </Button>
            )}
            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Live demo
              </Button>
            )}
            {project.secondaryUrl && (
              <Button
                href={project.secondaryUrl}
                target="_blank"
                rel="noreferrer noopener"
                variant="secondary"
              >
                <ExternalLink size={16} aria-hidden="true" />
                {project.secondaryLabel || "Second link"}
              </Button>
            )}
          </div>
        </header>

        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} interface`}
            loading="lazy"
            decoding="async"
            className="mt-12 w-full rounded-2xl border border-white/[0.07] bg-ink-raised"
          />
        )}

        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <div>
            <Prose title="Overview">{details.overview}</Prose>
            <Prose title="The problem">{details.problem}</Prose>
            <Prose title="The solution">{details.solution}</Prose>
            <Bullets title="Key features" items={project.features} />
            <Prose title="Architecture">
              {details.architecture && (
                <span className="block rounded-xl border border-white/[0.07] bg-ink-raised p-5 font-mono text-sm leading-relaxed text-gray-300">
                  {details.architecture}
                </span>
              )}
            </Prose>
            <Bullets
              title="Challenges"
              items={details.challenges}
              marker="number"
            />
            <Bullets title="What I learned" items={details.learned} />

            <section className="mt-12">
              <h2 className="font-display text-display-md">Screenshots</h2>
              {project.screenshots?.length ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {project.screenshots.map((src, index) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${project.title} screenshot ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-xl border border-white/[0.07]"
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-4 rounded-xl border border-dashed border-white/[0.12] p-5 font-mono text-xs text-gray-600">
                  Add screenshots to client/public/images/projects/ and list
                  them in the project&apos;s screenshots array.
                </p>
              )}
            </section>
          </div>

          <aside className="mt-12 lg:sticky lg:top-24 lg:self-start">
            <div className="surface p-6">
              <h2 className="text-sm font-medium text-gray-300">Tech stack</h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies?.map((tech) => (
                  <li key={tech}>
                    <Badge>{tech}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  )
}
