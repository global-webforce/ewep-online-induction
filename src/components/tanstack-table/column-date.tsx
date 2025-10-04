// ColumnDate.tsx
import React from "react";

type Props = {
  value: string | number | Date | null | undefined;
};

export default function ColumnDate({ value }: Props) {
  if (!value) return null;

  const date = new Date(value);

  // Format: M/D/YYYY, H:MM AM/PM (without seconds)
  const formatted = date.toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return <span>{formatted}</span>;
}
