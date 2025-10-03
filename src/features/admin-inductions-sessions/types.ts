import { z } from "zod";

export const tableSchema = z.object({
  id: z.uuid(),
  created_at: z.iso.date(),
  user_id: z.uuid(),
  valid_until: z.iso.date(),
  induction_id: z.uuid(),
});

export const formSchema = z.object({
  user_id: z.uuid(),
  valid_until: z.iso.date(),
  induction_id: z.uuid(),
});

export type TableSchema = z.infer<typeof tableSchema>;
export type FormSchema = z.infer<typeof formSchema>;
