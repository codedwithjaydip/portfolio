import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Skills from '../sections/Skills.jsx';
import Projects from '../sections/Projects.jsx';
import Journey from '../sections/Journey.jsx';
import GithubSection from '../sections/GithubSection.jsx';
import Resume from '../sections/Resume.jsx';
import Contact from '../sections/Contact.jsx';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';

export default function Home() {
  const { hash } = useLocation();

  useDocumentMeta({
    title: 'Jaydip Solanki | Full-Stack Developer',
    description:
      'Portfolio of Jaydip Solanki, a Full-Stack Developer and M.Sc. IT student building modern web applications, real-time systems and AI-powered products.',
  });

  // Handles /#projects style links arriving from another route.
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }));
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <GithubSection />
      <Resume />
      <Contact />
    </>
  );
}
