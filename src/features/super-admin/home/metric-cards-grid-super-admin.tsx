"use client";

import { MetricCard } from "@/components/custom/metric-card";
import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "./actions/fetch-all";

export function MetricCardsGridSuperAdmin() {
  const { data, isLoading } = useQuery({
    queryKey: ["metric_cards_super_admin_view"],
    queryFn: fetchAll,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="animate-pulse h-[180px] rounded-lg bg-muted" />
        <div className="animate-pulse h-[180px] rounded-lg bg-muted" />{" "}
        <div className="animate-pulse h-[180px] rounded-lg bg-muted" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Total Induction Sessions"
        metricValue={data?.total_induction_sessions}
        breakdown={[
          { label: "Valid", value: data?.total_valid_induction_sessions },
          { label: "Expired", value: data?.total_expired_induction_sessions },
          { label: "Failed", value: data?.total_failed_induction_sessions },
        ]}
      />

      <MetricCard
        title="Total End Users"
        metricValue={data?.total_users}
        breakdown={[
          { label: "Inducted", value: data?.total_unique_inductees },
          { label: "Verified", value: data?.total_confirmed_users },
          { label: "Unverified", value: data?.total_unconfirmed_users },
        ]}
      />

      <MetricCard
        title="Total Inductions"
        metricValue={data?.total_inductions}
        breakdown={[
          { label: "Published", value: data?.total_published_inductions },
          { label: "Draft", value: data?.total_draft_inductions },
        ]}
      />
    </div>
  );
}
