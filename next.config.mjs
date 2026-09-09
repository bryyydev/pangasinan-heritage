/**
 * GitHub Pages serves project sites from https://<user>.github.io/<repo>/,
 * so every asset URL needs that `/repo` prefix baked in at build time.
 * Set BASE_PATH in the deploy workflow (see .github/workflows/deploy.yml);
 * it stays empty for local dev/build so `npm run dev` is unaffected.
 */
const basePath = process.env.BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // next/image's optimization API needs a server; static export has none.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
