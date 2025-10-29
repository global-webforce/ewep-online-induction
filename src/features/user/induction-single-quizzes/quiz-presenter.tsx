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
import {
  ConfirmDialog,
  ExitDialog,
  QuizFormCard,
  QuizResultDialog,
} from "./components";

import { useFetchById as useFetchInductionById } from "@/features/user/inductions";
import { getFutureDateISO } from "@/utils/string-helpers";
import { isEqual } from "lodash";

import { SessionFormRLSSchema } from "@/features/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { upsertAction } from "../induction-sessions/actions";
import { InductionSuccessDialog } from "./components/induction-success-dialog";
import { NotificationCompleted } from "./components/notification-completed";
import { NotificationExpired } from "./components/notification-expired";
import { NotificationFailed } from "./components/notification-failed";
import { NotificationNoAssessment } from "./components/notification-no-assessment";
import { useFetchById } from "./hooks/crud";
import { useQuizController } from "./hooks/use-quiz-controller";

export default function QuizPresenter() {
  const { id } = useParams<{ id: string }>();
  const { data: inductionData, isLoading: isLoadingInduction } =
    useFetchInductionById(id);
  const {
    data,
    error,
    refetch,
    isLoading: isLoadingQuizzes,
  } = useFetchById(id);
  const router = useRouter();
  const {
    quizzes,
    showConfirmQuizDialog,
    showQuizResult,
    showCorrectAnswer,
    setCertificateLink,
    certificateLink,
    isDirty,
    setShowCorrectAnswer,
    setShowQuizResult,
    setQuizzes,
    getResult,
    setShowConfirmQuizDialog,
    isAllAnswered,

    showSuccessDialog,
    setShowSuccessDialog,
  } = useQuizController(data || undefined);

  const queryClient = useQueryClient();
  const { mutate: upsertMutation } = useMutation({
    mutationFn: (values: SessionFormRLSSchema) => upsertAction(values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      setCertificateLink(data?.data?.id);

      if (NEED_INDUCTION_BUT_NO_ASSESSMENT_AVAILABLE) {
        setShowSuccessDialog(true);
      } else {
        setShowQuizResult(true);
        setShowCorrectAnswer(true);
      }

      await queryClient.invalidateQueries({
        queryKey: ["induction_sessions_view"],
      });
    },
  });

  const VALID_INDUCTION =
    inductionData?.session_has_passed &&
    inductionData?.session_is_expired === false;

  const INDUCTION_EXPIRED =
    inductionData?.session_has_passed &&
    inductionData?.session_is_expired === true;

  const INDUCTION_FAILED = inductionData?.session_has_passed === false;

  const INDUCTION_NONE = inductionData?.session_id === null;

  const NEED_INDUCTION_BUT_NO_ASSESSMENT_AVAILABLE =
    (INDUCTION_FAILED || INDUCTION_EXPIRED || INDUCTION_NONE) &&
    quizzes.length === 0;

  const NEED_INDUCTION_AND_ASSESSMENT_IS_AVAILABLE =
    (INDUCTION_FAILED || INDUCTION_EXPIRED || INDUCTION_NONE) &&
    quizzes?.length !== 0;

  return (
    <>
      <ExitDialog
        isDirty={
          isDirty() &&
          getResult().hasPassed !== true &&
          inductionData?.session_has_passed !== true &&
          showCorrectAnswer === false
        }
      />
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <PresentationLayout>
        <PresentationLayout.Body>
          {!isLoadingInduction && !isLoadingQuizzes && (
            <>
              {VALID_INDUCTION === true && (
                <NotificationCompleted
                  validUntil={inductionData.session_valid_until_formatted}
                />
              )}
              {INDUCTION_FAILED === true && showCorrectAnswer === false && (
                <NotificationFailed />
              )}
              {INDUCTION_EXPIRED === true && showCorrectAnswer === false && (
                <NotificationExpired />
              )}

              {NEED_INDUCTION_BUT_NO_ASSESSMENT_AVAILABLE === true &&
                showCorrectAnswer === false &&
                certificateLink !== undefined && (
                  <NotificationNoAssessment
                    onClick={() => {
                      upsertMutation({
                        induction_id: id,
                        created_at: new Date().toISOString(),
                        valid_until:
                          inductionData && inductionData?.validity_days
                            ? getFutureDateISO(inductionData?.validity_days)
                            : null,
                        has_passed: true,
                      });
                    }}
                  />
                )}

              {NEED_INDUCTION_AND_ASSESSMENT_IS_AVAILABLE && (
                <Card className=" w-full mt-2">
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
                            getResult().hasPassed &&
                            inductionData?.validity_days
                              ? getFutureDateISO(inductionData.validity_days)
                              : null,
                          has_passed: getResult().hasPassed,
                        });
                      }}
                    />

                    <QuizResultDialog
                      certificateLink={certificateLink}
                      open={showQuizResult === true}
                      setOpen={() => setShowQuizResult(false)}
                      result={getResult()}
                      onRetry={() => {
                        window.location.reload();
                        // resetQuiz();
                      }}
                    />
                  </CardFooter>
                </Card>
              )}
            </>
          )}

          <InductionSuccessDialog
            certificateLink={certificateLink}
            open={showSuccessDialog === true}
            setOpen={() => setShowSuccessDialog(false)}
          />
        </PresentationLayout.Body>
        <PresentationLayout.Footer>
          <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 overflow-x-auto">
            <div></div>

            {NEED_INDUCTION_AND_ASSESSMENT_IS_AVAILABLE && (
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  disabled={
                    isAllAnswered === false || showCorrectAnswer === true
                  }
                  className="w-full sm:w-[150px]"
                  onClick={() => setShowConfirmQuizDialog(true)}
                >
                  Submit Answers
                </Button>

                {showCorrectAnswer === true && (
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
