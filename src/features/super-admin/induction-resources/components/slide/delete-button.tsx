import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideCheck, LucideX, Trash } from "lucide-react";
import { MouseEvent, useState } from "react";
interface DeleteButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);

  return (
    <div className="flex items-center gap-1">
      {!showDeleteConfirmation && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirmation(true);
              }}
              aria-label="Delete slide"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete slide</TooltipContent>
        </Tooltip>
      )}
      {showDeleteConfirmation && (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={"ghost"}
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteConfirmation(false);
              onClick(e);
            }}
          >
            <LucideCheck className="h-5 w-5  "></LucideCheck>
          </Button>

          <Button
            type="button"
            variant={"ghost"}
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteConfirmation(false);
              setShowDeleteConfirmation(false);
            }}
          >
            <LucideX className="h-5 w-5"></LucideX>
          </Button>
        </div>
      )}
    </div>
  );
}
