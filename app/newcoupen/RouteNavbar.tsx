"use client";

import Image from "next/image";
import Link from "next/link";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import AnnouncementBanner from "./AnnouncementBanner";

export default function RouteNavbar() {
  return (
    <header className="relative z-50 w-full">
      <AnnouncementBanner />

      <nav className="flex w-full justify-center border-b border-slate-200/80 bg-white/80 px-4 py-2 backdrop-blur-md sm:px-6 sm:py-2.5 lg:px-8">
        <div className="flex w-full max-w-7xl items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 text-slate-900">
            <Image
              src="/ninexhoomieLogo.png"
              alt="Ninex Hoomie"
              width={172}
              height={48}
              className="h-8 w-auto object-contain sm:h-9"
              priority
            />
          </Link>

          <ShimmerButton
            className="relative z-10 px-4 py-2 text-xs font-semibold uppercase tracking-wide shadow-lg sm:text-sm"
            onClick={() => {
              window.location.href = "http://localhost:3000";
            }}
          >
            Visit site
          </ShimmerButton>
        </div>
      </nav>
    </header>
  );
}
