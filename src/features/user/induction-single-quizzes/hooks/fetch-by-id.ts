import { useQuery } from "@tanstack/react-query";
import { fetchById } from "../actions/fetch-by-id";

export const useFetchById = (id: string) =>
  useQuery({
    queryKey: ["induction_single_quizzes_user_view", id],
    queryFn: async () => await fetchById(id),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
