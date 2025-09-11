// https://github.com/orgs/react-hook-form/discussions/11939#discussioncomment-9601901

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

type TextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> &
  ComponentPropsWithoutRef<"input"> & {
    label?: string | ReactNode;
    requiredAsterisk?: boolean;
  };

export function TextInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({
  label,
  required,
  name,
  control,
  rules,
  type,
  onChange,
  onBlur,

  ...rest
}: TextInputProps<T, U>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const fieldName =
          typeof label === "string"
            ? label.charAt(0).toUpperCase() + label.slice(1)
            : name.charAt(0).toUpperCase() + name.slice(1);
        return (
          <FormItem>
            <FormLabel className="space-y-1 leading-none">
              {fieldName}
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>
            <FormControl>
              <Input
                key={name}
                placeholder={"Enter " + fieldName}
                {...rest}
                {...field}
                type={type}
                value={field.value ?? ""}
                onBlur={(e) => {
                  field.onBlur();
                  onBlur?.(e);
                }}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.(e);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
