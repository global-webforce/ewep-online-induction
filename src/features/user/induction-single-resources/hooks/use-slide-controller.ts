"use client";

import { RowSchema } from "@/features/super-admin/induction-resources";
import { useMemo, useState } from "react";
import { InductionWithResourcesSchema } from "../types/view";

export const useSlideController = (
  value: InductionWithResourcesSchema | undefined
) => {
  const [slides, setSlides] = useState<RowSchema[]>([]);
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
