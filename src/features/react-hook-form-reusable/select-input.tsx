import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

type SelectInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> &
  ComponentPropsWithoutRef<"select"> & {
    options: { value: string; label: string }[] | undefined;
    label?: string | ReactNode;
    onValueChange?: (e: string) => void;
  };

export function SelectInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({
  name,
  required,
  control,
  options = [],
  label,
  disabled,
  onValueChange,
}: SelectInputProps<T, U>) {
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
            <Select
              {...field}
              disabled={disabled}
              onValueChange={(e) => {
                field.onChange(e);
                onValueChange && onValueChange(e);
              }}
              value={field.value || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder={"Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem
                    id={option.value}
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
