import { useQuery } from "@tanstack/react-query";
import { fetchById } from "../actions/fetch-by-id";

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["induction_resources", id],
    queryFn: async () => await fetchById(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
