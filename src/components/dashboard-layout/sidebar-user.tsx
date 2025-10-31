"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SignOutForm from "@/features/auth/sign-out/form";
import { BookText, Calendar, Home, UserCheck, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBarUser() {
  const nav = [
    {
      title: "Home",
      icon: Home, // You can keep this, as it's a perfect fit
      href: "/dashboard",
    },

    {
      title: "Courses",
      icon: UserCheck, // More relevant for the Induction section
      href: "/dashboard/courses",
    },

    {
      title: "Sessions",
      icon: Calendar, // Better represents sessions or events
      href: "/dashboard/course-sessions",
    },

    {
      title: "Profile",
      icon: UserCircle, // A more distinct icon for user profile
      href: "/dashboard/profile",
    },
  ];

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
                  <span className="font-semibold">
                    {process.env.NEXT_PUBLIC_APP_NAME_ABBREV}
                  </span>
                  <span className="">User Portal</span>
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
      <SidebarFooter>
        <SignOutForm />
      </SidebarFooter>
    </Sidebar>
  );
}
