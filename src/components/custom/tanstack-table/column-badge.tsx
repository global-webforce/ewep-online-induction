// StatusBadge.tsx
import React from "react";

type Props = { value?: string | null };

const statusStyles: Record<string, string> = {
  pending: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  draft: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  "not started":
    "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",

  published: "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200",

  completed:
    "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200",
  super_admin: "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200",

  archived: "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200",
  expired: "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200",

  default: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
};

// 🔹 Only for display
export function formatLabel(text: string): string {
  return text
    .replace(/[_-]/g, " ") // replace _ or - with space
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function ColumnBadge({ value }: Props) {
  if (!value) return null;

  const baseClasses = "text-sm text-center font-medium p-1 rounded-md w-28";

  // use the raw normalized value for lookup
  const key = value.toLowerCase();
  const colorClasses = statusStyles[key] || statusStyles.default;

  // only pretty-print the text for display
  const formattedValue = formatLabel(value);

  return (
    <div className={`${baseClasses} ${colorClasses}`}>{formattedValue}</div>
  );
}
