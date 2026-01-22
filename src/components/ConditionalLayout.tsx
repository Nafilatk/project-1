"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
};

export default function ConditionalLayout({ children }: Props) {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/Admin") || pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main className="flex-1">
      {children}
      </main>
      <Footer />
    </>
  );
}
