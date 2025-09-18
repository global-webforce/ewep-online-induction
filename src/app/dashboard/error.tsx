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
    <Card className="flex h-full w-full  items-center justify-center">
      <div className="max-w-lg min-w-lg items-center justify-center p-6">
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-center text-xl font-bold">
            Something went wrong!
          </h1>
          <p className="text-center text-sm">{error.message}</p>
        </div>

        <Button variant={"outline"} onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </Card>
  );
}
