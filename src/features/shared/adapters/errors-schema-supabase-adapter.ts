export function mapSupabaseError(error: any): Error {
  const message = (error?.message || "").toLowerCase();

  if (
    message.includes("email not confirmed") ||
    message.includes("email confirmation required")
  ) {
    return new Error("This email is not confirmed.");
  }

  if (
    message.includes("for security purposes, you can only request this after")
  ) {
    const match = message.match(/after\s+(.*)$/i);
    let waitTime = match ? match[1].trim() : null;
    if (waitTime?.endsWith(".")) waitTime = waitTime.slice(0, -1);

    return new Error(
      waitTime
        ? `Please wait ${waitTime} before trying again.`
        : "Please wait before trying again."
    );
  }

  function toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
  }

  return new Error(toTitleCase(message) + "." || "An unknown error occurred.");
}
