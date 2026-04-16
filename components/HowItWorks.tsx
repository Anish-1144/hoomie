"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Add your property in 10 minutes",
    body: "Fill in room types, rates, amenities. Our team helps you migrate your existing data for free.",
  },
  {
    title: "Share your QR and booking link",
    body: "Print your check-in QR for the front desk. Paste your direct booking URL on Google, Instagram, everywhere.",
  },
  {
    title: "Watch bookings and payouts flow",
    body: "Travel agents book into your live inventory. Guests check in themselves. You get paid in 3 days.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [startSequence, setStartSequence] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || startSequence) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTopInView = rect.top <= window.innerHeight * 0.7;
      if (sectionTopInView) {
        setStartSequence(true);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [startSequence]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-white pb-20 pt-24"
    >
      {/* subtle premium bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.10),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_80%,rgba(15,23,42,0.06),transparent_42%)]" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">

        {/* EYEBROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center px-4 py-2 mb-6 text-xs font-semibold tracking-wider uppercase rounded-full border border-orange-200 bg-orange-50 text-orange-600"
        >
          Getting Started
        </motion.div>

        {/* HEADING */}
        <div className="font-display font-bold leading-tight tracking-tight text-gray-900 space-y-2">
          {["Live in 10 minutes.", "No IT team needed."].map((line, idx) => (
            <motion.h2
              key={line}
              initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
              animate={
                startSequence
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 26, filter: "blur(6px)" }
              }
              transition={{
                delay: idx * 0.24,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={
                idx === 0
                  ? "block text-[clamp(26px,4vw,42px)]"
                  : "block text-[clamp(24px,3.5vw,38px)] text-gray-700"
              }
            >
              {idx === 0 ? (
                <>
                  Live in <span className="text-orange-500 italic">10 minutes.</span>
                </>
              ) : (
                line
              )}
            </motion.h2>
          ))}
        </div>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={startSequence ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.45, duration: 0.55 }}
          className="mt-5 text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {[
            "No 3-day onboarding calls.",
            "No setup fees.",
            "No migration headaches.",
            "Your front desk staff can run it from day one.",
          ].map((piece, idx) => (
            <motion.span
              key={piece}
              initial={{ opacity: 0, y: 8 }}
              animate={startSequence ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.55 + idx * 0.12, duration: 0.35 }}
              className={idx === 3 ? "font-medium text-gray-900" : ""}
            >
              {piece}{" "}
            </motion.span>
          ))}
        </motion.p>

        {/* STEPS — mobile stack, desktop row + connectors */}
        <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-3">
          {steps.map((step, idx) => (
            <Fragment key={step.title}>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={startSequence ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                transition={{
                  delay: 1.1 + idx * 0.45,
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto flex max-w-sm flex-1 flex-col items-center text-center rounded-2xl border border-white/40 bg-white/35 p-5 backdrop-blur-xl md:mx-0 md:max-w-none md:px-5"
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={startSequence ? { scale: 1, opacity: 1 } : { scale: 0.92, opacity: 0 }}
                  transition={{ delay: 1.2 + idx * 0.45, duration: 0.55 }}
                  whileHover={{ scale: 1.04 }}
                  className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-lg font-bold text-orange-600 ring-4 ring-white"
                >
                  {idx + 1}
                </motion.div>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">{step.title}</h3>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-gray-600">{step.body}</p>
              </motion.div>

              {idx < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={startSequence ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 1.35 + idx * 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden h-px flex-1 origin-left bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 md:mt-6 md:block"
                  aria-hidden
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* CLIFF TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="mx-auto mt-20 max-w-5xl px-6 text-center"
      >
        <p className="font-display text-lg md:text-2xl font-semibold text-gray-600 leading-snug max-w-2xl mx-auto rounded-2xl border border-orange-100 bg-white/75 px-6 py-6 backdrop-blur">
          Still not sure if the math adds up for your hotel?
          <br />
          <span className="text-orange-500">
            Let&apos;s calculate your exact ROI right now.
          </span>
        </p>
      </motion.div>
    </section>
  );
}