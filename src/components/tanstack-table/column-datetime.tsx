import { useEffect, useState } from "react";

interface Props {
  value?: string | Date | null;
}

export default function ColumnDateTime({ value }: Props) {
  const [formatted, setFormatted] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setFormatted(null);
      return;
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      setFormatted(null);
      return;
    }

    // Example output: "Oct 17, 2025, 4:32 PM"
    setFormatted(
      date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  }, [value]);

  if (!formatted) return null;

  return <span>{formatted}</span>;
}
