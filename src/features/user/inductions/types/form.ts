import { z } from "zod";

export const formSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  validity_days: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return null;
    const num = Number(val);
    return Number.isFinite(num) ? num : null;
  }, z.number().int().nonnegative().nullable()),
  status: z.enum(["draft", "published"]).default("draft").optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
