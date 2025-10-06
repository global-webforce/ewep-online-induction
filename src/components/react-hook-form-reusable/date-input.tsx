import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { CalendarIcon, XIcon } from "lucide-react";
import { format } from "date-fns";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  useRef,
  useCallback,
} from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { cn } from "@/utils/utils";

type DateInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "control" | "rules"> &
  ComponentPropsWithoutRef<"input"> & {
    label?: string | ReactNode;
    required?: boolean;
  };

export function DateInput<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>
>({ label, required, name, control, rules }: DateInputProps<T, U>) {
  const popOverRef = useRef<HTMLButtonElement | null>(null);

  const handleDateSelect = useCallback(
    (date: Date | undefined, onChange: (value: any) => void) => {
      if (!date) return;
      onChange(date.toISOString());
      popOverRef.current?.click();
    },
    []
  );

  return (
    <FormField
      control={control}
      name={name}
      key={name}
      rules={rules}
      render={({ field }) => {
        const selectedDate = field.value ? new Date(field.value) : undefined;

        const handleClear = () => field.onChange(undefined);

        const displayLabel =
          typeof label === "string"
            ? label.charAt(0).toUpperCase() + label.slice(1)
            : label || name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <FormItem>
            <FormLabel className="space-y-1 leading-none">
              {displayLabel}
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>

            <FormControl>
              <Popover modal>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal flex items-center justify-between",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <span>
                      {selectedDate
                        ? format(selectedDate, "PPP")
                        : "Pick a date"}
                    </span>
                    <CalendarIcon className="h-4 w-4 opacity-60" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <PopoverClose ref={popOverRef} />
                  <div className="p-2">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) =>
                        handleDateSelect(date, field.onChange)
                      }
                    />
                    <div className="flex justify-end mt-2 px-2">
                      <Button variant="ghost" size="sm" onClick={handleClear}>
                        Clear
                      </Button>
                    </div>
                  </div>
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
