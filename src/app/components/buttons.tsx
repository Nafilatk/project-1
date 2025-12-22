"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface PrimaryButtonProps {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string; 
  type?: "button" | "submit" | "reset"; 
  disabled?: boolean; 
  onClick?: () => void;
}

const base =
  "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-blue-900 text-white hover:bg-blue-700",
  secondary: "bg-slate-900 text-white hover:bg-slate-800",
  ghost:
    "border border-slate-300 text-slate-700 hover:bg-slate-100",
};

export default function PrimaryButton({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  onClick,
}: PrimaryButtonProps) {
  const classes = `
    ${base}
    ${variants[variant]}
    ${disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
