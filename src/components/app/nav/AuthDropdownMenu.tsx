"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { UserRound, LogOut, LogIn } from "lucide-react"
import Cookies from "js-cookie"
import { useRouter } from 'next/navigation'
import { useTranslations } from "next-intl"
import { IUser } from "@/types/types"

export default function AuthDropdownMenu() {
  const [userData, setUserData] = useState<IUser | null>()
  const router = useRouter()
  const t = useTranslations("HomePage.navbar.auth")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserData =async () => {
      try {
        const userDataCookie = Cookies.get("userData");
        if (userDataCookie) {
          const parsedUserData =await JSON.parse(userDataCookie);
          setUserData(parsedUserData);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
        setUserData(null);
      }
    };
    
    checkUserData();
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'userData') {
        checkUserData();
      }
    };
    

    setTimeout(() => {
      if(loading){
        setLoading(false)  // Stop loading spinner after 2 seconds when userData is available or after checking for changes in userData storage
      }
  },1000)

    window.addEventListener('storage', handleStorageChange);

    // Set up an interval to check for userData changes
    const interval = setInterval(checkUserData, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);


  const handleLogout = () => {
    Cookies.remove("userData")
    Cookies.remove("token")
    setUserData(null)
    router.push('/')  // Redirect to home page after logout
    // Trigger storage event for other tabs
    window.localStorage.setItem('logout-event', Date.now().toString())
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        
          {
            loading ? null : <Button
            aria-label="authentication"
            variant="outline"
            className="rounded-full border-2 border-white/50 bg-transparent hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/20 transition-all duration-200"
          >
            {
              userData ? <UserRound color="#fff" /> : <LogIn color="#fff" />
            }
            </Button> 
          }
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {userData ? (
          <>
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{userData.username}</p>
              <p className="text-xs text-gray-500 truncate">{userData.email}</p>
            </div>
            <DropdownMenuItem
              className="px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ease-in-out text-gray-700 hover:bg-gray-100"
            >
              <Link href={`/profile`} className="block w-full h-full">
                {t("profile")}
              </Link>
            </DropdownMenuItem>
            {userData?.type !== "admin" && (<DropdownMenuItem
              className="px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ease-in-out text-gray-700 hover:bg-gray-100"
            >
              <Link href={`/projects`} className="block w-full h-full">
                {t("projects")}
              </Link>
            </DropdownMenuItem>)}
            <DropdownMenuItem
              className="px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ease-in-out text-gray-700 hover:bg-gray-100"
              onSelect={handleLogout}
            >
              <span className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                {t("sign out")}
              </span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              className="px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ease-in-out text-gray-700 hover:bg-gray-100"
            >
              <Link href="/sign-in" className="block w-full h-full">
                {t("sign in")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ease-in-out text-gray-700 hover:bg-gray-100"
            >
              <Link href="/sign-up" className="block w-full h-full">
                {t("sign up")}
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}