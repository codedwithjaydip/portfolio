import { motion } from "framer-motion"
import { ArrowDown, FileText, Github, Linkedin } from "lucide-react"

import Button from "../components/Button.jsx"
import Container from "../components/Container.jsx"
import { profile } from "../data/profile.js"

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.09,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const STACK = [
  { label: "React", detail: "Frontend" },
  { label: "Node.js", detail: "API" },
  { label: "MongoDB", detail: "Data" },
  { label: "Socket.IO", detail: "Real-time" },
]

export default function Hero() {
  const hasResume = !profile.resumeUrl.startsWith("[")

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center pt-24 pb-16"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <motion.p
              custom={0}
              variants={rise}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-1.5 text-xs text-gray-300"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse-dot"
              />
              {profile.availability}
            </motion.p>

            <motion.h1
              custom={1}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-7 font-display text-display-xl font-bold text-balance"
            >
              Hi, I&apos;m Jaydip Solanki.
              <span className="mt-2 block gradient-text">
                I build modern web experiences.
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-prose text-pretty text-[1.0625rem] leading-relaxed text-gray-400"
            >
              M.Sc. IT student and Full-Stack Developer, building scalable web
              applications, real-time systems and AI-powered products from
              Vadodara, India.
            </motion.p>

            <motion.div
              custom={3}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button href="#projects" size="lg">
                View my work
                <ArrowDown size={16} aria-hidden="true" />
              </Button>

              {hasResume ? (
                <Button
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="secondary"
                  size="lg"
                >
                  <FileText size={16} aria-hidden="true" />
                  Download resume
                </Button>
              ) : (
                <Button
                  as="button"
                  type="button"
                  variant="secondary"
                  size="lg"
                  disabled
                  title="Add resumeUrl in src/data/profile.js"
                >
                  <FileText size={16} aria-hidden="true" />
                  Resume — add the file
                </Button>
              )}
            </motion.div>

            <motion.div
              custom={4}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-9 flex items-center gap-5"
            >
              <a
                href={profile.social.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
              >
                <Github size={16} aria-hidden="true" />
                GitHub
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
              >
                <Linkedin size={16} aria-hidden="true" />
                LinkedIn
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.35,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative hidden lg:block"
          >
            {profile.photoUrl ? (
              <div className="relative mx-auto flex w-full max-w-sm justify-center">
                {/* Colour glow sitting behind the cutout, standing in for a frame. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2 top-6 h-56 w-56 rounded-full bg-violet-500/25 blur-[70px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-6 left-2 h-56 w-56 rounded-full bg-electric-500/20 blur-[70px]"
                />

                {/* A gentle float animation and drop-shadow give the cutout its "3D" lift —
                    there is no card or frame here, so this only works well with a
                    transparent-background PNG (see the note in profile.js). */}
                <motion.img
                  src={profile.photoUrl}
                  alt={profile.name}
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative h-auto max-h-[26rem] w-auto max-w-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
                />

                {/* Floating status chip, echoing the availability badge above the fold. */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.45 }}
                  className="glass absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-xl px-4 py-2.5 shadow-raised"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse-dot"
                  />
                  <span className="whitespace-nowrap font-mono text-xs text-gray-200">
                    {profile.role}
                  </span>
                </motion.div>
              </div>
            ) : (
              <div
                aria-hidden="true"
                className="surface relative overflow-hidden p-6 shadow-raised"
              >
                <div className="flex items-center gap-1.5 border-b border-white/[0.06] pb-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="ml-3 font-mono text-[0.7rem] text-gray-600">
                    stack.js
                  </span>
                </div>

                <div className="mt-5 space-y-2.5">
                  {STACK.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + index * 0.1, duration: 0.45 }}
                      className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
                    >
                      <span className="font-mono text-sm text-gray-200">
                        {item.label}
                      </span>
                      <span className="font-mono text-[0.7rem] text-gray-600">
                        {item.detail}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] px-4 py-3">
                  <p className="font-mono text-xs leading-relaxed text-violet-200/80">
                    &lt;code /&gt; five projects shipped, one in progress
                  </p>
                </div>

                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
