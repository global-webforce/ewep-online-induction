import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface NotificationCompletedProps {
  validUntil?: string | Date | null;
  onDownload?: () => void;
}

export function NotificationCompleted({
  validUntil,
  onDownload,
}: NotificationCompletedProps) {
  const formattedDate =
    validUntil &&
    new Date(validUntil).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <Card className="w-full p-4">
      <div className="flex items-center gap-4 w-full">
        <div className="flex-shrink-0">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg">You already completed this Course</h3>
          {validUntil && (
            <p className="text-muted-foreground text-sm">
              You can renew this Course starting on:{" "}
              <strong>{formattedDate}</strong>
            </p>
          )}
        </div>

        {onDownload && (
          <Button variant="outline" onClick={onDownload}>
            Download Certificate
          </Button>
        )}
      </div>
    </Card>
  );
}
