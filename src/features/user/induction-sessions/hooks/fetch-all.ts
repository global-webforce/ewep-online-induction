import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "../actions/fetch-all";

export const useFetchAll = () =>
  useQuery({
    queryKey: ["induction_sessions_user_view"],
    queryFn: fetchAll,
  });
