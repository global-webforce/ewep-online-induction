import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "./fetch-all";

export const useFetchAll = () =>
  useQuery({
    queryKey: ["metric_cards_super_admin_view"],
    queryFn: fetchAll,
  });
