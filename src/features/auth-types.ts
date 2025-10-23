import { User } from "@supabase/supabase-js";
import z from "zod";

const datetime = z.iso.datetime({ offset: true });
const non_empty_string = z
  .string({ error: "Required" })
  .trim()
  .min(1, { error: "Required" });

const password = z
  .string()
  .min(8, { message: "Must have at least 8 characters" });

export const confirm_password = z.object({
  password: password,
  confirm_password: z.string(),
});

export function mapUser(user: User): UserSchema {
  return <UserSchema>{
    id: user.id,
    email: user.email!,
    app_role: user.app_metadata.app_role,
    confirmed_at: user?.confirmed_at || null,
    created_at: user?.created_at,
    profile: {
      first_name: user?.user_metadata?.first_name,
      last_name: user?.user_metadata?.last_name,
    },
  };
}

export function mapUser__(user: User) {
  return <User__RowSchema>{
    id: user.id,
    email: user.email!,
    app_role: user?.app_metadata?.app_role,
    first_name: user?.user_metadata?.first_name,
    last_name: user?.user_metadata?.last_name,
    confirmed_at: user?.confirmed_at || null,
    created_at: user?.created_at,
  };
}

//Base User
export const baseUserSchema = {
  id: z.uuid(),
  email: z.email(),
  confirmed_at: datetime.nullable(),
  created_at: datetime,
};

// Super Admin Profile
export const superAdmin__ProfileSchema = z.object({
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
});
export type SuperAdmin__ProfileSchema = z.infer<
  typeof superAdmin__ProfileSchema
>;

//>> User Profile
export const user__ProfileSchema = z.object({
  first_name: non_empty_string,
  last_name: non_empty_string,
});

export type User__ProfileSchema = z.infer<typeof user__ProfileSchema>;
//<<

//>> Users View
export const userSchema = z.discriminatedUnion("app_role", [
  z.object({
    ...baseUserSchema,
    app_role: z.literal("super_admin"),
    profile: superAdmin__ProfileSchema,
  }),
  z.object({
    ...baseUserSchema,
    app_role: z.literal("user"),
    profile: user__ProfileSchema,
  }),
]);

export type UserSchema = z.infer<typeof userSchema>;
//<<

export const user__rowSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  app_role: z.literal("user"),
  first_name: non_empty_string,
  last_name: non_empty_string,
  confirmed_at: datetime.nullable(),
  created_at: datetime.optional(),
});

export type User__RowSchema = z.infer<typeof user__rowSchema>;

export const user__RowViewSchema = user__rowSchema.transform((u) => ({
  ...u,
  confirmed: u?.confirmed_at != null ? true : false,
  password: "",
}));

export type User__RowViewSchema = z.infer<typeof user__RowViewSchema>;

//>> User Role Form
export const user__FormSchema = user__rowSchema
  .omit({
    id: true,
    created_at: true,
    confirmed_at: true,
  })
  .extend({
    confirmed: z.boolean().optional(),
    password: z.string().optional(),
  });

export type User__FormSchema = z.infer<typeof user__FormSchema>;
//<<

//>> Sign In
export const signInInputSchema = z.object({
  email: z.email(),
  password: password,
});

export type SignInInput = z.infer<typeof signInInputSchema>;
//<<

//>> Sign Up
export const signUpInputSchema = z
  .object({
    email: z.email(),
    ...user__ProfileSchema.shape,
    ...confirm_password.shape,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type SignUpInput = z.infer<typeof signUpInputSchema>;
//<<

//>> Reset Password
export const resetPasswordInputSchema = confirm_password.refine(
  (data) => data.password === data.confirm_password,
  {
    message: "Passwords do not match",
    path: ["confirm_password"],
  }
);
export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
//<<

//>> Forgot Password
export const emailInputSchema = z.object({
  email: z.email(),
});
export type EmailInput = z.infer<typeof emailInputSchema>;
//<<
