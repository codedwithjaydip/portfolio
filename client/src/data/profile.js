/**
 * Single source of truth for personal details.
 * Anything in square brackets is a placeholder you need to fill in.
 */
export const profile = {
  name: "Jaydip Solanki",
  firstName: "Jaydip",
  role: "Full-Stack Developer",
  tagline: "M.Sc. IT student and Full-Stack Developer",
  location: "Vadodara, Gujarat, India",
  email: "jaydip3174@gmail.com",
  availability: "Open to internship opportunities",

  social: {
    github: "https://github.com/codedwithjaydip",
    githubUsername: "codedwithjaydip",
    linkedin: "https://www.linkedin.com/in/jaydip-solanki-7269a7238",
  },

  // Put the PDF in client/public/ and point this at it, e.g. '/jaydip-solanki-resume.pdf'
  resumeUrl: "/jaydip-solanki-resume.pdf",
  photoUrl: "/profile-photo.png",

  intro: [
    "I'm an M.Sc. IT student at The Maharaja Sayajirao University of Baroda and a Full-Stack Developer.",
    "I enjoy turning ideas into practical web applications using modern technologies. My interests are MERN stack development, real-time applications, cloud deployment and Generative AI.",
    "I'm continuously improving my problem-solving, system design and software development skills while building real projects.",
  ],

  stats: [
    { value: "5", suffix: "+", label: "Projects built" },
    { value: "2", suffix: "+", label: "Years learning and building" },
    { value: "M.Sc. IT", suffix: "", label: "2025–2027" },
  ],
}

export const education = [
  {
    degree: "M.Sc. Information Technology",
    institution: "The Maharaja Sayajirao University of Baroda",
    period: "2025 – 2027",
    status: "In progress",
    detail:
      "Coursework alongside self-directed work on full-stack, real-time and AI projects.",
  },
  {
    degree: "B.Sc. Information Technology",
    institution: "Sardar Patel University (SPU)",
    period: "2022 – 2025",
    status: "completed",
    detail:
      "Bachelor of Science in Information Technology, with a foundation in programming, databases, web development, and computer science fundamentals.",
  },
]

export const journey = [
  {
    year: "2025",
    title: "Started M.Sc. IT",
    detail: "Began the programme at MSU Baroda.",
  },
  {
    year: "2025–2026",
    title: "Built MERN applications",
    detail: "Moved from desktop Python projects to full-stack web development.",
  },
  {
    year: "2026",
    title: "Real-time systems and AI integrations",
    detail: "Socket.IO messaging, and LLM features inside existing products.",
  },
  {
    year: "2026",
    title: "Redis, microservices and GenAI",
    detail:
      "Started working with caching, service boundaries and agent frameworks.",
  },
  {
    year: "2027",
    title: "Targeting a full-stack internship",
    detail:
      "Looking for a software development role where I can ship production code.",
  },
]

export const learning = [
  { name: "LangChain", status: "Building" },
  { name: "LangGraph", status: "Building" },
  { name: "RAG", status: "Building" },
  { name: "Redis", status: "Learning" },
  { name: "Microservices", status: "Exploring" },
  { name: "LLMs", status: "Learning" },
  { name: "System Design", status: "Learning" },
  { name: "DSA", status: "Learning" },
  { name: "Cloud & DevOps", status: "Exploring" },
]
