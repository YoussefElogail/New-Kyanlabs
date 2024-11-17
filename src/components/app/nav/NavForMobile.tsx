import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { INavLinks } from "@/types/types";

export default function NavForMobile({ open, setOpen, links }:{ open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> , links: INavLinks[] }) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          {links.map((link) => {
            const isActive = pathname === link.url;
            return (
              <Link
                key={link.label}
                href={link.url}
                onClick={() => setOpen(false)}
                className={`${
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                } hover:text-primary transition-colors text-lg capitalize`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
