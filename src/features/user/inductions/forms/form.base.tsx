import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { FormFieldNumberNullable } from "@/components/react-hook-form-reusable/form-field-number-nullable";
import { FormFieldTextArea } from "@/components/react-hook-form-reusable/form-field-textarea";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../types/form";

export default function FormBase() {
  const { control } = useFormContext<FormSchema>();
  return (
    <>
      <FormField
        control={control}
        type="text"
        name="title"
        label="Title"
        readOnly
      />
      <FormFieldTextArea
        control={control}
        name="description"
        label="Description"
        readOnly
      />

      <FormFieldNumberNullable
        control={control}
        type="number"
        name="validity_days"
        label="Days of Validity (if applicable)"
        readOnly
      />
    </>
  );
}
