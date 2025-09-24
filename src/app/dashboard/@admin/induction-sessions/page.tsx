"use client";

import dynamic from "next/dynamic";
import { useId } from "react";

const ComponentA = dynamic(() => import("./slide-maker-controller-demo"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <ComponentA key={useId()} />
    </>
  );
}
