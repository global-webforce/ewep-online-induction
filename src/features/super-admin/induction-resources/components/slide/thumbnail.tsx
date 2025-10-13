import { ReactNode } from "react";

interface ThumbnailProps {
  children: ReactNode;
}

export function Thumbnail({ children }: ThumbnailProps) {
  return (
    <div className="flex items-center justify-between p-3 overflow-hidden max-h-28 h-28">
      <div>{children}</div>
    </div>
  );
}
