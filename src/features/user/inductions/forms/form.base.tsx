import {
  FormFieldNumberNullable,
  FormFieldText,
} from "@/components/react-hook-form-reusable";
import { FormFieldTextArea } from "@/components/react-hook-form-reusable/form-field-textarea";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../types/form";

export default function FormBase() {
  const { control } = useFormContext<FormSchema>();
  return (
    <>
      <FormFieldText control={control} name="title" label="Title" readOnly />
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
