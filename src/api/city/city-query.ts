import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { add_city, delete_city, get_cities } from "./city-api";
import { getCityType } from "./type";

export const getCitiesQuery = (id: string) => {
  const queryResults = useQuery<getCityType[]>({
    queryKey: ["cities"],
    queryFn: async () => {
      const data = await get_cities(id);

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const addCityQuery = () => {
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["add-city"],
    mutationFn: add_city,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
  });

  return queryResults;
};

export const deleteCityQuery = () => {
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["delete-city"],
    mutationFn: delete_city,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
  });

  return queryResults;
};
