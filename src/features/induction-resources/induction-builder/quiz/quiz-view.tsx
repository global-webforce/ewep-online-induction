"use client";

import IframeWithHtml from "@/components/custom/iframe";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { useState } from "react";
import { SlideSchema } from "../../types";

interface QuizViewProps {
  slide: SlideSchema;
  onNextSlide: () => void;
  hideNextButton?: boolean; // Added hideNextButton prop
}

export function QuizView({
  slide,
  onNextSlide,
  hideNextButton,
}: QuizViewProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    onNextSlide();
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">{slide.title}</h2>
      {slide.content && <IframeWithHtml htmlContent={slide.content || ""} />}
      {slide?.quiz && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">{slide.quiz.question}</h3>

          <RadioGroup
            value={String(selectedAnswer)}
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
          >
            {/*  {slide.quiz.options?.map((option: object, index: number) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem
                  value={String(index)}
                  id={`quiz-option-${index}`}
                />
                <Label htmlFor={`quiz-option-${index}`}>{option.value}</Label>
              </div>
            ))} */}
          </RadioGroup>
          {!showResult && (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="mt-4"
            >
              Submit Answer
            </Button>
          )}
          {showResult && (
            <div className="mt-4">
              <p
                className={`text-lg font-semibold ${
                  selectedAnswer === slide.quiz.correctAnswer
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {selectedAnswer === slide.quiz.correctAnswer
                  ? "Correct!"
                  : "Incorrect. Try again!"}
              </p>
            </div>
          )}
        </div>
      )}
      {!hideNextButton && (
        <Button onClick={handleNext} className="mt-4">
          Next SlideSchema
        </Button>
      )}
    </div>
  );
}
