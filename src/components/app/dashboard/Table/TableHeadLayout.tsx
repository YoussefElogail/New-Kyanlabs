import { ReactNode } from "react";

export default function TableHeadLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" ">
      <div className="relative  w-full  items-center overflow-hidden rounded-lg border bg-background md:shadow-xl flex justify-between align-items-center my-2 p-4">
        {children}
      </div>
    </div>
  );
}
