import React, { forwardRef, ReactNode } from "react";

interface SlideItemProps {
  onClick: () => void;
  isActive: boolean;
  children: ReactNode;
}

const SlideItem = forwardRef<HTMLDivElement, SlideItemProps>(
  ({ isActive, onClick, children }, ref) => {
    return (
      <div
        ref={ref}
        onClick={() => onClick()}
        className={`border cursor-pointer transition-colors rounded-lg overflow-hidden w-full ${
          isActive
            ? "bg-accent border-amber-500 border-1"
            : "hover:bg-accent/50"
        }`}
      >
        {children}
      </div>
    );
  }
);
SlideItem.displayName = "SlideItem";
export default SlideItem;
