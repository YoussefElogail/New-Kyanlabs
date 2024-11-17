"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateProject from "./CreateProject"
import ShowAllProjects from "./ShowAllProjects"
import useGetData from "@/custom hooks/useGetData"
import { allUserProjects } from "@/APIS/end-point"
import { useTranslations } from "next-intl"

export default function ProjectsWrapper() {
  const t = useTranslations("userProjects")
  const { data, isLoading, isError } = useGetData(
    allUserProjects,
    "allUserProjects"
  )


  return (
    <section className="w-full mx-auto my-6 px-4">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="create"
            className="data-[state=active]:bg-[#2bbaa5] data-[state=active]:text-white"
          >
            {t("createTitle")}
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[#2bbaa5] data-[state=active]:text-white"
          >
            {t("All Requests")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreateProject />
        </TabsContent>
        <TabsContent value="all">
          <ShowAllProjects
            data={data?.data?.data}
            isLoading={isLoading}
            isError={isError}
          />
        </TabsContent>
      </Tabs>
    </section>
  )
}