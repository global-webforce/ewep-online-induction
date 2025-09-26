import React, { ReactNode } from "react";
import { MouseEvent } from "react";
interface SlideItemProps {
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  isActive: boolean;
  children: ReactNode;
}

export default function SlideItem({
  onClick,
  isActive = false,
  children,
}: SlideItemProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={`border cursor-pointer transition-colors ${
        isActive ? "bg-accent border-amber-500 border-1" : "hover:bg-accent/50"
      }`}
    >
      {children}
    </div>
  );
}
