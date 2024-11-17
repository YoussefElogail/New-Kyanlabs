"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { ContactUsData } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SectionTitleDis from "../../SectionTitleDis";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { baseURL, contactUsUrl } from "@/APIS/end-point";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactUsForm() {
  const { toast } = useToast();
  const t = useTranslations("HomePage.ContactSec");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null); // Create a ref for the ReCAPTCHA component

  const sendMsg = async (data: ContactUsData) => {
    try {
      const req = await fetch(`${baseURL}${contactUsUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });
      const res = await req.json();
      if (!req.ok) {
        throw res.message;
      } else {
        toast({
          description: res.message,
        });
      }
    } catch (error) {
      let errorMessage = "";

    if (typeof error === "string") {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "object" && error !== null) {
      errorMessage = "An unknown error occurred."
    } else {
      errorMessage = "An unknown error occurred.";
    }

    toast({
      variant: "destructive",
      description: errorMessage,
    });
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsData>();

  const onSubmit = (data: ContactUsData) => {
    if (!recaptchaToken) {
      toast({
        variant: "destructive",
        description: t("recaptchaMsg"),
      });
      return;
    }
    sendMsg(data);
    reset();
    setRecaptchaToken(null);
    recaptchaRef.current?.reset(); // Reset the reCAPTCHA widget
  };

  const onRecaptchaChange = (value: string | null) => {
    setRecaptchaToken(value);
  };

  return (
    <div className="container mx-auto   overflow-hidden p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-white shadow-md rounded-md p-4"
      >
        <SectionTitleDis
          title={t("title")}
          subtitle={t("description")}
          classN="main-section-title-dis"
        />
        <div className="w-full">
          <Input
            type="text"
            placeholder={t("name")}
            className="w-full"
            {...register("name", {
              required: { value: true, message: t("nameMsg") },
            })}
          />
          {!!errors.name && (
            <span className="input-error-msg">{errors.name.message}</span>
          )}
        </div>
        <div className="w-full">
          <Input
            type="text"
            placeholder={t("email")}
            className="w-full"
            {...register("email", {
              required: { value: true, message: t("emailMsg") },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("Invalid email format"),
              },
            })}
          />
          {!!errors.email && (
            <span className="input-error-msg">{errors.email.message}</span>
          )}
        </div>
        <div className="w-full">
          <Input
            type="text"
            placeholder={t("phone")}
            className="w-full"
            {...register("phone", {
              required: { value: true, message: t("phoneMsg") },
            })}
          />
          {!!errors.phone && (
            <span className="input-error-msg">{errors.phone.message}</span>
          )}
        </div>
        <div className="w-full">
          <Textarea
            placeholder={t("message")}
            className="w-full"
            {...register("message", {
              required: { value: true, message: t("messageMsg") },
            })}
          />
          {!!errors.message && (
            <span className="input-error-msg">{errors.message.message}</span>
          )}
        </div>
        <div className="w-full flex justify-center ">
          <ReCAPTCHA
            sitekey="6LcNN5YpAAAAADd0BG_hgb8oQbfPiUrCCh2iBev4" // Replace with your site key
            onChange={onRecaptchaChange}
            ref={recaptchaRef} // Attach the ref to the ReCAPTCHA component
            style={{ width: "scale(0.85)", transformOrigin: "0 0" }} // Adjust scale for responsiveness
          />
        </div>
        <Button type="submit" variant="outline" className="main-btn">
          {t("submit")}
        </Button>
      </form>
    </div>
  );
}
