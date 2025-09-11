import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

interface LoadingButtonProps extends ButtonProps {
  pending: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export default function LoadingButton({
  pending,
  children,
  type,
  ...props
}: LoadingButtonProps) {
  const finalType =
    type ?? (props.onClick || (props as any).formAction ? "button" : "submit");

  return (
    <Button
      type={finalType}
      disabled={pending || props.disabled}
      aria-busy={pending}
      {...props}
    >
      {pending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {children}
    </Button>
  );
}
