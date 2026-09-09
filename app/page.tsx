import Image from "next/image";
import HeaderNavigation from "@/app/components/organisms/HeaderNavigation";
import HeritageGrid from "@/app/components/organisms/HeritageGrid";
import Typography from "@/app/components/atoms/Typography";

export const metadata = {
  title: "Pangasinan Heritage | Discover Pangasinan's Treasures",
  description:
    "Explore the cultural landmarks, natural wonders, and heritage sites of Pangasinan — from Hundred Islands to Bolinao Lighthouse.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-light)] flex flex-col">

      {/* ── Top Navigation ── */}
      <HeaderNavigation siteTitle="Pangasinan Heritage" />

      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        {/* Full-bleed photo background */}
        <Image
          src="/alaminos_bg.jpg"
          alt="Aerial view of Hundred Islands National Park, Alaminos, Pangasinan"
          fill
          priority
          className="-z-10 object-cover"
        />
        {/* Legibility gradient over the photo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-900/30"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-amber-300 ring-1 ring-white/20 backdrop-blur-sm">
            Discover Pangasinan
          </span>

          <Typography
            variant="h1"
            className="mx-auto max-w-3xl !text-4xl sm:!text-5xl md:!text-6xl !text-white drop-shadow-sm"
          >
            Explore the Heritage &amp; Beauty of{" "}
            <span className="text-amber-400">Pangasinan</span>
          </Typography>

          <Typography
            variant="p"
            className="mx-auto mt-6 max-w-2xl !text-lg sm:!text-xl !text-slate-200"
          >
            From pristine island chains to century-old lighthouses and
            rejuvenating hot springs — Pangasinan&apos;s treasures await you.
          </Typography>

          {/* Hero CTA strip */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#destinations"
              className="
                inline-flex items-center gap-2 rounded-xl
                bg-amber-500 px-8 py-4 text-base font-semibold text-white
                shadow-lg shadow-amber-900/30 transition-all duration-200
                hover:bg-amber-600 hover:shadow-xl hover:-translate-y-0.5
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
                active:scale-95
              "
            >
              Browse Destinations
            </a>
            <a
              href="#about"
              className="
                inline-flex items-center gap-2 rounded-xl
                border-2 border-white/70 bg-white/5 px-8 py-4 text-base font-semibold text-white
                backdrop-blur-sm transition-all duration-200
                hover:bg-white hover:text-amber-700 hover:-translate-y-0.5
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
                active:scale-95
              "
            >
              Learn More
            </a>
          </div>

          {/* Stats row */}
          <div className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-6 sm:max-w-2xl sm:gap-8">
            {[
              { value: "124", label: "Islands" },
              { value: "44", label: "Municipalities" },
              { value: "3,000+", label: "Years of History" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-amber-400 sm:text-4xl">
                  {value}
                </span>
                <span className="mt-1 text-sm font-medium text-slate-300">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Heritage Grid ── */}
      <main
        id="destinations"
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
      >
        <HeritageGrid />
      </main>

      {/* ── Footer ── */}
      <footer
        id="about"
        className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-400"
      >
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-amber-700">Pangasinan Heritage</span>.
          Built with Next.js 14 &amp; Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}
