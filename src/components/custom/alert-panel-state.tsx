import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const styles = {
  loading:
    "border-blue-200 bg-blue-50 text-blue-800 " +
    "dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-200 " +
    "[&>svg]:text-yellow-600 dark:[&>svg]:text-blue-400  ",
  error:
    "border-red-200 bg-red-50 text-red-800 " +
    "dark:border-red-800 dark:bg-red-950/30 dark:text-red-200 " +
    "[&>svg]:text-yellow-600 dark:[&>svg]:text-red-400",
} as const;

type Variant = keyof typeof styles;

interface AlertPanelStateProps {
  onRetry?: () => void;
  variant?: Variant;
  children?: React.ReactNode;
}

export function AlertPanelState({
  onRetry,
  variant = "loading",
  children,
}: AlertPanelStateProps) {
  return (
    <div
      className={`${styles[variant]} p-3 rounded-sm flex gap-2  align-middle min-h-14`}
    >
      <div className="flex gap-2 items-center">
        {variant === "error" && <AlertCircle className="h-4 w-4 mr-1" />}
        {variant === "loading" && (
          <Loader2 className={"h-6 w-6 mr-1 text-primary/60 animate-spin"} />
        )}
        <p className=" normal-case text-sm  whitespace-normal w-full">
          {children || (variant === "error" ? "Error" : "Loading...")}
        </p>
      </div>
      {variant === "error" && (
        <Button
          onClick={onRetry ? () => onRetry() : undefined}
          size={"sm"}
          variant={"outline"}
        >
          Try again
        </Button>
      )}
    </div>
  );
}
