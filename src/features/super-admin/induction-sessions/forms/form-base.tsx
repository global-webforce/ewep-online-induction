import {
  FormFieldDateNullable,
  FormFieldSelect,
} from "@/components/react-hook-form-reusable";
import { FormFieldTriBoolean } from "@/components/react-hook-form-reusable/form-field-boolean";
import { useFetchAll as useFetchAllInductions } from "@/features/super-admin/inductions";
import { useFetchAll as useFetchAllUsers } from "@/features/super-admin/users";
import { useInductionSessionForm } from "../hooks/crud";

export default function FormBase() {
  const {
    formContext: { control },
  } = useInductionSessionForm();

  const { data: users } = useFetchAllUsers();
  const { data: inductions } = useFetchAllInductions();
  return (
    <>
      {/*  <FormFieldText control={control} name="user_id" label="User ID" />
       */}
      <FormFieldSelect
        control={control}
        name="user_id"
        label="User ID"
        readOnly={users == null || users?.length <= 0}
        options={[
          ...(users?.map((e) => ({ value: e.id, label: e.email })) ?? []),
        ]}
      />

      <FormFieldSelect
        control={control}
        name="induction_id"
        label="Induction ID"
        readOnly={inductions == null || inductions?.length <= 0}
        options={[
          ...(inductions?.map((e) => ({ value: e.id, label: e.title })) ?? []),
        ]}
      />

      <FormFieldTriBoolean
        control={control}
        name="has_passed"
        label="Has Passed?"
      />

      <FormFieldDateNullable
        label="Valid Until"
        control={control}
        name="valid_until"
      />
    </>
  );
}
