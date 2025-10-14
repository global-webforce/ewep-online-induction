import { z } from "zod";

export const formSchema = z.object({
  valid_until: z.iso.date().nullable(),
  induction_id: z.uuid(),
  status: z.enum(["passed", "failed"]),
});

export type FormSchema = z.infer<typeof formSchema>;
