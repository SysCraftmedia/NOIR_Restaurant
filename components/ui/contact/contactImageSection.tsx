"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactHero() {
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
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
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
      className="relative w-full min-h-[340px] sm:min-h-[300px] md:min-h-[200px] lg:min-h-[260px] flex items-center overflow-hidden bg-[#12100F]"
    >
     
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/noirImages/contactSection1.png" 
          alt="Contact Us - NOIR Dining"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
       
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/20 sm:w-4/5" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

     
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-16 md:py-24">
        <div ref={contentRef} className="max-w-xl">
          <h1 className="font-serif text-[38px] sm:text-[48px] md:text-[58px] lg:text-[64px] leading-[1.1] font-normal text-[#D4C4B0] mb-3 sm:mb-4">
            Contact Us
          </h1>
          <p className="text-[15px] sm:text-[17px] md:text-[19px] font-light tracking-wide text-[#F5F2EB]/90">
            We&apos;d love to hear from you.
          </p>
        </div>
      </div>
    </section>
  );
}