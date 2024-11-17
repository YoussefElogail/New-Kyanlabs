"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IUserProject } from "@/types/types";
import { Link } from "@/i18n/routing";
import CircleSpinner from "@/components/Spanner";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import EditUserProject from "./EditUserProject";
import DeleteUserProject from "./DeleteUserProject";

type ShowAllProjectsProps = {
  data: IUserProject[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

export default function ShowAllProjects({
  data,
  isLoading,
  isError,
}: ShowAllProjectsProps) {
  const t = useTranslations("userProjects");
  const allUserProjectsData = data;
  const lang = Cookies.get("NEXT_LOCALE");

  if (isLoading) {
    return <CircleSpinner />;
  }

  return (
    <Card dir={lang === "en" ? "ltr" : "rtl"}>
      <CardHeader>
        <CardTitle>{t("AllProjectRequests")}</CardTitle>
        <CardDescription>{t("ViewAllRequests")}</CardDescription>
      </CardHeader>
      <CardContent>
        {isError || !allUserProjectsData ? (
          <p>{t("NoProjectRequests")}</p>
        ) : (
          <div className="grid gap-4">
            {allUserProjectsData?.map((project) => (
              <Card
                key={project.id}
                className="hover:scale-95 transition duration-300 flex flex-wrap"
              >
                <div className="flex-grow-[1] ">


                <Link
                  href={`/projects/project/${project?.id}`}
                  key={project.id}
                >
                  <CardHeader >
                    <CardTitle className="flex items-center">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{project.details}</p>
                  </CardContent>
                </Link>
                </div>

              
                  <CardFooter className="">
                    <EditUserProject userProjectData={project} />
                    <DeleteUserProject userProjectData={project} />
                  </CardFooter>
                
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
