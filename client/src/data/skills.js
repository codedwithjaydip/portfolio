/**
 * `learning: true` marks a technology I am still picking up, so the section
 * never presents in-progress skills as established ones.
 */
export const skillGroups = [
  {
    id: 'languages',
    title: 'Languages',
    blurb: 'What I write day to day.',
    skills: [
      { name: 'JavaScript' },
      { name: 'Java' },
      { name: 'Python' },
      { name: 'SQL' },
      { name: 'HTML5' },
      { name: 'CSS3' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Interfaces, state and motion.',
    skills: [
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
      { name: 'Bootstrap' },
      { name: 'Redux Toolkit' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    blurb: 'APIs, auth and real-time transport.',
    skills: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'REST APIs' },
      { name: 'JWT' },
      { name: 'Socket.IO' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    blurb: 'Where the state lives.',
    skills: [
      { name: 'MongoDB' },
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'Redis', learning: true },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    blurb: 'Getting it off my machine.',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Docker', learning: true },
      { name: 'GitHub Actions', learning: true },
      { name: 'AWS EC2', learning: true },
      { name: 'AWS ECR', learning: true },
    ],
  },
  {
    id: 'ai',
    title: 'AI & GenAI',
    blurb: 'Currently the most interesting part of my work.',
    skills: [
      { name: 'AI APIs' },
      { name: 'LLMs', learning: true },
      { name: 'LangChain', learning: true },
      { name: 'LangGraph', learning: true },
      { name: 'RAG', learning: true },
    ],
  },
];
