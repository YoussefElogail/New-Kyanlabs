"use client";

import { IUserProject } from "@/types/types";
import DialogLayout from "../DialogLayout";
import { CreateColumns } from "../../Table/Columns";
import { useTranslations } from "next-intl";
import { DataTable } from "../../Table/DataTable";
import { useState } from "react";
import TableHeadLayout from "../../Table/TableHeadLayout";
import Heading from "../../Table/Heading";
import { useRouter } from "@/i18n/routing";

export function UserProjectsDialog({
  open,
  onOpenChange,
  userProjectsData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userProjectsData: IUserProject[];
}) {
  const t = useTranslations("userProject");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter()

  const totalPages = 1;
  const totalRecords = 0;
  const navigateToProject = (userProject: IUserProject)=>{
    router.push(`/projects/project/${userProject.id}?userId=${userProject.user_id}`)
  }
  const columns = CreateColumns<IUserProject>(
    [
      { key: "id", label: "ID" },
      { key: "title", label: t("title") },
      { key: "details", label: t("details") },
      { key: "user_id", label: t("user_id") },
      { key: "status", label: t("status") },
    ],
    undefined,
    undefined,
    navigateToProject
  );
  return (
    <DialogLayout open={open} onOpenChange={onOpenChange}>
      <TableHeadLayout>
        <Heading title={t("userProjects")} />
      </TableHeadLayout>
      <DataTable
        columns={columns}
        data={userProjectsData}
        filterPlaceholder={t("FilterName")}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        totalRecords={totalRecords}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </DialogLayout>
  );
}
