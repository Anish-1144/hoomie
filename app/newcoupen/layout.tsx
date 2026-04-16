import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New coupon — Ninex Hoomie",
  description: "Claim your prelaunch PMS coupon and lock in founder benefits for your hotel."
};

export default function NewCoupenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
