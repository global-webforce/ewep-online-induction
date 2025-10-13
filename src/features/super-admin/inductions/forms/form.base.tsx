import {
  FormFieldNumberNullable,
  FormFieldSelect,
  FormFieldText,
  FormFieldTextArea,
} from "@/components/react-hook-form-reusable";

import { useFormContext } from "react-hook-form";
import { FormSchema } from "../types/form";

export default function FormBase() {
  const { control } = useFormContext<FormSchema>();
  return (
    <>
      <FormFieldText control={control} name="title" label="Title" />
      <FormFieldTextArea
        control={control}
        name="description"
        label="Description"
      />

      <FormFieldNumberNullable
        control={control}
        type="number"
        name="validity_days"
        label="Days of Validity (if applicable)"
      />

      <FormFieldSelect
        name="status"
        control={control}
        options={[
          { value: "draft", label: "Draft" },
          { value: "published", label: "Published" },
        ]}
      />
    </>
  );
}
