import {
  FormFieldNumberNullable,
  FormFieldSelect,
  FormFieldText,
  FormFieldTextArea,
} from "@/components/react-hook-form-reusable";
import { useFormDataContext } from "../hooks/crud";

export default function FormBase() {
  const { control } = useFormDataContext();
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
