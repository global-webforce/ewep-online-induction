import { resourceRowSchema } from "@/features/types";
import { rowSchema as inductionSchema } from "@/features/user/inductions";
import z from "zod";

export const viewSchema = inductionSchema.extend({
  induction_resources: z.array(resourceRowSchema),
});

export type ViewSchema = z.infer<typeof viewSchema>;
