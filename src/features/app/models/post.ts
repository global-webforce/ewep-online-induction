import { z } from "zod";

export const PostSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  createdAt: z.date(),
});

export type Post = z.infer<typeof PostSchema>;
