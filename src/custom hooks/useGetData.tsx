import { baseURL } from "@/APIS/end-point";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
const useGetData = (
  url: string,
  queryKey: string,
  enabledCondition: boolean = true,
  page: number = 1,
  per_page: number = 10
) => {
  const cookieToken = Cookies.get("token");

  const getDataRequest = () => {
    return axios.get(baseURL + url, {
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },
      params: {
        page,
        per_page,
      },
    });
  };

  const { data, error, isLoading, isSuccess, isError,  } = useQuery({
    queryKey: [queryKey,page,per_page],
    queryFn: getDataRequest,
    enabled: enabledCondition,
  });

  return { data, error, isLoading, isSuccess, isError };
};

export default useGetData;
