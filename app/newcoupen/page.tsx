"use client";

import { useState } from "react";
import RouteNavbar from "./RouteNavbar";
import NewFooter from "@/components/NewFooter";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20";

export default function NewCoupenPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    hotelName: "",
    currentPmsName: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://api.ninexhoomie.com/api/v1/new-plans/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couponTypeId: "69de0b3a37a5a0765dbba365",
          name: form.name,
          email: form.email,
          phone: form.phone,
          hotelLocationCity: form.location,
          hotelName: form.hotelName,
          currentPmsName: form.currentPmsName,
          description: "Prelaunch PMS coupon",
          planTypes: ["pms"],
          isActive: true,
        }),
      });
      const payload = await res.json().catch(() => null);
      if (res.ok) {
        setCouponCode(payload?.data?.code ?? "");
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          location: "",
          hotelName: "",
          currentPmsName: "",
        });
      } else {
        alert(payload?.message || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please check your connection.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <RouteNavbar />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-orange-200/50 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full bg-amber-100/60 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-14">
          <section className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
              Prelaunch coupon
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              Get your PMS at
              <span className="mt-1 block bg-gradient-to-r from-orange-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                ₹999/month
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600">
              Hoomie replaces all of them — PMS, channel manager, booking engine, payment gateway,
              and restaurant POS in one platform. Starting at ₹999/month.
            </p>
            <ul className="space-y-3 text-sm text-slate-700">
              {[
                "One dashboard for PMS, channel manager, booking engine, POS, and payments",
                "Real-time inventory and rate sync across OTAs and direct bookings",
                "Fast check-in, billing, and settlements built for Indian hotels and lodges",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                    ✓
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="relative overflow-hidden rounded-2xl border border-orange-200/70 bg-gradient-to-br from-orange-50 via-white to-amber-50/30 p-6 shadow-sm ring-1 ring-orange-500/10">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-orange-300/25 blur-2xl"
                aria-hidden
              />
              <p className="relative text-[10px] font-bold uppercase tracking-[0.22em] text-orange-700">
                Exclusive access
              </p>
              <p className="relative mt-2 font-display text-xl font-bold tracking-tight text-slate-900">
                Ninex Hoomie · members first
              </p>
              <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                Become an exclusive member — founder pricing, early product access, and a direct
                path to onboarding.
              </p>
            </div>
          </section>

          <section className="relative">
            <div
              className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-orange-300/35 via-transparent to-amber-200/40 opacity-90 blur-sm"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/80 backdrop-blur">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/90 px-5 py-4 sm:px-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                    Coupon request
                  </p>
                  <p className="font-display text-lg font-semibold text-slate-900">
                    New coupon
                  </p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-orange-700">
                  Live
                </div>
              </div>

              <div className="px-5 py-6 sm:px-6 sm:py-8">
                {success ? (
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-200">
                      <svg
                        className="h-7 w-7 text-emerald-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h2 className="font-display text-xl font-bold text-slate-900">Thank you!</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Your coupon has been created successfully. You will get this code in your
                      email.
                    </p>
                    <div className="mx-auto mt-4 w-full max-w-md rounded-2xl border border-orange-200 bg-orange-50 px-4 py-4 text-center">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-700">
                        Your Coupon Code
                      </p>
                      <p className="mt-2 font-mono text-2xl font-bold tracking-wider text-orange-800">
                        {couponCode || "Generated and sent to your email"}
                      </p>
                      <p className="mt-2 text-xs text-slate-600">
                        Use this code to claim your Ninex Hoomie offer.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm">
                        <span className="mb-1.5 block font-medium text-slate-700">
                          Full name
                        </span>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </label>
                      <label className="block text-sm">
                        <span className="mb-1.5 block font-medium text-slate-700">
                          Work email
                        </span>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="you@hotel.com"
                          className={inputClass}
                        />
                      </label>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm">
                        <span className="mb-1.5 block font-medium text-slate-700">
                          Phone
                        </span>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91 …"
                          className={inputClass}
                        />
                      </label>
                      <label className="block text-sm">
                        <span className="mb-1.5 block font-medium text-slate-700">
                          Location
                        </span>
                        <input
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          required
                          placeholder="Hotel location"
                          className={inputClass}
                        />
                      </label>
                    </div>
                    <label className="block text-sm">
                      <span className="mb-1.5 block font-medium text-slate-700">
                        Hotel name
                      </span>
                      <input
                        name="hotelName"
                        value={form.hotelName}
                        onChange={handleChange}
                        required
                        placeholder="Your hotel name"
                        className={inputClass}
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1.5 block font-medium text-slate-700">
                        Current PMS
                      </span>
                      <input
                        name="currentPmsName"
                        value={form.currentPmsName}
                        onChange={handleChange}
                        required
                        placeholder="What you use today"
                        className={inputClass}
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending…
                        </>
                      ) : (
                        "Request coupon"
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-500">
                      By submitting, you agree we may contact you about Hoomie
                      prelaunch offers.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <NewFooter />
    </div>
  );
}
