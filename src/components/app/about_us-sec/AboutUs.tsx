import React from "react";
import SectionTitleDis from "../../SectionTitleDis";
import { useTranslations } from "next-intl";

export default function AboutUs({lang}:{lang:string | undefined}) {
  const t = useTranslations("HomePage.AboutSec");

  return (
      <section className="relative md:grid md:grid-cols-8  w-full " id="about">
          <div className="col-span-5 bg-slate-500 p-10">
              <SectionTitleDis
                  title={t("title")}
                  subtitle={t("description")}
                  classN="second-section-title-dis"
              />
          </div>
          <div className="col-start-7 col-end-9  bg-[url('/images/logo/logo.png')] bg-no-repeat bg-contain mx-1"></div>

          <div className={`absolute w-7/12 top-full h-[500px] inset-0 bg-mainColor opacity-15 clip-triangle  rotate-180 ${lang === "ar" &&"-scale-x-100"  }`}
               style={{clipPath: "polygon(100% 0, 0 100%, 100% 100%)"}}/>

      </section>
  );
}
