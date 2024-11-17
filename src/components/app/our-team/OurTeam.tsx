import React, { Suspense } from "react";
import SectionTitleDis from "../../SectionTitleDis";
import CircleSpinner from "../../Spanner";
import TeamData from "./TeamData";
import { useTranslations } from "next-intl";

export default function OurTeam() {
  const t = useTranslations("HomePage.OurTeamSec");

  return (
    <section className="container">
      <div className=" flex flex-col gap-12">
        <SectionTitleDis
          title={t("title")}
          subtitle={t("description")}
          classN="main-section-title-dis"
        />
        <Suspense fallback={<CircleSpinner />}>
          <TeamData />
        </Suspense>
      </div>
    </section>
  );
}
