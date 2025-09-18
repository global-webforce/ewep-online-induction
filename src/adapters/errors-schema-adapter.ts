export function mapError(error: Error): Error {
  const message = (error?.message || "").toLowerCase();

  if (
    message.includes("email not confirmed") ||
    message.includes("email confirmation required")
  ) {
    return new Error("This email is not confirmed.");
  }

  if (
    message.includes("new password should be different from the old password")
  ) {
    return new Error("New password must differ from old one.");
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

  return new Error(message || "An unknown error occurred.");
}
