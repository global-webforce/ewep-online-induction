"use client";

import { QuizFormSchema, QuizRowSchema } from "@/features/types";
import { isEqual, shuffle } from "lodash";
import { useEffect, useState } from "react";
import { QuizStatSchema } from "../types/quiz-schemas";

export const useQuizController = (value: QuizRowSchema[] | undefined) => {
  const [passingRate] = useState(0.7);
  const [quizMode, setQuizMode] = useState<boolean>(false);

  const [quizzesPristine, setQuizzesPristine] = useState<QuizFormSchema[]>([]);
  const [quizzes, setQuizzes] = useState<QuizFormSchema[]>([]);
  const [showConfirmQuizDialog, setShowConfirmQuizDialog] = useState(false);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const [certificateLink, setCertificateLink] = useState<string | undefined>(
    undefined
  );

  const isAllAnswered = () => {
    if (!quizzes.length) return false;
    return quizzes.every((q) => q.answer && q.answer.trim() !== "");
  };

  const initQuizzes = () => {
    if (!value || value.length === 0) return;

    const formatted = value.map((quiz) => ({
      ...quiz,
      options: shuffle([...quiz.options, { value: quiz.correct_answer }]),
      answer: null,
    }));

    const randomized = shuffle(formatted);
    setQuizzes(randomized);
    setQuizzesPristine(randomized);
    setShowCorrectAnswer(false);
    setShowQuizResult(false);
  };

  useEffect(() => {
    initQuizzes();
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

  const isDirty = () => {
    return !isEqual(quizzes, quizzesPristine);
  };

  const resetQuiz = () => {
    initQuizzes();
  };

  return {
    isDirty,
    resetQuiz,
    showSuccessDialog,
    setShowSuccessDialog,
    quizzes,
    quizMode,
    showConfirmQuizDialog,
    showQuizResult,
    passingRate,
    showCorrectAnswer,
    certificateLink,
    setCertificateLink,
    setShowCorrectAnswer,
    getResult,
    isAllAnswered,
    setQuizMode,
    setQuizzes,
    setShowConfirmQuizDialog,
    setShowQuizResult,
  };
};
