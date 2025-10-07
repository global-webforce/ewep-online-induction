import z from "zod";

export const tableSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  app_role: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email_confirmed_at: z.iso.date().nullable(),
  created_at: z.iso.date(),
});

export type TableSchema = z.infer<typeof tableSchema>;
