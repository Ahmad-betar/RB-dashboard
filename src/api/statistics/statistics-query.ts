// queries.ts
import { useQuery } from "@tanstack/react-query";
import {
  getProductsStatistics,
  getCustomersStatistics,
  getSalesStatistics,
  getDailyRevenueStatistics,
  getOfferStatistics,
} from "./statistics-api";


// Products Statistics Query
export const useProductsStatisticsQuery = () => {
  return useQuery({
    queryKey: ["productsStatistics"],
    queryFn: getProductsStatistics,
  });
};

// Customers Statistics Query
export const useCustomersStatisticsQuery = (numberOfCustomers?: number) => {
  return useQuery({
    queryKey: ["customersStatistics", numberOfCustomers],
    queryFn: () => getCustomersStatistics(numberOfCustomers),
  });
};

// Sales Statistics Query
export const useSalesStatisticsQuery = () => {
  return useQuery({
    queryKey: ["salesStatistics"],
    queryFn: getSalesStatistics,
  });
};

// Daily Revenue Statistics Query
export const useDailyRevenueStatisticsQuery = () => {
  return useQuery({
    queryKey: ["dailyRevenueStatistics"],
    queryFn: getDailyRevenueStatistics,
  });
};

// Offer Statistics Query
export const useOfferStatisticsQuery = () => {
  return useQuery({
    queryKey: ["offerStatistics"],
    queryFn: getOfferStatistics,
  });
};
