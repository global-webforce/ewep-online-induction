"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const quizSchema = z.object({
  answer: z.string().min(1, "Please select an answer."),
});

type QuizFormValues = z.infer<typeof quizSchema>;

interface QuizFormProps {
  index?: number;
  question: string;
  options: { value: string }[];
  correct_answer: string;
  reveal?: boolean;
  onChange?: (value: string, isCorrect: boolean) => void;
}

export function QuizForm({
  index,
  question,
  options,
  correct_answer,
  reveal = false,
  onChange,
}: QuizFormProps) {
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: { answer: "" },
  });

  const selected = form.watch("answer");

  useEffect(() => {
    if (selected) {
      const isCorrect = selected === correct_answer;
      onChange?.(selected, isCorrect);
    }
  }, [selected, correct_answer, onChange]);

  return (
    <div
      className={cn(
        "w-full space-y-2 p-3 rounded-lg border text-sm transition-colors",
        "bg-background text-foreground border-border"
      )}
    >
      <h3 className="font-medium leading-snug text-left text-2lg py-2 ">
        {index !== undefined && (
          <span className="text-muted-foreground mr-2">{index + 1}.</span>
        )}
        {question}
      </h3>

      <RadioGroup
        value={selected}
        onValueChange={(val) =>
          !reveal && form.setValue("answer", val, { shouldValidate: true })
        }
      >
        {options.map((opt, index) => {
          const isSelected = selected === opt.value;
          const isCorrect = opt.value === correct_answer;

          return (
            <Label
              key={opt.value + index}
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
                disabled={reveal} // disable selection when reveal=true
              />
              {opt.value}
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
