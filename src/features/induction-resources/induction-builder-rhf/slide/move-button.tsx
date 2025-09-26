import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MouseEvent } from "react";
type Direction = "up" | "down";

interface MoveButtonProps {
  direction: Direction;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function MoveButton({ direction, onClick }: MoveButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => {
            onClick(e);
          }}
          aria-label={`Move slide ${direction}`}
        >
          {direction === "up" ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Move slide {direction}</TooltipContent>
    </Tooltip>
  );
}
