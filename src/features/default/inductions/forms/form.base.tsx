import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { SelectInput } from "@/components/react-hook-form-reusable/select-input";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../types/form";

export default function FormBase() {
  const { control } = useFormContext<FormSchema>();
  return (
    <>
      <FormField control={control} type="text" name="title" label="Title" />
      <FormField
        control={control}
        type="text"
        name="description"
        label="Description"
      />
      <FormField
        control={control}
        type="number"
        name="validity_days"
        label="Validity"
      />

      <SelectInput
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
