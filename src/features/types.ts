import z from "zod";

const id = z.uuid();
const datetime = z.iso.datetime({ offset: true });
const non_empty_string = z.string().trim().min(1);

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

// Inductions

export const inductionRowSchema = z.object({
  id: id,
  title: non_empty_string,
  description: z.string(),
  validity_days: z.number().int().nonnegative().nullable(),
  status: z.enum(["draft", "published"]),
  created_at: datetime,
});

export const inductionTableSchema = z.array(inductionRowSchema);

export const inductionFormSchema = inductionRowSchema.omit({
  id: true,
  created_at: true,
});

export type InductionRowSchema = z.infer<typeof inductionRowSchema>;
export type InductionTableSchema = z.infer<typeof inductionTableSchema>;
export type InductionFormSchema = z.infer<typeof inductionFormSchema>;

// Sessions

export const sessionRowSchema = z.object({
  id: id,
  user_id: id,
  induction_id: id,
  status: z.enum(["passed", "failed"]),
  valid_until: z.iso.date().nullable(),
  created_at: datetime,
});

export const sessionFormSchema = sessionRowSchema.omit({
  id: true,
  created_at: true,
});

export const sessionTableSchema = z.array(sessionRowSchema);

export const sessionsSuperAdminRowView = sessionRowSchema.extend({
  user_email: userRowSchema.shape.email,
  induction_title: inductionRowSchema.shape.title,
});

export const sessionsSuperAdminView = z.array(sessionsSuperAdminRowView);

export type SessionRowSchema = z.infer<typeof sessionRowSchema>;
export type SessionTableSchema = z.infer<typeof sessionTableSchema>;
export type SessionFormSchema = z.infer<typeof sessionFormSchema>;

export type SessionsSuperAdminRowView = z.infer<
  typeof sessionsSuperAdminRowView
>;
export type SessionsSuperAdminView = z.infer<typeof sessionsSuperAdminView>;

//Super Admin Metrics
export const superAdminMetricsSchema = z.object({
  total_inductions: z.number(),
  total_published_inductions: z.number(),
  total_draft_inductions: z.number(),
  total_default_users: z.number(),
});

export type SuperAdminMetricsSchema = z.infer<typeof superAdminMetricsSchema>;

/*******************/

// Inductions User View
export const inductionsUserView = z.array(
  inductionRowSchema.extend({
    session_id: sessionRowSchema.shape.id.nullable(),
    session_status: sessionRowSchema.shape.status.nullable(),
    session_valid_until: sessionRowSchema.shape.valid_until.nullable(),
    session_is_expired: z.boolean().nullable(),
  })
);
export type InductionsUserView = z.infer<typeof inductionsUserView>;

//Session User View
export const sessionsUserView = z.array(
  sessionRowSchema.extend({
    induction_title: inductionRowSchema.shape.title,
  })
);

export type SessionsUserView = z.infer<typeof sessionsUserView>;
