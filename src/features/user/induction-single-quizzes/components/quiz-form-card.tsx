"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/utils/utils";
import { useEffect, useState } from "react";
import { QuizFormCardProps } from "../types/quiz-schemas";

export function QuizFormCard({
  value,
  index,
  reveal = false,
  onChange,
}: QuizFormCardProps) {
  const { question, options, correct_answer, answer } = value;

  const [selected, setSelected] = useState<string | null | undefined>(answer);

  useEffect(() => {
    if (selected) {
      onChange?.(selected);
    }
  }, [selected, onChange]);

  return (
    <div
      className={cn(
        "w-full space-y-2 p-3 rounded-lg border text-sm transition-colors",
        "bg-background text-foreground border-border"
      )}
    >
      <h3 className="font-medium leading-snug text-left text-2lg py-2">
        {index !== undefined && (
          <span className="text-muted-foreground mr-2">{index + 1}.</span>
        )}
        {question}
      </h3>

      <RadioGroup
        value={selected}
        onValueChange={(val) => !reveal && setSelected(val)}
      >
        {options.map((opt, i) => {
          const isSelected = selected === opt.value;
          const isCorrect = opt.value === correct_answer;

          return (
            <Label
              key={opt.value + i}
              className={cn(
                "flex items-center gap-2 p-2 rounded-md cursor-pointer border transition-colors select-none",
                "hover:bg-muted/40",
                isSelected && "border-primary bg-primary/10",
                reveal &&
                  isSelected &&
                  !isCorrect &&
                  "border-destructive/70 bg-destructive/10 text-destructive",
                reveal &&
                  isCorrect &&
                  "border-green-600 bg-green-600/10 text-green-600",
                reveal && "cursor-default opacity-90"
              )}
            >
              <RadioGroupItem
                value={opt.value}
                className="h-4 w-4"
                disabled={reveal}
              />
              {opt.value}
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
