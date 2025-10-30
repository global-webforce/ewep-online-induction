/*==================================================
| PROJECT:  Online Induction Zod Schema - source of truth
| AUTHOR:   Mark Dionnie
| UPDATED:  Oct 2025
==================================================*/

import { format } from "date-fns";
import z from "zod";
import { userRowSchema } from "./auth-types";

const id = z.uuid();
const datetime = z.iso.datetime({ offset: true });
const non_empty_string = z
  .string({ error: "Required" })
  .trim()
  .min(1, { error: "Required" });

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
  has_passed: z.boolean().nullable(),
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
export const sessionRowViewSchema = sessionRowSchema
  .extend({
    email: userRowSchema.shape.email,
    first_name: non_empty_string,
    last_name: non_empty_string,
    induction_title: inductionRowSchema.shape.title,
    is_expired: z.boolean().nullable(),
  })
  .transform((s) => ({
    ...s,

    has_valid_induction:
      (s.has_passed === true && s.is_expired === false) ||
      (s.has_passed === true && s.valid_until == null),

    session_is_expired_formatted: s.is_expired === true ? "Expired" : "",
    session_has_passed_formatted:
      s.has_passed === true ? "Passed" : s.has_passed === false ? "Failed" : "",
    session_valid_until_formatted: s.valid_until
      ? format(new Date(s.valid_until), "PP")
      : s.has_passed === true && s.valid_until == null
      ? "Lifetime"
      : "",
    session_created_at_formatted: s.created_at
      ? format(new Date(s.created_at), "PPp")
      : "",
    session_created_at_formatted_2: s.created_at
      ? format(new Date(s.created_at), "MMMM d, yyyy")
      : "",
  }));

export type SessionsRowViewSchema = z.infer<typeof sessionRowViewSchema>;
//<<

//>>
export const inductionUserViewRowSchema = inductionRowSchema
  .extend({
    has_valid_induction: z.boolean(),
    session_id: sessionRowSchema.shape.id.nullable(),
    session_has_passed: sessionRowSchema.shape.has_passed.nullable(),
    session_valid_until: sessionRowSchema.shape.valid_until.nullable(),
    session_is_expired: z.boolean().nullable(),
    session_created_at: datetime.nullable(),
  })
  .transform((s) => ({
    ...s,

    validity_days_formatted: s.validity_days
      ? `${s.validity_days} Days`
      : "Lifetime",

    session_is_expired_formatted:
      s.session_is_expired === true ? "Expired" : "",
    session_has_passed_formatted:
      s.session_has_passed === true
        ? "Passed"
        : s.session_has_passed === false
        ? "Failed"
        : "",
    session_valid_until_formatted: s.session_valid_until
      ? format(new Date(s.session_valid_until), "PP")
      : s.session_has_passed === true && s.session_valid_until == null
      ? "Lifetime"
      : "",
    session_created_at_formatted: s.session_created_at
      ? format(new Date(s.session_created_at), "PPp")
      : null,
  }));
export type InductionUserViewRowSchema = z.infer<
  typeof inductionUserViewRowSchema
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
export const SuperAdmin__MetricsSchema = z.object({
  // from metric_inductions_view
  total_inductions: z.number(),
  total_published_inductions: z.number(),
  total_draft_inductions: z.number(),

  // from metric_sessions_view
  total_induction_sessions: z.number(),
  total_valid_induction_sessions: z.number(),
  total_expired_induction_sessions: z.number(),
  total_failed_induction_sessions: z.number(),
  total_unique_inductees: z.number(),

  // from metric_users_view
  total_users: z.number(),
  total_confirmed_users: z.number(),
  total_unconfirmed_users: z.number(),
});

export type SuperAdmin__MetricsSchema = z.infer<
  typeof SuperAdmin__MetricsSchema
>;

export const userMetricsSchema = z.object({
  // from metric_sessions_view
  total_induction_sessions: z.number(),
  total_valid_induction_sessions: z.number(),
  total_expired_induction_sessions: z.number(),
  total_failed_induction_sessions: z.number(),
  total_unique_inductees: z.number(),
});

export type UserMetricsSchema = z.infer<typeof userMetricsSchema>;
