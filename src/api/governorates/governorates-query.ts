import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  add_governorate,
  delete_governorate,
  get_governorates,
} from "./governorates-api";

export const getGovernoratesQuery = (id: string) => {
  const queryResults = useQuery({
    queryKey: ["governorates", id],
    queryFn: async () => {
      const data = await get_governorates(id);

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const addGovernorateQuery = () => {
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["add-governorate"],
    mutationFn: add_governorate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["governorates"] });
    },
  });

  return queryResults;
};

export const deleteGovernorateQuery = () => {
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["delete-governorate"],
    mutationFn: delete_governorate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["governorates"] });
    },
  });

  return queryResults;
};
