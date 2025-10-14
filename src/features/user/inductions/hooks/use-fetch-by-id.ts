import { useQuery } from "@tanstack/react-query";
import { fetchById } from "../actions/fetch-by-id";

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["inductions_user_view", id],
    queryFn: () => fetchById(id),
  });
