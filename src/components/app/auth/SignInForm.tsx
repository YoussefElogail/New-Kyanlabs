"use client";

import AuthCard from "@/components/app/auth/AuthCard";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IUserSignIn } from "@/types/types";
import { useSignIn } from "@/custom hooks/useSignIn";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import CircleSpinner from "@/components/Spanner";


export default function SignInForm({signInUrl, type = ""}:{signInUrl:string, type?: string}) {
  const t = useTranslations("sign-in")
  const lang = Cookies.get("NEXT_LOCALE");
  const [loading,setLoading] = useState(false)
  const {handleSignIn} = useSignIn()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserSignIn>();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: IUserSignIn) => {
    setLoading(true)
    await handleSignIn(data,signInUrl)
    setLoading(false)
    // Here you would typically send the data to your backend
  };

  return (
    <AuthCard
      title={`${type} ${t("title")}`}
      label={t("label")}
      footerLabel={t("footerLabel")}
      textLink={t("textLink")}
      link="/sign-up"
      type={type}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* <div className="space-y-2">
          <Label htmlFor="username">User name</Label>
          <div className="relative">
            <Input
              id="username"
              type="text"
              placeholder="John Doe"
              {...register("username", {
                required: true,
              })}
              className={errors.username ? "border-red-500" : ""}
            />
            <User
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">User name is required</p>
          )}
        </div> */}

        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: true
              })}
              className={errors.email ? "border-red-500" : ""}
            />
            <Mail
              className={`absolute ${lang === "ar" ?"left-3": "right-3"} top-1/2 transform -translate-y-1/2 text-gray-400`}
              size={18}
            />
            
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {t("emailMsg")}
            </p>
          )}
          </div>
        {/* <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Input
              id="phone"
              type="text"
              placeholder="john@example.com"
              {...register("phone", {
                required: true,
                maxLength: {value: 21, message: "Phone number incres the 21"}
              })}
              className={errors.phone ? "border-red-500" : ""}
            />
            <Mail
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">Valid phone is required</p>
          )}
        </div> */}
        <div className="space-y-2">
          <Label htmlFor="password">{t("password")}</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
              className={errors.password ? "border-red-500" : ""}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={`absolute ${lang === "ar" ?"left-3": "right-3"} top-1/2 transform -translate-y-1/2 text-gray-400`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {t("passwordMsg")}
            </p>
          )}
        </div>
        {
          loading? <CircleSpinner ></CircleSpinner> :
          <Button type="submit" className="main-btn w-full">
            {t("signIn")}
          </Button>
        }
      </form>
    </AuthCard>
  );
}
