import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigatorProps {
  disabled: boolean;
  onNext: () => void;
  onPrev: () => void;
  children: React.ReactNode;
}

export default function PresentationNavigator({
  disabled,
  onNext,
  onPrev,
  children,
}: NavigatorProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 p-3",
        disabled && "cursor-not-allowed"
      )}
    >
      <Button disabled={disabled} variant="outline" onClick={onPrev}>
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>

      <span
        className={cn(
          "text-sm font-medium",
          disabled && "text-muted-foreground"
        )}
      >
        {children}
      </span>
      <Button disabled={disabled} variant="outline" onClick={onNext}>
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
