"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Bell,
  BookText,
  Calendar,
  Home,
  MessageCircle,
  Paintbrush,
  Settings,
  UserCheck,
  UserCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SideBarAdmin() {
  const nav = [
    {
      title: "Home",
      icon: Home, // You can keep this, as it's a perfect fit
      href: "/dashboard",
    },

    {
      title: "Induction",
      icon: UserCheck, // More relevant for the Induction section
      href: "/dashboard/inductions",
    },

    {
      title: "Sessions",
      icon: Calendar, // Better represents sessions or events
      href: "/dashboard/induction-sessions",
    },

    {
      title: "Contacts",
      icon: Users, // More appropriate for contacts or groups
      href: "/dashboard/contacts",
    },

    {
      title: "Profile",
      icon: UserCircle, // A more distinct icon for user profile
      href: "/dashboard/profile",
    },
  ];

  const [active, setActive] = React.useState("Home");
  const pathname = usePathname();
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <BookText className="size-4" />
                </div>
                <div className="flex flex-col gap-1 leading-none">
                  <span className="font-semibold">EWEP</span>
                  <span className="">Online Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={pathname === item.href}>
                    <Button
                      variant="ghost"
                      asChild
                      className="w-full justify-start rounded-lg"
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span className="font-normal">{item.title}</span>
                      </Link>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
