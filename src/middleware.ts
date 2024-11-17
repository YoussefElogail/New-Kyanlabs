import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { IUser } from './types/types';

export default function middleware(req: NextRequest) {
  // Get the token from the cookies
  const token = req.cookies.get("token");
  const userData: IUser = req.cookies.get("userData")?.value ? JSON.parse(req.cookies.get("userData")?.value || "") : {};

  const url = req.nextUrl.clone();
  const { pathname } = url;

  // Check if the language is Arabic or English
  const isArabic = pathname.startsWith('/ar');
  const isEnglish = pathname.startsWith('/en');

  // Check if the user is trying to access "sign-in" or "sign-up" pages
  const isSignInOrSignUp = pathname.includes('/sign-in') || pathname.includes('/sign-up');

  // Check if the user is trying to access "profile" or "dashboard" pages
  const isProfileOrDashboard = pathname.includes('/profile') || pathname.includes('/dashboard');

  // Check if the user is trying to access the "projects" route or any sub-route
  const isProjectsPath = pathname.includes('/projects');

  // Redirect authenticated users from "sign-in" or "sign-up" pages to the homepage
  if (token && isSignInOrSignUp) {
    url.pathname = isArabic ? '/ar' : isEnglish ? '/en' : '/';
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users trying to access "profile" or "dashboard" pages to "sign-in"
  if (!token && isProfileOrDashboard) {
    url.pathname = isArabic ? '/ar/sign-in' : isEnglish ? '/en/sign-in' : '/sign-in';
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users trying to access "projects" or any sub-route to "sign-in"
  if (!token && isProjectsPath) {
    url.pathname = isArabic ? '/ar/sign-in' : isEnglish ? '/en/sign-in' : '/sign-in';
    return NextResponse.redirect(url);
  }

  // Redirect non-admin users trying to access the "dashboard" to the homepage
  if (pathname.includes('/dashboard') && userData?.type !== 'admin') {
    url.pathname = isArabic ? '/ar' : isEnglish ? '/en' : '/';
    return NextResponse.redirect(url);
  }

  // Continue with middleware processing for other cases
  return createMiddleware(routing)(req);
}

// Configure matcher for the middleware to support internationalized paths
export const config = {
  matcher: ["/", "/(en|ar)/:path*"], // Support internationalized routes for Arabic and English
};
