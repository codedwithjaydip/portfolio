import Container from './Container.jsx';
import { cn } from '../utils/cn.js';

export default function Section({ id, className, containerClassName, children }) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-20 sm:py-28', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
