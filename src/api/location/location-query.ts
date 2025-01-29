import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { add_state, delete_state, get_states } from "./location-api";

export const getStatesQuery = async (params: any) => {
  const queryResults = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const data = await get_states({});

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const addStateQuery = async (params: any) => {
  const queryResults = useMutation({
    mutationKey: ["add-state"],
    mutationFn: add_state,
  });

  return queryResults;
};

export const deleteStateQuery = async (id: string) => {
  const queryResults = useMutation({
    mutationKey: ["delete-state"],
    mutationFn: () => delete_state(id),
  });

  return queryResults;
};
