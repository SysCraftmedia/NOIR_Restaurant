"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Dishes", "Interiors", "Chef", "Moments"] as const;
type Category = (typeof categories)[number];

const galleryItems: {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  image: string;
}[] = [
  {
    id: 1,
    title: "desi Plater",
    category: "Dishes",
    image: "/images/noirImages/signtaure2img2.jfif", 
  },
  {
    id: 2,
    title: "Candlelit Evening Hall",
    category: "Interiors",
    image:"/images/noirImages/experienceSection2.jfif",
  },
  {
    id: 3,
    title: "Final Plating Precision",
    category: "Chef",
    image: "/images/noirImages/section4img.png",
  },
  {
    id: 4,
    title: "Toast at Midnight",
    category: "Moments",
    image: "/images/noirImages/experienceSection3.jfif",
  },
  {
    id: 5,
    title: "bbq",
    category: "Dishes",
    image: "/images/noirImages/signatureimg1.jfif",
  },
  {
    id: 6,
    title: "Private Velvet Booths",
    category: "Interiors",
    image: "/images/noirImages/experienceSection2img3.jfif",
  },
];

export default function OurGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

 
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children ? Array.from(headerRef.current.children) : [],
        { y: 35, opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll("[data-gallery-card]");
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(cards),
        { y: 24, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#12100F] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
       
        <div ref={headerRef} className="flex flex-col items-center text-center mb-12 md:mb-14">
          <h2 className="font-serif text-[38px] sm:text-[46px] md:text-[52px] font-normal text-[#D4C4B0] mb-3">
            Our Gallery
          </h2>

          <p className="text-[15px] sm:text-[16px] font-light text-[#F5F2EB]/85 mb-8">
            A glimpse into our world.
          </p>

          
          <div className="w-full flex items-center justify-center gap-3 sm:gap-5">
            <div className="hidden sm:block flex-1 max-w-[140px] h-px bg-[#D4C4B0]/15" />

            <div
              role="tablist"
              aria-label="Gallery categories"
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
            >
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 sm:px-5 py-2 rounded text-[13px] sm:text-[14px] font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#9f0022]/50 text-[#F5F2EB] border border-[#9f0022]/80"
                        : "bg-[#1A1715] hover:bg-[#231F1C] text-[#F5F2EB]/75 hover:text-[#F5F2EB] border border-white/10"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:block flex-1 max-w-[140px] h-px bg-[#D4C4B0]/15" />
          </div>
        </div>

       
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              data-gallery-card
              className="group relative aspect-[4/3] rounded-md overflow-hidden bg-[#1A1715] border border-white/5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[11px] uppercase tracking-widest text-[#D4C4B0] mb-1">
                  {item.category}
                </span>
                <p className="text-[16px] font-medium text-[#F5F2EB]">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}