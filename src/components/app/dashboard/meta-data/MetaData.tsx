"use client";
import React, { useState } from "react";
import TableHeadLayout from "../Table/TableHeadLayout";
import Heading from "../Table/Heading";
import AddButton from "../Table/AddButton";
import { useTranslations } from "next-intl";
import useGetData from "@/custom hooks/useGetData";
import { meatDataURL } from "@/APIS/end-point";
import AddDialog from "../Dialogs/meta-data/AddDialog";
import { EditDialog } from "../Dialogs/meta-data/EditDialog";
import { Button } from "@/components/ui/button";

const MetaData = () => {
  const { data,  isSuccess } = useGetData(meatDataURL, "getMeatData");

  const metaData = data?.data?.data;

  const t = useTranslations("metaData");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenMetaDialog = () => {
    setOpen(true);
  };
  const handleOpenEditMetaDialog = () => {
    setOpenEdit(true);
  };

  return (
    <>
      <TableHeadLayout>
        <Heading title={t("title")} />
        {!metaData && isSuccess && (
          <AddButton handleAddDialog={handleOpenMetaDialog} />
        )}
        {metaData && isSuccess && (
          <Button
            className="bg-mainColor hover:bg-mainColor"
            onClick={handleOpenEditMetaDialog}
          >
            {t("edit")}
          </Button>
        )}
      </TableHeadLayout>
      {open && <AddDialog open={open} onOpenChange={setOpen} />}
      {openEdit && (
        <EditDialog
          open={openEdit}
          onOpenChange={setOpenEdit}
          metaData={metaData}
        />
      )}
    </>
  );
};

export default MetaData;
