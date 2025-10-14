import { object, ZodObject, ZodType } from "zod/v4";
import { $strip } from "zod/v4/core";

// --- Type helpers ---

// Checks for extra keys in schema not defined in the model
type ExtraKeys<Schema, Model> = Exclude<keyof Schema, keyof Model>;

// If there are extra keys, raise a type error
type ThrowIfExtraKeys<Schema, Model> = ExtraKeys<Schema, Model> extends never
  ? unknown
  : { [key: string]: never };

// --- Main utility function ---
export function withZodSchema<Model>() {
  return <
    Schema extends { [K in keyof Model]: ZodType<Model[K]> } & ThrowIfExtraKeys<
      Schema,
      Model
    >
  >(
    schema: Schema
  ): ZodObject<Schema, $strip> => {
    return object(schema);
  };
}
