import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const Replays = () => {
  return (
    <div className=" px-8 py-4 border-dashed border-t-2 border-secondColor flex flex-col gap-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            {" "}
            <span>Replays:</span>
          </AccordionTrigger>
          <AccordionContent className=" flex flex-col  gap-1">
            <div className="border rounded-sm px-4 py-2">
            <span>Replay #1</span>
              <p className="px-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                illo necessitatibus odit cupiditate libero, qui, illum similique
                ea modi, obcaecati quas suscipit eius aliquam aperiam quam! A
                reiciendis quas aut?
              </p>
            </div>
            <div className="border rounded-sm px-4 py-2">
            <span>Replay #1</span>
              <p className="px-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                illo necessitatibus odit cupiditate libero, qui, illum similique
                ea modi, obcaecati quas suscipit eius aliquam aperiam quam! A
                reiciendis quas aut?
              </p>
            </div>
           
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Replays;
