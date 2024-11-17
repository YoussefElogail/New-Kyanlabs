"use client";
import { deleteTeam, teams } from "@/APIS/end-point";
import useGetData from "@/custom hooks/useGetData";
import { ITeamData } from "@/types/types";
import { useState } from "react";
import { CreateColumns } from "./Table/Columns";
import { DataTable } from "./Table/DataTable";
import { useTranslations } from "next-intl";
import DeleteDialog from "./Dialogs/DeleteDialog";
import TableHeadLayout from "./Table/TableHeadLayout";
import AddButton from "./Table/AddButton";
import Heading from "./Table/Heading";
import { AddDialog } from "./Dialogs/Teams/AddDialog";
import { EditDialog } from "./Dialogs/Teams/EditDialog";
export default function TeamsTable() {
  const t = useTranslations("Teams");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedData, setSelectedData] = useState<ITeamData>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data } = useGetData(teams, "getTeams", true);
  const teamsData = data?.data.data || [];
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };
  const handleOpenEditDialog = (data: ITeamData) => {
    setSelectedData(data);
    setOpenEdit(true);
  };
  const handleOpenDeleteDialog = (data: ITeamData) => {
    setSelectedData(data);
    setOpenDelete(true);
  };

  const columns = CreateColumns<ITeamData>(
    [
      { key: "id", label: "ID"},
      { key: "name_ar", label: t("name ar") },
      { key: "name_en", label: t("name en") },
      { key: "image", label: t("image") },
      { key: "position_ar", label: t("position ar") },
      { key: "position_en", label: t("position en") },
      { key: "position_en", label: t("position en") },
      { key: "link_facebook", label: t("link facebook") },
      { key: "link_twitter", label: t("link twitter") },
      { key: "link_instagram", label: t("link instagram") },
      { key: "link_linkedin", label: t("link linkedin") },
    ],
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );

  return (
    <>
      <TableHeadLayout>
        <Heading title={t("teams")} />
        <AddButton handleAddDialog={handleOpenAddDialog} />
      </TableHeadLayout>

      {teamsData && (
        <DataTable
          columns={columns}
          data={teamsData}
          filterPlaceholder={t("FilterName")}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalRecords={totalRecords}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}

      <AddDialog open={openAdd} onOpenChange={setOpenAdd} />
      <EditDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        teamMember={selectedData!}
      />
      <DeleteDialog<ITeamData>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData!}
        url={deleteTeam}
        mutationKey="deleteTeam"
        queryKey="getTeams"
      />
    </>
  );
}
