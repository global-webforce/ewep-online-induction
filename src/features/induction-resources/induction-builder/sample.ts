import { SlideSchema } from "../types";

export const sampleSlides: SlideSchema[] = [
  {
    id: "a1",
    order: 2,
    title: "Slide with order 2",
    content: "This should appear third after normalization",
    quiz: undefined,
  },
  {
    title: "Slide with no order",
    content: "This will be pushed to the end",
    quiz: undefined,
  },
  {
    id: "a3",
    order: 0,
    title: "Slide with order 0",
    content: "This should appear first",
    quiz: undefined,
  },
  {
    id: "a4",
    order: 1,
    title: "Slide with order 1",
    content: "This should appear second",
    quiz: undefined,
  },
  {
    id: "a5",
    title: "Another no-order slide",
    content: "This will also be pushed to the end (after a2) LAST!!!!",
    quiz: undefined,
  },
];
