import {
  FormFieldEmail,
  FormFieldPassword,
  FormFieldText,
} from "@/components/react-hook-form-reusable";
import { FormFieldTriBoolean } from "@/components/react-hook-form-reusable/form-field-boolean";
import { useUserForm } from "../hooks/crud";

export default function FormBase() {
  const {
    formContext: { control, formState },
  } = useUserForm();

  return (
    <>
      <FormFieldEmail control={control} name="email" label="Email" />
      <FormFieldText control={control} name="first_name" label="First Name" />
      <FormFieldText control={control} name="last_name" label="Last Name" />

      <FormFieldPassword
        autoComplete="new-password"
        toggleVisibility={true}
        control={control}
        name="password"
        label="Password"
      />

      <FormFieldTriBoolean
        readOnly={formState.defaultValues?.confirmed}
        name="confirmed"
        control={control}
        label="User Verified?"
      />
    </>
  );
}
