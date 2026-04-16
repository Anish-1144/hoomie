"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCTAHandler } from "./useCTA";
import WaitlistPopupButton from "@/components/WaitlistPopupButton";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const handleCTA = useCTAHandler();
  return (
    <section id="final-cta" className="relative bg-white pb-20 pt-24 text-center">

      {/* subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.08),transparent_40%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">

        {/* EYEBROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex px-4 py-2 mb-6 text-xs font-semibold uppercase rounded-full border border-orange-200 bg-orange-50 text-orange-600"
        >
          Limited Founder Access
        </motion.div>

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-slate-900"
        >
          <span className="block text-[clamp(28px,5vw,52px)]">
            Your competitors are
          </span>
          <span className="block text-[clamp(30px,5.5vw,56px)] text-orange-500 italic">
            already on the list.
          </span>
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mx-auto mt-6 max-w-xl text-base text-slate-600 md:text-lg"
        >
          Founder pricing is limited to the first 100 properties.
          <span className="font-medium text-slate-900">
            {" "}Join now — lock in 25% off forever.
          </span>
        </motion.p>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder="your.hotel@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="final-email-input min-w-0 flex-1 rounded-2xl border border-slate-200 px-5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
          />
          <WaitlistPopupButton
            initialEmail={email}
            className="rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 active:translate-y-px"
          >
            Join Now — Free →
          </WaitlistPopupButton>
        </motion.div>

        {/* COUNTER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-6 text-sm text-slate-500"
        >
          <span className="font-semibold text-slate-900">
            312 property owners
          </span>{" "}
          have already joined ·{" "}
          <span className="text-orange-500 font-semibold">
            88 founder spots remaining
          </span>
        </motion.div>

      </div>
    </section>
  );
}