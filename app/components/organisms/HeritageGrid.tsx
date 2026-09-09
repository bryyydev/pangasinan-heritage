"use client";

import { useRouter } from "next/navigation";
import HeritageCard from "@/app/components/molecules/HeritageCard";
import { HERITAGE_SITES, type HeritageSite } from "@/app/lib/heritageSites";

interface HeritageGridProps {
  /** Override the default mock sites with custom data */
  sites?: HeritageSite[];
  /** Section heading text */
  heading?: string;
  /** Additional wrapper class names */
  className?: string;
}

/**
 * HeritageGrid — organism
 *
 * Renders a responsive CSS Grid of HeritageCard molecules.
 * Defaults to three Pangasinan heritage/tourist sites as mock data.
 *
 * @example
 * // Default mock data
 * <HeritageGrid />
 *
 * // Custom data
 * <HeritageGrid sites={fetchedSites} />
 */
export default function HeritageGrid({
  sites = HERITAGE_SITES,
  heading = "Featured Destinations",
  className = "",
}: HeritageGridProps) {
  const router = useRouter();

  return (
    <section
      aria-labelledby="heritage-grid-heading"
      className={`w-full ${className}`}
    >
      {/* Section heading — visually present but also an accessible landmark */}
      <h2
        id="heritage-grid-heading"
        className="mb-6 text-2xl font-bold tracking-tight text-[var(--text-main)] sm:text-3xl"
      >
        {heading}
      </h2>

      {sites.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
          <p className="text-base font-medium text-slate-500">
            No destinations match your search.
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Try a different keyword, like a site name or municipality.
          </p>
        </div>
      ) : (
        <div
          className="
            grid grid-cols-1 gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {sites.map((site) => (
            <HeritageCard
              key={site.id}
              imageSrc={site.imageSrc}
              imageAlt={site.imageAlt}
              title={site.title}
              description={site.description}
              location={site.location}
              onExplore={() => router.push(site.href)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
