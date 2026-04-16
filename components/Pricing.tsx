"use client";

import { motion } from "framer-motion";
import WaitlistPopupButton from "@/components/WaitlistPopupButton";

type PricingPlan = {
  title: string;
  desc: string;
  price: string;
  old: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const PRICING_PLANS: PricingPlan[] = [
  {
    title: "Starter",
    desc: "For small hotels · Up to 20 rooms",
    price: "₹1,499",
    old: "₹1,999",
    features: [
      "PMS Dashboard",
      "QR Check-in + Booking URL",
      "Built-in Payments",
      "Travel Agent Network",
      "Basic Analytics · 2 users",
    ],
    cta: "Join Waitlist",
  },
  {
    title: "Intermediate",
    desc: "Hotels with F&B · Unlimited rooms",
    price: "₹4,499",
    old: "₹5,999",
    featured: true,
    features: [
      "Everything in Starter",
      "Restaurant POS + KOT",
      "Housekeeper Dashboard",
      "Advanced Analytics",
      "Guest Messaging",
    ],
    cta: "Start Free Trial →",
  },
  {
    title: "Pro",
    desc: "Multi-property · Hotel chains",
    price: "₹7,499",
    old: "₹9,999",
    features: [
      "Everything in Intermediate",
      "Multi-property Dashboard",
      "API Access",
      "Custom Reporting",
      "Dedicated Manager",
    ],
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-white pb-20 pt-24">

      {/* subtle bg */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.05),transparent_40%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">

        {/* EYEBROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex px-4 py-2 mb-6 text-xs font-semibold uppercase rounded-full border border-orange-200 bg-orange-50 text-orange-600"
        >
          Pricing
        </motion.div>

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-gray-900"
        >
          <span className="block text-[clamp(26px,4vw,42px)]">
            Transparent. Bundled.
          </span>
          <span className="block text-[clamp(28px,4.5vw,46px)] text-orange-500 italic">
            Built to break the market.
          </span>
        </motion.h2>

        {/* SUBTEXT */}
        <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
          Every competitor charges ₹3,000–₹25,000/month — often with hidden fees.
          <span className="text-gray-900 font-medium">
            {" "}Hoomie is one flat price. Everything included.
          </span>
        </p>

        {/* CARDS */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
            />
          ))}
        </div>

        {/* INFO BOX */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left">
          <h4 className="font-semibold text-gray-900 mb-2">
            Why this pricing breaks the market
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            A 10-room hotel pays ₹9,000+/month across tools.
            <span className="text-gray-900 font-medium">
              {" "}With Hoomie: ₹999/month — all included.
            </span>
          </p>
        </div>

      </div>

      {/* CLIFF */}
      <div className="mx-auto mt-20 max-w-5xl px-6 text-center">
        <p className="font-display text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto">
          Pricing settled. Still have questions?
          <br />
          <span className="text-orange-500">
            We&apos;ve answered everything below.
          </span>
        </p>
      </div>
    </section>
  );
}

/* CARD */
type PricingCardProps = PricingPlan & {
};

function PricingCard({
  title,
  desc,
  price,
  old,
  features,
  cta,
  featured,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-none transition-colors duration-300 hover:border-orange-400 hover:bg-orange-50/50"
    >
      {/* badge only (no bg change) */}
      {featured && (
        <div className="absolute -top-3 left-4 text-xs bg-orange-500 text-white px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}

      <p className="text-xs text-gray-500 mb-2">{desc}</p>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <div className="mt-3 text-2xl font-bold text-gray-900">
        {price}
        <span className="text-sm text-gray-500">/mo</span>
      </div>

      <div className="text-xs text-gray-400 line-through">{old}</div>

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        {features.map((f: string, i: number) => (
          <li key={i}>✓ {f}</li>
        ))}
      </ul>

      <WaitlistPopupButton
        className="mt-7 block w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-center text-base font-semibold tracking-tight text-slate-900 transition duration-200 hover:border-slate-300 hover:bg-slate-50 active:translate-y-px"
      >
        {cta}
      </WaitlistPopupButton>
    </motion.div>
  );
}