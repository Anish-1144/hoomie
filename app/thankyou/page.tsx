"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { Sparkles } from "lucide-react";
/* 🔹 Separate component for coupon */
function CouponCode() {
  const searchParams = useSearchParams();
  const couponCode = searchParams.get("code");

  return (
    <div className="mt-3 flex items-center justify-between">
      <span className="text-2xl font-mono font-bold text-orange-600 tracking-wider">
        {couponCode || "Check your email"}
      </span>

      {couponCode && (
        <button
          onClick={() => navigator.clipboard.writeText(couponCode)}
          className="text-sm font-medium text-orange-500 hover:underline"
        >
          Copy
        </button>
      )}
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-200">
        {/* Top Status */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
            <Check className="h-6 w-6 text-orange-600" strokeWidth={3} />
          </div>
          <p className="text-sm text-slate-500">Registration successful</p>
        </div>

        {/* Heading */}
        <h1 className="mt-5 text-4xl font-bold leading-tight">
          {"You're in."}
          <br />
          <span className="text-orange-600">
            Welcome to Ninex Hoomie{" "}
            <Sparkles className="inline h-5 w-5 ml-1 animate-pulse" />
          </span>
        </h1>

        <p className="mt-3 text-slate-600 text-base leading-relaxed">
          We’ve saved your spot. You’ll get early access + updates soon.
        </p>

        {/* Coupon Card */}
        <div className="relative mt-6">
          {/* Ticket cuts */}
          <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white" />
          <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white" />

          <div className="rounded-2xl border border-orange-200 bg-orange-50/40 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Early Access Pass
            </p>

            {/* ✅ Suspense wrapper */}
            <Suspense
              fallback={<p className="mt-3 text-slate-400">Loading...</p>}
            >
              <CouponCode />
            </Suspense>

            <div className="my-4 border-t border-dashed border-orange-200" />

            <p className="text-sm text-slate-500">
              Use this code when we launch. A copy is also sent to your email.
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="mt-8 block w-full rounded-xl bg-orange-600 py-3 text-center text-white font-semibold hover:bg-orange-700 transition"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
