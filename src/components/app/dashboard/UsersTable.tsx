/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import { deleteUser, getUsers } from "@/APIS/end-point";
import useGetData from "@/custom hooks/useGetData";
import { IUser } from "@/types/types";
import { useState } from "react";
import { CreateColumns } from "./Table/Columns";
import { DataTable } from "./Table/DataTable";
import { useTranslations } from "next-intl";
import DeleteDialog from "./Dialogs/DeleteDialog";
import TableHeadLayout from "./Table/TableHeadLayout";
import Heading from "./Table/Heading";
import { UserProjectsDialog } from "./Dialogs/Projects/UserProjectsDialog";
export default function UsersTable() {
  const t = useTranslations("Users");
  const [openDelete, setOpenDelete] = useState(false);
  const [openUserProjects, setOpenUserProjects] = useState(false);
  const [selectedData, setSelectedData] = useState<IUser>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data } = useGetData(getUsers, "getUsers", true, page, pageSize);
  const usersData = data?.data.data || [];
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;
  const handleOpenDeleteDialog = (data: IUser) => {
    setSelectedData(data);
    setOpenDelete(true);
  };
  const handleOpenUserProjectsDialog = (data: IUser) => {
    setSelectedData(data);
    setOpenUserProjects(true);
  };
  const columns = CreateColumns<IUser>(
    [
      { key: "id", label: "ID" },
      { key: "username", label: t("username") },
      { key: "phone", label: t("phone") },
      { key: "email", label: t("email") },
    ],
    undefined,
    handleOpenDeleteDialog,
    handleOpenUserProjectsDialog
  );

  return (
    <>
      <TableHeadLayout>
        <Heading title={t("users")} />
      </TableHeadLayout>

      {usersData && (
        <DataTable
          columns={columns}
          data={usersData}
          filterPlaceholder={t("FilterName")}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalRecords={totalRecords}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}

      <DeleteDialog<IUser>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData!}
        url={deleteUser}
        mutationKey="deleteUser"
        queryKey="getUsers"
      />
      <UserProjectsDialog
        open={openUserProjects}
        onOpenChange={setOpenUserProjects}
        userProjectsData={selectedData?.projects!}
      />
    </>
  );
}
