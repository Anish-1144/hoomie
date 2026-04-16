"use client";

import { motion } from "framer-motion";

const COMPETITORS = [
  ["eZee Absolute", "₹3K–₹6K", "✗", "✗", "✗", "~ Add-on"],
  ["Hotelogix", "₹250–400/room", "✗", "~ 3rd party", "✗", "~ Separate"],
  ["DJUBO", "₹4K–₹8K", "✗", "✗", "✗", "✗"],
  ["Cloudbeds", "₹700–₹1K/room", "✗", "✗", "✗", "✗"],
] as const;

const thClass =
  "px-3 py-3 sm:px-5 sm:py-4 font-semibold text-[10px] sm:text-xs whitespace-nowrap";
const tdClass = "px-3 py-3 sm:px-5 sm:py-4 align-middle text-xs sm:text-sm";

export default function CompareTable() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 pt-16 pb-16 sm:pt-24 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(249,115,22,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_35%,rgba(249,115,22,0.06),transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 inline-flex items-center justify-center rounded-full border border-orange-200/80 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-600 shadow-sm backdrop-blur-md"
        >
          Competitive Comparison
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold leading-tight tracking-tight text-gray-900 whitespace-nowrap"
        >
          <span className="inline text-[clamp(1.5rem,4vw,2.625rem)]">Hoomie vs. </span>
          <span className="inline text-[clamp(1.5rem,4vw,2.625rem)] italic text-orange-500">
            every alternative
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-5 max-w-4xl whitespace-nowrap text-sm text-gray-600 sm:text-base md:text-lg"
        >
          No other Indian PMS has all three of Hoomie&apos;s unique features.{" "}
          <span className="font-medium text-gray-900">Here&apos;s the full market truth.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-10 sm:mt-12"
        >
          <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-slate-200/60 via-slate-100/30 to-slate-200/60 opacity-70 blur-sm" />
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-transparent shadow-[0_8px_40px_-12px_rgba(15,23,42,0.12),inset_0_1px_0_0_rgba(255,255,255,0.65)] backdrop-blur-md backdrop-saturate-150 sm:rounded-3xl">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-100/35 via-transparent to-slate-200/25" />

            <div className="relative overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
              <table className="w-full min-w-[840px] text-left sm:min-w-[980px]">
                <thead>
                  <tr className="border-b border-white/50 bg-white/35 text-gray-600 backdrop-blur-md">
                    <th
                      className={`${thClass} sticky left-0 z-30 border-r border-white/40 bg-white/55 pl-4 shadow-[4px_0_12px_-4px_rgba(15,23,42,0.08)] backdrop-blur-md sm:pl-5`}
                    >
                      Platform
                    </th>
                    <th className={thClass}>Price</th>
                    <th className={thClass}>QR Check-in</th>
                    <th className={thClass}>Payments</th>
                    <th className={thClass}>Agent Network</th>
                    <th className={`${thClass} pr-4 sm:pr-5`}>POS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/40">
                  <tr className="bg-gradient-to-r from-orange-50/70 via-orange-50/40 to-transparent">
                    <td
                      className={`${tdClass} sticky left-0 z-20 border-r border-orange-200/40 bg-orange-50/90 pl-4 font-semibold text-gray-900 shadow-[4px_0_14px_-6px_rgba(234,88,12,0.2)] backdrop-blur-md sm:pl-5`}
                    >
                      Ninex Hoomie
                    </td>
                    <td className={tdClass}>
                      <span className="inline-flex rounded-full bg-orange-500/15 px-2.5 py-1 text-[11px] font-semibold text-orange-700 ring-1 ring-orange-500/20 sm:px-3 sm:text-xs">
                        ₹1,999/mo
                      </span>
                    </td>
                    <td className={`${tdClass} font-medium text-emerald-600`}>
                      ✓ Yes
                    </td>
                    <td className={`${tdClass} font-medium text-emerald-600`}>
                      ✓ Native
                    </td>
                    <td className={`${tdClass} font-medium text-emerald-600`}>
                      ✓ 19K+
                    </td>
                    <td className={`${tdClass} pr-4 font-medium text-emerald-600 sm:pr-5`}>
                      ✓ Included
                    </td>
                  </tr>

                  {COMPETITORS.map((row) => (
                    <tr
                      key={row[0]}
                      className="transition-colors hover:bg-white/35"
                    >
                      <td
                        className={`${tdClass} sticky left-0 z-10 border-r border-slate-200/50 bg-white/75 pl-4 font-medium text-gray-900 shadow-[4px_0_12px_-4px_rgba(15,23,42,0.06)] backdrop-blur-md sm:pl-5`}
                      >
                        {row[0]}
                      </td>
                      <td className={`${tdClass} text-gray-600`}>{row[1]}</td>
                      <td className={`${tdClass} text-gray-500`}>{row[2]}</td>
                      <td className={`${tdClass} text-gray-500`}>{row[3]}</td>
                      <td className={`${tdClass} text-gray-500`}>{row[4]}</td>
                      <td className={`${tdClass} pr-4 text-gray-500 sm:pr-5`}>
                        {row[5]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-3 text-left text-[11px] text-gray-500 sm:hidden">
            Swipe sideways to see all columns.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-5xl px-4 text-center sm:mt-20 sm:px-6">
        <p className="mx-auto max-w-2xl font-display text-base font-semibold text-gray-600 sm:text-lg md:text-2xl">
          The comparison speaks for itself.
          <br />
          <span className="text-orange-500">
            But numbers hit harder than tables — see your hotel&apos;s exact
            gain.
          </span>
        </p>
      </div>
    </section>
  );
}
