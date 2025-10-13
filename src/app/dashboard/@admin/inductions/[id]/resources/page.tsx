"use client";
import { BackButton } from "@/components/custom/back-button";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SlideBuilder from "@/features/super-admin/induction-resources/slide-builder";

export default function Page() {
  return (
    <div className="space-y-4 h-full flex flex-col ">
      <header className="flex gap-4 align-middle items-center mb-4">
        <div className="space-x-2">
          <Button asChild variant="outline" size="icon">
            <SidebarTrigger />
          </Button>
          <BackButton />
        </div>
        <h1 className="text-xl font-semibold">Manage Induction Resources</h1>
      </header>

      <SlideBuilder />
    </div>
  );
}
