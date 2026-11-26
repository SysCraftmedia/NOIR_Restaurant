"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ChefRecommendationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerLeftRef = useRef<HTMLDivElement>(null);
  const bannerCenterRef = useRef<HTMLDivElement>(null);
  const bannerRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bannerLeftRef.current) {
        gsap.fromTo(
          Array.from(bannerLeftRef.current.children),
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (bannerCenterRef.current) {
        gsap.fromTo(
          bannerCenterRef.current,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (bannerRightRef.current) {
        gsap.fromTo(
          Array.from(bannerRightRef.current.children),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
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
      className="w-full bg-[#12100F] py-12 sm:py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
       
        <div className="relative w-full min-h-[280px] sm:min-h-[320px] md:min-h-[350px] rounded overflow-hidden bg-[#171514] border border-[#D4C4B0]/15 flex items-center">
          
          <div
            ref={bannerCenterRef}
            className="absolute inset-0 z-0 flex items-center justify-center"
          >
            <Image
              src="/images/noir/recomendation.png"
              alt="Signature Indulgence"
              fill
              sizes="100vw"
              className="object-cover object-center brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#12100F] via-[#12100F]/30 to-[#12100F]" />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
           
            <div ref={bannerLeftRef} className="lg:col-span-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-medium text-[#D4C4B0]">
                  CHEF&apos;S RECOMMENDATION
                </span>
                <span
                  aria-hidden="true"
                  className="h-[1px] w-12 sm:w-16 bg-[#D4C4B0]/35"
                />
              </div>

              <h2 className="font-serif text-[34px] sm:text-[44px] md:text-[50px] leading-[1.08] font-normal text-[#D4C4B0]">
                Signature Indulgence
              </h2>

              <p className="font-serif italic text-[14px] sm:text-[16px] text-[#F5F2EB]/90">
                A carefully curated selection by our Executive Chef.
              </p>

              <div className="pt-2">
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#9f0022]/50 hover:bg-[#9f0022]/80 text-[#F5F2EB] text-[13px] sm:text-[14px] font-medium transition-colors duration-300"
                >
                  <span>Discover the Experience</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            
            <div className="hidden lg:block lg:col-span-2" />

           
            <div
              ref={bannerRightRef}
              className="lg:col-span-4 lg:border-l lg:border-[#D4C4B0]/20 lg:pl-8 pt-6 lg:pt-0 border-t border-[#D4C4B0]/15 lg:border-t-0 flex flex-col items-start lg:items-end lg:text-right space-y-2"
            >
              <p className="font-serif italic text-[14px] sm:text-[16px] leading-relaxed text-[#F5F2EB]/90 max-w-[260px]">
                &ldquo;Exceptional cuisine, unforgettable experience.&rdquo;
              </p>

              
              <svg
                width="104"
                height="44"
                viewBox="0 0 140 56"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#D4C4B0]/85 my-1"
                aria-hidden="true"
              >
                <path d="M18 42 C24 22, 32 10, 36 10 C40 10, 31 38, 36 38 C41 38, 48 22, 54 24 C59 26, 54 37, 61 36 C68 35, 76 18, 84 22 C90 25, 84 36, 94 33 C104 30, 114 26, 126 28" />
                <path d="M22 47 C48 45, 86 44, 118 45" />
              </svg>

              <span className="text-[11px] sm:text-[12px] font-light tracking-wide text-[#F5F2EB]/75">
                Executive Chef
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}