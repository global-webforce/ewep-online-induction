import React, { JSX, ReactNode, isValidElement } from "react";

interface PresentationLayoutProps {
  children: ReactNode;
}

interface PresentationLayoutSubProps {
  children: ReactNode;
}

interface PresentationLayoutCompound {
  Body: (props: PresentationLayoutSubProps) => JSX.Element;
  Footer: (props: PresentationLayoutSubProps) => JSX.Element;
}

function Body({ children }: PresentationLayoutSubProps) {
  return <>{children}</>;
}

function Footer({ children }: PresentationLayoutSubProps) {
  return <>{children}</>;
}

function PresentationLayout({ children }: PresentationLayoutProps) {
  let bodyNode: ReactNode = null;
  let footerNode: ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    else if (child.type === Body) bodyNode = child;
    else if (child.type === Footer) footerNode = child;
  });

  return (
    <>
      <div className="flex flex-col flex-1  bg-white text-black rounded-2xl overflow-hidden">
        <SlideHeader />
        <div className="flex flex-col flex-1  relative  ">
          <div className="absolute top-0 bottom-0 overflow-y-auto w-full flex flex-col flex-1 ">
            <div className="p-4 flex flex-col gap-0 flex-1 ">{bodyNode}</div>
          </div>
        </div>
        <div className="bg-background text-white ">{footerNode}</div>
        <SlideFooter />
      </div>
    </>
  );
}

PresentationLayout.Body = Body;
PresentationLayout.Footer = Footer;

export default PresentationLayout as typeof PresentationLayout &
  PresentationLayoutCompound;

export function SlideHeader() {
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

export function SlideFooter() {
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
