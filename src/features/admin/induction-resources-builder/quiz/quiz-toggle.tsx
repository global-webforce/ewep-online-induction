import { Switch } from "@/components/custom/switch-custom";
import React from "react";
import { FormSchema } from "../types/form";

export default function QuizToggle({
  slide,
  onEnabled,
  onDisabled,
}: {
  slide: FormSchema;
  onEnabled: (value: FormSchema) => void;
  onDisabled: (value: FormSchema) => void;
}) {
  return (
    <Switch
      size={"default"}
      checked={slide.enableQuiz === true}
      className="data-[state=checked]:bg-amber-500 "
      onCheckedChange={(e) => {
        if (e) {
          const value = {
            ...slide,
            enableQuiz: true,
            quiz: slide.quizCache || slide.quiz,
          } as FormSchema;
          console.log(value);
          onEnabled(value);
        } else {
          const value = {
            ...slide,
            quizCache: slide.quiz,
            enableQuiz: false,
            quiz: null,
          } as FormSchema;
          console.log(value);
          onDisabled(value);
        }
      }}
    />
  );
}
