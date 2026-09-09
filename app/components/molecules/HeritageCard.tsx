import HeritageImage from "@/app/components/atoms/HeritageImage";
import Typography from "@/app/components/atoms/Typography";
import Button from "@/app/components/atoms/Button";

interface HeritageCardProps {
  /** Path or URL to the location photo */
  imageSrc: string;
  /** Alt text for the photo */
  imageAlt: string;
  /** Name of the tourist / heritage site */
  title: string;
  /** Short description of the site */
  description: string;
  /** Municipality / area, shown as a badge over the photo */
  location?: string;
  /** Called when the "Explore" button is clicked */
  onExplore?: () => void;
  /** Optional additional class names for the card wrapper */
  className?: string;
}

/**
 * HeritageCard — molecule
 *
 * Displays a tourist site preview with a photo, title, brief description,
 * and an "Explore" call-to-action button.
 *
 * @example
 * <HeritageCard
 *   imageSrc="/images/hundred-islands.jpg"
 *   imageAlt="Hundred Islands National Park"
 *   title="Hundred Islands"
 *   description="A national park of 124 islands off the coast of Alaminos City."
 *   onExplore={() => router.push('/sites/hundred-islands')}
 * />
 */
export default function HeritageCard({
  imageSrc,
  imageAlt,
  title,
  description,
  location,
  onExplore,
  className = "",
}: HeritageCardProps) {
  return (
    <article
      className={`
        group flex flex-col overflow-hidden rounded-2xl bg-white
        shadow-md ring-1 ring-slate-100 hover:shadow-2xl hover:shadow-amber-900/10
        transition-all duration-300 ease-out hover:-translate-y-1.5
        ${className}
      `}
    >
      {/* ── Photo with gradient caption overlay ── */}
      <div className="relative">
        <HeritageImage
          src={imageSrc}
          alt={imageAlt}
          containerHeight="h-56 sm:h-64"
          className="transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Gradient wash for legible overlay text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
        />

        {/* Location badge */}
        {location && (
          <span
            className="
              absolute left-4 top-4 inline-flex items-center gap-1.5
              rounded-full bg-white/90 px-3 py-1 text-xs font-semibold
              text-amber-700 shadow-sm backdrop-blur-sm
            "
          >
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinejoin="round"
              />
              <circle cx="12" cy="9" r="2.5" fill="currentColor" />
            </svg>
            {location}
          </span>
        )}

        {/* Title over the photo */}
        <Typography
          variant="h2"
          className="absolute inset-x-4 bottom-4 !text-white text-lg sm:text-xl drop-shadow-sm"
        >
          {title}
        </Typography>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        {/* Description */}
        <Typography variant="p" className="line-clamp-3 flex-1 text-sm sm:text-base">
          {description}
        </Typography>

        {/* CTA */}
        <Button
          isPrimary
          onClick={onExplore}
          className="w-full justify-between text-sm sm:text-base"
          aria-label={`Explore ${title}`}
        >
          Explore Site
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
    </article>
  );
}
