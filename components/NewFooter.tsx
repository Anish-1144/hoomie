"use client";

import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { name: "LinkedIn", href: "#" },
  { name: "X", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
] as const;

export default function NewFooter() {
  const cityTags = ["Pan India"] as const;

  return (
    <footer
      className="relative w-full overflow-hidden border-t border-orange-100 bg-white pb-4 pt-8 font-sans"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #fffdf9 75%, #fff8ef 100%)",
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200/80 bg-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
          <div className="grid gap-8 border-b border-zinc-200/70 px-6 py-7 md:grid-cols-2 md:px-8">
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/ninexhoomieLogo.png"
                  alt="Ninex Hoomie"
                  width={205}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <div className="space-y-1 text-sm text-zinc-800">
                <p className="font-semibold">
                  Ninex Hoomie by Ninexfold Agency LLP
                </p>
                <p className="text-zinc-600">
                  Integrated PMS, POS, booking engine, channel manager, and
                  payments in one platform.
                </p>
                <p className="text-zinc-600">
                  Trusted by hotels and lodges across India with centralized
                  operations.
                </p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Product platform for hospitality businesses
              </p>
            </div>

            <div className="space-y-3 md:pl-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Contact
              </p>
              <a
                href="tel:9243143997"
                className="block text-sm font-semibold text-zinc-900 hover:underline"
              >
                9243143997
              </a>
              <p className="max-w-lg text-sm leading-relaxed text-zinc-700">
                ninexhoomie - integrated PMS, POS & payments for hotels and
                lodges across India.
              </p>
              <p className="text-sm font-medium text-zinc-700">
                Owned by Ninexfold Agency LLP
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden px-6 py-5 md:px-8">
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
              style={{
                background:
                  "radial-gradient(70% 80% at 50% 100%, rgba(244,158,83,0.28) 0%, rgba(247,210,157,0.12) 45%, rgba(255,255,255,0) 100%)",
              }}
            />
            <div className="relative flex items-center gap-2 text-orange-600">
              <span className="text-sm">◉</span>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                We Deal In
              </p>
            </div>
            <p className="relative mt-1 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
              Nationwide — hotels & lodges in cities across India
            </p>
            <div className="relative mt-4 flex flex-wrap gap-2.5">
              {cityTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-700 shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-xs text-zinc-500 sm:flex-row">
          <p>Copyright NINEXFOLD {new Date().getFullYear()}</p>
          <p>
            Connect:{" "}
            {socialLinks.map((item, idx) => (
              <span key={item.name}>
                <a href={item.href} className="hover:text-zinc-700">
                  {item.name}
                </a>
                {idx < socialLinks.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
