"use client";

import { MetricCard } from "@/components/custom/metric-card";
import { useFetchAll } from "./use-fetch-all";

export function MetricCardsGridUser() {
  const { data, isLoading } = useFetchAll();

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="animate-pulse h-[180px] rounded-lg bg-muted" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Induction Sessions"
        metricValue={data?.total_induction_sessions}
        breakdown={[
          { label: "Valid", value: data?.total_valid_induction_sessions },
          { label: "Expired", value: data?.total_expired_induction_sessions },
          { label: "Failed", value: data?.total_failed_induction_sessions },
        ]}
      />
    </div>
  );
}
