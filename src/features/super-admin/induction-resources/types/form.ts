import z from "zod";

export const formSchema = z.object({
  id: z.number().optional(),
  localId: z.string().min(1),
  title: z.string().nullable(),
  content: z.string().nullable(),
});

export type FormSchema = z.infer<typeof formSchema>;
