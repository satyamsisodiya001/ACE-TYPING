"use client";
import React from "react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const titles: { [key: string]: string } = {
  "/": "Practice",
  "/dashboard": "Dashboard",
  "/lessons": "Personalized Lessons",
  "/tutor": "Typing Tutor",
};

export default function AppHeader() {
  const pathname = usePathname();
  const pageTitle = titles[pathname] || "Type Ace";

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-xl font-semibold hidden md:block">
          {pageTitle}
        </h1>
      </div>
      <div className="flex items-center gap-2">
       
      </div>
    </header>
  );
}
