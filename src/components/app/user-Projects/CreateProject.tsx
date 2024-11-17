import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAddData from "@/custom hooks/useAddData";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { userCreateProject } from "@/APIS/end-point";

interface FormData {
  title: string;
  details: string;
}

export default function CreateProject() {
  const t = useTranslations("userProjects");
  const lang = Cookies.get("NEXT_LOCALE");

  const { isPending, mutate } = useAddData(
    userCreateProject,
    "userCreateProject",
    "allUserProjects"
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      details: "",
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
    reset();
  };

  return (
    <Card dir={lang === "en" ? "ltr" : "rtl"}>
      <CardHeader>
        <CardTitle>{t("createTitle")}</CardTitle>
        <CardDescription>{t("createDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="title">{t("name")}</Label>
            <Input
              id="title"
              placeholder={t("namePlaceHolder")}
              {...register("title", {
                required: t("nameMsg"),
                // minLength: {
                //   value: 2,
                //   message: "Title must be at least 2 characters",
                // },
              })}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">{t("projectDescription")}</Label>
            <Textarea
              id="details"
              placeholder={t("projectDescriptionPlaceHolder")}
              className="resize-none"
              {...register("details", {
                required: t("projectDescriptionMsg"),
                // minLength: {
                //   value: 10,
                //   message: "Details must be at least 10 characters",
                // },
              })}
            />
            {errors.details && (
              <p className="text-sm text-red-500">{errors.details.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="main-btn w-full"
          >
            {t("submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
