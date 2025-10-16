"use client";

import { ResourceRowSchema } from "@/features/types";
import { useMemo, useState } from "react";

export const useSlideController = (value: ResourceRowSchema[] | undefined) => {
  const [slides, setSlides] = useState<ResourceRowSchema[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const selectedSlide = useMemo(() => {
    return slides[selectedIndex];
  }, [slides, selectedIndex]);

  useMemo(() => {
    if (value && value.length > 0) {
      setSlides(value);
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
