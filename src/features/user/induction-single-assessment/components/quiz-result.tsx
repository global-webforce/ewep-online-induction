import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

export function QuizResult({
  score,
  correct,
  total,
  hasPassed,
  passingRate,
  onRetry,
}: any) {
  const percentage = Math.round(score * 100);

  return (
    <Card className="max-w-md mx-auto text-center py-8 px-6 shadow-md">
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
            hasPassed ? "text-green-600" : "text-red-600"
          }`}
        >
          {hasPassed ? "Congratulations!" : "Better Luck Next Time"}
        </h2>

        <p className="text-gray-600">
          You answered <strong>{correct}</strong> out of{" "}
          <strong>{total}</strong> questions correctly.
        </p>

        <p className="text-gray-500 text-sm">
          Score: <strong>{percentage}%</strong> &nbsp;|&nbsp; Passing Rate:{" "}
          <strong>{Math.round(passingRate * 100)}%</strong>
        </p>

        <div className="mt-4 text-sm text-muted-foreground max-w-sm">
          {hasPassed ? (
            <p>
              Great work! You've successfully passed this assessment. Keep up
              the momentum.
            </p>
          ) : (
            <p>
              Don't worry — review the material and try again. You're getting
              closer every time.
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center mt-4">
        <Button variant="outline" onClick={onRetry}>
          {hasPassed ? "Retake for Practice" : "Try Again"}
        </Button>
      </CardFooter>
    </Card>
  );
}
