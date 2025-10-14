"use client";

import { RowSchema as QuizRowSchema } from "@/features/super-admin/induction-quizzes";
import { shuffle } from "lodash";
import { useMemo, useState } from "react";
import { ViewSchema } from "../types/view";
export const useQuizController = (value: ViewSchema | undefined) => {
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [quizzes, setQuizzes] = useState<QuizRowSchema[]>([]);
  const [showConfirmQuizDialog, setShowConfirmQuizDialog] = useState(false);
  const [showUnansweredQuizDialog, setShowUnansweredQuizDialog] =
    useState(false);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const allAnswered = () => {
    if (!quizzes.length) return false;
    return quizzes.every((q) => q.answer && q.answer.trim() !== "");
  };

  useMemo(() => {
    if (value?.induction_quizzes && value.induction_quizzes.length > 0) {
      const formatQuiz = value?.induction_quizzes.map((quiz) => ({
        ...quiz,
        options: shuffle([...quiz?.options, { value: quiz?.correct_answer }]),
      }));
      setQuizzes(formatQuiz);
    }
  }, [value]);

  const [passingRate] = useState(0.7);
  const getQuizStats = () => {
    const total = quizzes.length;
    if (total === 0) {
      return { hasPassed: false, score: 0, total, correct: 0 };
    }

    const correct = quizzes.filter(
      (q) => q.answer?.trim() === q.correct_answer.trim()
    ).length;

    const score = correct / total;
    const hasPassed = score >= passingRate;

    return { hasPassed, score, total, correct };
  };

  const { hasPassed, score, total, correct } = getQuizStats();

  return {
    quizzes,
    quizMode,
    setQuizMode,
    setQuizzes,
    hasPassed,
    score,
    total,
    correct,
    allAnswered,
    showConfirmQuizDialog,
    setShowConfirmQuizDialog,
    showUnansweredQuizDialog,
    setShowUnansweredQuizDialog,
    showQuizResult,
    setShowQuizResult,
    passingRate,
  };
};
