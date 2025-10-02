"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/react-hook-form-reusable/form-field";
import LoadingButton from "@/components/react-hook-form-reusable/form-submit";
import { User } from "@/features/auth/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { profileUpdateAction } from "./action";
import { ProfileInput, profileInputSchema } from "./schema";

export default function ProfileForm({ user }: { user?: User }) {
  const { mutate, isPending } = useMutation({
    mutationFn: (values: ProfileInput) => profileUpdateAction(values),
    onError: (error) => {
      toast.error(error.message);
      form.reset(user?.profile);
    },
    onSuccess: (_, data) => {
      toast.success("Profile has been updated.");
      form.reset(data);
    },
  });

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileInputSchema),
    defaultValues: user?.profile,
  });

  return (
    <div className="space-y-4">
      <Card className="w-full p-4">
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
            className="w-min"
            disabled={!form.formState.isDirty}
            pending={isPending}
          >
            Update Profile
          </LoadingButton>
        </form>
      </Card>

      <Card className="w-full  p-4 gap-4">
        <div>
          <b>Account Information</b>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={"email"}>Email</Label>
            <Input name="email" readOnly type="email" value={user?.email} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={"role"}>Role</Label>
            <Input value={user?.app_role} readOnly type="text" />
          </div>
        </div>
      </Card>
    </div>
  );
}
