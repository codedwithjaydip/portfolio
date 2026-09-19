import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { fallbackProjects } from '../data/projects.js';

/**
 * Loads projects from the API, falling back to the bundled dataset so the
 * portfolio stays usable when the backend is asleep or unreachable.
 */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let active = true;

    api
      .getProjects()
      .then((payload) => {
        if (!active) return;
        const data = payload?.data ?? [];
        if (data.length) {
          setProjects(data);
          setUsingFallback(false);
        } else {
          setProjects(fallbackProjects);
          setUsingFallback(true);
        }
      })
      .catch(() => {
        if (!active) return;
        setProjects(fallbackProjects);
        setUsingFallback(true);
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  return { projects, loading, usingFallback };
}
