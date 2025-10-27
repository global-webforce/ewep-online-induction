import { User } from "@supabase/supabase-js";
import { format } from "date-fns";
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

const jsonString = z.string().pipe(
  z.preprocess((input, ctx) => {
    try {
      return JSON.parse(input);
    } catch (e) {
      ctx.issues.push({ code: "custom", message: "Invalid JSON", input });
      return z.NEVER;
    }
  }, z.json())
);

//>>
export const userProfileSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});
export type UserProfileSchema = z.infer<typeof userProfileSchema>;

//<<

//>>
export const userRowSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  app_role: z.enum(["user", "super_admin"]),
  confirmed_at: datetime.nullable(),
  created_at: datetime,
  profile: userProfileSchema,
  profile_metadata: jsonString.optional(),
});
export type UserSchema = z.infer<typeof userRowSchema>;
//<<

//>>
export const userRowViewSchema = userRowSchema.transform((user) => ({
  ...user,
  extra: {
    confirmed_at: user.confirmed_at
      ? format(new Date(user.confirmed_at), "PPp")
      : "Not Confirmed",
    created_at: user.created_at
      ? format(new Date(user.created_at), "PPp")
      : null,
  },
}));
export type UserRowViewSchema = z.infer<typeof userRowViewSchema>;
//<<

//>>
export function mapUser(user: User): UserSchema {
  return <UserSchema>{
    id: user.id,
    email: user.email!,
    app_role: user?.app_metadata?.app_role,
    confirmed_at: user?.confirmed_at || null,
    created_at: user?.created_at,
    profile: user.user_metadata,
  };
}
//<<

//>>
export const userCreateFormSchema = z.object({
  email: z.email(),
  password: password,
  first_name: non_empty_string,
  last_name: non_empty_string,
  app_role: z.enum(["user", "super_admin"]),
});
export type UserCreateFormSchema = z.infer<typeof userCreateFormSchema>;
//<<

//>>
export const userUpdateFormSchema = userCreateFormSchema.partial();
export type UserUpdateFormSchema = z.infer<typeof userUpdateFormSchema>;
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
    first_name: non_empty_string,
    last_name: non_empty_string,
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
