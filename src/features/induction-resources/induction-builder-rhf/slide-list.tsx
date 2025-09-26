"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface SlideScrollableListProps {
  children: ReactNode;
}

export function SlideScrollableList({ children }: SlideScrollableListProps) {
  return (
    <TooltipProvider>
      <div className=" overflow-auto min-h-96 max-h-[600] border-1">
        <div className="space-y-3 p-3">{children}</div>
      </div>
    </TooltipProvider>
  );
}
