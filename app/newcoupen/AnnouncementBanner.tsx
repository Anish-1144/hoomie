"use client";

import { useState } from "react";
import OrangeBannerIcon from "./OrangeBannerIcon";

const Arrow = () => (
  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden>
    <path
      d="M0.5 5H12.5M12.5 5L8 1M12.5 5L8 9"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronPair = ({ flip = false }: { flip?: boolean }) => (
  <svg
    width="48"
    height="40"
    viewBox="0 0 48 40"
    fill="none"
    className="h-8 w-10 sm:h-10 sm:w-12"
    style={flip ? { transform: "scaleX(-1)" } : {}}
    aria-hidden
  >
    <path d="M34 0H48L28 20L48 40H34L14 20Z" fill="#C85A20" fillOpacity="0.48" />
    <path d="M20 0H34L14 20L34 40H20L0 20Z" fill="#E8922C" fillOpacity="0.4" />
  </svg>
);

const ChevronSide = ({ align }: { align: "left" | "right" }) => {
  const isRight = align === "right";
  return (
    <div
      className="absolute top-0 h-8 w-44 overflow-hidden sm:h-10 sm:w-80 md:w-96"
      style={{
        [align]: 0,
        display: "flex",
        alignItems: "center",
        flexDirection: isRight ? "row-reverse" : "row",
        pointerEvents: "none",
        WebkitMaskImage: isRight
          ? "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)"
          : "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        maskImage: isRight
          ? "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)"
          : "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="shrink-0"
          style={{
            marginLeft: isRight ? 0 : i === 0 ? 0 : -10,
            marginRight: isRight ? (i === 0 ? 0 : -10) : 0,
          }}
        >
          <ChevronPair flip={isRight} />
        </div>
      ))}
    </div>
  );
};

export default function AnnouncementBanner() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full min-h-9 cursor-pointer select-none overflow-hidden font-sans sm:min-h-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #E09448 0%, #E8A858 25%, #EAA050 50%, #E8A858 75%, #E09448 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(90deg, #E8A050 0%, #E08A40 18%, #D97A35 38%, #D17030 50%, #D97A35 62%, #E08A40 82%, #E8A050 100%)",
        }}
      />
      <div
        className="absolute -inset-2 sm:-inset-3"
        style={{
          background:
            "linear-gradient(90deg, #F0A858 0%, #E89048 25%, #E08038 50%, #E89048 75%, #F0A858 100%)",
          filter: "blur(14px)",
          opacity: 0.5,
        }}
      />

      <ChevronSide align="left" />
      <ChevronSide align="right" />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-3 sm:px-4">
        <a
          href="/"
          className="flex items-center gap-1.5 transition-transform duration-150 ease-out sm:gap-2"
          style={{
            transform: hovered ? "scale(1.03) translateY(-0.5px)" : "scale(1) translateY(0)",
          }}
        >
          <div className="shrink-0" style={{ filter: "drop-shadow(0 1px 0 rgba(100,45,15,0.4))" }}>
            <OrangeBannerIcon width={28} height={29} className="h-6 w-[27px] sm:h-7 sm:w-8" />
          </div>

          <span
            className="shrink-0 rounded px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-white sm:px-2 sm:text-[9px]"
            style={{
              background: "linear-gradient(180deg, #4a4a4a 0%, #2a2a2a 100%)",
              boxShadow:
                "0 1px 0 #1a1a1a, 0 2px 0 #151515, 0 3px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
              border: "0.5px solid rgba(0,0,0,0.25)",
            }}
          >
            NEW
          </span>

          <span
            className="text-xs font-normal tracking-tight text-white sm:text-[13px]"
            style={{
              textShadow:
                "0 1px 0 rgba(100,45,10,0.5), 0 2px 0 rgba(70,30,5,0.35), 0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Ninex Hoomie releases on 19th April.{" "}
            <span
              className="font-semibold"
              style={{
                textShadow:
                  "0 1px 0 rgba(100,45,10,0.55), 0 2px 0 rgba(70,30,5,0.4), 0 2px 5px rgba(0,0,0,0.25)",
              }}
            >
              Try Now
            </span>
          </span>

          <div className="shrink-0" style={{ filter: "drop-shadow(0 1px 0 rgba(100,45,15,0.4))" }}>
            <Arrow />
          </div>

          <div className="shrink-0" style={{ filter: "drop-shadow(0 1px 0 rgba(100,45,15,0.4))" }}>
            <OrangeBannerIcon width={28} height={29} className="h-6 w-[27px] sm:h-7 sm:w-8" />
          </div>
        </a>
      </div>
    </div>
  );
}
