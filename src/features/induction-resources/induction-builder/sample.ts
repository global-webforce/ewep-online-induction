import z from "zod";
import { tableSchema } from "../types";

export const sampleData: z.infer<typeof tableSchema> = {
  id: "tbl_001",
  induction_id: "550e8400-e29b-41d4-a716-446655440000", // valid UUID v4

  order: 1,
  title: "Induction Program: Working Abroad",
  content: `<h2>Welcome to Your Induction Abroad 🌍</h2>`,
  quiz: {
    question:
      "Which of the following is the most important first step when starting work abroad?",
    options: [
      { value: "Ignore cultural differences and focus only on work" },

      { value: "Skip induction and start immediately" },
      { value: "Rely only on colleagues for guidance" },
    ],
    correctAnswer: "Learn about local laws, culture, and safety guidelines",
    answer: undefined,
  },
};
