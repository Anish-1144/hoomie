"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "We went from using 3 apps to just Hoomie. Check-in time dropped from 12 minutes to under 2. The travel agent bookings alone recovered ₹40,000 in the first month.",
    initials: "RK",
    name: "Rajesh K.",
    role: "18-room resort · Coorg",
  },
  {
    quote:
      "I was paying ₹11,000 across 4 tools. Hoomie does more — for ₹5,999. The 3-day payout changed everything for our cash flow. December was our best month ever.",
    initials: "PM",
    name: "Priya M.",
    role: "Boutique hotel · Udaipur",
  },
  {
    quote:
      "Restaurant POS included was the biggest surprise. No more jumping between systems on Friday nights. Everything talks to each other — billing, rooms, payments. Finally.",
    initials: "AS",
    name: "Amit S.",
    role: "32-room hotel + restaurant · Manali",
  },
];

export default function Testimonials() {
  return (
    <section className="relative pt-24 pb-20 bg-white">

      {/* subtle bg */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(249,115,22,0.05),transparent_40%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">

        {/* EYEBROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex px-4 py-2 mb-6 text-xs font-semibold uppercase rounded-full border border-orange-200 bg-orange-50 text-orange-600"
        >
          Early Feedback
        </motion.div>

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-gray-900"
        >
          <span className="block text-[clamp(26px,4vw,42px)]">
            Hotel owners who tried it
          </span>
          <span className="block text-[clamp(28px,4.5vw,46px)] text-orange-500 italic">
            didn&apos;t go back.
          </span>
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-5 text-gray-600 max-w-2xl mx-auto"
        >
          Feedback from our closed beta — real property owners across India.
        </motion.p>

        {/* GRID */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">

          {testimonials.map((item, idx) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
            >

              {/* STARS */}
              <div className="text-orange-400 text-sm mb-3">★★★★★</div>

              {/* QUOTE */}
              <blockquote className="text-sm text-gray-700 leading-relaxed mb-6">
                “{item.quote}”
              </blockquote>

              {/* AUTHOR */}
              <div className="flex items-center gap-3">
                
                {/* avatar */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
                  {item.initials}
                </div>

                {/* details */}
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {item.name}
                    <span className="ml-2 text-[10px] px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full">
                      Beta
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{item.role}</div>
                </div>

              </div>
            </motion.article>
          ))}

        </div>
      </div>

      {/* CLIFF TEXT */}
      <div className="mx-auto mt-20 max-w-5xl px-6 text-center">
        <p className="font-display text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto">
          Happy customers are easy when the product works.
          <br />
          <span className="text-orange-500">
            The real question is — what does it cost you?
          </span>
        </p>
      </div>
    </section>
  );
}