import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
};

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1.5">
          {label && <Label htmlFor={name}>{label}</Label>}

          <Input id={name} type={type} placeholder={placeholder} {...field} />
          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}

/*USAGE*/

/*

<FormField
  control={form.control}
  name="email"
  label="Email"
  placeholder="you@example.com"
  type="email"
/>

<FormField
  control={form.control}
  name="role"
  label="Role"
  render={({ value, onChange }) => (
    <Select value={value} onValueChange={onChange}>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="user">User</SelectItem>
    </Select>
  )}
/>


*/
