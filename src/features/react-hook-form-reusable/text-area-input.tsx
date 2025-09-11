import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

type TextAreaInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> &
  ComponentPropsWithoutRef<"textarea"> & {
    label?: string | ReactNode;
  };

export function TextAreaInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({
  label,
  required,
  name,
  control,
  rules,
  onChange,
  onBlur,

  ...rest
}: TextAreaInputProps<T, U>) {
  return (
    <FormField
      control={control}
      name={name}
      key={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="space-y-1 leading-none">
            {typeof label === "string"
              ? label.charAt(0).toUpperCase() + label.slice(1) // Capitalize if it's a string
              : name.charAt(0).toUpperCase() + name.slice(1)}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              {...rest}
              {...field}
              autoComplete="off"
              placeholder={`Enter ${
                name.charAt(0).toUpperCase() + name.slice(1) || ""
              }`}
              value={field.value || ""}
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
      )}
    />
  );
}
