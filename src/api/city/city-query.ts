import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { add_city, delete_city, get_cities } from "./city-api";

export const getCitiesQuery = async (id: string) => {
  const queryResults = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const data = await get_cities(id);

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const addCityQuery = async (params: any) => {
  const queryResults = useMutation({
    mutationKey: ["add-city"],
    mutationFn: add_city,
  });

  return queryResults;
};

export const deleteCityQuery = async (id: string) => {
  const queryResults = useMutation({
    mutationKey: ["delete-city"],
    mutationFn: () => delete_city(id),
  });

  return queryResults;
};
