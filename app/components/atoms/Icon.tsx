import React from "react";

interface IconProps {
  /** Width and height in pixels */
  size?: number;
  /** Fill color (CSS color string or var()) */
  color?: string;
  /** Accessible label for screen readers */
  label?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * SVG wrapper that sets consistent size, color, and accessibility attributes.
 * Pass any SVG path/shape as children.
 *
 * @example
 * <Icon size={24} color="#d97706" label="Menu">
 *   <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
 * </Icon>
 */
export default function Icon({
  size = 24,
  color = "currentColor",
  label,
  children,
  className = "",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      color={color}
      aria-label={label}
      aria-hidden={!label}
      role={label ? "img" : undefined}
      className={`inline-block flex-shrink-0 ${className}`}
    >
      {children}
    </svg>
  );
}
