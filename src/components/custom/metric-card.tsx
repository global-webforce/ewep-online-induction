import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MetricRow {
  label: string;
  value: string | number;
}

interface MetricCardProps {
  title: string;
  description?: string;
  metricValue: string | number;
  metricLabel?: string;
  breakdown: MetricRow[];
}

export function MetricCard({
  title,
  description,
  metricValue,
  metricLabel,
  breakdown,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Metric Value Header */}
        <div>
          <p className="text-5xl font-bold text-foreground">{metricValue}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {breakdown.map((row, index) => (
            <div key={index} className="flex items-center gap-1">
              <span className="text-muted-foreground">{row.label}:</span>
              <span className="font-semibold text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
