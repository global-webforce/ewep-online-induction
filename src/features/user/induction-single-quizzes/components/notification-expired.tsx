import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function NotificationExpired() {
  return (
    <Card className="w-full p-4">
      <div className="flex items-center gap-4 w-full">
        <div className="flex-shrink-0">
          <AlertCircle className="h-12 w-12 text-orange-500" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg">Renew your Expired Induction</h3>
          <p className="text-muted-foreground text-sm">
            Please retake and pass the assessment to renew your induction.
          </p>
        </div>
      </div>
    </Card>
  );
}
