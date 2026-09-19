/** Tiny class-name joiner — avoids pulling in a dependency for one function. */
export function cn(...values) {
  return values.filter(Boolean).join(' ');
}
