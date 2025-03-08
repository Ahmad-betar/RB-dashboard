// queries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { add_popular, delete_popular, get_populars } from "./popular-api";

export const usePopularsQuery = () => {
  return useQuery({
    queryKey: ["populars"],
    queryFn: get_populars,
  });
};

export const useAddPopularMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: add_popular,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["populars"] });
    },
  });
};

export const useDeletePopularMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: delete_popular,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["populars"] });
    },
  });
};
