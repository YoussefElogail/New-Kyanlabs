import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "./ui/button";

export default function HeroSection({lang}:{lang:string}) {
  const t = useTranslations("HomePage.HeroSec");

  return (
      <section className=" bg-mainColor h-[80vh] lg:h-[750px] w-full  relative  z-0 ">

          <div className="md:container  h-full relative z-10 -space-x-12">
              <video width="320" height="240" className="hidden xl:block video absolute top-[130px]  w-[45%] h-[520px]" style={{zIndex:"2"}} controls
                     preload="none" autoPlay={true} muted loop={false}>
                  <source src={`/videos/${lang === "ar" ? "ar" : "en"}.mp4`} type="video/mp4"/>
                  <track
                      src="/path/to/captions.vtt"
                      kind="subtitles"
                      srcLang="en"
                      label="English"
                  />
                  Your browser does not support the video tag.
              </video>
              <div className="  h-full relative flex xl:justify-end justify-center items-center px-4 ">
                  <div
                      className={`z-20 top-[24px] w-[600px] bg-white relative  p-10   space-y-4  ${lang === "ar" ? "after:contents-[''] after:w-[100px] after:h-full after:glass-effect after:absolute after:left-full  after:top-0" : "before:contents-[''] before:w-[100px] before:h-full before:glass-effect before:absolute before:right-full  before:top-0"}`}>
                      <h1 className="font-bold text-3xl">{t("title")}</h1>
                      <p className="font-thin md:text-lg">
                          {t("description")}
                      </p>
                      <a href="#services">
                      <Button   className="main-btn absolute -bottom-5   p-4 text-center transform -translate-x-1/2   left-1/2  w-[150px]">
                        see more
                      </Button>
                      </a>
                  </div>
              </div>
          </div>
          <div className="bg-mainColor w-full h-[200px] rotate-6 absolute bottom-0 -right-4"
               style={{zIndex: "-2"}}></div>
      </section>
  );
}
