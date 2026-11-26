"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "Private Dining Room",
  "Custom Menus",
  "Dedicated Service",
  "Group Bookings",
];

export default function PrivateDiningFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current?.children ? Array.from(leftRef.current.children) : [],
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
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
      className="w-full bg-[#12100F] py-16 sm:py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div ref={leftRef} className="lg:col-span-5">
            <h2 className="font-serif text-[34px] sm:text-[42px] md:text-[48px] leading-[1.14] font-normal text-[#D4C4B0] mb-4">
              Intimate. Exclusive. Personal.
            </h2>

            <p className="text-[15px] sm:text-[16px] leading-[1.65] font-light text-[#F5F2EB]/90 mb-6 max-w-md">
              Our private dining room offers an intimate and luxurious setting for
              celebrations, corporate events and special gatherings.
            </p>

            
            <ul className="space-y-3 mb-8">
              {features.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[14px] sm:text-[15px] font-light text-[#F5F2EB]/90"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-[#F5F2EB]/90"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8.5 12 2.3 2.3 4.7-4.6" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded bg-[#9f0022]/50 hover:bg-[#9f0022]/80 text-[#F5F2EB] text-[14px] sm:text-[15px] font-medium tracking-wide transition-colors duration-300"
            >
              <span>Inquire Now</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          
          <div ref={rightRef} className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3]] sm:aspect-[16/11] rounded-md overflow-hidden bg-[#1B1816]">
              <Image
                src="/images/noirImages/privitediningSection2.png"
                alt="Private Dining Room at NOIR"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}