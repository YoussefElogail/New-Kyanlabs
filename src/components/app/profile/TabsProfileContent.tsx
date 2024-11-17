"use client";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react";
import ShowData from "./ShowData";
import { IProfileData, IUserSignUp } from "@/types/types";
import Cookies from "js-cookie";
import EditData from "./EditData";
import { useTranslations } from "next-intl";
// import { Button } from "@/components/ui/button";

const TabsProfileContent = () => {
  const t = useTranslations("profile")

  const [userData, setUserData] = useState<IUserSignUp>();
  const userDataCookie = Cookies.get("userData");
  const [submit, setSubmit] = useState(true)

  useEffect(() => {
    if (userDataCookie) {
      const parsedUserData = JSON.parse(userDataCookie);
      setUserData(parsedUserData);
    }
  }, [submit, userDataCookie]);

  const data:IProfileData[] = [
    {
      label: t("name"),
      value: userData?.username  as string,
      registerName: "username"
    },
    {
      label: t("email"),
      value: userData?.email as string,
      registerName: "email"
    },
    {
      label: t("phone"),
      value: userData?.phone  as string,
      registerName: "phone"

    },
  ];

  return (
    <>
      <TabsContent value={t("show")}>
        <div className="space-y-4 mt-6">
          <ShowData data={data} />
        </div>
      </TabsContent>

      <TabsContent value={t("edit")}>
        <EditData data={data} setSubmit={setSubmit} />
      </TabsContent>
      
    </>
  );
};

export default TabsProfileContent;
