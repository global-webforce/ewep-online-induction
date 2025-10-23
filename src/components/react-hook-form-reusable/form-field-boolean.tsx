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
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

type FormFieldTriBooleanProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> & {
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export function FormFieldTriBoolean<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({
  name,
  control,
  label,
  disabled,
  readOnly = false,
}: FormFieldTriBooleanProps<T, U>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value; // true | false | null | undefined

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div
                className={readOnly ? "pointer-events-none opacity-80" : ""}
                onClick={(e) => readOnly && e.preventDefault()}
              >
                <Select
                  disabled={disabled}
                  value={
                    value === true ? "true" : value === false ? "false" : "null" // default
                  }
                  onValueChange={(v) => {
                    if (!readOnly) {
                      if (v === "true") field.onChange(true);
                      else if (v === "false") field.onChange(false);
                      else field.onChange(null); // tri-state
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Yes / No / None" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem disabled value="null">
                      — None —
                    </SelectItem>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
