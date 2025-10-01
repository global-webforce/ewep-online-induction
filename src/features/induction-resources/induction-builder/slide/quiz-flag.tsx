import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import React from "react";
import { ZodError } from "zod";

export default function QuizFlag({ error }: { error: ZodError | null }) {
  const formattedErrors: string[] = [];

  if (error) {
    for (const issue of error.issues) {
      // Group all option errors into one
      if (issue.path[0] === "options") {
        if (!formattedErrors.includes("One of the options has a problem")) {
          formattedErrors.push("One of the options has a problem");
        }
      } else {
        formattedErrors.push(issue.message);
      }
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle
          className={`h-4 w-4 ${error != null && "text-amber-500"}`}
        />
      </TooltipTrigger>
      {error != null && (
        <TooltipContent>
          <li>
            {formattedErrors.map((err, idx) => (
              <p key={`quiz-error-${idx}`}>{err}</p>
            ))}
          </li>
        </TooltipContent>
      )}
      {error == null && <TooltipContent>This slide has a quiz!</TooltipContent>}
    </Tooltip>
  );
}
