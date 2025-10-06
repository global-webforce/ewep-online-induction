import { useEffect, useRef } from "react";
import { toast } from "sonner";

/**
 * Automatically shows and hides a loading toast while `isLoading` is true.
 * Works across page refreshes and React Query state changes.
 */
export function useLoadingToast(
  isLoading: boolean,
  message = "Processing your request..."
) {
  const toastId = useRef<string | number | null>(null);

  useEffect(() => {
    if (isLoading && toastId.current === null) {
      // Show the loading toast only once
      toastId.current = toast.loading(message, {
        className: "bg-card text-card-foreground border-border",
      });
    }

    if (!isLoading && toastId.current !== null) {
      // Dismiss when loading ends
      toast.dismiss(toastId.current);
      toastId.current = null;
    }

    // Cleanup on unmount (helps on page refresh)
    return () => {
      if (toastId.current !== null) {
        toast.dismiss(toastId.current);
        toastId.current = null;
      }
    };
  }, [isLoading, message]);
}
