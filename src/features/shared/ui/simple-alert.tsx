import { Alert, AlertTitle } from "@/components/ui/alert";

const styles = {
  success:
    "border-green-200 bg-green-50 text-green-800 " +
    "dark:border-green-800 dark:bg-green-950/30 dark:text-green-200 " +
    "[&>svg]:text-yellow-600 dark:[&>svg]:text-green-400 p-3 rounded-sm",
  error:
    "border-red-200 bg-red-50 text-red-800 " +
    "dark:border-red-800 dark:bg-red-950/30 dark:text-red-200 " +
    "[&>svg]:text-yellow-600 dark:[&>svg]:text-red-400 p-3 rounded-sm",
} as const;

type Variant = keyof typeof styles;

interface SimpleAlertProps {
  variant?: Variant;
  children: React.ReactNode;
}

export function SimpleAlert({
  variant = "success",
  children,
}: SimpleAlertProps) {
  return (
    <div className={styles[variant]}>
      <p className=" normal-case text-center text-sm  whitespace-normal w-full">
        {children}
      </p>
    </div>
  );
}
