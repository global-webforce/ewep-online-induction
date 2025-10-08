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

type NumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> &
  ComponentPropsWithoutRef<"input"> & {
    label?: string | ReactNode;
    required?: boolean;
  };

export function NumberInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({ label, required, name, control, rules, ...props }: NumberInputProps<T, U>) {
  const displayLabel =
    typeof label === "string"
      ? label.charAt(0).toUpperCase() + label.slice(1)
      : label || name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <FormField
      control={control}
      name={name}
      key={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="space-y-1 leading-none">
            {displayLabel}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>

          <FormControl>
            <Input
              type="number"
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(
                  Number(e.target.value) === 0 ? null : Number(e.target.value)
                );
              }}
              {...props}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
