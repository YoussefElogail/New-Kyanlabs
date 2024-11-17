"use client";

import { baseURL } from "@/APIS/end-point";
import { IUserSignUp } from "@/types/types";
import { useSignIn } from "./useSignIn";
import { useToast } from "@/hooks/use-toast";

export default function UseSignUp() {
  const { handleSignIn } = useSignIn();
  const { toast } = useToast();
  const handleSignUp = async (
    data: IUserSignUp,
    signUpUrl: string = "",
    signInUrl: string = ""
  ) => {
    try {
      const req = await fetch(`${baseURL}${signUpUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await req.json();
      if (!req.ok) {
        throw res.errors;
      } else {
        if (signInUrl) handleSignIn(data, signInUrl);
        toast({
          description: "Sign Up Successful",
        });
      }
    } catch (error: string | unknown) {
      if (typeof error === "string") {
        toast({
          variant: "destructive",
          description: error,
        });
      }
    }
  };

  return { handleSignUp };
}
