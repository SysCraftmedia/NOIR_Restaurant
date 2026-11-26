"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const ReservationSchema = z.object({
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  guests: z.string().min(1, "Please select number of guests"),
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  specialRequests: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof ReservationSchema>;

const timeSlots = [
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

const guestOptions = [
  "1 Guest",
  "2 Guests",
  "3 Guests",
  "4 Guests",
  "5 Guests",
  "6 Guests",
  "8 Guests",
  "10+ Guests",
];

const bookingInfoItems = [
  {
    title: "Dress Code",
    lines: ["Smart Elegant"],
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
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7l7 4.5V13H4v-1.5L11 7V5.73A2 2 0 0 1 12 2z" />
        <path d="M4 13v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      </svg>
    ),
  },
  {
    title: "Cancellation",
    lines: ["24h in advance"],
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
        <circle cx="12" cy="12" r="4" />
        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
      </svg>
    ),
  },
  {
    title: "Contact",
    lines: ["+92 330 9066929"],
    href: "tel:+92 330 9066929",
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
];

export default function ReservationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftFormRef = useRef<HTMLDivElement>(null);
  const rightInfoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      date: "",
      time: "7:00 PM",
      guests: "2 Guests",
      fullName: "",
      email: "",
      phone: "",
      specialRequests: "",
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
        leftFormRef.current,
        { x: -30, opacity: 0 },
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

      gsap.fromTo(
        rightInfoRef.current?.children
          ? Array.from(rightInfoRef.current.children)
          : [],
        { x: 30, opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Reservation confirmed!", {
          style: {
            background: "#171514",
            border: "1px solid rgba(212, 196, 176, 0.25)",
            color: "#F5F2EB",
          },
        });
        form.reset();
      } else {
        toast.error(result.message || "Failed to confirm reservation", {
          description: "Please try again later",
          style: {
            background: "#171514",
            border: "1px solid rgba(159, 0, 34, 0.5)",
            color: "#F5F2EB",
          },
        });
      }
    } catch (error) {
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
         
          <div ref={leftFormRef} className="lg:col-span-8 lg:pr-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-[14px] sm:text-[15px] text-[#F5F2EB] mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      {...register("date")}
                      className="w-full px-4 py-3.5 rounded bg-[#171514] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-[#F5F2EB] text-[14px] sm:text-[15px] outline-none transition-colors [color-scheme:dark]"
                    />
                    {errors.date && (
                      <p className="mt-1.5 text-[12px] text-red-400">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] sm:text-[15px] text-[#F5F2EB] mb-2">
                      Select Time
                    </label>
                    <select
                      {...register("time")}
                      className="w-full px-4 py-3.5 rounded bg-[#171514] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-[#F5F2EB] text-[14px] sm:text-[15px] outline-none transition-colors cursor-pointer"
                    >
                      {timeSlots.map((slot) => (
                        <option
                          key={slot}
                          value={slot}
                          className="bg-[#171514] text-[#F5F2EB]"
                        >
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="mt-1.5 text-[12px] text-red-400">
                        {errors.time.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] sm:text-[15px] text-[#F5F2EB] mb-2">
                      Guests
                    </label>
                    <select
                      {...register("guests")}
                      className="w-full px-4 py-3.5 rounded bg-[#171514] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-[#F5F2EB] text-[14px] sm:text-[15px] outline-none transition-colors cursor-pointer"
                    >
                      {guestOptions.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="bg-[#171514] text-[#F5F2EB]"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.guests && (
                      <p className="mt-1.5 text-[12px] text-red-400">
                        {errors.guests.message}
                      </p>
                    )}
                  </div>
                </div>

               
                <div className="space-y-5">
                  <div>
                    <label className="block text-[14px] sm:text-[15px] text-[#F5F2EB] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register("fullName")}
                      className="w-full px-4 py-3.5 rounded bg-[#171514] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-[#F5F2EB] placeholder:text-[#D4C4B0]/45 text-[14px] sm:text-[15px] outline-none transition-colors"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-[12px] text-red-400">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] sm:text-[15px] text-[#F5F2EB] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      className="w-full px-4 py-3.5 rounded bg-[#171514] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-[#F5F2EB] placeholder:text-[#D4C4B0]/45 text-[14px] sm:text-[15px] outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-[12px] text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] sm:text-[15px] text-[#F5F2EB] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 300 1234567"
                      {...register("phone")}
                      className="w-full px-4 py-3.5 rounded bg-[#171514] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-[#F5F2EB] placeholder:text-[#D4C4B0]/45 text-[14px] sm:text-[15px] outline-none transition-colors"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-[12px] text-red-400">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              
              <div>
                <label className="block text-[14px] sm:text-[15px] text-[#F5F2EB] mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Any special requests..."
                  {...register("specialRequests")}
                  className="w-full px-4 py-3.5 rounded bg-[#171514] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-[#F5F2EB] placeholder:text-[#D4C4B0]/45 text-[14px] sm:text-[15px] outline-none transition-colors resize-y"
                />
              </div>

             
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded bg-[#9f0022]/50 hover:bg-[#9f0022]/80 disabled:opacity-60 text-[#F5F2EB] text-[14px] sm:text-[15px] font-medium tracking-wide transition-colors duration-300 cursor-pointer"
                >
                  <span>
                    {isSubmitting ? "Confirming..." : "Confirm Reservation"}
                  </span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </div>

          
          <div
            ref={rightInfoRef}
            className="lg:col-span-4 lg:border-l lg:border-[#D4C4B0]/15 lg:pl-12 pt-8 lg:pt-0 border-t border-[#D4C4B0]/15 lg:border-t-0 space-y-8"
          >
            <h2 className="font-serif text-[26px] sm:text-[30px] font-normal text-[#F5F2EB]">
              Booking Info
            </h2>

            {bookingInfoItems.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="mt-1 shrink-0 text-[#9f0022]/50">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-serif text-[18px] sm:text-[20px] font-normal text-[#F5F2EB] mb-0.5">
                    {item.title}
                  </h3>
                  {item.lines.map((line, i) =>
                    item.href ? (
                      <a
                        key={i}
                        href={item.href}
                        className="block text-[13px] sm:text-[14px] font-light text-[#D4C4B0]/75 hover:text-[#F5F2EB] transition-colors"
                      >
                        {line}
                      </a>
                    ) : (
                      <p
                        key={i}
                        className="text-[13px] sm:text-[14px] font-light text-[#D4C4B0]/75 leading-relaxed"
                      >
                        {line}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}