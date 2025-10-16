import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "../actions/fetch-all";

import { fetchById } from "../actions/fetch-by-id";
export const useFetchAll = () =>
  useQuery({
    queryKey: ["inductions_user_view"],
    queryFn: fetchAll,
  });

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["inductions_user_view", id],
    queryFn: () => fetchById(id),
  });
