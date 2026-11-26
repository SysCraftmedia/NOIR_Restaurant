"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurStoryHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          Array.from(contentRef.current.children),
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
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
      className="relative w-full min-h-[300px] sm:min-h-[150px] md:min-h-[200px] lg:min-h-[300px] overflow-hidden bg-[#12100F] flex items-end"
    >
      
      <Image
        src="/images/noirImages/our-storySection1.webp"
        alt="NOIR Our Story"
        fill
        className="object-cover object-center"
        priority
        quality={90}
        sizes="100vw"
      />

      
      <div className="absolute inset-0 bg-gradient-to-r from-[#12100F]/80 via-[#12100F]/45 to-transparent" />
      <div className="absolute inset-0 bg-black/25" />

      
      <div className="relative z-10 h-full w-full flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-10 md:py-12 lg:py-14">
          <div ref={contentRef} className="max-w-xl">
            <h1 className="font-serif text-[40px] sm:text-[48px] md:text-[58px] lg:text-[68px] leading-none font-medium text-[#D4C4B0]">
              Our Story
            </h1>

            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed text-[#F5F2EB]/90 max-w-md">
              A story of passion, flavour and timeless elegance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}