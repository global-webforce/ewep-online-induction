import z from "zod";

export const formSchema = z.object({
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
});

export type FormSchema = z.infer<typeof formSchema>;
