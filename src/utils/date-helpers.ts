/**
 * Adds a number of days to the current date and returns
 * an ISO date string in the format YYYY-MM-DD.
 *
 * @param days - Number of days to add
 * @returns A string in YYYY-MM-DD format
 */
export function getFutureDateISO(days: number): string {
  const futureDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return futureDate.toISOString().split("T")[0];
}

/**
 * Formats a date into a human-readable string like
 * "October 16, 2025" (using en-US locale).
 *
 * @param date - Date or string to format
 * @returns A formatted date string, or an empty string if invalid
 */
export function formatReadableDate(date?: string | Date | null): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return ""; // handle invalid date
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
