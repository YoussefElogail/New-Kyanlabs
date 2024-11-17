import OurServices from "@/components/app/services-sec/OurServices";
import OurProject from "@/components/app/projects-sec/OurProject";
import AboutUs from "@/components/app/about_us-sec/AboutUs";
import OurTeam from "@/components/app/our-team/OurTeam";
import ContactUs from "@/components/app/contact-us/ContactUs";
import HeroSection from "@/components/HeroSection";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getMetaData } from "@/APIS/fetch-functions";
import { IUserMetaData } from "@/types/types";
import { cookies } from "next/headers";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const metaData: IUserMetaData = await getMetaData(locale);
  return {
    title: metaData?.meta_title,
    description: metaData?.meta_description,
    keywords: metaData?.meta_keywords,
  };
};

export default async function Home() {
  const cookieStore = await cookies()
  const lang = cookieStore.get('NEXT_LOCALE')?.value

  return (
    <>
    <main className="  md:max-w-[2000px] mx-auto flex flex-col justify-start items-start	gap-32 mb-32   relative overflow-hidden">
    <HeroSection lang={lang!} />
      <div className="hidden md:block h-52 w-40 fixed top-20 left-2 -z-10 bg-[url('/images/cross-deco-light.png')] bg-cover bg-no-repeat  ">
        
      </div>

      <OurServices />
      <OurProject />
      <AboutUs lang={lang} />
      <OurTeam />
      <ContactUs />
    </main>
    </>
  );
}
