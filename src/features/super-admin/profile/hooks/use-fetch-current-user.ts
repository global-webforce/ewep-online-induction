"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../actions/fetch-current-user";
import { queryKey } from "../constants";

export const useFetchCurrentUser = () =>
  useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await fetchCurrentUser();
      if (res?.error) throw new Error(res?.error);
      return res?.data;
    },
  });
