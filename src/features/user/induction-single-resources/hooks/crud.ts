import { useQuery } from "@tanstack/react-query";
import { fetchById } from "../actions/fetch-by-id";

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["induction_resources", id],
    queryFn: async () => {
      const res = await fetchById(id);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
