import { useEffect, useState } from "react";
import { Slide } from "../types";

function randomId() {
  return (Math.random() + 1).toString(36).substring(7);
}

export const useSlideController = (value: Slide[] = []) => {
  const originalValue = value;
  const defaultSlide: Slide = {
    title: "",
    content: "",
    quiz: undefined,
    localId: randomId(),
  };

  const [slides, setSlides] = useState<Slide[]>(
    value.length > 0 ? value : [defaultSlide]
  );
  const [undoStack, setUndoStack] = useState<Slide[][]>([]);
  const [redoStack, setRedoStack] = useState<Slide[][]>([]);

  const [prevSlide, setPrevSlide] = useState<Slide>(
    slides.length > 0 ? slides[0] : defaultSlide
  );

  const [currentSlide, setCurrentSlide] = useState<Slide>(
    slides.length > 0 ? slides[0] : defaultSlide
  );

  const [isEditMode, setIsEditMode] = useState(true);

  // 🔹 Normalize slides whenever `slides` changes
  useEffect(() => {
    if (slides.length === 0) return;

    // Sort by order if available, otherwise move to end
    const sorted = [...slides].sort((a, b) => {
      if (a.order === undefined && b.order === undefined) return 0;
      if (a.order === undefined) return 1;
      if (b.order === undefined) return -1;
      return a.order - b.order;
    });

    // Assign sequential order starting from 0
    const normalized = sorted.map((slide, idx) => ({
      ...slide,
      order: idx,
      localId: randomId(),
    }));

    // Only update if changed (to prevent infinite loop)
    const isSame = JSON.stringify(slides) === JSON.stringify(normalized);
    if (!isSame) {
      setSlides(normalized);
    }
  }, [value]);

  const saveSlides = () => {
    setRedoStack(() => []);
    setUndoStack(() => []);
  };

  const undoChanges = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setSlides(previousState);
      setUndoStack((prevStack) => prevStack.slice(0, prevStack.length - 1)); // Remove last undo
      setRedoStack((prevStack) => [slides, ...prevStack]); // Push the current state to redo stack
      setCurrentSlide(prevSlide);
      setPrevSlide(currentSlide);
    }
  };

  // Redo functionality
  const redoChanges = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setSlides(nextState);
      setRedoStack((prevStack) => prevStack.slice(1)); // Remove the first item from redo stack
      setUndoStack((prevStack) => [...prevStack, slides]); // Push the current state to undo stack
      setCurrentSlide(prevSlide);
    }
  };

  const addSlide = () => {
    setPrevSlide(currentSlide);
    setUndoStack((prevStack) => [...prevStack, slides]);

    setSlides((slides) => [...slides, defaultSlide]);
    setCurrentSlide(defaultSlide);
  };

  const copySlide = (id: string) => {
    setPrevSlide(currentSlide);
    setUndoStack((prevStack) => [...prevStack, slides]);
    const index = slides.findIndex((slide) => slide.localId === id);
    if (index !== -1) {
      const slideToCopy = slides[index];
      const copiedSlide: Slide = {
        ...slideToCopy,
        title: `${slideToCopy.title} (${index + 1})`,
        localId: randomId(),
      };
      const updatedSlides = [
        ...slides.slice(0, index + 1),
        copiedSlide,
        ...slides.slice(index + 1),
      ];
      setSlides(updatedSlides);
      setCurrentSlide(copiedSlide);
    }
  };

  const onMoveSlide = (id: string, direction: "up" | "down") => {
    setPrevSlide(currentSlide);
    setUndoStack((prevStack) => [...prevStack, slides]);
    const index = slides.findIndex((slide) => slide.localId === id);
    if (index === -1) return;

    const updatedSlides = [...slides];

    // Move up
    if (direction === "up" && index > 0) {
      const [movedSlide] = updatedSlides.splice(index, 1);
      updatedSlides.splice(index - 1, 0, movedSlide);
    }

    // Move down
    if (direction === "down" && index < slides.length - 1) {
      const [movedSlide] = updatedSlides.splice(index, 1);
      updatedSlides.splice(index + 1, 0, movedSlide);
    }

    setSlides(updatedSlides);
  };

  const isLastSlide = (id: string) => {
    const lastSlide = slides[slides.length - 1];
    return lastSlide.id === id;
  };

  const deleteSlide = (id: string) => {
    setPrevSlide(currentSlide);
    setUndoStack((prevStack) => [...prevStack, slides]);
    const index = slides.findIndex((slide) => slide.localId === id);
    // const confirmDelete = window.confirm(`Delete Slide? ${index + 1}`);

    const updatedSlides = slides.filter((slide) => slide.localId !== id);
    setSlides(updatedSlides);

    if (currentSlide.id === id) {
      const nextSlide = updatedSlides[index] || updatedSlides[index - 1];
      setCurrentSlide(nextSlide || updatedSlides[0]);
    }
  };

  const updateSlide = (updatedSlide: Slide) => {
    const updatedSlides = slides.map((slide) => {
      return slide.localId === updatedSlide.localId ? updatedSlide : slide;
    });
    setSlides(updatedSlides);
    setCurrentSlide(updatedSlide);
  };

  const nextSlide = () => {
    const currentIndex = slides.findIndex(
      (slide) => slide.localId === currentSlide?.id
    );
    if (currentIndex < slides.length - 1) {
      setCurrentSlide(slides[currentIndex + 1]);
    }
  };

  const isDirty = (): boolean => {
    const def = JSON.stringify(
      originalValue.map((e) => ({ ...e, id: undefined }))
    );
    const updated = JSON.stringify(
      slides.map((e) => ({ ...e, id: undefined }))
    );
    return def === updated;
  };

  const currentIndex = (): number => {
    return slides.findIndex((slide) => slide.localId === currentSlide.id);
  };

  return {
    isEditMode,
    slides,
    currentSlide,
    undoStack,
    redoStack,
    setSlides,
    saveSlides,
    addSlide,
    updateSlide,
    copySlide,
    deleteSlide,
    nextSlide,
    onMoveSlide,
    isDirty,
    setIsEditMode,
    setCurrentSlide,
    undoChanges,
    redoChanges,
    isLastSlide,
    currentIndex,
  };
};
