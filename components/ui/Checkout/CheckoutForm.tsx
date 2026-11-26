"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";
import {
  User,
  MapPin,
  Calendar,
  CreditCard,
  Utensils,
  Bike,
  Banknote,
  Smartphone,
  Lock,
  ShoppingBag,
  SquarePen,
  Tag,
  Minus,
  Plus,
  Check,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/components/ui/context/cartContext";

gsap.registerPlugin(ScrollTrigger);

const noirToastStyle = {
  background: "#171514",
  color: "#F5F2EB",
  border: "1px solid rgba(212, 196, 176, 0.25)",
};

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  PhoneNumber: z.string().min(7, "Valid phone number is required"),
  branch: z.string().min(1, "Please select a branch"),
  deliveryAddress: z.string().optional(),
  ExternalPhoneNumber: z.string().optional(),
  NearestLandmark: z.string().optional(),
  reservationDate: z.string().min(1, "Please select a date"),
  reservationTime: z.string().min(1, "Please select a time"),
  agreeTerms: z.literal(true, {
    message: "You must agree to Terms & Conditions and Privacy Policy",
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

type OrderType = "dine-in" | "delivery";
type PaymentMethod = "cod" | "card" | "wallet";

const paymentMethodMap: Record<PaymentMethod, string> = {
  cod: "Cash on Delivery",
  card: "card",
  wallet: "easypaisa",
};

const branches = [
  "Main Branch (DHA Phase 5)",
  "Clifton Block 4 Lounge",
  "Tariq Road Flagship",
];

const timeSlots = [
  "12:30 PM",
  "01:30 PM",
  "02:30 PM",
  "06:30 PM",
  "07:30 PM",
  "08:30 PM",
  "09:30 PM",
  "10:30 PM",
];

const formatPKR = (amount: number) =>
  `PKR ${Math.round(amount).toLocaleString("en-US")}`;

export default function CheckoutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const {
    cartItems,
    cartTotal,
    updateQuantity,
    openCart,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [promoInput, setPromoInput] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      PhoneNumber: "",
      branch: "Main Branch (DHA Phase 5)",
      deliveryAddress: "",
      ExternalPhoneNumber: "",
      NearestLandmark: "",
      reservationDate: "",
      reservationTime: "",
      agreeTerms: true,
    },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const subtotal = cartTotal;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const deliveryFee =
    cartItems.length > 0 && orderType === "delivery" ? 300 : 0;
  const taxAmount = cartItems.length > 0 ? discountedSubtotal * 0.05 : 0;
  const grandTotal = discountedSubtotal + deliveryFee + taxAmount;

  const handleApplyPromo = async () => {
    const code = promoInput.trim();
    if (!code) {
      toast.error("Please enter a promo code", { style: noirToastStyle });
      return;
    }

    if (subtotal <= 0) {
      toast.error("Add items to your cart before applying a promo code", {
        style: noirToastStyle,
      });
      return;
    }

    setIsApplyingPromo(true);
    try {
      const { data } = await axios.post("/api/promo/validate", {
        code,
        orderAmount: subtotal,
      });

      if (data?.success) {
        setDiscountAmount(Number(data.discountAmount) || 0);
        setAppliedCode(data.promo?.code || code.toUpperCase());
        toast.success(data.message || "Promo code applied successfully", {
          style: noirToastStyle,
        });
      }
    } catch (error: unknown) {
      setDiscountAmount(0);
      setAppliedCode(null);
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Invalid promo code";
      toast.error(message, { style: noirToastStyle });
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add dishes first.", {
        style: noirToastStyle,
      });
      return;
    }

    if (orderType === "delivery" && !data.deliveryAddress?.trim()) {
      setError("deliveryAddress", {
        type: "manual",
        message: "Delivery address is required for delivery orders",
      });
      toast.error("Please enter your delivery address", {
        style: noirToastStyle,
      });
      return;
    }

    setIsSubmitting(true);
    setStep(2);

    try {
      const payload = {
        fullName: data.fullName.trim(),
        PhoneNumber: data.PhoneNumber.trim(),
        orderType,
        branch: data.branch,
        deliveryAddress:
          orderType === "delivery" ? data.deliveryAddress?.trim() : undefined,
        ExternalPhoneNumber:
          orderType === "delivery"
            ? data.ExternalPhoneNumber?.trim() || undefined
            : undefined,
        NearestLandmark:
          orderType === "delivery"
            ? data.NearestLandmark?.trim() || undefined
            : undefined,
        reservationDate: data.reservationDate,
        reservationTime: data.reservationTime,
        paymentMethod: paymentMethodMap[paymentMethod],
        MenuItem: cartItems.map((item) => ({
          menuItem: item.id,
          quantity: item.quantity,
          price: item.price,
          title: item.name,
        })),
        TotalAmount: Math.round(grandTotal),
        deliveryFee,
        tax: Math.round(taxAmount),
        discount: Math.round(discountAmount),
      };

      const response = await axios.post("/api/orders", payload);

      if (response.data?.success) {
        const createdOrder = response.data.order;
        setPlacedOrderId(
          createdOrder?._id ? String(createdOrder._id) : "CONFIRMED"
        );
        setStep(3);
        clearCart();
        toast.success(response.data.message || "Order placed successfully", {
          style: noirToastStyle,
        });
      }
    } catch (error: unknown) {
      setStep(1);
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to place order";
      toast.error(message, { style: noirToastStyle });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepperItems = useMemo(
    () => [
      { id: 1 as const, label: "Details" },
      { id: 2 as const, label: "Payment" },
      { id: 3 as const, label: "Confirmation" },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#12100F] py-10 sm:py-14 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          <div
            ref={leftColRef}
            className="lg:col-span-7 bg-[#171514] border border-[#D4C4B0]/15 rounded-md p-5 sm:p-8"
          >
           
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-7 border-b border-[#D4C4B0]/15">
              {stepperItems.map((item, index) => {
                const isActive = step === item.id;
                const isCompleted = step > item.id;

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 flex-1 min-w-[110px]"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (item.id < step || (item.id === 1 && step !== 3)) {
                          setStep(item.id);
                        }
                      }}
                      className="flex items-center gap-2.5 text-left cursor-pointer group"
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                          isActive
                            ? "bg-[#9f0022] text-[#F5F2EB]"
                            : isCompleted
                            ? "bg-[#9f0022]/60 text-[#F5F2EB]"
                            : "bg-[#1A1715] border border-[#D4C4B0]/20 text-[#D4C4B0]/65"
                        }`}
                      >
                        {isCompleted ? <Check size={13} /> : item.id}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-medium transition-colors ${
                          isActive
                            ? "text-[#F5F2EB]"
                            : "text-[#D4C4B0]/65 group-hover:text-[#F5F2EB]/90"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>

                    {index < stepperItems.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="hidden sm:block h-[1px] flex-1 bg-[#D4C4B0]/15 ml-1"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {step === 3 && placedOrderId ? (
              <div className="py-10 text-center space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#9f0022]/40 border border-[#D4C4B0]/25 text-[#D4C4B0] flex items-center justify-center mx-auto">
                  <Check size={22} />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#D4C4B0]/75">
                    Order Confirmed
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#D4C4B0]">
                    Thank You for Dining with NOIR
                  </h2>
                  <p className="text-sm text-[#F5F2EB]/85">
                    Order ID:{" "}
                    <span className="font-medium text-[#D4C4B0]">
                      {placedOrderId}
                    </span>
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#9f0022]/50 hover:bg-[#9f0022]/80 text-[#F5F2EB] text-sm font-medium transition-colors"
                  >
                    <RotateCcw size={14} />
                    <span>Back to Menu</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                {/* 1. Customer Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <User size={16} className="text-[#D4C4B0]" />
                    <h2 className="font-serif text-lg sm:text-xl text-[#D4C4B0] font-normal">
                      Customer Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs text-[#F5F2EB]/85">
                        Full Name <span className="text-[#D4C4B0]">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("fullName")}
                        placeholder="Enter your full name"
                        className="w-full px-3.5 py-2.5 rounded bg-[#1A1715] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-sm text-[#F5F2EB] placeholder:text-[#D4C4B0]/40 outline-none transition-colors"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-400">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs text-[#F5F2EB]/85">
                        Phone Number <span className="text-[#D4C4B0]">*</span>
                      </label>
                      <input
                        type="tel"
                        {...register("PhoneNumber")}
                        placeholder="+92 300 1234567"
                        className="w-full px-3.5 py-2.5 rounded bg-[#1A1715] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-sm text-[#F5F2EB] placeholder:text-[#D4C4B0]/40 outline-none transition-colors"
                      />
                      {errors.PhoneNumber && (
                        <p className="text-xs text-red-400">
                          {errors.PhoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <MapPin size={16} className="text-[#D4C4B0]" />
                    <h2 className="font-serif text-lg sm:text-xl text-[#D4C4B0] font-normal">
                      Delivery / Dining Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <button
                      type="button"
                      onClick={() => setOrderType("dine-in")}
                      className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded border text-sm font-medium transition-colors cursor-pointer ${
                        orderType === "dine-in"
                          ? "bg-[#9f0022]/50 border-[#9f0022]/80 text-[#F5F2EB]"
                          : "bg-[#1A1715] border-[#D4C4B0]/15 text-[#F5F2EB]/80 hover:border-[#D4C4B0]/35"
                      }`}
                    >
                      <Utensils size={15} />
                      <span>Dine In</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType("delivery")}
                      className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded border text-sm font-medium transition-colors cursor-pointer ${
                        orderType === "delivery"
                          ? "bg-[#9f0022]/50 border-[#9f0022]/80 text-[#F5F2EB]"
                          : "bg-[#1A1715] border-[#D4C4B0]/15 text-[#F5F2EB]/80 hover:border-[#D4C4B0]/35"
                      }`}
                    >
                      <Bike size={15} />
                      <span>Delivery</span>
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs text-[#F5F2EB]/85">
                      Branch Location <span className="text-[#D4C4B0]">*</span>
                    </label>
                    <select
                      {...register("branch")}
                      className="w-full px-3.5 py-2.5 rounded bg-[#1A1715] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-sm text-[#F5F2EB] outline-none transition-colors"
                    >
                      {branches.map((branchName) => (
                        <option
                          key={branchName}
                          value={branchName}
                          className="bg-[#171514] text-[#F5F2EB]"
                        >
                          {branchName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {orderType === "delivery" && (
                    <div className="space-y-3.5">
                      <div className="space-y-1.5">
                        <label className="block text-xs text-[#F5F2EB]/85">
                          Delivery Address{" "}
                          <span className="text-[#D4C4B0]">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("deliveryAddress")}
                          placeholder="House / Street / Block / Area"
                          className="w-full px-3.5 py-2.5 rounded bg-[#1A1715] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-sm text-[#F5F2EB] placeholder:text-[#D4C4B0]/40 outline-none transition-colors"
                        />
                        {errors.deliveryAddress && (
                          <p className="text-xs text-red-400">
                            {errors.deliveryAddress.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs text-[#F5F2EB]/85">
                            Secondary Phone
                          </label>
                          <input
                            type="tel"
                            {...register("ExternalPhoneNumber")}
                            placeholder="+92 300 0000000"
                            className="w-full px-3.5 py-2.5 rounded bg-[#1A1715] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-sm text-[#F5F2EB] placeholder:text-[#D4C4B0]/40 outline-none transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs text-[#F5F2EB]/85">
                            Nearest Landmark
                          </label>
                          <input
                            type="text"
                            {...register("NearestLandmark")}
                            placeholder="Optional landmark"
                            className="w-full px-3.5 py-2.5 rounded bg-[#1A1715] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-sm text-[#F5F2EB] placeholder:text-[#D4C4B0]/40 outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <Calendar size={16} className="text-[#D4C4B0]" />
                    <h2 className="font-serif text-lg sm:text-xl text-[#D4C4B0] font-normal">
                      Reservation / Delivery Time
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs text-[#F5F2EB]/85">
                        Date <span className="text-[#D4C4B0]">*</span>
                      </label>
                      <input
                        type="date"
                        {...register("reservationDate")}
                        className="w-full px-3.5 py-2.5 rounded bg-[#1A1715] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-sm text-[#F5F2EB] placeholder:text-[#D4C4B0]/40 outline-none transition-colors [color-scheme:dark]"
                      />
                      {errors.reservationDate && (
                        <p className="text-xs text-red-400">
                          {errors.reservationDate.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs text-[#F5F2EB]/85">
                        Time <span className="text-[#D4C4B0]">*</span>
                      </label>
                      <select
                        {...register("reservationTime")}
                        className="w-full px-3.5 py-2.5 rounded bg-[#1A1715] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-sm text-[#F5F2EB] outline-none transition-colors"
                      >
                        <option
                          value=""
                          className="bg-[#171514] text-[#D4C4B0]/50"
                        >
                          Select time
                        </option>
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
                      {errors.reservationTime && (
                        <p className="text-xs text-red-400">
                          {errors.reservationTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

               
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <CreditCard size={16} className="text-[#D4C4B0]" />
                    <h2 className="font-serif text-lg sm:text-xl text-[#D4C4B0] font-normal">
                      Payment Method
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                        paymentMethod === "cod"
                          ? "bg-[#9f0022]/50 border-[#9f0022]/80 text-[#F5F2EB]"
                          : "bg-[#1A1715] border-[#D4C4B0]/15 text-[#F5F2EB]/80 hover:border-[#D4C4B0]/35"
                      }`}
                    >
                      <Banknote size={15} />
                      <span>Cash on Delivery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                        paymentMethod === "card"
                          ? "bg-[#9f0022]/50 border-[#9f0022]/80 text-[#F5F2EB]"
                          : "bg-[#1A1715] border-[#D4C4B0]/15 text-[#F5F2EB]/80 hover:border-[#D4C4B0]/35"
                      }`}
                    >
                      <CreditCard size={15} />
                      <span>Credit / Debit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("wallet")}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                        paymentMethod === "wallet"
                          ? "bg-[#9f0022]/50 border-[#9f0022]/80 text-[#F5F2EB]"
                          : "bg-[#1A1715] border-[#D4C4B0]/15 text-[#F5F2EB]/80 hover:border-[#D4C4B0]/35"
                      }`}
                    >
                      <Smartphone size={15} />
                      <span>EasyPaisa / JazzCash</span>
                    </button>
                  </div>
                </div>

               
                <div className="space-y-4 pt-1">
                  <label className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5F2EB]/85 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("agreeTerms")}
                      className="sr-only peer"
                    />
                    <span className="w-4 h-4 rounded-sm bg-[#9f0022] peer-checked:bg-[#9f0022] text-[#F5F2EB] flex items-center justify-center shrink-0">
                      <Check size={11} strokeWidth={2.5} />
                    </span>
                    <span>
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="underline text-[#D4C4B0] hover:text-[#F5F2EB]"
                      >
                        Terms &amp; Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="underline text-[#D4C4B0] hover:text-[#F5F2EB]"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-xs text-red-400">
                      {errors.agreeTerms.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded bg-[#9f0022]/60 hover:bg-[#9f0022]/85 disabled:opacity-60 text-[#F5F2EB] text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{isSubmitting ? "Processing..." : "Place Order"}</span>
                    <ArrowRight size={15} />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#F5F2EB]/55 pt-0.5">
                    <Lock size={12} />
                    <span>Your information is safe and secure</span>
                  </div>
                </div>
              </form>
            )}
          </div>

         
          <div ref={rightColRef} className="lg:col-span-5 space-y-5">
            
            <div className="bg-[#171514] border border-[#D4C4B0]/15 rounded-md p-5 sm:p-7">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#D4C4B0]/15">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={16} className="text-[#D4C4B0]" />
                  <h2 className="font-serif text-lg sm:text-xl text-[#D4C4B0] font-normal">
                    Order Summary
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={openCart}
                  className="inline-flex items-center gap-1.5 text-xs text-[#D4C4B0]/85 hover:text-[#F5F2EB] transition-colors cursor-pointer"
                >
                  <SquarePen size={13} />
                  <span>Edit Cart</span>
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-10 text-center space-y-3">
                  <p className="font-serif text-lg text-[#D4C4B0]">
                    No items in your order
                  </p>
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#9f0022]/50 hover:bg-[#9f0022]/80 text-[#F5F2EB] text-xs font-medium transition-colors"
                  >
                    <span>Browse Menu</span>
                  </Link>
                </div>
              ) : (
                <>
                 
                  <div className="space-y-4 pb-5 border-b border-[#D4C4B0]/15">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-3.5"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="relative w-14 h-14 rounded overflow-hidden shrink-0 bg-[#1A1715] border border-[#D4C4B0]/10">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-sm font-medium text-[#F5F2EB] truncate">
                              {item.name}
                            </h3>
                            {item.description && (
                              <p className="text-xs text-[#F5F2EB]/60 line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end shrink-0 gap-2">
                          <span className="text-sm font-medium text-[#D4C4B0]">
                            {formatPKR(item.price * item.quantity)}
                          </span>

                          <div className="inline-flex items-center justify-between min-w-[78px] px-2 py-1 rounded bg-[#1A1715] border border-[#D4C4B0]/15 text-xs text-[#F5F2EB]/90">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              aria-label={`Decrease quantity for ${item.name}`}
                              className="text-[#D4C4B0]/70 hover:text-[#F5F2EB] cursor-pointer"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="font-medium select-none">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              aria-label={`Increase quantity for ${item.name}`}
                              className="text-[#D4C4B0]/70 hover:text-[#F5F2EB] cursor-pointer"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="py-5 space-y-2.5 text-sm border-b border-[#D4C4B0]/15">
                    <div className="flex items-center justify-between">
                      <span className="text-[#F5F2EB]/75">Subtotal</span>
                      <span className="text-[#F5F2EB]/90">
                        {formatPKR(subtotal)}
                      </span>
                    </div>

                    {appliedCode && discountAmount > 0 && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#D4C4B0]">
                          Discount ({appliedCode})
                        </span>
                        <span className="text-[#D4C4B0]">
                          - {formatPKR(discountAmount)}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-[#F5F2EB]/75">Delivery Fee</span>
                      <span className="text-[#F5F2EB]/90">
                        {formatPKR(deliveryFee)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#F5F2EB]/75">Tax (5%)</span>
                      <span className="text-[#F5F2EB]/90">
                        {formatPKR(taxAmount)}
                      </span>
                    </div>
                  </div>

                  
                  <div className="pt-5 flex items-center justify-between">
                    <span className="font-serif text-lg sm:text-xl text-[#F5F2EB]">
                      Total
                    </span>
                    <span className="font-serif text-xl sm:text-2xl font-medium text-[#D4C4B0]">
                      {formatPKR(grandTotal)}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Promo Code Card */}
            <div className="bg-[#171514] border border-[#D4C4B0]/15 rounded-md p-5 sm:p-6 space-y-3.5">
              <div className="flex items-center gap-2">
                <Tag size={15} className="text-[#D4C4B0]" />
                <h3 className="text-xs sm:text-sm font-medium text-[#F5F2EB]">
                  Have a Promo Code?
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-3.5 py-2.5 rounded bg-[#1A1715] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-xs sm:text-sm text-[#F5F2EB] placeholder:text-[#D4C4B0]/40 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  disabled={isApplyingPromo}
                  className="px-5 py-2.5 rounded bg-[#9f0022]/50 hover:bg-[#9f0022]/80 disabled:opacity-60 text-[#F5F2EB] text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0"
                >
                  {isApplyingPromo ? "Checking..." : "Apply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}