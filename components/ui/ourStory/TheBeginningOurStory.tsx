"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TheBeginning() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(
        leftRef.current,
        {
          x: -120,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

     
      gsap.fromTo(
        rightRef.current,
        {
          x: 120,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToPhilosophy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("our-philosophy");
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#171514] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div
            ref={leftRef}
            className="flex flex-col justify-center order-2 lg:order-1"
          >
            <h2 className="font-serif text-[42px] sm:text-[50px] md:text-[56px] lg:text-[60px] leading-[1.1] font-medium text-[#D4C4B0]">
              The Beginning
            </h2>

            <p className="mt-6 text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed text-[#F5F2EB]/90 max-w-lg">
              NOIR was born from a simple belief — that dining can be an art form.
              What started as a dream has grown into an award-winning fine dining
              destination, celebrated for its culinary excellence and intimate
              atmosphere.
            </p>

            <Link
              href="#our-philosophy"
              onClick={handleScrollToPhilosophy}
              className="mt-10 inline-flex items-center justify-center w-fit text-[14px] font-medium px-6 py-3 rounded-md bg-[#9f0022]/50 text-[#F5F2EB] hover:bg-[#9f0022]/80 cursor-pointer transition-all duration-300"
            >
              Our Philosophy →
            </Link>
          </div>

          
          <div
            ref={rightRef}
            className="relative w-full overflow-hidden rounded-2xl order-1 lg:order-2"
          >
            <Image
              src="/images/noirImages/ourStorySection2.jpg"
              alt="The Beginning - NOIR"
              width={800}
              height={600}
              className="w-full h-auto object-cover rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}