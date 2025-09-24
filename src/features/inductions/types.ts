import { z } from "zod";

export const tableSchema = z.object({
  id: z.uuid(),
  created_at: z.iso.date(),
  title: z.string().trim().min(1),
  description: z.string(),
  validity_days: z.preprocess(Number, z.number().int().nonnegative()),
});

export const formSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  validity_days: z.preprocess(Number, z.number().int().nonnegative()),
});

export type TableSchema = z.infer<typeof tableSchema>;
export type FormSchema = z.infer<typeof formSchema>;
