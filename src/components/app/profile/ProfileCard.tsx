import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabsProfileContent from "@/components/app/profile/TabsProfileContent";

const ProfileCard = async ({
  tabsArr,
}: {
  tabsArr: {
    label: string;
    icon: React.ReactNode;
  }[];
}) => {



  return (
    <Card
      className="w-full max-w-xl mx-auto mt-6"
      
    >
      <CardContent>
        <Tabs defaultValue="show" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            {tabsArr.map((tab, i) => (
              <TabsTrigger
                value={tab.label}
                className="data-[state=active]:bg-[#2bbaa5] data-[state=active]:text-white"
                key={i}
              >
                {tab.icon}
                <span className="hidden sm:block uppercase">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsProfileContent />
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
