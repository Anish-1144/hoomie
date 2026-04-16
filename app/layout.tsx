import type { Metadata } from "next";
import { Caveat, Inter, Poppins } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Prerelease — Hoomie PMS · India's most complete hotel platform",
  description:
    "Hoomie replaces fragmented hotel tools with one complete platform for Indian hotels."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${caveat.variable}`}>{children}</body>
    </html>
  );
}
