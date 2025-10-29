import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "../actions/fetch-all";

import { fetchById } from "../actions/fetch-by-id";
export const useFetchAll = () =>
  useQuery({
    queryKey: ["inductions_user_view"],
    queryFn: async () => {
      const res = await fetchAll();
      if (res?.error) throw new Error(res?.error);
      return res.data;
    },
  });

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["inductions_user_view", id],
    queryFn: async () => {
      const res = await fetchById(id);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
  });
