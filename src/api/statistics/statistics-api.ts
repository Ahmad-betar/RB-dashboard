import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import {
  ProductStatistics,
  CustomersStatistics,
  SalesStatistics,
  DailyRevenueStatistics,
  OfferStatistics,
} from "./type";

// Get Products Statistics
export const getProductsStatistics = async () => {
  const { data } = await axiosInstance.get<ProductStatistics>(
    API_ROUTES.satistics.productsStatistics
  );
  return data;
};

// Get Customers Statistics
export const getCustomersStatistics = async (_numberOfCustomers?: number) => {
  const { data } = await axiosInstance.get<CustomersStatistics>(
    API_ROUTES.satistics.customersStatistics
  );
  return data;
};

// Get Sales Statistics
export const getSalesStatistics = async () => {
  const { data } = await axiosInstance.get<SalesStatistics>(
    API_ROUTES.satistics.salesStatistics
  );
  return data;
};

// Get Daily Revenue Statistics
export const getDailyRevenueStatistics = async () => {
  const { data } = await axiosInstance.get<DailyRevenueStatistics>(
    API_ROUTES.satistics.dailyRevenueStatistics
  );
  return data;
};

// Get Offer Statistics
export const getOfferStatistics = async () => {
  const { data } = await axiosInstance.get<OfferStatistics>(
    API_ROUTES.satistics.offerStatistics
  );
  return data;
};
