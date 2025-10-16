import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

interface NotificationNoAssessmentProps {
  onClick?: () => void;
}

export function NotificationNoAssessment({
  onClick,
}: NotificationNoAssessmentProps) {
  return (
    <Card className="w-full p-4">
      <div className="flex items-center gap-4 w-full">
        <div className="flex-shrink-0">
          <Info className="h-12 w-12 text-blue-500" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg">No assessment required</h3>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClick}>
            Finish Induction
          </Button>
        </div>
      </div>
    </Card>
  );
}
