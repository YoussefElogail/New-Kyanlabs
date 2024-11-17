import React, { Suspense } from "react";
import SectionTitleDis from "../../SectionTitleDis";
import ProjectsCarousel from "./ProjectsCarousel";
import CircleSpinner from "../../Spanner";
import { useTranslations } from "next-intl";



export default function OurProject() {
  const t = useTranslations("HomePage.ProjectsSec");
  return (
    <section id="project" className=" w-5/6 flex flex-col md:flex-row  md:items-center  gap-10 mx-10 ">
      <SectionTitleDis
        title={t("title")}
        subtitle={t("description")}
        classN="main-section-title-dis"
      />

      <Suspense fallback={<CircleSpinner />}>
      <div className="md:container">
      <ProjectsCarousel  />
      </div>
      </Suspense>
    </section>
  );
}
