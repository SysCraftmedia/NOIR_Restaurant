"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#171514] text-[#F5F2EB] pt-16 md:pt-20 pb-10 md:pb-12 border-t border-[#D4C4B0]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start pb-12 md:pb-16 text-center md:text-left">
          
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h2 className="font-serif text-[28px] md:text-[32px] tracking-[0.2em] font-medium text-[#D4C4B0]">
              NOIR
            </h2>
            <p className="mt-2 text-[13px] md:text-[14px] text-[#F5F2EB]/70 italic font-serif">
              Fine Dining, Elevated.
            </p>
          </div>

          
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#D4C4B0]/20 pt-8 md:pt-0 pl-0 md:pl-10 flex justify-center">
            <ul className="grid grid-cols-2 gap-y-3 gap-x-8 sm:gap-x-12 text-[12px] md:text-[13px] tracking-widest font-medium uppercase text-[#F5F2EB]/90 text-left">
              <li>
                <Link href="/" className="hover:text-[#D4C4B0] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-[#D4C4B0] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#D4C4B0] transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-[#D4C4B0] transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#D4C4B0] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/private-dining" className="hover:text-[#D4C4B0] transition-colors">
                  Private Dining
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="hover:text-[#D4C4B0] transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4C4B0] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

         
          <div className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right pt-6 md:pt-0 border-t md:border-t-0 border-[#D4C4B0]/20">
            <div>
              <h3 className="text-[13px] md:text-[14px] font-medium tracking-widest uppercase text-[#D4C4B0] mb-2">
                Opening Hours
              </h3>
              <p className="text-[12px] md:text-[13px] text-[#F5F2EB]/80 leading-relaxed">
                Mon - Sun: 6 PM - 11 PM
              </p>
            </div>

           
            <div className="flex items-center justify-center md:justify-end gap-4 mt-6">
             
              <a
                href="https://www.instagram.com/syscraft_media?dmpr=MTcwZTliczNiNnkwOQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#D4C4B0]/30 flex items-center justify-center text-[#D4C4B0] hover:bg-[#D4C4B0] hover:text-[#171514] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

          
              <a
                href="https://www.facebook.com/share/1Cgdx2vaWY/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#D4C4B0]/30 flex items-center justify-center text-[#D4C4B0] hover:bg-[#D4C4B0] hover:text-[#171514] transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              <a
                href="https://wa.me/923309066929"
                className="w-9 h-9 rounded-full border border-[#D4C4B0]/30 flex items-center justify-center text-[#D4C4B0] hover:bg-[#D4C4B0] hover:text-[#171514] transition-all"
                aria-label="Reviews"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        
        <div className="w-full h-px bg-[#D4C4B0]/15 my-6 md:my-8" />

        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-2 text-center lg:text-left">
          <p className="text-[14px] md:text-[15px] font-serif tracking-wide text-[#F5F2EB]">
            Subscribe to our newsletter
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center w-full lg:w-auto max-w-md bg-[#171514] border border-[#D4C4B0]/30 rounded-2xl sm:rounded-full overflow-hidden p-1.5 sm:p-1 shadow-lg gap-2 sm:gap-0"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-transparent px-4 py-2.5 text-[14px] text-[#F5F2EB] placeholder-[#F5F2EB]/40 focus:outline-none text-center sm:text-left"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#9f0022]/50 hover:bg-[#390a12] text-[#F5F2EB] px-6 py-2.5 rounded-xl sm:rounded-full text-[13px] font-medium tracking-wide transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
}