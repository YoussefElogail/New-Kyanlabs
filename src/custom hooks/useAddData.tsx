"use client";
import { baseURL } from "@/APIS/end-point";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
interface IErrorResponse {
  message: string;
  error: string;
}
const useAddData = <T,>(
  url: string,
  mutationKey: string,
  invalidateQueryKey: string
) => {
  const cookieToken = Cookies.get("token");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const addDataReq = async (data: T) => {
    return axios.post(baseURL + url, data, {
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },
    })
    
  };
  

  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: addDataReq,
    onSuccess: (data) => {
      const msg = data.data.message 
      toast({
        title: `${msg}`,
      });
      queryClient.invalidateQueries({ queryKey: [invalidateQueryKey] });
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      const er = error.response?.data?.error ? error.response?.data.error : error.response?.data.message
      toast({
        variant: "destructive",
        title: `${er}`,
      });
    },
  });

  return { mutate, data, error, isPending, isSuccess, isError };
};

export default useAddData;
