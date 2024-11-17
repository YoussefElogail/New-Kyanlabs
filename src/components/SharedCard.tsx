"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { ICardData } from "@/types/types";
import TeamLinks from "./app/our-team/TeamLinks";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function SharedCard({
  id,
  link,
  cardType,
  description,
  image,
  name,
  position,
  title,
  link_facebook,
  link_instagram,
  link_linkedin,
  link_twitter,
}: ICardData) {
  const t = useTranslations("SharedCard");
  return (
    <Card
      className={`h-auto overflow-hidden flex flex-col justify-end relative group transition duration-500`}
    >
        <Image
          src={image ? `${image}` : "/images/logo/logo.png"}
          alt={title || name || "Project image"}
          width={1000}
          height={1000}
          className="w-96 h-80 mx-auto object-cover"
        />

      <div className="md:h-[60%] w-full mob-glass-effect-carousel md:glass-effect-carousel mx-auto absolute md:-bottom-[100%] group-hover:bottom-0 bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out">
        <CardHeader className="text-center">
          <CardTitle className="text-black">{name || title}</CardTitle>
          <CardDescription className="text-black">
            {description ? `${description?.slice(0, 40)}......` : position}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          {cardType === "team" && (
            <TeamLinks
              {...{
                link_facebook,
                link_instagram,
                link_linkedin,
                link_twitter,
              }}
            />
          )}
          {cardType === "product" && (
            <div className="flex justify-between gap-2">
              <Button variant="default" className="main-btn">
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`View live preview of ${title}`}
                >
                  {t("Live Preview")}
                </a>
              </Button>
              <Button variant="default" className="main-btn">
                <Link 
                  href={`/project-company/${id}`}
                  aria-label={`View details of ${title}`}
                >
                  {t("Details")}
                </Link>
              </Button>
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
