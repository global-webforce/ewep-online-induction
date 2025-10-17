/*==================================================
| PROJECT:  Online Induction Zod Schema - source of truth
| AUTHOR:   Mark Dionnie
| UPDATED:  Oct 2025
==================================================*/

import { formatValue } from "@/utils/string-helpers";
import { format } from "date-fns";
import z from "zod";

const id = z.uuid();
const datetime = z.iso.datetime({ offset: true });
const non_empty_string = z
  .string({ error: "Required" })
  .trim()
  .min(1, { error: "Required" });

export const profileInputSchema = z.object({
  first_name: non_empty_string,
  last_name: non_empty_string,
});

export const userRowSchema = z
  .object({
    id: z.uuid(),
    email: z.email(),
    app_role: z.enum(["super_admin", "admin", "user"]),
    confirmed_at: datetime,
    created_at: datetime,
  })
  .extend({
    first_name: profileInputSchema.shape.first_name.nullable(),
    last_name: profileInputSchema.shape.last_name.nullable(),
  });

// >>>>>> Induction <<<<<<

//>>
export const inductionRowSchema = z.object({
  id: id,
  title: non_empty_string,
  description: z.string(),
  validity_days: z.number().int().nonnegative().nullable(),
  status: z.enum(["draft", "published"]),
  created_at: datetime,
});

export type InductionRowSchema = z.infer<typeof inductionRowSchema>;

export const inductionFormSchema = inductionRowSchema.omit({
  id: true,
  created_at: true,
});
export type InductionFormSchema = z.infer<typeof inductionFormSchema>;

//<<

// >>>>>> Sessions <<<<<<

//>>
export const sessionRowSchema = z.object({
  id: id,
  user_id: id,
  induction_id: id,
  status: z.enum(["passed", "failed"]),
  valid_until: z.iso.date().nullable(),
  created_at: datetime,
});
export type SessionRowSchema = z.infer<typeof sessionRowSchema>;
//<<

//>>
export const sessionFormSchema = sessionRowSchema.omit({
  id: true,
  created_at: true,
});
export type SessionFormSchema = z.infer<typeof sessionFormSchema>;

//<<

//>>
export const sessionFormRLSSchema = sessionRowSchema.omit({
  id: true,
  //created_at: true,
  user_id: true,
});
export type SessionFormRLSSchema = z.infer<typeof sessionFormRLSSchema>;

//<<

//>>
export const sessionsSuperAdminRowView = sessionRowSchema.extend({
  user_email: userRowSchema.shape.email,
  induction_title: inductionRowSchema.shape.title,
});
export const sessionsSuperAdminView = z.array(sessionsSuperAdminRowView);
export type SessionsSuperAdminView = z.infer<typeof sessionsSuperAdminView>;
export type SessionsSuperAdminRowView = z.infer<
  typeof sessionsSuperAdminRowView
>;
//<<

//>>
export const sessionUserViewRowSchema = sessionRowSchema.extend({
  induction_title: inductionRowSchema.shape.title,
  email: userRowSchema.shape.email,
  first_name: profileInputSchema.shape.first_name,
  last_name: profileInputSchema.shape.last_name,
  is_expired: z.boolean().nullable(),
});
export type SessionUserViewRowSchema = z.infer<typeof sessionUserViewRowSchema>;
//<<

//>>
export const sessionUserViewRowPresenterSchema =
  sessionUserViewRowSchema.transform((s) => ({
    ...s,
    full_name: s.first_name + " " + s.last_name,
    status: formatValue(s.status),
    valid_until: s.valid_until ? format(new Date(s.valid_until), "PP") : null,
    created_at: format(new Date(s.created_at), "PP"),
  }));

export type SessionUserViewRowPresenterSchema = z.output<
  typeof sessionUserViewRowPresenterSchema
>;
//<<

//>>
export const inductionsUserViewRowSchema = inductionRowSchema.extend({
  session_id: sessionRowSchema.shape.id.nullable(),
  session_status: sessionRowSchema.shape.status.nullable(),
  session_valid_until: sessionRowSchema.shape.valid_until.nullable(),
  session_is_expired: z.boolean().nullable(),
  session_created_at: datetime.nullable(),
});
export type InductionsUserViewRowSchema = z.infer<
  typeof inductionsUserViewRowSchema
>;
//<<

// >>>>>> Quiz <<<<<<

//>>
export const quizRowSchema = z.object({
  id: z.number(),
  induction_id: id,
  question: non_empty_string,
  options: z.array(z.object({ value: non_empty_string })),
  correct_answer: non_empty_string,
  created_at: datetime,
});
export type QuizRowSchema = z.infer<typeof quizRowSchema>;
//<<

//>>
export const quizFormSchema = quizRowSchema
  .omit({
    id: true,
    created_at: true,
    options: true,
  })
  .extend({
    options: z
      .array(z.object({ value: non_empty_string }))
      .min(1, "At least 1 option required"),
    answer: non_empty_string.nullable().optional(),
  })
  .refine(
    (data) => {
      const values = data.options.map((opt) => opt.value.trim().toLowerCase());
      return new Set(values).size === values.length;
    },
    {
      message: "Duplicate option values are not allowed",
      path: ["options"],
    }
  )
  .refine(
    (data) => data.options.every((opt) => opt.value !== data.correct_answer),
    {
      message: "Don't include correct answer in options",
      path: ["options"],
    }
  );

export type QuizFormSchema = z.infer<typeof quizFormSchema>;
//<<

// >>>>>> Resources <<<<<<

export const resourceRowSchema = z.object({
  id: z.number(),
  induction_id: id,
  order: z.number(),
  title: z.string().nullable(),
  content: z.string().nullable(),
  created_at: datetime,
});

export const resourceFormSchema = resourceRowSchema.extend({
  id: resourceRowSchema.shape.id.nullable().optional(),
  created_at: resourceRowSchema.shape.created_at.nullable().optional(),
  local_id: non_empty_string,
});

export type ResourceRowSchema = z.infer<typeof resourceRowSchema>;
export type ResourceFormSchema = z.infer<typeof resourceFormSchema>;

export interface ResourcesUpsertSchema {
  slides_to_upsert: ResourceFormSchema[];
  slides_to_delete: number[];
}

// >>>>>> Super Admin Metrics <<<<<<
export const superAdminMetricsSchema = z.object({
  total_inductions: z.number(),
  total_published_inductions: z.number(),
  total_draft_inductions: z.number(),
  total_default_users: z.number(),
});

export type SuperAdminMetricsSchema = z.infer<typeof superAdminMetricsSchema>;
