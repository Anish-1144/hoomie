"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import WaitlistPopupButton from "@/components/WaitlistPopupButton";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
};

const LAUNCH_DATE = new Date(2026, 4, 1, 0, 0, 0).getTime();

function getCountdown(targetTime: number): Countdown {
  const diff = targetTime - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, isOver: false };
}

const pad = (n: number) => String(n).padStart(2, "0");

const stats: { value: string; suffix: string; label: string }[] = [
  { value: "₹999", suffix: "/mo", label: "Starting price" },
  { value: "19K+", suffix: "", label: "Travel agents" },
  { value: "3-day", suffix: "", label: "Payouts" },
  { value: "0 fees", suffix: "", label: "Setup cost" },
];

export default function Hero() {
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown(LAUNCH_DATE));

  useEffect(() => {
    const tick = () => setCountdown(getCountdown(LAUNCH_DATE));
    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section
        id="hero"
        className="relative overflow-hidden bg-[#f5f5f5] pb-16 pt-10 sm:pb-20 sm:pt-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgba(255,255,255,0.9),transparent_50%)]"
        />

        <div className="relative z-10 mx-auto max-w-[1920px] px-4 text-center sm:px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#333333] px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm sm:text-sm md:text-base"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-emerald-400"
              aria-hidden
            />
            {countdown.isOver
              ? "Launch Day Is Here 🎉"
              : `Launches in ${countdown.days}d ${pad(countdown.hours)}h ${pad(countdown.minutes)}m ${pad(countdown.seconds)}s · 1/05/2026`}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-[1.12] tracking-tight text-[#1a1a1a]"
          >
            <span className="block text-[clamp(2rem,4vw,3.35rem)]">
              India&apos;s hotels pay ₹10,000/month for
            </span>
            <span className="mt-1 block text-[clamp(2.1rem,4.5vw,3.45rem)] italic text-[#ff5722]">
              4 broken tools.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#666666] md:text-lg"
          >
            Hoomie replaces all of them — PMS, channel manager, booking engine, payment gateway,
            restaurant POS — in one platform.
            <span className="font-semibold text-[#1a1a1a]"> Starting at ₹999/month.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mx-auto mt-8 flex w-full max-w-2xl items-center rounded-full border border-neutral-200 bg-white px-4 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:flex-row"
          >
            <input
              type="email"
              placeholder="Enter your hotel's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 appearance-none rounded-full border border-transparent bg-transparent px-3 py-2 text-base font-medium text-[#1a1a1a] outline-none placeholder:text-[#888888]"
            />
            <WaitlistPopupButton
              initialEmail={email}
              className="shrink-0 rounded-full bg-[#333333] px-6 py-2.5 text-base font-bold text-white transition hover:bg-[#1a1a1a] active:scale-[0.98] sm:px-7"
            >
              Claim My Spot →
            </WaitlistPopupButton>
          </motion.div>

          <p className="mt-4 text-sm text-[#666666]">
            Free to join · <span className="text-[#444444]">No credit card</span> · Founder pricing
            locked on signup
          </p>

          <div className="mx-auto mt-10 w-full max-w-[min(100%,1920px)] overflow-hidden rounded-[2rem] bg-[#1a1a1a] px-4 py-5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)] sm:rounded-[2.5rem] sm:px-6 sm:py-6 md:px-8 lg:px-10">
            <div className="mx-auto grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.22 + i * 0.05 }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-5 text-center backdrop-blur-sm transition hover:bg-white/[0.09] sm:rounded-3xl"
                >
                  <div className="font-display text-xl font-extrabold text-white md:text-2xl">
                    {s.value}
                    {s.suffix && (
                      <span className="text-lg font-medium text-white/85">{s.suffix}</span>
                    )}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/60">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
            <Image
              src="/hero.png"
              alt="Hero Image"
              width={1600}
              height={900}
              className="mt-6 h-[240px] w-full rounded-2xl object-cover sm:mt-7 sm:h-[300px] sm:rounded-3xl md:h-[360px]"
            />
          </div>
        </div>
    </section>
  );
}
