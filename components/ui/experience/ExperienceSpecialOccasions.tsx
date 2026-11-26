"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SpecialOccasions() {
  const sectionRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textGroupRef.current?.children ? Array.from(textGroupRef.current.children) : [],
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: 40, opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
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
      className="w-full bg-[#171514] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <div ref={textGroupRef} className="lg:col-span-5">
            <h2 className="font-serif text-[38px] sm:text-[46px] md:text-[52px] leading-[1.12] font-normal text-[#D4C4B0] mb-5">
              Special Occasions
            </h2>

            <p className="text-[16px] sm:text-[17px] leading-[1.65] font-light text-[#F5F2EB] mb-8 max-w-md">
              From romantic dinners to celebrations, NOIR sets the perfect stage
              for your most meaningful moments.
            </p>

            <Link
              href="/reservations"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded bg-[#9f0022]/50 hover:bg-[#9f0022]/80 text-[#F5F2EB] text-[14px] sm:text-[15px] font-medium tracking-wide transition-colors duration-300"
            >
              <span>Plan Your Event</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          
          <div ref={imageRef} className="lg:col-span-7">
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-md overflow-hidden bg-[#1B1816]">
              <img
                src="/images/noirImages/experienceSection3.jfif"
                alt="Special Occasions at NOIR"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div> 
      </div>
    </section>
  );
}