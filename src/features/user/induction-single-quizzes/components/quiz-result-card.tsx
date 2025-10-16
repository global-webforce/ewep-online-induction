"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle } from "lucide-react";
import { QuizResultCardProps } from "../types/quiz-schemas";

type QuizResultDialogProps = QuizResultCardProps & {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function QuizResultDialog({
  open,
  setOpen,
  result: { score, correct, total, hasPassed, passingRate },
  onRetry,
}: QuizResultDialogProps) {
  const percentage = Math.round(score * 100);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* ✅ Accessibility requirement */}
        <DialogHeader className="sr-only">
          <DialogTitle>Assessment Result</DialogTitle>
          <DialogDescription>Quiz result summary and actions</DialogDescription>
        </DialogHeader>

        <Card className="text-center py-8 px-6 border-none shadow-none bg-background text-foreground">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Assessment Result
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4">
            {hasPassed ? (
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500" />
            )}

            <h2
              className={`text-xl font-bold ${
                hasPassed
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {hasPassed ? "Congratulations!" : "Better Luck Next Time"}
            </h2>

            <p className="text-muted-foreground">
              You answered <strong>{correct}</strong> out of{" "}
              <strong>{total}</strong> questions correctly.
            </p>

            <p className="text-sm text-muted-foreground">
              Score: <strong>{percentage}%</strong> &nbsp;|&nbsp; Passing Rate:{" "}
              <strong>{Math.round(passingRate * 100)}%</strong>
            </p>

            <div className="mt-4 text-sm text-muted-foreground max-w-sm">
              {hasPassed ? (
                <p>
                  Great work! You&apos;ve successfully passed this assessment.
                  Keep up the momentum.
                </p>
              ) : (
                <p>
                  Don&apos;t worry — review the material and try again.
                  You&apos;re getting closer every time.
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-3 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={onRetry}>
              {hasPassed ? "Retake for Practice" : "Try Again"}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
