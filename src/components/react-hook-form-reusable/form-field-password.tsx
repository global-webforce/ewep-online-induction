import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Button } from "../ui/button";
import { FormControl, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormFieldPasswordProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  toggleVisibility?: boolean; // optional toggle
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "onChange" | "ref" | "type"
>;

export function FormFieldPassword<T extends FieldValues>({
  control,
  name,
  label,
  toggleVisibility = false,
  ...inputProps
}: FormFieldPasswordProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <Label htmlFor={name}>{label}</Label>}
          <FormControl>
            <div className="relative">
              <Input
                id={name}
                type={showPassword ? "text" : "password"}
                {...inputProps}
                value={field.value || ""}
                onChange={(e) => {
                  field.onChange(
                    e.target.value.trim() === "" ? undefined : e.target.value
                  );
                }}
                className={toggleVisibility ? "pr-10" : ""}
              />
              {toggleVisibility && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
