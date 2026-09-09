import React from "react";
import Link from "next/link";
import Icon from "@/app/components/atoms/Icon";
import Typography from "@/app/components/atoms/Typography";

interface NavigationItemProps {
  /** Destination path for the link */
  href: string;
  /** Display label */
  label: string;
  /** SVG path data drawn inside the Icon (24 × 24 viewBox) */
  iconPaths: React.ReactNode;
  /** Mark this item as the currently active route */
  isActive?: boolean;
  /** Additional class names for the link wrapper */
  className?: string;
  /** Called on click (e.g. to close a mobile drawer) */
  onClick?: () => void;
}

/**
 * NavigationItem — molecule
 *
 * Pairs an Icon atom with a Typography label to create a reusable
 * navigation link for sidebars, mobile drawers, or top-level nav bars.
 *
 * @example
 * <NavigationItem
 *   href="/explore"
 *   label="Explore"
 *   isActive={pathname === "/explore"}
 *   iconPaths={
 *     <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"
 *           stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
 *   }
 * />
 */
export default function NavigationItem({
  href,
  label,
  iconPaths,
  isActive = false,
  className = "",
  onClick,
}: NavigationItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`
        group flex items-center gap-3 rounded-lg px-3 py-2.5
        text-left transition-all duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[var(--primary-heritage)] focus-visible:ring-offset-2
        ${
          isActive
            ? "bg-[var(--primary-heritage)]/10 text-[var(--primary-heritage)]"
            : "text-slate-600 hover:bg-slate-100 hover:text-[var(--text-main)]"
        }
        ${className}
      `}
    >
      {/* Icon */}
      <span
        className={`
          flex-shrink-0 transition-transform duration-200
          group-hover:scale-110 group-active:scale-95
          ${isActive ? "text-[var(--primary-heritage)]" : "text-slate-400 group-hover:text-[var(--primary-heritage)]"}
        `}
      >
        <Icon
          size={22}
          color="currentColor"
          label={label}
        >
          {iconPaths}
        </Icon>
      </span>

      {/* Label */}
      <Typography
        variant="p"
        className={`
          !text-sm font-medium leading-none
          ${isActive ? "!text-[var(--primary-heritage)]" : "!text-inherit"}
        `}
      >
        {label}
      </Typography>

      {/* Active indicator bar */}
      {isActive && (
        <span
          aria-hidden
          className="ml-auto h-5 w-1 rounded-full bg-[var(--primary-heritage)]"
        />
      )}
    </Link>
  );
}
