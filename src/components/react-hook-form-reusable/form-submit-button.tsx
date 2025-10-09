import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

interface FormSubmitButtonProps extends ButtonProps {
  isSubmitting?: boolean;
  isFormLoading?: boolean;
  loadingMessage?: string;
  children: React.ReactNode;
}

export default function FormSubmitButton({
  isSubmitting = false,
  isFormLoading = false,
  loadingMessage = "Loading data...",
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  // Always be a manual trigger button
  const finalType: "button" = "button";

  const isBusy = isSubmitting || isFormLoading;

  return (
    <Button
      type={finalType}
      disabled={isBusy || props.disabled}
      aria-busy={isBusy}
      variant={isFormLoading ? "outline" : "default"}
      className={"flex items-center"}
      {...props}
    >
      {isBusy && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {isFormLoading ? loadingMessage : children}
    </Button>
  );
}
