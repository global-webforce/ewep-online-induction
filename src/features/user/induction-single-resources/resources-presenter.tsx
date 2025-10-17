"use client";

import { AlertPanelState } from "@/components/custom/alert-panel-state";
import { useSlideController } from "./hooks/use-slide-controller";

import HtmlPreview from "@/components/html-viewer/html-preview";
import PresentationLayout from "@/components/presentation/layout";
import PresentationNavigator from "@/components/presentation/navigator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useFetchById as useFetchInductionById } from "@/features/user/inductions";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useFetchById } from "./hooks/crud";

export default function ResourcesPresenter() {
  const { id } = useParams<{ id: string }>();

  const { data: inductionData } = useFetchInductionById(id);

  const { data, error, refetch, isLoading } = useFetchById(id);
  const { selectedSlide, slides, selectedIndex, setSelectedIndex } =
    useSlideController(data || undefined);

  const [viewMode, setViewMode] = useState<
    "resources" | "resources-end" | undefined
  >("resources");

  return (
    <>
      {error && (
        <AlertPanelState onRetry={async () => await refetch()} variant="error">
          {error.message}
        </AlertPanelState>
      )}

      <PresentationLayout>
        <PresentationLayout.Body>
          {viewMode === "resources" && (
            <>
              {!!selectedSlide?.title && (
                <h1 className="text-3xl font-bold">{selectedSlide?.title}</h1>
              )}

              {!!selectedSlide?.content && (
                <HtmlPreview htmlContent={selectedSlide?.content} />
              )}
            </>
          )}

          {viewMode === "resources-end" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
              <Card className="w-full max-w-xl py-12 text-center">
                <CardHeader className="flex flex-col items-center space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 drop-shadow-lg" />

                  <CardTitle className="text-2xl font-semibold max-w-[500px]">
                    You&apos;ve reached the end of learning modules of this
                    induction.
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Great work! It&apos;s time to test what you&apos;ve learned.
                  </CardDescription>
                </CardHeader>

                <CardFooter className="justify-center mt-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link
                      href={`/dashboard/inductions/${id}/resources/assessment`}
                    >
                      Start Assessment
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </PresentationLayout.Body>
        <PresentationLayout.Footer>
          {(viewMode == "resources" || viewMode == "resources-end") && (
            <PresentationNavigator
              disabled={false}
              onPrev={() =>
                setSelectedIndex((prev) => {
                  if (prev - 1 < slides.length) {
                    setViewMode("resources");
                    return Math.max(prev - 1, 0);
                  }
                  return Math.max(prev - 1, 0);
                })
              }
              onNext={() => {
                setSelectedIndex((prev) => {
                  if (prev + 1 >= slides.length) {
                    setViewMode("resources-end");
                    return slides.length;
                  }
                  return prev + 1;
                });
              }}
            >
              <p>
                Page {selectedIndex! + 1} of {slides.length + 1}
              </p>
            </PresentationNavigator>
          )}
        </PresentationLayout.Footer>
      </PresentationLayout>
    </>
  );
}
