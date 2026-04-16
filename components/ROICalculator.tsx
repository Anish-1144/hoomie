"use client";

import { useMemo, useState } from "react";
import WaitlistPopupButton from "@/components/WaitlistPopupButton";

type Plan = {
  name: string;
  details: string;
  price: number;
  otaFee: number;
  processingFee: number;
};

const plans: Plan[] = [
  {
    name: "Get to know",
    details: "Small fast plan · Up to 10 rooms · 1 property",
    price: 999,
    otaFee: 6.5,
    processingFee: 3.75,
  },
  {
    name: "Basic",
    details: "Basic PMS & POS · Balanced tier",
    price: 2499,
    otaFee: 5.5,
    processingFee: 3.625,
  },
  {
    name: "Intermediate",
    details: "For growing properties · Balanced tier",
    price: 4499,
    otaFee: 4.5,
    processingFee: 3.4,
  },
];

const BASELINE_OTA_FEE = 6.5;
const BASELINE_PROCESSING_FEE = 3.75;

const formatMoney = (value: number) =>
  `₹${Math.round(value).toLocaleString("en-IN")}`;
const formatLarge = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
  return formatMoney(value);
};

export default function ROICalculator() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [rooms, setRooms] = useState(30);
  const [avgRate, setAvgRate] = useState(2500);
  const [otaPercent, setOtaPercent] = useState(60);
  const [foodRevenue, setFoodRevenue] = useState(80000);
  const inputFields: {
    label: "Rooms" | "Avg Rate" | "OTA %" | "F&B Revenue";
    value: number;
    setter: React.Dispatch<React.SetStateAction<number>>;
    min: number;
    max: number;
    step: number;
  }[] = [
    { label: "Rooms", value: rooms, setter: setRooms, min: 5, max: 200, step: 1 },
    {
      label: "Avg Rate",
      value: avgRate,
      setter: setAvgRate,
      min: 500,
      max: 20000,
      step: 100,
    },
    { label: "OTA %", value: otaPercent, setter: setOtaPercent, min: 10, max: 90, step: 1 },
    {
      label: "F&B Revenue",
      value: foodRevenue,
      setter: setFoodRevenue,
      min: 0,
      max: 600000,
      step: 1000,
    },
  ];

  const data = useMemo(() => {
    const roomRevenueMonthly = rooms * avgRate * 0.7 * 30;
    const totalPaymentVolume = roomRevenueMonthly + foodRevenue;
    const otaBookingVolume = roomRevenueMonthly * (otaPercent / 100);
    const directBookingVolume = roomRevenueMonthly - otaBookingVolume;

    const baselineOtaCost = otaBookingVolume * (BASELINE_OTA_FEE / 100);
    const planOtaCost = otaBookingVolume * (selectedPlan.otaFee / 100);
    const otaSaved = Math.max(0, baselineOtaCost - planOtaCost);

    const baselineProcessingCost =
      totalPaymentVolume * (BASELINE_PROCESSING_FEE / 100);
    const planProcessingCost =
      totalPaymentVolume * (selectedPlan.processingFee / 100);
    const processingSaved = Math.max(
      0,
      baselineProcessingCost - planProcessingCost
    );

    const directBookingUpliftRate =
      selectedPlan.name === "Get to know"
        ? 0.04
        : selectedPlan.name === "Basic"
          ? 0.06
          : 0.08;
    const directBookingUplift = directBookingVolume * directBookingUpliftRate;

    const opsAutomationSavings =
      selectedPlan.name === "Get to know"
        ? Math.min(3000, 700 + rooms * 20)
        : selectedPlan.name === "Basic"
          ? Math.min(7000, 1500 + rooms * 35)
          : Math.min(13000, 3000 + rooms * 55);

    const gross =
      otaSaved + processingSaved + directBookingUplift + opsAutomationSavings;
    const net = gross - selectedPlan.price;
    const annual = net * 12;
    const paybackMonths =
      net > 0 ? selectedPlan.price / net : Number.POSITIVE_INFINITY;

    return {
      otaSaved,
      processingSaved,
      directBookingUplift,
      opsAutomationSavings,
      net,
      annual,
      paybackMonths,
    };
  }, [selectedPlan, rooms, avgRate, otaPercent, foodRevenue]);

  return (
    <section className="relative bg-[#fff7f1] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-[#efc3a5] bg-white">
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-[#efc3a5] bg-[#ef7f3d] p-4 text-[#1c120d] sm:p-6 lg:border-b-0 lg:border-r">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#3b2518]">
                Body Parameters
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {plans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan)}
                    className={`rounded-md border px-3 py-2.5 text-xs font-semibold uppercase tracking-wide transition sm:py-2 ${
                      selectedPlan.name === plan.name
                        ? "border-[#1f140e] bg-[#1f140e] text-white"
                        : "border-[#d06a2f] bg-[#e97d3f] text-[#2a1810] hover:bg-[#e27638]"
                    }`}
                  >
                    {plan.name}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:mt-7 sm:grid-cols-2">
                {inputFields.map(({ label, value, setter, min, max, step }) => (
                  <label key={label} className="block">
                    <span className="mb-2 block text-sm font-medium">{label}</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={min}
                      max={max}
                      step={step}
                      value={value}
                      onChange={(e) => {
                        const num = Number(e.target.value);
                        if (Number.isNaN(num)) return;
                        setter(Math.min(max, Math.max(min, num)));
                      }}
                      className="w-full rounded-md border border-[#d06a2f] bg-[#f39053] px-3 py-2 text-sm font-semibold text-[#2a1810] outline-none ring-0 placeholder:text-[#6f3d22] focus:border-[#1f140e]"
                    />
                    <span className="mt-1 block text-[11px] text-[#4a2a1b]">
                      {label === "Rooms" || label === "OTA %"
                        ? `Range: ${min} - ${max}`
                        : `Range: ${formatMoney(min)} - ${formatMoney(max)}`}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-7 rounded-lg border border-[#d06a2f] bg-[#f39053] p-4 sm:mt-8">
                <p className="text-xs uppercase tracking-wide text-[#4a2a1b]">
                  Plan Details
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {selectedPlan.details}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#4a2a1b]">
                  OTA {selectedPlan.otaFee}% · Processing{" "}
                  {selectedPlan.processingFee}%
                </p>
                <p className="mt-1 text-lg font-bold">
                  {formatMoney(selectedPlan.price)} / month
                </p>
              </div>
            </div>

            <div className="bg-white p-4 text-[#191919] sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7f7f7f]">
                Your Result
              </p>
              <p className="mt-4 text-sm text-[#5f5f5f]">
                Extra revenue per year
              </p>
              <p className="mt-1 text-3xl font-black leading-none text-[#131313] sm:text-5xl">
                {formatLarge(data.annual)}
              </p>
              <p className="mt-2 text-sm text-[#6b6b6b]">
                {formatMoney(data.net)} per month
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  ["OTA Fee Saved", data.otaSaved],
                  ["Processing Saved", data.processingSaved],
                  ["Direct Uplift", data.directBookingUplift],
                  ["Ops Savings", data.opsAutomationSavings],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-[#e6e6e6] bg-[#fafafa] p-3"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-[#7a7a7a]">
                      {label}
                    </p>
                    <p className="mt-1 text-base font-bold text-[#121212] sm:text-lg">
                      {formatMoney(value as number)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-[#ececec] bg-[#f8f8f8] p-4 text-sm text-[#3d3d3d]">
                {data.net > 0
                  ? `Pays back in ${
                      data.paybackMonths < 1
                        ? "under 1 month"
                        : data.paybackMonths.toFixed(1) + " months"
                    }`
                  : "Adjust inputs to see ROI"}
              </div>

              <WaitlistPopupButton className="mt-6 block w-full rounded-md border border-[#1a1a1a] bg-[#1a1a1a] px-4 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#2a2a2a]">
                Claim My Hotel&apos;s Spot
              </WaitlistPopupButton>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-center sm:mt-12">
          <p className="font-display text-base text-[#5a5a5a] sm:text-lg md:text-2xl">
            The numbers don&apos;t lie -
            <br />
            <span className="text-[#ef7f3d]">
              here&apos;s what real hotel owners are already saying.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
