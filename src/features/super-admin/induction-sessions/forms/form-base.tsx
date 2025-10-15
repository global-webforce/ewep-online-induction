import {
  FormFieldDateNullable,
  FormFieldSelect,
  FormFieldText,
} from "@/components/react-hook-form-reusable";
import { useInductionSessionForm } from "../hooks/crud";
export default function FormBase() {
  const {
    formContext: { control },
  } = useInductionSessionForm();
  return (
    <>
      <FormFieldText control={control} name="user_id" label="User ID" />
      <FormFieldText
        control={control}
        name="induction_id"
        label="Induction ID"
      />

      <FormFieldSelect
        control={control}
        name="status"
        options={[
          { value: "passed", label: "Passed" },
          { value: "failed", label: "Failed" },
        ]}
      ></FormFieldSelect>

      <FormFieldDateNullable
        label="Valid Until"
        control={control}
        name="valid_until"
      />
    </>
  );
}
