import { formatValue } from "@/utils/string-helpers";

// StatusBadge.tsx
type Props = { value?: string | null };

const statusStyles: Record<string, string> = {
  pending:
    "border-gray-300 text-gray-700 bg-gray-50/70 dark:border-gray-600 dark:text-gray-200 dark:bg-gray-800/50",
  draft:
    "border-gray-300 text-gray-700 bg-gray-50/70 dark:border-gray-600 dark:text-gray-200 dark:bg-gray-800/50",
  "not started":
    "border-gray-300 text-gray-700 bg-gray-50/70 dark:border-gray-600 dark:text-gray-200 dark:bg-gray-800/50",

  published:
    "border-blue-300 text-blue-700 bg-blue-50/70 dark:border-blue-700 dark:text-blue-300 dark:bg-blue-900/30",

  completed:
    "border-green-300 text-green-700 bg-green-50/70 dark:border-green-700 dark:text-green-300 dark:bg-green-900/30",

  passed:
    "border-green-300 text-green-700 bg-green-50/70 dark:border-green-700 dark:text-green-300 dark:bg-green-900/30",

  failed:
    "border-red-300 text-red-700 bg-red-50/70 dark:border-red-700 dark:text-red-300 dark:bg-red-900/30",

  super_admin:
    "border-gray-300 text-gray-700 bg-gray-50/70 dark:border-gray-600 dark:text-gray-200 dark:bg-gray-800/50",

  archived:
    "border-red-300 text-red-700 bg-red-50/70 dark:border-red-700 dark:text-red-300 dark:bg-red-900/30",

  expired:
    "border-red-300 text-red-700 bg-red-50/70 dark:border-red-700 dark:text-red-300 dark:bg-red-900/30",

  default:
    "border-gray-300 text-gray-700 bg-gray-50/70 dark:border-gray-600 dark:text-gray-200 dark:bg-gray-800/50",
};

// 🔹 Format label nicely for display

export default function StatusBadge({ value }: Props) {
  if (!value) return null;

  const baseClasses =
    "inline-flex items-center justify-center text-sm font-medium rounded-md border px-2 py-1 transition-colors w-28";

  const key = value.toLowerCase();
  const colorClasses = statusStyles[key] || statusStyles.default;

  const formattedValue = formatValue(value);

  return (
    <div className={`${baseClasses} ${colorClasses}`}>{formattedValue}</div>
  );
}
