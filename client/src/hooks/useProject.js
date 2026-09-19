import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { fallbackProjects } from '../data/projects.js';

export function useProject(slug) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);

    api
      .getProject(slug)
      .then((payload) => active && setProject(payload.data))
      .catch(() => {
        if (!active) return;
        const local = fallbackProjects.find((item) => item.slug === slug);
        if (local) setProject(local);
        else setNotFound(true);
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [slug]);

  return { project, loading, notFound };
}
