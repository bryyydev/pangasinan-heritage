import React from "react";

type TypographyVariant = "h1" | "h2" | "p";

interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-[var(--text-main)]",
  h2: "text-xl sm:text-2xl md:text-3xl font-semibold tracking-snug leading-snug text-[var(--text-main)]",
  p:  "text-base sm:text-lg leading-relaxed text-slate-600",
};

const variantTag: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  p:  "p",
};

export default function Typography({ variant, children, className = "" }: TypographyProps) {
  const Tag = variantTag[variant];
  return (
    <Tag className={`${variantStyles[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
