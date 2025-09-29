import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "onChange" | "ref"
>;

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1.5">
          {label && <Label htmlFor={name}>{label}</Label>}

          <Input id={name} {...field} {...inputProps} />
          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
