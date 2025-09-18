"use client";

import React from "react";
import { useSlideController } from "./slide-controller";
import { Slide } from "../types";

export const sampleSlides: Slide[] = [
  {
    id: "a1",
    order: 2,
    title: "Slide with order 2",
    content: "This should appear third after normalization",
    question: "Q1?",
  },
  {
    title: "Slide with no order",
    content: "This will be pushed to the end",
    question: "Q2?",
  },
  {
    id: "a3",
    order: 0,
    title: "Slide with order 0",
    content: "This should appear first",
    question: "Q3?",
  },
  {
    id: "a4",
    order: 1,
    title: "Slide with order 1",
    content: "This should appear second",
    question: "Q4?",
  },
  {
    id: "a5",
    title: "Another no-order slide",
    content: "This will also be pushed to the end (after a2)",
    question: "Q5?",
  },
];

export default function SlideTest() {
  const { slides, currentSlide } = useSlideController(sampleSlides);

  return <div>{JSON.stringify(slides.map((e) => `${e.id} : ${e.order}`))}</div>;
}
