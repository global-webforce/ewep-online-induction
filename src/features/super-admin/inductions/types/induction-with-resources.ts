import { rowSchema as inductionResourceSchema } from "@/features/super-admin/induction-resources";
import { rowSchema } from "@/features/super-admin/inductions/";
import z from "zod";

export const inductionWithResourcesSchema = rowSchema.extend({
  induction_resources: z.array(inductionResourceSchema),
});

export type InductionWithResourcesSchema = z.infer<
  typeof inductionWithResourcesSchema
>;
