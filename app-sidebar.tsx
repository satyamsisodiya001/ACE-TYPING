"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  BotMessageSquare,
  GraduationCap,
  Keyboard,
} from "lucide-react";
import Logo from "./logo";
import { Separator } from "../ui/separator";

const menuItems = [
  {
    href: "/",
    label: "Practice",
    icon: Keyboard,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: BarChart3,
  },
  {
    href: "/lessons",
    label: "AI Lessons",
    icon: BotMessageSquare,
  },
  {
    href: "/tutor",
    label: "Tutor",
    icon: GraduationCap,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <Separator className="bg-sidebar-border" />
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
