"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import HeaderNavigation from "@/app/components/organisms/HeaderNavigation";
import HeritageGrid from "@/app/components/organisms/HeritageGrid";
import Typography from "@/app/components/atoms/Typography";
import { HERITAGE_SITES } from "@/app/lib/heritageSites";

/** Case-insensitive match against title, location, or description. */
function filterSites(query: string) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return HERITAGE_SITES;

  return HERITAGE_SITES.filter((site) =>
    [site.title, site.location, site.description].some((field) =>
      field.toLowerCase().includes(trimmed)
    )
  );
}

/**
 * Client-rendered so it works under `output: "export"` (GitHub Pages has
 * no server to read the `searchParams` page prop from). `SearchForm`
 * live-syncs `?query=` on this route; this component reads it back via
 * `useSearchParams` and re-filters on every change.
 */
export default function DestinationsBrowser() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const filteredSites = useMemo(() => filterSites(query), [query]);

  return (
    <div className="min-h-screen bg-[var(--bg-light)] flex flex-col">

      {/* ── Top Navigation ── */}
      <HeaderNavigation siteTitle="Pangasinan Heritage" />

      {/* ── Page header ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-white py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700 ring-1 ring-amber-200">
            All Destinations
          </span>
          <Typography
            variant="h1"
            className="mx-auto max-w-3xl !text-4xl sm:!text-5xl"
          >
            Every Treasure of{" "}
            <span className="text-amber-600">Pangasinan</span>
          </Typography>
          <Typography
            variant="p"
            className="mx-auto mt-6 max-w-2xl !text-lg text-slate-500"
          >
            From pristine island chains to century-old lighthouses and
            rejuvenating hot springs — browse the full list of heritage sites.
          </Typography>
        </div>
      </section>

      {/* ── Heritage Grid ── */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <HeritageGrid
          sites={filteredSites}
          heading={query.trim() ? `Results for "${query.trim()}"` : "All Destinations"}
        />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-400">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-amber-700">Pangasinan Heritage</span>.
          Built with Next.js 14 &amp; Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}
