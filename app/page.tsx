import Image from "next/image";
import HeaderNavigation from "@/app/components/organisms/HeaderNavigation";
import HeritageGrid from "@/app/components/organisms/HeritageGrid";
import Typography from "@/app/components/atoms/Typography";
import { withBasePath } from "@/app/lib/basePath";

export const metadata = {
  title: "Pangasinan Heritage | Discover Pangasinan's Treasures",
  description:
    "Explore the cultural landmarks, natural wonders, and heritage sites of Pangasinan — from Hundred Islands to Bolinao Lighthouse.",
};

export default function Home() {
  const heroImage = withBasePath("/alaminos_bg.jpg");

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--bg-light)]">
      {/* ─────────────────────────
          TOP NAVIGATION
      ───────────────────────── */}
      <HeaderNavigation siteTitle="Pangasinan Heritage" />

      {/* ─────────────────────────
          HERO
      ───────────────────────── */}
      <section
        id="home"
        className="
          relative isolate overflow-hidden
          py-16
          sm:py-24
          md:py-32
        "
      >
        {/* Full-bleed photo background */}
        <Image
          src={heroImage}
          alt="Aerial view of Hundred Islands National Park, Alaminos, Pangasinan"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />

        {/* Dark overlay for text readability */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 -z-10
            bg-gradient-to-t
            from-slate-950/95
            via-slate-950/65
            to-slate-900/35
          "
        />

        {/* Hero content */}
        <div
          className="
            relative mx-auto w-full max-w-7xl
            px-4 text-center
            sm:px-6
            lg:px-8
          "
        >
          {/* Badge */}
          <span
            className="
              mb-4 inline-block rounded-full
              bg-white/10 px-3 py-1.5
              text-xs font-semibold text-amber-300
              ring-1 ring-white/20
              backdrop-blur-sm
              sm:px-4 sm:text-sm
            "
          >
            Discover Pangasinan
          </span>

          {/* Main heading */}
          <Typography
            variant="h1"
            className="
              mx-auto max-w-3xl
              !text-3xl
              leading-tight
              sm:!text-5xl
              md:!text-6xl
              !text-white
              drop-shadow-sm
            "
          >
            Explore the Heritage &amp; Beauty of{" "}
            <span className="text-amber-400">Pangasinan</span>
          </Typography>

          {/* Description */}
          <Typography
            variant="p"
            className="
              mx-auto mt-5 max-w-2xl
              !text-base
              leading-relaxed
              !text-slate-200
              sm:mt-6
              sm:!text-xl
            "
          >
            From pristine island chains to century-old lighthouses and
            rejuvenating hot springs — Pangasinan&apos;s treasures await you.
          </Typography>

          {/* ─────────────────────────
              HERO BUTTONS
          ───────────────────────── */}
          <div
            className="
              mx-auto mt-8 flex w-full max-w-md
              flex-col items-stretch gap-3
              sm:mt-10
              sm:flex-row sm:items-center sm:justify-center
              sm:max-w-none
            "
          >
            <a
              href="#destinations"
              className="
                inline-flex min-h-12
                items-center justify-center gap-2
                rounded-xl
                bg-amber-500
                px-6 py-3
                text-sm font-semibold text-white
                shadow-lg shadow-amber-900/30
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-amber-600
                hover:shadow-xl
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-amber-400
                focus-visible:ring-offset-2
                focus-visible:ring-offset-slate-900
                active:scale-95
                sm:px-8 sm:py-4
                sm:text-base
              "
            >
              Browse Destinations
            </a>

            <a
              href="#about"
              className="
                inline-flex min-h-12
                items-center justify-center gap-2
                rounded-xl
                border-2 border-white/70
                bg-white/5
                px-6 py-3
                text-sm font-semibold text-white
                backdrop-blur-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-white
                hover:text-amber-700
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-slate-900
                active:scale-95
                sm:px-8 sm:py-4
                sm:text-base
              "
            >
              Learn More
            </a>
          </div>

          {/* ─────────────────────────
              STATISTICS
          ───────────────────────── */}
          <div
            className="
              mx-auto mt-10
              grid w-full max-w-xs
              grid-cols-1 gap-5
              sm:mt-14
              sm:max-w-2xl
              sm:grid-cols-3
              sm:gap-8
            "
          >
            {[
              { value: "124", label: "Islands" },
              { value: "44", label: "Municipalities" },
              { value: "3,000+", label: "Years of History" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center"
              >
                <span
                  className="
                    text-3xl font-extrabold
                    text-amber-400
                    sm:text-4xl
                  "
                >
                  {value}
                </span>

                <span
                  className="
                    mt-1 text-xs font-medium
                    text-slate-300
                    sm:text-sm
                  "
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────
          HERITAGE GRID
      ───────────────────────── */}
      <main
        id="destinations"
        className="
          mx-auto w-full max-w-7xl flex-1
          px-4 py-12
          sm:px-6 sm:py-16
          lg:px-8 lg:py-20
        "
      >
        <HeritageGrid />
      </main>

      {/* ─────────────────────────
          FOOTER / ABOUT
      ───────────────────────── */}
      <footer
        id="about"
        className="
          border-t border-slate-200
          bg-white
          px-4 py-8
          text-center text-sm text-slate-400
          sm:px-6
        "
      >
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-amber-700">
            Pangasinan Heritage
          </span>
          . Built with Next.js 14 &amp; Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}