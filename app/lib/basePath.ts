/**
 * GitHub Pages serves this project from https://<user>.github.io/<repo>/,
 * so local asset paths need that `/repo` prefix baked in. `NEXT_PUBLIC_BASE_PATH`
 * is set by the GitHub Actions workflow at build time (see .github/workflows/deploy.yml)
 * and stays empty during local dev, so `npm run dev` is unaffected.
 *
 * Why this is needed at all: Next.js's `basePath` config in next.config.mjs
 * does NOT automatically prefix `next/image` `src` values — only
 * framework-internal assets (JS/CSS chunks, `next/link` hrefs) get that
 * treatment. With `output: "export"` forcing `images.unoptimized: true`,
 * `next/image` renders `src` to the DOM verbatim, with no loader in
 * between to apply a prefix. So every local image reference has to be
 * prefixed explicitly, once, through this shared helper — not
 * re-implemented per component, which is what let it drift out of sync
 * before.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a root-relative path (e.g. "/foo.jpg") with BASE_PATH; leaves absolute URLs untouched. */
export function withBasePath(path: string): string {
  return path.startsWith("/") ? `${BASE_PATH}${path}` : path;
}
