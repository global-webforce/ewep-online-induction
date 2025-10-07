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
import { cn } from "@/utils/utils";

type TextareaInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> &
  ComponentPropsWithoutRef<"textarea"> & {
    label?: string | ReactNode;
    required?: boolean;
    readOnly?: boolean;
  };

export function TextareaInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({
  label,
  required,
  name,
  control,
  rules,
  placeholder,
  readOnly = false,
  ...props
}: TextareaInputProps<T, U>) {
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
            <Textarea
              {...field}
              placeholder={placeholder}
              readOnly={readOnly}
              className={cn(
                "min-h-[100px] w-full resize-y",
                readOnly && "bg-muted cursor-not-allowed opacity-80"
              )}
              onChange={(e) => {
                if (!readOnly) field.onChange(e);
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
