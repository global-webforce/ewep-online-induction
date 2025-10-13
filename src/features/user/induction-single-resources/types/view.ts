import { rowSchema as resourceSchema } from "@/features/super-admin/induction-resources/types";
import { rowSchema as inductionSchema } from "@/features/user/inductions/types";
import z from "zod";

export const viewSchema = inductionSchema.extend({
  induction_resources: z.array(resourceSchema),
});

export type ViewSchema = z.infer<typeof viewSchema>;
