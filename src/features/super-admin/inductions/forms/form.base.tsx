import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { NumberInput } from "@/components/react-hook-form-reusable/number-input";
import { SelectInput } from "@/components/react-hook-form-reusable/select-input";
import { TextAreaInput } from "@/components/react-hook-form-reusable/text-area-input";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../types/form";

export default function FormBase() {
  const { control } = useFormContext<FormSchema>();
  return (
    <>
      <FormField control={control} type="text" name="title" label="Title" />
      <TextAreaInput control={control} name="description" label="Description" />

      <NumberInput
        control={control}
        type="number"
        name="validity_days"
        label="Days of Validity (if applicable)"
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
