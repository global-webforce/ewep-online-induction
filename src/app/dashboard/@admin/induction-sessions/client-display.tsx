import { sampleSlides } from "@/components/slide-maker/slides/sample";
import { useSlideControllerV2 } from "@/components/slide-maker/slides/slide-controller";
import { Card } from "@/components/ui/card";
import React from "react";

export default function ClientDisplay({ onSubmit }: { onSubmit: () => void }) {
  const {
    slides,
    index,
    setIndex,
    addSlide,
    deleteSlide,
    copySlide,
    moveSlide,
    undo,
    redo,
    isDirty,
  } = useSlideControllerV2(sampleSlides);
  return (
    <>
      <div className="flex gap-8">
        <button onClick={() => addSlide()}>Add</button>
        <button onClick={() => deleteSlide()}>Delete</button>
        <button onClick={() => copySlide()}>Copy</button>
        <button onClick={() => moveSlide("up", index)}> {index} Move Up</button>
        <button onClick={() => moveSlide("down", index)}>
          {index} Move Down
        </button>
        <button onClick={() => setIndex(1)}>Set 1</button>
        <button onClick={() => setIndex(2)}>Set 2</button>
        <button onClick={() => setIndex(3)}>Set 3</button>
        <button onClick={() => undo()}>Undo</button>
        <button onClick={() => redo()}>Redo</button>
      </div>
      <p>Current Index: {index}</p>
      <p>Is Dirty: {JSON.stringify(isDirty())}</p>

      <div className="flex flex-col gap-3">
        {slides.map((e) => {
          return (
            <Card
              key={e.localId}
              className={`overflow-x-auto p-0 ${
                e.order === index ? "bg-amber-500" : ""
              }`}
            >
              <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(e, null, 2)}{" "}
              </pre>
            </Card>
          );
        })}
      </div>
    </>
  );
}
