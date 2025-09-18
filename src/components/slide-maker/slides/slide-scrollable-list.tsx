"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  HelpCircle,
  LucideCheck,
  LucideX,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { Slide } from "../types";

interface SlideScrollableListProps {
  slides: Slide[];
  currentSlide: Slide | null;
  onSelectSlide: (slide: Slide) => void;
  onDeleteSlide: (id: string) => void;
  onCopySlide: (id: string) => void;
  onMoveSlide: (id: string, direction: "up" | "down") => void;
}

export function SlideScrollableList({
  slides,
  currentSlide,
  onSelectSlide,
  onDeleteSlide,
  onCopySlide,
  onMoveSlide,
}: SlideScrollableListProps) {
  // Store the ID of the slide being confirmed for deletion
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Handle delete click to show confirmation text
  const handleDeleteClick = (slideId: string) => {
    if (deleteConfirm === slideId) {
      onDeleteSlide(slideId); // Delete slide if already confirmed
      setDeleteConfirm(null); // Reset confirmation
    } else {
      setDeleteConfirm(slideId); // Show confirmation text
    }
  };

  const QuestionMarker = ({ slide }: { slide: Slide }) => {
    return slide.quiz ? (
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <HelpCircle className="h-4 w-4 " />
          </div>
        </TooltipTrigger>
        <TooltipContent>This slide has a Quiz!</TooltipContent>
      </Tooltip>
    ) : (
      <span></span>
    );
  };

  const DeleteButton = ({ slide }: { slide: Slide }) => {
    return (
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                handleDeleteClick(slide.localId!);
              }}
              aria-label="Delete slide"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete slide</TooltipContent>
        </Tooltip>
        {deleteConfirm === slide.localId && (
          <div className="flex items-center gap-2">
            <LucideCheck
              className="h-5 w-5"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteSlide(slide.localId!);
                handleDeleteClick(slide.localId!);
              }}
            ></LucideCheck>
            |
            <LucideX
              className="h-5 w-5"
              onClick={() => handleDeleteClick(slide.localId!)}
            ></LucideX>
          </div>
        )}
      </div>
    );
  };

  const CopyButton = ({ slide }: { slide: Slide }) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onCopySlide(slide.localId!);
            }}
            aria-label="Copy slide"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy slide</TooltipContent>
      </Tooltip>
    );
  };

  const MoveUpButton = ({ index, slide }: { index: number; slide: Slide }) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onMoveSlide(slide.localId!, "up");
            }}
            disabled={index === 0}
            aria-label="Move slide up"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Move slide up</TooltipContent>
      </Tooltip>
    );
  };

  const Title = ({ slide }: { slide: Slide }) => {
    return <h3 className="font-semibold ">{slide.title || "Enter Title"}</h3>;
  };

  const Content = ({ slide }: { slide: Slide }) => {
    return (
      <p className="text-sm text-muted-foreground truncate max-w-[250px]">
        {(slide.content || "New slide content")
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/&[^;]+;/g, "")}
      </p>
    );
  };

  const MoveDownButton = ({
    index,
    slide,
  }: {
    index: number;
    slide: Slide;
  }) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onMoveSlide(slide.localId!, "down");
            }}
            disabled={index === slides.length - 1}
            aria-label="Move slide down"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Move slide down</TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider>
      <div className="space-y-3 p-3">
        {slides.map((slide: Slide, index: number) => (
          <div
            key={slide.localId}
            onClick={() => onSelectSlide(slide)}
            className={`border cursor-pointer transition-colors ${
              currentSlide?.localId === slide.localId
                ? "bg-accent border-amber-500"
                : "hover:bg-accent/50"
            }`}
          >
            <div className="flex items-center justify-between p-3 overflow-hidden max-h-28 h-28">
              <div>
                <Title slide={slide} />
                <p>{slide.localId}</p>
                <Content slide={slide} />
              </div>
            </div>

            <div
              className={`flex justify-between items-center  text-white border-t-neutral-700 border-t-1 ${
                currentSlide?.localId === slide.localId
                  ? "bg-background"
                  : "bg-background/50"
              }`}
            >
              <div className="flex items-center  m-2 text-white gap-2">
                <span>{`${index + 1}`}</span>
                <QuestionMarker slide={slide} />
              </div>

              <div className="flex justify-end space-x-2">
                {slides.length > 1 && <DeleteButton slide={slide} />}
                <CopyButton slide={slide} />
                <MoveUpButton index={index} slide={slide} />
                <MoveDownButton index={index} slide={slide} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
