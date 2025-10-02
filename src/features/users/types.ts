import { z } from "zod";

export const tableSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  role: z.string(), // defaults to "default" if null in SQL
  first_name: z.string().nullable(), // raw_user_meta_data may not exist
  last_name: z.string().nullable(),
  email_confirmed_at: z.iso.date().nullable(),
  created_at: z.iso.date(), // Supabase returns ISO timestamps as string
});

export const formSchema = z.object({
  first_name: z.string().nullable(), // raw_user_meta_data may not exist
  last_name: z.string().nullable(),
});

export type TableSchema = z.infer<typeof tableSchema>;
export type FormSchema = z.infer<typeof formSchema>;
