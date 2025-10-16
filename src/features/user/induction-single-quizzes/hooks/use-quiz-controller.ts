"use client";

import { QuizFormSchema, QuizRowSchema } from "@/features/types";
import { shuffle } from "lodash";
import { useMemo, useState } from "react";
import { QuizStatSchema } from "../types/quiz-schemas";

export const useQuizController = (value: QuizRowSchema[] | undefined) => {
  const [passingRate] = useState(0.7);
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [quizzes, setQuizzes] = useState<QuizFormSchema[]>([]);
  const [showConfirmQuizDialog, setShowConfirmQuizDialog] = useState(false);

  const [showQuizResult, setShowQuizResult] = useState<boolean | undefined>(
    undefined
  );
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const isAllAnswered = () => {
    if (!quizzes.length) return false;
    return quizzes.every((q) => q.answer && q.answer.trim() !== "");
  };

  useMemo(() => {
    if (value && value.length > 0) {
      const formatQuiz = value?.map((quiz) => ({
        ...quiz,
        options: shuffle([...quiz?.options, { value: quiz?.correct_answer }]),
        answer: null,
      }));
      setQuizzes(shuffle(formatQuiz));
    }
  }, [value]);

  const getResult = (): QuizStatSchema => {
    const total = quizzes.length;
    if (total === 0) {
      return { hasPassed: false, score: 0, total, correct: 0, passingRate };
    }

    const correct = quizzes.filter(
      (q) => q.answer?.trim() === q.correct_answer.trim()
    ).length;

    const score = correct / total;
    const hasPassed = score >= passingRate;

    return { hasPassed, score, total, correct, passingRate };
  };

  return {
    quizzes,
    quizMode,
    showConfirmQuizDialog,
    showQuizResult,
    passingRate,
    showCorrectAnswer,
    setShowCorrectAnswer,
    getResult,
    isAllAnswered,
    setQuizMode,
    setQuizzes,
    setShowConfirmQuizDialog,

    setShowQuizResult,
  };
};
