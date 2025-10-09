import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControl, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormFieldTextProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "onChange" | "ref" | "type"
>;

export function FormFieldText<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: FormFieldTextProps<T>) {
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
              type="text"
              {...inputProps}
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
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
