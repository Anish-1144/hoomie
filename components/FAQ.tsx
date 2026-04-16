"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import WaitlistPopupButton from "@/components/WaitlistPopupButton";

const faqData = [
  {
    q: "Do I need to pay anything to join the waitlist?",
    a: "No. Joining the waitlist is completely free. You only pay when you activate your account after launch. Founder pricing is locked the moment you sign up."
  },
  {
    q: "What happens to my current PMS data and bookings?",
    a: "Our onboarding team migrates your existing room setup, guest history, and booking data free of charge. Most properties are fully live within 24 hours."
  },
  {
    q: "How does the 19,000 travel agent network actually work?",
    a: "Once your property is live on Hoomie, it's discoverable to all verified travel agents on the network. They search availability and book directly into your live inventory. You confirm, and receive payment within 3 business days."
  },
  {
    q: "Is there a setup fee or long-term contract?",
    a: "Zero setup fee. Month-to-month billing — no lock-in, no annual commitment forced on you. Cancel any time."
  },
  {
    q: "Does Hoomie work for properties with a restaurant or bar?",
    a: "Yes — the Intermediate and Pro plans include a full Restaurant POS with KOT, table QR ordering, and billing."
  },
  {
    q: "Is Hoomie compliant with Indian GST and tax requirements?",
    a: "Completely. Hoomie auto-applies GST, generates invoices, and produces filing-ready reports every month."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0); // first open by default

  return (
    <section
      id="faq"
      className="relative overflow-hidde pb-16 pt-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/FAQBG.jpeg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 w-full p-2 sm:p-4 lg:p-6">
          <div className="relative overflow-hidden rounded-[20px] border border-white/20  p-4 backdrop-blur-xl sm:p-6 lg:p-7">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full  blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full  blur-3xl" />
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(240px,0.95fr)_1.35fr] lg:gap-12">
            <div className="flex h-full flex-col items-center p-3 text-center sm:p-4 lg:items-start lg:text-left">
              <div>
                <h3 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Find us across
                  <br />
                  <span className="text-orange-200">India</span>
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-orange-50/80">
                  Built for modern hotel teams that
                  want faster bookings, fewer systems and stronger margins.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-3 lg:mt-auto lg:justify-start">                
                <WaitlistPopupButton
                  className="inline-flex rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-orange-200 hover:bg-white/10"
                >
                  Claim My Spot Today
                </WaitlistPopupButton>
                <WaitlistPopupButton
                  className="inline-flex rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition"
                >
                  Book a Free Demo Call
                </WaitlistPopupButton>
              </div>
            </div>

            {/* FAQ LIST */}
            <div className="space-y-1 p-1 sm:p-2">
              {faqData.map((item, idx) => {
                const isOpen = open === idx;

                return (
                  <div
                    key={item.q}
                    className={`border-b transition-all ${
                      isOpen
                        ? "border-orange-200/80"
                        : "border-white/20 hover:border-orange-200/70"
                    }`}
                  >
                    {/* QUESTION */}
                    <button
                      onClick={() => setOpen(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-5"
                    >
                      <span className="pr-4 text-base font-semibold text-orange-50 sm:text-lg">
                        {item.q}
                      </span>

                      <span
                        className={`text-2xl leading-none transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-orange-100" : "text-orange-200/80"
                        }`}
                      >
                        +
                      </span>
                    </button>

                    {/* ANSWER */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-5 text-sm leading-relaxed text-orange-50/85 sm:px-5 sm:text-base">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* CLIFF */}
      <div className="mx-auto mt-16 max-w-6xl px-6 text-center">
        <p className="mx-auto max-w-2xl font-display text-lg text-orange-50/80 md:text-2xl">
          Questions answered. Pricing clear. ROI proven.
          <br />
          <span className="text-orange-200">
            The only thing left is to claim your spot.
          </span>
        </p>
      </div>
    </section>
  );
}