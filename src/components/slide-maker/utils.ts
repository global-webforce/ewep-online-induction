import { Slide } from "./types";

export const hasValidQuiz = (slide: Slide): boolean => {
  const res =
    !!slide.question?.trim() &&
    slide.options?.length &&
    slide.options[slide.correctAnswer!] !== undefined
      ? true
      : false;
  return res;
};

export const hasValidQuizWithCorrectAnswer = (slide: Slide): boolean => {
  if (hasValidQuiz(slide)) {
    return slide.answer !== slide.correctAnswer;
  }
  return true;
};
