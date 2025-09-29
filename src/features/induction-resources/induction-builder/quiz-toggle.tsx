import { Switch } from "@/components/custom/switch-custom";
import React from "react";
import { SlideSchema } from "../types";

export default function QuizToggle({
  slide,
  onEnabled,
  onDisabled,
}: {
  slide: SlideSchema;
  onEnabled: (value: SlideSchema) => void;
  onDisabled: (value: SlideSchema) => void;
}) {
  return (
    <Switch
      size={"default"}
      checked={slide.enableQuiz || slide.quiz != null}
      className="data-[state=checked]:bg-amber-500 "
      onCheckedChange={(e) => {
        if (e) {
          const value = {
            ...slide,
            enableQuiz: true,
            quiz: slide.quizCache || slide.quiz,
          } as SlideSchema;
          onEnabled(value);
        } else {
          const value = {
            ...slide,
            quizCache: slide.quiz,
            enableQuiz: false,
            quiz: null,
          } as SlideSchema;
          onDisabled(value);
        }
      }}
    />
  );
}
