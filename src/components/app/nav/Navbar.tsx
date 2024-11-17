"use client";

import React, { useState, useEffect } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { Menu } from "lucide-react";
import { Button } from "../../ui/button";
import NavForMobile from "./NavForMobile";
import { Link } from "@/i18n/routing";
import AuthDropdownMenu from "./AuthDropdownMenu";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("HomePage.navbar");

  const links = [
    {
      label: t("Home"),
      url: "/",
    },
    {
      label: t("Services"),
      url: "/#services",
    },
    {
      label: t("Projects"),
      url: "/#project",
    },
    {
      label: t("About"),
      url: "/#about",
    },
    {
      label: t("Contact"),
      url: "/#contact",
    },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300  ${
          scrolled
            ? "bg-[rgba(175,190,197,0.5)] shadow-lg backdrop-blur rounded-b-lg   "
            : "bg-slate-300"
        }`}
      >
        <nav
          className={`container flex justify-between items-center p-2 transition-all duration-300`}
        >
          <Link href="/" className="flex flex-col items-center">
            <Image
              src="/images/logo/logo no name.png"
              height={scrolled ? 60 : 80}
              width={scrolled ? 60 : 80}
              alt="kyanLaps logo"
              className="transition-all duration-300"
            />
            {!scrolled && (
              <div
                className={`text-white font-bold text-center capitalize ${
                  scrolled ? "text-sm" : "text-base"
                } transition-all duration-300`}
              >
                kyanlabs
              </div>
            )}
          </Link>
          <ul className="md:flex grow justify-center gap-10 hidden">
            <NavLinks links={links} />
          </ul>
          <div className="flex gap-4 justify-center items-center">
            <LanguageSwitcher />

            <AuthDropdownMenu />
            <Button className="md:hidden" onClick={toggleMenu}>
              <Menu color="#fff" />
            </Button>
          </div>
          {open && <NavForMobile open={open} setOpen={setOpen} links={links} />}
        </nav>
      </header>
    </>
  );
}
