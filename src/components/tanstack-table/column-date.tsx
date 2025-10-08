import { useEffect, useState } from "react";

interface Props {
  value?: string | Date | null;
}

export default function ColumnDate({ value }: Props) {
  const [formatted, setFormatted] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setFormatted(null);
      return;
    }

    const date = new Date(value);
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

  if (!formatted) return null;
  return <span>{formatted}</span>;
}
