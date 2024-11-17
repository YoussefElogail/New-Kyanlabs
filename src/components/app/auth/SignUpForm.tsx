"use client";

import AuthCard from "@/components/app/auth/AuthCard";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IUserSignUp } from "@/types/types";
import { userSignUp, userSignIn } from "@/APIS/end-point";
import UseSignUp from "@/custom hooks/UseSignUp";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import CircleSpinner from "@/components/Spanner";

export default function SignUpForm() {
  const { handleSignUp } = UseSignUp();
  const t = useTranslations("sign-up");
  const lang = Cookies.get("NEXT_LOCALE");
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserSignUp>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: IUserSignUp) => {
    setLoading(true)
    await handleSignUp(data, userSignUp, userSignIn);
    setLoading(false)
    // Here you would typically send the data to your backend
  };
  return (
    <AuthCard
      title={t("title")}
      label={t("label")}
      footerLabel={t("footerLabel")}
      textLink={t("textLink")}
      link="/sign-in"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("userName")}</Label>
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
              className={`absolute ${lang === "ar" ?"left-3": "right-3"} top-1/2 transform -translate-y-1/2 text-gray-400`}
              size={18}
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{t("userNameMsg")}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: true,
              })}
              className={errors.email ? "border-red-500" : ""}
            />
            <Mail
              className={`absolute ${lang === "ar" ?"left-3": "right-3"} top-1/2 transform -translate-y-1/2 text-gray-400`}
              size={18}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{t("emailMsg")}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <div className="relative">
            <Input
              id="phone"
              type="text"
              placeholder="+201222222222"
              {...register("phone", {
                required: true,
              })}
              className={errors.phone ? "border-red-500" : ""}
            />
            <Mail
              className={`absolute ${lang === "ar" ?"left-3": "right-3"} top-1/2 transform -translate-y-1/2 text-gray-400`}
              size={18}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{t("phoneMsg")}</p>
          )}
        </div>
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
            <p className="text-red-500 text-sm mt-1">{t("passwordMsg")}</p>
          )}
        </div>
        {/* <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (val: string) => {
                      if (watch("password") != val) {
                        return "Your passwords do not match";
                      }
                    },
                  })}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                <Lock
                                className={`absolute ${lang === "en" ? "right-3":"left-3"} top-1/2 transform -translate-y-1/2 text-gray-400`}

                  size={18}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div> */}
        {
          loading? (
            <CircleSpinner></CircleSpinner>
          ) : (
            <Button type="submit" className="main-btn w-full">
          {t("SignUp")}
        </Button>
          )
        }
      </form>
    </AuthCard>
  );
}
