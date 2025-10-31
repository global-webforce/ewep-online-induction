"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

type SuccessDialogProps = {
  certificateLink: string | undefined;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function InductionSuccessDialog({
  certificateLink,
  open,
  setOpen,
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Accessibility */}
        <DialogHeader className="sr-only">
          <DialogTitle>Course Complete</DialogTitle>
          <DialogDescription>
            Completion message and certificate link
          </DialogDescription>
        </DialogHeader>

        <div className="text-center py-8 px-6 bg-background text-foreground">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />

          <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400">
            Course Completed!
          </h2>

          <p className="text-muted-foreground mt-2">
            You have successfully completed the course. You may now download
            your certificate.
          </p>

          <div className="mt-6 flex justify-center">
            <Button asChild>
              <Link target="_blank" href={`/certificate/${certificateLink}`}>
                Download Certificate
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
