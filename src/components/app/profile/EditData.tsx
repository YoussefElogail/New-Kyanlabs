import { IProfileData, IUserSignUp } from "@/types/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import useUpdateUserOrAdmin from "@/custom hooks/useUpdateUserOrAdmin";
import Cookies from "js-cookie";
import { editAdmin, editUser } from "@/APIS/end-point";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";

const EditData = ({ data ,setSubmit }: { data: IProfileData[]  , setSubmit: Dispatch<SetStateAction<boolean>>} ) => {
  const userType = JSON.parse(Cookies.get("userData")!).type
  const t = useTranslations("profile")
  const lang = Cookies.get("NEXT_LOCALE");

  const { handleUpdateUserOrAdmin } = useUpdateUserOrAdmin();
  const { register, handleSubmit } = useForm<IUserSignUp>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: IUserSignUp) => {
  await  handleUpdateUserOrAdmin(
      data,
      userType === "admin" ? editAdmin : editUser
    )
    setSubmit((prv:boolean)=> !prv)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6" dir={lang === "en" ? "ltr" : "rtl"}>
      {data?.map((item, i) => (
        <div className="mb-4" key={i}>
          <Label className="block text-lg font-bold text-gray-800 mb-2">
            {item.label}
          </Label>

          <Input
            type="text"
            {...register(`${item.registerName }`)}
            defaultValue={item.value}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      <div className="space-y-2">
          <Label htmlFor="password" className="block text-lg font-bold text-gray-800 mb-2">
            {t("password")}
            </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={`absolute ${lang === "en" ? "right-3":"left-3"} top-1/2 transform -translate-y-1/2 text-gray-400`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        
        </div>

      <Button
        type="submit"
        className="main-btn w-full"
      >
        {t("submit")}
      </Button>
    </form>
  );
};

export default EditData;
