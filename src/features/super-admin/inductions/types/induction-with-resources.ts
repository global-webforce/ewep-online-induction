import { rowSchema as inductionResourceSchema } from "@/features/super-admin/induction-resources/";
import z from "zod";
import { rowSchema } from "./row";

export const inductionWithResourcesSchema = rowSchema.extend({
  induction_resources: z.array(inductionResourceSchema),
});

export type InductionWithResourcesSchema = z.infer<
  typeof inductionWithResourcesSchema
>;
