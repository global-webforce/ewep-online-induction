"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface SlideScrollableListProps {
  children: ReactNode;
}

export function SlideScrollableList({ children }: SlideScrollableListProps) {
  return (
    <TooltipProvider>
      <div className="overflow-y-auto max-h-[700] border-b-1">
        <div className="space-y-3 p-3">{children}</div>
      </div>
    </TooltipProvider>
  );
}
