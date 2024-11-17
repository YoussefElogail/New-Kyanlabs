"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl"; // Import useTranslations
import useDeleteData from "@/custom hooks/useDeleteData";

interface DeleteDialogProps<T> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: T;
  url: string;
  mutationKey: string;
  queryKey: string;
  itemName?: string;
  method?: "delete";
}

const DeleteDialog = <T extends { id: number | undefined }>({
  open,
  onOpenChange,
  item,
  url,
  mutationKey,
  queryKey,
}: DeleteDialogProps<T>) => {
  const { mutate, isSuccess, isPending } = useDeleteData(
    url,
    item?.id,
    mutationKey,
    queryKey
  );

  const t = useTranslations("deleteDialog");
  const handleDelete = () => {
    mutate();
  };

  React.useMemo(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Confirm Delete")}</DialogTitle>{" "}
          {/* Translate title */}
        </DialogHeader>
        <DialogDescription>
          {t("Are you sure you want to delete ?")}
        </DialogDescription>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            {t("Cancel")} {/* Translate button text */}
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {t("Delete")}
            {/* Translate button text */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
