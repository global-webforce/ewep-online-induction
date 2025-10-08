export default function SlideHeader() {
  return (
    <div className="relative h-[20px] w-full overflow-hidden">
      <div
        className="absolute inset-y-0 left-"
        style={{
          width: "100%",
          background: "#0D4D68",
        }}
      ></div>
      <div
        className="absolute top-0 right-10 h-full"
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
