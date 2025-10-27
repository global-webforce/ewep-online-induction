import {
  userCreateFormSchema,
  UserCreateFormSchema,
  userRowViewSchema,
  UserRowViewSchema,
  userUpdateFormSchema,
  UserUpdateFormSchema,
} from "@/features/auth-types";

export const baseUrl = "/dashboard/users/";

export type R = UserRowViewSchema;
export type C = UserCreateFormSchema;
export type U = UserUpdateFormSchema;

export const queryKey = "user_view";

export const rowSchema = userRowViewSchema;
export const createSchema = userCreateFormSchema;
export const updateSchema = userUpdateFormSchema;

export const message = {
  createSuccess: "User has been created.",
  createFailed: "Failed to create user.",
  updateSuccess: "User has been updated.",
  updateFailed: "Failed to update user.",
};
