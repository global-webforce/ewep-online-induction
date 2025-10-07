import { FormField } from "@/components/react-hook-form-reusable/form-field";
import { SelectInput } from "@/components/react-hook-form-reusable/select-input";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../types/form";
import { NumberInput } from "@/components/react-hook-form-reusable/number-input";
import { TextAreaInput } from "@/components/react-hook-form-reusable/text-area-input";

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
      <TextAreaInput
        control={control}
        name="description"
        label="Description"
        readOnly
      />

      <NumberInput
        control={control}
        type="number"
        name="validity_days"
        label="Days of Validity (if applicable)"
        readOnly
      />
    </>
  );
}
