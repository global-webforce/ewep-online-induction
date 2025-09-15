"use client";

import { Card } from "@/components/ui/card";
import { FormField } from "@/features/react-hook-form-reusable/form-field";
import LoadingButton from "@/features/react-hook-form-reusable/form-submit";
import { SimpleAlert } from "@/features/shared/ui/simple-alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { profileUpdateAction } from "./action";
import { ProfileInput, profileInputSchema } from "./schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfileForm({ data }: { data?: ProfileInput }) {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: ProfileInput) => profileUpdateAction(values),
    onError: (error, _) => {
      toast.error(error.message);
      form.reset(data);
    },
    onSuccess: (_, data) => {
      toast.success("Profile has been updated.");
      form.reset(data);
    },
  });

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileInputSchema),
    defaultValues: data,
  });

  return (
    <>
      <Card className="w-full max-w-lg p-6 ">
        <div>
          <b>Basic Information</b>
          <p className="text-sm text-muted-foreground">
            Update your basic profile information.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit((values) => mutate(values))}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            type="text"
            name="firstName"
            label="First Name"
          />

          <FormField
            control={form.control}
            type="text"
            name="lastName"
            label="Last Name"
          />

          <LoadingButton
            type="submit"
            className="w-full"
            disabled={!form.formState.isDirty}
            pending={isPending}
          >
            Update Profile
          </LoadingButton>
        </form>
      </Card>
    </>
  );
}
