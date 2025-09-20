import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import React from "react";

export default function QuizFlag() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <HelpCircle className="h-4 w-4 " />
        </div>
      </TooltipTrigger>
      <TooltipContent>This slide has a Quiz!</TooltipContent>
    </Tooltip>
  );
}
