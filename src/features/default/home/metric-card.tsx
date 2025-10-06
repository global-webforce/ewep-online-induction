"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string; // e.g. "text-blue-500"
  bgColor?: string; // e.g. "bg-blue-100"
};

export function MetricCard({
  title,
  value,
  icon: Icon,
  color = "text-gray-800",
  bgColor = "bg-gray-100",
}: MetricCardProps) {
  return (
    <Card className={`${bgColor} border-none shadow-sm`}>
      <CardContent>
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-row items-center gap-3">
            <p className={`text-5xl font-bold ${color}`}>{value}</p>
            <div className={`rounded-full p-3 ${bgColor} bg-opacity-50`}>
              <Icon className={`h-8 w-8 ${color}`} />
            </div>
          </div>
          <p className="text-lg font-semibold text-muted-foreground mt-2">
            {title || ""}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
