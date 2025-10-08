import z from "zod";

export const rowSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  app_role: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  confirmed_at: z.iso.datetime({ offset: true }),
  created_at: z.iso.datetime({ offset: true }),
});

export type RowSchema = z.infer<typeof rowSchema>;
