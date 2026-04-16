"use client";
import { useState } from "react";

const features = [
  {
    title: "PMS Dashboard",
    body: "Reservations, room management, front desk, guest history — one clean view your staff can learn in 20 minutes.",
    replaces: "Replaces eZee / Hotelogix",
  },
  {
    title: "QR Check-in + Booking URL",
    body: "Guests scan, fill their own form, check in. Your own private booking link — zero commission, forever yours.",
    replaces: "Replaces OTA commission on direct traffic",
  },
  {
    title: "Built-in Payments + 3-Day Payout",
    body: "Accept UPI, cards, net banking. Get paid in 3 days — not 15. No third-party gateway. No extra charges.",
    replaces: "Replaces Razorpay / PayU add-on",
  },
  {
    title: "Restaurant POS + KOT",
    body: "Table QR ordering, kitchen tickets, billing — auto-synced to your hotel account. One less app, finally.",
    replaces: "Replaces Petpooja / separate POS",
  },
  {
    title: "Travel Agent Network",
    body: "19,000+ verified Indian travel agents book directly into your live inventory. No WhatsApp, no back-and-forth.",
    replaces: "Replaces manual agent coordination",
  },
  {
    title: "GST-Ready Analytics",
    body: "Occupancy, revenue, channel performance — GST-compliant reports generated automatically. No accountant needed.",
    replaces: "Replaces your Excel files",
  },
];

const rowBackgrounds = [
  "bg-[#e98f59]",
  "bg-[#e8a173]",
  "bg-[#e9b38f]",
  "bg-[#ebc4aa]",
  "bg-[#edd4c3]",
  "bg-[#efe3da]",
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  const toggleFeature = (index: number) => {
    setActiveFeature((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="features" className="relative bg-white pb-20 pt-24 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.06),transparent_40%)] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-3 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center justify-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-600">
          The Solution
        </div>

        <h2 className="font-display font-bold leading-tight tracking-tight text-gray-900">
          <span className="text-[clamp(1.6rem,4.2vw,3rem)]">
            One platform.{" "}
            <span className="italic text-orange-500">Everything replaced.</span>
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
          Hoomie is the only Indian PMS that bundles all of this —
          <span className="font-semibold text-gray-900">
            {" "}
            at one flat price with zero setup fees and free onboarding.
          </span>
        </p>

        <div className="mx-auto mt-12 w-full overflow-hidden border border-[#f1d5bf]">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`${rowBackgrounds[index]} ${
                index !== features.length - 1 ? "border-b border-white/30" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFeature(index)}
                className="w-full text-left"
                aria-expanded={activeFeature === index}
              >
                <div className="grid items-stretch md:grid-cols-[1fr_1fr]">
                  <div className="flex gap-4 px-4 py-4 sm:px-6 sm:py-5">
                    <div className="mt-0.5 flex items-start gap-3 whitespace-nowrap text-sm font-semibold text-black/55">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span aria-hidden="true">→</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="max-w-[24ch] text-[1.1rem] font-semibold uppercase leading-tight tracking-normal text-black/95 md:text-[1.35rem] md:leading-[1.1]">
                        {feature.title}
                      </h3>

                      {activeFeature === index && (
                        <>
                          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-black/70 md:text-base">
                            {feature.body}
                          </p>
                          <p className="mt-3 text-sm font-semibold text-black/60">
                            ↳ {feature.replaces}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="hidden border-l border-white/25 md:flex md:items-center md:justify-center">
                    <span
                      className={`text-3xl font-semibold transition-transform duration-300 ${
                        activeFeature === index ? "rotate-90 text-black/30" : "text-black/20"
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </div>
              </button>

              <div className="flex items-center justify-end px-5 pb-4 md:hidden">
                <span
                  className={`text-xl font-semibold transition-transform duration-300 ${
                    activeFeature === index ? "rotate-90 text-black/40" : "text-black/25"
                  }`}
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-5xl px-6 text-center md:mt-16">
        <p className="mx-auto max-w-3xl font-display text-xl font-semibold leading-snug text-gray-700 md:text-4xl">
          Six tools in one platform is impressive.
          <br />
          <span className="text-orange-500">But what does it actually cost you to not switch?</span>
        </p>
      </div>
    </section>
  );
}