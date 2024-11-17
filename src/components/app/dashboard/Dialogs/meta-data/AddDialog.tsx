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
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { IMetaData } from "@/types/types";
import DialogLayout from "../DialogLayout";
import {  meatDataURL } from "@/APIS/end-point";
import { fields } from "./fields";
import useAddData from "@/custom hooks/useAddData";

const AddDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const t = useTranslations("metaData");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IMetaData>();
  const { mutate, isPending } = useAddData<FormData>(
    meatDataURL,
    "addMetaData",
    "getMeatData",
  );

  const onSubmit = (data: IMetaData) => {
    const formData = new FormData();
    formData.append("meta_description_ar", data.meta_description_ar);
    formData.append("meta_description_en", data.meta_description_en);
    formData.append("meta_keywords_ar", data.meta_keywords_ar);
    formData.append("meta_keywords_en", data.meta_keywords_en);
    formData.append("meta_title_ar", data.meta_title_ar);
    formData.append("meta_title_en", data.meta_title_en);

    mutate(formData);
  };

  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{t("addMetaData")}</DialogTitle>
          <DialogDescription>{t("addMetaDataDetails")}</DialogDescription>{" "}
        </DialogHeader>
        {fields
          .filter((field) => field.showInEdit)
          .map((field) => (
            <div className="space-y-2 my-3" key={field.name}>
              <Label htmlFor={field.name} className="text-right">
                {/* {t(field.label)} */}
                {field.label}
              </Label>
              <Input
                id={field.name}
                type={field.type}
                className="col-span-3"
                {...register(
                  field.name,
                  field.validate
                    ? {
                        required:
                          //  t(field.required || "")
                          field.required,
                      }
                    : {}
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
            {t("saveChanges")}
          </Button>
        </DialogFooter>
      </form>
    </DialogLayout>
  );
};

export default AddDialog;
