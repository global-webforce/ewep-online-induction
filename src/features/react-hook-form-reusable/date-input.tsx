import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ReactNode, useRef } from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import type { DayPickerProps } from "react-day-picker";

type DateInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> & {
  label?: string | ReactNode;
} & Omit<DayPickerProps, "mode" | "selected" | "onSelect">;

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function DateInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({ label, required, name, control, rules, ...rest }: DateInputProps<T, U>) {
  const popOverRef = useRef<HTMLButtonElement | null>(null);

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        const selectedDate = field.value ? new Date(field.value) : undefined;

        return (
          <FormItem>
            <FormLabel className="space-y-1 leading-none">
              {typeof label === "string"
                ? capitalize(label)
                : label ?? capitalize(name)}
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>

            <FormControl>
              <Popover modal>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    aria-label="Select date"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <PopoverClose ref={popOverRef} />
                  <Calendar
                    {...rest}
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      field.onChange(date ?? null);
                      popOverRef.current?.click();
                    }}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
