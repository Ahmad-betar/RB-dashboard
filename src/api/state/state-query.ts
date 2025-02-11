import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  add_state,
  delete_state,
  edit_states,
  get_state,
  get_states,
} from "./state-api";

export const getStatesQuery = () => {
  const queryResults = useQuery({
    queryKey: ["get-states"],
    queryFn: async () => {
      const data = await get_states();

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const getStateQuery = async (name: string) => {
  const queryResults = useQuery({
    queryKey: ["get-state", name],
    queryFn: async () => {
      const data = await get_state(name);

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const addStateQuery = () => {
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["add-state"],
    mutationFn: add_state,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-states"] });
    },
  });

  return queryResults;
};

export const deleteStateQuery = () => {
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["delete-state"],
    mutationFn: delete_state,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-states"] });
    },
  });

  return queryResults;
};

export const editStateQuery = () => {
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["edit-state"],
    mutationFn: edit_states,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-states"] });
    },
  });

  return queryResults;
};
