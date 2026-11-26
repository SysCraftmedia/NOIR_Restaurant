"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    name: "Excellence",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
        <path d="M5 4h2" />
        <path d="M17 4h2" />
        <path d="M5 9c-1.5 0-2.5-1-2.5-2.5S3.5 4 5 4" />
        <path d="M19 9c1.5 0 2.5-1 2.5-2.5S20.5 4 19 4" />
      </svg>
    ),
  },
  {
    name: "Authenticity",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.25 12 13 13 12" />
      </svg>
    ),
  },
  {
    name: "Hospitality",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 14h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2z" />
        <path d="M12 4c-3.5 0-6 2-6 5.5 0 1.5.5 2.5 1.5 3.5h9c1-1 1.5-2 1.5-3.5C18 6 15.5 4 12 4z" />
        <path d="M12 4v2" />
      </svg>
    ),
  },
  {
    name: "Innovation",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3c-1.5 2.5-2 4.5-2 7a2 2 0 0 0 4 0c0-2.5-.5-4.5-2-7z" />
        <path d="M8.5 8.5c-2 1-3.5 2.5-4 4.5a2 2 0 0 0 3.5 1.5c1.2-1 2-2.5 2.5-4.5" />
        <path d="M15.5 8.5c2 1 3.5 2.5 4 4.5a2 2 0 0 1-3.5 1.5c-1.2-1-2-2.5-2.5-4.5" />
        <path d="M9 16c.5 1.5 1.5 2.5 3 3 1.5-.5 2.5-1.5 3-3" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    ),
  },
];

export default function OurValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimelinesRef = useRef<(gsap.core.Timeline | null)[]>([]);
  const leaveTimelinesRef = useRef<(gsap.core.Timeline | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      itemsRef.current.forEach((card, idx) => {
        if (!card) return;

        const circleEl = card.querySelector<HTMLElement>("[data-icon-circle]");
        const svgEl = card.querySelector<SVGSVGElement>("svg");
        if (!circleEl || !svgEl) return;

        const shapes = Array.from(
          svgEl.querySelectorAll<SVGGeometryElement>("path, circle, line, rect, polygon")
        );

        const lengths = shapes.map((shape) => {
          try {
            const len = shape.getTotalLength();
            gsap.set(shape, {
              strokeDasharray: len,
              strokeDashoffset: 0,
            });
            return len;
          } catch {
            return 40;
          }
        });

        
        const enterTl = gsap.timeline({ paused: true });
        enterTl.to(circleEl, {
          rotation: 360,
          scale: 1.06,
          borderColor: "rgba(212, 196, 176, 0.85)",
          backgroundColor: "rgba(159, 0, 34, 0.22)",
          duration: 0.65,
          ease: "power2.inOut",
        });

        shapes.forEach((shape, sIdx) => {
          const len = lengths[sIdx];
          enterTl.fromTo(
            shape,
            { strokeDashoffset: len },
            {
              strokeDashoffset: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            0.08 + sIdx * 0.05
          );
        });

        
        const leaveTl = gsap.timeline({ paused: true });
        leaveTl.to(circleEl, {
          rotation: -360,
          scale: 1,
          borderColor: "rgba(201, 168, 124, 0.4)",
          backgroundColor: "transparent",
          duration: 0.55,
          ease: "power2.inOut",
        });

        
        shapes.forEach((shape, sIdx) => {
          const len = lengths[sIdx];
          leaveTl.to(
            shape,
            {
              strokeDashoffset: len,
              rotation: -45,
              svgOrigin: "12 12",
              opacity: 0.15,
              duration: 0.35,
              ease: "power2.in",
            },
            sIdx * 0.03
          );
        });

        
        shapes.forEach((shape, sIdx) => {
          leaveTl.to(
            shape,
            {
              strokeDashoffset: 0,
              rotation: 0,
              svgOrigin: "12 12",
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            0.42 + sIdx * 0.04
          );
        });

        hoverTimelinesRef.current[idx] = enterTl;
        leaveTimelinesRef.current[idx] = leaveTl;
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index: number) => {
    leaveTimelinesRef.current[index]?.pause(0);
    hoverTimelinesRef.current[index]?.restart();
  };

  const handleMouseLeave = (index: number) => {
    hoverTimelinesRef.current[index]?.pause(0);
    leaveTimelinesRef.current[index]?.restart();
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#171514] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={titleRef}
          className="font-serif text-[36px] sm:text-[42px] md:text-[48px] text-center font-medium text-[#D4C4B0] mb-14 md:mb-16"
        >
          Our Values
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {values.map((value, i) => (
            <div
              key={value.name}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="relative flex flex-col items-center text-center cursor-pointer"
            >
              
              {i < values.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-[1.5px] h-32 bg-gradient-to-b from-transparent via-[#D4C4B0]/25 to-transparent"
                />
              )}

              <div
                data-icon-circle
                className="w-20 h-20 md:w-22 md:h-22 rounded-full border border-[#C9A87C]/40 flex items-center justify-center text-[#C9A87C] mb-4 will-change-transform"
              >
                {value.icon}
              </div>
              <p className="text-[15px] sm:text-[16px] font-medium tracking-wide text-[#F5F2EB]/90">
                {value.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}