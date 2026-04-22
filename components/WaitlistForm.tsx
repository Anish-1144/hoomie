"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BedDouble,
  Building2,
  Hotel,
  House,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";

type WaitlistFormProps = {
  mode?: "section" | "popup";
  initialEmail?: string;
  onClose?: () => void;
};

function getCouponCode(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const record = payload as Record<string, unknown>;
  const candidates: unknown[] = [
    record.couponCode,
    record.code,
    record.coupon,
    record.coupon_code,
    record.data,
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (value && typeof value === "object") {
      const nested = value as Record<string, unknown>;
      if (typeof nested.couponCode === "string" && nested.couponCode.trim()) {
        return nested.couponCode.trim();
      }
      if (typeof nested.code === "string" && nested.code.trim()) {
        return nested.code.trim();
      }
    }
  }
  return "";
}

export default function WaitlistForm({
  mode = "section",
  initialEmail = "",
  onClose,
}: WaitlistFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: initialEmail,
    phone: "",
    hotelLocationCity: "",
    hotelName: "",
    totalProperties: "",
    totalRooms: "",
    currentPmsName: "",
    featureRequest: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setForm((prev) => ({ ...prev, phone: value.replace(/\D/g, "").slice(0, 15) }));
      return;
    }
    if (name === "totalProperties" || name === "totalRooms") {
      const digits = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, [name]: digits }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://api.ninexhoomie.com/api/v1/new-plans/admin/coupons",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            couponTypeId: "69de0b3a37a5a0765dbba365",
            ...form,
            totalProperties: Number(form.totalProperties),
            totalRooms: Number(form.totalRooms),
            description: "Prelaunch PMS coupon",
            planTypes: ["pms"],
            isActive: true,
          }),
        }
      );

      if (res.ok) {
        const responseData = await res.json().catch(() => null);
        const code = getCouponCode(responseData);
        setForm({
          name: "",
          email: initialEmail,
          phone: "",
          hotelLocationCity: "",
          hotelName: "",
          totalProperties: "",
          totalRooms: "",
          currentPmsName: "",
          featureRequest: "",
        });
        router.push(code ? `/thankyou?code=${encodeURIComponent(code)}` : "/thankyou");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please check your connection.");
    }

    setLoading(false);
  };

  return (
    <>
      <section
        className={`relative overflow-hidden text-[#3e2b1f] ${
          mode === "popup" ? "bg-transparent pb-0 pt-0" : "bg-[#f6e6cf] pb-24 pt-20"
        }`}
      >
        {mode === "section" && (
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/formbg.jpeg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {mode === "section" && (
            <div className="mb-6 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f3b57d] bg-[#fff5e8] px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#d26217]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#ef7c2d]" />
                Early Access
              </span>
            </div>
          )}

          <div className="mx-auto w-full max-w-3xl">
            <div
              className={`relative rounded-[1.9rem] border border-white/80 bg-[#fff2e3]/95 ${
                mode === "popup" ? "p-5 sm:p-6 lg:p-7" : "p-6 sm:p-8 lg:p-10"
              }`}
            >
              {mode === "popup" && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full p-1 text-[#8f725d] transition hover:bg-[#f7e5d0] hover:text-[#4a3324]"
                  aria-label="Close waitlist form"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <div className={`border-b border-[#e8c9a9] ${mode === "popup" ? "mb-5 pb-4" : "mb-7 pb-6"}`}>
                <h3 className="text-2xl font-bold text-[#2f1f15]">Join the Waitlist</h3>
                <p className="mt-1 text-sm text-[#7a5d49]">
                  Get early access and lock in founder pricing , takes 2 minutes.
                </p>
              </div>

              <form onSubmit={handleSubmit} className={mode === "popup" ? "space-y-4" : "space-y-5"}>
                {/* Row 1 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full Name" icon={<User className="h-full w-full" />}>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email Address" icon={<Mail className="h-full w-full" />}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@hotel.com"
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Phone Number" icon={<Phone className="h-full w-full" />}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      pattern="[0-9]*"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10 digit mobile number"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Hotel Location City" icon={<MapPin className="h-full w-full" />}>
                    <input
                      id="hotelLocationCity"
                      name="hotelLocationCity"
                      value={form.hotelLocationCity}
                      onChange={handleChange}
                      placeholder="Mumbai"
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Hotel name" icon={<Hotel className="h-full w-full" />}>
                    <input
                      id="hotelName"
                      name="hotelName"
                      value={form.hotelName}
                      onChange={handleChange}
                      placeholder="Your hotel name"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Current PMS Name" icon={<Building2 className="h-full w-full" />}>
                    <input
                      id="currentPmsName"
                      name="currentPmsName"
                      value={form.currentPmsName}
                      onChange={handleChange}
                      placeholder="e.g. Opera, Cloudbeds, eZee…"
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Total Properties" icon={<House className="h-full w-full" />}>
                    <input
                      id="totalProperties"
                      name="totalProperties"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      minLength={1}
                      required
                      value={form.totalProperties}
                      onChange={handleChange}
                      placeholder="1"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Total Rooms" icon={<BedDouble className="h-full w-full" />}>
                    <input
                      id="totalRooms"
                      name="totalRooms"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      minLength={1}
                      required
                      value={form.totalRooms}
                      onChange={handleChange}
                      placeholder="50"
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Feature request */}
                <div>
                  <label
                    htmlFor="featureRequest"
                    className="mb-1.5 block text-sm font-semibold text-[#4a3324]"
                  >
                    Feature Request
                    <span className="ml-1.5 text-xs font-normal text-[#987e68]">(optional)</span>
                  </label>
                  <textarea
                    id="featureRequest"
                    name="featureRequest"
                    value={form.featureRequest}
                    onChange={handleChange}
                    rows={mode === "popup" ? 2 : 3}
                    placeholder="Tell us what matters most to your operation…"
                    className="w-full resize-none rounded-xl border border-[#ead0b5] bg-[#fff8ef] px-4 py-3 text-sm text-[#2f1f15] outline-none transition placeholder:text-[#9f8873] focus:border-[#ee7a20] focus:bg-white focus:ring-4 focus:ring-orange-300/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-1 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#ef6c16] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#dc5f0d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Secure My Spot
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#8d735e]">
                  No spam. No commitments. Cancel any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Shared input class ─── */
const inputClass =
  "w-full rounded-xl border border-[#ead0b5] bg-[#fff8ef] px-4 py-3 text-sm text-[#2f1f15] outline-none transition placeholder:text-[#9f8873] focus:border-[#ee7a20] focus:bg-white focus:ring-4 focus:ring-orange-300/20";

/* ─── Field wrapper ─── */
function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#4a3324]">
        <span className="h-4 w-4 text-[#8b6f59]">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}
