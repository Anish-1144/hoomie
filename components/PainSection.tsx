"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Clock3, PhoneCall, Puzzle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function PainSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dashColRef = useRef<HTMLDivElement | null>(null);
  const cardTrRef = useRef<HTMLDivElement | null>(null);
  const cardBlRef = useRef<HTMLDivElement | null>(null);
  const cardBrRef = useRef<HTMLDivElement | null>(null);
  const anchorTrRef = useRef<HTMLSpanElement | null>(null);
  const anchorBlRef = useRef<HTMLSpanElement | null>(null);
  const anchorBrRef = useRef<HTMLSpanElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 40%", "end 80%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.5,
  });
  const dashboardY = useTransform(smoothProgress, [0, 1], [16, -16]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prefersReducedMotion) return;
    const nextIndex = Math.min(2, Math.floor(latest * 3 + 0.001));
    if (nextIndex !== activeRef.current) {
      activeRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  });

  useEffect(() => {
    const drawLines = () => {
      const fl = layoutRef.current;
      const svg = svgRef.current;
      const dash = dashColRef.current;
      const tr = anchorTrRef.current;
      const bl = anchorBlRef.current;
      const br = anchorBrRef.current;

      if (!fl || !svg || !dash || !tr || !bl || !br) return;
      if (window.innerWidth < 900) {
        svg.innerHTML = "";
        return;
      }

      const flR = fl.getBoundingClientRect();
      const dashR = dash.getBoundingClientRect();
      const trR = tr.getBoundingClientRect();
      const blR = bl.getBoundingClientRect();
      const brR = br.getBoundingClientRect();

      const px = (rect: DOMRect, ax: number, ay: number) => ({
        x: rect.left - flR.left + rect.width * ax,
        y: rect.top - flR.top + rect.height * ay,
      });

      const width = flR.width;
      const height = flR.height;
      svg.setAttribute("width", `${width}`);
      svg.setAttribute("height", `${height}`);
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

      const dTR = px(dashR, 1, 0.18);
      const dBL = px(dashR, 0, 0.78);
      const dBR = px(dashR, 1, 0.78);
      const cTR = px(trR, 0.5, 0.5);
      const cBL = px(blR, 0.5, 0.5);
      const cBR = px(brR, 0.5, 0.5);

      const arrowPath = (
        from: { x: number; y: number },
        to: { x: number; y: number },
        isRightSide: boolean
      ) => {
        const pull = isRightSide ? -26 : 26;
        const elbowX = to.x + pull;
        return `M${from.x},${from.y} L${elbowX},${from.y} L${elbowX},${to.y} L${to.x},${to.y}`;
      };

      svg.innerHTML = `
        <defs>
          <marker id="painArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#d35b1e"/>
          </marker>
        </defs>
        <path d="${arrowPath(dTR, cTR, true)}" fill="none" stroke="#d35b1e" stroke-width="1.2" marker-end="url(#painArrow)"/>
        <circle cx="${dTR.x}" cy="${dTR.y}" r="3.2" fill="#d35b1e"/>
        <path d="${arrowPath(dBL, cBL, false)}" fill="none" stroke="#d35b1e" stroke-width="1.2" marker-end="url(#painArrow)"/>
        <circle cx="${dBL.x}" cy="${dBL.y}" r="3.2" fill="#d35b1e"/>
        <path d="${arrowPath(dBR, cBR, true)}" fill="none" stroke="#d35b1e" stroke-width="1.2" marker-end="url(#painArrow)"/>
        <circle cx="${dBR.x}" cy="${dBR.y}" r="3.2" fill="#d35b1e"/>
      `;
    };

    let frame = 0;
    const scheduleDraw = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(drawLines);
    };

    const timeout = window.setTimeout(drawLines, 120);
    window.addEventListener("resize", scheduleDraw);
    window.addEventListener("scroll", scheduleDraw, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", scheduleDraw);
      window.removeEventListener("scroll", scheduleDraw);
    };
  }, []);

  const cardAnimation = (idx: number) => {
    if (prefersReducedMotion) return {};
    return activeIndex >= idx
      ? { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }
      : { opacity: 0.35, transform: "translateY(18px)", filter: "blur(0.5px)" };
  };

  return (
    <section ref={sectionRef} className="relative bg-white py-16 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#fff7ef] to-transparent" />
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="mb-14 text-center">
          <span className="inline-flex rounded-full border border-[#f9dcc8] bg-[#fff2e8] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d4662d]">
            The Problem
          </span>
          <h2 className="mx-auto mt-4 max-w-[1100px] text-balance font-display text-[clamp(26px,3.7vw,58px)] font-bold leading-[1.1] text-[#d35b1e]">
            Running a hotel in India is unnecessarily hard.
          </h2>
          <p className="mx-auto mt-3.5 max-w-[540px] text-base font-light leading-[1.6] text-[#8A8276]">
            You didn&apos;t open a property to manage software subscriptions. But
            here you are.
          </p>
        </div>

        <div className="lg:h-[180vh]">
          <div className="lg:sticky lg:top-16">
            <div
              ref={layoutRef}
              className="relative grid grid-cols-1 items-start gap-8 md:gap-10 lg:grid-cols-[minmax(240px,1fr)_minmax(740px,860px)_minmax(240px,1fr)] lg:grid-rows-[auto_auto]"
            >
              <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute left-0 top-0 z-[1] hidden overflow-visible lg:block"
              />

              <motion.div
                ref={dashColRef}
                style={prefersReducedMotion ? undefined : { y: dashboardY }}
                className="relative z-[2] lg:col-start-2 lg:row-[1/3] lg:justify-self-center"
              >
                <div className="rounded-[18px] bg-[#1C1C1E] p-2.5">
                  <div className="flex items-center gap-1.5 px-2.5 pb-2 pt-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
                  </div>

                  <div className="flex h-[460px] overflow-hidden rounded-[10px] bg-[#F7F7F5]">
                    <aside className="flex w-[150px] shrink-0 flex-col gap-px border-r border-[#EBEBEB] bg-[#FAFAFA] px-0 py-3.5">
                      <div className="mb-1.5 border-b border-[#EBEBEB] px-3.5 pb-3 text-[10px] font-extrabold tracking-[1px] text-[#1A1A1A]">
                        NINE<span className="text-[#C84B2F]">✕</span>HOOMIE
                      </div>
                      {[
                        "Dashboard",
                        "Bookings",
                        "Users",
                        "Items",
                        "Transactions",
                        "Reports",
                        "Messages",
                        "Settings",
                      ].map((item, idx) => (
                        <div
                          key={item}
                          className={`mx-[5px] rounded-md px-[9px] py-[6px] text-[9px] ${
                            idx === 0
                              ? "bg-[#EFEFED] font-bold text-[#1A1A1A]"
                              : "text-[#999999]"
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </aside>

                    <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-3.5">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-extrabold">Dashboard</div>
                        <div className="flex items-center gap-1.5 text-[8px] text-[#999999]">
                          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-gradient-to-br from-[#C84B2F] to-[#D4A853] text-[7px] font-extrabold text-white">
                            JL
                          </span>
                          Johny Larsen - Admin
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-1.5">
                        {[
                          ["Revenue", "₹52.6k", "+3.4%"],
                          ["Rooms", "500", ""],
                          ["Booked", "236", ""],
                          ["Remaining", "264", ""],
                          ["New", "11", ""],
                        ].map(([label, value, badge]) => (
                          <div key={label} className="rounded-[7px] border border-[#EBEBEB] bg-white p-2">
                            <p className="mb-0.5 text-[6px] uppercase text-[#BBBBBB]">
                              {label}
                            </p>
                            <p className="text-[13px] font-extrabold">
                              {value}
                              {badge && (
                                <span className="ml-1 inline-block rounded-[3px] bg-[#E8F5E9] px-[3px] py-[1px] text-[6px] font-bold text-[#2E7D32]">
                                  {badge}
                                </span>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="grid flex-1 grid-cols-[1fr_150px] gap-2">
                        <div className="flex flex-col rounded-[7px] border border-[#EBEBEB] bg-white p-2.5">
                          <p className="text-[6px] uppercase text-[#BBBBBB]">Revenue</p>
                          <p className="my-0.5 text-[15px] font-extrabold">₹11,642</p>
                          <p className="text-[6px] text-[#BBBBBB]">
                            +3.4% from last period
                          </p>
                          <svg
                            viewBox="0 0 300 80"
                            preserveAspectRatio="none"
                            className="mt-2 min-h-[60px] w-full flex-1"
                          >
                            <defs>
                              <linearGradient id="painG1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#C84B2F" stopOpacity="0.25" />
                                <stop
                                  offset="100%"
                                  stopColor="#C84B2F"
                                  stopOpacity="0.01"
                                />
                              </linearGradient>
                            </defs>
                            <path
                              d="M0,58 C20,52 35,40 60,36 C80,32 95,48 120,44 C145,40 155,24 180,20 C205,16 220,32 245,28 C260,25 275,40 300,32 L300,80 L0,80Z"
                              fill="url(#painG1)"
                            />
                            <path
                              d="M0,58 C20,52 35,40 60,36 C80,32 95,48 120,44 C145,40 155,24 180,20 C205,16 220,32 245,28 C260,25 275,40 300,32"
                              fill="none"
                              stroke="#C84B2F"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                        <div className="rounded-[7px] border border-[#EBEBEB] bg-white p-2.5">
                          <p className="text-[6px] uppercase text-[#BBBBBB]">
                            New Bookings
                          </p>
                          <div className="mt-4 flex h-[68px] items-end gap-[3px]">
                            {[28, 62, 90, 52, 82, 20, 40].map((height, i) => (
                              <span
                                key={i}
                                className="flex-1 rounded-t-[2px] bg-[#C84B2F] opacity-85"
                                style={{ height: `${height}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[7px] border border-[#EBEBEB] bg-white p-2">
                        <div className="mb-1.5 flex items-center justify-between">
                          <p className="text-[9px] font-extrabold">Recent Bookings</p>
                          <p className="text-[6px] text-[#999999]">Go to Bookings -&gt;</p>
                        </div>
                        <div className="grid grid-cols-6 gap-2 border-t border-[#F5F5F5] pt-1 text-[7px] text-[#555555]">
                          <span>#I293DSA39</span>
                          <span>Rahul Sharma</span>
                          <span>Deluxe Suite</span>
                          <span>Jan 20</span>
                          <span>₹7,999</span>
                          <span className="text-[#F57F17]">Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div ref={cardTrRef} className="relative z-[2] lg:col-start-3 lg:row-start-1 lg:mt-5 lg:w-full lg:max-w-[320px] lg:justify-self-center lg:pl-11">
                <span
                  ref={anchorTrRef}
                  className="pointer-events-none absolute left-0 top-[42px] h-2 w-2 -translate-x-1/2 rounded-full"
                />
                <div
                  style={cardAnimation(0)}
                  className="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <p className="mb-2.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[2px] text-[#C84B2F]">
                    <Puzzle size={14} strokeWidth={2.2} />
                    The App Mess
                  </p>
                  <p className="mb-2.5 font-display text-lg font-bold leading-[1.35] text-[#1A1A1A]">
                    &quot;I&apos;m running 4 apps just to manage my hotel&quot;
                  </p>
                  <p className="text-[13px] font-light leading-[1.65] text-[#7A7570]">
                    PMS, channel manager, booking engine, payment gateway,
                    restaurant POS - all separate, all expensive, all breaking each
                    other&apos;s data.
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-[#FAE8E4] px-3 py-1 text-[11px] font-semibold text-[#C84B2F]">
                    Costs ₹9,000-₹20,000/mo
                  </span>
                </div>
              </div>

              <div ref={cardBlRef} className="relative z-[2] lg:col-start-1 lg:row-start-2 lg:mt-5 lg:w-full lg:max-w-[320px] lg:justify-self-center lg:pr-11 lg:text-right">
                <span
                  ref={anchorBlRef}
                  className="pointer-events-none absolute right-0 top-[42px] h-2 w-2 translate-x-1/2 rounded-full"
                />
                <div
                  style={cardAnimation(1)}
                  className="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <p className="mb-2.5 flex items-center justify-end gap-2 text-[10px] font-semibold uppercase tracking-[2px] text-[#C84B2F]">
                    <Clock3 size={14} strokeWidth={2.2} />
                    The Check-in Nightmare
                  </p>
                  <p className="mb-2.5 font-display text-lg font-bold leading-[1.35] text-[#1A1A1A]">
                    &quot;Check-in takes 12 minutes. My guests hate it.&quot;
                  </p>
                  <p className="text-[13px] font-light leading-[1.65] text-[#7A7570]">
                    Manual ID forms, paper registers, handwritten receipts. Every new
                    guest is 10 minutes of friction - and a terrible first impression
                    that hits your reviews.
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-[#FAE8E4] px-3 py-1 text-[11px] font-semibold text-[#C84B2F]">
                    Costs you 1-star reviews
                  </span>
                </div>
              </div>

              <div ref={cardBrRef} className="relative z-[2] lg:col-start-3 lg:row-start-2 lg:mt-5 lg:w-full lg:max-w-[320px] lg:justify-self-center lg:pl-11">
                <span
                  ref={anchorBrRef}
                  className="pointer-events-none absolute left-0 top-[42px] h-2 w-2 -translate-x-1/2 rounded-full"
                />
                <div
                  style={cardAnimation(2)}
                  className="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <p className="mb-2.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[2px] text-[#C84B2F]">
                    <PhoneCall size={14} strokeWidth={2.2} />
                    The WhatsApp Booking
                  </p>
                  <p className="mb-2.5 font-display text-lg font-bold leading-[1.35] text-[#1A1A1A]">
                    &quot;Travel agents still call me on WhatsApp to book&quot;
                  </p>
                  <p className="text-[13px] font-light leading-[1.65] text-[#7A7570]">
                    19,000 travel agents across India send hotel bookings manually.
                    Not a single PMS connects you to them directly. Bookings fall
                    through, rooms stay empty.
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-[#FAE8E4] px-3 py-1 text-[11px] font-semibold text-[#C84B2F]">
                    ₹2-8L/yr in missed bookings
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}