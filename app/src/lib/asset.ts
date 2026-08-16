/**
 * Resolves a root-relative public asset path (e.g. "/logo.png") against
 * Vite's configured base path, so images work both in local dev and when
 * deployed under a subpath (GitHub Pages: /gifties-for-you/).
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
