export default function SlideFooter() {
  return (
    <div className="relative h-[20px] w-full overflow-hidden ">
      <div
        className="absolute inset-y-0 z-0"
        style={{
          width: "100%",
          background: "#0D4D68",
        }}
      ></div>
      <div
        className="absolute top-0 left-10 h-full z-0"
        style={{
          width: "30%",
          background: "#86B049",
          transform: "skew(-18deg)",
          transformOrigin: "top left",
        }}
      ></div>
    </div>
  );
}
