"use client";

import React, { useEffect, useId, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Icon from "@/app/components/atoms/Icon";
import Button from "@/app/components/atoms/Button";

const DEBOUNCE_MS = 300;
const QUERY_PARAM = "query";

interface SearchFormProps {
  /** Current value of the search input (controlled) */
  value?: string;
  /** Called whenever the input value changes */
  onChange?: (value: string) => void;
  /** Called when the form is submitted with the current query */
  onSearch?: (query: string) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Additional class names for the form wrapper */
  className?: string;
}

/**
 * SearchForm — molecule
 *
 * Accessible search form that composes an Icon, a labelled <input>,
 * and a submit Button to let users filter heritage locations.
 *
 * While on a `/destinations` route, every keystroke debounces (300ms)
 * into a `router.replace` that updates the `?query=` URL param —
 * `DestinationsBrowser` reads that param client-side (via
 * `useSearchParams`) to filter its grid, so results update live
 * without a full navigation or page reload.
 * On other routes, submitting still calls `onSearch` (which
 * HeaderNavigation uses to route to `/destinations?query=…`).
 *
 * @example
 * const [query, setQuery] = useState("");
 * <SearchForm
 *   value={query}
 *   onChange={setQuery}
 *   onSearch={(q) => router.push(`/search?q=${q}`)}
 *   placeholder="Search heritage sites…"
 * />
 */
export default function SearchForm({
  value,
  onChange,
  onSearch,
  placeholder = "Search heritage sites…",
  className = "",
}: SearchFormProps) {
  const inputId = useId();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const liveSync = pathname.startsWith("/destinations");
  const initialValue = value ?? (liveSync ? searchParams.get(QUERY_PARAM) ?? "" : "");

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const syncUrl = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = query.trim();
    if (trimmed) {
      params.set(QUERY_PARAM, trimmed);
    } else {
      params.delete(QUERY_PARAM);
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    onChange?.(next);

    if (!liveSync) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => syncUrl(next), DEBOUNCE_MS);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = (form.elements.namedItem("search") as HTMLInputElement).value;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (liveSync) syncUrl(query);

    onSearch?.(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`w-full ${className}`}
      aria-label="Search heritage locations"
    >
      {/* Visually hidden label satisfies WCAG 2.1 SC 1.3.1 */}
      <label htmlFor={inputId} className="sr-only">
        Search heritage locations
      </label>

      <div
        className="
          flex flex-col gap-3
          sm:flex-row sm:items-center sm:gap-2
        "
      >
        {/* ── Input wrapper ── */}
        <div
          className="
            relative flex flex-1 items-center
            rounded-xl border border-slate-300 bg-white
            focus-within:border-[var(--primary-heritage)]
            focus-within:ring-2 focus-within:ring-[var(--primary-heritage)]/30
            transition-all duration-200
          "
        >
          {/* Search icon — decorative */}
          <span className="pointer-events-none pl-4 text-slate-400" aria-hidden>
            <Icon size={20} color="currentColor" label="Search">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={2} />
              <path
                d="M16.5 16.5l3.5 3.5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </Icon>
          </span>

          <input
            id={inputId}
            name="search"
            type="search"
            autoComplete="off"
            defaultValue={initialValue}
            onChange={handleChange}
            placeholder={placeholder}
            className="
              min-h-[48px] flex-1 bg-transparent
              px-3 py-3 text-base text-[var(--text-main)]
              placeholder:text-slate-400
              focus:outline-none
            "
          />
        </div>

        {/* ── Submit button ── */}
        <Button
          isPrimary
          type="submit"
          className="min-h-[48px] w-full sm:w-auto whitespace-nowrap"
          aria-label="Submit search"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
