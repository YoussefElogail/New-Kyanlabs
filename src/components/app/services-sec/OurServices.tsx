import React from "react";
import SectionTitleDis from "../../SectionTitleDis";
import Services from "./Services";
import { useTranslations } from "next-intl";
import { Code, PenTool, Volume2 } from "lucide-react";

const ServicesData = [
  {
    icon: <PenTool size={48} color="#2bbaa5" />,
    title: "Design",
    description:
      "Design description",
  
  },
  {
    icon: <Code size={48} color="#2bbaa5" />,
    title: "Devolopment",
    description:
      "Devolopment description",
},
  {
    icon: <Volume2 size={48} color="#2bbaa5" />,
    title: "Digital Marketing",
    description:"Digital Marketing description"
  },
];

export default function OurServices() {
  const t = useTranslations("HomePage.ServicesSec");

  return (
    <section id="services" className="container flex flex-col gap-10 ">
      <SectionTitleDis
        title={t("title")}
        subtitle={t("subtitle")}
        classN="main-section-title-dis"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ServicesData.map((service,i) => (
          <Services
            key={i}
            icon={service.icon}
            title={t(`${service.title}`)}
            dic={t(`${service.description}`)}
          />
        ))}
      </div>
    </section>
  );
}
