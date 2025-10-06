// ColumnDate.tsx
import React, { useEffect, useState } from "react";

type Props = {
  value: string | number | Date | null | undefined;
};

export default function ColumnDate({ value }: Props) {
  if (!value) return null;

  const date = new Date(value);
  const [formatted, setFormatted] = useState(date.toISOString()); // SSR-safe

  useEffect(() => {
    setFormatted(
      date.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    );
  }, [value]);

  return <span>{formatted}</span>;
}
