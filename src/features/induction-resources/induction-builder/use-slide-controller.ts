"use client";

import { isEqual } from "lodash";
import { useMemo, useRef, useState } from "react";
import { SlideSchema, TableSchema } from "../types";

function randomId() {
  return (Math.random() + 1).toString(36).substring(7);
}

type HistoryEntry = {
  slides: SlideSchema[];
  selectedId: string | undefined;
};

export const useSlideController = (value: TableSchema[] | undefined) => {
  const undoStack = useRef<HistoryEntry[]>([]);
  const redoStack = useRef<HistoryEntry[]>([]);
  const pristineValue = useRef<SlideSchema[]>([]);

  const [slides, setSlides] = useState<SlideSchema[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const selectedSlide = useMemo(() => {
    if (!selectedId) return undefined;
    return slides.find((slide) => slide.localId === selectedId);
  }, [slides, selectedId]);

  const selectedIndex = useMemo(() => {
    if (!selectedId) return undefined;
    return slides.findIndex((slide) => slide.localId === selectedId);
  }, [slides, selectedId]);

  useMemo(() => {
    if (value && value.length > 0) {
      const sorted = value.sort((a, b) => {
        if (a.order === undefined && b.order === undefined) return 0;
        if (a.order === undefined) return 1;
        if (b.order === undefined) return -1;
        return a.order - b.order;
      });
      const mapped = sorted.map((slide, index) => ({
        ...slide,
        order: index, // db order replaced with local order
        localId: slide.localId || randomId(), // local id is used instead of db id
        enableQuiz: slide.quiz !== null,
        quizCache: slide.quiz,
      }));
      pristineValue.current = mapped;
      setSelectedId(mapped[mapped.length - 1].localId);
      setSlides(mapped);
    }
  }, [value]);

  const addSlide = () => {
    undoStack.current.push({ selectedId: selectedId, slides: slides });
    let newSlides;
    let newSlide;

    const id = randomId();

    setSlides((prev) => {
      newSlide = {
        title: "",
        content: "",
        quiz: null,
        localId: id,
      };
      newSlides = [
        ...prev.toSpliced(
          selectedIndex !== undefined && selectedIndex >= 0
            ? selectedIndex + 1
            : prev.length - 1,
          0,
          newSlide
        ),
      ];
      return newSlides;
    });

    setSelectedId(id);
  };

  const copySlide = (targetIndex: number) => {
    undoStack.current.push({ selectedId: selectedId, slides: slides });
    let newSlides;

    const id = randomId();

    setSlides((prev) => {
      let newSlide = prev[targetIndex];
      newSlide = {
        ...newSlide,
        localId: id,
      };
      newSlides = prev.toSpliced(targetIndex + 1, 0, newSlide);

      return newSlides;
    });

    setSelectedId(id);
  };

  const deleteSlide = (targetIndex: number) => {
    undoStack.current.push({ selectedId: selectedId, slides: slides });
    let newSlides;

    setSlides((prev) => {
      newSlides = prev.filter((_, i) => i !== targetIndex);
      return newSlides;
    });
  };

  const updateSlide = (updatedData: Partial<SlideSchema>) => {
    // Intentionally disabled undo tracking on this
    let newSlides;
    setSlides((prev) => {
      newSlides = prev.map((slide) =>
        slide.localId === updatedData.localId
          ? { ...slide, ...updatedData }
          : slide
      );
      return newSlides;
    });
  };

  const moveSlide = (direction: "up" | "down", targetIndex: number) => {
    let newSlides;
    let newSlide;

    const isMovingUp = direction === "up";
    const isMovingDown = direction === "down";

    if (
      (isMovingUp && targetIndex === 0) ||
      (isMovingDown && targetIndex === slides.length - 1)
    ) {
      return;
    }

    undoStack.current.push({ selectedId: selectedId, slides: slides! });
    setSlides((prevSlides) => {
      const swapIndex = isMovingUp ? targetIndex - 1 : targetIndex + 1;
      newSlide = prevSlides[targetIndex];
      const adjacentSlide = prevSlides[swapIndex];

      newSlides = [...prevSlides];
      newSlides[targetIndex] = { ...adjacentSlide };
      newSlides[swapIndex] = { ...newSlide };

      return newSlides;
    });
  };

  const undo = () => {
    const lastCommit = undoStack.current.at(-1);
    if (lastCommit) {
      redoStack.current.push({ selectedId: selectedId, slides: slides! });
      setSlides(lastCommit.slides);
      setSelectedId(lastCommit.selectedId);
      undoStack.current.pop();
    }
  };

  const redo = () => {
    const lastCommit = redoStack.current.at(-1);
    if (lastCommit) {
      undoStack.current.push({ selectedId: selectedId, slides: slides! });
      setSlides(lastCommit.slides);
      setSelectedId(lastCommit.selectedId);
      redoStack.current.pop();
    }
  };

  const isDirty = () => {
    return !isEqual(pristineValue.current, slides);
  };

  return {
    undoStack: undoStack.current,
    redoStack: redoStack.current,
    selectedSlide,
    selectedIndex,
    setSelectedId,
    selectedId,
    slides,
    pristineValue: pristineValue.current,
    setSlides,
    isDirty,
    undo,
    redo,
    addSlide,
    deleteSlide,
    updateSlide,
    copySlide,
    moveSlide,
  };
};
