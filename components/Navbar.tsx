"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import WaitlistPopupButton from "@/components/WaitlistPopupButton";

const NAV_LINKS = [
  { hash: "#features", label: "Features" },
  { hash: "#pricing", label: "Pricing" },
  { hash: "#faq", label: "FAQ" },
] as const;

function hashHref(pathname: string, hash: string) {
  return pathname === "/" ? hash : `/${hash}`;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeMenu]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <nav className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex shrink-0 items-center rounded-lg outline-none ring-orange-500/0 transition hover:opacity-90 focus-visible:ring-4 focus-visible:ring-orange-500/20"
          aria-label="Go to home"
        >
          <Image
            src="/ninexhoomieLogo.png"
            alt="Ninex Hoomie"
            width={220}
            height={72}
            priority
            className="h-8 w-auto object-contain sm:h-9 md:h-10"
          />
        </button>

        <div className="flex items-center gap-2">
          <WaitlistPopupButton
            className="hidden rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition hover:bg-orange-600 active:translate-y-px sm:inline-flex"
          >
            Join Waitlist
          </WaitlistPopupButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-orange-200 hover:bg-orange-50/50 hover:text-orange-600 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <WaitlistPopupButton
            className="inline-flex rounded-xl bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600 active:translate-y-px sm:hidden sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Join
          </WaitlistPopupButton>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px] md:hidden"
              aria-label="Close menu overlay"
              onClick={closeMenu}
            />
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-50 overflow-hidden border-t border-slate-100 bg-white md:hidden"
            >
              <div className="flex flex-col px-4 py-4">
                {NAV_LINKS.map(({ hash, label }, i) => (
                  <motion.div
                    key={hash}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={hashHref(pathname, hash)}
                      onClick={closeMenu}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-slate-800 transition hover:bg-orange-50 hover:text-orange-600"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-2 border-t border-slate-100 pt-4"
                >
                  <WaitlistPopupButton
                    onOpen={closeMenu}
                    className="flex w-full items-center justify-center rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    Join Waitlist
                  </WaitlistPopupButton>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
