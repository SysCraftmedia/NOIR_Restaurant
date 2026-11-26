"use client";

import Image from "next/image";

const dishes = [
  {
    name: "Grilled Beef Steak Platter",
    image: "/images/noirImages/signatureimg1.jfif",
  },
  {
    name: "Royal Indian Mughlai Thali",
    image: "/images/noirImages/signtaure2img2.jfif",
  },
  {
    name: "Fine Dining Gourmet Platter",
    image: "/images/noirImages/signatureimg3.jfif",
  },
];

export default function SignatureDishes() {
  return (
    <section className="w-full bg-[#171514] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 mb-14 md:mb-18">
          <div className="flex items-center">
            <div className="h-px w-10 sm:w-16 md:w-28 bg-gradient-to-r from-transparent via-[#D4C4B0]/45 to-[#D4C4B0]/85" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#D4C4B0]/85 -ml-0.5 shrink-0" />
          </div>

          <h2 className="font-serif text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-medium text-[#D4C4B0] tracking-wide text-center whitespace-nowrap">
            Our Signature Dishes
          </h2>

          <div className="flex items-center">
            <span className="h-1.5 w-1.5 rotate-45 bg-[#D4C4B0]/85 -mr-0.5 shrink-0" />
            <div className="h-px w-10 sm:w-16 md:w-28 bg-gradient-to-l from-transparent via-[#D4C4B0]/45 to-[#D4C4B0]/85" />
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {dishes.map((dish) => (
            <div key={dish.name} className="flex flex-col items-center group">
              
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={90}
                />
              </div>

              
              <h3 className="mt-5 text-[16px] sm:text-[17px] md:text-[18px] font-medium tracking-wide text-[#F5F2EB] text-center">
                {dish.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}