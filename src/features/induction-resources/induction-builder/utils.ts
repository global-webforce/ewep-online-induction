import { SlideSchema } from "../types";

export const hasValidQuiz = (slide: SlideSchema): boolean => {
  const res =
    !!slide.quiz?.question?.trim() &&
    slide.quiz?.options?.length &&
    slide.quiz?.options[slide.quiz?.correctAnswer!] !== undefined
      ? true
      : false;
  return res;
};

export const hasValidQuizWithCorrectAnswer = (slide: SlideSchema): boolean => {
  if (hasValidQuiz(slide)) {
    return slide.quiz?.answer !== slide.quiz?.correctAnswer;
  }
  return true;
};

export function randomId() {
  return (Math.random() + 1).toString(36).substring(7);
}

export function stripHtml(input: string): string {
  return input
    .replace(/(<([^>]+)>)/gi, "") // remove tags
    .replace(/&[^;]+;/g, ""); // remove entities
}
