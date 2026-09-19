import { useEffect } from 'react';

function setMeta(selector, attribute, value) {
  const tag = document.head.querySelector(selector);
  if (tag) tag.setAttribute(attribute, value);
}

/** Keeps the title and description in sync on client-side route changes. */
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
    }
    if (title) setMeta('meta[property="og:title"]', 'content', title);
  }, [title, description]);
}
