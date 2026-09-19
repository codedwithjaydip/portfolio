import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently in view, for navbar highlighting.
 * Uses IntersectionObserver rather than scroll maths so it stays cheap.
 */
export function useScrollSpy(ids, rootMargin = '-45% 0px -50% 0px') {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin, threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
