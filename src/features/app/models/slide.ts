import { z } from "zod";

export const SlideSchema = z.object({
  id: z.uuid(),
  post_id: z.uuid(),
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  createdAt: z.date(),
});

export type Slide = z.infer<typeof SlideSchema>;
