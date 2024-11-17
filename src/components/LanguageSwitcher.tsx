import React from 'react'
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const changeLocale = (newLocale: "ar" | "en") => {
        const newUrl = `${pathname}?${searchParams.toString()}`;
        router.replace(newUrl, { locale: newLocale });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="outline" 
      
                    className=" rounded-full border-2 border-white/50 bg-transparent hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/20 transition-all duration-200"
                >
                    <Globe className=" text-white" />
                    <span className="sr-only">Language Switcher</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align="end" 
                className="w-40 rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                <DropdownMenuItem
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ease-in-out ${
                        locale === "en" 
                            ? "bg-black text-white hover:bg-primary/90 " 
                            : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => changeLocale("en")}
                >
                    <Link
                        href={`/?${searchParams.toString()}`}
                        locale="en"
                        className="block w-full h-full"
                    >
                        English
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ease-in-out ${
                        locale === "ar" 
                            ? "bg-black text-white hover:bg-primary/90" 
                            : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => changeLocale("ar")}
                >
                    <Link
                        href={`/?${searchParams.toString()}`}
                        locale="ar"
                        className="block w-full h-full"
                    >
                        عربي
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}