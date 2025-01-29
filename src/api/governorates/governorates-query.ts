import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { add_governorate, delete_governorate, get_governorates } from "./governorates-api";

export const getGovernoratesQuery = async (id: string) => {
  const queryResults = useQuery({
    queryKey: ["governorates"],
    queryFn: async () => {
      const data = await get_governorates(id);

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const addGovernorateQuery = async (params: any) => {
  const queryResults = useMutation({
    mutationKey: ["add-governorate"],
    mutationFn: add_governorate,
  });

  return queryResults;
};

export const deleteGovernorateQuery = async (id: string) => {
  const queryResults = useMutation({
    mutationKey: ["delete-governorate"],
    mutationFn: () => delete_governorate(id),
  });

  return queryResults;
};
