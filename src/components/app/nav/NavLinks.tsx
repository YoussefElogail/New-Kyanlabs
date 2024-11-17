

import { Link } from "@/i18n/routing";
import { INavLinks } from "@/types/types";
import React from "react";



export default function NavLinks({links}:{links:INavLinks[]}) {
  return (
    <>
      {links.map((link) => (
        <li key={link.label} className={`font-bold text-black`}>
          <Link href={link.url}>{link.label.toUpperCase()}</Link>
        </li>
      ))}
    </>
  );
}
