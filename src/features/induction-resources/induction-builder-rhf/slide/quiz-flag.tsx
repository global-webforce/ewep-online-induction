import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import React from "react";

export default function QuizFlag({
  hasProblem = false,
}: {
  hasProblem: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle
          className={`h-4 w-4 ${hasProblem === true && "text-amber-500"}`}
        />
      </TooltipTrigger>
      {hasProblem === true && <TooltipContent>Incomplete Quiz!</TooltipContent>}
      {hasProblem === false && (
        <TooltipContent>This slide has a quiz!</TooltipContent>
      )}
    </Tooltip>
  );
}
