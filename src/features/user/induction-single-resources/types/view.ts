import { rowSchema } from "@/features/super-admin/induction-resources";
import { rowSchema as inductionSchema } from "@/features/user/inductions/";
import z from "zod";

export const inductionWithResourcesSchema = inductionSchema.extend({
  induction_resources: z.array(rowSchema),
});

export type InductionWithResourcesSchema = z.infer<
  typeof inductionWithResourcesSchema
>;
