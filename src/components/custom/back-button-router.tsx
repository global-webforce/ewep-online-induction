// components/BackButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function BackButtonRouter() {
  const router = useRouter();

  const pathname = usePathname();

  // Split into segments, remove empty ones
  const segments = pathname.split("/").filter(Boolean);

  // Show only if there are exactly 2 segments
  const isTopPage = segments.length === 2;

  return !isTopPage ? (
    <Button variant="outline" size="icon" onClick={() => router.back()}>
      <ArrowLeftIcon />
      <span className="sr-only">Back</span>
    </Button>
  ) : (
    <></>
  );
}
