"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { FileCheck, User } from "lucide-react";
import { getAll } from "./queries";

export default function AdminStats() {
  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAll,
  });

  const cards = !data
    ? []
    : [
        {
          title: "Induction Courses",
          value: data?.total_inductions,
          icon: FileCheck,
          color: "text-green-500",
          bgColor: "bg-green-100",
        },

        {
          title: "Total Users",
          value: `${data?.total_default_users}`,
          icon: User,
          color: "text-blue-500",
          bgColor: "bg-blue-100",
        },
      ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index} className={`${card.bgColor} border-none shadow-sm`}>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex flex-row">
                <p className={`text-5xl font-bold ${card.color}`}>
                  {card.value}
                </p>
                <div
                  className={`rounded-full p-3 ${card.bgColor} bg-opacity-50 `}
                >
                  <card.icon className={`h-8 w-8 ${card.color}`} />
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-1">
                {card.title}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
