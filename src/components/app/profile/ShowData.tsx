"use client"
import { IProfileData } from "@/types/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";
import Cookies from "js-cookie";

export default function ShowData({ data }: {data: IProfileData[]} ) {
  const lang = Cookies.get("NEXT_LOCALE");


  return (
    <>
      {data.map((item, i) => (
        <div className="mb-4" key={i} dir={lang === "en" ? "ltr" : "rtl"}>
          <Label className="block text-lg font-bold text-gray-800 mb-2">
            {item.label}
          </Label>
          <p className="text-lg">{item.value}</p>
        </div>
      ))}
    </>
  );
}
