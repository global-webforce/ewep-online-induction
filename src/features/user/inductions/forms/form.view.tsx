"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
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
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fetchById } from "../actions/fetch-by-id";

import FormBase from "./form.base";

export function FormView() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [`inductions`, id],
    queryFn: async () => await fetchById(id),
  });

  const form = useForm({
    defaultValues: data || {
      title: "",
      description: "",
      validity_days: undefined,
      status: "draft",
    },
    values: data,
  });

  const [agreed, setAgreed] = useState(false);
  return (
    <div className="space-y-4">
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}
      {isLoading && (
        <AlertPanelState variant="loading">Loading Inductions</AlertPanelState>
      )}
      <Card className="w-full p-4">
        <FormProvider {...form}>
          <form className="flex flex-col gap-4">
            <FormBase />
          </form>
        </FormProvider>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Start Induction</CardTitle>
          <CardDescription>
            Please confirm you agree to the terms before starting your induction
            presentation.
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
            <Button asChild className="">
              <Link href={`/dashboard/inductions/${id}/session`}>
                <span>Start Induction</span>
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
