"use client";
import { baseURL } from "@/APIS/end-point";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios from "axios";

const useEditData = <T,>(
  url: string,
  id: number,
  mutationKey: string,
  invalidateQueryKey: string,
  method: "post" | "put"
) => {
  const cookieToken = Cookies.get("token");
  const { toast } = useToast();
  const editDataRequest = (data?: T) => {
    return axios[method](`${baseURL}${url}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },
    });
  };
  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: [mutationKey, id],
    mutationFn: editDataRequest,
    onSuccess: (data) => {
      toast({
        title: `${data?.data?.message}`,
      });
      queryClient.invalidateQueries({ queryKey: [invalidateQueryKey] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: `${error.message}`,
      });
    },
  });
  return { mutate, data, error, isPending, isSuccess, isError };
};
export default useEditData;
