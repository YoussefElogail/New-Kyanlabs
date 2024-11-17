import { deleteUserProject } from "@/APIS/end-point";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDeleteData from "@/custom hooks/useDeleteData";
import { IUserProject } from "@/types/types";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const DeleteUserProject = ({
  userProjectData,
}: {
  userProjectData: IUserProject;
}) => {
  const { isPending, mutate } = useDeleteData(
    deleteUserProject,
    userProjectData?.id,
    "deleteUserProject",
    "allUserProjects"
  );
  const t = useTranslations("deletePopup");

  const handleConfirmDelete = () => {
    mutate();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="mr-2">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] " >
        <DialogHeader>
          <DialogTitle>
            {t("title")} {userProjectData?.title}
          </DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={isPending}
          >
            {t("title")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserProject;
