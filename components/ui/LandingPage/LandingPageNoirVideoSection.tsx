"use client";

import Link from "next/link";

export default function NoirVideoSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/section1video.mp4" type="video/mp4" />
        
      </video>

     
      <div className="absolute inset-0 bg-black/45" />

      
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <h1 className="font-serif text-[42px] sm:text-[52px] md:text-[60px] lg:text-[68px] leading-[1.1] font-medium text-[#D4C4B0]">
              Where Flavour
              <br />
              Becomes Art.
            </h1>

            <p className="mt-5 text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-[#F5F2EB] max-w-md">
              An exclusive fine dining experience
              <br />
              in the heart of the city.
            </p>

            <Link
              href="/reservations"
              className="mt-8 inline-flex items-center text-[14px] font-medium px-6 py-3 rounded-md bg-[#9f0022]/50 text-[#F5F2EB] hover:bg-[#9f0022]/70 transition-all duration-300"
            >
              Reserve a Table →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}