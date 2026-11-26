"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Eye, EyeOff, Mail, Lock } from "lucide-react";
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

import { SignInSchema } from "@/src/schemas/Primary validation Schema/SignInSchema";
import GoogleSignInButton from "@/components/ui/GoogleSignInButton";

export default function SignInPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Login failed", {
        description: "Incorrect email or password",
        style: {
          background: "#3A2924",
          border: "1px solid #632E29",
          color: "#f5e6d3",
        },
      });
      setIsSubmitting(false);
      return;
    }

    if (result?.ok) {
      toast.success("Welcome back!", {
        style: {
          background: "#f5e6d3",
          border: "1px solid rgba(245, 230, 211, 0.5)",
          color: "#0F0E0E",
        },
      });
      router.replace("/menu");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-end">
      
      
      <div className="absolute inset-0">
        <Image
          src="/images/noirImages/signIn.png"
          alt="Background"
          fill
          className="object-cover object-left"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35 " />
      </div>

   
      <div className="relative z-10 w-full max-w-[380px] mx-4 sm:mx-6 lg:mr-12 xl:mr-16">
        <div className="bg-[#030303]/63 backdrop-blur-xs rounded-2xl px-5 py-5 border border-[#F3E8D7]/40 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-7 bg-[#B9A99A]/50" />
              <p className="font-serif text-[10.5px] tracking-[0.25em] uppercase text-[#B9A99A]">
                Welcome Back
              </p>
              <div className="h-px w-7 bg-[#B9A99A]/50" />
            </div>

            <h1 className="font-serif text-[32px] sm:text-[34px] leading-none font-medium text-[#f5e6d3]">
              Sign In
            </h1>
            
            <p className="mt-1.5 font-serif italic text-[13px] text-[#B9A99A]">
              Continue your culinary journey with us.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FieldGroup>
           
              <Field>
                <FieldLabel className="text-[#f5e6d3] text-[12.5px] font-medium mb-1 block">
                  Email Address
                </FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-[15px] text-[#88796F]" />
                    <Input
                      {...form.register("identifier")}
                      type="email"
                      placeholder="Email Address"
                      className="bg-transparent border-[#F3E8D7]/35 text-[#f5e6d3] placeholder:text-[#88796F] h-10 rounded-lg pl-10 pr-3 text-[13.5px] focus-visible:ring-1 focus-visible:ring-[#F3E8D7]/40"
                    />
                  </div>
                  <FieldError />
                </FieldContent>
              </Field>

             
              <Field>
                <FieldLabel className="text-[#f5e6d3] text-[12.5px] font-medium mb-1 block">
                  Password
                </FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-[15px] text-[#88796F]" />
                    <Input
                      {...form.register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="bg-transparent border-[#F3E8D7]/35 text-[#f5e6d3] placeholder:text-[#88796F] h-10 rounded-lg pl-10 pr-10 text-[13.5px] focus-visible:ring-1 focus-visible:ring-[#F3E8D7]/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#88796F] hover:text-[#f5e6d3]"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <FieldError />
                </FieldContent>
              </Field>
            </FieldGroup>

           
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  className="border-[#F3E8D7]/40 data-[state=checked]:bg-[#f5e6d3] data-[state=checked]:text-[#0F0E0E] size-[15px]"
                />
                <label htmlFor="remember" className="text-[12.5px] text-[#B9A99A] cursor-pointer">
                  Remember me
                </label>
              </div>

              <Link
                href="/forgot-password"
                className="text-[12.5px] text-[#78140b] hover:text-[#580303]"
              >
                Forgot password?
              </Link>
            </div>

            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 bg-[#531711] hover:bg-[#490b06] text-[#f5e6d3] text-[14px] font-medium rounded-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign In →"
              )}
            </Button>
          </form>

          
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-[#F3E8D7]/20" />
            <span className="text-[11px] tracking-widest text-[#88796F]">OR</span>
            <div className="flex-1 h-px bg-[#F3E8D7]/20" />
          </div>

         <GoogleSignInButton/>
          

          
          <p className="text-center text-[12.5px] text-[#B9A99A] mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-[#f5e6d3] hover:text-white underline underline-offset-2 font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}