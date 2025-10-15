"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Split into segments, removing empty ones
  const segments = pathname.split("/").filter(Boolean);

  // If at top-level (like /dashboard/inductions), don't show
  const isTopPage = segments.length <= 2;

  const handleBack = () => {
    if (segments.length > 2) {
      // Remove last segment and rebuild the path
      const newPath = "/" + segments.slice(0, -1).join("/");
      router.push(newPath);
    } else {
      router.push("/dashboard"); // fallback
    }
  };

  if (isTopPage) return null;

  return (
    <Button variant="outline" size="icon" onClick={handleBack}>
      <ArrowLeftIcon />
      <span className="sr-only">Back</span>
    </Button>
  );
}
