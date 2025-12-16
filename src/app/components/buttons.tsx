// components/PrimaryButton.tsx
"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface PrimaryButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
}

const base =
  "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-blue-900 text-white hover:bg-blue-700",
  secondary: "bg-slate-900 text-white hover:bg-slate-800",
  ghost: "border border-slate-300 text-slate-700 hover:bg-slate-100",
};

export default function PrimaryButton({
  href,
  children,
  variant = "primary",
}: PrimaryButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
