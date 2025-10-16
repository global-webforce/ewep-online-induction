"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { FormFieldText } from "@/components/react-hook-form-reusable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SessionUserViewRowSchema } from "@/features/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useFetchById } from "../hooks/crud";

export function ReadView() {
  const { id } = useParams<{ id: string }>();
  const { data, error, refetch } = useFetchById(id);
  const form = useForm<SessionUserViewRowSchema>({
    values: data || undefined,
  });

  const [agreed, setAgreed] = useState(false);
  return (
    <div className="space-y-4">
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <Card className="w-full p-4">
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
              name="valid_until"
              label="Valid Until"
              readOnly
            />
            <FormFieldText
              control={form.control}
              name="status"
              label="Status"
              readOnly
            />
          </form>
        </FormProvider>
      </Card>
      {data && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Start Induction</CardTitle>
            <CardDescription>
              Please confirm you agree to the terms before starting your
              induction presentation.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex items-start space-x-3">
            <Checkbox
              id="agreement"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(!!checked)}
            />
            <label
              htmlFor="agreement"
              className="text-sm leading-tight  cursor-pointer select-none"
            >
              By taking this induction, I agree to comply with all company
              policies and safety procedures as outlined in the induction
              materials.
            </label>
          </CardContent>

          {agreed && (
            <CardFooter>
              <Button asChild>
                <Link href={`/dashboard/inductions/${id}/resources`}>
                  <span>Start Induction</span>{" "}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  );
}
