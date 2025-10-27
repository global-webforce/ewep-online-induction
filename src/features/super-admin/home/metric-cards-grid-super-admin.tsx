"use client";

import { MetricCard } from "@/components/custom/metric-card";
import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "./actions/fetch-all";

export function MetricCardsGridSuperAdmin__() {
  const { data, isLoading } = useQuery({
    queryKey: ["metric_cards_super_admin_view"],
    queryFn: async () => {
      const res = await fetchAll();
      if (res?.error) throw new Error(res.error);
      return res;
    },
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
    data && (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Induction Sessions"
          metricValue={data.data?.total_induction_sessions}
          breakdown={[
            {
              label: "Valid",
              value: data?.data?.total_valid_induction_sessions,
            },
            {
              label: "Expired",
              value: data?.data?.total_expired_induction_sessions,
            },
            {
              label: "Failed",
              value: data?.data?.total_failed_induction_sessions,
            },
          ]}
        />

        <MetricCard
          title="Total End Users"
          metricValue={data?.data?.total_users}
          breakdown={[
            { label: "Inducted", value: data?.data?.total_unique_inductees },
            { label: "Verified", value: data?.data?.total_confirmed_users },
            { label: "Unverified", value: data?.data?.total_unconfirmed_users },
          ]}
        />

        <MetricCard
          title="Total Inductions"
          metricValue={data?.data?.total_inductions}
          breakdown={[
            {
              label: "Published",
              value: data?.data?.total_published_inductions,
            },
            { label: "Draft", value: data?.data?.total_draft_inductions },
          ]}
        />
      </div>
    )
  );
}
