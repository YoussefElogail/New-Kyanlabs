
import { useToast } from '@/hooks/use-toast'
import Cookies from "js-cookie"
import { baseURL } from '@/APIS/end-point'
const useShowUserOrAdmin = () => {
    const {toast} = useToast()
    const token = Cookies.get("token")

    const handleShow= async (typeUrl:string)=>{
        try{
            const req = await fetch(`${baseURL}${typeUrl}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
                cache: "no-cache"
            })
            const res = await req.json()
            if (!req.ok) {
                throw res.error
            }else{
                Cookies.set("token",res.data)
                return res.data
            }
        }catch(error:string | unknown){
            toast(
                {
                    variant: "destructive",
                    description: error?.toString() || "Failed to fetch user data"
                }
            )
        }
    }
  return {handleShow}
}

export default useShowUserOrAdmin