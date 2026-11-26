"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MenuHero() {
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
      className="relative w-full min-h-[300px] sm:min-h-[150px] md:min-h-[200px] lg:min-h-[300px] flex items-center overflow-hidden bg-[#12100F]"
    >
      
      <div className="absolute inset-0 z-0">
        <Image
          src= "/images/noirImages/menuSection1.png" 
          alt="Culinary Excellence - NOIR Menu"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-95"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent sm:w-4/5" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-16 md:py-24">
        <div ref={contentRef} className="max-w-lg">
          
          <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.28em] font-medium text-[#D4C4B0] mb-3 sm:mb-4">
            OUR MENU
          </p>

          
          <h1 className="font-serif text-[40px] sm:text-[50px] md:text-[60px] lg:text-[68px] leading-[1.06] font-normal text-[#D4C4B0] mb-4 sm:mb-5">
            Culinary <br />
            Excellence
          </h1>

          
          <p className="text-[15px] sm:text-[17px] md:text-[18px] leading-[1.6] font-light text-[#F5F2EB]/90 max-w-md">
            A refined selection of dishes, crafted with passion and precision.
          </p>
        </div>
      </div>
    </section>
  );
}