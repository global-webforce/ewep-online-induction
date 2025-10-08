import { z } from "zod";

export const formSchema = z.object({
  user_id: z.uuid(),
  valid_until: z.string().nullable(),
  induction_id: z.uuid(),
});

export type FormSchema = z.infer<typeof formSchema>;
