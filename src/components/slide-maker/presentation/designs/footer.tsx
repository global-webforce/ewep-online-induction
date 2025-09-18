import React from "react";

export default function SlideFooter() {
  return (
    <div className="relative h-[30px] w-full overflow-hidden -z-10">
      <div
        className="absolute inset-y-0 z-0"
        style={{
          width: "100%",
          background: "#244880",
        }}
      ></div>
      <div
        className="absolute top-0 left-0 h-full z-0"
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
