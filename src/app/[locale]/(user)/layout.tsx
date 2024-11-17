"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main className="container mx-auto mt-20 p-6 min-h-[calc(100vh-(95px+352px))] flex flex-col justify-start items-start	gap-32 mb-32   relative overflow-hidden">
          {children}
        </main>
      </QueryClientProvider>
    </>
  );
}
