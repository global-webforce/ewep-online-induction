"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { useQuery } from "@tanstack/react-query";
import { useQuizController } from "./hook/use-quiz-controller";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "./components/confirm-quiz-dialog";

import PresentationLayout from "@/components/presentation/layout";
import { CheckCircle } from "lucide-react";
import { fetchById } from "./actions/fetch-by-id";
import { QuizForm } from "./components/quiz-form";
import { QuizResult } from "./components/quiz-result";
import { UnansweredDialog } from "./components/unanswered-quizzes-dialog";

export default function QuizPresenter() {
  const { id } = useParams<{ id: string }>();

  const { data, error, refetch } = useQuery({
    queryKey: ["induction_single_quizzes_user_view"],
    queryFn: async () => await fetchById(id),
  });

  const {
    quizzes,
    showConfirmQuizDialog,
    showUnansweredQuizDialog,
    hasPassed,
    score,
    correct,
    total,
    passingRate,
    setShowConfirmQuizDialog,
    allAnswered,
    setShowUnansweredQuizDialog,
  } = useQuizController(data || undefined);

  const [viewMode, setViewMode] = useState<"quiz" | "result" | undefined>(
    "quiz"
  );

  return (
    <>
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <PresentationLayout>
        <PresentationLayout.Body>
          {quizzes.length === 0 && (
            <Card className="  w-full ">
              <CardHeader>
                <CardTitle>
                  <h1 className="text-2xl font-semibold">
                    {data?.title} Assessment
                  </h1>
                </CardTitle>
                <CardDescription>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>This induction doesn’t include an assessment.</p>
                  </div>
                </CardDescription>{" "}
              </CardHeader>
            </Card>
          )}

          {data?.can_renew === false && (
            <Card className="w-full p-6">
              <div className="flex items-center gap-6 w-full">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-14 w-14 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    You already completed this induction
                  </h3>
                  <p className="text-base text-muted-foreground mb-4">
                    Eligible for renewal until: <strong>12 Dec 2025</strong>
                  </p>
                  <Button>Do you need certification?</Button>
                </div>
              </div>
            </Card>
          )}
          {viewMode === "quiz" &&
            quizzes.length > 0 &&
            data?.can_renew === true && (
              <Card className="  w-full ">
                <CardHeader>
                  <CardTitle>
                    <h1 className="text-2xl font-semibold">
                      {data?.title} Assessment
                    </h1>
                  </CardTitle>
                  <CardDescription>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        Please review each question carefully before submitting.
                        Once submitted, your answers will be final.
                      </p>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  {quizzes &&
                    quizzes.map((quiz, index) => {
                      return (
                        <QuizForm
                          key={quiz.id}
                          index={index}
                          question={quiz.question}
                          options={quiz.options}
                          correct_answer={quiz.correct_answer}
                          reveal={false}
                          onChange={(value) => {
                            quizzes[index] = {
                              ...quizzes[index],
                              answer: value,
                            };
                          }}
                        />
                      );
                    })}
                </CardContent>

                <CardFooter>
                  <Button
                    className="min-w-[150px]"
                    onClick={() => setShowConfirmQuizDialog(true)}
                  >
                    Submit
                  </Button>

                  <ConfirmDialog
                    open={showConfirmQuizDialog}
                    setOpen={setShowConfirmQuizDialog}
                    title="Submit Quiz"
                    description="Take a moment to review your answers. Once you submit, your responses will be final."
                    confirmText="Yes, I'm Ready"
                    cancelText="Review Again"
                    onConfirm={() => {
                      if (!allAnswered()) {
                        setShowUnansweredQuizDialog(true);
                      } else {
                        // do supabase upsert of induction session here
                        setViewMode("result");
                      }
                    }}
                  />
                </CardFooter>

                <UnansweredDialog
                  open={showUnansweredQuizDialog}
                  setOpen={setShowUnansweredQuizDialog}
                />
              </Card>
            )}

          {viewMode === "result" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
              <QuizResult
                score={score}
                correct={correct}
                total={total}
                hasPassed={hasPassed}
                passingRate={passingRate}
                onRetry={() => {}}
              />
            </div>
          )}
        </PresentationLayout.Body>
      </PresentationLayout>
    </>
  );
}
