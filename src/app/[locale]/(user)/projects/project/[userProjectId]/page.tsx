"use client";

import { showAdminProjectReports, showUserProjectReports } from "@/APIS/end-point";
import useGetData from "@/custom hooks/useGetData";
import React, { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, ClockIcon } from "lucide-react";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import Cookies from "js-cookie";
import { IUser, IUserProjectReports } from "@/types/types";
import CircleSpinner from "@/components/Spanner";
import { formatDate } from "@/utils/formatDate";
import ReportCard from "@/components/app/user-Projects/reports/ReportCard";
import AddReport from "@/components/app/user-Projects/reports/Dialogs/AddReport";

interface ProjectData {
  id: number;
  title: string;
  details: string;
  user_id: number;
  status: "active" | "inactive";
  created_at: Date;
  updated_at: Date;
  reports: IUserProjectReports[]
}

export default function ProjectPage({
  params: { userProjectId },
}: {
  params: { userProjectId: number };
}) {
  const router = useRouter();
  const userData: IUser = Cookies.get("userData")
    ? JSON.parse(Cookies.get("userData") || "")
    : {};
    const isAdmin = userData.type === "admin"
    
  const { data, isLoading, error } = useGetData(
    `${
      isAdmin
        ? showAdminProjectReports +
          // SearchParams.get("userId") +
          // "/" +
          userProjectId
        : showUserProjectReports + userProjectId
    }`,
    "getReports"
  );

  // const reports = useGetData(
  //   `${
  //     isAdmin
  //       ? showUserProjectInAdmin +
  //         SearchParams.get("userId") +
  //         "/" +
  //         userProjectId
  //       : showUserProject + userProjectId
  //   }`,
  //   "getReports"
  // );



  const t = useTranslations("userProject");

  const projectData: ProjectData | undefined = data?.data?.data;
  const reportsData:IUserProjectReports[] | undefined  = projectData?.reports;

  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    focusRef.current?.focus();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <CircleSpinner />
      </div>
    );
  }

  if (error) {
    router.replace("/");
  }

  if (!projectData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{t("NoProjectData")}</p>
      </div>
    );
  }



  return (
    <section className="container mx-auto px-4 py-8 ">
      <Card className="w-full max-w-3xl" ref={focusRef}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">
                {projectData.title}
              </CardTitle>
            </div>
            {/* <Badge
              variant={
                projectData.status === "active" ? "default" : "secondary"
              }
            >
              {projectData.status}
            </Badge> */}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("details")}:</h3>
            <p className="text-gray-700 break-words">{projectData.details}</p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{t("created")}: {formatDate(projectData.created_at)}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4" />
              <span>{t("lastUpdated")}: {formatDate(projectData.updated_at)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      {isAdmin && <AddReport/>}
      {reportsData?.map(
        (reportData, index) => {
          const data =  {...reportData,ReportNumber: index + 1,isAdmin}
          return(
              <ReportCard
                key={index}
                reportData={data}
              />
            )
          
        }
      )}
    </section>
  );
}
