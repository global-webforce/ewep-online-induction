"use client";

import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronLeftIcon, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Slide } from "../types"; // Import types and Zod schema
import Confetti from "./confetti";
import { CommonLayout } from "./layout";
import { usePresentationController } from "./presentation-controller";
import SlideItem from "./slide";
import SlideHeader from "./designs/header";
import SlideFooter from "./designs/footer";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Presentation({
  title,
  values,
  current,
  onFinish, // New prop
  onCertificateDownload,
  onEnd,
  readonly = false,
  debugMode = false,
}: {
  title: string;
  values: Slide[];
  current?: number;
  onFinish?: () => Promise<void>; // Ensure onFinish is async and returns a promise
  onCertificateDownload?: () => void;
  onEnd?: () => void;
  readonly?: boolean;
  debugMode?: boolean;
}) {
  const router = useRouter();
  const {
    showAcknowledgment,
    showConfetti,
    slides,
    isAcknowledged,
    currentSlide,
    showModal,
    setShowModal,
    currentIndex,
    setShowAcknowledgment,
    setIsAcknowledged,
    goToNextSlide,
    goToPreviousSlide,
    handleAcknowledgment,
    updateAnswer,
  } = usePresentationController({
    values: values,
    current: current,
    readonly: readonly,
  });

  // Modify the handleProceed function to await onFinish before calling handleAcknowledgment

  const [loadingSave, setloadingSave] = useState(false);

  const handleProceed = async () => {
    setloadingSave(true);
    if (onFinish) {
      try {
        await onFinish(); // Wait for the onFinish function to complete first
        handleAcknowledgment();
      } catch (error) {
        console.error("Error during onFinish:", error);
        return; // Optionally handle the error (e.g., show a notification)
      } finally {
        setloadingSave(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen ">
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle className="text-center text-xl font-semibold">
            Answer Required
          </DialogTitle>
          <DialogDescription className="text-center ">
            Answer the question first correctly before you can proceed to next
            slide.
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <header className="shadow-md ">
        <div className=" flex items-center justify-start h-16 px-4 gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <Separator />
      </header>

      <main className="h-full overflow-y-auto">
        {showAcknowledgment === false && !showConfetti && (
          <div>
            <SlideHeader />
            <SlideItem
              key={currentSlide.id}
              slide={currentSlide}
              onAnswer={(slide) => updateAnswer(slide)}
            />
            <SlideFooter />
          </div>
        )}

        {showConfetti && (
          <div className="flex flex-col md:justify-center justify-start  items-center  md:h-full w-full p-4">
            <Confetti />

            <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
            <p className="text-xl mb-8">Youve completed the Induction.</p>
            {onCertificateDownload && (
              <Button onClick={() => onCertificateDownload()}>
                Download Certificate
              </Button>
            )}
            {onEnd && (
              <Button onClick={() => onEnd()} className="mt-4">
                End Induction
              </Button>
            )}
          </div>
        )}

        {showAcknowledgment && !showConfetti && (
          <div className="flex flex-col md:justify-center justify-start  items-center  md:h-full w-full p-4 ">
            <Card className="p-4 max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">
                Induction Acknowledgment
              </h2>
              <p className="mb-4">
                By checking the box below, you acknowledge that you have been
                inducted and agree to follow the company policies and procedures
                as presented in this induction.
              </p>
              <div className="flex items-center space-x-2 mb-8">
                <Checkbox
                  id="acknowledgment"
                  checked={isAcknowledged}
                  onCheckedChange={(checked) =>
                    setIsAcknowledged(checked as boolean)
                  }
                />
                <Label htmlFor="acknowledgment" className="text-base">
                  I acknowledge that I have been inducted and agree to the terms
                  above.
                </Label>
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={() => {
                    setShowAcknowledgment(false);
                  }}
                >
                  Back
                </Button>

                <LoadingButton
                  type="button"
                  onClick={handleProceed}
                  disabled={!isAcknowledged}
                  pending={loadingSave}
                >
                  Proceed
                </LoadingButton>
              </div>
            </Card>
          </div>
        )}
      </main>

      <div>
        <Separator />
        <div style={{ height: "65px", minHeight: "65px" }}></div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-background ">
        <Separator />
        {showAcknowledgment === false && !showConfetti && (
          <div className=" flex items-center justify-center gap-4 h-16 px-4 ">
            <Button
              variant="outline"
              onClick={goToPreviousSlide}
              disabled={currentIndex() === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            Page {currentIndex() + 1} of {slides.length}
            <Button variant="outline" onClick={goToNextSlide}>
              {currentIndex() === slides.length - 1 ? "Finish" : "Next"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </footer>
    </div>
  );
}
