import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SharedCard from "../../SharedCard";
import { IProjects } from "@/types/types";
import { getProjects } from "@/APIS/fetch-functions";
import { cookies } from "next/headers";



export default async function ProjectsCarousel() {

const cookieStore =  cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value ;

  const ProjectsData: IProjects[] = await getProjects(lang);


  return (
   <>
    <Carousel
      opts={{
        align: "start",
        direction: lang === "ar" ?"rtl": "ltr",
      loop: true,
      
      }}
      
      className="md:w-full w-4/5  mx-auto direction-reverse"
    >
      <CarouselContent >
        {ProjectsData?.map((project) => (
          <CarouselItem
            key={project.id}
            className=" md:basis-1/2  xl:basis-1/3 2xl:basis-1/4"
          >
            <div className="p-1">
              <SharedCard
                cardType="product"
                image={project.image}
                description={project.description}
                title={project.title}
                id={project.id}
                link={project.link}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
   </>
  );
}
