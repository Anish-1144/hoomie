"use client";

type OrangeBannerIconProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function OrangeBannerIcon({
  width = 28,
  height = 29,
  className = "",
}: OrangeBannerIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 29"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="bannerGem" x1="4" y1="3" x2="23" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD08B" />
          <stop offset="0.52" stopColor="#F39A3D" />
          <stop offset="1" stopColor="#CD5C1E" />
        </linearGradient>
      </defs>
      <path
        d="M14 1L17.7 10.3L27 14L17.7 17.7L14 27L10.3 17.7L1 14L10.3 10.3L14 1Z"
        fill="url(#bannerGem)"
        stroke="#A64716"
        strokeWidth="1.2"
      />
      <circle cx="14" cy="14" r="3.2" fill="#FFE2B8" />
    </svg>
  );
}
