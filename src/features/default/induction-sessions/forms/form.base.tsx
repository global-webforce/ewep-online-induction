import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { FormFieldDate } from "@/components/react-hook-form-reusable/form-field-date";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../types/form";
export default function FormBase() {
  const { control } = useFormContext<FormSchema>();
  return (
    <>
      <FormField control={control} type="text" name="user_id" label="User ID" />
      <FormField
        control={control}
        type="text"
        name="induction_id"
        label="Induction ID"
      />

      <FormFieldDate label="Valid Until" control={control} name="valid_until" />
    </>
  );
}
