import React from "react";

export default function SlideHeader() {
  return (
    <div className="relative h-[30px] w-full overflow-hidden">
      <div
        className="absolute inset-y-0 left-"
        style={{
          width: "100%",
          background: "#244880",
        }}
      ></div>
      <div
        className="absolute top-0 right-0 h-full"
        style={{
          width: "30%",
          background: "#AF1F24",
          transform: "skew(-18deg)",
          transformOrigin: "top left",
        }}
      ></div>
    </div>
  );
}
