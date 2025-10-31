"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { FormFieldText } from "@/components/react-hook-form-reusable";
import { Card } from "@/components/ui/card";
import { SessionsRowViewSchema } from "@/features/types";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { useFetchById } from "../hooks/crud";

export function ReadView() {
  const { id } = useParams<{ id: string }>();
  const { data, error, refetch } = useFetchById(id);
  const form = useForm<SessionsRowViewSchema>({
    values: data
      ? {
          ...data,
        }
      : undefined,
  });

  return (
    <div className="space-y-4">
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}
      <div className="flex flex-col md:flex-col gap-4">
        <Card className="w-full max-w-xl p-4">
          <FormProvider {...form}>
            <form className="space-y-4">
              <FormFieldText
                control={form.control}
                name="induction_title"
                label="Course Title"
                readOnly
              />
              <FormFieldText
                control={form.control}
                name="session_has_passed_formatted"
                label="Has Passed?"
                readOnly
              />{" "}
              <FormFieldText
                control={form.control}
                name="session_valid_until_formatted"
                label="Valid Until"
                readOnly
              />
              <FormFieldText
                control={form.control}
                name="session_created_at_formatted"
                label="Created At"
                readOnly
              />
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
}
