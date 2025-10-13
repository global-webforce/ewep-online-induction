"use client";

import { isEqual } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";

import { FormSchema, upsertSchema, UpsertSchema, ViewSchema } from "../types";

function randomId() {
  return (Math.random() + 1).toString(36).substring(7);
}

type HistoryEntry = {
  slides: FormSchema[];
  selectedId: string | undefined;
};

export const useSlideController = (value: ViewSchema | undefined) => {
  const undoStack = useRef<HistoryEntry[]>([]);
  const redoStack = useRef<HistoryEntry[]>([]);
  const pristineValue = useRef<FormSchema[]>([]);
  const deletedSlidesWithId = useRef<number[]>([]);
  const slideRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [slides, setSlides] = useState<FormSchema[]>([]);
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
        induction_id: value?.id || "",
      });
    });

    return {
      slidesToUpsert: slidesToUpsert,
      slidesToDelete: deletedSlidesWithId.current,
    };
  };

  useMemo(() => {
    if (value?.induction_resources && value.induction_resources.length > 0) {
      const sorted = [...value.induction_resources].sort((a, b) => {
        if (a.order === undefined && b.order === undefined) return 0;
        if (a.order === undefined) return 1;
        if (b.order === undefined) return -1;
        return a.order - b.order;
      });
      const mapped = [...sorted].map((slide, index) => ({
        ...slide,
        order: index, // db order replaced with local order
        localId: slides[index]?.localId || randomId(), // local id is used instead of db id
      }));

      setSelectedId(selectedId || mapped[0].localId);
      pristineValue.current = mapped;
      setSlides(mapped);
    }
  }, [value]);

  useEffect(() => {
    if (selectedId && slideRefs.current[selectedId]) {
      slideRefs.current[selectedId]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [selectedId]);

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

  const updateSlide = (updatedData: FormSchema) => {
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
    return !isEqual(
      pristineValue.current.map((val) => ({
        ...val,
        quizCache: null,
        enableQuiz: null,
      })),
      slides.map((val) => ({ ...val, quizCache: null, enableQuiz: null }))
    );
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
    slideRefs,
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
