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
import { FormSchema } from "@/features/user/induction-sessions/types/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { upsertAction } from "../induction-sessions/actions/upsert-action";
import {
  ConfirmDialog,
  QuizForm,
  QuizResult,
  UnansweredDialog,
} from "./components";
import { useFetchById } from "./hooks/fetch-by-id";
import { useQuizController } from "./hooks/use-quiz-controller";
export default function QuizPresenter() {
  const { id } = useParams<{ id: string }>();

  const { data, error, refetch, isLoading } = useFetchById(id);

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
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (values: FormSchema) => upsertAction(values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["induction_sessions_user_view"],
      });
      toast.success("Record has been created.");
      router.replace("/dashboard/induction-sessions/" + data.id);
    },
  });

  return (
    <>
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <PresentationLayout>
        <PresentationLayout.Body>
          {data && !isLoading && (
            <>
              {data?.session_status === "passed" && (
                <Card className="w-full p-4">
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg">
                        You already completed this induction
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        You can renew this induction starting on:{" "}
                        <strong>
                          {new Date(data.valid_until || "").toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </strong>
                      </p>
                    </div>
                    <Button variant={"outline"}>Download Certificate</Button>
                  </div>
                </Card>
              )}
              {data?.session_status === "failed" && (
                <Card className="w-full p-4">
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-12 w-12 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg">
                        You failed the induction last time.
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Please retake and pass the assessment to generate your
                        certificate.
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {data?.induction_quizzes &&
                data?.induction_quizzes?.length <= 0 &&
                data?.can_renew === true && (
                  <Card className="w-full p-4">
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex-shrink-0">
                        <Info className="h-12 w-12 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg">No assessment required</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button variant={"outline"}>Finish Induction</Button>
                      </div>
                    </div>
                  </Card>
                )}
              {data?.induction_quizzes &&
                data?.induction_quizzes?.length <= 0 &&
                data?.can_renew === true && (
                  <Card className="w-full p-4">
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex-shrink-0">
                        <Info className="h-12 w-12 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg">No assessment required</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button variant={"outline"}>
                          Download Certificate
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              {viewMode === "quiz" &&
                quizzes.length > 0 &&
                data?.can_renew == true && (
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

                            mutate({
                              induction_id: id,
                              valid_until: data.validity_days
                                ? new Date(
                                    Date.now() +
                                      data.validity_days * 24 * 60 * 60 * 1000
                                  )
                                    .toISOString()
                                    .split("T")[0] // keep only YYYY-MM-DD
                                : null,
                              status: hasPassed === true ? "passed" : "failed",
                            });
                            //    setViewMode("result");
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
            </>
          )}
        </PresentationLayout.Body>
      </PresentationLayout>
    </>
  );
}
