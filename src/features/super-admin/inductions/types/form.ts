import { z } from "zod";

export const formSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  validity_days: z.number().int().nonnegative().nullable(),
  status: z.enum(["draft", "published"]),
});

export type FormSchema = z.infer<typeof formSchema>;
