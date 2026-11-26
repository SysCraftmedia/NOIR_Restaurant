"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const diningSpaces = [
  {
    title: "Main Dining",
    subtitle: "Elegant & intimate",
    image: "/images/noirImages/experienceSection2.jfif" , 
  },
  {
    title: "Private Dining",
    subtitle: "Exclusive & secluded",
    image:"/images/noirImages/experienceSection2img2.jfif", 
  },
  {
    title: "Chef's Table",
    subtitle: "A front-row experience",
    image: "/images/noirImages/experienceSection2img3.jfif", 
  },
  {
    title: "The Lounge",
    subtitle: "Relaxed & refined",
    image: "/images/lounge.jpg", 
  },
];

export default function OurDiningSpaces() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  
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
        cardsRef.current.filter(Boolean),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
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

  
  const animateSlide = (direction: "next" | "prev") => {
    const xOffset = direction === "next" ? 30 : -30;
    gsap.fromTo(
      cardsRef.current.filter(Boolean),
      { opacity: 0.4, x: xOffset },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  };

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? diningSpaces.length - 1 : prev - 1
    );
    animateSlide("prev");
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % diningSpaces.length);
    animateSlide("next");
  };

  
  const visibleSpaces = [
    diningSpaces[startIndex % diningSpaces.length],
    diningSpaces[(startIndex + 1) % diningSpaces.length],
    diningSpaces[(startIndex + 2) % diningSpaces.length],
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#171514] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
       
        <h2
          ref={titleRef}
          className="font-serif text-[36px] sm:text-[42px] md:text-[48px] text-center font-normal text-[#D4C4B0] mb-12 md:mb-16"
        >
          Our Dining Spaces
        </h2>

        
        <div className="relative">
        
          <button
            onClick={handlePrev}
            aria-label="Previous dining space"
            className="hidden md:flex absolute left-4 top-[38%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 border border-white/10 text-[#F5F2EB] items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

         
          <button
            onClick={handleNext}
            aria-label="Next dining space"
            className="hidden md:flex absolute right-4 top-[38%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 border border-white/10 text-[#F5F2EB] items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleSpaces.map((space, idx) => (
              <div
                key={`${space.title}-${idx}`}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="group flex flex-col items-center text-center"
              >
                
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#1D1A18] mb-5 border border-white/5">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

               
                <h3 className="text-[18px] sm:text-[20px] font-medium tracking-wide text-[#F5F2EB] mb-1">
                  {space.title}
                </h3>

                
                <p className="text-[14px] sm:text-[15px] font-light text-[#D4C4B0]/70">
                  {space.subtitle}
                </p>
              </div>
            ))}
          </div>

          
          <div className="flex md:hidden items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous dining space"
              className="w-10 h-10 rounded-full bg-black/60 border border-white/15 text-[#F5F2EB] flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next dining space"
              className="w-10 h-10 rounded-full bg-black/60 border border-white/15 text-[#F5F2EB] flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}