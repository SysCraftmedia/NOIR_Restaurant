"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurPhilosophy() {
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

  return (
    <section
      id="our-philosophy"
      ref={sectionRef}
      className="w-full bg-[#171514] py-20 md:py-28 overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div
            ref={leftRef}
            className="relative w-full overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/noirImages/our-storySection3.jfif"
              alt="Our Philosophy - Chef"
              width={800}
              height={600}
              className="w-full h-auto object-cover rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
              priority
            />
          </div>

          
          <div ref={rightRef} className="flex flex-col justify-center">
            <h2 className="font-serif text-[42px] sm:text-[50px] md:text-[56px] lg:text-[60px] leading-[1.1] font-medium text-[#D4C4B0]">
              Our Philosophy
            </h2>

            <p className="mt-6 text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed text-[#F5F2EB]/90 max-w-lg">
              We celebrate seasonal ingredients, craftsmanship and the art of
              hospitality, creating unforgettable dining experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}