import React from "react";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../../types";
import { FormField } from "@/components/react-hook-form-reusable/form-field";

export default function Form() {
  const { control } = useFormContext<FormSchema>();
  return (
    <>
      <FormField
        control={control}
        type="text"
        name="first_name"
        label="First Name"
      />
      <FormField
        control={control}
        type="text"
        name="last_name"
        label="Last Name"
      />
    </>
  );
}
