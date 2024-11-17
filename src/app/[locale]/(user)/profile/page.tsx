import React from "react";
import SectionTitleDis from "@/components/SectionTitleDis";
import { Edit, Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import ProfileCard from "@/components/app/profile/ProfileCard";

export default function ProfilePage() {
  const t = useTranslations("profile");

  const tabsArr = [
    {
      label: t("show"),
      icon: <Eye className="h-4 w-4 mr-2" />,
    },
    {
      label: t("edit"),
      icon: <Edit className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <section className="md:container w-full mt-6 " >
      <SectionTitleDis title={t("title")} classN="main-section-title-dis" />
      <ProfileCard tabsArr={tabsArr} />
    </section>
  );
}
