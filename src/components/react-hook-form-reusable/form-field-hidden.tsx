import { Control, Controller, FieldValues, Path } from "react-hook-form";

type FormFieldHiddenProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  value?: string | number | null;
};

export function FormFieldHidden<T extends FieldValues>({
  control,
  name,
  value,
}: FormFieldHiddenProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input type="hidden" {...field} value={value ?? field.value ?? ""} />
      )}
    />
  );
}
