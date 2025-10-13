import { rowSchema as inductionSchema } from "@/features/super-admin/inductions/types";
import z from "zod";
import { rowSchema as resourceSchema } from "../types";

export const viewSchema = inductionSchema.extend({
  induction_resources: z.array(resourceSchema),
});

export type ViewSchema = z.infer<typeof viewSchema>;
