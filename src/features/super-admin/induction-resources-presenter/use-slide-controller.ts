"use client";

import { useMemo, useRef, useState } from "react";
import { InductionWithResourcesSchema } from "../inductions/types/induction-with-resources";
import { FormSchema } from "./types/form";
import { quizStrictSchema } from "./types/quiz-strict";

export const useSlideController = (
  value: InductionWithResourcesSchema | undefined
) => {
  const quizCounter = useRef<number>(0);
  const [slides, setSlides] = useState<FormSchema[]>([]);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const selectedSlide = useMemo(() => {
    if (selectedIndex == null) return undefined;
    return slides[selectedIndex];
  }, [slides, selectedIndex]);

  useMemo(() => {
    if (value?.induction_resources && value.induction_resources.length > 0) {
      quizCounter.current = 0;
      const sorted = [...value.induction_resources].sort((a, b) => {
        if (a.order === undefined && b.order === undefined) return 0;
        if (a.order === undefined) return 1;
        if (b.order === undefined) return -1;
        return a.order - b.order;
      });

      function shuffleArray<T>(array: T[]): T[] {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      }

      const mapped = [...sorted].map((slide) => {
        const validateQuiz = quizStrictSchema.safeParse(slide.quiz);
        console.warn("Quiz invalidated on slide id: " + slide.id);
        if (validateQuiz.success === true) {
          quizCounter.current += 1;
        }
        return {
          ...slide,

          quiz: validateQuiz.error
            ? null
            : {
                ...slide.quiz!,
                index: quizCounter.current,
                options: shuffleArray([
                  ...(slide.quiz?.options ?? []),
                  { value: slide.quiz?.correctAnswer! },
                ]),
              },
        };
      });
      setSlides(mapped);
      setSelectedIndex(0);
    }
  }, [value]);

  return {
    selectedSlide,
    selectedIndex,
    setSelectedIndex,

    slides,
    setSlides,
  };
};
