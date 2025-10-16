"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import PresentationLayout from "@/components/presentation/layout";
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
import { ConfirmDialog, QuizFormCard, QuizResultDialog } from "./components";

import { useUpsert } from "@/features/user/induction-sessions";
import { useFetchById as useFetchInductionById } from "@/features/user/inductions";
import { formatReadableDate } from "@/utils/date-helpers";
import { NotificationCompleted } from "./components/notification-completed";
import { NotificationFailed } from "./components/notification-failed";
import { NotificationNoAssessment } from "./components/notification-no-assessment";
import { useFetchById } from "./hooks/crud";
import { useQuizController } from "./hooks/use-quiz-controller";

export default function QuizPresenter() {
  const { id } = useParams<{ id: string }>();
  const { data: inductionData } = useFetchInductionById(id);
  const { data, error, refetch } = useFetchById(id);
  const { mutate } = useUpsert();

  const {
    quizzes,
    showConfirmQuizDialog,
    showQuizResult,
    showCorrectAnswer,
    setShowCorrectAnswer,
    setShowQuizResult,
    setQuizzes,
    getResult,
    setShowConfirmQuizDialog,
    isAllAnswered,
  } = useQuizController(data || undefined);
  const [viewMode, setViewMode] = useState<"quiz" | "result" | undefined>(
    "quiz"
  );

  const I_HAVE_SUCCESSFUL_INDUCTION_STILL_VALID =
    inductionData?.session_status == "passed" &&
    inductionData?.session_is_expired === false;

  const I_HAVE_SUCCESSFUL_INDUCTION_BUT_EXPIRED =
    inductionData?.session_status == "passed" &&
    inductionData?.session_is_expired === true;

  const I_HAVE_INDUCTION_BUT_FAILED = inductionData?.session_status == "failed";

  const I_NEED_INDUCTION_BUT_NO_ASSESSMENT_AVAILABLE =
    (I_HAVE_INDUCTION_BUT_FAILED === true ||
      I_HAVE_SUCCESSFUL_INDUCTION_BUT_EXPIRED === true) &&
    data &&
    data?.length <= 0;

  return (
    <>
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <PresentationLayout>
        <PresentationLayout.Body>
          {data && (
            <>
              {I_HAVE_SUCCESSFUL_INDUCTION_STILL_VALID === true && (
                <NotificationCompleted
                  validUntil={formatReadableDate(
                    inductionData.session_valid_until
                  )}
                />
              )}
              {I_HAVE_INDUCTION_BUT_FAILED === true && <NotificationFailed />}

              {I_NEED_INDUCTION_BUT_NO_ASSESSMENT_AVAILABLE === true && (
                <NotificationNoAssessment onClick={() => {}} />
              )}

              {viewMode === "quiz" && quizzes.length > 0 && (
                <Card className="  w-full ">
                  <CardHeader>
                    <CardTitle>
                      <h1 className="text-2xl font-semibold">
                        {inductionData?.title} Assessment
                      </h1>
                    </CardTitle>
                    <CardDescription>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                          Please review each question carefully before
                          submitting. Once submitted, your answers will be
                          final.
                        </p>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    {quizzes.map((quiz, index) => {
                      return (
                        <QuizFormCard
                          key={index}
                          value={quiz}
                          index={index}
                          reveal={showCorrectAnswer}
                          onChange={(value) => {
                            setQuizzes((prev) => {
                              const quizzes = [...prev];
                              quizzes[index] = {
                                ...quizzes[index],
                                answer: value,
                              };
                              return quizzes;
                            });
                          }}
                        />
                      );
                    })}
                  </CardContent>

                  <CardFooter>
                    <div className="flex gap-4">
                      <Button
                        disabled={
                          isAllAnswered() === false ||
                          showCorrectAnswer === true
                        }
                        className="min-w-[150px]"
                        onClick={() => setShowConfirmQuizDialog(true)}
                      >
                        Submit
                      </Button>

                      {showQuizResult !== undefined && (
                        <Button
                          variant={"outline"}
                          className="min-w-[150px]"
                          onClick={() => setShowQuizResult(true)}
                        >
                          Show Result
                        </Button>
                      )}
                    </div>

                    <ConfirmDialog
                      open={showConfirmQuizDialog}
                      setOpen={setShowConfirmQuizDialog}
                      onConfirm={() => {
                        setShowCorrectAnswer(true);
                        setShowQuizResult(true);
                        /*    mutate({
                          induction_id: id,
                          valid_until: inductionData?.validity_days
                            ? getFutureDateISO(inductionData.validity_days)
                            : null,
                          status:
                            getResult().hasPassed === true
                              ? "passed"
                              : "failed",
                        }); */
                        //   setViewMode("result");
                      }}
                    />

                    <QuizResultDialog
                      open={showQuizResult === true}
                      setOpen={() => setShowQuizResult(false)}
                      result={getResult()}
                      onRetry={() => {}}
                    />
                  </CardFooter>
                </Card>
              )}
            </>
          )}
        </PresentationLayout.Body>
      </PresentationLayout>
    </>
  );
}
