"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { Eye, EyeOff, Loader2, Lock, Mail, User, Phone } from "lucide-react";
import { toast } from "sonner";

import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import GoogleSignInButton from "@/components/ui/GoogleSignInButton";

const SignUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z
      .string()
      .min(10, "Enter a valid phone number")
      .regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "One uppercase letter")
      .regex(/[\d\W_]/, "One number or symbol"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.terms, {
    message: "Please accept the terms",
    path: ["terms"],
  });

type SignUpValues = z.infer<typeof SignUpSchema>;

export default function SignUpPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: SignUpValues) => {
    setIsSubmitting(true);

    const username =
      data.fullName.replace(/\s+/g, "").toLowerCase() || `user${Date.now()}`;

    try {
      await axios.post("/api/sign-up", {
        username,
        email: data.email,
        password: data.password,
        Fullname: data.fullName,
        phone: data.phone,
      });

      const result = await signIn("credentials", {
        identifier: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Account created, but login failed", {
          description: "Please sign in manually.",
          style: {
            background: "#3A2924",
            border: "1px solid #632E29",
            color: "#f5e6d3",
          },
        });
        router.replace("/menu");
        return;
      }

      toast.success("Welcome to NOIR!", {
        description: "Account created successfully.",
        style: {
          background: "#f5e6d3",
          border: "1px solid rgba(245, 230, 211, 0.5)",
          color: "#0F0E0E",
        },
      });

      router.replace("/online-order");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error("Sign-up failed", {
        description: axiosError.response?.data?.message || "Please try again.",
        style: {
          background: "#3A2924",
          border: "1px solid #632E29",
          color: "#f5e6d3",
        },
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-end">
      
      <div className="absolute inset-0">
        <Image
          src="/images/noirImages/signUp.png"
          alt="Background"
          fill
          className="object-cover object-left"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      
      <div className="relative z-10 w-full max-w-[370px] mx-4 sm:mx-6 lg:mr-12 xl:mr-16">
        <div className="bg-[#030303]/63 backdrop-blur-xs rounded-2xl px-5 py-4 border border-[#F3E8D7]/40 shadow-2xl">
          
          
          <div className="text-center mb-3">
            <div className="flex items-center justify-center gap-3 mb-1">
              <div className="h-px w-6 bg-[#B9A99A]/50" />
              <p className="font-serif text-[10px] tracking-[0.25em] uppercase text-[#B9A99A]">
                Join NOIR
              </p>
              <div className="h-px w-6 bg-[#B9A99A]/50" />
            </div>

            <h1 className="font-serif text-[28px] sm:text-[30px] leading-none font-medium text-[#f5e6d3]">
              Create Account
            </h1>
            
            <p className="mt-1 font-serif italic text-[12px] text-[#B9A99A]">
              Be part of the NOIR experience.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FieldGroup>
              
              <Field>
                <FieldContent>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-[13px] text-[#88796F]" />
                    <Input
                      {...form.register("fullName")}
                      placeholder="Full Name"
                      className="bg-transparent border-[#F3E8D7]/25 text-[#f5e6d3] placeholder:text-[#88796F] h-8.5 rounded-lg pl-9 pr-3 text-[13px] focus-visible:ring-1 focus-visible:ring-[#F3E8D7]/30"
                    />
                  </div>
                  <FieldError />
                </FieldContent>
              </Field>

             
              <Field>
                <FieldContent>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-[13px] text-[#88796F]" />
                    <Input
                      {...form.register("email")}
                      type="email"
                      placeholder="Email Address"
                      className="bg-transparent border-[#F3E8D7]/25 text-[#f5e6d3] placeholder:text-[#88796F] h-8.5 rounded-lg pl-9 pr-3 text-[13px] focus-visible:ring-1 focus-visible:ring-[#F3E8D7]/30"
                    />
                  </div>
                  <FieldError />
                </FieldContent>
              </Field>

              
              <Field>
                <FieldContent>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-[13px] text-[#88796F]" />
                    <Input
                      {...form.register("phone")}
                      type="tel"
                      placeholder="Phone Number"
                      className="bg-transparent border-[#F3E8D7]/25 text-[#f5e6d3] placeholder:text-[#88796F] h-8.5 rounded-lg pl-9 pr-3 text-[13px] focus-visible:ring-1 focus-visible:ring-[#F3E8D7]/30"
                    />
                  </div>
                  <FieldError />
                </FieldContent>
              </Field>

              
              <Field>
                <FieldContent>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-[13px] text-[#88796F]" />
                    <Input
                      {...form.register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="bg-transparent border-[#F3E8D7]/25 text-[#f5e6d3] placeholder:text-[#88796F] h-8.5 rounded-lg pl-9 pr-9 text-[13px] focus-visible:ring-1 focus-visible:ring-[#F3E8D7]/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#88796F] hover:text-[#f5e6d3]"
                    >
                      {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                  <FieldError />
                </FieldContent>
              </Field>

             
              <Field>
                <FieldContent>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-[13px] text-[#88796F]" />
                    <Input
                      {...form.register("confirmPassword")}
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="bg-transparent border-[#F3E8D7]/25 text-[#f5e6d3] placeholder:text-[#88796F] h-8.5 rounded-lg pl-9 pr-9 text-[13px] focus-visible:ring-1 focus-visible:ring-[#F3E8D7]/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#88796F] hover:text-[#f5e6d3]"
                    >
                      {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                  <FieldError />
                </FieldContent>
              </Field>
            </FieldGroup>

          
            <div className="flex items-start gap-2 pt-0.5">
              <Checkbox
                id="terms"
                checked={form.watch("terms")}
                onCheckedChange={(checked) =>
                  form.setValue("terms", checked === true, { shouldValidate: true })
                }
                className="mt-0.5 border-[#F3E8D7]/35 data-[state=checked]:bg-[#f5e6d3] data-[state=checked]:text-[#0F0E0E] size-[13px]"
              />
              <label htmlFor="terms" className="text-[11px] text-[#B9A99A] cursor-pointer leading-tight">
                I agree to the{" "}
                <span className="text-[#f5e6d3] underline underline-offset-2">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-[#f5e6d3] underline underline-offset-2">
                  Privacy Policy
                </span>
              </label>
            </div>
            {form.formState.errors.terms && (
              <p className="text-[11px] text-red-400 -mt-1">
                {form.formState.errors.terms.message}
              </p>
            )}

            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-8.5 bg-[#531711] hover:bg-[#490b06] text-[#f5e6d3] text-[13px] font-medium rounded-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                  Please wait
                </>
              ) : (
                "Create Account →"
              )}
            </Button>
          </form>

          
          <div className="flex items-center gap-3 my-2.5">
            <div className="flex-1 h-px bg-[#F3E8D7]/20" />
            <span className="text-[10px] tracking-widest text-[#88796F]">OR</span>
            <div className="flex-1 h-px bg-[#F3E8D7]/20" />
          </div>

          <GoogleSignInButton />

        
          <p className="text-center text-[11.5px] text-[#B9A99A] mt-2.5">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-[#f5e6d3] hover:text-white underline underline-offset-2 font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}