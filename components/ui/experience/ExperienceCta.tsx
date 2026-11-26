"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children ? Array.from(contentRef.current.children) : [],
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#12100F] overflow-hidden"
    >
      <div className="relative w-full bg-[#9f0022]/30 pt-20 pb-28 md:pt-24 md:pb-36 px-6 text-center">
        <div ref={contentRef} className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] font-normal text-[#D4C4B0] tracking-tight mb-7">
            Experience the extraordinary.
          </h2>

          <Link
            href="/reservations"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded bg-[#9f0022]/50 hover:bg-[#9f0022]/85 border border-[#F5F2EB]/10 text-[#F5F2EB] text-[14px] sm:text-[15px] font-medium tracking-wide transition-all duration-300 shadow-sm"
          >
            <span>Reserve a Table</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

     
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none"
        >
          <svg
            viewBox="0 0 1440 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-8 sm:h-12 md:h-16 block"
          >
            <path
              d="M0 70V20C480 75 960 75 1440 20V70H0Z"
              fill="#12100F"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}