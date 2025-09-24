import React, { ReactNode } from "react";

interface SlideItemProps {
  onClick: () => void;
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
      onClick={() => onClick()}
      className={`border cursor-pointer transition-colors ${
        isActive ? "bg-accent border-amber-500 border-1" : "hover:bg-accent/50"
      }`}
    >
      {children}
    </div>
  );
}
