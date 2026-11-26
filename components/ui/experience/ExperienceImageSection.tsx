"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NoirExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          Array.from(contentRef.current.children),
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[300px] sm:min-h-[150px] md:min-h-[200px] lg:min-h-[300px] flex items-center justify-start overflow-hidden bg-[#12100F]"
    >
     
      <div className="absolute inset-0 z-0">
        <img
          src="/images/noirImages/experienceSection1.jfif"
          alt="The NOIR Experience"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12100F]/90 via-[#12100F]/55 to-transparent md:w-3/4" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

    
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-10 sm:py-12 md:py-14 lg:py-16">
        <div ref={contentRef} className="max-w-xl">
          <h2 className="font-serif text-[36px] sm:text-[46px] md:text-[56px] lg:text-[64px] leading-[1.08] font-normal text-[#D4C4B0] mb-4 sm:mb-5">
            The NOIR <br />
            <span className="italic font-light">Experience</span>
          </h2>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] font-light tracking-wide text-[#F5F2EB]/90">
            Exceptional dining, Unforgettable moments.
          </p>
        </div>
      </div>
    </section>
  );
}