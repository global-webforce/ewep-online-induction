"use client";

import { useRef, useState } from "react";
import { Slide } from "../types";

function normalize(slides: Slide[]) {
  const sorted = slides.sort((a, b) => {
    if (a.order === undefined && b.order === undefined) return 0;
    if (a.order === undefined) return 1;
    if (b.order === undefined) return -1;
    return a.order - b.order;
  });

  return sorted.map((slide, index) => ({
    ...slide,
    order: index,
    localId: slide.localId || randomId(),
  }));
}

function randomId() {
  return (Math.random() + 1).toString(36).substring(7);
}

type HistoryEntry = {
  slides: Slide[];
  index: number;
};

export const useSlideControllerV2 = (value: Slide[]) => {
  const history = useRef<HistoryEntry[]>([]);
  const future = useRef<HistoryEntry[]>([]);

  const defaultValue =
    normalize(value).length > 0
      ? normalize(value)
      : [
          {
            title: "Your first slide",
            content: "Make content and quiz",
            quiz: undefined,
            order: 0,
            localId: randomId(),
          },
        ];

  const pristineValue = useRef<Slide[]>(defaultValue);
  const [slides, _setSlides] = useState<Slide[]>(defaultValue);

  function setSlides(updater: Slide[] | ((prev: Slide[]) => Slide[])) {
    _setSlides((prev) => {
      const nextValue =
        typeof updater === "function"
          ? (updater as (prev: Slide[]) => Slide[])(prev)
          : updater;

      return normalize(nextValue);
    });
  }

  const [index, _setIndex] = useState(0);

  function setIndex(updater: number | ((prev: number) => number)) {
    _setIndex((prev) => {
      const nextValue =
        typeof updater === "function"
          ? (updater as (prev: number) => number)(prev)
          : updater;

      return nextValue;
    });
  }

  const addSlide = () => {
    setSlides((prev) => {
      history.current.push({ index: index, slides: prev });
      return [
        ...prev.toSpliced(index + 1, 0, {
          title: "",
          content: "",
          quiz: undefined,
          order: index,
          localId: randomId(),
        }),
      ];
    });
    setIndex(index + 1);
  };

  // ✅ New utilities
  const deleteSlide = (targetIndex: number = index) => {
    setSlides((prev) => {
      if (prev.length <= 1) {
        alert(" 🚫 prevent deleting last slide");
        return prev;
      }

      history.current.push({ index, slides: prev });

      const updated = prev.filter((_, i) => i !== targetIndex);
      return updated;
    });

    setIndex((prev) => {
      if (slides.length <= 1) return prev; // safety check
      if (prev === targetIndex) {
        return Math.max(0, prev - 1); // move left if current was deleted
      }
      return prev > targetIndex ? prev - 1 : prev; // shift index if after deleted
    });
  };

  const updateSlide = (
    updatedData: Partial<Slide>,
    targetIndex: number = index
  ) => {
    setSlides((prev) => {
      history.current.push({ index, slides: prev });
      return prev.map((slide, i) =>
        i === targetIndex ? { ...slide, ...updatedData } : slide
      );
    });
  };

  const copySlide = (targetIndex: number = index) => {
    setSlides((prev) => {
      history.current.push({ index, slides: prev });
      const clone = {
        ...prev[targetIndex],
        localId: randomId(),
        order: targetIndex + 1,
      };
      return prev.toSpliced(targetIndex + 1, 0, clone);
    });
    setIndex(targetIndex + 1);
  };

  const moveSlide = (direction: "up" | "down", targetIndex: number = index) => {
    setSlides((prevSlides) => {
      const lastIndex = prevSlides.length - 1;
      const isMovingUp = direction === "up";
      const isMovingDown = direction === "down";

      // prevent moving out of bounds
      if (
        (isMovingUp && targetIndex === 0) ||
        (isMovingDown && targetIndex === lastIndex)
      ) {
        return prevSlides;
      }

      history.current.push({ index, slides: prevSlides });

      // swap logic
      const swapIndex = isMovingUp ? targetIndex - 1 : targetIndex + 1;
      const currentSlide = prevSlides[targetIndex];
      const adjacentSlide = prevSlides[swapIndex];

      const updatedSlides = [...prevSlides];
      updatedSlides[targetIndex] = { ...adjacentSlide, order: targetIndex };
      updatedSlides[swapIndex] = { ...currentSlide, order: swapIndex };

      return updatedSlides;
    });

    setIndex((prevIndex) => {
      const lastIndex = slides.length - 1;
      if (direction === "up" && targetIndex > 0) {
        return targetIndex - 1;
      }
      if (direction === "down" && targetIndex < lastIndex) {
        return prevIndex + 1;
      }

      return prevIndex; // no change if out of bounds
    });
  };

  const undo = () => {
    if (history.current.length === 0) return;
    const lastCommit = history.current[history.current.length - 1];
    future.current.push(lastCommit);
    history.current.pop();
    setSlides(lastCommit.slides);
    setIndex(lastCommit.index);
  };

  const redo = () => {
    if (future.current.length === 0) return;
    const lastRevert = future.current[future.current.length - 1];
    history.current.push(lastRevert);
    future.current.pop();
    setSlides(lastRevert.slides);
    setIndex(lastRevert.index);
  };

  const isDirty = () => {
    return JSON.stringify(pristineValue.current) !== JSON.stringify(slides);
  };

  return {
    index,
    slides,
    isDirty,
    undo,
    redo,
    setIndex,
    addSlide,
    deleteSlide,
    updateSlide,
    copySlide,
    moveSlide,
  };
};
