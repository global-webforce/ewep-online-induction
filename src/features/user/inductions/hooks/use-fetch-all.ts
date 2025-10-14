import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "../actions/fetch-all";

export const useFetchAll = () =>
  useQuery({
    queryKey: ["inductions_user_view"],
    queryFn: fetchAll,
  });
