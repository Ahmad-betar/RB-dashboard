import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { get_customers } from "./customer-api";

export const getCustomersQuery = () => {
  const queryResults = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const data = await get_customers();

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};
