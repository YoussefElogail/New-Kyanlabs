"use client";
import { baseURL } from "@/APIS/end-point";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/routing";
import { IUserSignIn } from "@/types/types";
import Cookies from "js-cookie";

export const useSignIn = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handleSignIn = async (data: IUserSignIn, signInUrl: string) => {
    try {
      const req = await fetch(`${baseURL}${signInUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await req.json();

      if (!req.ok) {
        throw res.error;
      } else {
        // Handle success here
        Cookies.set("userData", JSON.stringify(res.data));
        Cookies.set("token", res.token);
        toast({
          description: "Sign In Successful",
        });
        if(res.data.type === "admin") {
          router.push("/dashboard");
        }else{
          router.push("/");
        }
      }
    } catch (error) {
      if (typeof error === "string") {
        toast({
          variant: "destructive",
          description: error,
        });
      }
    }
  };

  return { handleSignIn };
};
