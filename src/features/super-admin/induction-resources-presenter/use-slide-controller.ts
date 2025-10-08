"use client";

import { useMemo, useState } from "react";
import { InductionWithResourcesSchema } from "../inductions/types/induction-with-resources";
import { FormSchema } from "./types/form";
import { quizStrictSchema } from "./types/quiz-strict";

export const useSlideController = (
  value: InductionWithResourcesSchema | undefined
) => {
  const [slides, setSlides] = useState<FormSchema[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const selectedSlide = useMemo(() => {
    if (!selectedId) return undefined;
    return slides.find((slide) => slide.id === selectedId);
  }, [slides, selectedId]);

  const selectedIndex = useMemo(() => {
    if (!selectedId) return undefined;
    return slides.findIndex((slide) => slide.id === selectedId);
  }, [slides, selectedId]);

  useMemo(() => {
    if (value?.induction_resources && value.induction_resources.length > 0) {
      const sorted = [...value.induction_resources].sort((a, b) => {
        if (a.order === undefined && b.order === undefined) return 0;
        if (a.order === undefined) return 1;
        if (b.order === undefined) return -1;
        return a.order - b.order;
      });
      const mapped = [...sorted].map((slide) => {
        const validateQuiz = quizStrictSchema.safeParse(slide.quiz);
        console.warn("Quiz invalidated on slide id: " + slide.id);
        return {
          ...slide,
          quiz: validateQuiz.error ? null : slide.quiz,
        };
      });

      setSelectedId((prev) => prev || mapped[0].id);
      setSlides(mapped);
    }
  }, [value]);

  return {
    selectedSlide,
    selectedIndex,

    setSelectedId,
    selectedId,
    slides,
    setSlides,
  };
};
