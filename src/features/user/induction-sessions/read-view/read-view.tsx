"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { FormFieldText } from "@/components/react-hook-form-reusable";
import { Card } from "@/components/ui/card";
import { SessionUserViewRowSchema } from "@/features/types";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { useFetchById } from "../hooks/crud";

export function ReadView() {
  const { id } = useParams<{ id: string }>();
  const { data, error, refetch } = useFetchById(id);
  const form = useForm<SessionUserViewRowSchema>({
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
                label="Induction Title"
                readOnly
              />
              <FormFieldText
                control={form.control}
                name="status"
                label="Status"
                readOnly
              />
              <FormFieldText
                control={form.control}
                name="created_at"
                label="Taken At"
                readOnly
              />
              <FormFieldText
                control={form.control}
                name="valid_until"
                label="Valid Until"
                readOnly
              />
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
}
