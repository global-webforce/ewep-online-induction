import React, { ReactNode } from "react";

interface ActionBarProps {
  isActive: boolean;
  children: ReactNode;
}

export default function ActionBar({ isActive, children }: ActionBarProps) {
  return (
    <div
      className={`flex justify-between items-center  text-white border-t-neutral-700 border-t-1 ${
        isActive ? "bg-background" : "bg-background/50"
      }`}
    >
      {children}
    </div>
  );
}
