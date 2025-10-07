import { tableSchema as inductionResourcesShema } from "@/features/super-admin/induction-resources/";
import z from "zod";
import { tableSchema } from "./table";

export const inductionWithResourcesSchema = tableSchema.extend({
  induction_resources: z.array(inductionResourcesShema),
});

export type InductionWithResourcesSchema = z.infer<
  typeof inductionWithResourcesSchema
>;
