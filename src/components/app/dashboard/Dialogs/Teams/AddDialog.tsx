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
import { useTranslations } from "next-intl"; // Import useTranslations
import { ITeamData } from "@/types/types";
import useAddData from "@/custom hooks/useAddData";
import { createMember } from "@/APIS/end-point";
import DialogLayout from "../DialogLayout";
import { fields } from "./fields";

export function AddDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("teamsDialog");

  const { register, formState, handleSubmit, reset } = useForm<ITeamData>();
  const { mutate, isSuccess, isPending } = useAddData<FormData>(
    createMember,
    "addTeamMember",
    "getTeams"
  );
  const { errors } = formState;
  const onSubmit = (data: ITeamData) => {
    const formData = new FormData();
    formData.append("name_en", data.name_en);
    formData.append("name_ar", data.name_ar);
    formData.append("position_ar", data.position_ar);
    formData.append("position_en", data.position_en);
    formData.append("email", data.email);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    formData.append("link_facebook", data.link_facebook || "");
    // formData.append("link_instagram", data.link_instagram || "");
    formData.append("link_twitter", data.link_twitter || "");
    formData.append("link_instagram", data.link_instagram || "");
    mutate(formData);
  };
  useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
      reset();
    }
  }, [isSuccess, onOpenChange, reset]);

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{t("addNewTeamMember")}</DialogTitle> {/* Translated */}
          <DialogDescription>
            {t("addNewTeamMemberDetails")} {/* Translated */}
          </DialogDescription>
        </DialogHeader>
        {fields
          .filter((field) => field.showInAdd)
          .map((field) => (
            <div className="space-y-2 my-3" key={field.name}>
              <Label htmlFor={field.name} className="text-right">
                {t(field.label)} {/* Translated */}
              </Label>
              <Input
                id={field.name}
                type={field.type}
                className="col-span-3"
                {...register(
                  field.name,
                  field.validate ? { required: t(field.required) } : {}
                )}
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
            {t("saveChanges")} {/* Translated */}
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
}
