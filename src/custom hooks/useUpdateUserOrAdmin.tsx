import { baseURL } from "@/APIS/end-point";
import { useToast } from "@/hooks/use-toast";
import { IUserSignUp } from "@/types/types";
import Cookies from "js-cookie";

const useUpdateUserOrAdmin = () => {
  const { toast } = useToast();
  const token = Cookies.get("token")

  const handleUpdateUserOrAdmin = async (data:IUserSignUp,  UpdateUrl:string) => {
    try {
      const req = await fetch(`${baseURL}${UpdateUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const res = await req.json();
      if (!req.ok) {
        throw res.errors;
      } else {
        toast({
          description: res.message,
        });
        Cookies.set("userData",JSON.stringify(res.data))
        return;
      }
    } catch (error: string | unknown) {
      toast({
        variant: "destructive",
        description: error as string,
      });
    }
  };
  return {handleUpdateUserOrAdmin};
};

export default useUpdateUserOrAdmin;
