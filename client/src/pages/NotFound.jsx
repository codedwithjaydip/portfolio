import { ArrowLeft } from 'lucide-react';

import Button from '../components/Button.jsx';
import Container from '../components/Container.jsx';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';

export default function NotFound() {
  useDocumentMeta({ title: 'Page not found | Jaydip Solanki' });

  return (
    <Container className="grid min-h-[80svh] place-items-center py-24 text-center">
      <div>
        <p className="font-display text-[clamp(5rem,18vw,10rem)] font-bold leading-none gradient-text">404</p>
        <h1 className="mt-4 font-display text-display-md">Looks like you took a wrong turn.</h1>
        <p className="mx-auto mt-4 max-w-prose text-gray-400">
          That page does not exist. Everything else is back on the home page.
        </p>
        <Button to="/" size="lg" className="mt-9">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to home
        </Button>
      </div>
    </Container>
  );
}
