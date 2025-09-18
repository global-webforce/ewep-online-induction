// components/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <Button variant="outline" size="icon" onClick={() => router.back()}>
      <ArrowLeftIcon />
      <span className="sr-only">Back</span>
    </Button>
  );
}
