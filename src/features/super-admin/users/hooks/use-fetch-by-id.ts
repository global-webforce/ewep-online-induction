import { useQuery } from "@tanstack/react-query";
import { fetchById } from "../actions";
import { queryKey } from "../constants";

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const res = await fetchById(id);
      if (res?.error) throw new Error(res?.error);
      return res?.data;
    },
  });
