import {
  FormFieldDateNullable,
  FormFieldText,
} from "@/components/react-hook-form-reusable";
import {} from "@/components/react-hook-form-reusable/form-field-date-nullable";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../types/form";
export default function FormBase() {
  const { control } = useFormContext<FormSchema>();
  return (
    <>
      <FormFieldText control={control} name="user_id" label="User ID" />
      <FormFieldText
        control={control}
        name="induction_id"
        label="Induction ID"
      />

      <FormFieldDateNullable
        label="Valid Until"
        control={control}
        name="valid_until"
      />
    </>
  );
}
