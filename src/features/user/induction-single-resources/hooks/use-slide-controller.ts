"use client";

import { ResourceRowSchema } from "@/features/types";
import { useMemo, useState } from "react";
import { ViewSchema } from "../types/view";

export const useSlideController = (value: ViewSchema | undefined) => {
  const [slides, setSlides] = useState<ResourceRowSchema[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const selectedSlide = useMemo(() => {
    return slides[selectedIndex];
  }, [slides, selectedIndex]);

  useMemo(() => {
    if (value?.induction_resources && value.induction_resources.length > 0) {
      setSlides(value?.induction_resources);
      setSelectedIndex(0);
    }
  }, [value]);

  return {
    selectedSlide,
    selectedIndex,
    slides,
    setSelectedIndex,
    setSlides,
  };
};
