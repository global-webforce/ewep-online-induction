import React from "react";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../types";
import { FormField } from "@/components/react-hook-form-reusable/form-field";

export default function Form() {
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
    </>
  );
}
