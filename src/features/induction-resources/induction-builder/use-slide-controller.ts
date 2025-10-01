"use client";

import { InductionSchema } from "@/features/inductions";
import { isEqual } from "lodash";
import { useMemo, useRef, useState } from "react";
import { SlideSchema, TableSchema, UpsertSchema, upsertSchema } from "../types";
function randomId() {
  return (Math.random() + 1).toString(36).substring(7);
}

type HistoryEntry = {
  slides: SlideSchema[];
  selectedId: string | undefined;
};

export const useSlideController = ({
  induction,
  value,
}: {
  induction: InductionSchema | undefined;
  value: TableSchema[] | undefined;
}) => {
  const undoStack = useRef<HistoryEntry[]>([]);
  const redoStack = useRef<HistoryEntry[]>([]);
  const pristineValue = useRef<SlideSchema[]>([]);
  const deletedSlidesWithId = useRef<number[]>([]);
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

  const onSave = (): {
    slidesToUpsert: UpsertSchema[];
    slidesToDelete: number[];
  } => {
    const slidesToUpsert = slides.map((slide, index) => {
      return upsertSchema.parse({
        ...slide,
        order: index,
        induction_id: induction?.id || "",
      });
    });

    return {
      slidesToUpsert: slidesToUpsert,
      slidesToDelete: deletedSlidesWithId.current,
    };
  };

  useMemo(() => {
    if (value && value.length > 0) {
      const sorted = [...value].sort((a, b) => {
        if (a.order === undefined && b.order === undefined) return 0;
        if (a.order === undefined) return 1;
        if (b.order === undefined) return -1;
        return a.order - b.order;
      });
      const mapped = [...sorted].map((slide, index) => ({
        ...slide,

        order: index, // db order replaced with local order
        localId: randomId(), // local id is used instead of db id
        enableQuiz: slide.quiz !== null,
        quizCache: null,
      }));

      //   setSelectedId(mapped[mapped.length - 1].localId);
      pristineValue.current = mapped;
      setSlides(mapped);
    }
  }, [value]);

  const addSlide = () => {
    handleChange();
    const id = randomId();

    setSlides((prevSlides) => {
      return selectedIndex !== undefined && selectedIndex >= 0
        ? [
            ...prevSlides.slice(0, selectedIndex + 1),
            {
              title: "",
              content: "",

              localId: id,
              quiz: null,
              enableQuiz: false,
              quizCache: null,
            },
            ...prevSlides.slice(selectedIndex + 1),
          ]
        : [
            ...prevSlides,
            {
              title: "",
              content: "",
              localId: id,
              quiz: null,
              enableQuiz: false,
              quizCache: null,
            },
          ];
    });

    setSelectedId(id);
  };

  const copySlide = (targetIndex: number) => {
    undoStack.current.push({ selectedId: selectedId, slides: slides });

    const id = randomId();

    setSlides((prevSlides) => {
      const copiedSlide = {
        ...prevSlides[targetIndex],
        id: undefined,
        title: `${prevSlides[targetIndex].title}`,
        localId: id,
      };

      return [
        ...prevSlides.slice(0, targetIndex + 1),
        copiedSlide,
        ...prevSlides.slice(targetIndex + 1),
      ];
    });

    setSelectedId(id);
  };

  const deleteSlide = (targetIndex: number) => {
    undoStack.current.push({ selectedId: selectedId, slides: slides });
    if (slides[targetIndex].id !== null) {
      deletedSlidesWithId.current = [
        ...deletedSlidesWithId.current,
        slides[targetIndex].id!,
      ];
    }
    setSlides((prevSlides) => {
      return prevSlides.filter((_, i) => i !== targetIndex);
    });
  };

  const updateSlide = (updatedData: SlideSchema) => {
    // Intentionally disabled undo tracking on this
    setSlides((prev) => {
      return prev.map((slide) =>
        slide.localId === updatedData.localId
          ? { ...slide, ...updatedData }
          : slide
      );
    });
  };

  const moveSlide = (direction: "up" | "down", targetIndex: number) => {
    const isMovingUp = direction === "up";
    const isMovingDown = direction === "down";

    if (
      (isMovingUp && targetIndex === 0) ||
      (isMovingDown && targetIndex === slides.length - 1)
    ) {
      return;
    }

    undoStack.current.push({ selectedId: selectedId, slides: slides });

    setSlides((prev) => {
      const prevSlides = [...prev];

      const swapIndex = isMovingUp ? targetIndex - 1 : targetIndex + 1;
      const newSlide = prevSlides[targetIndex];
      const adjacentSlide = prevSlides[swapIndex];

      prevSlides[targetIndex] = { ...adjacentSlide };
      prevSlides[swapIndex] = { ...newSlide };

      return prevSlides;
    });
  };

  const handleChange = () => {
    undoStack.current.push({ selectedId: selectedId, slides: slides });
  };
  //   undoStack.current.push({ selectedId: selectedId, slides: slides });
  const undo = () => {
    const lastCommit = undoStack.current[undoStack.current.length - 1];
    setSlides(lastCommit.slides);
    setSelectedId(lastCommit.selectedId);
    undoStack.current = [...undoStack.current.slice(0, -1)];
    redoStack.current = [
      { slides: slides, selectedId: selectedId },
      ...redoStack.current,
    ];
  };

  const redo = () => {
    const lastCommit = redoStack.current[0];
    if (lastCommit) {
      setSlides(lastCommit.slides);
      setSelectedId(lastCommit.selectedId);
      undoStack.current = [
        ...undoStack.current,
        { slides: slides, selectedId: selectedId },
      ];
      redoStack.current = [...redoStack.current.slice(1)];
    }
  };

  const isDirty = () => {
    return !isEqual(pristineValue.current, slides);
  };

  return {
    undoStack: undoStack.current,
    redoStack: redoStack.current,
    onSave,
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
