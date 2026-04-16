"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer>
      <div className="w-full rounded-sm bg-[#1b1b1f] px-8 py-8 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="md:pr-8">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex shrink-0 items-center rounded-lg outline-none ring-orange-500/0 transition hover:opacity-90 focus-visible:ring-4 focus-visible:ring-orange-500/20"
            >
              <Image
                src="/ninexhoomieLogo.png"
                alt="Ninex Hoomie"
                width={220}
                height={72}
                className="h-8 w-auto object-contain bg-white"
              />
            </button>
            <p className="mt-2 text-xs text-gray-400">
              Ninex Hoomie by Ninexfold Agency LLP
            </p>
          </div>

          <div className="hidden h-12 w-px bg-gray-700 md:block" />

          <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-300">
            <a
              href="tel:9243143997"
              className="transition hover:text-orange-400"
            >
              9243143997
            </a>
            <a
              href="mailto:prelaunch.ninexhoomie.com"
              className="transition hover:text-orange-400"
            >
              prelaunch.ninexhoomie.com
            </a>
          </div>

          <div className="flex items-center md:justify-end">
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/ninex_hoomie?igsh=MWZ0ZWoxNGNhd29jaw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-600 text-gray-300 transition hover:border-orange-400 hover:text-orange-300"
                aria-label="Follow Ninex Hoomie on Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.42a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.18.46.37 1.26.42 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.42 2.43a5.14 5.14 0 0 1-2.92 2.92c-.46.18-1.26.37-2.43.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.42a5.14 5.14 0 0 1-2.92-2.92c-.18-.46-.37-1.26-.42-2.43-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.97.42-2.43a4.9 4.9 0 0 1 1.15-1.77 4.9 4.9 0 0 1 1.77-1.15c.46-.18 1.26-.37 2.43-.42C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.16 0-3.53.01-4.78.07-1.05.05-1.62.22-2 .36a3.37 3.37 0 0 0-1.92 1.92c-.14.38-.31.95-.36 2-.06 1.25-.07 1.62-.07 4.78s.01 3.53.07 4.78c.05 1.05.22 1.62.36 2a3.37 3.37 0 0 0 1.92 1.92c.38.14.95.31 2 .36 1.25.06 1.62.07 4.78.07s3.53-.01 4.78-.07c1.05-.05 1.62-.22 2-.36a3.37 3.37 0 0 0 1.92-1.92c.14-.38.31-.95.36-2 .06-1.25.07-1.62.07-4.78s-.01-3.53-.07-4.78c-.05-1.05-.22-1.62-.36-2a3.37 3.37 0 0 0-1.92-1.92c-.38-.14-.95-.31-2-.36-1.25-.06-1.62-.07-4.78-.07Zm0 4.38a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.62a3.08 3.08 0 1 0 0 6.16 3.08 3.08 0 0 0 0-6.16Zm5.98-2.88a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
