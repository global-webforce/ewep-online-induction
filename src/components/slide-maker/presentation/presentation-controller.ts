import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID
import { Slide, SlideSchema } from "../types"; // Import types and Zod schema
import { isEmpty } from "@/lib/utils";
import { hasValidQuiz, hasValidQuizWithCorrectAnswer } from "../utils";

export const usePresentationController = ({
  values = [],
  current,
  readonly = false,
  debugMode = false,
}: {
  values: Slide[];
  current?: number;
  readonly?: boolean;
  debugMode?: boolean;
}) => {
  const defaultSlide: Slide = {
    id: uuidv4(),
    title: "Title",
    content: "Content",
  };

  const formatSlide = (value: Slide) => {
    const result = SlideSchema.safeParse(value);
    if (result.success) {
      const slide = result.data;
      return {
        ...slide,
        id: uuidv4(),
        answer: undefined,
      } as Slide;
    } else {
      console.error("Invalid slide data", result.error);
      return null;
    }
  };

  const validatedSlides = values
    .map((slide) => formatSlide(slide))
    .filter((slide) => slide !== null);

  const [slides, setSlides] = useState<Slide[]>(
    validatedSlides.length > 0 ? validatedSlides : [defaultSlide]
  );
  const [currentSlide, setCurrentSlide] = useState<Slide>(
    validatedSlides.at(current || 0)!
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAcknowledgment, setShowAcknowledgment] = useState(false);
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const currentIndex = useCallback(() => {
    return slides.findIndex((slide) => slide.id === currentSlide.id);
  }, [slides, currentSlide]);

  const updateAnswer = useCallback((newSlide: Slide) => {
    setSlides((prevSlides) => {
      const updatedSlides = prevSlides.map((slide) =>
        slide.id === newSlide.id ? newSlide : slide
      );
      return updatedSlides;
    });
    setCurrentSlide(newSlide);
  }, []);

  const goToNextSlide = useCallback(() => {
    if (hasValidQuiz(currentSlide)) {
      if (currentSlide.correctAnswer !== currentSlide.answer) {
        if (readonly === false && debugMode === false) {
          setShowModal(true);
          return;
        }
      }
    }

    // If we're on the last slide, show the acknowledgment page
    if (currentIndex() === slides.length - 1) {
      if (readonly === true && debugMode === false) {
        setShowConfetti(true);
      } else if (debugMode === true) {
        setShowAcknowledgment(true);
      } else {
        setShowAcknowledgment(true);
      }
    } else {
      setCurrentSlide(slides[currentIndex() + 1]);
    }
  }, [currentSlide, readonly, currentIndex, slides, debugMode]);

  // Move to the previous slide
  const goToPreviousSlide = useCallback(() => {
    if (currentIndex() > 0) {
      setCurrentSlide(slides[currentIndex() - 1]);
    }
  }, [slides, currentIndex]);

  // Handle acknowledgment
  const handleAcknowledgment = useCallback(() => {
    if (isAcknowledged) {
      setShowConfetti(true);
    }
  }, [isAcknowledged]);

  return {
    showConfetti,
    showAcknowledgment,
    isAcknowledged,
    showModal,
    setShowModal,
    slides,
    currentSlide,
    currentIndex,
    setShowConfetti,
    setCurrentSlide,
    setIsAcknowledged,
    setShowAcknowledgment,
    updateAnswer,
    goToPreviousSlide,
    goToNextSlide,
    handleAcknowledgment,
  };
};
