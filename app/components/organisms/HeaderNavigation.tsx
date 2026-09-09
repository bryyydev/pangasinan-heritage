"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Typography from "@/app/components/atoms/Typography";
import SearchForm from "@/app/components/molecules/SearchForm";
import NavigationItem from "@/app/components/molecules/NavigationItem";

/* ── Icon path data (24×24 viewBox) ───────────────────────── */

const HomeIconPaths = (
  <>
    <path
      d="M3 12l9-9 9 9"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>
);

const DestinationsIconPaths = (
  <>
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth={2} />
    <path
      d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </>
);

/* ── Nav links config ─────────────────────────────────────── */

const NAV_LINKS = [
  { href: "/",            label: "Home",         iconPaths: HomeIconPaths },
  { href: "/destinations", label: "Destinations", iconPaths: DestinationsIconPaths },
];

/* ── Component ────────────────────────────────────────────── */

interface HeaderNavigationProps {
  /** Platform / site title */
  siteTitle?: string;
  /** Called with the trimmed query string on search submit */
  onSearch?: (query: string) => void;
}

/**
 * HeaderNavigation — organism
 *
 * Main top navigation bar that composes:
 * - A branded platform title (Typography atom)
 * - A SearchForm molecule
 * - NavigationItem molecules for Home and Destinations
 *
 * Layout:
 * - Mobile  : stacked column inside a collapsible menu drawer
 * - Desktop : single flex row with logo, search, and nav links
 *
 * Accessibility:
 * - `<header>` landmark + `<nav>` landmark with aria-label
 * - `aria-expanded` / `aria-controls` on the mobile toggle
 * - WCAG 2.1 AA: 4.5:1 contrast on amber-700 (#b45309) against white
 * - Visible focus rings on all interactive elements
 */
export default function HeaderNavigation({
  siteTitle = "Pangasinan Heritage",
  onSearch,
}: HeaderNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  /**
   * SearchForm live-syncs the `?query=` URL param itself while already on
   * `/destinations`. From any other route, submitting routes there with
   * the query applied so the destinations page can filter client-side.
   */
  const handleSearch = (query: string) => {
    onSearch?.(query);

    if (pathname.startsWith("/destinations")) return;

    const trimmed = query.trim();
    router.push(trimmed ? `/destinations?query=${encodeURIComponent(trimmed)}` : "/destinations");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Top bar ── */}
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Brand */}
          <Link
            href="/"
            className="
              flex-shrink-0 rounded-md
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[var(--primary-heritage)] focus-visible:ring-offset-2
            "
            aria-label="Pangasinan Heritage — go to homepage"
          >
            <Typography
              variant="h2"
              className="
                !text-lg sm:!text-xl font-extrabold
                !text-amber-700 hover:!text-amber-800
                transition-colors duration-150 whitespace-nowrap
              "
            >
              {siteTitle}
            </Typography>
          </Link>

          {/* Search — hidden on small screens, shown on md+ */}
          <div className="hidden flex-1 max-w-md md:block">
            <Suspense fallback={<div className="h-12 w-full rounded-xl bg-slate-100" aria-hidden />}>
              <SearchForm
                onSearch={handleSearch}
                placeholder="Search destinations…"
              />
            </Suspense>
          </div>

          {/* Desktop nav links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_LINKS.map((link) => (
              <NavigationItem
                key={link.href}
                href={link.href}
                label={link.label}
                iconPaths={link.iconPaths}
                isActive={pathname === link.href}
              />
            ))}
          </nav>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="
              inline-flex md:hidden items-center justify-center
              rounded-lg p-2 text-slate-600
              hover:bg-slate-100 hover:text-[var(--text-main)]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[var(--primary-heritage)] focus-visible:ring-offset-2
              transition-colors duration-150
            "
          >
            {/* Animated hamburger → X */}
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="transition-transform duration-200"
            >
              {menuOpen ? (
                /* X icon */
                <>
                  <path d="M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                  <path d="M18 6L6 18"  stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                </>
              ) : (
                /* Hamburger icon */
                <>
                  <path d="M4 6h16"  stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                  <path d="M4 12h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                  <path d="M4 18h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        <div
          id="mobile-menu"
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"}
          `}
          aria-hidden={!menuOpen}
        >
          {/* Mobile search */}
          <div className="mb-3 pt-2">
            <Suspense fallback={<div className="h-12 w-full rounded-xl bg-slate-100" aria-hidden />}>
              <SearchForm
                onSearch={(q) => {
                  handleSearch(q);
                  setMenuOpen(false);
                }}
                placeholder="Search destinations…"
              />
            </Suspense>
          </div>

          {/* Mobile nav links */}
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavigationItem
                key={link.href}
                href={link.href}
                label={link.label}
                iconPaths={link.iconPaths}
                isActive={pathname === link.href}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </nav>
        </div>

      </div>
    </header>
  );
}
