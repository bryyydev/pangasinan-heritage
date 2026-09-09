import Link from "next/link";
import { notFound } from "next/navigation";
import HeaderNavigation from "@/app/components/organisms/HeaderNavigation";
import HeritageImage from "@/app/components/atoms/HeritageImage";
import Typography from "@/app/components/atoms/Typography";
import Button from "@/app/components/atoms/Button";
import { HERITAGE_SITES, getHeritageSiteById } from "@/app/lib/heritageSites";

interface DestinationPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return HERITAGE_SITES.map((site) => ({ slug: site.id }));
}

export function generateMetadata({ params }: DestinationPageProps) {
  const site = getHeritageSiteById(params.slug);
  if (!site) {
    return { title: "Destination Not Found | Pangasinan Heritage" };
  }
  return {
    title: `${site.title} | Pangasinan Heritage`,
    description: site.description,
  };
}

export default function DestinationDetailPage({ params }: DestinationPageProps) {
  const site = getHeritageSiteById(params.slug);

  if (!site) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-light)] flex flex-col">
      <HeaderNavigation siteTitle="Pangasinan Heritage" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/destinations" className="hover:text-amber-700">Destinations</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{site.title}</span>
        </nav>

        {/* ── Hero image ── */}
        <HeritageImage
          src={site.imageSrc}
          alt={site.imageAlt}
          containerHeight="h-64 sm:h-80 md:h-96"
          containerClassName="rounded-2xl shadow-md"
          priority
        />

        {/* ── Title & location ── */}
        <div className="mt-8">
          <span className="mb-3 inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700 ring-1 ring-amber-200">
            {site.location}
          </span>
          <Typography variant="h1" className="!text-3xl sm:!text-4xl">
            {site.title}
          </Typography>
          <Typography variant="p" className="mt-4 max-w-3xl">
            {site.description}
          </Typography>
        </div>

        {/* ── Highlights ── */}
        <section className="mt-10">
          <Typography variant="h2" className="!text-xl sm:!text-2xl">
            Highlights
          </Typography>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {site.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
              >
                <span aria-hidden className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-600 sm:text-base">{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Back link ── */}
        <div className="mt-12">
          <Link href="/destinations">
            <Button isPrimary={false}>← Back to all destinations</Button>
          </Link>
        </div>
      </main>

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
