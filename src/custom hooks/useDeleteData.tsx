"use client";
import { baseURL } from "@/APIS/end-point";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useDeleteData = (
  url: string,
  id: number | undefined,
  mutationKey: string,
  invalidateQueryKey: string
) => {
  const cookieToken = Cookies.get("token");
  const { toast } = useToast();

  const deleteDataRequest = () => {
    return axios.delete(`${baseURL}${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },
    });
  };

  const queryClient = useQueryClient();
  const { mutate, data, error, isPending, isSuccess, isError } = useMutation({
    mutationKey: [mutationKey, id],
    mutationFn: deleteDataRequest,
    onSuccess: (data) => {
      toast({
        title: `${data.data.message}`,
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

export default useDeleteData;
