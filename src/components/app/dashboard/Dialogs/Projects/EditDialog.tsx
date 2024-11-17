"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { fields } from "./fields";
import { useTranslations } from "next-intl";
import { IProjectsData } from "@/types/types";
import DialogLayout from "../DialogLayout";
import {  editProject } from "@/APIS/end-point";
import useEditData from "@/custom hooks/useEditData";
export function EditDialog({
  open,
  onOpenChange,
  projectsData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectsData: IProjectsData;
}) {
  const t = useTranslations("projectDialog");
  const { register, formState, handleSubmit, reset } = useForm<IProjectsData>();
  const { mutate, isSuccess, isPending } = useEditData<FormData>(
    editProject,
    projectsData?.id,
    "editTeamMember",
    "getTeams",
    "post"
  );
  const { errors } = formState;
  const onSubmit = (data: IProjectsData) => {
    const formData = new FormData();
    formData.append("title_en", data.title_en);
    formData.append("title_ar", data.title_ar);
    formData.append("description_en", data.description_en);
    formData.append("description_ar", data.description_ar);
    // إضافة صورة واحدة فقط (حقل "image")
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    // إضافة عدة صور (حقل "images")
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((imageFile) => {
        formData.append("images[]", imageFile); // إرسال الصور المتعددة في formData
      });
    }
    
    formData.append("link", data.link);

    mutate(formData);
  };

  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);

  React.useMemo(() => {
    if (projectsData) {
      reset(projectsData);
    }
  }, [projectsData, reset]);

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{t("editProject")}</DialogTitle>
          <DialogDescription>{t("editProjectDetails")}</DialogDescription>{" "}
        </DialogHeader>
        {fields
          .filter((field) => field.showInEdit)
          .map((field) => (
            <div className="space-y-2 my-3" key={field.name}>
              <Label htmlFor={field.name} className="text-right">
                {t(field.label)}
              </Label>
              <Input
                id={field.name}
                type={field.type}
                className="col-span-3"
                {...register(
                  field.name,
                  field.validate ? { required: t(field.required) } : {}
                )}
                {...(field.name === "images" && { multiple: true })} 
              />
              {errors[field.name] && (
                <div className="text-red-500 w-full">
                  {errors[field.name]?.message}
                </div>
              )}
            </div>
          ))}

        <DialogFooter className="mt-3">
          <Button type="submit" disabled={isPending}>
            {t("saveChanges")}
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
}
