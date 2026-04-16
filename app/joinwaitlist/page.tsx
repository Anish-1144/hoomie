"use client";
import Navbar from "@/components/Navbar";
import WaitlistForm from "../../components/WaitlistForm";
import Footer from "@/components/Footer";

export default function JoinWaitlistPage() {
  return (
    <div>
      <Navbar />  
      <main className="bg-white">
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
}