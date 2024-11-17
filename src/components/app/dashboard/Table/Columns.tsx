/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl"; // Import useTranslations
import Image from "next/image";

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((o, p) => (o ? o[p] : ""), obj);
}

interface BaseData {
  id: string | number;
}

export function hasStatus(obj: any): obj is { status: boolean } {
  return "status" in obj;
}

interface ColumnConfig<T> {
  key: keyof T | string;
  label: string;
}

export function CreateColumns<T extends BaseData>(
  props: ColumnConfig<T>[],
  handleOpenEditDialog?: (row: T) => void,
  handleOpenDeleteDialog?: (row: T) => void,
  handleOpenUserProjectsDialog?: (row: T) => void,
  navigateToProject?: (row: T) => void
): ColumnDef<T>[] {
  const t = useTranslations("Table");

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={t("selectAll")} // Translated
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={t("selectRow")} // Translated
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...props.map((prop) => ({
      id: prop.key as string,
      accessorKey: prop.key as string,
      header: ({ column }: { column: any }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {prop.label} {/* Translated */}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: any }) =>
        prop.key === "image" ? (
          <div className=" border-gray-200 px-3 py-2">
            <Image
              src={
                row.original?.image
                  ? 
                    getNestedValue(row.original, prop.key as string)
                  : "/images/logo/logo.png"
              }
              alt={`Image of ${row.original.name_en}`}
              className="w-16 h-16 object-cover rounded-full"
              width={50}
              height={50}
            />
          </div>
        ) : prop.key === "color" ? (
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: row.original.color }}
            ></div>
            <span>{row.original.color}</span>
          </div>
        ) : (
          <div className="border-r border-gray-200 px-3 py-2">
            {getNestedValue(row.original, prop.key as string)}
          </div>
        ),
    })),
    {
      id: "actions",
      header: () => null,
      enableHiding: false,
      cell: ({ row }) => {
        const rowOriginal = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t("openMenu")}</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {handleOpenDeleteDialog && (
                <Button
                  className="w-full bg-red-700 hover:bg-red-700"
                  onClick={() => handleOpenDeleteDialog?.(rowOriginal)}
                >
                  {t("delete")}
                </Button>
              )}

              <DropdownMenuSeparator />
              {handleOpenEditDialog && (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-600"
                  onClick={() => handleOpenEditDialog?.(rowOriginal)}
                >
                  {t("edit")}
                </Button>
              )}

              <DropdownMenuSeparator />
              {handleOpenUserProjectsDialog && (
                <Button
                  className="w-full bg-green-500 hover:bg-green-500"
                  onClick={() => handleOpenUserProjectsDialog?.(rowOriginal)}
                >
                  {t("showUserProjects")}
                </Button>
              )}
              {navigateToProject && (
                <Button
                  className="w-full bg-mainColor "
                  onClick={() => navigateToProject?.(rowOriginal)}
                >
                  {t("navigateToProject")}
                </Button>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
