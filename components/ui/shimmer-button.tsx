"use client";

import type { ButtonHTMLAttributes } from "react";

export function ShimmerButton({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-gradient-to-b from-zinc-700 to-zinc-900 px-5 py-2.5 text-white ring-1 ring-white/10 transition hover:brightness-110 ${className}`}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      >
        <span className="absolute -inset-full block w-[200%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer-btn_2.8s_ease-in-out_infinite]" />
      </span>
      <span className="relative z-[1] flex items-center justify-center">{children}</span>
    </button>
  );
}
