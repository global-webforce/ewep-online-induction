import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

type CheckboxInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> &
  ComponentPropsWithoutRef<"input"> & {
    label?: string | ReactNode;
  };

export function CheckboxInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({ name, required, control, label }: CheckboxInputProps<T, U>) {
  return (
    <FormField
      control={control}
      name={name}
      key={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
          <FormControl>
            <Checkbox
              {...field}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>

          <FormLabel className="space-y-1 leading-none">
            {typeof label === "string"
              ? label.charAt(0).toUpperCase() + label.slice(1) // Capitalize if it's a string
              : label}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
