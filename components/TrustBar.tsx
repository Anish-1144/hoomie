"use client";

import { motion } from "framer-motion";

const ORANGE_ITEMS = [
  "Rajasthan",
  "Goa",
  "Himachal",
  "Kerala",
  "Maharashtra",
  "MP",
  "Uttarakhand",
] as const;

const BLACK_ITEMS = [
  "GST-compliant billing",
  "UPI & Cards & Net Banking",
  "GST-compliant billing",
  "UPI & Cards & Net Banking",
  "GST-compliant billing",
  "UPI & Cards & Net Banking",
  "GST-compliant billing",
  "UPI & Cards & Net Banking",
  
] as const;

function MarqueeRow({
  items,
  suffix,
  className,
}: {
  items: readonly string[];
  suffix: string;
  className?: string;
}) {
  return (
    <div className={`flex shrink-0 items-center gap-8 px-6 ${className ?? ""}`}>
      {items.map((text, i) => (
        <span key={`${suffix}-${i}-${text}`} className="flex items-center gap-8 whitespace-nowrap">
          {i > 0 && <span className="text-white/75 select-none">×</span>}
          <span className="text-xs font-bold tracking-tight text-white sm:text-sm md:text-base">
            {text}
          </span>
        </span>
      ))}
    </div>
  );
}

function DiagonalMarquee({
  items,
  rotateClass,
  zIndex,
  bgClass,
  duration,
  reverse,
}: {
  items: readonly string[];
  rotateClass: string;
  zIndex: number;
  bgClass: string;
  duration: number;
  reverse?: boolean;
}) {
  const from = reverse ? ["-50%", "0%"] : ["0%", "-50%"];
  return (
    <div
      className={`pointer-events-none absolute left-1/2 top-1/2 w-[min(140vw,2000px)] -translate-x-1/2 -translate-y-1/2 ${rotateClass}`}
      style={{ zIndex }}
    >
      <div className={`${bgClass} overflow-hidden py-3 shadow-lg`}>
        <motion.div
          className="flex w-max"
          animate={{ x: from }}
          transition={{
            repeat: Infinity,
            duration,
            ease: "linear",
          }}
        >
          <MarqueeRow items={items} suffix="a" />
          <MarqueeRow items={items} suffix="b" />
        </motion.div>
      </div>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section
      className="relative w-full overflow-hidden bg-slate-100/95"
      aria-label="Coverage, payments, and value highlights"
    >
      <div className="relative mx-auto min-h-[200px] max-w-6xl px-4 py-16 md:min-h-[260px] md:py-20">
        {/* Black ribbon: bottom-left → top-right feel via positive rotate */}
        <DiagonalMarquee
          items={BLACK_ITEMS}
          rotateClass="rotate-[8deg]"
          zIndex={1}
          bgClass="bg-gray-950"
          duration={32}
          reverse
        />
        {/* Orange ribbon: top-left → bottom-right; sits above at intersection */}
        <DiagonalMarquee
          items={ORANGE_ITEMS}
          rotateClass="-rotate-[8deg]"
          zIndex={2}
          bgClass="bg-[#e36c37]"
          duration={26}
        />
      </div>

      {/* Headline below the cross — matches reference: small orange lead-in + bold statement */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-1 pt-2 text-center md:pb-20 md:pt-4">
        <h2 className="font-display text-[clamp(1.25rem,3.8vw,2.35rem)] font-bold leading-snug tracking-tight text-slate-800 md:leading-[1.25]">
          You&apos;re losing{" "}
          <span className="text-[#e36c37]">₹80,000 every month</span> to OTA commissions alone —
          <br />
          <span className="font-semibold text-slate-500">
            and that&apos;s before counting the tools you shouldn&apos;t be paying for.
          </span>
        </h2>
      </div>
    </section>
  );
}
