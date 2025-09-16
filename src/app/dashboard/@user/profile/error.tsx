"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-full w-full  items-center justify-center">
      <Card className="max-w-lg min-w-lg items-center justify-center p-6">
        <div className="flex flex-col gap-1 items-center justify-center">
          <h1 className="text-center text-xl font-bold">
            Something went wrong!
          </h1>
          <p className="text-center">{error.message}</p>
        </div>

        <Button onClick={() => reset()}>Try again</Button>
      </Card>
    </div>
  );
}
