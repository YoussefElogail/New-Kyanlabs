import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";

type AuthCardProps = {
  title: string;
  label: string;
  footerLabel: string;
  textLink: string;
  link: string;
  type?: string;
  children: React.ReactNode;
};

export default function AuthCard({
  title,
  label,
  footerLabel,
  textLink,
  link,
  type,
  children,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{label}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {!type && (
        <CardFooter className="flex flex-col space-y-4">
        <p className="text-sm text-center">
          {footerLabel}
          <Link
            href={link}
            className="ml-1 text-primary hover:underline focus:outline-none"
          >
            {textLink}
          </Link>
        </p>
      </CardFooter>
      )}
    </Card>
  );
}
