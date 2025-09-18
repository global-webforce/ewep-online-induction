"use client";

import IframeWithHtml from "@/components/custom/iframe";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRef, useState } from "react";
import { Slide } from "../types";
import { hasValidQuiz } from "../utils";

export default function SlideItem({
  slide,
  onAnswer,
}: {
  slide: Slide;
  onAnswer: (slide: Slide) => void;
}) {
  const [confirmedAnswer, setConfirmedAnswer] = useState(slide.answer);
  const [answer, setAnswer] = useState(slide.answer);

  const handleAnswerSubmit = () => {
    setConfirmedAnswer(answer);
    onAnswer({ ...slide, answer: answer });
  };

  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      <h2 className="text-2xl font-bold">{slide.title}</h2>

      {slide.content && (
        <IframeWithHtml
          htmlContent={slide
            .content!.replace(/^<p>&nbsp;<\/p>/, "")
            .replace(/<p>&nbsp;<\/p>$/, "")}
        />
      )}

      {hasValidQuiz(slide) && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{slide.question}</h3>
          <RadioGroup
            onValueChange={(value) => {
              const selectedIndex = Number(value); // Parse the selected index
              setConfirmedAnswer(undefined);
              setAnswer(selectedIndex);
            }}
            defaultValue={answer?.toString()}
          >
            {slide.options?.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>

          <Button onClick={handleAnswerSubmit} disabled={answer === undefined}>
            Submit Answer
          </Button>

          {confirmedAnswer !== undefined && (
            <p
              className={`text-lg font-semibold ${
                answer === slide.correctAnswer
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {confirmedAnswer === slide.correctAnswer
                ? "Correct!"
                : "Incorrect. Please try again."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
