"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./context/cartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { openCart, cartCount } = useCart();

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const desktopLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Our Story", href: "/our-story" },
    { name: "Experience", href: "/experience" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.15 }
        );
      }

      const desktopLinks = desktopLinksRef.current.filter(Boolean);
      if (desktopLinks.length > 0) {
        gsap.fromTo(
          desktopLinks,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }

      if (rightSideRef.current) {
        gsap.fromTo(
          rightSideRef.current.children,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.09,
            ease: "power2.out",
            delay: 0.5,
          }
        );
      }

      if (burgerRef.current) {
        gsap.fromTo(
          burgerRef.current,
          { scale: 0.75, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 0.35,
          }
        );

        gsap.to(burgerRef.current, {
          y: -3,
          duration: 1.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.35,
      });

      gsap.fromTo(
        sidebarRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" }
      );

      const mobileLinks = mobileLinksRef.current.filter(Boolean);
      if (mobileLinks.length > 0) {
        gsap.fromTo(
          mobileLinks,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.07,
            ease: "power2.out",
            delay: 0.12,
          }
        );
      }
    } else {
      gsap.to(sidebarRef.current, {
        x: "-100%",
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.35,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkColor = "#F5F2EB";
  const activeHoverColor = "#D4C4B0";

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-[#171514] border-b border-[#F5F2EB]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            
            <div className="flex items-center gap-3 shrink-0 z-10">
              <button
                ref={burgerRef}
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                className="md:hidden p-2 rounded-md text-[#F5F2EB]"
              >
                <Menu size={24} strokeWidth={1.8} />
              </button>

              <Link href="/">
                <div
                  ref={logoRef}
                  className="font-serif text-[22px] md:text-[26px] tracking-[0.15em] text-[#F5F2EB] font-medium"
                >
                  NOIR
                </div>
              </Link>
            </div>

          
            <div className="hidden lg:flex items-center gap-6 xl:gap-7 absolute left-1/2 -translate-x-1/2 text-[13px] font-medium tracking-wide">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  ref={(el) => {
                    desktopLinksRef.current[i] = el;
                  }}
                  className="transition-colors duration-200 whitespace-nowrap"
                  style={{
                    color: isActive(link.href) ? activeHoverColor : linkColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = activeHoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive(link.href)
                      ? activeHoverColor
                      : linkColor;
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

           
            <div
              ref={rightSideRef}
              className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 z-10"
            >
              <button
                type="button"
                onClick={openCart}
                aria-label="Open cart"
                className="relative inline-flex items-center justify-center p-2 sm:p-2.5 rounded-md text-[#F5F2EB] hover:text-[#D4C4B0] transition-colors cursor-pointer"
              >
                <ShoppingBag size={20} strokeWidth={1.7} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#9f0022] text-[#F5F2EB] text-[10px] font-semibold flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link
                href="/reservations"
                className="inline-flex items-center text-[12px] sm:text-[13px] font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-md transition hover:opacity-90 bg-[#9f0022]/50 text-[#F5F2EB] whitespace-nowrap"
              >
                Reserve a Table →
              </Link>
            </div>
          </div>
        </div>
      </nav>

     
      <div
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/50 z-40 opacity-0 pointer-events-none md:hidden"
      />

      
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-[280px] sm:w-[320px] z-50 -translate-x-full md:hidden shadow-2xl bg-[#171514]"
      >
        <div className="flex flex-col h-full pt-6 px-6">
          <div className="flex justify-between items-center mb-10">
            <span className="font-serif text-[22px] tracking-[0.15em] text-[#F5F2EB]">
              NOIR
            </span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-full text-[#F5F2EB]"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                ref={(el) => {
                  mobileLinksRef.current[i] = el;
                }}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium tracking-wide transition-colors whitespace-nowrap"
                style={{
                  color: isActive(link.href) ? activeHoverColor : linkColor,
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      
      <div className="h-16 md:h-[72px]" />
    </>
  );
}