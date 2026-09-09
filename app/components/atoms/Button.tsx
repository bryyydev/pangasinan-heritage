import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPrimary?: boolean;
  children: React.ReactNode;
}

export default function Button({ isPrimary = true, children, className = "", ...rest }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 sm:px-8 sm:py-4 text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const primary =
    "bg-[var(--primary-heritage)] text-white hover:brightness-110 focus:ring-[var(--primary-heritage)] shadow-md hover:shadow-lg";

  const secondary =
    "bg-transparent border-2 border-[var(--primary-heritage)] text-[var(--primary-heritage)] hover:bg-[var(--primary-heritage)] hover:text-white focus:ring-[var(--primary-heritage)]";

  return (
    <button
      className={`${base} ${isPrimary ? primary : secondary} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
