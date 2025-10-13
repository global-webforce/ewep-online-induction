import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { MouseEvent } from "react";

interface CopyButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function CopyButton({ onClick }: CopyButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            onClick(e);
          }}
          aria-label="Copy slide"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy slide</TooltipContent>
    </Tooltip>
  );
}
