import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControl, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// ✅ Helper: safely check if a value is a Date
function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

type FormFieldDateProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "onChange" | "ref" | "type"
>;

export function FormFieldDate<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: FormFieldDateProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-1.5 w-full">
          {label && <Label htmlFor={name}>{label}</Label>}
          <FormControl>
            <Input
              id={name}
              type="date"
              {...inputProps}
              value={field.value || ""}
              onChange={(e) => {
                const val = e.target.value;
                field.onChange(val.trim() !== "" ? val : null);
              }}
            />
          </FormControl>
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
