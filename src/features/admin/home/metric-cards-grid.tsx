"use client";

import { useQuery } from "@tanstack/react-query";
import { FileCheck, User } from "lucide-react";
import { MetricCard } from "./metric-card";
import { fetchAll } from "./actions/fetch-all";

export function MetricCardsGridAdmin() {
  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: fetchAll,
  });

  const cards = !data
    ? []
    : [
        {
          title: "Induction Courses",
          value: data.total_inductions,
          icon: FileCheck,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/40",
        },
        {
          title: "Total Users",
          value: data.total_default_users,
          icon: User,
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-100 dark:bg-blue-900/40",
        },
      ];
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <MetricCard key={index} {...card} />
      ))}
    </div>
  );
}
