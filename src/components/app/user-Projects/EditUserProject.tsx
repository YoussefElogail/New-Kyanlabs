import { updateUserProject } from "@/APIS/end-point";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useEditData from "@/custom hooks/useEditData";
import { IUserProject } from "@/types/types";
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

const EditUserProject = ({
  userProjectData,
}: {
  userProjectData: IUserProject;
}) => {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserProject>();

  const { isPending, mutate } = useEditData(
    updateUserProject,
    userProjectData.id,
    "updateUserProject",
    "allUserProjects",
    "post"
  );

  const t =useTranslations("userProject")

  const onSubmit = (data: IUserProject) => {
    mutate(data);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="mr-2">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("editProject")}</DialogTitle>
        </DialogHeader>
        {/* Add form fields for editing project */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 p-4 max-h-[calc(100vh-200px)] overflow-y-auto"
        >
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="title">{t("title")}</Label>
            <Input
              defaultValue={userProjectData?.title}
              id="title"
              {...register("title", {
                required: t("titleMsg"),
              
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="details">{t("details")}</Label>
            <Input
              id="details"
              defaultValue={userProjectData?.details}
              {...register("details", { required: t("detailsMsg") })}
            />
            {errors.details && (
              <p className="text-red-500 text-sm">{errors.details.message}</p>
            )}
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className="bg-[#2bbaa5] hover:bg-[#239485]"
          >
            {t("editProject")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserProject;
