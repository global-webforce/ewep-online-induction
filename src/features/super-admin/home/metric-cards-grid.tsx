"use client";

import { MetricCard } from "@/components/custom/metric-card";
import { useQuery } from "@tanstack/react-query";
import { FileCheck, User } from "lucide-react";
import { fetchAll } from "./actions/fetch-all";

export function MetricCardsGridAdmin() {
  const { data, isLoading } = useQuery({
    queryKey: ["metric_cards_super_admin_view"],
    queryFn: fetchAll,
  });

  const total_inductions = {
    title: "Induction Courses",
    value: data?.total_inductions || "",
    icon: FileCheck,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/40",
  };

  const total_users = {
    title: "Users",
    value: data?.total_default_users || "",
    icon: User,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/40",
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="animate-pulse h-[140px] rounded-lg bg-muted" />
        <div className="animate-pulse h-[140px] rounded-lg bg-muted" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard key={1} {...total_inductions} />
      <MetricCard key={2} {...total_users} />
    </div>
  );
}
