"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const ContactSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof ContactSchema>;

const contactInfo = [
  {
    title: "Our Address",
    lines: ["123 Gourmet Lane,", "Lahore, Pakistan"],
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Phone",
    lines: ["+92 330 9066929"],
    href: "tel:+923309066929",
    external: false,
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Email",
    lines: ["syscraft.business@gmail.com"],
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=syscraft.business@gmail.com",
    external: true,
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    title: "Opening Hours",
    lines: ["Mon - Sun, 6 PM - 11 PM"],
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current?.children ? Array.from(leftColRef.current.children) : [],
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
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

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Message sent successfully!", {
          style: {
            background: "#171514",
            border: "1px solid rgba(212, 196, 176, 0.25)",
            color: "#F5F2EB",
          },
        });
        form.reset();
      } else {
        toast.error(result.message || "Failed to send message", {
          description: "Please try again later",
          style: {
            background: "#171514",
            border: "1px solid rgba(159, 0, 34, 0.5)",
            color: "#F5F2EB",
          },
        });
      }
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again later",
        style: {
          background: "#171514",
          border: "1px solid rgba(159, 0, 34, 0.5)",
          color: "#F5F2EB",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#1A1715] py-16 sm:py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
          
          <div ref={leftColRef} className="lg:col-span-5 lg:pr-12 space-y-8">
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="mt-1 shrink-0 text-[#9f0022]/50">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-serif text-[20px] sm:text-[22px] font-normal text-[#F5F2EB] mb-1">
                    {item.title}
                  </h3>
                  {item.lines.map((line, i) =>
                    item.href ? (
                      <a
                        key={i}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="block text-[14px] sm:text-[15px] font-light text-[#D4C4B0]/80 hover:text-[#F5F2EB] transition-colors"
                      >
                        {line}
                      </a>
                    ) : (
                      <p
                        key={i}
                        className="text-[14px] sm:text-[15px] font-light text-[#D4C4B0]/80 leading-relaxed"
                      >
                        {line}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          
          <div
            ref={rightColRef}
            className="lg:col-span-7 lg:border-l lg:border-[#D4C4B0]/15 lg:pl-14 pt-8 lg:pt-0 border-t border-[#D4C4B0]/15 lg:border-t-0"
          >
            <h2 className="font-serif text-[28px] sm:text-[34px] font-normal text-[#F5F2EB] mb-7">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("fullName")}
                  className="w-full px-4 py-3.5 rounded bg-[#171514] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-[#F5F2EB] placeholder:text-[#D4C4B0]/50 text-[14px] sm:text-[15px] outline-none transition-colors"
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-[12px] text-red-400">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  {...register("email")}
                  className="w-full px-4 py-3.5 rounded bg-[#171514] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-[#F5F2EB] placeholder:text-[#D4C4B0]/50 text-[14px] sm:text-[15px] outline-none transition-colors"
                />
                {errors.email && (
                  <p className="mt-1.5 text-[12px] text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  {...register("message")}
                  className="w-full px-4 py-3.5 rounded bg-[#171514] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-[#F5F2EB] placeholder:text-[#D4C4B0]/50 text-[14px] sm:text-[15px] outline-none transition-colors resize-y"
                />
                {errors.message && (
                  <p className="mt-1.5 text-[12px] text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded bg-[#9f0022]/50 hover:bg-[#9f0022]/80 disabled:opacity-60 text-[#F5F2EB] text-[14px] sm:text-[15px] font-medium tracking-wide transition-colors duration-300 cursor-pointer"
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}