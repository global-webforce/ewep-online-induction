import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "../actions";
import { queryKey } from "../constants";

export const useFetchAll = () =>
  useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await fetchAll();
      if (res?.error) throw new Error(res?.error);
      return res?.data;
    },
  });
