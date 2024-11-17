"use client";
import { deleteProject, projects } from "@/APIS/end-point";
import useGetData from "@/custom hooks/useGetData";
import { IProjectsData } from "@/types/types";
import { useState } from "react";
import { CreateColumns } from "./Table/Columns";
import { DataTable } from "./Table/DataTable";
import { useTranslations } from "next-intl";
import DeleteDialog from "./Dialogs/DeleteDialog";
import TableHeadLayout from "./Table/TableHeadLayout";
import AddButton from "./Table/AddButton";
import Heading from "./Table/Heading";
import { AddDialog } from "./Dialogs/Projects/AddDialog";
import { EditDialog } from "./Dialogs/Projects/EditDialog";
export default function ProjectTable() {
  const t = useTranslations("Project");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedData, setSelectedData] = useState<IProjectsData>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data } = useGetData(projects, "getProjects", true);
  const projectsData = data?.data.data || [];
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };
  const handleOpenEditDialog = (data: IProjectsData) => {
    setSelectedData(data);
    setOpenEdit(true);
  };
  const handleOpenDeleteDialog = (data: IProjectsData) => {
    setSelectedData(data);
    setOpenDelete(true);
  };

  const columns = CreateColumns<IProjectsData>(
    [
      { key: "id", label: "ID" },
      { key: "title_ar", label: t("title_ar") },
      { key: "title_en", label: t("title_en") },
      { key: "image", label: t("image") },
      { key: "description_ar", label: t("description_ar") },
      { key: "description_en", label: t("description_en") },
      { key: "link", label: t("link") },
    ],
    handleOpenEditDialog,
    handleOpenDeleteDialog,
  );

  return (
    <>
      <TableHeadLayout>
        <Heading title={t("projects")} />
        <AddButton handleAddDialog={handleOpenAddDialog} />
      </TableHeadLayout>

      {projectsData && (
        <DataTable
          columns={columns}
          data={projectsData}
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
        projectsData={selectedData!}
      />
      <DeleteDialog<IProjectsData>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData!}
        url={deleteProject}
        mutationKey="deleteProject"
        queryKey="getProjects"
      />
 
    </>
  );
}
