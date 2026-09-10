# Pangasinan Heritage Digital Showcase

**Student Name:** Bryan Bugayong
**Selected Framework:** Next.js 14 (App Router, TypeScript, Tailwind CSS)

**Live Website:** https://bryyydev.github.io/pangasinan-heritage/

A digital showcase promoting cultural awareness and tourism for Pangasinan's heritage sites — Hundred Islands, Bolinao Lighthouse, and Balungao Hot Spring — built as a fully static, JAMstack-style site deployed on GitHub Pages.

## Architecture

- **Atomic Design** component structure under `app/components/` (`atoms/`, `molecules/`, `organisms/`).
- **Static Site Generation (SSG)** — `next build` with `output: "export"` prerenders every route (home, destinations list, and each destination detail page via `generateStaticParams`) to static HTML at build time. No server is required at runtime.
- **Client-side search** — the destinations page filters by name, location, and description entirely in the browser (via `useSearchParams`), since static hosting has no server to process search queries.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Building the Static Export

```bash
npm run build
```

This generates a fully static `out/` directory, deployable to any static host.

## Deployment

Deployed automatically to GitHub Pages via the workflow in `.github/workflows/deploy.yml` on every push to `main`.
