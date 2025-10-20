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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ConfirmDialog,
  ExitDialog,
  QuizFormCard,
  QuizResultDialog,
} from "./components";

import { useFetchById as useFetchInductionById } from "@/features/user/inductions";
import { formatReadableDate, getFutureDateISO } from "@/utils/string-helpers";
import { isEqual } from "lodash";

import { SessionFormRLSSchema } from "@/features/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { upsertAction } from "../induction-sessions/actions";
import { NotificationCompleted } from "./components/notification-completed";
import { NotificationExpired } from "./components/notification-expired";
import { NotificationFailed } from "./components/notification-failed";
import { NotificationNoAssessment } from "./components/notification-no-assessment";
import { useFetchById } from "./hooks/crud";
import { useQuizController } from "./hooks/use-quiz-controller";

export default function QuizPresenter() {
  const { id } = useParams<{ id: string }>();
  const { data: inductionData } = useFetchInductionById(id);
  const { data, error, refetch } = useFetchById(id);
  const router = useRouter();
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

  const [certificateLink, setCertificateLink] = useState<string | undefined>(
    undefined
  );

  const queryClient = useQueryClient();
  const { mutate: upsertMutation } = useMutation({
    mutationFn: (values: SessionFormRLSSchema) => upsertAction(values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      setCertificateLink(data?.id);
      if (I_NEED_INDUCTION_BUT_NO_ASSESSMENT_AVAILABLE == true) {
        window.location.reload();
      } else {
        setShowQuizResult(true);
        setShowCorrectAnswer(true);
      }

      await queryClient.invalidateQueries({
        queryKey: ["induction_sessions_user_view"],
      });
    },
  });

  const I_HAVE_NO_INDUCTION = inductionData?.session_id == null;

  const I_HAVE_SUCCESSFUL_INDUCTION_STILL_VALID =
    inductionData?.session_status == "passed" &&
    inductionData?.session_is_expired === false;

  const I_HAVE_SUCCESSFUL_INDUCTION_BUT_EXPIRED =
    inductionData?.session_status == "passed" &&
    inductionData?.session_is_expired === true;

  const I_HAVE_INDUCTION_BUT_FAILED = inductionData?.session_status == "failed";

  const I_NEED_INDUCTION_BUT_NO_ASSESSMENT_AVAILABLE =
    (I_HAVE_INDUCTION_BUT_FAILED === true ||
      I_HAVE_SUCCESSFUL_INDUCTION_BUT_EXPIRED === true ||
      I_HAVE_NO_INDUCTION) &&
    quizzes.length > 0;

  const I_NEED_INDUCTION_AND_ASSESSMENT_IS_AVAILABLE =
    (I_HAVE_INDUCTION_BUT_FAILED === true ||
      I_HAVE_SUCCESSFUL_INDUCTION_BUT_EXPIRED === true) &&
    data &&
    quizzes?.length > 0;

  return (
    <>
      <ExitDialog
        isDirty={
          showCorrectAnswer !== true &&
          I_HAVE_SUCCESSFUL_INDUCTION_STILL_VALID !== true &&
          certificateLink != null
        }
      />
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <PresentationLayout>
        <PresentationLayout.Body>
          <>
            {I_HAVE_SUCCESSFUL_INDUCTION_STILL_VALID === true && (
              <NotificationCompleted
                validUntil={formatReadableDate(
                  inductionData.session_valid_until
                )}
              />
            )}
            {I_HAVE_INDUCTION_BUT_FAILED === true && <NotificationFailed />}
            {I_HAVE_SUCCESSFUL_INDUCTION_BUT_EXPIRED === true && (
              <NotificationExpired />
            )}

            {I_NEED_INDUCTION_BUT_NO_ASSESSMENT_AVAILABLE === true && (
              <NotificationNoAssessment
                onClick={() => {
                  upsertMutation({
                    induction_id: id,
                    created_at: new Date().toISOString(),
                    valid_until:
                      inductionData && inductionData?.validity_days
                        ? getFutureDateISO(inductionData?.validity_days)
                        : null,
                    status: "passed",
                  });
                }}
              />
            )}

            {I_NEED_INDUCTION_AND_ASSESSMENT_IS_AVAILABLE && (
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
                        Please review each question carefully before submitting.
                        Once submitted, your answers will be final.
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
                            if (!isEqual(prev[index].answer, value)) {
                              const quizzes = [...prev];
                              quizzes[index] = {
                                ...quizzes[index],
                                answer: value,
                              };
                              return quizzes;
                            }
                            return prev;
                          });
                        }}
                      />
                    );
                  })}
                </CardContent>

                <CardFooter>
                  <ConfirmDialog
                    open={showConfirmQuizDialog}
                    setOpen={setShowConfirmQuizDialog}
                    onConfirm={() => {
                      upsertMutation({
                        induction_id: id,
                        created_at: new Date().toISOString(),
                        valid_until:
                          getResult().hasPassed && inductionData?.validity_days
                            ? getFutureDateISO(inductionData.validity_days)
                            : null,
                        status:
                          getResult().hasPassed === true ? "passed" : "failed",
                      });
                      //   setViewMode("result");
                    }}
                  />

                  <QuizResultDialog
                    certificateLink={certificateLink}
                    open={showQuizResult === true}
                    setOpen={() => setShowQuizResult(false)}
                    result={getResult()}
                    onRetry={() => {}}
                  />
                </CardFooter>
              </Card>
            )}
          </>
        </PresentationLayout.Body>
        <PresentationLayout.Footer>
          <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 overflow-x-auto">
            <div></div>

            {I_NEED_INDUCTION_AND_ASSESSMENT_IS_AVAILABLE && (
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  disabled={
                    isAllAnswered() === false || showCorrectAnswer === true
                  }
                  className="w-full sm:w-[150px]"
                  onClick={() => setShowConfirmQuizDialog(true)}
                >
                  Submit Answers
                </Button>

                {showQuizResult !== undefined && (
                  <Button
                    variant="outline"
                    className="w-full sm:w-[150px]"
                    onClick={() => setShowQuizResult(true)}
                  >
                    Show Result
                  </Button>
                )}
              </div>
            )}

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => router.replace("/dashboard/")}
            >
              Exit Induction
            </Button>
          </div>
        </PresentationLayout.Footer>
      </PresentationLayout>
    </>
  );
}
