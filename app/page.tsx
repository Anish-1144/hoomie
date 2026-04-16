"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import CompareTable from "@/components/CompareTable";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import PainSection from "@/components/PainSection";
import Pricing from "@/components/Pricing";
import ROICalculator from "@/components/ROICalculator";
import Testimonials from "@/components/Testimonials";
import TrustBar from "@/components/TrustBar";

export default function Page() {
  const [showLaunchBanner, setShowLaunchBanner] = useState(false);

  useEffect(() => {
    // Show on every visit/reload.
    setShowLaunchBanner(true);
  }, []);

  return (
    <>
      {showLaunchBanner && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setShowLaunchBanner(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-xl leading-none text-white transition hover:bg-black/80"
              aria-label="Close banner"
            >
              ×
            </button>
            <Image
              src="/baner.png"
              alt="Pre-launch offer banner"
              width={1600}
              height={800}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      )}
      <Navbar />
      <main className="overflow-x-clip bg-white">
        <Hero />
        <TrustBar />
        <ROICalculator />
        <PainSection />
        <Features />
        {/* <HowItWorks /> */}
        <CompareTable />
        
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        <FAQ />
        {/* <FinalCTA /> */}
      </main>
      <Footer />
    </>
  );
}
