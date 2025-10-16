import { QuizFormSchema } from "@/features/types";

export type QuizStatSchema = {
  score: number; // 0–1 range (e.g., 0.75 for 75%)
  correct: number;
  total: number;
  hasPassed: boolean;
  passingRate: number; // 0–1 range (e.g., 0.6 for 60
};

export type QuizFormCardProps = {
  value: Omit<QuizFormSchema, "induction_id">;
  index: number;
  reveal?: boolean;
  onChange?: (value: string) => void;
};

export type QuizResultCardProps = {
  result: QuizStatSchema;
  onRetry: () => void;
};
