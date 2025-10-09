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

type FormFieldSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> &
  ComponentPropsWithoutRef<"select"> & {
    options: { value: string; label: string }[] | undefined;
    label?: string | ReactNode;
    readOnly?: boolean;
  };

export function FormFieldSelect<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({
  name,
  required,
  control,
  options = [],
  label,
  disabled,
  readOnly = false,
}: FormFieldSelectProps<T, U>) {
  return (
    <FormField
      control={control}
      name={name}
      key={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="space-y-1 leading-none">
            {typeof label === "string"
              ? label.charAt(0).toUpperCase() + label.slice(1)
              : name.charAt(0).toUpperCase() + name.slice(1)}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>

          <FormControl>
            <div
              className={readOnly ? "pointer-events-none opacity-80" : ""}
              onClick={(e) => readOnly && e.preventDefault()}
            >
              <Select
                {...field}
                disabled={disabled}
                onValueChange={(e) => {
                  if (!readOnly) field.onChange(e);
                }}
                value={field.value || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="w-full">
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
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
