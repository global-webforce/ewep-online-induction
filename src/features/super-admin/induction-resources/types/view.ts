import { inductionRowSchema } from "@/features/types";
import z from "zod";
import { rowSchema as resourceSchema } from "../types";

export const viewSchema = inductionRowSchema.extend({
  induction_resources: z.array(resourceSchema),
});

export type ViewSchema = z.infer<typeof viewSchema>;
